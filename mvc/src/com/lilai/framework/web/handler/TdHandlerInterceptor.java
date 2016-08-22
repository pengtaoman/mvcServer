package com.lilai.framework.web.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.lilai.crm.es.controller.EsStdAddressController;

public class TdHandlerInterceptor implements HandlerInterceptor{
	private Logger logger = LogManager.getLogger(TdHandlerInterceptor.class);
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// TODO Auto-generated method stub
		logger.info("preHandl request.getParameterNames ::" + new Gson().toJson(request.getParameterNames()));
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		response.setHeader("X-Frame-Options", "SAMEORIGIN");
		//System.out.println("@@@@@@@@@@@@@@@@@@@@@  postHandle postHandle postHandle postHandle postHandle postHandle" + modelAndView.getViewName());
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		logger.info("afterCompletion");
	}

}
