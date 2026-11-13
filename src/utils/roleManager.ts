import { UserProfile, UserRole, StandardUserRole, EntityTag } from '../types';

export const normalizeRole = (role: UserRole | string | undefined): StandardUserRole => {
  if (!role) return 'USER';
  const r = role.toUpperCase();
  if (r === 'ADMIN' || r === 'ADMINISTRATOR' || r === 'PREST') return 'ADMIN';
  if (r === 'LEADER' || r === 'GRUPPELEDER' || r === 'DIAKON') return 'LEADER';
  if (r === 'VOLUNTEER' || r === 'FRIVILLIG') return 'VOLUNTEER';
  return 'USER';
};

export const RoleManager = {
  normalizeRole,

  // Check if role has publication rights (ONLY LEADER or ADMIN)
  canPublishAnnouncements: (userOrRole?: UserProfile | UserRole, entity?: EntityTag): boolean => {
    if (!userOrRole) return false;
    const roleStr = typeof userOrRole === 'object' ? userOrRole.role : userOrRole;
    const norm = normalizeRole(roleStr);

    if (norm === 'ADMIN') return true;
    if (norm === 'LEADER') {
      if (typeof userOrRole === 'object' && entity && userOrRole.managedEntities) {
        return userOrRole.managedEntities.includes(entity);
      }
      return true;
    }
    return false;
  },

  // Check if role can create formal groups (ONLY LEADER or ADMIN)
  canCreateGroups: (userOrRole?: UserProfile | UserRole): boolean => {
    if (!userOrRole) return false;
    const roleStr = typeof userOrRole === 'object' ? userOrRole.role : userOrRole;
    const norm = normalizeRole(roleStr);
    return norm === 'LEADER' || norm === 'ADMIN';
  },

  // Check if role can manage sensitive diaconal care inbox (ONLY LEADER or ADMIN)
  canManageDiakoni: (userOrRole?: UserProfile | UserRole): boolean => {
    if (!userOrRole) return false;
    const roleStr = typeof userOrRole === 'object' ? userOrRole.role : userOrRole;
    const norm = normalizeRole(roleStr);
    return norm === 'LEADER' || norm === 'ADMIN';
  },

  // Check if role can manage service rotas (VOLUNTEER, LEADER, or ADMIN)
  canManageServiceRotas: (userOrRole?: UserProfile | UserRole): boolean => {
    if (!userOrRole) return false;
    const roleStr = typeof userOrRole === 'object' ? userOrRole.role : userOrRole;
    const norm = normalizeRole(roleStr);
    return norm === 'VOLUNTEER' || norm === 'LEADER' || norm === 'ADMIN';
  },

  // Generic role requirement check
  hasRequiredRole: (
    userOrRole: UserProfile | UserRole | undefined,
    required: StandardUserRole | StandardUserRole[]
  ): boolean => {
    if (!userOrRole) return false;
    const roleStr = typeof userOrRole === 'object' ? userOrRole.role : userOrRole;
    const norm = normalizeRole(roleStr);
    const reqArray = Array.isArray(required) ? required : [required];
    return reqArray.includes(norm);
  }
};
