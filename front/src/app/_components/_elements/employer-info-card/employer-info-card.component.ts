import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';

@Component({
  selector: 'app-employer-info-card',
  templateUrl: './employer-info-card.component.html',
})
export class EmployerInfoCardComponent implements OnInit {

  @Input() public emp: Employer | null = null;
  @Input() public rating: number = -1;

  public myRating: number = 0;
  public showRateOption: boolean = false;
  allreadyRated: boolean = false;

  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;

  // Fontawesome
  iconStar = faStar;
  iconStarEmpty = faStarReg;

  constructor() { }

  ngOnInit(): void {
    this.fetchRating();
    console.log('>>>>>> init ' + this.emp?.id);
  }

  // --- Actions ---

  fetchRating() {
    // TEMP
    // TODO: API Call ->
    this.rating = 3.5;
    this.allreadyRated = !true;
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
    return !this.allreadyRated;
  }

  // --- API Callbacks ---

  cbSuccessRate(self: any) {
    self.showRateOption = false;
    // this.fetchRating(); // TODO
    this.allreadyRated = true; // TEMP
  }

}
