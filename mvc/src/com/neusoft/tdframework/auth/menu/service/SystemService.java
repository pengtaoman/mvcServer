package com.neusoft.tdframework.auth.menu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.tdframework.auth.menu.dao.SystemDAO;
import com.neusoft.tdframework.base.BaseService;
import com.neusoft.tdframework.entity.OmSystemT;
@Service
public class SystemService extends BaseService {
	
	@Autowired
	private SystemDAO eDao;
	

	public OmSystemT createSystem(String name, OmSystemT parentSysId) {
		OmSystemT sys = new OmSystemT();
		sys.setFSystemName(name);
		if (parentSysId != null) {
		    sys.setFParentSystemId(parentSysId.getFSystemId());
		} else {
			sys.setFParentSystemId("");
		}
		String id = eDao.createSystem(sys);
		
		return sys;
	}
	

	public void addSystemBatch() throws Exception {
		OmSystemT id = createSystem("营销系统", null);
		createMenu(id, "营销");
		if(false){
		    throw new Exception("----------------------------------------------");
		}
		OmSystemT sd1 = createSystem("营销系统01", id);
		createMenu(sd1, "营销01");
		OmSystemT sd2 =createSystem("营销系统02", id);
		createMenu(sd2, "营销02");
		OmSystemT sd3 =createSystem("营销系统03", id);
		createMenu(sd3, "营销03");
		OmSystemT sd4 =createSystem("营销系统04", id);
		createMenu(sd4, "营销04");
		
		OmSystemT id1 = createSystem("财务系统", null);
		OmSystemT id2 = createSystem("财务系统01", id1);
		createMenu(id2, "财务01");
		OmSystemT ssd1 =createSystem("财务系统02", id1);
		createMenu(ssd1, "财务02");
		OmSystemT ssd2 =createSystem("财务系统03", id1);
		createMenu(ssd2, "财务03");
		
		
		OmSystemT sssd1 =createSystem("财务系统-01", id2);
		createMenu(sssd1, "财务-01");
		OmSystemT sssd3 =createSystem("财务系统-02", id2);
		createMenu(sssd3, "财务-02");
		OmSystemT sssd4 =createSystem("财务系统-03", id2);
		createMenu(sssd4, "财务-03");
		OmSystemT sssd5 =createSystem("财务系统-04", id2);
		OmSystemT sssd6 =createSystem("财务系统-05", id2);
		System.out.println("LLLLLLLLLLLLLLL  " + id);
	}
	
	private void createMenu(OmSystemT sysId, String name) throws Exception { 
		
		MenuService menuService = this.getApplicationContext().getBean(MenuService.class);
		
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
