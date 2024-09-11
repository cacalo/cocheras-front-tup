import { CanActivateFn } from '@angular/router';

export const soloLogueadoGuard: CanActivateFn = (route, state) => {
  return true;
};
