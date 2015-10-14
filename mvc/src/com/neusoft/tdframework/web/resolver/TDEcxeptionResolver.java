package com.neusoft.tdframework.web.resolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.neusoft.tdframework.web.controller.TDWebController;

public class TDEcxeptionResolver implements HandlerExceptionResolver{

	private Logger logger = LogManager.getLogger(TDEcxeptionResolver.class);
	
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		
		System.out.println("????????????????????????  resolveException ?????? " + ex.getMessage());
		logger.error(ex.getMessage());
		ModelAndView mav=new ModelAndView("/error/500.jsp");
        return mav;
	}

}
