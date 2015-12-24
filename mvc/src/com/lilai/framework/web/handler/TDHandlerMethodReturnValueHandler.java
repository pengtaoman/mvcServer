package com.lilai.framework.web.handler;

import org.springframework.core.MethodParameter;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.ModelAndViewContainer;

public class TDHandlerMethodReturnValueHandler implements HandlerMethodReturnValueHandler{

	@Override
	public boolean supportsReturnType(MethodParameter returnType) {
		System.out.println("!!!!!!!!!!@@@@@@@@@@@@@@@  TDHandlerMethodReturnValueHandler returnType.getParameterType() :: " + returnType.getParameterType());
		System.out.println("!!!!!!!!!!@@@@@@@@@@@@@@@  TDHandlerMethodReturnValueHandler returnType.getParameterType() :: " +
				Long.class.isAssignableFrom(returnType.getParameterType()));
		return Long.class.isAssignableFrom(returnType.getParameterType());
	}

	@Override
	public void handleReturnValue(Object returnValue,
			MethodParameter returnType, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest) throws Exception {
		
		System.out.println("!!!!!!!!!!@@@@@@@@@@@@@@@  TDHandlerMethodReturnValueHandler:: " + returnValue);
		mavContainer.setViewName("hello002");

	}

}
