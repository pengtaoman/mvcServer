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
 * <p>Description: 菜单的dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface MenuDAO extends BaseDao {
	public static final String BEAN = "menuDAO";
	/**
	 * 根据主键查询菜单信息
	 * @param menuId
	 * @return
	 * @throws DataAccessException
	 */
	public MenuVO getMenuByMenuId(String menuId) throws DataAccessException;
	/**
	 * 根据菜单号获取是否显示收藏夹
	 * @param employeeId
	 * @param SystemId
	 * @return
	 * @throws DataAccessException
	 */
	public String getIfshowfav(String systemId)throws DataAccessException;
	/**
	 * 获取操作员的某一系统的菜单信息
	 * @param employeeId
	 * @param SystemId
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getMenuInfoByEmployeeId(String employeeId,String systemId) throws DataAccessException;
	/**
	 * 根据职员编码,菜单编码在职员详情表中
	 * @param employeeId
	 * @param menuId
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getEmployeePowerInfo(String employeeId,String menuId) throws DataAccessException;
	/**
	 * 包括所有系统
	 * 根据角色查询该角色的功能菜单详细信息,包括授权信息(修改时调用)
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getAllFuncRoleMenuInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * 仅包括有权限的系统
	 * 根据角色查询该角色的功能菜单详细信息,包括授权信息(查询时调用)
	 * @param roleId
	 * @return MenuColl
	 * @throws DataAccessException
	 */
	public MenuColl getFuncRoleMenuInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * 得到所有系统及菜单集合(增加时用)
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getAllMenuInfo() throws DataAccessException;
	/**
	 * 根据系统Id得到该系统所有菜单信息
	 * @param systemId
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getMenuInfoBySystemId(String systemId) throws DataAccessException;
	/**
	 * 增加一条记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddMenuInfo(MenuVO vo) throws DataAccessException;
	/**
	 * 修改记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyMenuInfo(MenuVO vo) throws DataAccessException;
	/**
	 * 删除一条记录
	 * @param menuId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteMenu(String menuId) throws DataAccessException;
	/**
	 * 需要显示所有系统菜单信息
	 * @param dutyId
	 * @return MenuColl
	 * @throws DataAccessException
	 */
	public MenuColl getAllDutyPower(int dutyId) throws DataAccessException;
	/**
	 * 仅需要有权利的菜单信息
	 * @param dutyId
	 * @return MenuColl
	 * @throws DataAccessException
	 */
	public MenuColl getDutyPower(int dutyId) throws DataAccessException;
	/**
	 * 得到职务范围内的某个角色的功能菜单信息(有权利)
	 * @param RoleId
	 * @return menuColl
	 * @throws DataAccessException
	 */
	public MenuColl getMenuInfoByDutyIdRoleId(int dutyId,int roleId) throws DataAccessException;
	/**
	 * 得到职务范围内的某个角色的功能菜单信息(包括有权利的菜单和无权利的菜单)
	 * @param RoleId
	 * @return
	 */
	public MenuColl getAllMenuInfoByDutyIdRoleId(int dutyId,int roleId) throws DataAccessException; 
	/**
	 * 根据当前登录的管理员得到所选角色的菜单树
	 * @param adminEmpId
	 * @param roleId
	 * @return
	 */
	public MenuRepository getITreeNode(String adminEmpId,int roleId);

	public FuncRoleColl getMenusByRoleId(int roleId);
	
	public int modifyMenus(Iterator insertMenus,Iterator deleteMenus,int roleId);
	/**
	 * 得到某管理员可分配的菜单集合
	 * @param adminEmpId
	 * @return
	 */
	public MenuColl getAssignableMenuCollByEmpId(String adminEmpId);
	
	public MenuColl getAssignableFirstLevelMenuColl(String adminEmpId);
	
	public MenuColl getAssignableMenuCollByEmpId(String adminEmpId,String systemId);
	/**
	 * 得到某角色对应的功能菜单集合
	 * @param roleId
	 * @return
	 */
	public MenuColl getMenuCollByRoleId(int roleId);
	
	public MenuColl getFirstLevelMenuColl(int roleId);
	
	public MenuColl getMenuCollByRoleId(int roleId,String systemId);
	/**
	 * 得到某操作员可见的菜单集合
	 * @param employyId
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getUsableMenuCollByEmpId(String adminEmpId,String needButton) throws DataAccessException;
	
	public MenuColl getFirstLevelUsableMenuColl(String adminEmpId);
	
	public MenuColl getUsableMenuCollByEmpId(String adminEmpId,String nodeId,boolean ifSystemId);
	/**
	 * 菜单信息模糊查询
	 * @param menuName
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getMenuByName(String menuName) throws DataAccessException;
	/**
	 * 查询某节点是 system_id 还是 menu_id
	 * @param menuName
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getInfoByNodeId(String nodeId) throws DataAccessException;
	/**
	 * 根据标识，名称，类型查询
	 * @param menuId
	 * @param menuName
	 * @param menuType
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getMenuColl(String menuId, String menuName, String menuType,int startNum, int endNum) throws DataAccessException;
	
	public int getTotalRows(String menuId, String menuName, String menuType) throws DataAccessException;
	/**
	 * 根据标识，名称查询子系统
	 * @param sysId
	 * @param sysName
	 * @return
	 * @throws DataAccessException
	 */
	public SystemColl getSystemColl(String sysId, String sysName,int startNum, int endNum) throws DataAccessException;
	
	public int getTotalRows(String sysId, String sysName) throws DataAccessException;
	
	public MenuVO getMenuById(String menuId) throws DataAccessException;
	
	/**
	 * 得到可以作为上级菜单的菜单集合（menuType = 1）
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getParentMenuColl(String systemId) throws DataAccessException;
	/**
	 * 得到某职员所有微调过的菜单
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public List getAdjustMenuColl(String employeeId) throws DataAccessException;
	
	public MenuColl getMenuCollByRoleAndSys(int roleId, String systemId) throws DataAccessException;
	/**
	 * 得到菜单集合对应的子系统集合
	 * @param menuIds
	 * @return
	 * @throws DataAccessException
	 */
	public SystemColl getSystemCollByMenu(String menuIds) throws DataAccessException;
	
	public MenuColl getMenuCollByFirstSys(String systemId) throws DataAccessException;
	/**
	 * 得到列表中角色确定的所有可用菜单id集合,包括按钮
	 * @param roleIdList
	 * @return
	 * @throws DataAccessException
	 */
	public List getMenuIdListByRoleList(List roleIdList) throws DataAccessException;
	/**
	 * 得到微调的菜单集合
	 * adjustType = 1:增加权限  2：减少权限
	 * @param employeeId, adjustType
	 * @return
	 * @throws DataAccessException
	 */
	public List getAdjustMenuId(String employeeId, int adjustType) throws DataAccessException;
	
	/** added by pengtao 2011-05-24 For CRM6
	 * 获取操作员的某一系统的菜单信息
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public List getMenuNavigation(String systemId, String employeeId) throws DataAccessException;
	
	/** added by pengtao 2011-05-24 For CRM6
	 * 获取全部系统信息
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public List getSystemNavigation(String employeeId) throws DataAccessException;
	
	public List getMenuForSearch(String employeeId, String searchKey) throws DataAccessException;
	
}