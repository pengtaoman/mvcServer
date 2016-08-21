//package com.lilai.framework.security.filter;
//
//import java.io.IOException;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.apache.logging.log4j.LogManager;
//import org.apache.logging.log4j.Logger;
//import org.springframework.context.ApplicationContext;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.web.DefaultRedirectStrategy;
//import org.springframework.security.web.RedirectStrategy;
//import org.springframework.security.web.authentication.AuthenticationFailureHandler;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
//import org.springframework.security.web.util.matcher.RequestMatcher;
//import org.springframework.util.StringUtils;
//import org.springframework.web.context.support.WebApplicationContextUtils;
//import org.springframework.web.filter.GenericFilterBean;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import com.lilai.framework.security.servlet.TDCaptchaServlet;
//import com.lilai.framework.web.controller.TDWebController;
//import com.octo.captcha.service.CaptchaService;
//
//public class TDCaptchaFilter  extends OncePerRequestFilter {
//
//	private Logger logger = LogManager.getLogger(TDCaptchaFilter.class);
//	private AuthenticationFailureHandler failureHandler = new SimpleUrlAuthenticationFailureHandler();
//	@Override
//	protected void doFilterInternal(HttpServletRequest request,
//			HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//	    logger.debug("Captcha capture filter");
//	    
//	    System.out.println("??????? TDCaptchaFilter username : " + request.getParameter("username"));
//        String username = request.getParameter("username");
//        String password = request.getParameter("password");
//        
//       String sPath = request.getRequestURI();
//       System.out.println("??????? TDCaptchaFilter 11111111111111111111111111111::" + sPath);
//       System.out.println("??????? TDCaptchaFilter 11111111111111111111111111111::" + request.getRequestURI());
//       System.out.println("??????? TDCaptchaFilter 11111111111111111111111111111::" + request.getRequestURL());
//       try {
//        	if (sPath.indexOf("main/login") != -1) {
//        		System.out.println("??????? TDCaptchaFilter 11111111111111111111111111111>>>" + request.getServletContext().getAttribute("isforuttest"));
//        		if (!"justforuttest".equals(request.getServletContext().getAttribute("isforuttest")) ) {
//				    if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)) {
//				    	
//				    	throw new BadCredentialsException("No Username and/or Password Provided.");
//				    	
//				    }else if(StringUtils.isEmpty(request.getParameter("jcaptcha"))) {
//				    	
//				        throw new BadCredentialsException("Captcha Response is Empty");
//				        
//				    }else {
//				        // Send HTTP request to validate user's Captcha
//				        boolean captchaPassed = TDCaptchaServlet.validateResponse(request, request.getParameter("jcaptcha"));
//			
//				        // Check if valid
//				        if (captchaPassed) {
//				            logger.error("Captcha is valid!");
//				        } else {
//				            logger.error("Captcha is invalid!");
//				            throw new BadCredentialsException("Invalid Captcha.");
//				        }
//				    }
//	        	}
//        	}
//        } catch (BadCredentialsException ex) {
//        	//failureHandler.onAuthenticationFailure(request, response, ex);
//        	//ex.printStackTrace();
//        	System.out.println("<font color='red'>验证码输入错误.</font>");
//        	request.setAttribute("captchaerror", "<font color='red'>验证码输入错误.</font>");
//        	
//        	//request.getRequestDispatcher("/main/tdlogin").forward(request, response);
//        	RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
//        	redirectStrategy.sendRedirect(request, response, "/main/tdlogin?captchaerror");
//        	 System.out.println("??????? TDCaptchaFilter 22222222222222222222222222::" );
//        	 return;
//        }
//
//
//	    // Proceed with the remaining filters
//       System.out.println("??????? TDCaptchaFilter PASS BY");
//	    filterChain.doFilter(request, response);
//		
//	}
//
//}
