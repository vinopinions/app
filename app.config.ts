import { ConfigContext, ExpoConfig } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

// this can override the values defined in the app.json in the 'expo' section
export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: config.name,
    slug: config.slug,
    ios: {
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [
              process.env.EXPO_PUBLIC_GOOGLE_OAUTH_URL_SCHEMA_IOS,
            ],
          },
        ],
        ...config.ios.infoPlist,
      },
      googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST,
      ...config.ios,
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      ...config.android,
    },
  };
};
