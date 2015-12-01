package com.neusoft.om.dao.pwd;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface PwdComplexityDAO extends BaseDao{
	
	/**
	 * ������е����븴�Ӷ�����
	 * @return
	 * @throws DataAccessException
	 */
	public PwdComplexityColl getAllPwdComlexityConfig() throws DataAccessException;
	
	public PwdComplexityVO getPwdComplexityById(int id) throws  DataAccessException;
	
	public int doAddPwdComplexity( PwdComplexityVO vo) throws DataAccessException;
	
	public int doUpdatePwdComplexity( PwdComplexityVO vo) throws DataAccessException;
	
	public int doDeletePwdComplexity( int id) throws DataAccessException;

}
