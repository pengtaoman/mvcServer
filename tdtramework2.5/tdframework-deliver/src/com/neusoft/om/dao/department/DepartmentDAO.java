package com.neusoft.om.dao.department;

import com.neusoft.popedom.Department;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface DepartmentDAO extends BaseDao{
	public Department getDepartment(String city_code, String dealer_id) throws DataAccessException;
}
