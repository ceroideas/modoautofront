import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HeaderService } from '../../services/header.service';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name = "Navbar";
  perfil = false;
  sub1;

  validations_form: FormGroup;
  errorMessage: string;
  validation_messages: any;

  validations_form2: FormGroup;
  errorMessage2: string;
  validation_messages2: any;

  validations_form3: FormGroup;
  errorMessage3: string;
  validation_messages3: any;

  modalLoading = false;

  user:any;

  newmessages:any;

  constructor(public headerService: HeaderService, private formBuilder: FormBuilder, public api: ApiService, public router: Router, public events: EventsService) {

    this.events.destroy('removeNewMessagemark');
    this.events.subscribe('removeNewMessagemark',()=>{
      this.newmessages = false;
    });

    if (localStorage.getItem('modoautoUser')) {
      this.user = JSON.parse(localStorage.getItem('modoautoUser'));

      this.api.getNewMessages(this.user.id).subscribe(data=>{
        this.newmessages = data;
      })
    }

    this.validation_messages = {
      'email': [
        { type: 'required', message: 'El campo email es requerido' },
        { type: 'pattern', message: 'El email debe tener un formato correcto' }
      ],
      'password': [
        { type: 'required', message: 'El campo contraseña es requerido' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' }
      ]
    };

    this.validations_form = this.formBuilder.group({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
      remember: new FormControl(null)
    });

    /***/

    this.validation_messages2 = {
      'name': [
        { type: 'required', message: 'El campo nombre es requerido' }
      ],
      'email': [
        { type: 'required', message: 'El campo email es requerido' },
        { type: 'pattern', message: 'El email debe tener un formato correcto' }
      ],
      'password': [
        { type: 'required', message: 'El campo contraseña es requerido' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' }
      ],
      'conditions': [
        { type: 'required', message: 'Debe aceptar las condiciones de uso' },
      ]
    };

    this.validations_form2 = this.formBuilder.group({
      name: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
      conditions: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });

    this.validation_messages3 = {
      'name': [
        { type: 'required', message: 'El campo nombre es requerido' }
      ],
      'phone': [
        { type: 'required', message: 'El campo nombre es requerido' }
      ],
      'email': [
        { type: 'required', message: 'El campo email es requerido' },
        { type: 'pattern', message: 'El email debe tener un formato correcto' }
      ],
      'password': [
        { type: 'required', message: 'El campo contraseña es requerido' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' }
      ],
      'stock': [
        { type: 'required', message: 'Debe seleccionar el número de stock de vehiculos' },
      ],
      'conditions': [
        { type: 'required', message: 'Debe aceptar las condiciones de uso' },
      ]
    };

    this.validations_form3 = this.formBuilder.group({
      name: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      phone: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
      stock: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      conditions: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });

  }

  ngOnInit(): void {
    this.headerService.getCurrentSection();

    this.sub1 = this.headerService.currentSection.subscribe(section => {
      if (section == 'perfil') {
        this.perfil = true;
      }else{
        this.perfil = false;
      }
    });

    this.sub1.unsubscribe();


    /**/

    $('[data-h5-title').click(function(e){
      let title = $(this).data('h5-title');
      $('#title-header').html(title);
      setTimeout(()=>{
        $(this).removeClass('active');
      },100)
    })
  }

  changeName()
  {
  	this.name = "Modoauto";
  }

  loginUser(values)
  {
    console.log("login",values);
    this.modalLoading = true;
    this.api.loginUser(values).subscribe(data=>{
      
      localStorage.setItem('modoautoUser',JSON.stringify(data));

      location.reload();

      console.log(data);
    },e=>{
      this.modalLoading = false;
      this.errorMessage = "No ha sido posible iniciar sesion, verifica los datos";

      setTimeout(()=>{
        this.errorMessage = null;
      },3000)
      console.log(e);
    });
  }

  registerUser(values)
  {
    console.log("register",values);
    this.modalLoading = true;
    this.api.registerUser(values).subscribe(data=>{
      this.modalLoading = false;

      $('#register').removeClass('active show');
      $('#registered').tab('show');

      console.log(data);
    },e=>{
      this.modalLoading = false;
      this.errorMessage2 = "No ha sido posible registrar al usuario, verifica los datos";

      setTimeout(()=>{
        this.errorMessage2 = null;
      },3000)
      console.log(e);
    });
  }

  registerProfessional(values)
  {
    console.log("register",values);
    this.modalLoading = true;
    this.api.registerProfessional(values).subscribe(data=>{
      this.modalLoading = false;

      $('#profesional').removeClass('active show');
      $('#registered2').tab('show');

      console.log(data);
    },e=>{
      this.modalLoading = false;
      this.errorMessage2 = "No ha sido posible registrarse como profesional, verifica los datos";

      setTimeout(()=>{
        this.errorMessage2 = null;
      },3000)
      console.log(e);
    });
  }

  logout()
  {
    localStorage.removeItem('modoautoUser');
    window.open('/','_self');
  }
  

}
