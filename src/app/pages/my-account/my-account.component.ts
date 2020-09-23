import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HeaderService } from '../../services/header.service';
import { ApiService } from '../../services/api.service';

declare var google;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('modoautoUser'));
  modalLoading = false;

  validations_form: FormGroup;
  errorMessage: string;
  validation_messages: any;

  validations_form2: FormGroup;
  errorMessage2: string;
  validation_messages2: any;

  map;
  marker;
  infowindowContent;
  infowindow;
  autocomplete;

  address;
  lat;
  lng;

  logo;
  banner;

  constructor(private formBuilder: FormBuilder, public api: ApiService) {

    this.fillInAddress = this.fillInAddress.bind(this);


    if (!this.user.avatar) {
      this.user.avatar = 'assets/user.svg';
    }
    this.logo = this.user.company ? this.user.company.logo : null;
  }

  ngOnInit(): void {
    this.api.getBanner(2).subscribe(data=>{
      this.banner = data[0];
    })

    this.validation_messages = {
      'name': [
        { type: 'required', message: 'El campo nombre es requerido' }
      ],
      'last_name': [
        { type: 'required', message: 'El campo apellido es requerido' }
      ],
      'phone': [
        { type: 'required', message: 'El campo teléfono es requerido' },
      ],
      'password': [
        { type: 'required', message: 'El campo contraseña es requerido' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' }
      ]
    };

    this.validations_form = this.formBuilder.group({
      email: new FormControl(this.user.email, Validators.compose([
        Validators.required,
      ])),
      name: new FormControl(this.user.name, Validators.compose([
        Validators.required,
      ])),
      last_name: new FormControl(this.user.last_name, Validators.compose([
        Validators.required,
      ])),
      phone: new FormControl(this.user.phone, Validators.compose([
        Validators.required,
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
    });

    /**/

    if (this.user.company) {
      this.validation_messages2 = {
        'name': [
          { type: 'required', message: 'El campo nombre es requerido' }
        ],
        'last_name': [
          { type: 'required', message: 'El campo apellido es requerido' }
        ],
        'phone': [
          { type: 'required', message: 'El campo teléfono es requerido' },
        ],
        'title': [
          { type: 'required', message: 'El campo título es requerido' },
        ],
        'stock': [
          { type: 'required', message: 'El campo stock es requerido' },
        ],
        'address': [
          { type: 'required', message: 'El campo dirección es requerido' },
        ],
        'web': [
          { type: 'required', message: 'El campo website es requerido' },
        ],
        'description': [
          { type: 'required', message: 'El campo descripción es requerido' },
        ],
        'password': [
          { type: 'required', message: 'El campo contraseña es requerido' },
          { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' }
        ]
      };

      this.validations_form2 = this.formBuilder.group({
        email: new FormControl(this.user.email, Validators.compose([
          Validators.required,
        ])),
        name: new FormControl(this.user.name, Validators.compose([
          Validators.required,
        ])),
        last_name: new FormControl(this.user.last_name, Validators.compose([
          Validators.required,
        ])),
        phone: new FormControl(this.user.phone, Validators.compose([
          Validators.required,
        ])),
        title: new FormControl(this.user.company.title, Validators.compose([
          Validators.required,
        ])),
        stock: new FormControl(this.user.stock, Validators.compose([
          Validators.required,
        ])),
        address: new FormControl(this.user.company.address, Validators.compose([
          Validators.required,
        ])),
        web: new FormControl(this.user.company.web, Validators.compose([
          Validators.required,
        ])),
        description: new FormControl(this.user.company.description, Validators.compose([
          Validators.required,
        ])),
        password: new FormControl(null, Validators.compose([
          Validators.minLength(8),
          Validators.required
        ])),
      });
    }

  }

  ngAfterViewInit()  
  {
    setTimeout(()=>{
      this.initAutocomplete();
    },1000)
  }

  updateUser(values)
  {
    console.log(values);
    values.id = this.user.id;
  	this.modalLoading = true;
  	this.api.updateUser(values).subscribe(data=>{
  		this.modalLoading = false;
  		localStorage.setItem('modoautoUser',JSON.stringify(data));
  		location.reload();
  	});
  }

  updateProfesional(values)
  {
    values.lt = this.lat;
    values.ln = this.lng;
    values.address = this.address;
    values.id = this.user.id;

    console.log(values);
    this.modalLoading = true;
    this.api.updateProfesional(values).subscribe(data=>{
      this.modalLoading = false;
      localStorage.setItem('modoautoUser',JSON.stringify(data));
      location.reload();
    });

  }

  initAutocomplete() {
      var countries = {
          'es': {
            center: {lat: 40.5, lng: -3.7},
            zoom:5
          }
      }
      var countryRestrict = {'country': 'es'};
      this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: countries['es'].zoom,
          center: countries['es'].center,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false
      });
      this.autocomplete = new google.maps.places.Autocomplete(
          document.getElementById('autocomplete'), {
              types: ['address'],
              componentRestrictions:countryRestrict
          }
      );
      this.autocomplete.setFields(['address_component' , 'geometry']);

      this.marker = new google.maps.Marker({
        map: this.map,
        position: {lat: parseFloat(this.user.company.lt) || 0, lng:parseFloat(this.user.company.ln) || 0},
        anchorPoint: new google.maps.Point(0, -29)
      });

      this.infowindow = new google.maps.InfoWindow();
      this.infowindowContent = document.getElementById('infowindow-content');
      this.infowindow.setContent(this.infowindowContent);

      this.autocomplete.addListener('place_changed', this.fillInAddress);

      console.log(this.autocomplete);
  }

  fillInAddress() {
    console.log(this.autocomplete);
    var place = this.autocomplete.getPlace();
    this.infowindow.close();
    this.marker.setVisible(false);

    if (place.geometry) {
        this.map.panTo(place.geometry.location);
        this.map.setZoom(16);

        this.marker.setPosition(place.geometry.location);
        this.marker.setVisible(true);

        let address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');

        this.infowindowContent.children['place-icon'].src = place.icon;
        this.infowindowContent.children['place-name'].textContent = place.name;
        this.infowindowContent.children['place-address'].textContent = address;
        this.infowindow.open(this.map, this.marker);

        this.address = address;
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();

    } else {
        // document.getElementById('autocomplete').placeholder = 'Ingresa una dirección';
    }
      // console.log(autocomplete.getPlace());
  }

  processFile(imageInput: any) {

    console.log('hola')
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    console.log(file);

    reader.addEventListener('load', (event: any) => {

      this.user.avatar = event.target.result;

      let formData = new FormData();
      formData.append('file',file);
      formData.append('id',this.user.id);

      this.api.uploadProfilePicture(formData).subscribe(data=>{
        localStorage.setItem('modoautoUser',JSON.stringify(data));
      })

    });

    reader.readAsDataURL(file);
  }

  processFile1(ILogo: any) {

    console.log('hola')
    const file: File = ILogo.files[0];
    const reader = new FileReader();
    console.log(file);

    reader.addEventListener('load', (event: any) => {

      this.logo = event.target.result;

      console.log(this.logo);

      let formData = new FormData();
      formData.append('file',file);
      formData.append('id',this.user.id);

      this.api.uploadProfessionalPicture(formData).subscribe(data=>{
        localStorage.setItem('modoautoUser',JSON.stringify(data));
      })

    });

    reader.readAsDataURL(file);
  }

  processFile2(ILogo2: any) {

    console.log('hola')
    const file: File = ILogo2.files[0];
    const reader = new FileReader();
    console.log(file);

    reader.addEventListener('load', (event: any) => {

      this.logo = event.target.result;

      console.log(this.logo);

      let formData = new FormData();
      formData.append('file',file);
      formData.append('id',this.user.id);

      this.api.uploadProfessionalPicture(formData).subscribe(data=>{
        localStorage.setItem('modoautoUser',JSON.stringify(data));
      })

    });

    reader.readAsDataURL(file);
  }

}
