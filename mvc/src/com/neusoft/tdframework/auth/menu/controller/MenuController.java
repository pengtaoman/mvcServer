package com.neusoft.tdframework.auth.menu.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.neusoft.tdframework.auth.menu.service.MenuService;
import com.neusoft.tdframework.auth.menu.service.SystemService;
import com.neusoft.tdframework.base.BaseController;
import com.neusoft.tdframework.entity.OmMenuT;
import com.neusoft.tdframework.entity.OmSystemT;
import com.neusoft.tdframework.web.pojo.PojoOne;

@Controller
public class MenuController extends BaseController {
	
	@RequestMapping(value = "/getSys", method = RequestMethod.GET,  produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<OmSystemT> getSys(Model mode) {
		logger.trace("++++++++++++++++++@@getSys +++++++d001+++++++");

		return this.getService(SystemService.class).getSys();
	}
	
	@RequestMapping(value = "/getMenu", method = RequestMethod.GET,  produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<OmMenuT> getMenu(Model mode) {
		logger.trace("++++++++++++++++++@@getSys +++++++d001+++++++");

		return this.getService(MenuService.class).getMenu();
	}

}
