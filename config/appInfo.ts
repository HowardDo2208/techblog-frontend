export const appInfo = {
  appName: 'techblog',
  apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3000',
  websiteDomain:
    process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || 'http://localhost:3080',
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
}

