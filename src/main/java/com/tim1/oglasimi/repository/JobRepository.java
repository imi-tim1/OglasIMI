package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.Applicant;
import com.tim1.oglasimi.model.Comment;
import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.payload.JobFeed;
import com.tim1.oglasimi.model.payload.JobFilter;
import com.tim1.oglasimi.model.payload.LikeResponse;

import java.util.List;

public interface JobRepository extends CRUDRepository<Job, Integer>
{
    List<Applicant> getJobApplicants(Integer jobId);
    JobFeed getFilteredJobs(JobFilter jobFilter);
    boolean applyForAJob( Integer jobId, Integer uid);
    List<Comment> getAllComments(int jobId);
    boolean postComment(Comment comment, int jobId, int userId, boolean isApplicant);
    boolean deleteComment(int id);
    LikeResponse getJobLikes(int jobId, int applicantId, boolean isApplicant);
}
