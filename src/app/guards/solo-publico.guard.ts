import { CanActivateFn } from '@angular/router';

export const soloPublicoGuard: CanActivateFn = (route, state) => {
  return true;
};
