import type { EntryGenerator } from './$types';
import { site } from '@/config';

// export const entries: EntryGenerator = async () => {
//   const response = fetch(`${site.CMS}/api/tenants?[where][domainName][equal]=${site.domainName}`)
//     .then((res) => res.json())
//     .then((json) => ({
//       //@ts-ignore
//       nav: json.docs[0].nav,
//       //@ts-ignore
//       pages: json.docs[0].pages
//     }));
//
//   const { pages } = await response
//   const slugList = pages.map(({ slug: string }) => ({ slug: slug }));
//
//   return slugList;
// };
//
// export const prerender = true
