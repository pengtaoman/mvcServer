package com.lilai.framework.security.handler;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class XMLHttpRequestLoginFailerHandler implements AuthenticationFailureHandler{
	
	private String failureUrl;

	public XMLHttpRequestLoginFailerHandler() {
		System.out.println("!!!!!!!!!!!!!!!!!!!!!  XMLHttpRequestLoginFailerHandler created!!!!!!!!!!!");
	}

	public String getFailureUrl() {
		return failureUrl;
	}

	public void setFailureUrl(String failureUrl) {
		this.failureUrl = failureUrl;
	}

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		boolean isAjax = "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
		System.out.println("!!!!!!!!!!!!!! XMLHttpRequestLoginFailerHandler  !!!!!!!!!!!!!!isAjax:: " + isAjax);

		if (isAjax) {

			String jsonObject = "alert('aaaaaaaaaaaaaaaaa');";
			String contentType = "application/json";
			response.setContentType(contentType);
			PrintWriter out = response.getWriter();
			out.print(jsonObject);
			out.flush();
			out.close();
			return;
		}
	}

}
