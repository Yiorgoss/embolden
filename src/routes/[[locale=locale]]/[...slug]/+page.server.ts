import { defaultLocale, site } from "@/config";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type { Tenant } from "@payload-types";


export const load: PageServerLoad = async (args) => {
  const { platform, params, fetch } = args

  const locale = params.locale ?? defaultLocale
  const slug = params.slug

  const response = await fetch(`${site.CMS}/api/pages?&depth=0&locale=${locale}&where[tenant-domain][equals]=${site.domainName}&where[slug][equals]=${slug}`)
    .then((res: any) => res.json())
    .then((json: any) => json.docs[0])
    .catch((err: any) => error(404, { message: err })) as Tenant['nav']


  return response
};

