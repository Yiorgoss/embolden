#!/bin/bash

source .env

if [[ -z $CF_API_TOKEN || -z $CF_ACCOUNT_ID ]]; then 
  echo "API token or account ID unset"
  exit 1
fi

gh secret set CF_API_TOKEN --body "$CF_API_TOKEN"
gh secret set CF_ACCOUNT_ID --body "$CF_ACCOUNT_ID"
