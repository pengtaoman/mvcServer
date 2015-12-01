package com.neusoft.om.bo;

import com.neusoft.om.dao.datarole.DataRoleColl;
import com.neusoft.om.dao.datarole.DataRoleVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: 实现数据角色管理的所有接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface DataRoleBO extends BaseBO{
	public DataRoleColl queryDataRoleInfoByRoleId(int roleId) throws ServiceException;
	public int daoAddDataRoleInfo(DataRoleVO vo) throws ServiceException;

}
