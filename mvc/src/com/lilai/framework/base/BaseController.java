package com.lilai.framework.base;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.support.WebApplicationObjectSupport;
import org.springframework.web.servlet.ModelAndView;

//import com.lilai.framework.security.pojo.TDSecurityUser;


public class BaseController extends WebApplicationObjectSupport{

//	public TDSecurityUser getTDSecurityUser() {
//		if (SecurityContextHolder.getContext().getAuthentication().getPrincipal().getClass().isAssignableFrom(TDSecurityUser.class)){
//			return (TDSecurityUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//		}
//		return null;
//	}
	
	protected <T> T getService(Class<T> T) {
		return this.getApplicationContext().getBean(T);
	}
	

}
