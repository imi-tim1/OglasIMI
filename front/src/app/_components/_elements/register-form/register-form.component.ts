import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {


  showApplicantFormBool: boolean = true;
  showEmployerFormBool: boolean = false;

  appFirstName: string = '';
  appLastName: string = '';
  appEmail: string = '';
  appPhoneNum: string = '';
  appPass1: string = '';
  appPass2: string = '';
  appPicture: string = '';
  wrongAppFirstNameBool: boolean = false;
  wrongAppLastNameBool: boolean = false;
  wrongAppEmailBool: boolean = false;
  wrongAppPhoneBool: boolean = false;
  wrongAppPass1Bool: boolean = false;
  wrongAppPass2Bool: boolean = false;
  wrongAppPictureBool: boolean = false;

  pattAlphaWithSpaces: RegExp = /^[a-zA-Z ]+$/;
  pattTwoSpaces: RegExp = /  /;
  pattEmail: RegExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  pattPhone: RegExp = /^\+?[0-9]{9,12}$/;
  pattPassword: RegExp = /.{6,}$/;

  constructor(public applicantService: ApplicantService,
              public employerService: EmployerService) { }

  ngOnInit(): void {
  }

  showMeApplicantForm() {
    if (this.showApplicantFormBool == false) //trenutno nije prikazana applicant forma
    {
      this.showEmployerFormBool = false; //sakrij employer
      this.showApplicantFormBool = true; //prikazi applicant
      
      /*let a = <HTMLSelectElement>document.getElementById('appBtn');
      a.style.backgroundColor = "blue";
      a.style.color = "btn-light";
      let e = <HTMLSelectElement>document.getElementById('empBtn');
      e.style.backgroundColor = "btn-light";
      e.style.color = "blue;"*/

      console.log(this.appFirstName);
    }
  }

  showMeEmployerForm() {
    if (this.showEmployerFormBool == false)//prikazi emp
    {
      this.showApplicantFormBool = false;
      this.showEmployerFormBool = true;

      console.log(this.appFirstName);

      /*let a = <HTMLSelectElement>document.getElementById('appBtn');
      a.style.backgroundColor = "btn-light";
      a.style.color = "blue;"
      let e = <HTMLSelectElement>document.getElementById('empBtn');
      e.style.backgroundColor = "blue";
      e.style.color = "btn-light;"*/
    }
  }

  /*firstNameValidation(): boolean {
    let patt = new RegExp(/^[a-zA-Z ]+$/);
    let pattMultipleSpaces = /  /;
    let num = /^\+?[0-9]$/;
    //this.appFirstName = this.appFirstName.trim();
    console.log(this.appFirstName);

    if (patt.test(this.appFirstName) && !pattMultipleSpaces.test(this.appFirstName))
    {
      console.log("DOBROOO JEEEEEEEEEEEEE");
      this.wrongAppFirstNameBool = false;
      return true;
    }
    else
    {
      console.log("NIJE DOBROOOOOOO");
      //alert("Nije uneto dobro korisnicko ime!");
      let p = <HTMLSelectElement>document.getElementById("appFirstName");
      p.focus();
      this.wrongAppFirstNameBool = true;
      return false;
    }
  }
  lastNameValidation() {
    let patt = new RegExp(/^[a-zA-Z]+$/);
    //this.appLastName = this.appLastName.trim();
    console.log(this.appLastName);

    if (patt.test(this.appLastName))
    {
      console.log("DOBROOO JEEEEEEEEEEEEE");
      this.wrongAppLastNameBool = false;
      return true;
    }
    else
    {
      console.log("NIJE DOBROOOOOOO");
      //alert("Nije uneto dobro korisnicko ime!");
      let p = <HTMLSelectElement>document.getElementById("appLastName");
      p.focus();
      this.wrongAppLastNameBool = true;
      return false;
    }
  }

  emailValidation() {
    let patt = new RegExp(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/);
    //this.appEmail = this.appEmail.trim();
    console.log(this.appEmail);

    if (patt.test(this.appEmail))
    {
      console.log("DOBROOO JEEEEEEEEEEEEE");
      this.wrongAppEmailBool = false;
      return true;
    }
    else
    {
      console.log("NIJE DOBROOOOOOO");
      //alert("Nije uneto dobro korisnicko ime!");
      let p = <HTMLSelectElement>document.getElementById("appEmail");
      p.focus();
      this.wrongAppEmailBool = true;
      return false;
    }
  }*/

  isAlphaWithoutMultipleSpaces(element: string): boolean {
    if (this.pattAlphaWithSpaces.test(element) && !(this.pattTwoSpaces.test(element)))
      return true;
    return false;
  }

  isCorrectEmail(element: string): boolean {
    if (this.pattEmail.test(element))
      return true;
    return false;
  }

  isCorrectPhoneNumber(element: string): boolean {
    if (this.pattPhone.test(element))
      return true;
    return false;
  }

  isCorrectPassword(element: string): boolean {
    if (this.pattPassword.test(element))
      return true;
    return false;
  }

  isCorrectPicture(element: string): boolean {
    return true;
  }

  firstNameValidation(): boolean {
    if (this.isAlphaWithoutMultipleSpaces(this.appFirstName) == true) {
      console.log("dobro ime");
      this.wrongAppFirstNameBool = false;
      return true;
    }
    console.log("lose ime");
    (<HTMLSelectElement>document.getElementById('appFirstName')).focus();
    this.wrongAppFirstNameBool = true;
    return false;
  }

  lastNameValidation(): boolean {
    if (this.isAlphaWithoutMultipleSpaces(this.appLastName) == true) {
      console.log("dobro prezime");
      this.wrongAppLastNameBool = false;
      return true;
    }
    console.log("lose prezime");
    (<HTMLSelectElement>document.getElementById('appLastName')).focus();
    this.wrongAppLastNameBool = true;
    return false;
  }

  appEmailValidation(): boolean {
    if (this.isCorrectEmail(this.appEmail) == true) {
      console.log("dobar mejl");
      this.wrongAppEmailBool = false;
      return true;
    }
    console.log("los mejl");
    (<HTMLSelectElement>document.getElementById('appEmail')).focus();
    this.wrongAppEmailBool = true;
    return false;
  }

  appPhoneValidation(): boolean {
    if (this.isCorrectPhoneNumber(this.appPhoneNum) == true) {
      console.log("dobar broj telefona");
      this.wrongAppPhoneBool = false;
      return true;
    }
    console.log("los broj telefona");
    console.log(this.appPhoneNum);
    (<HTMLSelectElement>document.getElementById('appPhoneNum')).focus();
    this.wrongAppPhoneBool = true;
    return false;
  }

  appPasswordValidation(): boolean {
    if (this.isCorrectPassword(this.appPass1) == true && this.isCorrectPassword(this.appPass2) == true && this.appPass1 == this.appPass2) {
      console.log("dobra lozinka");
      this.wrongAppPass1Bool = false;
      this.wrongAppPass2Bool = false;
      return true;
    }
    console.log("losa lozinka");
    console.log(this.appPass1);
    this.appPass1 = ''; //brisi obe ukucane lozinke
    this.appPass2 = '';
    (<HTMLSelectElement>document.getElementById('appPass1')).focus();
    this.wrongAppPass1Bool = true;
    this.wrongAppPass2Bool = true;
    return false;
  }

  appPictureValidation(): boolean {
    return true;
  }

  appValidation() {
    this.appFirstName = this.appFirstName.trim();
    this.appLastName = this.appLastName.trim();
    this.appEmail = this.appEmail.trim();
    this.appPhoneNum = this.appPhoneNum.trim();
    this.firstNameValidation();
    this.lastNameValidation();
    this.appEmailValidation();
    this.appPhoneValidation();
    this.appPasswordValidation();
    this.appPictureValidation();
    /*this.firstNameValidation();
    this.lastNameValidation();
    this.emailValidation();*/
    //this.lastNameValidation();
    /*if (this.nameValidation() == true)
      this.applicantService.createApplicant();*/
      //sve je ok, posalji podatke servisu

  }
}
