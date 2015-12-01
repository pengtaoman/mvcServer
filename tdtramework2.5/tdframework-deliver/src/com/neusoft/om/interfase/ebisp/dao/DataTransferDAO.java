package com.neusoft.om.interfase.ebisp.dao;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface DataTransferDAO extends BaseDao{
	
	public int trsWindowToSystem() throws DataAccessException;
	
	public int trsWindowToMenu() throws DataAccessException;
	
	public int trsFrameToMenu() throws DataAccessException;
	
	public int trsViewToMenu() throws DataAccessException;

}
