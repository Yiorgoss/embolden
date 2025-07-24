// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env?: {
        CALISTO_STUDIO_KV_CACHE: KVNamespace,
      },
      cf: CfProperties
      ctx: ExecutionContext
    }
  }
}

export { };
