import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
})
export class AlertPageComponent implements OnInit {

  public cause: string | null = null;
  public param: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  
    this.cause = this.activatedRoute.snapshot.paramMap.get('cause');
    this.param = this.activatedRoute.snapshot.paramMap.get('param');
    
  }

  checkCause(c: string): boolean {
    if(this.cause == null) return false;

    return c == this.cause;
  }

}
