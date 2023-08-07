type User = {
  permissions: string[];
  roles: string[];
}

type validateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
}

export function validateUserPermissions({
  user,
  permissions,
  roles,
}: validateUserPermissionsParams) {
  if (!user.permissions) {
    return false;
  }

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      return user?.permissions.includes(permission);
    });

    return hasAllPermissions;
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => {
      return user?.roles.includes(role);
    });

    return hasAllRoles;
  }

  return true;
}
