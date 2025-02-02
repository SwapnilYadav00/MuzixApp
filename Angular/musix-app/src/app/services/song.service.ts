import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { MusicList,Songarr } from '../music-list';
import { catchError, publishReplay, refCount } from 'rxjs/operators';
import { comments } from '../comment';
import { tap } from 'rxjs/operators';
import { favouriteSong } from '../favouriteSong';
import { recommendedSong } from '../recommendedSong';
import { registeruser } from '../registeruser';
import { recommendedcounter } from '../recommendcounter';


@Injectable({
  providedIn: 'root'
})
export class SongService {

  url:string;
  

  allcomment: Array<comments>=[];

  subject:BehaviorSubject<Array<comments>>=new BehaviorSubject(this.allcomment);

  constructor(private httpclient:HttpClient) {
    
   }

  newsongcomment: comments = new comments();

  favsong: favouriteSong = new favouriteSong();

  recsong: recommendedSong = new recommendedSong();
  reccounter: recommendedcounter = new recommendedcounter();

  registerUser: registeruser = new registeruser();

 

  registeringuser(registerUser: registeruser): Observable<registeruser> {

    return this.httpclient.post<registeruser>('http://localhost:8282/register',registerUser).pipe(catchError(err=>this.handleError(err)));

  }

  handleError(err){
   
    return throwError(err);
  }

 
  

 

  addtofavourite(addfavouritesong: favouriteSong): Observable<favouriteSong> {

    
    return this.httpclient.post<favouriteSong>('http://localhost:8080/favourites/addtofav',addfavouritesong);
  }
  
  deletefavourite(id:number):Observable<any>{
      console.log("in dFav ser");
    this.url="http://localhost:8080/favourites/deletefav";
    return this.httpclient.delete(`${this.url}/${id}`,{responseType:'text'});
  }

  getFavouriteSongs(): Observable<Array<favouriteSong>> {
    return this.httpclient.get<Array<favouriteSong>>('http://localhost:8080/favourites/getallfav');
  }



  addtorecommendation(addrecommendation:recommendedSong): Observable<recommendedSong> {

    
    return this.httpclient.post<recommendedSong>('http://localhost:8080/recommend/addtorecommend',addrecommendation);
  }
  
  getRecommendedSongs(): Observable<Array<recommendedSong>> {
    return this.httpclient.get<Array<recommendedSong>>('http://localhost:8080/recommend/getallrecommend');
  }


  addtorecommendationcounter(addrecommendationcounter:recommendedcounter): Observable<recommendedcounter> {

    
    return this.httpclient.post<recommendedcounter>('http://localhost:8080/recommendcounter/addtorecommendcounter',addrecommendationcounter);
  }


  getrecommendationcounter(): Observable<Array<recommendedcounter>> {
    return this.httpclient.get<Array<recommendedcounter>>('http://localhost:8080/recommendcounter/getallrecommendcounter');
  }

  getRegisteredUser(userid:String):Observable<registeruser>{
    return this.httpclient.get<registeruser>(`http://localhost:8282/getuserdetails/${userid}`);
  }


  getCountryNamebyisoCode():Observable<any>{

    return this.httpclient.get<any>('https://api.printful.com/countries');

  }

  //fetching itune data
  iTunesUrl = 'https://itunes.apple.com/search'; 
  // iTunesUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&api_key=adff06ef69bf88bdf5348e0ee5e37d4a'; 
  musicList: Observable<MusicList[]>;


  getMusicList(queryString): Observable<MusicList[]> {


    console.log(queryString);
    
      if (!this.musicList) {
        this.musicList = this.httpclient.get<MusicList[]>(`${this.iTunesUrl}?term=${queryString}`).pipe(
          publishReplay(1),
          refCount()
        );  
      }
      console.log(this.musicList);
      return this.musicList;
      
  
  }


  //Getting country specific song data

  getCountryWiseMusicList(countrycode,song): Observable<MusicList[]> {

      if (!this.musicList) {
        this.musicList = this.httpclient.get<MusicList[]>(`${this.iTunesUrl}?term=${song}&country=${countrycode}`).pipe(
          publishReplay(1),
          refCount()
        );  
      }
      console.log(this.musicList);
      return this.musicList;
      
  
  }

  clearCache() {
    this.musicList = null;
  }

      //Getting artist specific song data

      getArtistWiseMusicList(artistname): Observable<MusicList[]> {

        if (!this.musicList) {
          this.musicList = this.httpclient.get<MusicList[]>(`${this.iTunesUrl}?term=${artistname}&artistName=${artistname}`).pipe(
            publishReplay(1),
            refCount()
          );  
        }
        console.log(this.musicList);
        return this.musicList;
        

    }

    //Getting Album specific song data
    getAlbumWiseMusicList(albumname): Observable<MusicList[]> {

      if (!this.musicList) {
        this.musicList = this.httpclient.get<MusicList[]>(`${this.iTunesUrl}?term=${albumname}&collectionName=${albumname}`).pipe(
          publishReplay(1),
          refCount()
        );  
      }
      console.log(this.musicList);
      return this.musicList;
      

  }

}
