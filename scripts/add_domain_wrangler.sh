#!/bin/bash
# replace instances of ${domainName} with ENV variable of Domain Name

source .env

if [[ -z $IS_BASE ]]; then
  echo "xx"
  sed -i '' -Ee "s/%domainName%/$PUBLIC_DOMAIN_NAME/g" wrangler.jsonc
else
  echo "You are trying to push the base template...Are you sure you want to do this?"
  exit 1
fi



