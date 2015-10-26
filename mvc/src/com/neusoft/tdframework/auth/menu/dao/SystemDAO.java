package com.neusoft.tdframework.auth.menu.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.neusoft.tdframework.base.BaseDAO;
import com.neusoft.tdframework.entity.OmSystemT;


@Repository
public class SystemDAO extends BaseDAO{

	public String createSystem(OmSystemT system) {
		return (String)this.getHibernateSession().save(system);
	}
	
	@SuppressWarnings("unchecked")
	public List<OmSystemT> getSys() {
		return this.getHibernateSession().createQuery("from OmSystemT as syst").list();
	}
}
