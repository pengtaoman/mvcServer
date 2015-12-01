package com.neusoft.om.dao.menu;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.neusoft.om.dao.funcrole.FuncRoleColl;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.unieap.comp.menu.MenuRepository;

/**brief description
 * <p>Date       : 2004-12-08</p>
 * <p>Module     : om</p>
 * <p>Description: �˵���dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface MenuDAO extends BaseDao {
	public static final String BEAN = "menuDAO";
	/**
	 * ����������ѯ�˵���Ϣ
	 * @param menuId
	 * @return
	 * @throws DataAccessException
	 */
	public MenuVO getMenuByMenuId(String menuId) throws DataAccessException;
	/**
	 * ���ݲ˵��Ż�ȡ�Ƿ���ʾ�ղؼ�
	 * @param employeeId
	 * @param SystemId
	 * @return
	 * @throws DataAccessException
	 */
	public String getIfshowfav(String systemId)throws DataAccessException;
	/**
	 * ��ȡ����Ա��ĳһϵͳ�Ĳ˵���Ϣ
	 * @param employeeId
	 * @param SystemId
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getMenuInfoByEmployeeId(String employeeId,String systemId) throws DataAccessException;
	/**
	 * ����ְԱ����,�˵�������ְԱ�������
	 * @param employeeId
	 * @param menuId
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getEmployeePowerInfo(String employeeId,String menuId) throws DataAccessException;
	/**
	 * ��������ϵͳ
	 * ���ݽ�ɫ��ѯ�ý�ɫ�Ĺ��ܲ˵���ϸ��Ϣ,������Ȩ��Ϣ(�޸�ʱ����)
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getAllFuncRoleMenuInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * ��������Ȩ�޵�ϵͳ
	 * ���ݽ�ɫ��ѯ�ý�ɫ�Ĺ��ܲ˵���ϸ��Ϣ,������Ȩ��Ϣ(��ѯʱ����)
	 * @param roleId
	 * @return MenuColl
	 * @throws DataAccessException
	 */
	public MenuColl getFuncRoleMenuInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * �õ�����ϵͳ���˵�����(����ʱ��)
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getAllMenuInfo() throws DataAccessException;
	/**
	 * ����ϵͳId�õ���ϵͳ���в˵���Ϣ
	 * @param systemId
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getMenuInfoBySystemId(String systemId) throws DataAccessException;
	/**
	 * ����һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddMenuInfo(MenuVO vo) throws DataAccessException;
	/**
	 * �޸ļ�¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyMenuInfo(MenuVO vo) throws DataAccessException;
	/**
	 * ɾ��һ����¼
	 * @param menuId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteMenu(String menuId) throws DataAccessException;
	/**
	 * ��Ҫ��ʾ����ϵͳ�˵���Ϣ
	 * @param dutyId
	 * @return MenuColl
	 * @throws DataAccessException
	 */
	public MenuColl getAllDutyPower(int dutyId) throws DataAccessException;
	/**
	 * ����Ҫ��Ȩ���Ĳ˵���Ϣ
	 * @param dutyId
	 * @return MenuColl
	 * @throws DataAccessException
	 */
	public MenuColl getDutyPower(int dutyId) throws DataAccessException;
	/**
	 * �õ�ְ��Χ�ڵ�ĳ����ɫ�Ĺ��ܲ˵���Ϣ(��Ȩ��)
	 * @param RoleId
	 * @return menuColl
	 * @throws DataAccessException
	 */
	public MenuColl getMenuInfoByDutyIdRoleId(int dutyId,int roleId) throws DataAccessException;
	/**
	 * �õ�ְ��Χ�ڵ�ĳ����ɫ�Ĺ��ܲ˵���Ϣ(������Ȩ���Ĳ˵�����Ȩ���Ĳ˵�)
	 * @param RoleId
	 * @return
	 */
	public MenuColl getAllMenuInfoByDutyIdRoleId(int dutyId,int roleId) throws DataAccessException; 
	/**
	 * ���ݵ�ǰ��¼�Ĺ���Ա�õ���ѡ��ɫ�Ĳ˵���
	 * @param adminEmpId
	 * @param roleId
	 * @return
	 */
	public MenuRepository getITreeNode(String adminEmpId,int roleId);

	public FuncRoleColl getMenusByRoleId(int roleId);
	
	public int modifyMenus(Iterator insertMenus,Iterator deleteMenus,int roleId);
	/**
	 * �õ�ĳ����Ա�ɷ���Ĳ˵�����
	 * @param adminEmpId
	 * @return
	 */
	public MenuColl getAssignableMenuCollByEmpId(String adminEmpId);
	
	public MenuColl getAssignableFirstLevelMenuColl(String adminEmpId);
	
	public MenuColl getAssignableMenuCollByEmpId(String adminEmpId,String systemId);
	/**
	 * �õ�ĳ��ɫ��Ӧ�Ĺ��ܲ˵�����
	 * @param roleId
	 * @return
	 */
	public MenuColl getMenuCollByRoleId(int roleId);
	
	public MenuColl getFirstLevelMenuColl(int roleId);
	
	public MenuColl getMenuCollByRoleId(int roleId,String systemId);
	/**
	 * �õ�ĳ����Ա�ɼ��Ĳ˵�����
	 * @param employyId
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getUsableMenuCollByEmpId(String adminEmpId,String needButton) throws DataAccessException;
	
	public MenuColl getFirstLevelUsableMenuColl(String adminEmpId);
	
	public MenuColl getUsableMenuCollByEmpId(String adminEmpId,String nodeId,boolean ifSystemId);
	/**
	 * �˵���Ϣģ����ѯ
	 * @param menuName
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getMenuByName(String menuName) throws DataAccessException;
	/**
	 * ��ѯĳ�ڵ��� system_id ���� menu_id
	 * @param menuName
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getInfoByNodeId(String nodeId) throws DataAccessException;
	/**
	 * ���ݱ�ʶ�����ƣ����Ͳ�ѯ
	 * @param menuId
	 * @param menuName
	 * @param menuType
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getMenuColl(String menuId, String menuName, String menuType,int startNum, int endNum) throws DataAccessException;
	
	public int getTotalRows(String menuId, String menuName, String menuType) throws DataAccessException;
	/**
	 * ���ݱ�ʶ�����Ʋ�ѯ��ϵͳ
	 * @param sysId
	 * @param sysName
	 * @return
	 * @throws DataAccessException
	 */
	public SystemColl getSystemColl(String sysId, String sysName,int startNum, int endNum) throws DataAccessException;
	
	public int getTotalRows(String sysId, String sysName) throws DataAccessException;
	
	public MenuVO getMenuById(String menuId) throws DataAccessException;
	
	/**
	 * �õ�������Ϊ�ϼ��˵��Ĳ˵����ϣ�menuType = 1��
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getParentMenuColl(String systemId) throws DataAccessException;
	/**
	 * �õ�ĳְԱ����΢�����Ĳ˵�
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public List getAdjustMenuColl(String employeeId) throws DataAccessException;
	
	public MenuColl getMenuCollByRoleAndSys(int roleId, String systemId) throws DataAccessException;
	/**
	 * �õ��˵����϶�Ӧ����ϵͳ����
	 * @param menuIds
	 * @return
	 * @throws DataAccessException
	 */
	public SystemColl getSystemCollByMenu(String menuIds) throws DataAccessException;
	
	public MenuColl getMenuCollByFirstSys(String systemId) throws DataAccessException;
	/**
	 * �õ��б��н�ɫȷ�������п��ò˵�id����,������ť
	 * @param roleIdList
	 * @return
	 * @throws DataAccessException
	 */
	public List getMenuIdListByRoleList(List roleIdList) throws DataAccessException;
	/**
	 * �õ�΢���Ĳ˵�����
	 * adjustType = 1:����Ȩ��  2������Ȩ��
	 * @param employeeId, adjustType
	 * @return
	 * @throws DataAccessException
	 */
	public List getAdjustMenuId(String employeeId, int adjustType) throws DataAccessException;
	
	/** added by pengtao 2011-05-24 For CRM6
	 * ��ȡ����Ա��ĳһϵͳ�Ĳ˵���Ϣ
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public List getMenuNavigation(String systemId, String employeeId) throws DataAccessException;
	
	/** added by pengtao 2011-05-24 For CRM6
	 * ��ȡȫ��ϵͳ��Ϣ
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public List getSystemNavigation(String employeeId) throws DataAccessException;
	
	public List getMenuForSearch(String employeeId, String searchKey) throws DataAccessException;
	
}