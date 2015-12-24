package com.lilai.framework.test.unit.demo;

import java.util.List;

import org.junit.Test;

import com.google.gson.Gson;
import com.lilai.framework.auth.menu.service.EmployeeService;
import com.lilai.framework.auth.menu.service.MenuService;
import com.lilai.framework.auth.menu.service.SystemService;
import com.lilai.framework.entity.OmMenuT;
import com.lilai.framework.test.unit.BaseUnitTest;

public class MenuTest  extends BaseUnitTest{
	@Test  
	public void getMenu() throws Exception { 
		MenuService menuService = this.wac.getBean(MenuService.class);
		List<OmMenuT> lst = menuService.getMenu();
		System.out.println(new Gson().toJson(lst));
	}
}
