package rover.app.platform.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaErrorController implements ErrorController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, HttpServletResponse response) {
        HttpStatus status = getStatus(request);

        if (status == HttpStatus.NOT_FOUND) {
            String requestUri = getRequestUri(request);

            if (requestUri != null
                    && !requestUri.startsWith("/actuator")
                    && !requestUri.startsWith("/api")) {
                logger.info("404: {}", requestUri);

                return "forward:/index.html";
            }
        }

        response.setStatus(status.value());

        return "error";
    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("jakarta.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        } else {
            try {
                return HttpStatus.valueOf(statusCode);
            } catch (Exception e) {
                return HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }
    }

    private String getRequestUri(HttpServletRequest request) {
        return (String) request.getAttribute("jakarta.servlet.error.request_uri");
    }
}
