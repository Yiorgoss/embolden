// import { site } from '@/config';
// import type { PageServerLoad } from './$types';
// import { getDataDirectFromCMS } from '@/utils';


// export const load: PageServerLoad = async (args) => {
//   const { platform, url, parent } = args

//   const layoutKey = `${site.domainName}__${url.pathname}`
//   const text = await platform?.env?.CALISTO_STUDIO_KV_CACHE.get(layoutKey)
//   const { pages } = await parent()
//   let data;

//   if (text) {
//     data = await JSON.parse(text)
//   } else if (pages) {
//     //data exists from layout
//     return pages
//   } else {
//     //data does not exist
//     // note: that if layout data exists but not page data you are making a cms call on every page call
//     return getDataDirectFromCMS({ site })
//   }

//   return data
// };
