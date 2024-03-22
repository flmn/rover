package rover.app.platform.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.web.servlet.error.AbstractErrorController;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping({"${server.error.path:${error.path:/error}}"})
public class SpaErrorController extends AbstractErrorController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public SpaErrorController(ErrorAttributes errorAttributes, List<ErrorViewResolver> errorViewResolvers) {
        super(errorAttributes, errorViewResolvers);
    }

    @RequestMapping(produces = {"text/html"})
    public Object errorHtml(HttpServletRequest request, HttpServletResponse response) {
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

        Map<String, Object> model = Collections.unmodifiableMap(this.getErrorAttributes(request, ErrorAttributeOptions.of(ErrorAttributeOptions.Include.BINDING_ERRORS)));

        response.setStatus(status.value());

        return new ModelAndView("error", model);
    }

    @RequestMapping
    public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
        HttpStatus status = this.getStatus(request);
        if (status == HttpStatus.NO_CONTENT) {
            return new ResponseEntity<>(status);
        } else {
            Map<String, Object> body = this.getErrorAttributes(request, ErrorAttributeOptions.of(ErrorAttributeOptions.Include.BINDING_ERRORS));

            return new ResponseEntity<>(body, status);
        }
    }

    private String getRequestUri(HttpServletRequest request) {
        return (String) request.getAttribute("jakarta.servlet.error.request_uri");
    }
}
