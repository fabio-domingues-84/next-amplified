import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { cookies } from 'next/headers';
import config from '@/amplifyconfiguration.json';

export const amplifyClient = generateServerClientUsingCookies({
  config: config,
  cookies
});