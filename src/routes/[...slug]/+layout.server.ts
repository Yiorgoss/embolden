import type { LayoutServerLoad } from './$types';
import { site } from '@/config';

import type { Page, Tenant } from '@payload-types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (args) => {
  //@ts-ignore
  const response = fetch(`${site.CMS}/api/tenants?[where][domainName][equal]=${site.domainName}`)
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

  return await response;
};
