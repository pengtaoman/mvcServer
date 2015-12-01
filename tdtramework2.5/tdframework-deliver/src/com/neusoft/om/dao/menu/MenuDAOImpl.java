package com.neusoft.om.dao.menu;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.Iterator;
import java.util.List;

import com.neusoft.common.AppContainerMaint;
import com.neusoft.common.SysMaint;
import com.neusoft.om.dao.funcrole.FuncRoleColl;
import com.neusoft.om.dao.funcrole.FuncRoleVO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.om.omutil.OMGetMenuTree;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.comp.menu.MenuRepository;

public class MenuDAOImpl extends BaseDaoImpl implements MenuDAO {

	public MenuVO getMenuByMenuId(String menuId) throws DataAccessException {
		MenuVO vo = new MenuVO();
		StringBuffer buf = new StringBuffer();
		buf.append("select * from om_menu_t where f_menu_id = ? ");
		buf.append(" and f_if_my_work = 0 and f_inuse = 1");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, menuId);
			rest = pstmt.executeQuery();
			if (rest.next()) {
				vo = new MenuVO();
				vo.setAttribute(rest);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuByMenuId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuByMenuId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return vo;
	}

	public String getIfshowfav(String systemId)throws DataAccessException{
		String if_show_fav = "0";
		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT f_if_show_favorite");
		buf.append(" FROM om_system_t");
		buf.append(" WHERE f_system_id = ?");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, systemId);
			rest = pstmt.executeQuery();
            
			if (rest.next()) {
				if_show_fav=rest.getString("f_if_show_favorite");
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getIfshowfav-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getIfshowfav-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return if_show_fav;
	}

	public MenuColl getMenuInfoByEmployeeId(String employeeId, String systemId)
			throws DataAccessException {
		MenuColl coll = new MenuColl();
		MenuVO vo = null;
		StringBuffer buf = new StringBuffer("");
		
		buf.append(" SELECT * FROM( SELECT n.* FROM( SELECT f_menu_id FROM om_func_role_t a,om_employee_role_relation_t b ");
		buf.append(" WHERE b.f_employee_id = ? AND a.f_role_id = b.f_role_id AND b.F_USABLE_FLAG = 1 GROUP BY f_menu_id) e,");
		buf.append(" om_menu_t n,om_system_t m WHERE e.f_menu_id = n.f_menu_id AND m.f_system_id = n.f_system_id ");
		buf.append(" AND n.f_system_id = ? AND n.f_if_my_work = 0 AND n.F_INUSE = 1 AND n.f_menu_type <> 0 ");
		buf.append(" AND n.f_menu_type < 10 UNION SELECT p.* FROM om_menu_t p, om_power_adjust_t q, om_system_t z ");
		buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ? AND q.f_admin_adjust=1 ");
		buf.append(" AND q.f_exec_adjust=1 AND p.F_MENU_TYPE <>0 AND p.f_menu_type < 10 and p.f_system_id = z.f_system_id ");
		buf.append(" and z.f_system_id = ? and p.f_inuse = 1 MINUS SELECT u.* FROM om_menu_t u, om_power_adjust_t v, om_system_t w ");
		buf.append(" WHERE u.f_menu_id = v.f_menu_id AND v.f_employee_id = ? AND v.f_admin_adjust = 2 ");
		buf.append(" AND v.f_exec_adjust=2 AND u.F_MENU_TYPE <>0 AND u.F_MENU_TYPE < 10 ");
		buf.append(" and u.f_system_id = w.f_system_id and w.f_system_id= ? ) ORDER BY f_order");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, systemId);
			pstmt.setString(3, employeeId);
			pstmt.setString(4, systemId);
			pstmt.setString(5, employeeId);
			pstmt.setString(6, systemId);
			rest = pstmt.executeQuery();
			
			HashMap map = getContainerMap(conn);
			
			vo = new MenuVO();
			vo.setMenuId(systemId);
			vo.setMenuName("ϵͳ");
			vo.setLayer(0);
			vo.setSystemId(systemId);
			
			//vo.setF_if_show_favorite();
			coll.addMenu(vo);
            
