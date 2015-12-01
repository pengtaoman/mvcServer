/*
 * Created on 2004-11-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.home.action;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.neusoft.common.AppContainerMaint;
import com.neusoft.common.SysMaint;
import com.neusoft.om.dao.homepage.MainContentColl;
import com.neusoft.om.dao.homepage.MainContentVO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;


public class HomePageDAOImpl extends BaseDaoImpl implements HomePageDAO {

	public ObjectCollection getMainContentColl(Map map) throws DataAccessException {
		ObjectCollection mainContentColl = new MainContentColl();
		String employeeId = (String) map.get("employeeId");//inputVO.getEmployeeId();
		String systemId = (String)map.get("systemId");//inputVO.getSystemId();
		MenuColl coll = new MenuColl();
		MenuVO vo = null;
		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT * FROM( ");
		buf.append(" SELECT n.* ");
		buf.append(" FROM( ");
		buf.append(" SELECT f_menu_id");
		buf.append(" FROM om_func_role_t a,om_employee_role_relation_t b");
		buf.append(" WHERE b.f_employee_id = ?");
		buf.append(" AND a.f_role_id = b.f_role_id");
		buf.append(" AND b.F_USABLE_FLAG = 1");
		buf.append(" GROUP BY f_menu_id) e,om_menu_t n,om_system_t m");
		buf.append(" WHERE e.f_menu_id = n.f_menu_id");
		buf.append(" AND m.f_system_id = n.f_system_id");
		buf.append(" AND n.f_system_id = ?");
		buf.append(" AND n.f_if_my_work = 0");
		buf.append(" AND n.F_INUSE = 1");		
		buf.append(" AND n.f_menu_type >=10 AND n.f_menu_type <=19");
		
		buf.append(" UNION SELECT p.* FROM om_menu_t p, om_power_adjust_t q ");
		buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = '"+employeeId+"'");
		buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 AND p.f_menu_type >=10 AND p.f_menu_type <=19");		
		
		buf.append(" MINUS SELECT u.* ");
		buf.append(" FROM om_menu_t u, om_power_adjust_t v");
		buf.append(" WHERE u.f_menu_id = v.f_menu_id AND v.f_employee_id = '"+employeeId+"'");
		buf.append(" AND v.f_admin_adjust = 2 AND v.f_exec_adjust=2 AND u.f_menu_type >=10 AND u.f_menu_type <=19" );
		
		buf.append(" ) ORDER BY f_order");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, systemId);
			rest = pstmt.executeQuery();
			// 插入系统信息
			vo = new MenuVO();
			vo.setMenuId(systemId);
			vo.setMenuName("系统");
			vo.setLayer(0);
			vo.setSystemId(systemId);
			
			//vo.setF_if_show_favorite();
			coll.addMenu(vo);
            
			while (rest.next()) {
				vo = new MenuVO();
				vo.setMenuId(rest.getString("f_menu_id"));
				vo.setMenuName(rest.getString("f_menu_name"));
				vo.setSystemId(rest.getString("f_system_Id"));
				vo.setModuleId(rest.getString("f_module_id"));
				vo.setMenuType(rest.getInt("f_menu_type"));
				vo.setOpenMethod(rest.getInt("f_open_method"));
				String pageLink = rest.getString("f_page_link");
				String otherContainer = String.valueOf(rest.getInt("f_container"));				
				String factLink = getFactLink(otherContainer,pstmt,conn,pageLink);
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
		
		for(int i=0; i < coll.getRowCount(); i++){
			MainContentVO contentVO = new MainContentVO();
			MenuVO menuVO = coll.getMenu(i);
			MenuColl menuColl = new MenuColl();
			if(menuVO.getMenuType() == 10){ //首页的frame,约定menu_type=10
				for(int j=0; j < coll.getRowCount(); j++){
					MenuVO subMenuVO = coll.getMenu(j);
					if(subMenuVO.getParentMenuId()!=null 
							&& subMenuVO.getParentMenuId().trim().equals(menuVO.getMenuId().trim()) 
							&& subMenuVO.getMenuType() >=11 && subMenuVO.getMenuType() <= 19){
						menuColl.addMenu(subMenuVO);
					}				
				}
				contentVO.setMenuVO(menuVO);
				contentVO.setMenuColl(menuColl);
				mainContentColl.addElement(contentVO);
			}

			
		}
		return mainContentColl;
	}
	
	private String getFactLink(String containerFlag,PreparedStatement pstmt, Connection conn, String menuLink){
		String container = "";
		ResultSet rest = null;
		String sql = "";
		//如果menu中没有配置container字段，默认当前应用
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
	        //如果om_container_t中对应的container值为空，或者menu中配置的container值在om_container_t中不存在，默认为当前应用
	        if(container==null || container.trim().equals("")){
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
	private String getContainerSQL(String flag){
		String sql = "SELECT f_container FROM om_container_t WHERE f_key = " + flag;
		return sql;
	}
	
	private String getContainer(String containerFlag,PreparedStatement pstmt, Connection conn){
		String container = "";
		//Connection conn = getConnection();
		//PreparedStatement pstmt = null;
		ResultSet rest = null;
		String sql = "";
		//如果menu中没有配置container字段，默认当前应用
		if(containerFlag != null && !containerFlag.trim().equals("") 
				&& !containerFlag.equals("0")){
			sql = getContainerSQL(containerFlag);
		}else{
			return "";
		}
		try {
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()){
				container = nvl(rest.getString("f_container"));
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"HomePageDAOImpl--getContainer-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"HomePageDAOImpl--getContainer-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{			
				if(rest != null)rest.close();
			}catch(SQLException e){
				SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"HomePageDAOImpl--close-1:"+e.getMessage());
			}
		}

		return container;
	}
	
	private String nvl(String str) {
	    return str==null?"":str;
	}

	public MenuColl getHomePageMenuColl(Map map)  throws DataAccessException {
		String employeeId = (String)map.get("employeeId");
		String systemId = (String)map.get("systemId");
		MenuColl menuColl = new MenuColl();
		MenuVO vo = null;
		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT * FROM( ");
		buf.append(" SELECT n.* ");
		buf.append(" FROM( ");
		buf.append(" SELECT f_menu_id");
		buf.append(" FROM om_func_role_t a,om_employee_role_relation_t b");
		buf.append(" WHERE b.f_employee_id = ?");
		buf.append(" AND a.f_role_id = b.f_role_id");
		buf.append(" AND b.F_USABLE_FLAG = 1");
		buf.append(" GROUP BY f_menu_id) e,om_menu_t n,om_system_t m");
		buf.append(" WHERE e.f_menu_id = n.f_menu_id");
		buf.append(" AND m.f_system_id = n.f_system_id");
		buf.append(" AND n.f_system_id = ?");
		buf.append(" AND n.f_if_my_work = 0");
		buf.append(" AND n.F_INUSE = 1");		
		buf.append(" AND n.f_menu_type >=10 AND n.f_menu_type <=19");
		
		buf.append(" UNION SELECT p.* FROM om_menu_t p, om_power_adjust_t q ");
		buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = '"+employeeId+"'");
		buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 AND p.f_menu_type >=10 AND p.f_menu_type <=19");		
		
		buf.append(" MINUS SELECT u.* ");
		buf.append(" FROM om_menu_t u, om_power_adjust_t v");
		buf.append(" WHERE u.f_menu_id = v.f_menu_id AND v.f_employee_id = '"+employeeId+"'");
		buf.append(" AND v.f_admin_adjust = 2 AND v.f_exec_adjust=2 AND u.f_menu_type >=10 AND u.f_menu_type <=19" );
		
		buf.append(" ) ORDER BY f_order");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, systemId);
			rest = pstmt.executeQuery();
			// 插入系统信息
			vo = new MenuVO();
			vo.setMenuId(systemId);
			vo.setMenuName("系统");
			vo.setLayer(0);
			vo.setSystemId(systemId);
			
			//vo.setF_if_show_favorite();
			menuColl.addMenu(vo);
            
			while (rest.next()) {
				vo = new MenuVO();
				vo.setMenuId(rest.getString("f_menu_id"));
				vo.setMenuName(rest.getString("f_menu_name"));
				vo.setSystemId(rest.getString("f_system_Id"));
				vo.setModuleId(rest.getString("f_module_id"));
				vo.setMenuType(rest.getInt("f_menu_type"));
				vo.setOpenMethod(rest.getInt("f_open_method"));
				String pageLink = rest.getString("f_page_link");
				String otherContainer = String.valueOf(rest.getInt("f_container"));				
				String factLink = getFactLink(otherContainer,pstmt,conn,pageLink);
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
				menuColl.addMenu(vo);
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
		return menuColl;
	}

}
