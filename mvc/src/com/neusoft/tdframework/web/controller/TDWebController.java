package com.neusoft.tdframework.web.controller;

import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
//import javax.transaction.Transactional;


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

import org.springframework.http.MediaType;
import com.neusoft.tdframework.base.BaseController;
import com.neusoft.tdframework.demo.UserService;
import com.neusoft.tdframework.entity.User;
import com.neusoft.tdframework.web.pojo.PojoOne;

@Controller
// @RequestMapping("/owners/{ownerId}")
public class TDWebController extends BaseController {

	private Logger logger = LogManager.getLogger(TDWebController.class);

	public TDWebController() {
		System.out.println("=======  HelloWorldController Inited ============");
	}

	@RequestMapping(value = "/helloWorld/{awt}", method = RequestMethod.GET)
	public String helloWorld(@PathVariable String awt, Model model) {
		System.out.println("++++++++++++++@helloWorld+++++++++++++++++++++"
				+ model.getClass().getName());
		System.out.println("+++++++++++++@helloWorld++++++++++++++++++++++" + awt);

		// WebApplicationContextUtils.getWebApplicationContext(sc);
		WebApplicationContext wct = this.getWebApplicationContext();
		PojoOne po = wct.getBean(PojoOne.class);
		System.out.println("!!!!!!!!!!!!!!  po.getName() :: " + po.getName());

		UserService userService = wct.getBean(UserService.class);
		userService.createUser();
		userService.isopen();

		ApplicationContext act = this.getApplicationContext();
		System.out.println("???????????????????? wct == act ::: "
				+ (wct == act));

		// System.out.println("?????????????????  po2.getName() :: " +
		// user.getLastname());
		model.addAttribute("message", "/helloWorld/{awt} ����" + awt);
		return "hello";
	}

	@RequestMapping(value = "/hello11.do")
	public String hello(HttpServletRequest request) {
		logger.debug("+++++++++++++logger.trace  logger.trace  logger.trace++++++++++++++++");
		logger.debug("++++++++++++++++++@hello11111+++++++??????????????++++++++++");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", "safasdfasdfasdfasdfasdfasd");
		map.put("reason", "3234234234234234234234");

		WebApplicationContext wct = this.getWebApplicationContext();
		UserService userService = wct.getBean(UserService.class);
		List<User> userLst = userService.findAllUser();
		StringBuilder sb = new StringBuilder();
		for (User user : userLst) {
			sb.append(user.getId() + "::" + user.getLastname() + "::"
					+ user.getPhoneNum() + "<BR>");
		}

		User userGet = userService.getUsers(100003L);
		sb.append("<BR><BR>" + userGet.getId() + "::" + userGet.getLastname()
				+ "::" + userGet.getPhoneNum() + "<BR>");

		// sb.append("<BR><BR>USER :: " + this.getTDSecurityUser().getId());

		logger.debug(" ::: " + sb.toString());

		request.setAttribute("msg", sb.toString());
		// request.setAttribute("bodyjsp", "/view/hello11.jsp");
		return "hello11aa";
		// return "mainpage";
	}

	@RequestMapping(value = "/hello22", method = RequestMethod.POST)
	public String hello22(@ModelAttribute String lnameff) {
		logger.trace("++++++++++++++++++@hello22+++++++??????????????++++++++++");

		return "hello002";
	}

	@RequestMapping(value = "/main")
	public String index(HttpServletRequest request) {
		System.out
				.println("++++++++++++++++++@indexindexindexindexindex index+++++++??????????????++++++++++");
		// request.setAttribute("bodyjsp", "/view/index.jsp");
		return "tiles.mainpage";
		// return "mainpage";
	}

	@RequestMapping(value = "/tem")
	public long sitemesh(HttpServletRequest request) {
		System.out
				.println("++++++++++++++++++@sitemesh sitemesh sitemesh sitemesh sitemesh +++++++++");
		// if(true) {
		// throw new
		// RuntimeException("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
		// }
		return 12L;// "sitemesh/tem";
	}

	@RequestMapping(value = "/pets/{petId}", method = RequestMethod.GET)
	public String findPet(@PathVariable String petId, Model model) {
		logger.trace("++++++++++++++++++@findPet+++++++??????????????++++++++++"
				+ petId);

		WebApplicationContext wct = this.getWebApplicationContext();
		UserService userService = wct.getBean(UserService.class);
		// userService.updateUser();
		model.addAttribute("isme", "YES");
		return "hello";
	}

	@RequestMapping(value = "/setupForm", method = RequestMethod.GET)
	public String setupForm(@RequestParam("petId") int petId, ModelMap model) {
		logger.trace("++++++++++++++++++@setupForm+++++++??????????????++++++++++"
				+ petId);
		model.addAttribute("pet", petId);
		return "tiles.crm.bus";
	}

	@RequestMapping(value = "/body", method = RequestMethod.GET)
	@ResponseBody
	public String bodyCon(ModelMap model) {
		logger.trace("++++++++++++++++++@bodyCon+++++++??????????????++++++++++");
		if (true) {
			throw new RuntimeException(
					"TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
		}
		return "BODY WRITE!!!!";
	}

	@RequestMapping(value = "/bodyreq", method = RequestMethod.PUT)
	public void bodyReq(@RequestBody String reqBody, Writer write)
			throws IOException {
		logger.trace("++++++++++++++++++@bodyReq+++++++??????????????++++++++++");
		try {
			write.write(reqBody);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// return "BODY bodyReq!!!!";
	}

	@ModelAttribute("addresses")
	public String modelAtt() {
		logger.trace("++++++++++++++++++@@ModelAttribute  ININTED+++++++d");
		return "++++++++++++++++++@@ModelAttribute RETURNED+++++++d";
	}

	@ModelAttribute
	public void modelAttribute(Model mode) {
		logger.trace("++++++++++++++++++@@ModelAttribute  ININTED+++++++d001");
		mode.addAttribute("modAtt",
				"++++++++++++++++++@@ModelAttribute  ININTED+++++++d001");
		// return "++++++++++++++++++@@ModelAttribute RETURNED+++++++d";
	}
	
	@RequestMapping(value = "/ajax", method = RequestMethod.GET,  produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public PojoOne ajaxAction(Model mode) {
		logger.trace("++++++++++++++++++@@ModelAttribute  ININTED+++++++d001");
		mode.addAttribute("modAtt",
				"++++++++++++++++++@@ModelAttribute  ININTED+++++++d001");
		PojoOne po = new PojoOne();
		return po;
	}

	// for default forward
	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView handleRequest() {
		ModelAndView mav = new ModelAndView();
		return mav;
	}

}