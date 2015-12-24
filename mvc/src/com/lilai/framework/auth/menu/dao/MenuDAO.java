package com.lilai.framework.auth.menu.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lilai.framework.base.BaseDAO;
import com.lilai.framework.entity.OmMenuT;


@Repository
public class MenuDAO  extends BaseDAO{

	public String createMenu(OmMenuT menu) {
		return (String)this.getHibernateSession().save(menu);
	}
	
	public List<OmMenuT> getMenu() {
		return this.getHibernateSession().createQuery("SELECT o FROM OmMenuT o").list();
	}
	
}
