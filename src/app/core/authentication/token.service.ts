import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, share, timer } from 'rxjs';

import { LocalStorageService } from '@shared';
import { currentTimestamp, filterObject } from './helpers';
import { Token } from './interface';
import { BaseToken } from './token';
import { TokenFactory } from './token-factory.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements OnDestroy {
  private readonly key = 'ng-matero-token';

  private readonly store = inject(LocalStorageService);
  private readonly factory = inject(TokenFactory);

  private readonly change$ = new BehaviorSubject<BaseToken | undefined>(undefined);
  private readonly refresh$ = new Subject<BaseToken | undefined>();
  private domainTokenSubject = new BehaviorSubject<string | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  domainTokenSignal$ = this.domainTokenSubject.asObservable();
  tokenSignal$ = this.tokenSubject.asObservable();
  private timer$?: Subscription;

  private _token?: BaseToken;

  private get token(): BaseToken | undefined {
    if (!this._token) {
      this._token = this.factory.create(this.store.get(this.key));
    }

    return this._token;
  }

  change() {
    return this.change$.pipe(share());
  }

  refresh() {
    this.buildRefresh();

    return this.refresh$.pipe(share());
  }

  set(token?: Token) {
    // console.log(token)
    this.save(token);

    return this;
  }

  clear() {
    this.save();
  }

  valid() {
    return this.token?.valid() ?? false;
  }

  getBearerToken() {
    return this.token?.getBearerToken() ?? '';
  }

  getRefreshToken() {
    return this.token?.refresh_token;
  }

  ngOnDestroy(): void {
    this.clearRefresh();
  }
  setDomainToken(domainToken: string): void {
    this.domainTokenSubject.next(domainToken);
  }

  getDomainToken(): string | null {
    return this.domainTokenSubject.value;
  }
  setToken(token: string): void {
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
  private save(token?: Token) {
    this._token = undefined;

    if (!token) {
      this.store.remove(this.key);
    } else {
      const value = Object.assign({ access_token: '', token_type: 'Bearer' }, token, {
        exp: token.expires_in ? currentTimestamp() + token.expires_in : null,
      });
      this.store.set(this.key, filterObject(value));
    }

    this.change$.next(this.token);
    this.buildRefresh();
  }

  private buildRefresh() {
    this.clearRefresh();

    if (this.token?.needRefresh()) {
      this.timer$ = timer(this.token.getRefreshTime() * 1000).subscribe(() => {
        this.refresh$.next(this.token);
      });
    }
  }

  private clearRefresh() {
    if (this.timer$ && !this.timer$.closed) {
      this.timer$.unsubscribe();
    }
  }
}
