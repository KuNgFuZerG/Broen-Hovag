import { UserProfile, UserRole, EntityTag } from '../types';
import { RoleManager } from './roleManager';

export interface PermissionChecker {
  canPublishAnnouncements: (user: UserProfile, entity?: EntityTag) => boolean;
  canCreateGroups: (user: UserProfile) => boolean;
  canManageDiakoni: (user: UserProfile) => boolean;
  canManageServiceRotas: (user: UserProfile) => boolean;
  canPublishEvents: (user: UserProfile) => boolean;
}

export const permissions: PermissionChecker = {
  canPublishAnnouncements: (user: UserProfile, entity?: EntityTag) =>
    RoleManager.canPublishAnnouncements(user, entity),

  canCreateGroups: (user: UserProfile) =>
    RoleManager.canCreateGroups(user),

  canManageDiakoni: (user: UserProfile) =>
    RoleManager.canManageDiakoni(user),

  canManageServiceRotas: (user: UserProfile) =>
    RoleManager.canManageServiceRotas(user),

  canPublishEvents: (user: UserProfile) =>
    RoleManager.canPublishAnnouncements(user)
};

export { RoleManager };