			while (rest.next()) {
				vo = new MenuVO();
				vo.setMenuId(nvl(rest.getString("f_menu_id")));
				vo.setMenuName(nvl(rest.getString("f_menu_name")));
				vo.setSystemId(nvl(rest.getString("f_system_Id")));
				vo.setModuleId(nvl(rest.getString("f_module_id")));
				vo.setMenuType(rest.getInt("f_menu_type"));
				vo.setOpenMethod(rest.getInt("f_open_method"));
				String pageLink = nvl(rest.getString("f_page_link"));
				String otherContainer = String.valueOf(rest.getInt("f_container"));				
				//String factLink = getFactLink(pageLink, rest);
				String factLink = getNewFactLink(otherContainer,map,pageLink);
				if(factLink != null && !factLink.trim().equals("")){
					pageLink = factLink;
				}
				vo.setPageLink(pageLink);
				vo.setLayer(rest.getInt("f_layer"));
				vo.setLog(rest.getInt("f_log"));
				vo.setOrder(rest.getInt("f_order"));
				vo.setIfMyWork(rest.getInt("f_if_my_work"));
				vo.setParentMenuId(rest.getString("f_parent_menu_id"));
				vo.setInuse(rest.getInt("f_inuse"));
				vo.setMenuDesc(rest.getString("f_menu_desc"));
				vo.setContainer(rest.getInt("f_container"));
				coll.addMenu(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuInfoByEmployeeId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuInfoByEmployeeId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
		return setIfChild(coll);
	}

	public boolean getEmployeePowerInfo(String employeeId, String menuId)
			throws DataAccessException {

		boolean ifHavePower = false;

		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT f_menu_id ");
		buf.append(" FROM om_func_role_t a,om_employee_role_relation_t b ");
		buf.append(" WHERE b.f_employee_id = ? ");
		buf.append(" AND a.f_menu_id = ? ");
		buf.append(" AND a.f_role_id = b.f_role_id ");		
		
		buf.append(" UNION SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
		buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ?");
		buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");		
		buf.append(" AND p.f_menu_id = ? ");

		buf.append(" MINUS SELECT u.f_menu_id ");
		buf.append(" FROM om_menu_t u, om_power_adjust_t v");
		buf.append(" WHERE u.f_menu_id = v.f_menu_id AND v.f_employee_id = ?");
		buf.append(" AND v.f_admin_adjust = 2 AND v.f_exec_adjust=2");
		buf.append(" AND u.f_menu_id = ? ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, menuId);
			pstmt.setString(3, employeeId);
			pstmt.setString(4, menuId);
			pstmt.setString(5, employeeId);
			pstmt.setString(6, menuId);
			rest = pstmt.executeQuery();
			if (rest.next()) {
				ifHavePower = true;
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getEmployeePowerInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getEmployeePowerInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return ifHavePower;
	}

	public MenuColl getAllMenuInfo() throws DataAccessException {
		//String sql = "SELECT * FROM om_menu_t where f_system_id in (15) and f_inuse = 1 ORDER BY f_system_id,f_order";
		String sql = "SELECT * FROM om_menu_t where f_inuse = 1 ORDER BY f_system_id,f_order";

		MenuVO vo = null;
		MenuColl coll = new MenuColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				vo = new MenuVO();
				vo.setAttribute(rest);
//				currentSystemId = vo.getSystemId();
//				if (currentSystemId.intern() != systemId.intern()) {
//					sysMenuVO = new MenuVO();
//					sysMenuVO.setMenuId(currentSystemId);
//					sysMenuVO.setSystemId(currentSystemId);
//					sysMenuVO.setMenuName("ϵͳ");
//					sysMenuVO.setLayer(0);
//					coll.addMenu(sysMenuVO);
//				}
//				systemId = currentSystemId;
				coll.addMenu(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getAllMenuInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getAllMenuInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return setIfChild(coll);
	}

	public MenuColl getAllFuncRoleMenuInfoByRoleId(int roleId)
			throws DataAccessException {
		StringBuffer buf = new StringBuffer();
		buf
				.append("SELECT a.*,NVL(b.f_admin_status,0) f_admin_status,NVL(b.f_exec_status,0) f_exec_status");
		buf
				.append(" FROM om_menu_t a,(SELECT * FROM om_func_role_t WHERE f_role_id = ?) b");
		buf.append(" WHERE a.f_menu_id = b.f_menu_id(+)");
		buf.append(" ORDER BY f_system_id,f_order");

		MenuVO vo = null;
		MenuVO sysMenuVO = null;
		MenuColl coll = new MenuColl();
		String systemId = "-1";
		String currentSystemId;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				vo = new MenuVO();
				vo.setAttribute(rest);
				if (rest.getInt("f_admin_status") == 0) {
					vo.setIfSelectAdmin(false);
					vo.setAdminStatus(0);
				} else {
					vo.setIfSelectAdmin(true);
					vo.setAdminStatus(1);
				}
				if (rest.getInt("f_exec_status") == 0) {
					vo.setIfSelectExec(false);
					vo.setExecStatus(0);
				} else {
					vo.setIfSelectExec(true);
					vo.setExecStatus(1);
				}
				currentSystemId = vo.getSystemId();
				if (currentSystemId.intern() != systemId.intern()) {
					sysMenuVO = new MenuVO();
					sysMenuVO.setMenuId(currentSystemId);
					sysMenuVO.setSystemId(currentSystemId);
					sysMenuVO.setAdminStatus(0);
					sysMenuVO.setExecStatus(0);
					sysMenuVO.setMenuName("ϵͳ");
					sysMenuVO.setLayer(0);
					coll.addMenu(sysMenuVO);
				}
				systemId = currentSystemId;
				coll.addMenu(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getAllFuncRoleMenuInfoByRoleId-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getAllFuncRoleMenuInfoByRoleId-2:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return setIfChild(coll);
	}

	public MenuColl getFuncRoleMenuInfoByRoleId(int roleId)
			throws DataAccessException {
		StringBuffer buf = new StringBuffer();
		buf.append("SELECT a.*,NVL(b.f_admin_status,0) f_admin_status,NVL(b.f_exec_status,0) f_exec_status");
		buf.append(" FROM om_menu_t a,(SELECT * FROM om_func_role_t WHERE f_role_id = ?) b");
		buf.append(" WHERE a.f_menu_id = b.f_menu_id");
		buf.append(" ORDER BY f_system_id,f_order");

		MenuVO vo = null;
		MenuVO sysMenuVO = null;
		MenuColl coll = new MenuColl();
		String systemId = "-1";
		String currentSystemId;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				vo = new MenuVO();
				vo.setAttribute(rest);
				if (rest.getInt("f_admin_status") == 0) {
					vo.setIfSelectAdmin(false);
				} else {
					vo.setIfSelectAdmin(true);
				}
				if (rest.getInt("f_exec_status") == 0) {
					vo.setIfSelectExec(false);
				} else {
					vo.setIfSelectExec(true);
				}
				currentSystemId = vo.getSystemId();
				if (currentSystemId.intern() != systemId.intern()) {
					sysMenuVO = new MenuVO();
					sysMenuVO.setMenuId(currentSystemId);
					sysMenuVO.setMenuName("ϵͳ");
					sysMenuVO.setExecStatus(0);
					sysMenuVO.setAdminStatus(0);
					sysMenuVO.setLayer(0);
					coll.addMenu(sysMenuVO);
				}
				systemId = currentSystemId;
				coll.addMenu(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFuncRoleMenuInfoByRoleId-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFuncRoleMenuInfoByRoleId-2:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return setIfChild(coll);
	}

	/*
	 */
	public MenuColl getMenuInfoBySystemId(String systemId)
			throws DataAccessException {
		MenuColl coll = new MenuColl();
		MenuVO vo = null;
		StringBuffer buf = new StringBuffer("");
		
		buf.append(" SELECT * FROM om_menu_t ");
		buf.append(" WHERE f_system_id = ? AND f_if_my_work = 0 AND F_INUSE = 1 AND f_menu_type <> 0 ");
		buf.append(" AND f_menu_type < 10 ORDER BY f_order");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, systemId);
			rest = pstmt.executeQuery();
     
			while (rest.next()) {
				vo = new MenuVO();
				vo.setMenuId(nvl(rest.getString("f_menu_id")));
				vo.setMenuName(nvl(rest.getString("f_menu_name")));
				vo.setSystemId(nvl(rest.getString("f_system_Id")));
				vo.setModuleId(nvl(rest.getString("f_module_id")));
				vo.setMenuType(rest.getInt("f_menu_type"));
				vo.setOpenMethod(rest.getInt("f_open_method"));
				vo.setLayer(rest.getInt("f_layer"));
				vo.setLog(rest.getInt("f_log"));
				vo.setOrder(rest.getInt("f_order"));
				vo.setIfMyWork(rest.getInt("f_if_my_work"));
				vo.setParentMenuId(rest.getString("f_parent_menu_id"));
				vo.setInuse(rest.getInt("f_inuse"));
				vo.setMenuDesc(rest.getString("f_menu_desc"));
				vo.setContainer(rest.getInt("f_container"));
				coll.addMenu(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuInfoBySystemId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuInfoBySystemId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
		return setIfChild(coll);
	}

	/*
	 * 
	 */
	public int doAddMenuInfo(MenuVO vo) throws DataAccessException {
		int code = 1;
		StringBuffer insert_buf = new StringBuffer();
		insert_buf.append("insert into om_menu_t ");
		insert_buf.append(" (f_menu_id,f_menu_name,f_system_id,f_menu_type,f_open_method,f_page_link, ");
		insert_buf.append(" f_log, f_if_my_work,f_parent_menu_id, f_inuse, f_menu_desc, f_container, " +
						"f_disabled_date,F_MODULE_ID,f_layer,f_operator,f_operate_date)");
		insert_buf.append(" values(?,?,?,?,?,?,?,?,?,?,?,?,TO_DATE(?,'yyyy-mm-dd'),0,?,?,sysdate)");
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(insert_buf.toString());
			pstmt.setString(1, vo.getMenuId());
			pstmt.setString(2, vo.getMenuName());
			pstmt.setString(3, vo.getSystemId());
			pstmt.setInt(4, vo.getMenuType());
			pstmt.setInt(5, vo.getOpenMethod());
			pstmt.setString(6, vo.getPageLink());
			pstmt.setInt(7, vo.getLog());
			pstmt.setInt(8, 0);
			pstmt.setString(9, vo.getParentMenuId());
			pstmt.setInt(10, vo.getInuse());
			pstmt.setString(11, vo.getMenuDesc());
			pstmt.setInt(12, vo.getContainer());
			pstmt.setString(13, vo.getDisabledDate());
			pstmt.setInt(14,vo.getLayer());
			pstmt.setString(15, vo.getOperator());
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--doAddMenuInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--doAddMenuInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(pstmt, conn);
		}
		return code;
	}

	/*
	 * 
	 */
	public int doModifyMenuInfo(MenuVO vo) throws DataAccessException {
		int code = 1;
		StringBuffer insert_buf = new StringBuffer();
		insert_buf.append("update om_menu_t ");
		insert_buf.append(" set f_menu_name=?,f_system_id=?,f_menu_type=?,f_open_method=?," +
				"f_page_link = ?, f_log=?, f_parent_menu_id=?, f_inuse=?, f_menu_desc=?, f_container=?," +
				" f_disabled_date = TO_DATE(?,'yyyy-mm-dd') , f_operator=? , f_operate_date = sysdate where f_menu_id = ?");
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(insert_buf.toString());
			pstmt.setString(1, vo.getMenuId());
			pstmt.setString(1, vo.getMenuName());
			pstmt.setString(2, vo.getSystemId());
			pstmt.setInt(3, vo.getMenuType());
			pstmt.setInt(4, vo.getOpenMethod());
			pstmt.setString(5, vo.getPageLink());
			pstmt.setInt(6, vo.getLog());
			pstmt.setString(7, vo.getParentMenuId());
			pstmt.setInt(8, vo.getInuse());
			pstmt.setString(9, vo.getMenuDesc());
			pstmt.setInt(10, vo.getContainer());
			pstmt.setString(11, vo.getDisabledDate());
			pstmt.setString(12, vo.getOperator());
			pstmt.setString(13, vo.getMenuId());
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--doModifyMenuInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--doModifyMenuInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(pstmt, conn);
		}
		return code;
	}

	/*
	 * 
	 */
	public int doDeleteMenu(String menuId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_menu_t where f_menu_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,menuId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuDAOImpl--doDeleteMenuInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuDAOImpl--doDeleteMenuInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return code;
	}

	private static MenuColl setIfChild(MenuColl menuColl) {
		MenuColl menuTempColl = new MenuColl();
		for (int i = 0; i < menuColl.getRowCount(); i++) {

			MenuVO vo = menuColl.getMenu(i);

			if (i == menuColl.getRowCount() - 1) {
				vo.setIfChild(false);
			} else {
				if (vo.getLayer() < (menuColl.getMenu(i + 1)).getLayer()) {
					vo.setIfChild(true);
				} else {
					vo.setIfChild(false);
				}
			}
			menuTempColl.addMenu(vo);
		}

		return menuTempColl;
	}

	public MenuColl getAllDutyPower(int dutyId) throws DataAccessException {
		StringBuffer buf = new StringBuffer();
		buf
				.append("SELECT a.*,NVL(b.f_admin_status,0) f_admin_status,NVL(b.f_exec_status,0) f_exec_status");
		buf
				.append(" FROM om_menu_t a,(SELECT * FROM om_duty_power_t WHERE f_duty_id = ?) b");
		buf.append(" WHERE a.f_menu_id = b.f_menu_id(+)");
		buf.append(" ORDER BY f_system_id,f_order");

		MenuVO vo = null;
		MenuVO sysMenuVO = null;
		MenuColl coll = new MenuColl();
		String systemId = "-1";
		String currentSystemId;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, dutyId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				vo = new MenuVO();
				vo.setAttribute(rest);
				if (rest.getInt("f_admin_status") == 0) {
					vo.setIfSelectAdmin(false);
					vo.setAdminStatus(0);
				} else {
					vo.setIfSelectAdmin(true);
					vo.setAdminStatus(1);
				}
				if (rest.getInt("f_exec_status") == 0) {
					vo.setIfSelectExec(false);
					vo.setExecStatus(0);
				} else {
					vo.setIfSelectExec(true);
					vo.setExecStatus(1);
				}
				currentSystemId = vo.getSystemId();
				if (currentSystemId.intern() != systemId.intern()) {
					sysMenuVO = new MenuVO();
					sysMenuVO.setMenuId(currentSystemId);
					sysMenuVO.setSystemId(currentSystemId);
					sysMenuVO.setAdminStatus(0);
					sysMenuVO.setExecStatus(0);
					sysMenuVO.setMenuName("ϵͳ");
					sysMenuVO.setLayer(0);
					coll.addMenu(sysMenuVO);
				}
				systemId = currentSystemId;
				coll.addMenu(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getAllFuncRoleMenuInfoByRoleId-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getAllFuncRoleMenuInfoByRoleId-2:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return setIfChild(coll);
	}

	public MenuColl getDutyPower(int dutyId) throws DataAccessException {
		StringBuffer buf = new StringBuffer();
		buf
				.append("SELECT a.*,NVL(b.f_admin_status,0) f_admin_status,NVL(b.f_exec_status,0) f_exec_status");
		buf
				.append(" FROM om_menu_t a,(SELECT * FROM om_dutyPower_t WHERE f_role_id = ?) b");
		buf.append(" WHERE a.f_menu_id = b.f_menu_id");
		buf.append(" ORDER BY f_system_id,f_order");

		MenuVO vo = null;
		MenuVO sysMenuVO = null;
		MenuColl coll = new MenuColl();
		String systemId = "-1";
		String currentSystemId;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, dutyId);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				vo = new MenuVO();
				vo.setAttribute(rest);
				if (rest.getInt("f_admin_status") == 0) {
					vo.setIfSelectAdmin(false);
				} else {
					vo.setIfSelectAdmin(true);
				}
				if (rest.getInt("f_exec_status") == 0) {
					vo.setIfSelectExec(false);
				} else {
					vo.setIfSelectExec(true);
				}
				currentSystemId = vo.getSystemId();
				if (currentSystemId.intern() != systemId.intern()) {
					sysMenuVO = new MenuVO();
					sysMenuVO.setMenuId(currentSystemId);
					sysMenuVO.setMenuName("ϵͳ");
					sysMenuVO.setExecStatus(0);
					sysMenuVO.setAdminStatus(0);
					sysMenuVO.setLayer(0);
					coll.addMenu(sysMenuVO);
				}
				systemId = currentSystemId;
				coll.addMenu(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFuncRoleMenuInfoByRoleId-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFuncRoleMenuInfoByRoleId-2:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return setIfChild(coll);
	}

	public MenuColl getMenuInfoByDutyIdRoleId(int dutyId, int roleId)
			throws DataAccessException {
		StringBuffer buf = new StringBuffer("");
		buf
				.append("SELECT a.f_duty_id,a.f_menu_id,NVL(b.f_admin_status,0) f_admin_status,NVL(b.f_exec_status,0) f_exec_status,c.*");
		buf
				.append(" FROM om_duty_power_t a,(SELECT * FROM om_func_role_t WHERE f_role_id = ?)b,om_menu_t c");
		buf.append(" WHERE a.f_duty_id = ? ");
		buf.append(" AND a.f_menu_id = b.f_menu_id");
		buf.append(" AND a.f_menu_id = c.f_menu_id");
		MenuVO vo = null;
		MenuVO sysMenuVO = null;
		MenuColl coll = new MenuColl();
		String systemId = "-1";
		String currentSystemId;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			pstmt.setInt(2, dutyId);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				vo = new MenuVO();
				vo.setAttribute(rest);
				if (rest.getInt("f_admin_status") == 0) {
					vo.setIfSelectAdmin(false);
				} else {
					vo.setIfSelectAdmin(true);
				}
				if (rest.getInt("f_exec_status") == 0) {
					vo.setIfSelectExec(false);
				} else {
					vo.setIfSelectExec(true);
				}
				currentSystemId = vo.getSystemId();
				if (currentSystemId.intern() != systemId.intern()) {
					sysMenuVO = new MenuVO();
					sysMenuVO.setMenuId(currentSystemId);
					sysMenuVO.setMenuName("ϵͳ");
					sysMenuVO.setExecStatus(0);
					sysMenuVO.setAdminStatus(0);
					sysMenuVO.setLayer(0);
					coll.addMenu(sysMenuVO);
				}
				systemId = currentSystemId;
				coll.addMenu(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFuncRoleMenuInfoByRoleId-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFuncRoleMenuInfoByRoleId-2:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return setIfChild(coll);
	}

	public MenuColl getAllMenuInfoByDutyIdRoleId(int dutyId, int roleId)
			throws DataAccessException {
		StringBuffer buf = new StringBuffer("");
		buf
				.append("SELECT a.f_duty_id,a.f_menu_id,NVL(b.f_admin_status,0) f_admin_status,NVL(b.f_exec_status,0) f_exec_status,c.*");
		buf
				.append(" FROM om_duty_power_t a,(SELECT * FROM om_func_role_t WHERE f_role_id = ?)b,om_menu_t c");
		buf.append(" WHERE a.f_duty_id = ? ");
		buf.append(" AND a.f_menu_id = b.f_menu_id(+)");
		buf.append(" AND a.f_menu_id = c.f_menu_id");
		buf.append(" order by c.f_system_id,c.f_menu_id");
		MenuVO vo = null;
		MenuVO sysMenuVO = null;
		MenuColl coll = new MenuColl();
		String systemId = "-1";
		String currentSystemId;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			pstmt.setInt(2, dutyId);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				vo = new MenuVO();
				vo.setAttribute(rest);
				if (rest.getInt("f_admin_status") == 0) {
					vo.setIfSelectAdmin(false);
				} else {
					vo.setIfSelectAdmin(true);
				}
				if (rest.getInt("f_exec_status") == 0) {
					vo.setIfSelectExec(false);
				} else {
					vo.setIfSelectExec(true);
				}
				// ����ϵͳ��Ϣ
				currentSystemId = vo.getSystemId();
				if (currentSystemId.intern() != systemId.intern()) {
					sysMenuVO = new MenuVO();
					sysMenuVO.setMenuId(currentSystemId);
					sysMenuVO.setMenuName("ϵͳ");
					sysMenuVO.setExecStatus(0);
					sysMenuVO.setAdminStatus(0);
					sysMenuVO.setLayer(0);
					coll.addMenu(sysMenuVO);
				}
				systemId = currentSystemId;
				coll.addMenu(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFuncRoleMenuInfoByRoleId-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFuncRoleMenuInfoByRoleId-2:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return setIfChild(coll);
	}
	
	public FuncRoleColl getMenusByRoleId(int roleId){
		FuncRoleColl funcRoleColl = null;
		StringBuffer buf = new StringBuffer("");
		buf.append(" select f_role_id , f_menu_id from OM_FUNC_ROLE_T ");
		buf.append(" where f_role_id = ? ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			rest = pstmt.executeQuery();
			funcRoleColl = new FuncRoleColl();
			
			while(rest.next()){
				FuncRoleVO vo = new FuncRoleVO();
				vo.setRoleId(rest.getInt("f_role_id"));
				vo.setMenuId(rest.getString("f_menu_id"));
				
				funcRoleColl.addFuncRole(vo);
			}
		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getITreeNode-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getITreeNode-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		
		return funcRoleColl;
	}

	public MenuRepository getITreeNode(String adminEmpId, int roleId) {
		StringBuffer buf = new StringBuffer("");
		buf
				.append(" select a.f_employee_id ,b.f_role_id ,c.f_menu_id,c.f_menu_name,c.f_layer,c.f_menu_desc,c.f_parent_menu_id ");
		buf
				.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c ");
		buf
				.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
		StringBuffer buf_role = new StringBuffer("");
		buf_role.append(" select f_role_id , f_menu_id from OM_FUNC_ROLE_T ");
		buf_role.append(" where f_role_id = ? ");

		MenuRepository mr = new MenuRepository();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		ResultSet rest_role = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, adminEmpId);
			rest = pstmt.executeQuery();
			if (roleId != -1) {
				pstmt = conn.prepareStatement(buf_role.toString());
				pstmt.setInt(1, roleId);
				rest_role = pstmt.executeQuery();
			}

			OMGetMenuTree omtree = new OMGetMenuTree(rest_role, rest);
			omtree.setRepository(mr);
			omtree.load();
			mr = omtree.getRepository();
			rest_role.close();

		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getITreeNode-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getITreeNode-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		return mr;

	}

	public int modifyMenus(Iterator insertMenus, Iterator deleteMenus,
			int roleId) {
		int code = 1;
		StringBuffer insert_buf = new StringBuffer();
		insert_buf.append("insert into om_func_role_t ");
		insert_buf
				.append(" (f_role_id,f_menu_id,f_admin_status,f_exec_status ) ");
		insert_buf.append(" values(?,?,?,?)");

		StringBuffer del_buf = new StringBuffer();
		del_buf
				.append(" delete om_func_role_t where f_role_id = ? and f_menu_id = ? ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(del_buf.toString());

			while (deleteMenus.hasNext()) {
				pstmt.setInt(1, roleId);
				pstmt.setString(2, (String) deleteMenus.next());
				pstmt.addBatch();
			}
			int[] delResultCodes = pstmt.executeBatch();
			for (int i = 0; i < delResultCodes.length; i++) {
				if (delResultCodes[i] == 0) {
					code = 0;
					break;
				}
			}
			close(pstmt);
			pstmt = conn.prepareStatement(insert_buf.toString());
			while (insertMenus.hasNext()) {
				pstmt.setInt(1, roleId);
				pstmt.setString(2, (String) insertMenus.next());
				pstmt.setInt(3, 1);
				pstmt.setInt(4, 1);
				pstmt.addBatch();
			}
			int[] insResultCodes = pstmt.executeBatch();
			for (int i = 0; i < insResultCodes.length; i++) {
				if (insResultCodes[i] == 0) {
					code = 0;
					break;
				}
			}
			

		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--modifyMenus-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--modifyMenus-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(pstmt, conn);
		}
		return code;
	}
	
	private String getFactLink(String pageLink,ResultSet rest){
        String factLink = "";
		try {
			String otherContainer = String.valueOf(rest.getInt("f_container"));
	        String link = AppContainerMaint.getContainerParams(otherContainer);
	        String configLink = rest.getString("f_page_link");
	        if(configLink == null){
	            configLink = "";
	        }
	        if(link.endsWith("/")  && configLink!= null && configLink.startsWith("/")){
	            factLink = link.substring(0,link.length()-1)+configLink;
	        }else{
	            factLink = link+configLink;                    
	        }
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFactLink:" + e.getMessage());
		}
        return SysMaint.prepareXml(factLink);
	}
	/**
	 * @param adminEmpId
	 * @return
	 */
	public MenuColl getAssignableMenuCollByEmpId(String adminEmpId) {
		MenuColl menusColl = null;

		StringBuffer buf = new StringBuffer("");
	
		buf.append(" SELECT distinct c.* ");
		buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c ");
		buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
		buf.append(" and a.f_admin_flag = 1 and c.f_inuse = 1");
		buf.append(" order by c.f_order");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, adminEmpId);
			rest = pstmt.executeQuery();
			menusColl = new MenuColl();
			
			while (rest.next()) {
				MenuVO vo = new MenuVO();
				vo.setMenuId(rest.getString("f_menu_id"));
				vo.setMenuDesc(NullProcessUtil.nvlToString(rest.getString("f_menu_desc"),""));
				vo.setMenuName(rest.getString("f_menu_name"));
				vo.setSystemId(rest.getString("f_system_id"));
				vo.setLayer(rest.getInt("f_layer"));
				vo.setParentMenuId(NullProcessUtil.nvlToString(rest.getString("f_parent_menu_id"),""));
				
				menusColl.addElement(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		return menusColl;
	}
	
	public MenuColl getAssignableFirstLevelMenuColl(String adminEmpId) {
		MenuColl menusColl = null;

		StringBuffer buf = new StringBuffer("");	
		buf.append(" select distinct a.* from om_menu_t a,om_func_role_t c,om_employee_role_relation_t d, ");
		buf.append(" (select * from om_system_t where (f_parent_system_id is null or f_parent_system_id = ' ') ");
		buf.append(" and f_system_id not in (select distinct f_parent_system_id from om_system_t where f_parent_system_id is not null)) b ");
		buf.append(" where a.f_system_id = b.f_system_id ");
		buf.append(" and (a.f_parent_menu_id is null or f_parent_menu_id = ' ') ");
		buf.append(" and a.f_menu_id = c.f_menu_id AND a.f_inuse = 1 and d.f_admin_flag = 1 ");
		buf.append(" and d.f_employee_id = ? and d.f_role_id = c.f_role_id");
		buf.append(" order by a.f_menu_id,a.f_order");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, adminEmpId);
			rest = pstmt.executeQuery();
			menusColl = new MenuColl();
			
			while (rest.next()) {
				MenuVO vo = new MenuVO();
				vo.setMenuId(rest.getString("f_menu_id"));
				vo.setMenuDesc(NullProcessUtil.nvlToString(rest.getString("f_menu_desc"),""));
				vo.setMenuName(rest.getString("f_menu_name"));
				vo.setSystemId(rest.getString("f_system_id"));
				vo.setLayer(rest.getInt("f_layer"));
				vo.setParentMenuId(NullProcessUtil.nvlToString(rest.getString("f_parent_menu_id"),""));
				
				menusColl.addElement(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		return menusColl;
	}
	
	public MenuColl getAssignableMenuCollByEmpId(String adminEmpId,String nodeId) {
		MenuColl menusColl = null;

		StringBuffer buf = new StringBuffer("");
	
//		buf.append(" select distinct a.f_employee_id ,c.f_menu_id ");
		buf.append(" select * from (");
		buf.append(" SELECT distinct c.* ");
		buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c ");
		buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
		buf.append(" and a.f_admin_flag = 1 and c.f_inuse = 1 and c.f_system_id = ?");
		buf.append(" union ");
		buf.append(" SELECT distinct c.* ");
		buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c ");
		buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
		buf.append(" and a.f_admin_flag = 1 and c.f_inuse = 1 and (c.f_menu_id = ? or c.f_parent_menu_id like '").append(nodeId).append("%')");
		buf.append(" union ");
		buf.append(" SELECT distinct c.* ");
		buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c, om_system_t d ");
		buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
		buf.append(" and a.f_admin_flag = 1 and c.f_inuse = 1 and c.F_SYSTEM_ID = d.f_system_id ");
		buf.append(" and d.f_parent_system_id = ? ");
		//buf.append(" )order by f_order");
		buf.append(") start with f_parent_menu_id is null CONNECT BY PRIOR f_menu_id = f_parent_menu_id ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, adminEmpId);
			pstmt.setString(2, nodeId);
			pstmt.setString(3, adminEmpId);
			pstmt.setString(4, nodeId);
			pstmt.setString(5, adminEmpId);
			pstmt.setString(6, nodeId);
			rest = pstmt.executeQuery();
			menusColl = new MenuColl();
			
			while (rest.next()) {
				MenuVO vo = new MenuVO();
				vo.setMenuId(rest.getString("f_menu_id"));
				vo.setMenuDesc(NullProcessUtil.nvlToString(rest.getString("f_menu_desc"),""));
				vo.setMenuName(rest.getString("f_menu_name"));
				vo.setSystemId(rest.getString("f_system_id"));
				vo.setLayer(rest.getInt("f_layer"));
				vo.setParentMenuId(NullProcessUtil.nvlToString(rest.getString("f_parent_menu_id"),""));
				
				menusColl.addElement(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		return menusColl;
	}
	/**
	 * @param adminEmpId
	 * @return
	 */
	public MenuColl getUsableMenuCollByEmpId(String adminEmpId,String needButton) {
		MenuColl menusColl = null;

		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT * FROM ( ");
		
//		buf.append(" select distinct a.f_employee_id ,c.f_menu_id ");
//		buf.append(" ,c.f_menu_name,c.f_layer,c.f_menu_desc,c.f_parent_menu_id,c.f_system_id");
		buf.append(" SELECT distinct c.* ");
		buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c ");
		buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
		buf.append(" and a.f_usable_flag = 1");
		if(!needButton.equals("true")){
			buf.append(" AND c.f_menu_type <> 0");
		}
		
		buf.append(" UNION SELECT p.* FROM om_menu_t p, om_power_adjust_t q ");
		buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ?");
		buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");		
		
		buf.append(" MINUS SELECT u.* ");
		buf.append(" FROM om_menu_t u, om_power_adjust_t v");
		buf.append(" WHERE u.f_menu_id = v.f_menu_id AND v.f_employee_id = ?");
		buf.append(" AND v.f_admin_adjust = 2 AND v.f_exec_adjust=2");

		buf.append(" ) order by f_order");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, adminEmpId);
			pstmt.setString(2, adminEmpId);
			pstmt.setString(3, adminEmpId);
			rest = pstmt.executeQuery();
			menusColl = new MenuColl();
			
			while (rest.next()) {
				MenuVO vo = new MenuVO();
				vo.setAttribute(rest);				
				menusColl.addElement(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return menusColl;
	}
	
	public MenuColl getFirstLevelUsableMenuColl(String adminEmpId) {
		MenuColl menusColl = null;

		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT * FROM ( ");
		
		buf.append(" SELECT distinct c.* ");
		buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c ,");
		buf.append(" 	(select * from om_system_t where (f_parent_system_id is null or f_parent_system_id = ' ') ");
		buf.append(" 		and f_system_id not in (select distinct f_parent_system_id from om_system_t where f_parent_system_id is not null)) d ");
		buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
		buf.append(" and c.f_system_id = d.f_system_id");
		buf.append(" and a.f_usable_flag = 1");
		
		buf.append(" UNION SELECT p.* FROM om_menu_t p, om_power_adjust_t q ");
		buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ?");
		buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");		
		
		buf.append(" MINUS SELECT u.* ");
		buf.append(" FROM om_menu_t u, om_power_adjust_t v");
		buf.append(" WHERE u.f_menu_id = v.f_menu_id AND v.f_employee_id = ?");
		buf.append(" AND v.f_admin_adjust = 2 AND v.f_exec_adjust=2");

		buf.append(" ) order by f_order");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, adminEmpId);
			pstmt.setString(2, adminEmpId);
			pstmt.setString(3, adminEmpId);
			rest = pstmt.executeQuery();
			menusColl = new MenuColl();
			
			while (rest.next()) {
				MenuVO vo = new MenuVO();
				vo.setAttribute(rest);				
				menusColl.addElement(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return menusColl;
	}
	
	public MenuColl getUsableMenuCollByEmpId(String adminEmpId,String nodeId,boolean ifSystemId) {
		MenuColl menusColl = null;

		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT * FROM ( ");
		
		buf.append(" SELECT distinct c.* ");
		buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c ");
		buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
		if(ifSystemId){
			buf.append(" and c.f_system_id = ? ");
		}else{
			buf.append(" and (c.f_menu_id = ? or c.f_parent_menu_id like ? ");
		}
		buf.append(" and a.f_usable_flag = 1");
		
		buf.append(" UNION SELECT p.* FROM om_menu_t p, om_power_adjust_t q ");
		buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ?");
		buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");	
		if(ifSystemId){
			buf.append(" and p.f_system_id = ? ");
		}else{
			buf.append(" and (p.f_menu_id = ? or p.f_parent_menu_id like ?");
		}
		
		buf.append(" MINUS SELECT u.* ");
		buf.append(" FROM om_menu_t u, om_power_adjust_t v");
		buf.append(" WHERE u.f_menu_id = v.f_menu_id AND v.f_employee_id = ?");
		buf.append(" AND v.f_admin_adjust = 2 AND v.f_exec_adjust=2");
		if(ifSystemId){
			buf.append(" and u.f_system_id = ? ");
		}else{
			buf.append(" and (u.f_menu_id = ? or u.f_parent_menu_id like ?");
		}
		buf.append(" ) order by f_menu_id,f_order");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, adminEmpId);
			if(ifSystemId){
				pstmt.setString(2, nodeId);				
				pstmt.setString(3, adminEmpId);
				pstmt.setString(4, nodeId);	
				pstmt.setString(5, adminEmpId);
				pstmt.setString(6, nodeId);					
			}else{
				pstmt.setString(2, nodeId);
				pstmt.setString(3, nodeId + "%");
				pstmt.setString(4, adminEmpId);	
				pstmt.setString(5, nodeId);
				pstmt.setString(6, nodeId + "%");
				pstmt.setString(7, adminEmpId);
				pstmt.setString(8, nodeId);
				pstmt.setString(9, nodeId + "%");
			}
			rest = pstmt.executeQuery();
			menusColl = new MenuColl();
			
			while (rest.next()) {
				MenuVO vo = new MenuVO();
				vo.setAttribute(rest);				
				menusColl.addElement(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		return menusColl;
	}
	/**
	 * �õ�ĳ��ɫ��Ӧ�Ĺ��ܲ˵�����
	 * @param roleId
	 * @return
	 */
	public MenuColl getMenuCollByRoleId(int roleId){
		MenuColl menuColl = new MenuColl();
		StringBuffer buf = new StringBuffer("");
		buf.append(" select distinct a.* from om_menu_t a, om_func_role_t b ");
		buf.append(" where a.f_menu_id = b.f_menu_id AND b.f_role_id = ? ");
		buf.append(" AND a.f_inuse = 1 ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				MenuVO  vo = new MenuVO();
				vo.setAttribute(rest);
				menuColl.addMenu(vo);
			}
		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuCollByRoleId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuCollByRoleId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		
		return menuColl;
	}
	
	public MenuColl getFirstLevelMenuColl(int roleId){
		MenuColl menuColl = new MenuColl();
		StringBuffer buf = new StringBuffer("");
		buf.append(" select * from om_menu_t a,om_func_role_t c, ");
		buf.append(" (select f_system_id from om_system_t where (f_parent_system_id is null or f_parent_system_id = ' ') ");
		buf.append(" and f_system_id not in (select distinct f_parent_system_id from om_system_t where f_parent_system_id is not null)) b ");
		buf.append(" where a.f_system_id = b.f_system_id ");
		buf.append(" and (a.f_parent_menu_id is null or f_parent_menu_id = ' ') ");
		buf.append(" and a.f_menu_id = c.f_menu_id AND c.f_role_id = ? AND a.f_inuse = 1 ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				MenuVO  vo = new MenuVO();
				vo.setAttribute(rest);
				menuColl.addMenu(vo);
			}
		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuCollByRoleId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuCollByRoleId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		
		return menuColl;
	}

	public MenuColl getMenuCollByRoleId(int roleId,String nodeId){
		MenuColl menuColl = new MenuColl();
		StringBuffer buf = new StringBuffer("");
		buf.append("select * from (");
		buf.append(" select distinct a.* from om_menu_t a, om_func_role_t b ");
		buf.append(" where a.f_menu_id = b.f_menu_id AND b.f_role_id = ? ");
		buf.append(" AND a.f_inuse = 1 AND a.f_system_id = ?");
		buf.append(" union ");
		buf.append(" select distinct a.* from om_menu_t a, om_func_role_t b ");
		buf.append(" where a.f_menu_id = b.f_menu_id AND b.f_role_id = ? ");
		buf.append(" AND a.f_inuse = 1 and (a.f_menu_id = ? or a.f_parent_menu_id like '").append(nodeId).append("%')");
		buf.append(" union ");
		buf.append(" SELECT distinct c.* ");
		buf.append(" from om_func_role_t b ,om_menu_t c, om_system_t d ");
		buf.append(" where b.f_role_id = ? and b.f_menu_id = c.F_MENU_ID and c.f_inuse = 1 and c.F_SYSTEM_ID = d.f_system_id ");
		buf.append(" and d.f_parent_system_id = ? ");
		buf.append(" )");
		buf.append(" order by f_order");
		
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			pstmt.setString(2, nodeId);
			pstmt.setInt(3, roleId);
			pstmt.setString(4, nodeId);
			pstmt.setInt(5, roleId);
			pstmt.setString(6, nodeId);
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				MenuVO vo = new MenuVO();
				vo.setAttribute(rest);
				menuColl.addMenu(vo);
			}
		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuCollByRoleId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuCollByRoleId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		
		return menuColl;
	}
	/**
	* @param menuName
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getMenuByName(String menuName) throws DataAccessException{
		MenuColl menuColl = new MenuColl();
		StringBuffer buf = new StringBuffer("");
		buf.append(" select * from om_menu_t where f_menu_name like ?");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,"%"+menuName+"%");
			rest = pstmt.executeQuery();			
			while(rest.next()){
				MenuVO vo = new MenuVO();
				vo.setAttribute(rest);
				menuColl.addMenu(vo);
			}		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuByName-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuByName-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return menuColl;
	}
	
	private String getContainerSQL(String flag){
		String sql = "SELECT f_container FROM om_container_t WHERE f_key = " + flag;
		return sql;
	}
	
	private String getFactLink(String containerFlag,PreparedStatement pstmt, Connection conn, String menuLink){
		String container = "";
		ResultSet rest = null;
		String sql = "";
		if(containerFlag != null && !containerFlag.trim().equals("") 
				&& !containerFlag.equals("0")){
			sql = getContainerSQL(containerFlag);
		}else{
			return menuLink;
		}
		String factLink = "";
		try {
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()){
				container = nvl(rest.getString("f_container"));
			}
	       if(menuLink == null){
	        	menuLink = "";
	        }
	        //���om_container_t�ж�Ӧ��containerֵΪ�գ�����menu�����õ�containerֵ��om_container_t�в����ڣ�Ĭ��Ϊ��ǰӦ��
	        if(container.trim().equals("")){
	        	factLink = menuLink;
	        }else if(container.endsWith("/")  && menuLink!= null && menuLink.startsWith("/")){
	            factLink = container.substring(0,container.length()-1)+menuLink;
	        }else if( !container.endsWith("/")  && menuLink!= null && !menuLink.startsWith("/")){
	        	factLink = container +"/"+ menuLink;
	        }else{
	            factLink = container + menuLink;                    
	        }			
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFactLink-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFactLink-2:" + e.getMessage());
			throw new DataAccessException(e);
		} 
		return factLink;
	}
	private HashMap getContainerMap(Connection conn){
		HashMap map = new HashMap();
		String sql = "SELECT distinct f_key,f_container FROM om_container_t";
		
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()){
				map.put(rest.getString("f_key"),rest.getString("f_container"));
			}
	        			
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getContainerMap()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getContainerMap()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} 
		return map;
	}
	
	private String getNewFactLink(String containerFlag,HashMap map,String menuLink){
		String container = "";
		
		String factLink = "";
		try {
			if(map != null && containerFlag != null && !containerFlag.trim().equals("") 
					&& !containerFlag.equals("0")){
				container = (String)map.get(containerFlag);
				if(container == null){
					container=""; 
				}
			}else{
				return menuLink;
			}
			
	        if(menuLink == null){
	        	menuLink = "";
	        }
	        if(container.trim().equals("")){
	        	factLink = menuLink;
	        }else if(container.endsWith("/")  && menuLink!= null && menuLink.startsWith("/")){
	            factLink = container.substring(0,container.length()-1)+menuLink;
	        }else if( !container.endsWith("/")  && menuLink!= null && !menuLink.startsWith("/")){
	        	factLink = container +"/"+ menuLink;
	        }else{
	            factLink = container + menuLink;                    
	        }			
		}catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getFactLink-2:" + e.getMessage());
			throw new DataAccessException(e);
		}
		
		return factLink;
	}
	
    /** 
    */
	private String nvl(String str) {
	    return str==null?"":str;
	}
	/**
	 * @param menuName
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getInfoByNodeId(String nodeId) throws DataAccessException{
		boolean ifSystemId = false;
		
		StringBuffer buf = new StringBuffer("");
		buf.append(" select count(*) from om_system_t where f_system_id = ?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, nodeId);
			rest = pstmt.executeQuery();	
			
			if(rest.next()){
				if(rest.getInt(1) > 0)
					ifSystemId = true;
			}		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getInfoByNodeId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getInfoByNodeId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return ifSystemId;
	}
	/**
	 * @param menuId
	 * @param menuName
	 * @param menuType
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getMenuColl(String menuId, String menuName, String menuType,int startNum, int endNum) throws DataAccessException{
		MenuColl menuColl = new MenuColl();
		StringBuffer buf = new StringBuffer("");
		buf.append(" select * from (");
		buf.append(" select rownum rowCount ,f_menu_id, f_menu_name, f_menu_type, f_menu_desc, f_disabled_date, f_order from om_menu_t where 1=1");
		if(menuId != null && !menuId.trim().equals("")){
			buf.append(" and f_menu_id = ? ");
		}
		if(menuName != null && !menuName.trim().equals("")){
			buf.append(" and f_menu_name like ? ");
		}
		if(menuType != null && !menuType.trim().equals("") && !menuType.trim().equals("-1")){
			buf.append(" and f_menu_type = ? ");
		}
		buf.append(" and rownum < ? " );
		buf.append(" ) where rowCount >= ?");
		buf.append(" order by f_order");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i=0;
			if(menuId != null && !menuId.trim().equals("")){
				i++;
				pstmt.setString(i,menuId);				
			}
			if(menuName != null && !menuName.trim().equals("")){
				i++;
				pstmt.setString(i,menuName);				
			}
			if(menuType != null && !menuType.trim().equals("") && !menuType.trim().equals("-1")){
				i++;
				pstmt.setString(i,menuType);				
			}
			pstmt.setInt(i+1, endNum);
			pstmt.setInt(i+2, startNum);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				MenuVO vo = new MenuVO();
				vo.setAttribute(rest);
				int type = rest.getInt("f_menu_type");
				String typeName = getMenuTypeName(type);
				vo.setMenuTypeName(typeName);
				menuColl.addMenu(vo);
			}		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return menuColl;
	}
	
	public int getTotalRows(String menuId, String menuName, String menuType) throws DataAccessException{
		int row = -1;
		StringBuffer buf = new StringBuffer("");
		buf.append(" select count(*) from om_menu_t where 1=1");
		if(menuId != null && !menuId.trim().equals("")){
			buf.append(" and f_menu_id = ? ");
		}
		if(menuName != null && !menuName.trim().equals("")){
			buf.append(" and f_menu_name like ? ");
		}
		if(menuType != null && !menuType.trim().equals("") && !menuType.trim().equals("-1")){
			buf.append(" and f_menu_type = ? ");
		}
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i=0;
			if(menuId != null && !menuId.trim().equals("")){
				i++;
				pstmt.setString(i, menuId);
			}
			if(menuName != null && !menuName.trim().equals("")){
				i++;
				pstmt.setString(i, menuName);
			}
			if(menuType != null && !menuType.trim().equals("") && !menuType.trim().equals("-1")){
				i++;
				pstmt.setString(i, menuType);
			}
			
			rest = pstmt.executeQuery();			
			if(rest.next()){
				row = rest.getInt(1);
			}		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getTotalRows-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getTotalRows-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return row;
	}
	/**
	 * @param sysId
	 * @param sysName
	 * @return
	 * @throws DataAccessException
	 */
	public SystemColl getSystemColl(String sysId, String sysName,int startNum, int endNum) throws DataAccessException{
		SystemColl sysColl = new SystemColl();
		StringBuffer buf = new StringBuffer("");
		buf.append(" select * from (");
		buf.append(" select rownum rowCount,f_system_id, f_system_name, f_detail_desc, f_disabled_date,f_order from om_system_t where 1=1");
		if(sysId != null && !sysId.trim().equals("")){
			buf.append(" and f_system_id = ?");
		}
		if(sysName != null && !sysName.trim().equals("")){
			buf.append(" and f_system_name like ?");
		}
		buf.append(" and rownum < ?");
		buf.append(" ) where rowCount >= ?");
		buf.append(" order by f_order");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i=0;
			if(sysId != null && !sysId.trim().equals("")){
				i++;
				pstmt.setString(i,sysId);
			}
			if(sysName != null && !sysName.trim().equals("")){
				i++;
				pstmt.setString(i,"%"+sysName+"%");
			}
			pstmt.setInt(i+1, endNum);
			pstmt.setInt(i+2, startNum);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				SystemVO vo = new SystemVO();
				vo.setAttribute(rest);
				sysColl.addSystem(vo);
			}		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getSystemColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getSystemColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return sysColl;
	}
	public int getTotalRows(String sysId, String sysName) throws DataAccessException{
		int row = -1;
		StringBuffer buf = new StringBuffer("");
		buf.append(" select count(*) from om_system_t where 1=1");
		if(sysId != null && !sysId.trim().equals("")){
			buf.append(" and f_system_id = ? ");
		}
		if(sysName != null && !sysName.trim().equals("")){
			buf.append(" and f_system_name like ? ");
		}
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i = 0;
			if(sysId != null && !sysId.trim().equals("")){
				i++;
				pstmt.setString(i,sysId);
			}
			if(sysName != null && !sysName.trim().equals("")){
				i++;
				pstmt.setString(i,"%"+sysName+"%");
			}
			rest = pstmt.executeQuery();			
			if(rest.next()){
				row = rest.getInt(1);
			}		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getTotalRows-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getTotalRows-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return row;
	}
	private String getMenuTypeName(int typeint){
		return "a";
	}
	
	public MenuVO getMenuById(String menuId) throws DataAccessException{
		MenuVO vo = new MenuVO();
		StringBuffer buf = new StringBuffer();
		buf.append("select * from om_menu_t where f_menu_id = ? ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, menuId);
			rest = pstmt.executeQuery();
			if (rest.next()) {
				vo = new MenuVO();
				vo.setAttribute(rest);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuById-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuById-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return vo;
	}
	/**
	 * @return
	 * @throws DataAccessException
	 */
	public MenuColl getParentMenuColl(String systemId) throws DataAccessException{
		MenuColl menuColl = new MenuColl();
		StringBuffer buf = new StringBuffer("");
		buf.append(" select * from om_menu_t where f_menu_type in ('1','2') and f_system_id = ? order by f_system_id");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, systemId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				MenuVO vo = new MenuVO();
				vo.setAttribute(rest);
				menuColl.addMenu(vo);
			}		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getParentMenuColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getParentMenuColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return menuColl;
	}
	
	/**
	 * �õ�ĳְԱ����΢����Ĳ˵�?
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public List getAdjustMenuColl(String employeeId) throws DataAccessException{
		List menuList = new ArrayList();;
		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT p.* FROM om_menu_t p, om_power_adjust_t q ");
		buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ? ");
		buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");		
		buf.append(" union SELECT u.* ");
		buf.append(" FROM om_menu_t u, om_power_adjust_t v");
		buf.append(" WHERE u.f_menu_id = v.f_menu_id AND v.f_employee_id = ? ");
		buf.append(" AND v.f_admin_adjust = 2 AND v.f_exec_adjust=2");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			pstmt.setString(2,employeeId);
			rest = pstmt.executeQuery();			
			while(rest.next()){	
				String menuId = rest.getString("f_menu_id");
				menuList.add(menuId);
			}		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getParentMenuColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getParentMenuColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return menuList;
	}
	
	public MenuColl getMenuCollByRoleAndSys(int roleId, String nodeId) throws DataAccessException{
		MenuColl menuColl = new MenuColl();
		StringBuffer buf = new StringBuffer("");
		buf.append(" select * from (");
		buf.append(" select distinct a.* from om_menu_t a, om_func_role_t b ");
		buf.append(" where a.f_menu_id = b.f_menu_id AND b.f_role_id = ? ");
		buf.append(" AND a.f_inuse = 1 AND a.f_system_id = ?");
		buf.append(" union ");
		buf.append(" select distinct a.* from om_menu_t a, om_func_role_t b ");
		buf.append(" where a.f_menu_id = b.f_menu_id AND b.f_role_id = ? ");
		buf.append(" AND a.f_inuse = 1 and (a.f_menu_id = ? or a.f_parent_menu_id like ? )");
		buf.append(" union ");
		buf.append(" select distinct a.* from om_menu_t a, om_system_t b,om_func_role_t c, om_system_t d ");
		buf.append(" where a.f_menu_id = c.f_menu_id and c.f_role_id = ? and a.f_inuse=1 ");
		buf.append(" and b.f_system_id = a.f_system_id and b.f_parent_system_id = d.f_system_id and d.f_system_id = ?");	     
		
		buf.append(" ) start with f_parent_menu_id is null CONNECT BY PRIOR f_menu_id = f_parent_menu_id ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			pstmt.setString(2, nodeId);
			pstmt.setInt(3, roleId);
			pstmt.setString(4, nodeId);
			pstmt.setString(5, nodeId+"%");
			pstmt.setInt(6, roleId);
			pstmt.setString(7, nodeId);
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				MenuVO  vo = new MenuVO();
				vo.setAttribute(rest);
				menuColl.addMenu(vo);
			}
		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuCollByRoleId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuCollByRoleId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		
		return menuColl;
	}
	
	public MenuColl getAssignableFirstLevelMenuColla(String adminEmpId, String nodeId) {
		MenuColl menusColl = null;

		StringBuffer buf = new StringBuffer("");
	
//		buf.append(" select distinct a.f_employee_id ,c.f_menu_id ");
		buf.append(" select * from (");
		buf.append(" SELECT distinct c.* ");
		buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c ");
		buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
		buf.append(" and a.f_admin_flag = 1 and c.f_inuse = 1 and c.f_system_id = ?");
		buf.append(" union ");
		buf.append(" SELECT distinct c.* ");
		buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c ");
		buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
		buf.append(" and a.f_admin_flag = 1 and c.f_inuse = 1 and (c.f_menu_id = ? or c.f_parent_menu_id like ?");
		buf.append(" )order by f_menu_id,f_order");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, adminEmpId);
			pstmt.setString(2, nodeId);
			pstmt.setString(3, adminEmpId);
			pstmt.setString(4, nodeId);
			pstmt.setString(5, nodeId+"%");
			rest = pstmt.executeQuery();
			menusColl = new MenuColl();
			
			while (rest.next()) {
				MenuVO vo = new MenuVO();
				vo.setMenuId(rest.getString("f_menu_id"));
				vo.setMenuDesc(NullProcessUtil.nvlToString(rest.getString("f_menu_desc"),""));
				vo.setMenuName(rest.getString("f_menu_name"));
				vo.setSystemId(rest.getString("f_system_id"));
				vo.setLayer(rest.getInt("f_layer"));
				vo.setParentMenuId(NullProcessUtil.nvlToString(rest.getString("f_parent_menu_id"),""));
				
				menusColl.addElement(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenusByAdminId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		return menusColl;
	}
	
	public SystemColl getSystemCollByMenu(String menuIds) throws DataAccessException{
		SystemColl sysColl = new SystemColl();
		StringBuffer buf = new StringBuffer();
		buf.append("select distinct b.*");
		buf.append(" from om_menu_t a, om_system_t b ");
		buf.append(" where a.f_system_id = b.f_system_id and a.f_menu_id in ");
		buf.append(menuIds);
		buf.append(" union ");
		buf.append(" select distinct c.* ");
		buf.append(" from om_menu_t a, om_system_t b, om_system_t c");
		buf.append(" where a.f_system_id = b.f_system_id and a.f_menu_id in ");
		buf.append(menuIds);
		buf.append(" and b.f_parent_system_id = c.f_system_id ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());			
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				SystemVO vo = new SystemVO();
				vo.setSystemId(rest.getString("f_system_id"));
				vo.setSystemName(rest.getString("f_system_name"));
				vo.setParentSystemId(rest.getString("f_parent_system_id"));				
				sysColl.addElement(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getSystemCollByMenu-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getSystemCollByMenu-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}

		return sysColl;
	}
	public MenuColl getMenuCollByFirstSys(String systemId) throws DataAccessException{
		MenuColl coll = new MenuColl();
		StringBuffer buf = new StringBuffer("");
		buf.append(" select a.* from om_menu_t a, om_system_t b ");
		buf.append(" where a.f_system_id = ? or a.f_system_id = b.f_system_id and b.f_parent_system_id = ?");		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, systemId);
			pstmt.setString(2, systemId);
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				MenuVO vo = new MenuVO();
				vo.setMenuId(rest.getString("f_menu_id"));
				vo.setMenuName(rest.getString("f_menu_name"));
				vo.setSystemId(rest.getString("f_system_id"));
				vo.setParentMenuId(NullProcessUtil.nvlToString(rest.getString("f_parent_menu_id"),""));				
				coll.addElement(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuCollByFirstSys-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuCollByFirstSys-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {

			close(rest, pstmt, conn);
		}
		return coll;
	}
	/**
	 * @param roleIdList
	 * @return
	 * @throws DataAccessException
	 */
	public List getMenuIdListByRoleList(List roleIdList) throws DataAccessException{
		List list = new ArrayList();
        StringBuffer buf = new StringBuffer();         
        buf.append(" select f_menu_id from om_func_role_t where f_role_id = ? ");
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            String menuId = "";
            if(roleIdList != null && roleIdList.size() != 0){
            	for(int i=0; i < roleIdList.size(); i++){
            		int roleId = Integer.parseInt((String)roleIdList.get(i));
            		pstmt.setInt(1, roleId);
            		 rest = pstmt.executeQuery();  
                     while(rest.next()){
                    	 menuId = rest.getString("f_menu_id");
                     	 if(!list.contains(menuId)){
                     		 list.add(menuId);
                     	 }                    	 
                     }
            	}
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuDAOImpl--getMenuIdListByRoleList(List roleIdList)-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuDAOImpl--getMenuIdListByRoleList(List roleIdList)-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return list;
	}
	/**
	 * �õ�΢���Ĳ˵�����
	 * adjustType = 1:����Ȩ��  2������Ȩ��
	 * @param employeeId, adjustType
	 * @return
	 * @throws DataAccessException
	 */
	public List getAdjustMenuId(String employeeId, int adjustType) throws DataAccessException{
		List list = new ArrayList();
        StringBuffer buf = new StringBuffer();         
        buf.append(" select f_menu_id from om_power_adjust_t where f_admin_adjust = ? and f_employee_id = ? ");
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, adjustType);
            pstmt.setString(2, employeeId);
            rest = pstmt.executeQuery();
            while(rest.next()){
            	String menuId = rest.getString("f_menu_id");
            	if(!list.contains(menuId)){
            		list.add(menuId);
            	}
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuDAOImpl--getAdjustMenuId(List roleIdList)-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuDAOImpl--getAdjustMenuId(List roleIdList)-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return list;
	}
	
	public List getMenuNavigation(String systemId,String employeeId)
	throws DataAccessException {
		List coll = new ArrayList();
		MenuVO vo = null;
		StringBuffer buf = new StringBuffer("");
		
		buf.append(" SELECT * FROM( SELECT n.* FROM( SELECT f_menu_id FROM om_func_role_t a,om_employee_role_relation_t b ");
		buf.append(" WHERE b.f_employee_id = ? AND a.f_role_id = b.f_role_id AND b.F_USABLE_FLAG = 1 GROUP BY f_menu_id) e,");
		buf.append(" om_menu_t n,om_system_t m WHERE e.f_menu_id = n.f_menu_id AND m.f_system_id = n.f_system_id ");
		buf.append(" AND n.f_system_id = ? AND n.f_if_my_work = 0 AND n.F_INUSE = 1 AND n.f_menu_type <> 0 ");
		buf.append(" AND n.f_menu_type < 10 UNION SELECT p.* FROM om_menu_t p, om_power_adjust_t q, om_system_t z ");
		buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ? AND q.f_admin_adjust=1 ");
		buf.append(" AND q.f_exec_adjust=1 AND p.F_MENU_TYPE <>0 AND p.f_menu_type < 10 and p.f_system_id = z.f_system_id ");
		buf.append(" and z.f_system_id = ? and p.f_inuse = 1 MINUS SELECT u.* FROM om_menu_t u, om_power_adjust_t v, om_system_t w ");
		buf.append(" WHERE u.f_menu_id = v.f_menu_id AND v.f_employee_id = ? AND v.f_admin_adjust = 2 ");
		buf.append(" AND v.f_exec_adjust=2 AND u.F_MENU_TYPE <>0 AND u.F_MENU_TYPE < 10 ");
		buf.append(" and u.f_system_id = w.f_system_id and w.f_system_id= ? ) ORDER BY f_order");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		Set parentMenuIdSet = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, systemId);
			pstmt.setString(3, employeeId);
			pstmt.setString(4, systemId);
			pstmt.setString(5, employeeId);
			pstmt.setString(6, systemId);
			rest = pstmt.executeQuery();
		
			// ��ȡ���е�container��Ϣ��������װf_page_link
			HashMap map = getContainerMap(conn);
		
			// ����ϵͳ��Ϣ
			parentMenuIdSet = new HashSet();
			while (rest.next()) {
				vo = new MenuVO();
				vo.setMenuId(nvl(rest.getString("f_menu_id")));
				
				vo.setMenuName(nvl(rest.getString("f_menu_name")));
				vo.setSystemId(nvl(rest.getString("f_system_Id")));
				vo.setModuleId(nvl(rest.getString("f_module_id")));
				vo.setMenuType(rest.getInt("f_menu_type"));
				vo.setOpenMethod(rest.getInt("f_open_method"));
				String pageLink = nvl(rest.getString("f_page_link"));
				String priPageLink = pageLink;
				String otherContainer = String.valueOf(rest
						.getInt("f_container"));
				// String factLink = getFactLink(pageLink, rest);
				String factLink = getNewFactLink(otherContainer, map, pageLink);

				String container = (String)map.get(otherContainer);
				//�ж��Ƿ�ʹ�ò�ͬ��contextPath
				if (!pageLink.equals(factLink) || "/".equals(container)) {
					vo.setIfDiffContext("1");
				} else {
					vo.setIfDiffContext("0");
				}
				if (factLink != null && !factLink.trim().equals("")) {
					pageLink = factLink;
				}
				vo.setPageLink(pageLink);
				vo.setLayer(rest.getInt("f_layer"));
				vo.setLog(rest.getInt("f_log"));
				vo.setOrder(rest.getInt("f_order"));
				vo.setIfMyWork(rest.getInt("f_if_my_work"));
				vo.setParentMenuId(rest.getString("f_parent_menu_id"));
				parentMenuIdSet.add(vo.getParentMenuId());
				vo.setInuse(rest.getInt("f_inuse"));
				vo.setMenuDesc(rest.getString("f_menu_desc"));
				vo.setContainer(rest.getInt("f_container"));
				coll.add(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuInfoByEmployeeId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuInfoByEmployeeId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}

		for (int i = 0; i < coll.size(); i++) {
		
			MenuVO mvo = (MenuVO)coll.get(i);
		
			if (parentMenuIdSet.contains(mvo.getMenuId())) {
				mvo.setIfChild(false);
			} else {
				mvo.setIfChild(true);
			}
		}
		SysLog.writeLogs("om", GlobalParameters.ERROR,
				"MenuDAOImpl--getMenuNavigation-################:" +coll.size());
		SysLog.writeLogs("om", GlobalParameters.ERROR,
				"MenuDAOImpl--getMenuNavigation-################:" +buf.toString() + "----" + employeeId + "----" + systemId);
		
//FOR DEBUG		
//		for (int i = 0; i < coll.size(); i++) {
//			MenuVO mvo = (MenuVO)coll.get(i);
//			SysLog.writeLogs("om", GlobalParameters.ERROR,
//					"######  " + mvo.getMenuId() + " ##  " + mvo.getMenuName() + " ### " + mvo.getIfChild() +" ### " + mvo.getParentMenuId() +" ### " + mvo.getPageLink());	
//		}


		//return setIfIsChild(parentMenuIdSet,coll);
		return coll;
	}
	
	public List getSystemNavigation(String employeeId)
	throws DataAccessException {
		List coll = new ArrayList();
		com.neusoft.om.dao.system.SystemVOJson vo = null;
		StringBuffer buf = new StringBuffer("");
		Set parentIdSet = new HashSet();
		
		buf.append("SELECT * FROM OM_SYSTEM_T   start with f_parent_system_id is null  connect by prior  f_system_id = f_parent_system_id order by f_parent_system_id");
//		buf.append(" SELECT * FROM OM_SYSTEM_T   start with f_parent_system_id is null  connect by prior  f_system_id = f_parent_system_id and f_system_id in");
//		buf.append("  (");
//		buf.append("  SELECT distinct F_SYSTEM_ID as aaa FROM( SELECT n.* FROM( SELECT f_menu_id FROM om_func_role_t a,om_employee_role_relation_t b");
//		buf.append("  WHERE b.f_employee_id = ? AND a.f_role_id = b.f_role_id AND b.F_USABLE_FLAG = 1 GROUP BY f_menu_id) e, ");
//		buf.append("  om_menu_t n,om_system_t m WHERE e.f_menu_id = n.f_menu_id AND m.f_system_id = n.f_system_id ");
//		buf.append("  AND n.f_if_my_work = 0 AND n.F_INUSE = 1 AND n.f_menu_type <> 0  ");
//		buf.append("  AND n.f_menu_type < 10 UNION SELECT p.* FROM om_menu_t p, om_power_adjust_t q, om_system_t z  ");
//		buf.append("  WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ? AND q.f_admin_adjust=1 ");
//		buf.append("  AND q.f_exec_adjust=1 AND p.F_MENU_TYPE <>0 AND p.f_menu_type < 10 and p.f_system_id = z.f_system_id ");
//		buf.append("  and p.f_inuse = 1 MINUS SELECT u.* FROM om_menu_t u, om_power_adjust_t v, om_system_t w ");
//		buf.append("  WHERE u.f_menu_id = v.f_menu_id AND v.f_employee_id = ? AND v.f_admin_adjust = 2 ");
//		buf.append("   AND v.f_exec_adjust=2 AND u.F_MENU_TYPE <>0 AND u.F_MENU_TYPE < 10 ");
//		buf.append("  and u.f_system_id = w.f_system_id )");
//		buf.append("  ) order by f_parent_system_id");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
//			pstmt.setString(1, employeeId);
//			pstmt.setString(2, employeeId);
//			pstmt.setString(3, employeeId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				vo = new com.neusoft.om.dao.system.SystemVOJson();
				vo.setStmId(rest.getString("F_SYSTEM_ID"));
				vo.setStmName(rest.getString("F_SYSTEM_NAME"));
				vo.setOrder(rest.getInt("F_ORDER"));
				vo.setParentStmId(rest.getString("F_PARENT_SYSTEM_ID"));
				if (vo.getParentStmId() == null || "".equals(vo.getParentStmId())) {
					vo.setParentStmId("PSYSK");
					vo.setIfChild(false);
					if (parentIdSet.contains(vo.getStmId())) {
						coll.add(vo);
					}
				} else {
					vo.setIfChild(true);
					parentIdSet.add(vo.getParentStmId());
					coll.add(vo);
				}

			}
			java.util.Collections.sort(coll, new java.util.Comparator(){
				public int compare(Object o1, Object o2) {
				    com.neusoft.om.dao.system.SystemVOJson c1 = (com.neusoft.om.dao.system.SystemVOJson) o1; 
				    com.neusoft.om.dao.system.SystemVOJson c2 = (com.neusoft.om.dao.system.SystemVOJson) o2;  
				    if (c1.getOrder() > c2.getOrder()) {  
				        return 1;  
				    } else {  
				         if (c1.getOrder() == c2.getOrder()) {  
				         return 0;  
				    } else {  
				         return -1;  
				    }  
				}
			}
			});  
			
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuInfoByEmployeeId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuInfoByEmployeeId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
		return coll;
	}
	
	
	public List getMenuForSearch(String employeeId, String searchKey) throws DataAccessException {
		List coll = new ArrayList();
		StringBuffer buf = new StringBuffer("");
		Set parentIdSet = new HashSet();
		buf.append(" SELECT * FROM");
		buf.append("  (SELECT n.* FROM");
		buf.append("  (SELECT f_menu_id");
		buf.append("   FROM om_func_role_t a,");
		buf.append("  om_employee_role_relation_t b");
		buf.append("  WHERE b.f_employee_id = ?");
		buf.append("   AND a.f_role_id       = b.f_role_id");
		buf.append("  AND b.F_USABLE_FLAG   = 1");
		buf.append("  GROUP BY f_menu_id");
		buf.append("  ) e,");
		buf.append("  om_menu_t n,");
		buf.append("  om_system_t m");
		buf.append("  WHERE e.f_menu_id  = n.f_menu_id");
		buf.append("  and n.f_menu_name like '%'||?||'%'");
		buf.append("    and n.f_page_link is not null");
		buf.append("  AND m.f_system_id  = n.f_system_id");
		buf.append("  AND n.f_if_my_work = 0");
		buf.append("  AND n.F_INUSE      = 1");
		buf.append("  AND n.f_menu_type <> 0");
		buf.append("  AND n.f_menu_type  < 10");
		buf.append("  UNION");
		buf.append("  SELECT p.*");
		buf.append("  FROM om_menu_t p,");
		buf.append("  om_power_adjust_t q,");
		buf.append("  om_system_t z");
		buf.append("  WHERE p.f_menu_id   = q.f_menu_id");
		buf.append("  AND q.f_employee_id = ?");
		buf.append("  and p.f_menu_name like '%'||?||'%'");
		buf.append("    and p.f_page_link is not null");
		buf.append("  AND q.f_admin_adjust=1");
		buf.append("  AND q.f_exec_adjust =1");
		buf.append("  AND p.F_MENU_TYPE  <>0");
		buf.append("  AND p.f_menu_type   < 10");
		buf.append("  AND p.f_system_id   = z.f_system_id");
		buf.append("  AND p.f_inuse       = 1");
		buf.append("  MINUS");
		buf.append("  SELECT u.*");
		buf.append("  FROM om_menu_t u,");
		buf.append("  om_power_adjust_t v,");
		buf.append("  om_system_t w");
		buf.append("  WHERE u.f_menu_id    = v.f_menu_id");
		buf.append("  AND v.f_employee_id  = ?");
		buf.append("  and u.f_menu_name like '%'||?||'%'");
		buf.append("    and u.f_page_link is not null");
		buf.append("  AND v.f_admin_adjust = 2");
		buf.append("  AND v.f_exec_adjust  =2");
		buf.append("  AND u.F_MENU_TYPE   <>0");
		buf.append("  AND u.F_MENU_TYPE    < 10");
		buf.append("  AND u.f_system_id    = w.f_system_id");
		buf.append("  )");
		buf.append("  ORDER BY f_order");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		Set parentMenuIdSet = null;
		parentMenuIdSet = new HashSet();
		MenuVO vo = null;
		try {
			conn = getConnection();
			HashMap map = getContainerMap(conn);
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, searchKey);
			pstmt.setString(3, employeeId);
			pstmt.setString(4, searchKey);
			pstmt.setString(5, employeeId);
			pstmt.setString(6, searchKey);
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				vo = new MenuVO();
				vo.setMenuId(nvl(rest.getString("f_menu_id")));
				
				vo.setMenuName(nvl(rest.getString("f_menu_name")));
				vo.setSystemId(nvl(rest.getString("f_system_Id")));
				vo.setModuleId(nvl(rest.getString("f_module_id")));
				vo.setMenuType(rest.getInt("f_menu_type"));
				vo.setOpenMethod(rest.getInt("f_open_method"));
				String pageLink = nvl(rest.getString("f_page_link"));
				String priPageLink = pageLink;
				String otherContainer = String.valueOf(rest
						.getInt("f_container"));
				// String factLink = getFactLink(pageLink, rest);
				String factLink = getNewFactLink(otherContainer, map, pageLink);

				String container = (String)map.get(otherContainer);
				//�ж��Ƿ�ʹ�ò�ͬ��contextPath
				if (!pageLink.equals(factLink) || "/".equals(container)) {
					vo.setIfDiffContext("1");
				} else {
					vo.setIfDiffContext("0");
				}
				if (factLink != null && !factLink.trim().equals("")) {
					pageLink = factLink;
				}
				vo.setPageLink(pageLink);
				vo.setLayer(rest.getInt("f_layer"));
				vo.setLog(rest.getInt("f_log"));
				vo.setOrder(rest.getInt("f_order"));
				vo.setIfMyWork(rest.getInt("f_if_my_work"));
				vo.setParentMenuId(rest.getString("f_parent_menu_id"));
				parentMenuIdSet.add(vo.getParentMenuId());
				vo.setInuse(rest.getInt("f_inuse"));
				vo.setMenuDesc(rest.getString("f_menu_desc"));
				vo.setContainer(rest.getInt("f_container"));
				vo.setIfChild(true);
				coll.add(vo);
			}
			
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuInfoByEmployeeId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--getMenuInfoByEmployeeId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
		return coll;
	}
	
}
