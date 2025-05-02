import { PUBLIC_ENV, PUBLIC_DEV_CMS, PUBLIC_PROD_CMS, PUBLIC_DOMAIN_NAME } from '$env/static/public';

export const site = {
  CMS: PUBLIC_ENV == 'PROD' ? PUBLIC_PROD_CMS : PUBLIC_DEV_CMS,
  currency: '&euro;',
  domainName: PUBLIC_DOMAIN_NAME
};
