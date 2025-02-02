package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection= "Recommend")
public class Recommend {
	
	@Id
	private int id;
	private String userEmail;
	private String trackId;
	private String trackName;
	private String artistName;
	private String albumName;
	private String trackurl;
	private String trackGenre;
	
	public Recommend() {
		
	}


	public Recommend(int id, String userEmail, String trackId, String trackName, String artistName, String albumName,
			String trackurl, String trackGenre) {
		super();
		this.id=id;
		this.userEmail = userEmail;
		this.trackId = trackId;
		this.trackName = trackName;
		this.artistName = artistName;
		this.albumName = albumName;
		this.trackurl = trackurl;
		this.trackGenre = trackGenre;
		
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getUserEmail() {
		return userEmail;
	}


	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}


	public String getTrackId() {
		return trackId;
	}


	public void setTrackId(String trackId) {
		this.trackId = trackId;
	}


	public String getTrackName() {
		return trackName;
	}


	public void setTrackName(String trackName) {
		this.trackName = trackName;
	}


	public String getArtistName() {
		return artistName;
	}


	public void setArtistName(String artistName) {
		this.artistName = artistName;
	}


	public String getAlbumName() {
		return albumName;
	}


	public void setAlbumName(String albumName) {
		this.albumName = albumName;
	}


	public String getTrackurl() {
		return trackurl;
	}


	public void setTrackurl(String trackurl) {
		this.trackurl = trackurl;
	}


	public String getTrackGenre() {
		return trackGenre;
	}


	public void setTrackGenre(String trackGenre) {
		this.trackGenre = trackGenre;
	}


	@Override
	public String toString() {
		return "Favourite [id=" + id + ", userEmail=" + userEmail + ", trackId=" + trackId + ", trackName=" + trackName
				+ ", artistName=" + artistName + ", albumName=" + albumName + ", trackurl=" + trackurl + ", trackGenre="
				+ trackGenre + "]";
	}
	
	
	

}
