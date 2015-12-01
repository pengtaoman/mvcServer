package com.neusoft.om.bo;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: ʵ�ֹ��ܽ�ɫά�������нӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface FuncRoleBO extends BaseBO{
	public static final String BEAN ="funcRoleFacade";
	
	/**
	 * ���ӹ��ܽ�ɫ
	 * @param roleVO
	 * @return int
	 * @throws ServiceException
	 */
	public int doAddFuncRoleInfo(RoleVO roleVO) throws ServiceException;
	/**
	 * �޸Ĺ��ܽ�ɫ
	 * @param roleId
	 * @param roleName
	 * @param roleDesc
	 * @return
	 * @throws ServiceException
	 */
	public int doModifyFuncRoleInfo(int roleId,String roleName,String roleDesc) throws ServiceException;
	/**
	 * �޸Ĺ��ܽ�ɫ
	 * @param roleId
	 * @param roleName
	 * @return
	 * @throws ServiceException
	 */
	public int doModifyFuncRoleInfo(int roleId,String roleName) throws ServiceException;
	/**
	 * ���ݽ�ɫ��ʶroleIdɾ����Ϣ
	 * ����ý�ɫ��ʶ�ѱ�ʹ��������ɾ��
	 * ͬʱά����ɫ��,����ɫ���еĸü�¼��Ӧɾ��
	 * @param roleId
	 * @return int
	 * @throws ServiceException
	 */
	public int doDeleteFuncRoleInfo(int roleId) throws ServiceException;
	/**
	 * ���ݽ�ɫ��ʶ�Ըý�ɫ��Ӧ��Ȩ�����е���
	 * funcStrΪ�˵���ɵĴ�,ÿ���˵���";"�ָ�
	 * @param roleId
	 * @param funcStr
	 * @return
	 * @throws ServiceException
	 */
	public int doAdjustPrivilegeFuncRoleInfo(int roleId,String funcStr) throws ServiceException;
	/**
	 * �õ�ְ��Χ�ڵ�ĳ����ɫ�Ĺ��ܲ˵���Ϣ(��Ȩ��)
	 * @param dutyId
	 * @param roleId
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getMenuInfoByDutyIdRoleId(int dutyId,int roleId) throws ServiceException;
	/**
	 * �õ�ְ��Χ�ڵ�ĳ����ɫ�Ĺ��ܲ˵���Ϣ(������Ȩ���Ĳ˵�����Ȩ���Ĳ˵�)
	 * @param dutyId
	 * @param roleId
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getAllMenuInfoByDutyIdRoleId(int dutyId,int roleId) throws ServiceException;
	/**
	 * ����ְ��Id�õ����ܽ�ɫ����
	 * @param dutyId
	 * @return RoleColl
	 * @throws ServiceException
	 */
	public RoleColl getAllFuncRoleByDutyId(int dutyId) throws ServiceException;
	/**
	 * new 060701
	 * ������ɫ
	 * @param RoleVO
	 * @return int
	 * @throws ServiceException
	 */
	public int doAddRoleInfo(RoleVO roleVO) throws ServiceException;
	/**
	 * new 060701
	 * �޸Ľ�ɫ�Ĳ˵�Ȩ��
	 * @param oldMenus
	 * @param newMenus
	 * @param roleId
	 * @return int
	 * @throws ServiceException
	 */
	public int modifyRolePower(String oldMenus,String newMenus,int roleId) throws ServiceException;
	
	/**
	 * ��Ȩ 
	 * @param newMenus
	 * @param roleId
	 * @return
	 * @throws ServiceException
	 */
	public int modifyRolePower(String[] newMenus, int roleId ,String systemId) throws ServiceException;
	
	
}
