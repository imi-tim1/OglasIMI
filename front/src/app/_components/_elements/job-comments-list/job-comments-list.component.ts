import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Applicant, Employer, Job, JobComment } from 'src/app/_utilities/_api/_data-types/interfaces';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { faPaperPlane, faCheck, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';

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
  iconNewCommentStop = faMinus;
  iconSend = faPaperPlane;

  constructor(
    private jobService: JobService,
    public employerService: EmployerService,
    public applicantService: ApplicantService
  ) { }

  ngOnInit(): void {
    this.fetchComments();
  }


  // --- New Comment ---

  toggleNewCommentCard() {
    this.newCommentCardActive = !this.newCommentCardActive;
    this.newCommentText = '';
  }

  fetchComments() {
    this.jobService.getJobComments(this.jobID, this, this.cbGetCommentsSuccess);
  }

  sendNewComment() {
    let comment: JobComment = {
      id: 1,
      authorName: 'ime',
      text: this.newCommentText,
      parentId: 0,
      postDate: new Date()
    };

    this.jobService.postNewJobComment(this.jobID, comment, this,
      (self: any) => {
        self.fetchComments();
        self.toggleNewCommentCard();
      }
    );

  }

  // --- Replay ---

  toggleReplayCard(commentID: number) {
    if (commentID == 0)
      return;

    if (this.activeReplayCommentID == commentID)
      commentID = 0;

    this.replayText = '';
    this.activeReplayCommentID = commentID;
  }

  sendReplay() {
    let comment: JobComment = {
      id: 1,
      authorName: 'ime',
      text: this.replayText,
      parentId: this.activeReplayCommentID,
      postDate: new Date()
    };

    this.jobService.postNewJobComment(this.jobID, comment, this,
      (self: any) => {
        self.fetchComments();
        self.toggleReplayCard(self.activeReplayCommentID);
      }
    );
  }

  // --- Delete Comment ---

  deleteComment(commentID: number) {
    this.jobService.deleteJobComment(this.jobID, commentID, this,
      (self: any) => {
        self.fetchComments();
      }
    );
  }

  // --- API Callbacks ---

  cbGetCommentsSuccess(self: any, data: JobComment[]) {
    // Sortiranje

    let c = [], r = [];
    for (let d of data) {
      if (d.parentId == 0) c.push(d);
      else r.push(d);
    }

    c.sort((a,b)=> b.id - a.id); // sortiranje po datumu novije

    data = [];
    for (let cd of c) {
      data.push(cd);
      for (let rd of r) {
        if (rd.parentId == cd.id)
          data.push(rd);
      }
    }

    self.comments = data;
    console.log('Comments')
    console.log(self.comments);

    // Auth - Da li je trenutni korisnik vlasnik oglasa?

    let myID = JWTUtil.getID();
    if (myID == 0) return;
    self.employerService.getEmployersJobs(myID, self,
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
    return JWTUtil.getUserRole() == UserRole.Applicant;
  }

  canDelete() {
    return JWTUtil.getUserRole() == UserRole.Admin;
  }

}
