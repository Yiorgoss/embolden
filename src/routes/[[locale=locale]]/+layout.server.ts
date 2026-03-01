// import { PUBLIC_ENV } from '$env/static/public';
import type { LayoutServerLoad } from './$types';
import { site, defaultLocale } from '@/config';
// import { fetchFromCMS, getTenantByDomain } from '@/utils';

import type { Page, Tenant } from '@payload-types';
import { error } from '@sveltejs/kit';


export const load: LayoutServerLoad = async (args) => {
  const { platform, params, fetch } = args

  const locale = params.locale ?? defaultLocale

  const response = await fetch(`${site.CMS}/api/tenants?where[domain][equals]=${site.domainName}&select[id]=true&select[nav]=true&depth=1&locale=${locale}`) // must select id for live preview
    .then((res: any) => res.json())
    .then((json: any) => json.docs[0])
    .catch((err: any) => error(404, { message: err }))

  return {
    nav: response.nav as Tenant['nav'],
    id: response.id as number
  }
};

