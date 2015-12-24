package com.lilai.business.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ControllerOne {
	
	
	public ControllerOne() {
		System.out.println("======= ============== ControllerOne@@@@@@@@@@@ ============");
	}
	
	@RequestMapping(value = "/buss", method = RequestMethod.GET)
	public String test() {
		System.out.println("======= ============== ControllerOne@@@@@@@@@@@ test test============");
		return "/hello002";
	}
}
