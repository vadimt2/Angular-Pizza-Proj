import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser } from '../../interfaces/iuser'
import { environment, endPoint } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<IUser>;
    public user: Observable<IUser>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): IUser {
        return this.userSubject.value;
    }

    login(email, password) {
        const user = {email: email, password: password}
        return this.http.post<IUser>(`${environment.apiUrl}${endPoint.users}/login`, user)
            .pipe(map(user => {
                let toUser = <any>user;
                const mapUser:IUser = toUser.userDetails;
                mapUser.token = user.token;
                localStorage.setItem('user', JSON.stringify(mapUser));
                this.userSubject.next(mapUser);
                return mapUser;
            }));
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: IUser) {
        return this.http.post(`${environment.apiUrl}${endPoint.users}/register`, user);
    }

    getAll() {
        return this.http.get<IUser[]>(`${environment.apiUrl}${endPoint.users}`);
    }

    getById(id: string) {
        return this.http.get<IUser>(`${environment.apiUrl}${endPoint.users}/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}${endPoint.users}/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}