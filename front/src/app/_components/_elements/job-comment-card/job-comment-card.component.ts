import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobComment } from 'src/app/_utilities/_api/_data-types/interfaces';
import { faMinus, faReply, faTimes } from '@fortawesome/free-solid-svg-icons';


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
  @Output() deleteClick = new EventEmitter();

  // Auth
  @Input() public canReplay: boolean = false;
  @Input() public canDelete: boolean = false;

  // Fontawesome
  iconReplay = faReply;
  iconReplayStop = faMinus;
  iconDelete = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  isReplay() {
    return this.data && this.data.parentId != undefined && this.data.parentId > 0;
  }

  onReplayClick() {
    this.replayClick.emit((this.data)? this.data.id : 0);
  }

  onDeleteClick() {
    this.deleteClick.emit((this.data)? this.data.id : 0);
  }

}
