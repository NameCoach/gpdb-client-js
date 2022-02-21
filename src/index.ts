import Client from './lib/client';
import Configuration from './lib/configuration';
import HttpClient from './lib/http-client';
import HttpError, { IHttpErrorDetails } from './lib/http-error';
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
import { AttributeConfig, CustomAttributesConfig } from './types/repositories/custom-attributes';
import { ResourcePermissions, Resources } from './types/repositories/permissions';

export {
  HttpError,
  IHttpErrorDetails,
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
  AttributeConfig,
  CustomAttributesConfig,
  PermissionsManager,
  Resources,
  ResourcePermissions
};
