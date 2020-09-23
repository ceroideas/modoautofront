import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
 
  user = JSON.parse(localStorage.getItem('modoautoUser'));
  favorites:any;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    if (!this.user) {
      return;
    }
  	this.api.getFavorites(this.user.id).subscribe((data:any)=>{
  		this.favorites = data;
  	})
  }

  removeFav(id)
  {
    // let removeElement = (add,remove)=>{
    //   let list = event.srcElement.classList;
    //   list.remove(remove);
    //   list.add(add);
    // }

    if (this.user) {
      let data = {user_id:this.user.id,id:id};
      this.api.favorite(data).subscribe(data=>{

        location.reload();
        if (data === 0) {
          // removeElement('fa-heart-o','fa-heart')
        }else{
          // removeElement('fa-heart','fa-heart-o')
        }
      })
    }else{
      console.log('401');
    }
  }

}
