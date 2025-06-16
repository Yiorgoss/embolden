 import type { Page } from '@payload-types';
 import type { EntryGenerator } from './$types';
 import { site } from '@/config';


 export const entries: EntryGenerator = async () => {
   const response = fetch(`${site.CMS}/api/tenants?[where][domainName][equal]=${site.domainName}`)
     .then((res) => res.json())
     .then((json) => ({
       //@ts-ignore
       pages: json.docs[0].pages
     }));

   const { pages } = await response;
   const slugList = pages.docs.map(({ slug }: { slug: string }) => ({ slug: slug.charAt(0) == '/' ? slug.slice(1) : slug }));

   return slugList;
 };

 export const prerender = true;
