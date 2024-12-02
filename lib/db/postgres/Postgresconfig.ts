import { loadEnvConfig } from '@next/env'; //only works with .env.local.* files

export enum E_EnvironmentName_dbconfig {
  DEV = 'development',
  PROD = 'production',
  TESTING = 'test',
  STAGING = 'staging',
  UNDEFINED = 'UNDEFINED',
}
const ENV =
  (process.env['SYSTEM_ENV'] as E_EnvironmentName_dbconfig) ||
  E_EnvironmentName_dbconfig.DEV;
//for CLI
if (ENV === E_EnvironmentName_dbconfig.DEV) {
  loadEnvConfig(process.cwd() + '../../../../').loadedEnvFiles; //from .ev.local
}

export const getEnv = () => {
  return ENV;
};

export const getDbName = (): string => {
  return process.env['DB_NAME'] || 'db name is undefined in .env';
};

export const getDbUser = (): string => {
  return process.env[`DB_USER`] || 'db user is undefined in .env';
};

export const getDbPassword = (): string => {
  return process.env['DB_PASSWORD'] || 'db password is undefined in .env';
};

export const getDbHost = (): string => {
  return process.env['DB_HOST'] || 'db host is undefined in .env';
};

export const getDbPort = (): number => {
  return parseInt(process.env['DB_PORT'] || '5432');
};
