import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { Employer, Job, RatingResponse } from 'src/app/_utilities/_api/_data-types/interfaces';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-info-card',
  templateUrl: './employer-info-card.component.html',
})
export class EmployerInfoCardComponent implements OnInit {

  @Input() public emp: Employer | null = null;
  @Input() public rating: number = -1;
  @Input() public rateDissabled: boolean = true;
  @Input() public dissableDelete: boolean = false;

  public myRating: number = 0;
  public showRateOption: boolean = false;
  allreadyRated: boolean = false;

  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;

  // Fontawesome
  iconStar = faStar;
  iconStarEmpty = faStarReg;
  iconDelete = faTimes;

  constructor(
    private employerService: EmployerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchRating();
  }

  // --- Actions ---

  fetchRating() {
    if (!this.emp)
      return;

    this.employerService.getEmployersRating(this.emp.id, this, this.cbSuccessGetRating);
  }

  toggleRateOption() {
    this.showRateOption = !this.showRateOption;
    this.myRating = 0;
  }

  clickRateStar(rate: number) {
    this.myRating = rate;
  }

  sendMyRating() {
    if (!this.emp)
      return;

    this.employerService.rateEmployer(this.emp.id, this.myRating, this, this.cbSuccessRate);
  }

  onDeleteClick() {
    if(!this.emp) return;
    this.employerService.deleteEmployer(this.emp.id, this,
      (self: any) => {
        self.router.navigate(['/employers']);
      }
    );
  }

  // --- Auth ---

  canRate() {
    return !this.allreadyRated && !this.rateDissabled && JWTUtil.getUserRole() == UserRole.Applicant;
  }

  canDelete() {
    return JWTUtil.getUserRole() == UserRole.Admin && !this.dissableDelete;
  }

  // --- API Callbacks ---

  cbSuccessGetRating(self: any, data: RatingResponse) {
    self.rating = data.rating;
    self.allreadyRated = data.alreadyRated;

    if (JWTUtil.getID() == 0 || JWTUtil.getUserRole() != UserRole.Applicant) return;
    self.applicantService.getApplicantsJobs(JWTUtil.getID(), self,
      (self: any, data: Job[]) => {
        self.rateDissabled = !(data.find(j => j.employer.id == self.emp.id) != undefined);
        console.log(self.allreadyRated);
        console.log(self.rateDissabled);
        console.log(self.canRate());
      }
    );
  }

  cbSuccessRate(self: any) {
    self.showRateOption = false;
    self.fetchRating();
  }

}