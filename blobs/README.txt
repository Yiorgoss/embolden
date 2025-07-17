these are the files to test the KV portion of the website locally
wont handle remote changes

wrangler kv:key put calisto.studio__/ blobs/home.json --local --binding CALISTO_STUDIO_KV_CACHE
wrangler kv:key put calisto.studio__layout blobs/layout.json --local --binding CALISTO_STUDIO_KV_CACHE


wrangler kv:key put calisto.studio__/ blobs/home.json --local --binding CALISTO_STUDIO_KV_CACHE
calisto.studio__layout blobs/layout.json
