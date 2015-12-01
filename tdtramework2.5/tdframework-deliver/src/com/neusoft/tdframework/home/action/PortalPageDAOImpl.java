package com.neusoft.tdframework.home.action;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class PortalPageDAOImpl extends BaseDaoImpl implements PortalPageDAO {

	private String getFactLink(String containerFlag,PreparedStatement pstmt, Connection conn, String menuLink){
		String container = "";
		ResultSet rest = null;
		String sql = "";
		//���menu��û������container�ֶΣ�Ĭ�ϵ�ǰӦ��
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
					"PortalPageDAOImpl--getFactLink-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getFactLink-2:" + e.getMessage());
			throw new DataAccessException(e);
		} 
		return factLink;
	}
	private String getContainerSQL(String flag){
		String sql = "SELECT f_container FROM om_container_t WHERE f_key = " + flag;
		return sql;
	}
	


	private String nvl(String str) {
	    return str==null?"":str;
	}

	public List getPortalPageMenuColl(Map map)  throws DataAccessException {
		String employeeId = (String)map.get("employeeId");
		String systemId = (String)map.get("systemId");
		List menuColl = new ArrayList();
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
			// ����ϵͳ��Ϣ
//			vo = new MenuVO();
//			vo.setMenuId(systemId);
//			vo.setMenuName("ϵͳ");
//			vo.setLayer(0);
//			vo.setSystemId(systemId);
			
			//vo.setF_if_show_favorite();
//			menuColl.add(vo);
            
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
				/*
				String pageLink = nvl(rest.getString("f_page_link"));
				String priPageLink = pageLink;
				String otherContainer = String.valueOf(rest
						.getInt("f_container"));
				// String factLink = getFactLink(pageLink, rest);
				String factLink = getNewFactLink(otherContainer, map, pageLink);
				//�ж��Ƿ�ʹ�ò�ͬ��contextPath
				if (!pageLink.equals(factLink)) {
					vo.setIfDiffContext("1");
				} else {
					vo.setIfDiffContext("0");
				}
				*/
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
				//vo.setPageKind(rest.getString("f_page_kind"));
				menuColl.add(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getPortalPageMenuColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getPortalPageMenuColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return menuColl;
	}
	
	
    public List getViewForEmployee(String emplyeeId) throws DataAccessException {
    	
    	StringBuilder sbu = new StringBuilder();
    	sbu.append("select distinct d.*,b.VIEW_ID as DEFAULT_VIEW_ID  from OM_EMPLOYEE_T a, OM_FP_ROLE_T b,OM_FP_ROLE_VIEW_RELA_T c,OM_FP_VIEW_T d ");
    	sbu.append("where a.F_FP_ROLE = b.role_id ");
    	sbu.append("and b.ROLE_ID = c.ROLE_ID ");
    	sbu.append("and c.VIEW_ID = d.VIEW_ID and a.f_employee_id=? ");
    	
    	Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		List returnLst = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, emplyeeId);
			rest = pstmt.executeQuery();
			returnLst = new ArrayList();
			while (rest.next()) {
				PortalViewVO portalViewVO = new PortalViewVO();
				portalViewVO.setView_Id(rest.getString("VIEW_ID"));
				portalViewVO.setView_Name(rest.getString("VIEW_NAME"));
				portalViewVO.setView_Column(rest.getString("VIEW_COLUMN"));
				portalViewVO.setColumn_Rate(rest.getString("COLUMN_RATE"));
				portalViewVO.setDefault_view_Id(rest.getString("DEFAULT_VIEW_ID"));
				returnLst.add(portalViewVO);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getViewForEmployee-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getViewForEmployee-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	return returnLst;
    }
	
	public List getPortaletForView(String[] viewIds) throws DataAccessException{
		
    	StringBuilder sbu = new StringBuilder();
    	sbu.append("select aa.* ,bb.view_id  from  ");
    	sbu.append("(select b.* from OM_MENU_T a, OM_FP_VIEW_MENU_RELA_T b  ");
    	sbu.append("where a.F_MENU_ID=b.menu_id  ");
    	sbu.append("and (");
    	int vCount = 0;
    	for (String viewId : viewIds) {
    		if (vCount == 0) {
    	        sbu.append(" b.view_id=? ");
    		} else {
    			sbu.append(" or b.view_id=? ");
    		}
    		vCount++;
    	}
    	sbu.append(") ");
    	sbu.append("and  a.f_menu_type =10  ");
    	sbu.append(") bb,  OM_MENU_T aa where aa.f_parent_menu_id = bb.menu_id or aa.f_menu_id = bb.menu_id order by bb.MENU_ORDER, aa.f_menu_id");
    	
    	Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		List returnLst = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			int vArgCount = 1;
			for (String viewId : viewIds) {
			    pstmt.setString(vArgCount, viewId);
			    vArgCount++;
			}
			rest = pstmt.executeQuery();
			returnLst = new ArrayList();
			while (rest.next()) {
				PortaletMenuVO portaletMenuVO = new PortaletMenuVO();
				portaletMenuVO.setMenu_Id(rest.getString("f_menu_id"));
				portaletMenuVO.setF_Menu_Name(rest.getString("f_menu_name"));
				portaletMenuVO.setF_System_Id(rest.getString("f_system_Id"));
				portaletMenuVO.setF_Module_Id(rest.getString("f_module_id"));
				portaletMenuVO.setF_Menu_Type(rest.getString("f_menu_type"));
				portaletMenuVO.setF_Open_Method(rest.getString("f_open_method"));
				String pageLink = rest.getString("f_page_link");
				String otherContainer = String.valueOf(rest.getInt("f_container"));				
				String factLink = getFactLink(otherContainer,pstmt,conn,pageLink);
				/*
				String pageLink = nvl(rest.getString("f_page_link"));
				String priPageLink = pageLink;
				String otherContainer = String.valueOf(rest
						.getInt("f_container"));
				// String factLink = getFactLink(pageLink, rest);
				String factLink = getNewFactLink(otherContainer, map, pageLink);
				//�ж��Ƿ�ʹ�ò�ͬ��contextPath
				if (!pageLink.equals(factLink)) {
					vo.setIfDiffContext("1");
				} else {
					vo.setIfDiffContext("0");
				}
				*/
				if(factLink != null && !factLink.trim().equals("")){
					pageLink = factLink;
				}
				portaletMenuVO.setF_Page_Link(pageLink);
				portaletMenuVO.setF_Layer(rest.getString("f_layer"));
				portaletMenuVO.setF_Log(rest.getString("f_log"));
				portaletMenuVO.setF_Order(rest.getString("f_order"));
				portaletMenuVO.setF_If_My_Work(rest.getString("f_if_my_work"));
				portaletMenuVO.setF_Parent_Menu_Id(rest.getString("f_parent_menu_id"));
				portaletMenuVO.setF_Inuse(rest.getString("f_inuse"));
				portaletMenuVO.setF_Menu_Desc(rest.getString("f_menu_desc"));
				portaletMenuVO.setF_Height(rest.getString("f_Height"));
				portaletMenuVO.setF_Icon(rest.getString("f_icon"));
				portaletMenuVO.setF_Detail_Page(rest.getString("f_Detail_Page"));
				portaletMenuVO.setView_Id(rest.getString("view_id"));
				returnLst.add(portaletMenuVO);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getViewForEmployee-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getViewForEmployee-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	return returnLst;
		
		
	}
	
	
public List getPortaletForViews(String[] viewIds) throws DataAccessException{
		
    	StringBuilder sbu = new StringBuilder();
    	sbu.append("select distinct aa.F_MENU_ID , aa.F_MENU_NAME from  ");
    	sbu.append("(select b.* from OM_MENU_T a, OM_FP_VIEW_MENU_RELA_T b  ");
    	sbu.append("where a.F_MENU_ID=b.menu_id  ");
    	sbu.append("and (");
    	int vCount = 0;
    	for (String viewId : viewIds) {
    		if (vCount == 0) {
    	        sbu.append(" b.view_id=? ");
    		} else {
    			sbu.append(" or b.view_id=? ");
    		}
    		vCount++;
    	}
    	sbu.append(") ");
    	sbu.append("and  a.f_menu_type =10  ");
    	sbu.append(") bb,  OM_MENU_T aa where aa.f_menu_id = bb.menu_id order by aa.f_menu_id");
    	
    	Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		List returnLst = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			int vArgCount = 1;
			for (String viewId : viewIds) {
			    pstmt.setString(vArgCount, viewId);
			    vArgCount++;
			}
			rest = pstmt.executeQuery();
			returnLst = new ArrayList();
			while (rest.next()) {
				PortaletMenuVO portaletMenuVO = new PortaletMenuVO();
				portaletMenuVO.setMenu_Id(rest.getString("f_menu_id"));
				portaletMenuVO.setF_Menu_Name(rest.getString("f_menu_name"));
				returnLst.add(portaletMenuVO);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getPortaletForViews-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getPortaletForViews-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	return returnLst;
	}

public List getPortaletForPointView(String viewId) throws DataAccessException{
	
	StringBuilder sbu = new StringBuilder();
	sbu.append("select distinct aa.F_MENU_ID , aa.F_MENU_NAME from  ");
	sbu.append("(select b.* from OM_MENU_T a, OM_FP_VIEW_MENU_RELA_T b  ");
	sbu.append("where a.F_MENU_ID=b.menu_id  ");
	sbu.append("and (");
	sbu.append(" b.view_id=? ");
	sbu.append(") ");
	sbu.append("and  a.f_menu_type =10  ");
	sbu.append(") bb,  OM_MENU_T aa where aa.f_menu_id = bb.menu_id order by aa.f_menu_id");
	
	Connection conn = null;
	PreparedStatement pstmt = null;
	ResultSet rest = null;

	List returnLst = null;
	try {
		conn = getConnection();
		pstmt = conn.prepareStatement(sbu.toString());
		pstmt.setString(1, viewId);
		rest = pstmt.executeQuery();
		returnLst = new ArrayList();
		while (rest.next()) {
			PortaletMenuVO portaletMenuVO = new PortaletMenuVO();
			portaletMenuVO.setMenu_Id(rest.getString("f_menu_id"));
			portaletMenuVO.setF_Menu_Name(rest.getString("f_menu_name"));
			returnLst.add(portaletMenuVO);
		}
	} catch (SQLException e) {
		SysLog.writeLogs("om", GlobalParameters.ERROR,
				"PortalPageDAOImpl--getPortaletForPointView-1:" + e.getMessage());
		throw new DataAccessException(e);
	} catch (Exception e) {
		SysLog.writeLogs("om", GlobalParameters.ERROR,
				"PortalPageDAOImpl--getPortaletForPointView-2:" + e.getMessage());
		throw new DataAccessException(e);
	} finally {
		close(rest, pstmt, conn);
	}
	return returnLst;
    }

	public String getOnlineNumber(String city) throws DataAccessException{
		StringBuilder sbu = new StringBuilder();
		sbu.append("select count(1) as onlineNumber from OM_LOGIN_USERLIST where ");
		
		sbu.append(" (logintime between");
		sbu.append(" to_date(to_char(sysdate,'yyyy-mm-dd') || ' 00:00:01','yyyy-mm-dd hh24:mi:ss') ");
		sbu.append(" and");
		sbu.append(" to_date(to_char(sysdate,'yyyy-mm-dd') || ' 23:59:59','yyyy-mm-dd hh24:mi:ss')");
		sbu.append(" )");

		sbu.append("and logouttime is null and f_part_city = ?");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		String returnStr = null;
		try {
			int month = java.util.Calendar.getInstance().get(Calendar.MONTH) + 1;
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, city);
			//pstmt.setString(2, city);
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				returnStr = rest.getString("onlineNumber");
				if ("0".equals(returnStr)) {
					returnStr = "1";
				}
				return returnStr;
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getMenuInfoByEmployeeId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getMenuInfoByEmployeeId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
		return "XX";
	}
	
	public String getLastLoginTime(String workNo) throws DataAccessException {
		StringBuilder sbu = new StringBuilder();
		sbu.append("select to_char(F_LAST_LOGIN_TIME,'yyyy-MM-dd HH24:mi:ss')  as f_last_login_time from om_last_login_t where f_work_no=? ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		java.util.Date returnStr = null;
		java.text.SimpleDateFormat sd = new java.text.SimpleDateFormat( "yyyy��M��d��  (E) a HH:mm");
		
		java.text.SimpleDateFormat sd01 = new java.text.SimpleDateFormat( "yyyy-MM-dd HH:mm:ss");
		try {
			int month = java.util.Calendar.getInstance().get(Calendar.MONTH) + 1;
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, workNo);
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				String returnStr01 = rest.getString("f_last_login_time");
				returnStr = sd01.parse(returnStr01);
				return sd.format(returnStr);
			} else {
				return sd.format(new java.util.Date());
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getMenuInfoByEmployeeId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getMenuInfoByEmployeeId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
	}
	
	
	public static void main(String[] args) throws Exception {
		
		String aa = "2012-08-02 14:49:55";
		java.text.SimpleDateFormat sd01 = new java.text.SimpleDateFormat( "yyyy-MM-dd HH:mm:ss");
		java.util.Date returnStr = sd01.parse(aa);
		String   d = new   java.text.SimpleDateFormat( "yyyy��M��d��  (E) a HH:mm").format(returnStr); 
	    System.out.println(d);
	}
}
