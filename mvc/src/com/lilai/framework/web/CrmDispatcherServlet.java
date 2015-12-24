package com.lilai.framework.web;

import org.springframework.context.ApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class CrmDispatcherServlet extends DispatcherServlet {

	private static final long serialVersionUID = -4596445679570544129L;
	
	@Override
	protected void initStrategies(ApplicationContext context) {
		System.out.println("***********************CrmDispatcherServlet ******************************************** ");
		super.initStrategies(context);
		
	}

}
