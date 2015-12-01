package com.neusoft.om.dao.pwd;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author yanglm
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface PwdValidDAO extends BaseDao{
	public static final String BEAN = "pwdValidDAO";
	/**
	 * ��ȡ���������֤����Ϣ
	 * @param 
	 * @return
	 * @throws DataAccessException
	 */
	public PwdValidVO getAllPwdValidInfo() throws DataAccessException;
	/**
	**��ȡ����ʣ����Чʱ��
	* @param 
	* @return
	* @throws DataAccessException
	*/
	public int getEffectDays(String compareDate,int inValidDays)throws DataAccessException;
	
	public int doModify(PwdValidVO vo) throws DataAccessException;
	
	
}
