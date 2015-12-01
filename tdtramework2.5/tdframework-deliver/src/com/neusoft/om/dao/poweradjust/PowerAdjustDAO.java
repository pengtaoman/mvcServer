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
	 * 增加一条记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddPowerAdjustInfo(PowerAdjustVO vo) throws DataAccessException;
	/**
	 * 根据职员编号删除所有该职员的微调信息
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeletePowerAdjustInfo(String employeeId) throws DataAccessException;
	/**
	 * 根据职员编号,菜单编号删除信息
	 * @param employeeId
	 * @param menuId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeletePowerAdjustInfo(String employeeId,String menuId) throws DataAccessException;
	
	/**
	 * 根据职员编码得到其权限微调信息集合
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public PowerAdjustColl getPowerAdjustCollByEmpId(String employeeId) throws DataAccessException;
	
	/**
	 * 批量增加权限微调信息
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddPowerAdjust(PowerAdjustColl coll) throws DataAccessException;
	
	/**
	 * 批量删除微调信息
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeletePowerAdjust(PowerAdjustColl coll) throws DataAccessException;
	
	/**
	 * 得到集合中职员所有的微调信息
	 * @param empColl
	 * @return
	 * @throws DataAccessException
	 */
	public AdjEmployeeColl getPowerAdjustCollByEmpColl () throws DataAccessException;

}
