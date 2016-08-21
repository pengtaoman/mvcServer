//package com.lilai.framework.auth.menu.service;
//
//import java.math.BigDecimal;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.lilai.framework.auth.menu.dao.EmployeeDAO;
//import com.lilai.framework.base.BaseService;
//import com.lilai.framework.entity.OmEmployeeT;
//
////@Service
//public class EmployeeService extends BaseService {
//	
//	@Autowired
//	private EmployeeDAO eDao;
//	public void createEmp(int inx) {
//		OmEmployeeT emp = new OmEmployeeT();
//		emp.setFEmail("aa@nn.com");
//		
//		emp.setFAreaId("11111");
//		emp.setFBusDutyId(BigDecimal.valueOf(2333));
//		emp.setFOrganId("222222");
//		emp.setFEmployeeType(BigDecimal.ONE);
//		emp.setFDutyId(BigDecimal.ONE);
//		emp.setFEmployeeName("Alldd" + inx);
//		emp.setFWorkNo("admin");
//		//emp.
//		
//		
//		eDao.createEmp(emp);
//	}
//	
//	public List<OmEmployeeT> getEmployee() {
//		return eDao.getEmployee();
//	}
//
//}
