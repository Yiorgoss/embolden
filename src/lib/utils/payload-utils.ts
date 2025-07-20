import type { Asset } from '@payload-types';
import { site, type SiteConfigType } from '@/config';
import { error } from '@sveltejs/kit';

export async function fetchFromCMS({
  collection,
  id,
  lang = 'en'
}: {
  collection: string;
  id: number;
  lang?: string | undefined | null;
}) {
  const response = fetch(
    `${site.CMS}/api/${collection}?where[id][equals]=${id}&locale=${lang ?? 'en'}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return response;
}

export const getDataDirectFromCMS = async ({ site }: { site: SiteConfigType }) => {

  const response = fetch(`${site.CMS}/api/tenants?[where][domainName][equal]=${site.domainName}&depth=10`)
    .then((res) => res.json())
    .then((json) => ({
      //@ts-ignore
      nav: json.docs[0].nav,
      //@ts-ignore
      pages: json.docs[0].pages
    }))
    .catch((err) => {
      error(404, {
        message: err
      });
    });

  return response
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
  if (!imgData) return '';
  let image
  if (typeof imgData == 'number') {
    image = await resolveID({ collection: 'assets', data: imgData });
  }

  if (!image || !image.sizes) {
    console.log(`sizes does not exist on image: ${image}`)
    return ''
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
