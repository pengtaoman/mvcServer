package com.lilai.framework.test.unit.demo;

import org.junit.Test;

import com.google.gson.Gson;
import com.lilai.framework.auth.menu.service.EmployeeService;
import com.lilai.framework.demo.UserService;
import com.lilai.framework.test.unit.BaseUnitTest;

public class EmployeeTest extends BaseUnitTest{
	@Test  
	public void createEmp() throws Exception { 
		EmployeeService employeeService = this.wac.getBean(EmployeeService.class);
		for (int i = 100; i < 199; i ++ ) {
		    employeeService.createEmp(i);
		}
	}
	
	@Test  
	public void getEmp() throws Exception { 
		EmployeeService employeeService = this.wac.getBean(EmployeeService.class);
		
		System.out.println(new Gson().toJson(employeeService.getEmployee()));
	}
}
