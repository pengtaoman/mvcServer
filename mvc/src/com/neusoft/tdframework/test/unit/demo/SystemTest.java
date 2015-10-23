package com.neusoft.tdframework.test.unit.demo;

import org.junit.Test;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.tdframework.auth.menu.service.MenuService;
import com.neusoft.tdframework.auth.menu.service.SystemService;
import com.neusoft.tdframework.demo.EmployeeService;
import com.neusoft.tdframework.entity.OmSystemT;
import com.neusoft.tdframework.test.unit.BaseUnitTest;

public class SystemTest extends BaseUnitTest{
	@Test  
	public void createSys() throws Exception { 
		SystemService systemService = this.wac.getBean(SystemService.class);
		systemService.addSystemBatch();
//      OmSystemT id = systemService..createSystem("营销系统", null);
//		createMenu(id, "营销");
//		if(true){
//		    throw new Exception("----------------------------------------------");
//		}
//		OmSystemT sd1 = systemService.createSystem("营销系统01", id);
//		createMenu(sd1, "营销01");
//		OmSystemT sd2 =systemService.createSystem("营销系统02", id);
//		createMenu(sd2, "营销02");
//		OmSystemT sd3 =systemService.createSystem("营销系统03", id);
//		createMenu(sd3, "营销03");
//		OmSystemT sd4 =systemService.createSystem("营销系统04", id);
//		createMenu(sd4, "营销04");
//		
//		OmSystemT id1 = systemService.createSystem("财务系统", null);
//		OmSystemT id2 = systemService.createSystem("财务系统01", id1);
//		createMenu(id2, "财务01");
//		OmSystemT ssd1 =systemService.createSystem("财务系统02", id1);
//		createMenu(ssd1, "财务02");
//		OmSystemT ssd2 =systemService.createSystem("财务系统03", id1);
//		createMenu(ssd2, "财务03");
//		
//		
//		OmSystemT sssd1 =systemService.createSystem("财务系统-01", id2);
//		createMenu(sssd1, "财务-01");
//		OmSystemT sssd3 =systemService.createSystem("财务系统-02", id2);
//		createMenu(sssd3, "财务-02");
//		OmSystemT sssd4 =systemService.createSystem("财务系统-03", id2);
//		createMenu(sssd4, "财务-03");
//		OmSystemT sssd5 =systemService.createSystem("财务系统-04", id2);
//		OmSystemT sssd6 =systemService.createSystem("财务系统-05", id2);
//		System.out.println("LLLLLLLLLLLLLLL  " + id);
	}
	
	private void createMenu(OmSystemT sysId, String name) throws Exception { 
		
		MenuService menuService = this.wac.getBean(MenuService.class);
		
		String mid01 = menuService.createMenu(name + "菜单01", sysId, "");
		menuService.createMenu(name + "菜单-02", sysId, mid01);
		menuService.createMenu(name + "菜单-03", sysId, mid01);
		menuService.createMenu(name + "菜单-04", sysId, mid01);
		
		String mid02 = menuService.createMenu(name + "菜单02", sysId, "");
		menuService.createMenu(name + "菜单-22", sysId, mid02);
		String mid03 = menuService.createMenu(name + "菜单-23", sysId, mid02);
		menuService.createMenu(name + "菜单-24", sysId, mid02);
		menuService.createMenu(name + "菜单-25", sysId, mid02);
		menuService.createMenu(name + "菜单-26", sysId, mid02);
		menuService.createMenu(name + "菜单-27", sysId, mid02);
		
		menuService.createMenu(name + "菜单-34", sysId, mid03);
		menuService.createMenu(name + "菜单-35", sysId, mid03);
		menuService.createMenu(name + "菜单-36", sysId, mid03);
		menuService.createMenu(name + "菜单-37", sysId, mid03);

	}
}
