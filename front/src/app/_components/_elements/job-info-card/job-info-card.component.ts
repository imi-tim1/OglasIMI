import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';
import { Router } from '@angular/router';
import { Job } from 'src/app/_utilities/_api/_data-types/interfaces';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { RedirectRoutes } from 'src/app/_utilities/_constants/routing.properties';

@Component({
  selector: 'app-job-info-card',
  templateUrl: './job-info-card.component.html',
  styleUrls: ['./job-info-card.component.css']
})
export class JobInfoCardComponent implements OnInit {

  // State
  @Input() id: number = 0;
  public job: Job | null = null;

  // Auth
  allreadyApplied: boolean = true;

  // --- Dependencies ---
  constructor(
    public jobService: JobService,
    public applicantService: ApplicantService,
    public router: Router
  ) { }

  // --- Start ---
  ngOnInit(): void {
    this.jobService.getJob(this.id, this, this.cbSuccessGetJob);
  }

  // --- Actions ---

  applyMe() {
    this.jobService.applyToJob(this.id, this, 
      (self: any) => {
        self.router.navigate(RedirectRoutes.ON_APPLY_TO_JOB_SUCCESSFUL.concat([self.job.employer.email]));
      }
    );
  }

  deleteThisJob() {
    this.jobService.deleteJob(this.id, this, this.cbSuccessApply);
  }

  // --- Auth ---

  canApply() {
    return JWTUtil.getUserRole() == UserRole.Applicant && !this.allreadyApplied;
  }

  canDelete() {
    return JWTUtil.getUserRole() == UserRole.Admin;
  }

  // --- API Callbacks ---

  cbSuccessApply(self: any) 
  {
    alert('Uspešno ste obrisali oglas!');
    self.router.navigate(['']); //redirekt na home-page
  }

  cbSuccessGetJob(self: any, job: Job | null) 
  {
    self.job = job;

    // Da li sam vec prijavljen na ovaj oglas?
    let myID = JWTUtil.getID();
    if(myID == 0 || JWTUtil.getUserRole() != UserRole.Applicant) return;
    
    self.applicantService.getApplicantsJobs(myID, self, 
      (self: any, jobs: Job[]) => {
        self.allreadyApplied = jobs.find(j => j.id == self.id) != undefined;
      }
    );
  }
}
