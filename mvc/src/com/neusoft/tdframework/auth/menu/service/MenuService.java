package com.neusoft.tdframework.auth.menu.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.tdframework.auth.menu.dao.MenuDAO;
import com.neusoft.tdframework.base.BaseService;
import com.neusoft.tdframework.entity.OmMenuT;
import com.neusoft.tdframework.entity.OmSystemT;
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
		
		
		return eDao.getMenu();
	}
}
