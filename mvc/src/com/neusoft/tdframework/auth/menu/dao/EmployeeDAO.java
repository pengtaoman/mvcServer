package com.neusoft.tdframework.auth.menu.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.neusoft.tdframework.base.BaseDAO;
import com.neusoft.tdframework.entity.OmEmployeeT;

@Repository
public class EmployeeDAO extends BaseDAO{
	
	public void createEmp(OmEmployeeT emp) {
		
		this.getHibernateSession().save(emp);
		
	}
	
	public List<OmEmployeeT> getEmployee() {
		return this.getHibernateSession().createQuery("SELECT o FROM OmEmployeeT o").list();
	}

}
