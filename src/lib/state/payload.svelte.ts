import { getContext, onDestroy, setContext, untrack } from 'svelte';
import { SvelteMap, SvelteURL } from "svelte/reactivity";
import { type Page, type Tenant } from "@payload-types"
import { resolveID } from "@/utils";
import { page } from '$app/state';
import { throttle } from "@/utils"
import {
  subscribe as payloadSubscribe,
  unsubscribe as payloadUnsubscribe,
  ready
} from '@payloadcms/live-preview';
import { site } from '@/config';
import { debounce } from 'lodash-es';

export class PayloadState {

  _state = new SvelteMap<string, any>()
  isLivePreview = $derived(page.url.searchParams.get('livePreview') === 'true');
  payloadListener: ((event: MessageEvent<any>) => void) | undefined = $state()

  constructor() {
    console.log("constructor")

    if (this.isLivePreview && !this.payloadListener) {
      console.log("setup listener")
      this.setupListener()
    }

    $effect.root(() => {
      $effect(() => {
        page.params.locale;
        untrack(() => this.setTenant({ tenant: page.data as Tenant }))
      })
      return () => this.cleanup()
    })
  }

  setTenant({ tenant }: { tenant?: Tenant }) {
    console.log("tenant setup")
    if (!tenant) return
    // this._state.clear()
    this.setNav(tenant)

    const pages = (tenant?.pages?.docs || []) as Page[]
    pages.forEach((page: Page) => this.setPage(page))
  }

  setNav(tenant: Tenant) {
    this._state.set('header', tenant?.nav?.header?.[0]); /// we wand undefined header since it shoudl be present
    this._state.set('footer', tenant?.nav?.footer?.[0]);
  }

  setPage(page: Page) {
    //worth noting that its possible for page to be a number, ie not populated
    console.log("page set")
    if (typeof page.slug === 'string' && page.slug?.trim().length == 0) {
      this._state.set('home', page)
    }
    else if (!page.slug) {
      this._state.set('404', page)
    } else {
      this._state.set(page.slug, page)
    }
  }

  get(key: string | undefined) {
    if (typeof key === 'string' && key.length === 0) {
      return this._state.get('home')
    }

    if (!key) return undefined;

    return this._state.get(key)
  }

  set(key: string, data: any) {
    // const old = this.state.get(key)
    this._state.set(key, data)
  }

  has(key: string) {
    return this._state.has(key)
  }

  clear() {
    this._state = new SvelteMap<string, any>()
  }

  // live preview stuffs  

  #mergeLivePreviewData(data: any) {
    // currently there is a bug
    // basically whenever data is changed, it causes all the
    // unpopulated fields to call enmass to server
    // FIX - look at sergically changing data?
    //     - maybe switch off populating fields when in livepreview
    // 
    // console.log("merging data")
    // if (data.nav) {
    //   this.setNav(data)
    // } else if (data.hero) {
    //   this.setPage(data)
    // }
  }


  setupListener() {

    console.log("listening for payload")
    ready({ serverURL: site.CMS })
    this.payloadListener = payloadSubscribe({
      // callback: (doc) => debounce((doc) => this.#mergeLivePreviewData(doc), 200, { leading: true, trailing: false }),
      callback: (doc) => this.#mergeLivePreviewData(doc),
      depth: 0,
      initialData: page.data ?? {},
      serverURL: site.CMS
    })
  }

  cleanup() {
    if (this.payloadListener) payloadUnsubscribe(this.payloadListener)
  }
}

const PAYLOAD_KEY = Symbol("payload-cms-key")

export function setPayloadState() {
  return setContext(PAYLOAD_KEY, new PayloadState())
}

export function getPayloadState() {
  return getContext<ReturnType<typeof setPayloadState>>(PAYLOAD_KEY)
}
