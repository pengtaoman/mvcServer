package com.neusoft.om.dao.invalidlog;

import java.util.Map;

import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface InvalidLogDAO extends BaseDao{	
		
	public InvalidLogColl getInvalidLogColl(Map queryMap, int startLine, int endLine) throws DataAccessException;

	public int getInvalidLogCount(Map queryMap) throws DataAccessException;
	
	public InvalidLogColl getInvalidLog(Map map) throws DataAccessException;
}
