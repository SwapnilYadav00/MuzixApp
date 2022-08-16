import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { favouriteSong } from '../favouriteSong';
import { SongService } from '../services/song.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  myfav:any;
  musics:any;
  favmusicbyid:any;
  player = new Audio;
  searching:any;
  p:number=1;
  favflag:number=0;
  checkfavid:number;
  favsong: favouriteSong = new favouriteSong();
  panelOpenState = false;
  isLoggedin:boolean;
  constructor(private songservice:SongService,private sharedservice:SharedService,public dialog: MatDialog) {
    if(JSON.parse(localStorage.getItem("name"))===null){
      this.isLoggedin=true;
    }
    else
    {
      this.isLoggedin=false;
    }
   }

  ngOnInit(): void {
    this.songservice.getFavouriteSongs().subscribe(data => {
      this.musics = data;
console.log(this.musics);
      this.favmusicbyid = this.musics.filter(music => music.userEmail == JSON.parse(localStorage.getItem("userid")));

      // console.log(this.musics);
      // console.log(this.musics[0].artistName);
      // console.log(this.musics[0].albumName);
    })
  }
  playSong(audio) {
    this.player.pause();
    this.player.src = audio.trackurl;
    this.player.play();
  }
  stopSong(audio) {
    this.player.pause();
  }

  


  //searching
  Searchingfun(){
    if(this.searching=="")
    {
      this.ngOnInit();
    }
    else{
      this.favmusicbyid=this.favmusicbyid.filter(res=>{
        return res.trackName.toLocaleLowerCase().match(this.searching.toLocaleLowerCase());
      });
    }
  }

  deletefav(id:number){

    if(JSON.parse(localStorage.getItem("token"))===null){
    //populate message box
    //alert("You have to login");

    this.openDialog();
    
    }
    else
    {

   this.checkfavid=id;


    // this.checkfav.forEach(element => {

    //   if(element.userEmail==this.favsong.userEmail &&  this.favsong.trackId==element.trackId)
    //   {
    //       this.favflag=0;
    //       console.log(this.favflag);
    //   }
      
    // });

    // console.log(this.favflag);

    if(this.favflag==0)
    {
console.log(this.favsong);
console.log(this.checkfavid);
      this.songservice.deletefavourite(id).subscribe(
        data=>{
          
          console.log("delete");
          console.log(data);
          this.sharedservice.setdialogtitle("Deleted");
          this.sharedservice.setdialogcontent("Deleted from your Favourite list");
          this.openaddDialog();
          this.ngOnInit();
        }
      )
      console.log("hello");
    }
    else
    {
      this.sharedservice.setdialogtitle("Not Deleted");
      this.sharedservice.setdialogcontent("Not in Favourites");
      this.openaddDialog();
    }
  }
    this.ngOnInit(); 
  }
  openaddDialog() {
    this.dialog.open(AddDialogComponent);
  }
   openDialog() {
      this.dialog.open(DialogComponent);
    }
}
