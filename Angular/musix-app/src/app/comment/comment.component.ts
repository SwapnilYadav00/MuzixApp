import { Component, OnInit } from '@angular/core';
import { comments } from '../comment';
import { SongService } from '../services/song.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  songcomment:any;

  constructor(private sharedservice:SharedService, private songservice:SongService) { }

  trackpassdata;
  showcomments=[];
  comment_text:any;
  commenter_name:any;
  errMessage: string;
  newsongcomment: comments = new comments();
  newsongcomments: Array<comments> = [];
  successMessage:string;

  ngOnInit(): void {

    this.trackpassdata=this.sharedservice.getcommentdataState();
   

   

  }

  cancelComment(){
    this.successMessage="";
  }

  submitComment(){
    this.newsongcomment.trackid=this.trackpassdata.trackid;
    this.newsongcomment.name=this.commenter_name;
    this.newsongcomment.comment=this.comment_text;
    
    console.log(this.newsongcomment);    
    if (!this.commenter_name || !this.comment_text) {
      this.errMessage = 'Name and Comment both are required fields';
      return;
    }
    
  }
}
