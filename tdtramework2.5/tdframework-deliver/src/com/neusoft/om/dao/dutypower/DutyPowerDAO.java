/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.dao.dutypower;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface DutyPowerDAO extends BaseDao{
	public static final String BEAN = "dutyPowerDAO";
	
	/**
	 * ����ְ����,ά��ְ���ְ��Χ
	 * @param dutyId
	 * @param allFuncStr
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddDutyPower(int dutyId,DutyPowerColl coll) throws DataAccessException;
	/**
	 * ����ְ����ɾ����Ӧ��Ȩ��
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteDutyPower(int dutyId) throws DataAccessException;
}
