package com.neusoft.tdframework.authorization;

import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;

/**brief description
 * <p>Date       : 2004-11-19</p>
 * <p>Module     : om</p>
 * <p>Description: AuthorizeBO interface</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */

public interface AuthorizeBO extends BaseBO {
	/**
	 * BEAN �����ڿ�ܣ�config/applicationContext.xml�� <b>
	 * bean_id = authorizeFacade
	 */
	public static final String BEAN = "authorizeFacade";
	
	/**
	 * 
	 * ��֤���صĽ��
	 * 
	 * @param workNo
	 * @param workPwd
	 * @return
	 * @throws ServiceException
	 */
	public AuthorizeVO getAuthorizeInfo(String workNo,String workPwd) throws ServiceException;
	
	/**
	 * ��ȡ����Ա��ĳһϵͳ�Ĳ˵���Ϣ. <b>
	 * ���ؽ����������ť. <b>
	 * key: "workmenu","favoritemenu","funcmenu"
	 * value: menuName, �˵�����
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public Map getMenuInfo(String employeeId,String systemId) throws ServiceException;
	/**
	 * ��ȡ�Ƿ���ʾ�ղؼ�
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public String getIfshowfav(String systemId) throws ServiceException;
	/**
	 * ��ȡ������Ӧ�Ĺ��ܲ˵�
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FrameMenuColl getAllMenuInfo(String employeeId,String systemId) throws ServiceException;
	
	/**
	 * added by pengtao 2011-05-24 for CRM6
	 * ��ȡ������Ӧ�Ĺ��ܲ˵�,���չ��Ż�ȡ
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public List getMenuNavigation(String systemId, String employeeId) throws ServiceException;
	
	/**
	 * added by pengtao 2011-05-24 for CRM6
	 * ��ȡȫ��ϵͳ��Ϣ
	 * @return
	 * @throws ServiceException
	 */
	public List getSystemNavigation(String employeeId) throws ServiceException;
	
	/**
	 * ���ع�������Ϣ
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FrameWorkColl getWorkInfoBySystemId(String systemId) throws ServiceException;
	
	/**
	 * �����ղؼ�
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FavoriteColl getFavoriteInfoByEmployeeIdSystemId(String employeeId,String systemId) throws ServiceException;
	
	/**
	 * 
	 * ��ȡϵͳ��Ϣ
	 * 
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public SystemColl getSystemInfo(String employeeId) throws ServiceException;
	
	/**
	 * ���ҳ���Ƿ���Ȩ�ޣ���TAGLIB�б�
	 * @param employeeId	�ʻ���ʶ
	 * @param menuId  �˵���ʶ(ҵ�񿪷���������)
	 * @return
	 * @throws ServiceException
	 */
	public boolean checkPage(String employeeId,String menuId) throws ServiceException;
	
	/**
	 * ��鰴ť����Ч��
	 * @param employeeId
	 * @param menuId
	 * @return �����ǻ۰�ť��
	 * @throws ServiceException
	 */
	public String getDisabledButton(String employeeId,String menuId) throws ServiceException;
	
	
	public List getMenuForSearch(String employeeId, String searchKey) throws ServiceException;

}
