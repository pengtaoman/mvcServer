package com.neusoft.tdframework.error.dao;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author yang-lm
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface ErrorDAO extends BaseDao{
	public static final String BEAN = "errorDAO";
	/**
	 * ���ݴ���Id��ȡ������Ϣ
	 * @param error_code
	 * @return
	 * @throws DataAccessException
	 */
	public ErrorColl getAllErrorInfo() throws DataAccessException;
	
}
