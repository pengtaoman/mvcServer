package com.lilai.framework.web.resolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;


public class TDEcxeptionResolver implements HandlerExceptionResolver{

	private Logger logger = LogManager.getLogger(TDEcxeptionResolver.class);
	
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		
		System.out.println("????????????????????????  resolveException ?????? " + ex.getMessage());
		logger.error(ex.getMessage());
		ex.printStackTrace();
		ModelAndView mav=new ModelAndView("/error/500");
        return mav;
	}

}
