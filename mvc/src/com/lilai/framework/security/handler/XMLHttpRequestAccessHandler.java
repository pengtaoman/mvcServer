package com.lilai.framework.security.handler;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

//@Component
public class XMLHttpRequestAccessHandler implements AccessDeniedHandler {
	
	
	private String accessDeniedUrl;

	public XMLHttpRequestAccessHandler() {
		System.out.println("!!!!!!!!!!!!!!!!!!!!!  XMLHttpRequestAccessHandler created!!!!!!!!!!!");
	}

	public String getAccessDeniedUrl() {
		return accessDeniedUrl;
	}

	public void setAccessDeniedUrl(String accessDeniedUrl) {
		this.accessDeniedUrl = accessDeniedUrl;
	}

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		boolean isAjax = "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
		System.out.println("!!!!!!!!!!!!!! XMLHttpRequestAccessHandler !!!!!!!!!!!!!!isAjax:: " + isAjax);

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
