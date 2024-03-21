package rover.core.platform.job.email;

import org.jobrunr.jobs.lambdas.JobRequestHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class SendEmailJobRequestHandler implements JobRequestHandler<SendEmailJobRequest> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void run(SendEmailJobRequest request) throws Exception {
        logger.info("Will send email: {}.", request.id());
    }
}
