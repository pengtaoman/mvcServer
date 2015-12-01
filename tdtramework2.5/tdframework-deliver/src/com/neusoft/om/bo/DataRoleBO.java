package com.neusoft.om.bo;

import com.neusoft.om.dao.datarole.DataRoleColl;
import com.neusoft.om.dao.datarole.DataRoleVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: ʵ�����ݽ�ɫ��������нӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface DataRoleBO extends BaseBO{
	public DataRoleColl queryDataRoleInfoByRoleId(int roleId) throws ServiceException;
	public int daoAddDataRoleInfo(DataRoleVO vo) throws ServiceException;

}
