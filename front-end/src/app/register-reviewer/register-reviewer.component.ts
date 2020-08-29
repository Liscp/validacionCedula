import {Component, OnInit} from '@angular/core';
import {PersonService} from '../services/person.service';
import {Person} from '../models/person';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-register-reviewer',
  templateUrl: './register-reviewer.component.html',
  styleUrls: ['./register-reviewer.component.scss']
})
export class RegisterReviewerComponent implements OnInit {

  viewPassword = true;
  person: Person = {
    rol: 'Revisor',
    type_dni: '',
    dni: '',
    names: '',
    last_names: '',
    level_academy: '',
    specialty: '',
    phone: '',
    email: '',
    password: '',
    status: true,
  }

  constructor(
    private personService: PersonService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  validarCedula(cedula) {
    console.log(cedula)
  


    // Preguntamos si la cedula consta de 10 digitos

    if (cedula.length === 10) {
      //console.log(cedula.length)
    
   // Obtenemos el digito de la region que sonlos dos primeros digitosn
   const digitoRegion = cedula.substring(0, 2);

   // Pregunto si la region existe ecuador se divide en 24 regiones
   if (digitoRegion >= String(0) && digitoRegion <= String(24)) {

     // Extraigo el ultimo digito
     const ultimoDigito = Number(cedula.substring(9, 10));

     // Agrupo todos los pares y los sumo
     const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));

     // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
     let numeroUno: any = cedula.substring(0, 1);
     numeroUno = (numeroUno * 2);
     if (numeroUno > 9) {
       numeroUno = (numeroUno - 9);
     }

     let numeroTres: any = cedula.substring(2, 3);
     numeroTres = (numeroTres * 2);
     if (numeroTres > 9) {
       numeroTres = (numeroTres - 9);
     }

     let numeroCinco: any = cedula.substring(4, 5);
     numeroCinco = (numeroCinco * 2);
     if (numeroCinco > 9) {
       numeroCinco = (numeroCinco - 9);
     }

     let numeroSiete: any = cedula.substring(6, 7);
     numeroSiete = (numeroSiete * 2);
     if (numeroSiete > 9) {
       numeroSiete = (numeroSiete - 9);
     }

     let numeroNueve: any = cedula.substring(8, 9);
     numeroNueve = (numeroNueve * 2);
     if (numeroNueve > 9) {
       numeroNueve = (numeroNueve - 9);
     }

     const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;

     // Suma total
     const sumaTotal = (pares + impares);

     // extraemos el primero digito
     const primerDigitoSuma = String(sumaTotal).substring(0, 1);

     // Obtenemos la decena inmediata
     const decena = (Number(primerDigitoSuma) + 1) * 10;

     // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
     let digitoValidador = decena - sumaTotal;

     // Si el digito validador es = a 10 toma el valor de 0
     if (digitoValidador === 10) {
       digitoValidador = 0;
     }

     // Validamos que el digito validador sea igual al de la cedula
     if (digitoValidador === ultimoDigito) {
      alert("cedula valida")

       return true;
       
     } else {
      
       return false;
      
     }

   } else {
     alert("cédula no válida")
     return false;
   }
 } else {
   alert("Su cédula tiene mas o menos de 10 digitos")
   return false;
 }
 
}

  postPerson() {
    if (this.person.type_dni && this.person.dni && this.person.names && this.person.last_names && this.person.level_academy && this.person.specialty && this.person.phone && this.person.email && this.person.password) {
      let dataPerson = {
        person: this.person
      }
      this.personService.postPerson(dataPerson)
        .subscribe(
          res => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registro exitoso',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/login']);
          },
          err => {
            console.error(err);
          }
        );
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debes completar todos los datos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}


