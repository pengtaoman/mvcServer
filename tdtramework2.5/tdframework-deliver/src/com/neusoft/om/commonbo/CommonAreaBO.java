package com.neusoft.om.commonbo;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2006-09-12</p>
 * <p>Module     : om</p>
 * <p>Description: �ṩ��ҵ��ϵͳֱ�ӵ��õ�BO�ӿ�</p>
 * <p>Remark     : </p>
 * @author zhaof
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */

public interface CommonAreaBO extends BaseBO {
	public static final String BEAN = "commonAreaBO";
	/**
	 * ����AreaDAO
	 * @param dao
	 */
	public void setAreaDAO(AreaDAO dao);
    
	/**
	 * ����areaId�õ�����areaId�������¼��������������
	 * @param areaId
	 * @return
	 */
	public AreaColl getAreaChildColl(String areaId) throws ServiceException;;
}
