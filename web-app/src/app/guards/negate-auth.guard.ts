import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { FornecedorService } from "../services/fornecedor.service";

@Injectable({
  providedIn: 'root'
})
export class NegateAuthGuard implements CanActivate {
  constructor(private fornecedorService: FornecedorService, private router: Router) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
      if (this.fornecedorService.getIsLoggedIn()) {
          this.router.navigate(['/dashboard']);
          return false;
      } 
      else {
          return true;
      }
  }
}
