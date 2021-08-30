import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {

  // Page Auth
  public pageLoaded: boolean = false;

  constructor(public authService: AuthService,
              public activatedRoute: ActivatedRoute          
    ) { }

  ngOnInit(): void {
    // Check access
    this.authService.checkAccess(this.activatedRoute, this,
      (self: any) => 
      {
        self.pageLoaded = true;
      }
    );
  }
}
