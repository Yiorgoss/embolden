#!/bin/bash

source .env

if [[ -z $CF_API_TOKEN || -z $CF_ACCOUNT_ID ]]; then 
  echo "API token or account ID unset"
  exit 1
fi

REPO="yiorgoss/${PUBLIC_DOMAIN_NAME//./-}"

echo $REPO

gh secret set CF_API_TOKEN --body "$CF_API_TOKEN" -R "$REPO"
gh secret set CF_ACCOUNT_ID --body "$CF_ACCOUNT_ID" -R "$REPO"


gh variable set PUBLIC_ENV --body "$PUBLIC_ENV" -R "$REPO"
gh variable set PUBLIC_DOMAIN_NAME --body "$PUBLIC_DOMAIN_NAME" -R "$REPO"
gh variable set PUBLIC_DEV_CMS --body "$PUBLIC_DEV_CMS" -R "$REPO"
gh variable set PUBLIC_PROD_CMS --body "$PUBLIC_PROD_CMS" -R "$REPO"
gh variable set PUBLIC_TEST_ASSET_URL --body "$PUBLIC_TEST_ASSET_URL" -R "$REPO"
gh variable set PUBLIC_ASSET_URL --body "$PUBLIC_ASSET_URL" -R "$REPO"
