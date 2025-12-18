import type { Asset, Page, Tenant, IButton } from '@payload-types';
import { defaultLocale, site, type SiteConfigType } from '@/config';
import { error } from '@sveltejs/kit';
import { buttonVariants } from '@/components/ui/button';

export function mergeUpdateData({ oldData, newData }: { oldData: any, newData: any }) {
  let updatedData = oldData
  if (newData.nav) {
    //update from Tenant collection
    updatedData = newData
  }
  else if (newData.hero) { // page has a hero section tenant doesnt ... maybe need to add name of collectioon?
    // update from Pages collection
    // updatedData.pages.docs = [...updatedData.pages.docs.map((page: Page) => page.id == newData.id ? newData : page)]
    const idx = updatedData.pages.docs.findIndex((doc) => doc.id == newData.id)
    updatedData.pages.docs[idx] = newData;
  }

  return updatedData
}

export function getRestPopulateFn({ apiURL, locale }: { apiURL: string, locale: string }) {
  return async ({ id, collection }: { id: number, collection: string }) => {
    await fetchFromCMS({ collection, id, locale })
  }
}

export async function fetchFromCMS({
  collection,
  id,
  locale = 'en'
}: {
  collection: string;
  id: number;
  locale?: string | undefined | null;
}) {
  if (!id) return "xxxx"
  if (!id) throw Error(`Need ID to Fetch`)
  const response = fetch(
    `${site.CMS}/api/${collection}?where[id][equals]=${id}&locale=${locale ?? defaultLocale}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return response;
}

export const getTenantByDomain = async ({ site, locale }: { site: SiteConfigType, locale: string }) => {

  const response = fetch(`${site.CMS}/api/tenants?where[domain][equals]=${site.domainName}&depth=2&locale=${locale}`)
    .then((res) => res.json())
    .then((json: any) => json.docs[0]) //should only ever match one 
    .catch((err: any) => {
      error(404, {
        message: err
      });
    });

  return response as Promise<Tenant>
}

// FIX deprecated
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
      return fetchFromCMS({ collection, id: data, locale: lang })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          return response.json()
        })
        .then((json: any) => {
          if (!json && !json.docs && json.docs.length > 0) {
            throw new Error(`No data returned: CMS returned nothing`);
          }
          return json.docs[0]
        })
        .catch((err) => {
          console.log(`some dumb shit ${err}`)
          throw new Error(`ERROR: ${err}`);
        })
    } catch (err) {
      console.log({ err2: err })
      return Promise.reject(`Resolving ID failed: ${err}`);
    }
  }
  return Promise.resolve(data);
}

export const richTextImg = ({ image }: { image: Asset }) => {

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
                src="${sizes!.sm!.url}"
                alt=""
          />`
};

export const richTextBtn = ({ href, link }: { href: string, link: IButton }) => {

  let { type: urlType, reference, url, display, style: linkStyle } = link || {};

  const style = linkStyle && Object.entries(linkStyle)
    .filter(([_, value]) => Boolean(value))
    .reduce((acc, [key, value]) => `${acc};${key}:${value}`, "")

  const { text, variant, size } = display || {}

  const classList = buttonVariants({ variant, size })
  return `<a class="${classList}" style="${style}" href="${href}">${text}</a>`
}
