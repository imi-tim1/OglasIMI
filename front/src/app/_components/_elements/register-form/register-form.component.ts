import { Component, OnInit } from '@angular/core';
import { PasswdHash } from 'src/app/_utilities/_helpers/hash-util';
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

  // -----------------------------

  empCompanyName: string = '';
  empEmail: string = '';
  empPhoneNum: string = '';
  empPIB: string = '';
  empAddr: string = '';
  empPass1: string = '';
  empPass2: string = '';
  empPicture: string = '';
  wrongEmpCompanyNameBool: boolean = false;
  wrongEmpEmailBool: boolean = false;
  wrongEmpPhoneBool: boolean = false;
  wrongEmpPIBBool: boolean = false;
  wrongEmpAddrBool: boolean = false;
  wrongEmpPass1Bool: boolean = false;
  wrongEmpPass2Bool: boolean = false;
  wrongEmpPictureBool: boolean = false;


  pattAlphaWithSpaces: RegExp = /^[a-zA-ZšŠđĐčČćĆžŽ ]+$/; //i da ne bude vise od 2 spejsa uzastopno
  pattTwoSpaces: RegExp = /  /;
  pattEmail: RegExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  pattPhone: RegExp = /^\+?[0-9]{9,12}$/;
  pattPassword: RegExp = /.{6,}$/;
  //---
  pattCompanyName: RegExp = /^[0-9a-zA-ZšŠđĐčČćĆžŽ\/ \-\,\.]+$/; //i da ne bude vise od 2 spejsa uzastopno
  pattPIB: RegExp = /^[0-9]{9,13}$/;
  pattAddr: RegExp = /^[0-9a-zA-ZšŠđĐčČćĆžŽ\/ \-\,\.]+$/; //i da ne bude vise od 2 spejsa uzastopno


  constructor(public applicantService: ApplicantService,
              public employerService: EmployerService) { }

  ngOnInit(): void {
  }

  showMeApplicantForm() {
    if (this.showApplicantFormBool == false) { //trenutno nije prikazana applicant forma
      this.showEmployerFormBool = false; //sakrij employer
      this.showApplicantFormBool = true; //prikazi applicant
    }
  }

  showMeEmployerForm() {
    if (this.showEmployerFormBool == false) { //prikazi emp
      this.showApplicantFormBool = false;
      this.showEmployerFormBool = true;
    }
  }

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

  isCorrectCompanyName(element: string): boolean {
    if (this.pattCompanyName.test(element) && !(this.pattTwoSpaces.test(element)))
      return true;
    return false;
  }

  isCorrectPIB(element: string): boolean {
    if (this.pattPIB.test(element))
      return true;
    return false;
  }

  isCorrectAddr(element: string): boolean {
    if (this.pattAddr.test(element) && !(this.pattTwoSpaces.test(element)))
      return true;
    return false;
  }


  //////////////////////       APPLICANT           ////////////////////

  firstNameValidation() {
    if (this.isAlphaWithoutMultipleSpaces(this.appFirstName) == true) {
      console.log("dobro ime");
      this.wrongAppFirstNameBool = false;
      return; //return true;
    }
    console.log("lose ime");
    (<HTMLSelectElement>document.getElementById('appFirstName')).focus();
    this.wrongAppFirstNameBool = true; //return false;
  }

  lastNameValidation() {
    if (this.isAlphaWithoutMultipleSpaces(this.appLastName) == true) {
      console.log("dobro prezime");
      this.wrongAppLastNameBool = false;
      return;
    }
    console.log("lose prezime");
    (<HTMLSelectElement>document.getElementById('appLastName')).focus();
    this.wrongAppLastNameBool = true;
  }

  appEmailValidation() {
    if (this.isCorrectEmail(this.appEmail) == true) {
      console.log("dobar mejl");
      this.wrongAppEmailBool = false;
      return;
    }
    console.log("los mejl");
    (<HTMLSelectElement>document.getElementById('appEmail')).focus();
    this.wrongAppEmailBool = true;
  }

  appPhoneValidation() {
    if (this.isCorrectPhoneNumber(this.appPhoneNum) == true) {
      console.log("dobar broj telefona");
      this.wrongAppPhoneBool = false;
      return;
    }
    console.log("los broj telefona");
    console.log(this.appPhoneNum);
    (<HTMLSelectElement>document.getElementById('appPhoneNum')).focus();
    this.wrongAppPhoneBool = true;
  }

  appPasswordValidation() {
    if (this.isCorrectPassword(this.appPass1) && this.isCorrectPassword(this.appPass2) && this.appPass1 == this.appPass2) {
      console.log("dobra lozinka");
      this.wrongAppPass1Bool = false;
      this.wrongAppPass2Bool = false;
      return;
    }
    console.log("losa lozinka");
    console.log(this.appPass1);
    this.appPass1 = ''; //brisi obe ukucane lozinke
    this.appPass2 = '';
    (<HTMLSelectElement>document.getElementById('appPass1')).focus();
    this.wrongAppPass1Bool = true;
    this.wrongAppPass2Bool = true;
  }

  appPictureValidation() {

    let reader = new FileReader();

    let inp = document.getElementById('appPicture') as HTMLInputElement;

    if(inp == null || inp.files == null || inp.files.length == 0) {
      console.log('Fajl nije izabran kako treba !!')
      return;
    }

    let self = this;

    reader.readAsDataURL(inp.files[0]);
    reader.onload = function() {
      self.appPicture = reader.result as string;
      let len = self.appPicture.length;

      if (len < 5000 || len > 65000) { // LOSE
        (<HTMLSelectElement>document.getElementById('appPicture')).focus();
        self.wrongAppPictureBool = true;
        return;
      }

      self.wrongAppPictureBool = false;
      
      console.log(self.appPicture);
      console.log(`Duzina kodirane slike je: ${Math.round(len/1000)}.${Math.round(len%1000/100)} K`);
    }

    console.log('this: ' + this.appPicture.length);
    console.log('self: ' + self.appPicture.length);
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

    if (!(this.wrongAppFirstNameBool || this.wrongAppLastNameBool || this.wrongAppEmailBool ||
        this.wrongAppPhoneBool || this.wrongAppPass1Bool || this.wrongAppPass2Bool || this.wrongAppPictureBool)) { //sve ok, registruj ga

          let appForRegister = {
            firstName: this.appFirstName,
            lastName: this.appLastName,
            email: this.appEmail,
            phoneNumber: this.appPhoneNum,
            pictureBase64: (this.appPicture == '')? null : this.appPicture,
            hashedPassword: PasswdHash.encrypt(this.appPass1)
          }

          this.applicantService.createApplicant(appForRegister);
        }
  }

  ///////////////////////      EMPLOYER        //////////////////////////


  companyNameValidation() {
    if (this.isCorrectCompanyName(this.empCompanyName) == true) {
      console.log("dobro ime");
      this.wrongEmpCompanyNameBool = false;
      return; //return true;
    }
    console.log("lose ime");
    (<HTMLSelectElement>document.getElementById('empCompanyName')).focus();
    this.wrongEmpCompanyNameBool = true; //return false;
  }

  empEmailValidation() {
    if (this.isCorrectEmail(this.empEmail) == true) {
      console.log("dobar mejl");
      this.wrongEmpEmailBool = false;
      return;
    }
    console.log("los mejl");
    (<HTMLSelectElement>document.getElementById('empEmail')).focus();
    this.wrongEmpEmailBool = true;
  }

  empPhoneValidation() {
    if (this.isCorrectPhoneNumber(this.empPhoneNum) == true) {
      console.log("dobar broj telefona");
      this.wrongEmpPhoneBool = false;
      return;
    }
    console.log("los broj telefona");
    console.log(this.empPhoneNum);
    (<HTMLSelectElement>document.getElementById('empPhoneNum')).focus();
    this.wrongEmpPhoneBool = true;
  }

  empPIBValidation() {
    if (this.isCorrectPIB(this.empPIB) == true) {
      console.log("dobar pib");
      this.wrongEmpPIBBool = false;
      return;
    }
    console.log("los pib");
    (<HTMLSelectElement>document.getElementById('empPIB')).focus();
    this.wrongEmpPIBBool = true;
  }

  empAddrValidation() {
    if (this.isCorrectAddr(this.empAddr) == true) {
      console.log("dobra adresa");
      this.wrongEmpAddrBool = false;
      return;
    }
    console.log("losa adresa");
    (<HTMLSelectElement>document.getElementById('empAddr')).focus();
    this.wrongEmpAddrBool = true;
  }

  empPassValidation() {
    if (this.isCorrectPassword(this.empPass1) && this.isCorrectPassword(this.empPass2) && this.empPass1 == this.empPass2) {
      console.log("dobra lozinka");
      this.wrongEmpPass1Bool = false;
      this.wrongEmpPass2Bool = false;
      return;
    }
    console.log("losa lozinka");
    console.log(this.empPass1);
    this.empPass1 = ''; //brisi obe ukucane lozinke
    this.empPass2 = '';
    (<HTMLSelectElement>document.getElementById('empPass1')).focus();
    this.wrongEmpPass1Bool = true;
    this.wrongEmpPass2Bool = true;
  }

  empPictureValidation() {

    let reader = new FileReader();

    let inp = document.getElementById('empPicture') as HTMLInputElement;

    if(inp == null || inp.files == null || inp.files.length == 0) {
      console.log('Fajl nije izabran kako treba !!')
      return;
    }

    let self = this;

    reader.readAsDataURL(inp.files[0]);
    reader.onload = function() {
     self.empPicture = reader.result as string;
     let len = self.empPicture.length;

    if (len < 5000 || len > 65000) { // LOSE
        (<HTMLSelectElement>document.getElementById('empPicture')).focus();
        self.wrongEmpPictureBool = true;
        return;
      }

      self.wrongEmpPictureBool = false;
      
      console.log(self.empPicture);
      console.log(`Duzina kodirane slike je: ${Math.round(len/1000)}.${Math.round(len%1000/100)} K`);
    }

    console.log('this: ' + this.empPicture.length);
    console.log('self: ' + self.empPicture.length);
  }


  empValidation() {
    this.empCompanyName = this.empCompanyName.trim();
    this.empEmail = this.empEmail.trim();
    this.empPhoneNum = this.empPhoneNum.trim();
    this.empPIB = this.empPIB.trim();
    this.empAddr = this.empAddr.trim();
    this.companyNameValidation();
    this.empEmailValidation();
    this.empPhoneValidation();
    this.empPIBValidation();
    this.empAddrValidation();
    this.empPassValidation();

    if (!(this.wrongEmpCompanyNameBool || this.wrongEmpEmailBool || this.wrongEmpPhoneBool ||
          this.wrongEmpPIBBool || this.wrongEmpAddrBool || this.wrongEmpPass1Bool ||
          this.wrongEmpPass2Bool || this.wrongEmpPictureBool)) {                //sve ok, registruj ga

            let empForRegister = {
              name: this.empCompanyName,
              email: this.empEmail,
              phoneNumber: this.empPhoneNum,
              tin: this.empPIB,
              address: this.empAddr,
              pictureBase64: (this.empPicture == '')? null : this.empPicture,
              hashedPassword: PasswdHash.encrypt(this.empPass1)
            }

            this.employerService.createEmployer(empForRegister);
          }
  }
}
