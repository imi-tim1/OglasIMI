import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobComment } from 'src/app/_utilities/_api/_data-types/interfaces';
import { faReply, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-job-comment-card',
  templateUrl: './job-comment-card.component.html',
})
export class JobCommentCardComponent implements OnInit {

  // State
  @Input() public data: JobComment | null = null;
  @Input() public replayState: boolean = false;

  // Events
  @Output() replayClick = new EventEmitter();

  // Auth
  @Input() public canReplay: boolean = false;

  // Fontawesome
  iconReplay = faReply;
  iconReplayStop = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  onReplayClick() {
    this.replayClick.emit((this.data)? this.data.id : 0);
  }

}
