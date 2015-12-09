package com.neusoft.tdframework.auth.menu.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.neusoft.tdframework.base.BaseDAO;
import com.neusoft.tdframework.entity.OmMenuT;


@Repository
public class MenuDAO  extends BaseDAO{

	public String createMenu(OmMenuT menu) {
		return (String)this.getHibernateSession().save(menu);
	}
	
	public List<OmMenuT> getMenu() {
		return this.getHibernateSession().createQuery("SELECT o FROM OmMenuT o").list();
	}
	
}
