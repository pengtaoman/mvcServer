package com.neusoft.tdframework.demo;

import org.springframework.stereotype.Repository;

import com.neusoft.tdframework.base.BaseDAO;
import com.neusoft.tdframework.entity.OmEmployeeT;

@Repository
public class EmployeeDAO extends BaseDAO{
	
	public void createEmp(OmEmployeeT emp) {
		
		this.getHibernateSession().save(emp);
		
	}

}
