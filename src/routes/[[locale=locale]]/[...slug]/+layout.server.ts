// import { PUBLIC_ENV } from '$env/static/public';
import type { LayoutServerLoad } from './$types';
import { site, defaultLocale } from '@/config';
import { fetchFromCMS, getTenantByDomain } from '@/utils';

import type { Page, Tenant } from '@payload-types';
import { error } from '@sveltejs/kit';


export const load: LayoutServerLoad = async (args) => {
  // if (PUBLIC_ENV != "PROD") {
  //   console.log({ site })
  // }
  const { platform, params } = args

  const locale = params.locale ?? defaultLocale
  const data = await getTenantByDomain({ site, locale })

  return data
};

