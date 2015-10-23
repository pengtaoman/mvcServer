package com.neusoft.tdframework.auth.menu.dao;

import org.springframework.stereotype.Repository;

import com.neusoft.tdframework.base.BaseDAO;
import com.neusoft.tdframework.entity.OmSystemT;


@Repository
public class SystemDAO extends BaseDAO{

	public String createSystem(OmSystemT system) {
		return (String)this.getHibernateSession().save(system);
	}
}
