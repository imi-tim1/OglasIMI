import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';
import { Router } from '@angular/router';
import { Job } from 'src/app/_utilities/_api/_data-types/interfaces';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-job-info-card',
  templateUrl: './job-info-card.component.html',
  styleUrls: ['./job-info-card.component.css']
})
export class JobInfoCardComponent implements OnInit {

  // State
  @Input() id: number = 0;
  public job: Job | null = null;

  // --- Dependencies ---
  constructor(public jobService: JobService,
              public router: Router) { }

  // --- Start ---
  ngOnInit(): void {
    this.jobService.getJob(this.id, this, this.cbSuccessGetJob);
  }

  // --- Actions ---

  applyMe() {
    //console.log(this.employerService.employer?.email);
    this.jobService.applyToJob(this.id);
  }

  deleteThisJob() {
    this.jobService.deleteJob(this.id, this, this.cbSuccessApply);
  }

  // --- Auth ---

  isApplicant() {
    return JWTUtil.getUserRole() == UserRole.Applicant;
  }

  isAdmin() {
    return JWTUtil.getUserRole() == UserRole.Admin;
  }

  // --- API Callbacks ---

  cbSuccessApply(self: any) {
    alert('Uspešno ste obrisali oglas!');
    self.router.navigate(['']); //redirekt na home-page
  }

  cbSuccessGetJob(self: any, job: Job | null) 
  {
    self.job = job;
  }
}
