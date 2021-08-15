import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { PasswdHash } from 'src/app/_utilities/_helpers/hash-util';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
})
export class TestingPageComponent implements OnInit {

   @Input() public fajl: File | null = null;

   public convertedPicture: string = '';

  constructor(
    public employerService: EmployerService,
    public aplicantService: ApplicantService,
    public jobService: JobService
  ) { }

  onFileInput() {
    let reader = new FileReader();

    let inp = document.getElementById('fajl') as HTMLInputElement;

    if(inp == null || inp.files == null || inp.files.length == 0) {
      console.log('Fajl nije izabran kako treba !!')
      return;
    }

    let self = this;

    reader.readAsDataURL(inp.files[0]);
    reader.onload = function() {
      self.convertedPicture = reader.result as string;
      let len = self.convertedPicture.length;
      
      console.log(self.convertedPicture);
      console.log(`Duzina kodirane slike je: ${Math.round(len/1000)}.${Math.round(len%1000/100)} K`);
    }

    console.log('this: ' + this.convertedPicture.length);
    console.log('self: ' + self.convertedPicture.length);
  }

  printConvertedPicture() {
    console.log(this.convertedPicture);
  }

  ngOnInit(): void {
    // this.testEmployerService();
    // this.testApplicantService();
    this.testJobService();
  }

  testEmployerService() {
    // this.employerService.getEmployers();      // OK
    // this.employerService.getEmployer(5);      // OK
    // this.employerService.getEmployersJobs(4); // OK
    this.employerService.createEmployer({     // OK
      name: 'Ruzno Pace d.o.o',
      address: 'Kamen 1',
      email: 'xy@z.com',
      phoneNumber: '063555333',
      pictureBase64: null,
      tin: '12345670009764',
      hashedPassword: PasswdHash.encrypt('pace')
    });
  }

  testApplicantService() {
    // Ceka se Back End ...
    this.aplicantService.getApplicants();      // ?
    this.aplicantService.getApplicant(2);      // ?
    this.aplicantService.getApplicantsJobs(2); // ?
  }

  testJobService() {
    // let j: number = 4;

    // this.jobService.getJob(3); // OK
    // this.jobService.getJobs(); // OK
    // this.jobService.getJobsApplicants(j); // OK

    this.jobService.createJob({ // OK
      title: 'QWERT',
      description: 'Najjaci posao',
      
      field: { id: 2, name: '' },
      city: { id: 0, name: '' },
      tags: [{ id: 3, name: '' }, { id: 7, name: '' }, { id: 8, name: '' }],
      
      salary: '',
      workFromHome: false,
      
      postDate: null,
      employer: null
    });

    

    // this.jobService.applyToJob(j);
  }

}
