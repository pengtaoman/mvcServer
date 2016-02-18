package com.lilai.framework.auth.menu.service;

import java.math.BigDecimal;
import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lilai.framework.auth.menu.dao.MenuDAO;
import com.lilai.framework.base.BaseService;
import com.lilai.framework.entity.OmMenuT;
import com.lilai.framework.entity.OmSystemT;
@Service
public class MenuService extends BaseService {
	@Autowired
	private MenuDAO eDao;
	

	public String createMenu(String name, OmSystemT system, String parentMenuId) {
		OmMenuT menu = new OmMenuT();
		menu.setFMenuName(name);
		menu.setFModuleId("1");
		menu.setFLayer(BigDecimal.ONE);
		menu.setFMenuType(BigDecimal.ZERO);
		menu.setOmSystemT(system);
		
		menu.setFParentMenuId(parentMenuId);
		
		String id = eDao.createMenu(menu);
		
		return id;
	}
	public List<OmMenuT> getMenu() {
		List<OmMenuT> lst = eDao.getMenu();
		if(lst != null && !lst.isEmpty()) {
			//如果在service层不使用Hibernate.getClass，在view层或ut层session会置空，导致异常
			//规范的做法为使用 OpenSessionInViewFilter
			//System.out.println(Hibernate.getClass(lst.get(0).getOmSystemT())) ;
		} else { 
			System.out.println("NO data");
		}
		return lst;
	}
	
	public OmMenuT loadMenu(String id){
		return eDao.loadMenu(id);
	}
}
