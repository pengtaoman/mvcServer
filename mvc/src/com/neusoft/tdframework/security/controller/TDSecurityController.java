package com.neusoft.tdframework.security.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.WebApplicationContext;

import com.neusoft.tdframework.base.BaseController;
import com.neusoft.tdframework.demo.UserService;
import com.neusoft.tdframework.web.pojo.PojoOne;

@Controller
public class TDSecurityController extends BaseController {

	private Logger logger = LogManager.getLogger(this.getClass());

	@RequestMapping(value = "/tdlogin") //, method = RequestMethod.POST
	public String forwardLoginForm(HttpServletRequest request) {
		logger.trace("++++++++++++++  forwardLoginForm  forwardLoginForm  ++++++++++++++++" + request.getParameter("name"));
		logger.trace("++++++++++++++  forwardLoginForm  forwardLoginForm  ++++++++++++++++" + request.getRequestURL());
		
		return "framework/login";
	}

}
