package com.neusoft.om.bo;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: ʵ�ֹ��ܹ�������нӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface MenuFuncManagementBO extends BaseBO{
	public static final String BEAN = "menuFuncManagementFacade";
	/**
	 * ���в˵�,ϵͳ����
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getAllMenuInfo() throws ServiceException;
	/**
	 * ���в˵�,ϵͳ����,����Ȩ����Ϣ
	 * @param roleId
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getAllFuncMenuInfoByRoleId(int roleId) throws ServiceException;
	/**
	 * ��Ȩ�޵�ϵͳ�˵�,����
	 * @param roleId
	 * @return
	 * @throws ServiceException
	 */
	public MenuColl getFuncMenuInfoByRoleId(int roleId) throws ServiceException;
}
