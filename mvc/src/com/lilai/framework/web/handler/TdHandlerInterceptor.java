package com.lilai.framework.web.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

public class TdHandlerInterceptor implements HandlerInterceptor{

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("@@@@@@@@@@@@@@@@@@@@@  preHandl::" + new Gson().toJson(request.getParameterNames()));
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
		System.out.println("@@@@@@@@@@@@@@@@@@@@@  afterCompletion afterCompletion afterCompletion afterCompletion afterCompletion afterCompletion");
	}

}
