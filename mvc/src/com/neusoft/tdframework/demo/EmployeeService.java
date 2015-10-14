package com.neusoft.tdframework.demo;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neusoft.tdframework.base.BaseService;
import com.neusoft.tdframework.entity.OmEmployeeT;

@Service
public class EmployeeService extends BaseService {
	
	@Autowired
	private EmployeeDAO eDao;
	public void createEmp() {
		OmEmployeeT emp = new OmEmployeeT();
		emp.setFEmail("aa@nn.com");
		
		emp.setFAreaId("11111");
		emp.setFBusDutyId(BigDecimal.valueOf(2333));
		emp.setFOrganId("222222");
		emp.setFEmployeeType(BigDecimal.ONE);
		emp.setFDutyId(BigDecimal.ONE);
		emp.setFEmployeeName("Alldd");
		emp.setFWorkNo("admin");
		//emp.
		
		
		eDao.createEmp(emp);
	}

}
