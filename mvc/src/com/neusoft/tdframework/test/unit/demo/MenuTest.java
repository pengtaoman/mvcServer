package com.neusoft.tdframework.test.unit.demo;

import java.util.List;

import org.junit.Test;

import com.google.gson.Gson;
import com.neusoft.tdframework.auth.menu.service.MenuService;
import com.neusoft.tdframework.auth.menu.service.SystemService;
import com.neusoft.tdframework.demo.EmployeeService;
import com.neusoft.tdframework.entity.OmMenuT;
import com.neusoft.tdframework.test.unit.BaseUnitTest;

public class MenuTest  extends BaseUnitTest{
	@Test  
	public void getMenu() throws Exception { 
		MenuService menuService = this.wac.getBean(MenuService.class);
		List<OmMenuT> lst = menuService.getMenu();
		System.out.println(new Gson().toJson(lst));
	}
}
