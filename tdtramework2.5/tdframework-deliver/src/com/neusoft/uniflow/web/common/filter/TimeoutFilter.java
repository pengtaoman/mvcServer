package com.neusoft.uniflow.web.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.web.util.SessionManager;


public class TimeoutFilter
    implements Filter {

	private String[] excludePage;
	
  public void init(FilterConfig config) {
	  String excludePage = config.getInitParameter("excludePage");
	  if (excludePage != null) {
		  if (excludePage.indexOf(",") != -1) {
			  this.excludePage = excludePage.split(",");
		  } else {
			  this.excludePage = new String[]{excludePage};
		  }
	  }
  }

  public void doFilter(ServletRequest request, ServletResponse response,
			     FilterChain chain) throws IOException, ServletException {
    HttpServletRequest httpRequest = (HttpServletRequest) request;
    HttpSession session = httpRequest.getSession();
    //在logon后session.getAttribute(SessionManager.CUSTOMATION)才不为空
    String url = httpRequest.getRequestURI();
    int temp = url.indexOf(";jsessionid=");
    if (temp>0){
    	url = url.substring(0,temp);
    }
    String contextPath = httpRequest.getContextPath();
    url = url.substring(contextPath.length()+1, url.length());
    if (!isIngore(url)){
    	if (session.getAttribute(SessionManager.CUSTOMATION)== null) {
    		  request.getRequestDispatcher("/unieap/pages/workflow/common/relogonerror.jsp").forward(request, response);
    		  return;
    	}
    }

    chain.doFilter(request, response);
  }
  
  private boolean isIngore(String url) {
	  if (url.equals(""))
		  return true;
	  if (excludePage != null) {
		  for (int i=0; i<excludePage.length ;i++) {
			  if (url.equals(excludePage[i].trim())) {
				  return true;
			  }
		  }
	  }
	  if (url.equals("logon.do") || url.equals("logout.do"))
		  return true;
	  return false;
  }

  public void destroy() {}
}