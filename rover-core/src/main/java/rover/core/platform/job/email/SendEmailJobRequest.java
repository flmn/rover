package rover.core.platform.job.email;

import org.jobrunr.jobs.lambdas.JobRequest;

public record SendEmailJobRequest(String id) implements JobRequest {

    @Override
    public Class<SendEmailJobRequestHandler> getJobRequestHandler() {
        return SendEmailJobRequestHandler.class;
    }
}
