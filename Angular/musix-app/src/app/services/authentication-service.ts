import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { loginuser } from '../loginuser';



@Injectable()
export class AuthenticationService {

    loginUser: loginuser = new loginuser();
    changePasswordEndPoint:string;
  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(data:loginuser) {
      console.log("authuser"+data);
    return this.httpClient.post(`http://localhost:8282/login`,data);

  }

//   setBearerToken(token:string) {
//       console.log(token);
//     localStorage.setItem('authToken',token);
//   }

//   getBearerToken():string {
//     return localStorage.getItem('token');

//   }

  isUserAuthenticated():boolean {
    if(localStorage.getItem("token")===null) {
        return false;
      
     }
    return true;
  }

  public changePasswordUser(UserHelper:any){
    console.log("inside cP");
   
    return this.httpClient.put('http://localhost:8282/changePassword',UserHelper).pipe(catchError(err=>this.handleError(err)));

  }

  handleError(err){
   
    return throwError(err);
  }
  

//   isUserAuthenticated(token:string): Promise<boolean> {
//     return this.httpClient.post(`http://localhost:3000/auth/v1/isAuthenticated`,{},{
//       headers:new HttpHeaders().set(`Authorization`,`Bearer ${token}`)
//     }).map(response=>response['isAuthenticated']).toPromise();
//   }
}
