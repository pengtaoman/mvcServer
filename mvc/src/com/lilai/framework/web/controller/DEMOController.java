package com.lilai.framework.web.controller;

import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.ModelAndView;

import com.lilai.framework.base.BaseController;
import com.lilai.framework.demo.UserService;
import com.lilai.framework.entity.User;
import com.lilai.framework.web.pojo.PojoOne;

import org.springframework.http.MediaType;

@Controller
public class DEMOController extends BaseController {

	private Logger logger = LogManager.getLogger(DEMOController.class);

	public DEMOController() {
		System.out.println("=======  DEMOController Inited ============");
	}


	@RequestMapping(value = "/demo/{jsp}", method = RequestMethod.GET)
	public String tabDemo(@PathVariable String jsp, Model model) {
		System.out.println("=======  DEMOController Inited ============  " + jsp);
		return "demo/"+jsp;
	}

}