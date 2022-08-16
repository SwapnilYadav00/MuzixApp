package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.ResourceNotFoundException;
import com.example.demo.model.Favourite;
import com.example.demo.repository.FavouriteRepository;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/favourites")
public class FavouriteController {
	static int count=0;
	
	
	@Autowired
	private FavouriteRepository repository;
	
	@PostMapping("/addtofav")
	public String addtoFavourite(@RequestBody Favourite favourite)
	{
		count=repository.findAll().size()+1;
		favourite.setId(count);
		
		repository.save(favourite);
		System.out.println(favourite);
		
		return "Added in Favourite";
	}
	
	@GetMapping("/getallfav")
	public List<Favourite> getFavourite()
	{
		return repository.findAll();
	}

	@DeleteMapping("/deletefav/{id}")
	public String deleteFavourite(@PathVariable("id") int id) {
		System.out.println("Inside delete");
		//count=repository.findAll().size()-1;
		//repository.delete();
		Favourite fav = repository.findById(id).get(); 
		try {
			//System.out.println(favourite);
		this.repository.delete(fav);
		return "Deleted Succussfully";
		}catch(Exception e){
			return ("Exception"+e);
		}
		
	}

}
