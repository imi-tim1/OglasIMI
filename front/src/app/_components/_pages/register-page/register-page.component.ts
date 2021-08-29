import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { AccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {

  constructor(public accessService: AccessService,
              public activatedRoute: ActivatedRoute          
    ) { }

  ngOnInit(): void {
    // Check access
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles);
  }
}
