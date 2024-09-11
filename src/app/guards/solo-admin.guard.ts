import { CanActivateFn } from '@angular/router';

export const soloAdminGuard: CanActivateFn = (route, state) => {
  return true;
};
