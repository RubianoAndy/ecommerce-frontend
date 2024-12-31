import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RolesService } from '../../services/roles/roles.service';
import { map } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RolesService);
  const router = inject(Router);
  const roles = route.data['roles'] as Array<any>;

  return roleService.getRole().pipe(
    map(role => {
      if (roles.includes(Number(role.roleId)))
        return true;
      else {
        router.navigate(['/account']);
        return false;
      }
    })
  );
};
