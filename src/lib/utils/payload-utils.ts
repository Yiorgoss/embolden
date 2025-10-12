import type { Asset, Page, Tenant } from '@payload-types';
import { defaultLocale, site, type SiteConfigType } from '@/config';
import { error } from '@sveltejs/kit';

export function mergeUpdateData({ oldData, newData }: { oldData: any, newData: any }) {
  let updatedData = oldData
  if (newData.nav) {
    //update from Tenant collection
    updatedData = newData
  }
  else if (newData.hero) { // page has a hero section tenant doesnt ... maybe need to add name of collectioon?
    // update from Pages collection
    updatedData.pages.docs = [...updatedData.pages.docs.map((page: Page) => page.slug == newData.slug ? newData : page)]
  }

  return updatedData
}
export async function fetchFromCMS({
  collection,
  id,
  lang = 'en'
}: {
  collection: string;
  id: number;
  lang?: string | undefined | null;
}) {
  if (!id) throw Error(`Need ID to Fetch`)
  const response = fetch(
    `${site.CMS}/api/${collection}?where[id][equals]=${id}&locale=${lang ?? defaultLocale}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return response;
}

export const getTenantByDomain = async ({ site, locale }: { site: SiteConfigType, locale: string }) => {

  const response = fetch(`${site.CMS}/api/tenants?[where][domainName][equal]=${site.domainName}&depth=10&locale=${locale}`)
    .then((res) => res.json())
    .then((json: any) => json.docs[0]) //should only ever match one 
    .catch((err: any) => {
      error(404, {
        message: err
      });
    });

  return response as Promise<Tenant>
}

export async function resolveID({
  collection,
  data,
  lang
}: {
  collection: string;
  data: number | any;
  lang?: string;
}) {
  if (!data) return Promise.reject("Data undefined");
  if (typeof data === 'number') {
    try {
      const response = await fetchFromCMS({ collection, id: data, lang });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json: any = await response.json();

      if (!json && !json.docs && json.docs.length > 0) {
        throw new Error(`No data returned: CMS returned nothing`);
      }
      return json.docs[0];
    } catch (err) {
      return Promise.reject(`Resolving ID failed: ${err}`);
    }
  }
  return Promise.resolve(data);
}

export const richTextImg = async ({ imgData }: { imgData: Asset | number }) => {
  if (!imgData) throw Error("imageData undefined");
  const image = await resolveID({ collection: 'assets', data: imgData });

  if (!image || !image.sizes) {
    throw Error(`ERROR: sizes does not exist on image: ${image}`)
  }
  //@ts-ignore  if typeof  ^
  const { sizes } = image;

  // for now just default to the smallest one
  return `<img style="object-fit:cover;
                      height:inherit;
                      width:inherit;
                      margin:0px;"
                src="${sizes.sm.url}"
                alt=""
          />`
};
