import type { ParamMatcher } from '@sveltejs/kit';
import { supportedLocales } from "@/config"

export const match = ((param: string) => {
  return !!supportedLocales[param]
}) satisfies ParamMatcher;
