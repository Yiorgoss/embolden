import type { LayoutServerLoad } from './$types';
import { site as siteConfig } from '@/config';

import type { Page, Tenant } from '@payload-types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (args) => {
  //@ts-ignore
  console.log(siteConfig.CMS)
  const response = fetch(
    `${siteConfig.CMS}/api/tenants?[where][domainName][equal]=${siteConfig.domainName}`
  )
    .then((res) => res.json())
    .then((json) => ({
      //@ts-ignore
      nav: json.docs[0].nav,
      //@ts-ignore
      pages: json.docs[0].pages
    }))
    .catch((err) =>
      error(404, {
        message: err
      })
    );

  return await response;
};

export const prerender = true;
