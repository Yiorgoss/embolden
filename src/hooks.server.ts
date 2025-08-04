import type { Handle } from '@sveltejs/kit';
import { defaultLocale } from "@/config"

export const handle: Handle = async ({ event, resolve }) => {
  // event.locals.user =

  const locale = event.params.locale ?? defaultLocale

  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%locale%', locale),
  });

  return response;
};
