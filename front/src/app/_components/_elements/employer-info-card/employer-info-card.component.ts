import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { Employer, Job, RatingResponse } from 'src/app/_utilities/_api/_data-types/interfaces';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';

@Component({
  selector: 'app-employer-info-card',
  templateUrl: './employer-info-card.component.html',
})
export class EmployerInfoCardComponent implements OnInit {

  @Input() public emp: Employer | null = null;
  @Input() public rating: number = -1;
  @Input() public rateDissabled: boolean = false;

  public myRating: number = 0;
  public showRateOption: boolean = false;
  allreadyRated: boolean = false;

  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;

  // Fontawesome
  iconStar = faStar;
  iconStarEmpty = faStarReg;

  constructor(
    private employerService: EmployerService,
    private applicantService: ApplicantService
  ) { }

  ngOnInit(): void {
    this.fetchRating();
  }

  // --- Actions ---

  fetchRating() 
  {
    if(!this.emp)
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
    // TODO: API Call ->
    this.cbSuccessRate(this); // TEMP
  }

  // --- Auth ---

  canRate() {
    return !this.allreadyRated && !this.rateDissabled;
  }

  // --- API Callbacks ---

  cbSuccessGetRating(self: any, data: RatingResponse) 
  {
    self.rating = data.rating;
    self.allreadyRated = data.alreadyRated;

    self.applicantService.getApplicantsJobs(JWTUtil.getID(), self, 
      (self: any, data: Job[]) => 
      {
        self.rateDissabled = !(data.find(j => j.employer.id == self.emp.id) != undefined);
      }
    );
  }

  cbSuccessRate(self: any) 
  {
    self.showRateOption = false;
    // this.fetchRating(); // TODO
    this.allreadyRated = true; // TEMP
  }

}
