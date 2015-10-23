package com.neusoft.tdframework.auth.menu.dao;

import org.springframework.stereotype.Repository;

import com.neusoft.tdframework.base.BaseDAO;
import com.neusoft.tdframework.entity.OmMenuT;

@Repository
public class MenuDAO  extends BaseDAO{

	public String createMenu(OmMenuT menu) {
		return (String)this.getHibernateSession().save(menu);
	}
	
}
