import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobComment } from 'src/app/_utilities/_api/_data-types/interfaces';

@Component({
  selector: 'app-job-comment-card',
  templateUrl: './job-comment-card.component.html',
})
export class JobCommentCardComponent implements OnInit {

  @Input() public data: JobComment | null = null;
  @Output() replayClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onReplayClick() {
    this.replayClick.emit((this.data)? this.data.id : 0);
  }

}
