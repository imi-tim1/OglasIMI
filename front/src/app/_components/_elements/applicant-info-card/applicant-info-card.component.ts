import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { Applicant, Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';

@Component({
  selector: 'app-applicant-info-card',
  templateUrl: './applicant-info-card.component.html',
})
export class ApplicantInfoCardComponent implements OnInit {

  @Input() public app: Applicant | null = null;
  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;
  
  @Input() dissableDelete: boolean = false;

  // Fontawesome
  iconDelete = faTimes;

  constructor(
    private applicantService: ApplicantService,
    private router: Router
  ) { }

  // Auth
  canDelete() {
    return JWTUtil.getUserRole() == UserRole.Admin && !this.dissableDelete;
  }

  // Actions

  onDeleteClick() {
    if(!this.app) return;
    this.applicantService.deleteApplicant(this.app.id, this,
      (self: any) => {
        self.router.navigate(['/applicants']);
      }
    );
  }


  ngOnInit(): void {
  }

}

