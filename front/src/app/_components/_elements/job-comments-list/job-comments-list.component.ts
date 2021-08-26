import { Component, Input, OnInit } from '@angular/core';
import { JobComment } from 'src/app/_utilities/_api/_data-types/interfaces';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';

@Component({
  selector: 'app-job-comments-list',
  templateUrl: './job-comments-list.component.html',
})
export class JobCommentsListComponent implements OnInit {

  @Input() public jobID: number = 0;
  public comments: JobComment[] = [];

  // New Comment
  public newCommentCardActive: boolean = false;
  public newCommentText: string = '';

  // Replay
  public activeReplayCommentID: number = 0;
  public replayText: string = '';

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobComments(this.jobID, this, this.cbGetCommentsSuccess);
  }


  // --- New Comment ---

  toggleNewCommentCard() {
    this.newCommentCardActive = !this.newCommentCardActive;
    this.replayText = '';
  }

  sendNewComment() {
    let c: JobComment = {
      text: this.replayText,
      parentId: this.activeReplayCommentID
    };
  }

  // --- Replay ---

  toggleReplayCard(forComment: number) {
    if (forComment == 0)
      return;

    if (this.activeReplayCommentID == forComment)
      forComment = 0;
    
    this.replayText = '';
    this.activeReplayCommentID = forComment;
  }

  sendReplay() {
    let c: JobComment = {
      text: this.replayText,
      parentId: this.activeReplayCommentID
    };
    // new comment
  }

  // --- API Callbacks ---
  
  cbGetCommentsSuccess(self: any, data: JobComment[]) {
    self.comments = data;
    console.log('Comments')
    console.log(self.comments);
  }

}
