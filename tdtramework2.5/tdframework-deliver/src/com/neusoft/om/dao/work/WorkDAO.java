package com.neusoft.om.dao.work;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface WorkDAO extends BaseDao{
	public static final String BEAN = "workDAO";
	/**
	 * 根据系统Id得到工作区信息集合
	 * 20050527 做了修改,只显示固定的连接,该连接由权限配置
	 * @param systemId
	 * @return
	 * @throws DataAccessException
	 */
	public WorkColl getWorkInfoById(String systemId) throws DataAccessException;
	/**
	 * 根据职员编号,到工作区信息表中查记录,如果该操作员有某个系统的权限,且这个系统在
	 * 工作区中配置了信息,则显示该系统,否则不显示
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public WorkColl getAllWorkInfoByEmployeeId(String parentMenuId,String employeeId) throws DataAccessException;
	
}
