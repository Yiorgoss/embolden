import type { ParamMatcher } from '@sveltejs/kit';
import { supportedLocales } from "@/config"

export const match = ((param: string) => {
  if (param == "") return true
  return !!supportedLocales[param]
}) satisfies ParamMatcher;
