import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://server.betatestpro.com/api/';

  baseUrl = 'https://betatestpro.com/#/';

  constructor(private http: HttpClient) { }

  pruebas(){
    return this.http.get(this.url+'pruebas');
  }

  getBrands(id){
    console.log(id);
  	return this.http.get(this.url+'getBrands/'+id);
  }

  getFeatures(id){
  	return this.http.get(this.url+'getFeatures/'+id);
  }

  getModels(data){
  	return this.http.post(this.url+'getModels',data);
  }
  getBodyworks(data){
  	return this.http.post(this.url+'getBodyworks',data);
  }
  getTrims(data){
    return this.http.post(this.url+'getTrims',data);
  }
  getVersions(data){
  	return this.http.post(this.url+'getVersions',data);
  }

  publish(data){
  	return this.http.post(this.url+'publish',data);
  }
  update(data){
    return this.http.post(this.url+'update',data);
  }
  getAdverts(cat,special = false,criterial = 'id',type = 'asc'){

    let id = null;
    if (localStorage.getItem('modoautoUser')) {
      id = JSON.parse(localStorage.getItem('modoautoUser'))['id']
    }
    return this.http.get(this.url+'getAdverts/'+cat+'/'+id+'/'+special+'/'+criterial+'/'+type);
  }
  getMyAdverts(cat,id){

    return this.http.get(this.url+'getMyAdverts/'+cat+'/'+id);
  }
  getAdvert(id){
    return this.http.get(this.url+'getAdvert/'+id);
  }
  loadProfessionals(){
    return this.http.get(this.url+'loadProfessionals');
  }
  getProfessional(data){
    return this.http.post(this.url+'getProfessional',data);
  }
  filter(data){
    return this.http.post(this.url+'filter',data);
  }
  searchProfessionals(data){
    return this.http.post(this.url+'searchProfessionals',data);
  }
  loadWords(data){
    return this.http.post(this.url+'loadWords',data);
  }
  getBanner(type){
    return this.http.get(this.url+'getBanner/'+type);
  }
  uploadImage(data:any){

 //  	const httpOptions = {
	//   headers: new HttpHeaders({
	//    "Content-Type": "multipart/form-data"
	//   })
	// };

  	return this.http.post(this.url+'uploadImage',data);
  }

  /*/*/
  loginUser(data){
    return this.http.post(this.url+'loginUser',data);
  }

  registerUser(data){
    return this.http.post(this.url+'registerUser',data);
  }
  registerProfessional(data){
    return this.http.post(this.url+'registerProfessional',data);
  }

  updateUser(data){
    return this.http.post(this.url+'updateUser',data);
  }
  updateProfesional(data){
    return this.http.post(this.url+'updateProfesional',data);
  }
  uploadProfilePicture(data){
    return this.http.post(this.url+'uploadProfilePicture',data);
  }
  uploadProfessionalPicture(data){
    return this.http.post(this.url+'uploadProfessionalPicture',data);
  }
  saveSearch(data){
    return this.http.post(this.url+'saveSearch',data);
  }

  /**/

  favorite(data){
    return this.http.post(this.url+'favorite',data);
  }
  getFavorites(id){
    return this.http.get(this.url+'getFavorites/'+id);
  }
  deleteFiltro(id){
    return this.http.get(this.url+'deleteFiltro/'+id);
  }

  getSearches(id){
    return this.http.get(this.url+'getSearches/'+id);
  }
  checkFavorite(user_id,id){
    return this.http.get(this.url+'checkFavorite/'+user_id+'/'+id);
  }

  loadProvinces(){
    return this.http.get(this.url+'loadProvinces');
  }

  pdf(id){
    return this.http.get(this.url+'pdf/'+id);
  }

  feature(id){
    return this.http.get(this.url+'feature/'+id);
  }

  getFaqs(t){
    return this.http.get(this.url+'getFaqs/'+t);
  }

  deleteAdvert(id){
    return this.http.get(this.url+'deleteAdvert/'+id);
  }
  renovar(adv)
  {
    this._renovar(adv.id).subscribe(data=>{
      alert("El anuncio ha sido renovado por 90 días!");
      location.reload();
    });
  }
  _renovar(id){
    return this.http.get(this.url+'renovar/'+id);
  }

  getFeatured(id){
    return this.http.get(this.url+'getFeatured/'+id);
  }
  renovarTodo(id){
    return this.http.get(this.url+'renovarTodo/'+id);
  }
  contact(data){ // enviar pregunta
    return this.http.post(this.url+'contact',data);
  }
  denunciar(data){ // enviar pregunta
    return this.http.post(this.url+'denunciar',data);
  }
  respond(data){
    return this.http.post(this.url+'respond',data);
  }
  loadMessages(id){
    return this.http.get(this.url+'loadMessages/'+id);
  }

  getNewMessages(id){
    return this.http.get(this.url+'getNewMessages/'+id);
  }
  canQualify(data){
    return this.http.post(this.url+'canQualify',data);
  }
  calificar(data){
    return this.http.post(this.url+'calificar',data);
  }

  openLink(url)
  {
    if (url === undefined) {
      return false;
    }
    window.open(url,'_blank');
  }

}
