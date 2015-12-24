package com.lilai.framework.auth.menu.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lilai.framework.base.BaseDAO;
import com.lilai.framework.entity.OmEmployeeT;

@Repository
public class EmployeeDAO extends BaseDAO{
	
	public void createEmp(OmEmployeeT emp) {
		
		this.getHibernateSession().save(emp);
		
	}
	
	public List<OmEmployeeT> getEmployee() {
		return this.getHibernateSession().createQuery("SELECT o FROM OmEmployeeT o").list();
	}

}
