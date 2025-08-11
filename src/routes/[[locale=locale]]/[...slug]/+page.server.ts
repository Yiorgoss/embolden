import { site } from '@/config';
import type { PageServerLoad } from './$types';
import { fetchFromCMS, resolveID } from '@/utils';


export const load: PageServerLoad = async (args) => {
  const { params, parent } = args
  const { locale, slug: currentSlug } = params

  const { layoutData } = await parent()
  const { pages } = layoutData

  const currentPage = pages.docs.find(({ slug }: { slug: string }) => {
    if (slug == '' || slug == '/') {
      // both should want the same page
      return slug == currentSlug || slug.slice(1) == currentSlug;
    }
    return slug == currentSlug;
  })

  if (!currentPage || !currentPage.id) return

  const response = await fetchFromCMS({ collection: "pages", id: currentPage.id, lang: locale })
  const data = await response.json()
  return { pageData: data }
};
