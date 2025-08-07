import type { LayoutServerLoad } from './$types';
import { site } from '@/config';
import { getDataDirectFromCMS } from '@/utils';

import type { Page, Tenant } from '@payload-types';
import { error } from '@sveltejs/kit';


export const load: LayoutServerLoad = async (args) => {
  const { platform, params } = args

  let text;
  const locale = params.locale ?? "en"
  // const kvKey = `${site.domainName}__${locale}`
  // try {
  //   text = await platform?.env?.CALISTO_STUDIO_KV_CACHE.get(kvKey)
  // } catch (err) {
  //   console.log(`ERROR with KV: ${err}`)
  // }
  let data

  //@ts-ignore
  // if (text || 1 == 0) {
  //   //@ts-ignore
  //   const json = await JSON.parse(text)
  //   data = {
  //     nav: json.docs[0].nav,
  //     pages: json.docs[0].pages,
  //     locale
  //   }
  // console.log("using KV CACHE")
  // } else {
  data = await getDataDirectFromCMS({ site, locale })
  // console.log("Not using KV CACHE")
  // }
  // console.dir({ data: data.pages.docs[0].hero[0].richText }, { depth: 10 })
  return data
};

