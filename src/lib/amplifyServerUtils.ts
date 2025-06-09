import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { cookies } from 'next/headers';
import config from '@/amplifyconfiguration.json';

export const { 
  runWithAmplifyServerContext,
  createAuthRouteHandlers,
  } = createServerRunner({
    config,
      
    runtimeOptions: {
      cookies: {
        domain: '.d12addczmn3abk.amplifyapp.com', // making cookies available to all subdomains
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      }
    }
});

export const amplifyApiClient = generateServerClientUsingCookies({
  config: config,
  cookies,
  authMode: 'userPool'
});