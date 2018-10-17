import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    public token: string;
    private headers: HttpHeaders;
    private readonly apiUrl = environment.apiUrl;
    private readonly baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");

        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('user'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(this.apiUrl+'/auth/login', { email: email, password: password }, { headers: this.headers } )
            .pipe(
                map((response: Response) => {
                    return response;
                })
            );
    }
}
