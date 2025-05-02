import type { LayoutServerLoad } from './$types';
import { site as siteConfig } from '@/config';

import type { Page, Tenant } from '@payload-types';

export const load: LayoutServerLoad = async (args) => {
  //@ts-ignore
  const response = fetch(
    `${siteConfig.CMS}/api/tenants?[where][domainName][equalt]=${siteConfig.domainName}`
  )
    .then((res) => res.json())
    .then((json) => ({
      nav: json.docs[0].nav,
      pages: json.docs[0].pages
    }));

  return await response;
};

export const prerender = true;
