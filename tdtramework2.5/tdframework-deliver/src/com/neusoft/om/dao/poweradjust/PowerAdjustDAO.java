package com.neusoft.om.dao.poweradjust;

import com.neusoft.om.dao.employee.AdjEmployeeColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface PowerAdjustDAO extends BaseDao {
	public static final String BEAN = "powerAdjustDAO";
	/**
	 * ����һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddPowerAdjustInfo(PowerAdjustVO vo) throws DataAccessException;
	/**
	 * ����ְԱ���ɾ�����и�ְԱ��΢����Ϣ
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeletePowerAdjustInfo(String employeeId) throws DataAccessException;
	/**
	 * ����ְԱ���,�˵����ɾ����Ϣ
	 * @param employeeId
	 * @param menuId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeletePowerAdjustInfo(String employeeId,String menuId) throws DataAccessException;
	
	/**
	 * ����ְԱ����õ���Ȩ��΢����Ϣ����
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public PowerAdjustColl getPowerAdjustCollByEmpId(String employeeId) throws DataAccessException;
	
	/**
	 * ��������Ȩ��΢����Ϣ
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddPowerAdjust(PowerAdjustColl coll) throws DataAccessException;
	
	/**
	 * ����ɾ��΢����Ϣ
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeletePowerAdjust(PowerAdjustColl coll) throws DataAccessException;
	
	/**
	 * �õ�������ְԱ���е�΢����Ϣ
	 * @param empColl
	 * @return
	 * @throws DataAccessException
	 */
	public AdjEmployeeColl getPowerAdjustCollByEmpColl () throws DataAccessException;

}
