import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { HttpService } from '../home/http.service';
import { registeruser } from '../registeruser';
import { AuthenticationService } from '../services/authentication-service';
import { SharedService } from '../shared/shared.service';
import { UserHelper } from '../UserHelper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userhelper:UserHelper=new UserHelper();
  user:registeruser;
  name:any;
  
  constructor(public http: HttpService,private authService: AuthenticationService,public dialog: MatDialog,private sharedservice:SharedService) { 
    this.user=new registeruser();
  }
  
  ngOnInit(): void {
    this.name=JSON.parse(localStorage.getItem("userid"));
    
  }

  changepasswordform=new FormGroup({
    newpassword: new FormControl(),
    oldpassword:new FormControl(),
    email:new FormControl()
})
get newpassword(){
  return this.changepasswordform.get('newpassword');
}
get oldpassword(){
  return this.changepasswordform.get('oldpassword');
}
get email(){
  return this.changepasswordform.get('email');
}


  changepassword(){
    this.userhelper.oldPassword=this.oldpassword.value;
    this.userhelper.newPassword=this.newpassword.value;
    this.userhelper.email=this.email.value;
    

    this.authService.changePasswordUser(this.userhelper).subscribe(data => {
      this.sharedservice.setdialogtitle("Password Change Successfull!");
    this.openaddDialog();
    },()=>{
    this.sharedservice.setdialogtitle("Password Change UnSuccessfull!");
    
    this.openaddDialog();
    }) 

  }
  openaddDialog() {
    this.dialog.open(AddDialogComponent);
  }

}
