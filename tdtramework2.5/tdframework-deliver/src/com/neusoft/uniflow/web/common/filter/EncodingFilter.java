package com.neusoft.uniflow.web.common.filter;


import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class EncodingFilter implements Filter
{

      protected String encoding = null;
      protected FilterConfig filterConfig = null;
      protected boolean ignore = true;

      public void destroy()
      {
            this.encoding = null;
            this.filterConfig = null;
      }

      public void doFilter(ServletRequest request, ServletResponse response,
                           FilterChain chain) throws IOException,
          ServletException
      {
    	  //request.setCharacterEncoding("GBK");
    	  HttpServletRequest servletRequest = (HttpServletRequest) request;
            if (ignore || (request.getCharacterEncoding() == null)) {
                  String encoding = selectEncoding(request);
                  if (encoding != null)
                  {
                		if ("true".equalsIgnoreCase(servletRequest.getHeader("ajax"))) {
                  			servletRequest.setCharacterEncoding("utf-8");
                  		}else{
                  			request.setCharacterEncoding(encoding);
                  		}
                  }
            }


            chain.doFilter(request, response);

      }

      /**
       * Place this filter into service.
       *
       * @param filterConfig The filter configuration object
       */
      public void init(FilterConfig filterConfig) throws ServletException
      {

            this.filterConfig = filterConfig;
            this.encoding = filterConfig.getInitParameter("encoding");
            String value = filterConfig.getInitParameter("ignore");
            if (value == null)
                  this.ignore = true;
            else if (value.equalsIgnoreCase("true"))
                  this.ignore = true;
            else if (value.equalsIgnoreCase("yes"))
                  this.ignore = true;
            else
                  this.ignore = false;

      }

      protected String selectEncoding(ServletRequest request)
      {

            return (this.encoding);

      }

}