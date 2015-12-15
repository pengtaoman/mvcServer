package com.neusoft.tdframework.test.unit.demo;

import org.junit.Test;

import com.neusoft.tdframework.auth.menu.service.EmployeeService;
import com.neusoft.tdframework.demo.UserService;
import com.neusoft.tdframework.test.unit.BaseUnitTest;

public class EmployeeTest extends BaseUnitTest{
	@Test  
	public void createEmp() throws Exception { 
		EmployeeService employeeService = this.wac.getBean(EmployeeService.class);
		for (int i = 100; i < 199; i ++ ) {
		    employeeService.createEmp(i);
		}
	}
}
