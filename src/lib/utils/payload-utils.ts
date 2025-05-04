import type { Asset, Form, IImageField } from '@payload-types';
import { site } from '@/config';

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

export async function resolveID({
  collection,
  data,
  lang
}: {
  collection: string;
  data: number | any;
  lang?: string;
}): Promise<Form> {
  if (!data) return Promise.reject();
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
  if (typeof imgData == 'number') {
    imgData = await resolveID({ collection: 'assets', data: imgData });
  }
  //@ts-ignore  if typeof  ^
  const { sizes, url } = imgData;
  const sources =
    sizes &&
    Object.entries(sizes).reduce((acc: string, [_, img]) => {
      return (acc += `<source media="(max-width: ${img.width})"  srcset="${site.CMS}${img.url}" />`);
    }, '');
  return `<picture style="margin:0;width:100%;height:100%;"> ${sources ?? ''}<img style="object-fit:stretch;width:100%;height:100%;" src="${site.CMS}${url}" alt="" /></picture>`;
  // return `<img style="object-fit:cover;height:inherit;width:inherit;margin:0px;" src="${devCMS.value}${url}" alt=""/>`
};
