package com.neusoft.om.dao.group;

import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface GroupDAO extends BaseDao {
	
	public int getGroupCount(String groupName) throws DataAccessException;
	
	public GroupColl getGroupColl(String groupName,int startLine, int endLine)throws DataAccessException;
	
	public int getEmpCount(String workNo, String name) throws DataAccessException;
	
	public EmployeeColl getEmpColl(String workNo, String name, int startLine, int endLine) throws DataAccessException;
	
	public EmployeeColl getEmpColl(String workNo, String name) throws DataAccessException;
	
	public int doAddGroup(GroupVO vo) throws DataAccessException;
	
	public int doModifyGroup(GroupVO vo) throws DataAccessException;
	
	public int doDeleteGroup(String groupId) throws DataAccessException;
	
	public boolean haveEmp(String groupId) throws DataAccessException;
	
	public EmployeeColl getGroupEmpColl(String groupId) throws DataAccessException;
	
	public GroupVO getGroupVO(String groupId) throws DataAccessException;
	
	public void doAddGroupEmp(String groupId, EmployeeColl empColl) throws DataAccessException;
	
	public void doDeleteGroupEmp(String groupId, EmployeeColl empColl) throws DataAccessException;
	
	public void doDeleteGroupEmp(String groupId) throws DataAccessException;
	
	public boolean haveEmpInSameCity(EmployeeColl grantColl) throws  DataAccessException;
	
	public String haveEmpInSameCity(String groupId, EmployeeColl empColl) throws  DataAccessException;
	
	public String haveInOtherGroup(String groupId,EmployeeColl empColl) throws  DataAccessException;
}
