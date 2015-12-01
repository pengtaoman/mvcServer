package com.neusoft.om.dao.powerlog;

import java.util.Map;

import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface PowerLogDAO extends BaseDao{
	
	public void doAddPowerLog(PowerLogColl powerLogColl) throws DataAccessException;
	
	public int getMenuCount(Map queryMap) throws DataAccessException;
	
	public PowerLogColl getMenuPowerLogColl(Map queryMap, int startLine, int endLine) throws DataAccessException;

	public int getRoleCount(Map queryMap) throws DataAccessException;
	
	public PowerLogColl getRolePowerLogColl(Map queryMap, int startLine, int endLine) throws DataAccessException;
	
	public PowerLogColl getAdminRoleColl(String authId, String areaId,String operEmpId) throws DataAccessException;
}
