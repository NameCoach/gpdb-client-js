import Client from './lib/client';
import Configuration from './lib/configuration';
import HttpClient from './lib/http-client';
import PermissionsManager from './lib/permissions-manager';

// TYPES
import IConfiguration from './types/configuration';
import ICredentials from './types/credentials';
import AnalyticEvent from './types/input/analytic-event';
import Application from './types/input/application';
import { TargetTypeSig, UserResponse } from './types/input/enum-types';
import NameOwner from './types/input/name-owner';
import Target from './types/input/tasrget';
import User from './types/input/user';
import Resources from './types/repositories/permissions';

export {
  Client,
  Configuration,
  HttpClient,
  ICredentials,
  IConfiguration,
  AnalyticEvent,
  Application,
  NameOwner,
  UserResponse,
  TargetTypeSig,
  Target,
  User,
  PermissionsManager,
  Resources
};
