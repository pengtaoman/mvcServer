package com.neusoft.uniflow.web.common.filter;


import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;


public class AccesserFilter implements Filter
{
	public void init(FilterConfig config)
	{

	}

	public void doFilter(ServletRequest request, ServletResponse response,
				   FilterChain chain) throws IOException,
	    ServletException
	{

	     // if (!httpRequest.getRequestURI().endsWith("logon.do"))
		{
			StringBuffer sb = new StringBuffer();
			sb.append("--------------------------------\n");
			sb.append("host:");
			sb.append(request.getRemoteHost());
			sb.append("; IP:");
			sb.append(request.getRemoteAddr());
			sb.append(" logon successfully!!!\n");
			sb.append("--------------------------------\n");
			System.out.println(sb.toString());
		}

		chain.doFilter(request, response);
	}

	public void destroy()
	{}

}