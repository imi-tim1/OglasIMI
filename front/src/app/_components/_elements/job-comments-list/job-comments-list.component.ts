import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job, JobComment } from 'src/app/_utilities/_api/_data-types/interfaces';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';
import { faLocationArrow, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-job-comments-list',
  templateUrl: './job-comments-list.component.html',
})
export class JobCommentsListComponent implements OnInit {

  @Input() public jobID: number = 0;
  public comments: JobComment[] = [];

  // State - New Comment
  public newCommentCardActive: boolean = false;
  public newCommentText: string = '';

  // State - Replay
  public activeReplayCommentID: number = 0;
  public replayText: string = '';

  // Auth
  isOwner: boolean = false;

  // Fontawesome
  iconReplaySend = faCheck;
  iconNewComment = faPlus;

  constructor(
    private jobService: JobService,
    public employerService: EmployerService
  ) { }

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

    // Auth - Da li je trenutni korisnik vlasnik oglasa?
    self.employerService.getEmployersJobs(JWTUtil.getID(), self, 
    (self: any, jobs: Job[]) => {
      let ok = jobs.find(j => j.id == self.jobID) != undefined;
      console.log('>>>>> Ownership: ' + ok);
      self.isOwner = ok;
    });
  }

  // --- Auth ---

  canReplay() {
    return JWTUtil.getUserRole() == UserRole.Employer && this.isOwner;
  }

  canComment() {
    return JWTUtil.getUserRole() == UserRole.Visitor;
  }

}
