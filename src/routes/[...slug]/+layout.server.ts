import type { LayoutServerLoad } from './$types';
import { site } from '@/config';
import { getDataDirectFromCMS } from '@/utils';

import type { Page, Tenant } from '@payload-types';
import { error } from '@sveltejs/kit';


export const load: LayoutServerLoad = async (args) => {
  const { platform } = args

  const text = await platform?.env?.CALISTO_STUDIO_KV_CACHE.get(site.domainName)
  let data

  if (text) {
    const json = await JSON.parse(text)
    data = {
      nav: json.docs[0].nav,
      pages: json.docs[0].pages
    }
  } else {
    data = await getDataDirectFromCMS({ site })
  }
  return data
};

