package com.neusoft.om.dao.pwd;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface PwdComplexityDAO extends BaseDao{
	
	/**
	 * 获得所有的密码复杂度配置
	 * @return
	 * @throws DataAccessException
	 */
	public PwdComplexityColl getAllPwdComlexityConfig() throws DataAccessException;
	
	public PwdComplexityVO getPwdComplexityById(int id) throws  DataAccessException;
	
	public int doAddPwdComplexity( PwdComplexityVO vo) throws DataAccessException;
	
	public int doUpdatePwdComplexity( PwdComplexityVO vo) throws DataAccessException;
	
	public int doDeletePwdComplexity( int id) throws DataAccessException;

}
