package com.lilai.framework.test.unit.demo;

import java.util.List;

import org.hibernate.Hibernate;
import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.lilai.framework.auth.menu.dao.MenuDAO;
import com.lilai.framework.auth.menu.service.EmployeeService;
import com.lilai.framework.auth.menu.service.MenuService;
import com.lilai.framework.auth.menu.service.SystemService;
import com.lilai.framework.entity.OmMenuT;
import com.lilai.framework.entity.OmSystemT;
import com.lilai.framework.test.unit.BaseUnitTest;
import com.lilai.framework.web.adapter.HibernateProxyTypeAdapter;

public class MenuTest  extends BaseUnitTest{
	@Test  
	public void getMenu() throws Exception { 
		MenuService menuService = this.wac.getBean(MenuService.class);
		List<OmMenuT> lst = menuService.getMenu();
		
		GsonBuilder b = new GsonBuilder();
		b.registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY);
		Gson gson = b.create();
		
		for (OmMenuT m : lst) {
			OmSystemT sys = m.getOmSystemT();
			System.out.println("###############  " + sys.getFSystemName());
			Class<?> baseType = Hibernate.getClass(sys);
			System.out.println("###############  " +baseType);
			break;
		}
		
		
		//gson.get
		System.out.println(gson.toJson(lst));
	}
	
	@Test  
	public void loadMenu() throws Exception { 
		//直接使用DAO，事务在service层，导致异常
		MenuService menuService = this.wac.getBean(MenuService.class);
		OmMenuT mm = menuService.loadMenu("8a84fcfe511ee9c401511ee9d7030001");
		
		System.out.println("###############  " +mm.getOmSystemT().getFSystemName());
	}
}
