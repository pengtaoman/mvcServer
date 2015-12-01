/*
 * Created on 2006-6-28
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.om.dao.page;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.service.security.SecurityFactory;
import com.neusoft.unieap.service.security.authorization.Permission;
import com.neusoft.unieap.service.security.providers.dao.SecurityRole;
import com.neusoft.unieap.service.security.resource.SecurityResource;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class PageDAOImpl extends BaseDaoImpl implements PageDAO{
	
    public Vector getRolePermissionsByResourceID2(SecurityRole sr, String resourceTypeID, String resourceID)
    throws Exception
{
    	
        Vector vec = new Vector();
        String sql = "select PERMISSION_ID from SEC_ROLE_PERMISSION_RESOURCE where RESOURCE_ID=? and ROLE_ID = ? and RESOURCETYPE_ID = ?";
		
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,resourceID);
			pstmt.setString(2, sr.getAuthority());
			pstmt.setString(3,resourceTypeID);
			rest = pstmt.executeQuery();
			while(rest.next()) {
				vec.add(SecurityFactory.getInstance().getResourceAdapterFactory().getAdapter(resourceTypeID).getPermissionByID(rest.getString("PERMISSION_ID")));
			}
		}catch(SQLException e){
			SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--getRolePermissionsByResourceID-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("td security",GlobalParameters.ERROR,"PermissionManagerDAOImpl--getRolePermissionsByResourceID-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vec;
}
    
    public Vector getRolePermissionsByResourceID(SecurityRole sr, String resourceTypeID, String resourceID)
    throws Exception
    {
    	//System.out.println("DAO中得到的权限控制组件的URL:"+resourceID);
        Vector vec = new Vector();
        Map menuIdMap = new HashMap();//菜单map, 用于保存符合条件的菜单数据，最后通过查询其中的菜单数量判断是否有权查看
       
        StringBuffer buf1 = new StringBuffer();
        buf1.append(" select c.f_menu_id ");
        buf1.append(" from om_func_role_t a,  om_employee_role_relation_t b , om_menu_t c  ");
        buf1.append(" where a.f_role_id = b.f_role_id  and a.f_menu_id = c.f_menu_id ");
        buf1.append(" and b.F_USABLE_FLAG = 1 ");
        buf1.append(" and b.f_employee_id = ? and c.f_page_link = ?  ");          
        
        StringBuffer buf2 = new StringBuffer();
        buf2.append(" SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
        buf2.append(" WHERE p.f_menu_id = q.f_menu_id ");
        buf2.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");
        buf2.append(" AND p.f_page_link = ? ");
        
        StringBuffer buf3 = new StringBuffer();
        buf3.append(" SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
        buf3.append(" WHERE p.f_menu_id = q.f_menu_id ");
        buf3.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=2 AND q.f_exec_adjust=2 ");
        buf3.append(" AND p.f_page_link = ? ");
        
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		try{
			conn = getConnection();
			// 查询角色确定的菜单
			pstmt = conn.prepareStatement(buf1.toString());
			pstmt.setString(1, sr.getAuthority());
			pstmt.setString(2, resourceID);
			rest = pstmt.executeQuery();	
			while(rest.next()){
				String menuId = rest.getString("f_menu_id");
				menuIdMap.put(menuId, menuId);
			}
			// 增加微调的菜单
			pstmt = conn.prepareStatement(buf2.toString());
			pstmt.setString(1, sr.getAuthority());
			pstmt.setString(2, resourceID);
			rest = pstmt.executeQuery();	
			while(rest.next()){
				String menuId = rest.getString("f_menu_id");
				if( !menuIdMap.containsKey(menuId)){//如果菜单map中不存在这个菜单，增加数据
					menuIdMap.put(menuId, menuId);
				}				
			}
			// 去掉微调掉的菜单
			pstmt = conn.prepareStatement(buf3.toString());
			pstmt.setString(1, sr.getAuthority());
			pstmt.setString(2, resourceID);
			rest = pstmt.executeQuery();		
			while(rest.next()){
				String menuId = rest.getString("f_menu_id");
				if( menuIdMap.containsKey(menuId)){//从权限map中把这条数据去掉
					menuIdMap.remove(menuId);
				}				
			}
			String permission = "hidden"; //只支持 hidden
			if( !menuIdMap.isEmpty()){ //如果菜单map不为空，说明有权查看
				permission = "writely"; //可以操作
			}
			vec.add(SecurityFactory.getInstance().getResourceAdapterFactory().getAdapter(resourceTypeID).getPermissionByID(permission));

		}catch(SQLException e){
			SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--getRolePermissionsByResourceID-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--getRolePermissionsByResourceID-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vec;
    }
    public String getRolePermissionsByResourceID(String employeeId, String resourceID)
    throws Exception
    {
    	Map menuIdMap = new HashMap();//菜单map, 用于保存符合条件的菜单数据，最后通过查询其中的菜单数量判断是否有权查看
        StringBuffer buf1 = new StringBuffer();
        buf1.append(" select c.f_menu_id ");
        buf1.append(" from om_func_role_t a,  om_employee_role_relation_t b , om_menu_t c  ");
        buf1.append(" where a.f_role_id = b.f_role_id  and a.f_menu_id = c.f_menu_id ");
        buf1.append(" and b.F_USABLE_FLAG = 1 ");
        buf1.append(" and b.f_employee_id = ? and c.f_page_link = ?  and c.f_inuse = 1 ");          
        
        StringBuffer buf2 = new StringBuffer();
        buf2.append(" SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
        buf2.append(" WHERE p.f_menu_id = q.f_menu_id ");
        buf2.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");
        buf2.append(" AND p.f_page_link = ? and p.f_inuse = 1 ");
        
        StringBuffer buf3 = new StringBuffer();
        buf3.append(" SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
        buf3.append(" WHERE p.f_menu_id = q.f_menu_id ");
        buf3.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=2 AND q.f_exec_adjust=2 ");
        buf3.append(" AND p.f_page_link = ? ");

		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String permission = "hidden"; //只支持 hidden
		try{
			conn = getConnection();
			// 查询角色确定的菜单
			pstmt = conn.prepareStatement(buf1.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, resourceID);
			rest = pstmt.executeQuery();	
			while(rest.next()){
				String menuId = rest.getString("f_menu_id");
				menuIdMap.put(menuId, menuId);
			}
			// 增加微调的菜单
			pstmt = conn.prepareStatement(buf2.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, resourceID);
			rest = pstmt.executeQuery();	
			while(rest.next()){
				String menuId = rest.getString("f_menu_id");
				if( !menuIdMap.containsKey(menuId)){//如果菜单map中不存在这个菜单，增加数据
					menuIdMap.put(menuId, menuId);
				}				
			}
			// 去掉微调掉的菜单
			pstmt = conn.prepareStatement(buf3.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, resourceID);
			rest = pstmt.executeQuery();		
			while(rest.next()){
				String menuId = rest.getString("f_menu_id");
				if( menuIdMap.containsKey(menuId)){//从权限map中把这条数据去掉
					menuIdMap.remove(menuId);
				}				
			}
			if( !menuIdMap.isEmpty()){ //如果菜单map不为空，说明有权查看
				permission = ""; //可以操作
			}

		}catch(SQLException e){
			SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--getRolePermissionsByResourceID-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--getRolePermissionsByResourceID-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return permission;
    }

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#grant(com.neusoft.unieap.service.security.providers.dao.SecurityRole, com.neusoft.unieap.service.security.resource.SecurityResource, com.neusoft.unieap.service.security.authorization.Permission, java.lang.Object)
	 */
	public void grant(SecurityRole arg0, SecurityResource arg1, Permission arg2, Object arg3) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#revoke(com.neusoft.unieap.service.security.providers.dao.SecurityRole, com.neusoft.unieap.service.security.resource.SecurityResource, com.neusoft.unieap.service.security.authorization.Permission)
	 */
	public void revoke(SecurityRole arg0, SecurityResource arg1, Permission arg2) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#revoke(com.neusoft.unieap.service.security.providers.dao.SecurityRole)
	 */
	public void revoke(SecurityRole arg0) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#getExtPermissionInfo(com.neusoft.unieap.service.security.providers.dao.SecurityRole, com.neusoft.unieap.service.security.authorization.Permission, java.lang.String)
	 */
	public Object getExtPermissionInfo(SecurityRole arg0, Permission arg1, String arg2) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#getRolesIDByPermissionInfo(com.neusoft.unieap.service.security.authorization.Permission, java.lang.String)
	 */
	public Vector getRolesIDByPermissionInfo(Permission arg0, String arg1) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	 /**
	  * 根据操作员登陆账号，角色编号，判断其是否具有对某menu(可能是菜单或按钮)具有访问的权力
	  * @param workNo
	  * @param roleId
	  * @param menuId
	  * @return
	  * @throws DataAccessException
	  */
	public boolean ifHaveRight(String workNo, String menuId) throws DataAccessException{
		boolean haveRight = false;		
		int code = 0;
        String msg = "";
        Connection conn = null;
        CallableStatement pst = null;
        
        try {
            conn = getConnection();
            pst = conn.prepareCall("{call om_check_page_and_button_proc(?,?,?,?)}");
            
            pst.setString(1,workNo);
            pst.setString(2, menuId);  
            pst.registerOutParameter(3, java.sql.Types.NUMERIC);
            pst.registerOutParameter(4, java.sql.Types.VARCHAR);
            pst.execute();
            code = pst.getInt(3);                                 
            msg = pst.getString(4);   
            if(code == 1){
            	haveRight = true;
            }else{
            	haveRight = false;
            }
        } catch (SQLException sqle) {
            msg = sqle.getMessage();
            SysLog.writeLogs("om",GlobalParameters.ERROR,"PageDAOImpl--ifHaveRight:"+msg);
            throw new DataAccessException(sqle);
        } catch (Exception alle) {
            msg = alle.getMessage();
            SysLog.writeLogs("om",GlobalParameters.ERROR,"PageDAOImpl--ifHaveRight:"+msg);
            throw new DataAccessException(alle);
        } finally {
            close(pst, conn);
        }
		 return haveRight;
	 }

	public boolean ifHaveRightForOther (String employeeId, String url) throws DataAccessException {
		boolean haveRight = false;
		String sqlMenu = "SELECT * FROM om_menu_t WHERE f_page_link = ? ";
			
	    	Map menuIdMap = new HashMap();//菜单map, 用于保存符合条件的菜单数据，最后通过查询其中的菜单数量判断是否有权查看
	        StringBuffer buf1 = new StringBuffer();
	        buf1.append(" select c.f_menu_id ");
	        buf1.append(" from om_func_role_t a,  om_employee_role_relation_t b , om_menu_t c  ");
	        buf1.append(" where a.f_role_id = b.f_role_id  and a.f_menu_id = c.f_menu_id ");
	        buf1.append(" and b.F_USABLE_FLAG = 1 ");
	        buf1.append(" and b.f_employee_id = ? and c.f_page_link = ?  ");          
	        
	        StringBuffer buf2 = new StringBuffer();
	        buf2.append(" SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
	        buf2.append(" WHERE p.f_menu_id = q.f_menu_id ");
	        buf2.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");
	        buf2.append(" AND p.f_page_link = ? ");
	        
	        StringBuffer buf3 = new StringBuffer();
	        buf3.append(" SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
	        buf3.append(" WHERE p.f_menu_id = q.f_menu_id ");
	        buf3.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=2 AND q.f_exec_adjust=2 ");
	        buf3.append(" AND p.f_page_link = ? ");

	        Connection conn = null;
			PreparedStatement pstmt       = null ;
			PreparedStatement pstmtMenu   = null;
			ResultSet         rest        = null ;
			ResultSet         restMenu    = null;
			try{
				conn = getConnection();
				pstmtMenu = conn.prepareStatement(sqlMenu);
				pstmtMenu.setString(1, url);
				restMenu = pstmtMenu.executeQuery();
				if(!restMenu.next()){
					return true;
				}
				// 查询角色确定的菜单
				pstmt = conn.prepareStatement(buf1.toString());
				pstmt.setString(1, employeeId);
				pstmt.setString(2, url);
				rest = pstmt.executeQuery();	
				while(rest.next()){
					String menuId = rest.getString("f_menu_id");
					menuIdMap.put(menuId, menuId);
				}
				// 增加微调的菜单
				pstmt = conn.prepareStatement(buf2.toString());
				pstmt.setString(1, employeeId);
				pstmt.setString(2, url);
				rest = pstmt.executeQuery();	
				while(rest.next()){
					String menuId = rest.getString("f_menu_id");
					if( !menuIdMap.containsKey(menuId)){//如果菜单map中不存在这个菜单，增加数据
						menuIdMap.put(menuId, menuId);
					}				
				}
				// 去掉微调掉的菜单
				pstmt = conn.prepareStatement(buf3.toString());
				pstmt.setString(1, employeeId);
				pstmt.setString(2, url);
				rest = pstmt.executeQuery();		
				while(rest.next()){
					String menuId = rest.getString("f_menu_id");
					if( menuIdMap.containsKey(menuId)){//从权限map中把这条数据去掉
						menuIdMap.remove(menuId);
					}				
				}
				if( !menuIdMap.isEmpty()){ //如果菜单map不为空，说明有权查看
					haveRight = true; //可以操作
				}
			
		}catch(SQLException e){
			SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--ifHaveRightForOther-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--ifHaveRightForOther-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
			close(pstmtMenu);
		}
		return haveRight;
	}

	 /**
	  * 判断某职员对某单选框是否具有使用的权利
	  * @param employeeId
	  * @param securityId
	  * @return
	  * @throws DataAccessException
	  */
	 public boolean haveRadioRight(String employeeId, String url) throws DataAccessException{
		 boolean haveRight = false;
	    	Map menuIdMap = new HashMap();//菜单map, 用于保存符合条件的菜单数据，最后通过查询其中的菜单数量判断是否有权查看
	        StringBuffer buf1 = new StringBuffer();
	        buf1.append(" select c.f_menu_id ");
	        buf1.append(" from om_func_role_t a,  om_employee_role_relation_t b , om_menu_t c  ");
	        buf1.append(" where a.f_role_id = b.f_role_id  and a.f_menu_id = c.f_menu_id ");
	        buf1.append(" and b.F_USABLE_FLAG = 1 and c.f_menu_type = 21 ");
	        buf1.append(" and b.f_employee_id = ? and c.f_page_link = ?  ");          
	        
	        StringBuffer buf2 = new StringBuffer();
	        buf2.append(" SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
	        buf2.append(" WHERE p.f_menu_id = q.f_menu_id ");
	        buf2.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");
	        buf2.append(" AND p.f_page_link = ? and p.f_menu_type = 21 ");
	        
	        StringBuffer buf3 = new StringBuffer();
	        buf3.append(" SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
	        buf3.append(" WHERE p.f_menu_id = q.f_menu_id ");
	        buf3.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=2 AND q.f_exec_adjust=2 ");
	        buf3.append(" AND p.f_page_link = ? and p.f_menu_type = 21 ");

	        Connection conn = null;
			PreparedStatement pstmt       = null ;
			ResultSet         rest        = null ;
			try{
				conn = getConnection();				
				// 查询角色确定的菜单
				pstmt = conn.prepareStatement(buf1.toString());
				pstmt.setString(1, employeeId);
				pstmt.setString(2, url);
				rest = pstmt.executeQuery();	
				while(rest.next()){
					String menuId = rest.getString("f_menu_id");
					menuIdMap.put(menuId, menuId);
				}
				// 增加微调的菜单
				pstmt = conn.prepareStatement(buf2.toString());
				pstmt.setString(1, employeeId);
				pstmt.setString(2, url);
				rest = pstmt.executeQuery();	
				while(rest.next()){
					String menuId = rest.getString("f_menu_id");
					if( !menuIdMap.containsKey(menuId)){//如果菜单map中不存在这个菜单，增加数据
						menuIdMap.put(menuId, menuId);
					}				
				}
				// 去掉微调掉的菜单
				pstmt = conn.prepareStatement(buf3.toString());
				pstmt.setString(1, employeeId);
				pstmt.setString(2, url);
				rest = pstmt.executeQuery();		
				while(rest.next()){
					String menuId = rest.getString("f_menu_id");
					if( menuIdMap.containsKey(menuId)){//从权限map中把这条数据去掉
						menuIdMap.remove(menuId);
					}				
				}
				if( !menuIdMap.isEmpty()){ //如果菜单map不为空，说明有权查看
					haveRight = true; //可以操作
				}
			}catch(SQLException e){
				SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--haveRadioRight-1:"+e.getMessage());
				throw new DataAccessException(e);
			}catch(Exception e){
				SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--haveRadioRight-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}
		 return haveRight;
	 }
	 
	 /**
	  * 判断某职员是否具有访问某复选框的权利
	  * @param employeeId
	  * @param securityId
	  * @return
	  * @throws DataAccessException
	  */
	 public boolean haveCheckBoxRight(String employeeId, String url) throws DataAccessException{
		 boolean haveRight = false;
	    	Map menuIdMap = new HashMap();//菜单map, 用于保存符合条件的菜单数据，最后通过查询其中的菜单数量判断是否有权查看
	        StringBuffer buf1 = new StringBuffer();
	        buf1.append(" select c.f_menu_id ");
	        buf1.append(" from om_func_role_t a,  om_employee_role_relation_t b , om_menu_t c  ");
	        buf1.append(" where a.f_role_id = b.f_role_id  and a.f_menu_id = c.f_menu_id ");
	        buf1.append(" and b.F_USABLE_FLAG = 1 and c.f_menu_type = 22 ");
	        buf1.append(" and b.f_employee_id = ? and c.f_page_link = ?  ");          
	        
	        StringBuffer buf2 = new StringBuffer();
	        buf2.append(" SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
	        buf2.append(" WHERE p.f_menu_id = q.f_menu_id ");
	        buf2.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");
	        buf2.append(" AND p.f_page_link = ? and p.f_menu_type = 22 ");
	        
	        StringBuffer buf3 = new StringBuffer();
	        buf3.append(" SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
	        buf3.append(" WHERE p.f_menu_id = q.f_menu_id ");
	        buf3.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=2 AND q.f_exec_adjust=2 ");
	        buf3.append(" AND p.f_page_link = ? and p.f_menu_type = 22 ");

	        Connection conn = null;
			PreparedStatement pstmt       = null ;
			ResultSet         rest        = null ;
			try{
				conn = getConnection();				
				// 查询角色确定的菜单
				pstmt = conn.prepareStatement(buf1.toString());
				pstmt.setString(1, employeeId);
				pstmt.setString(2, url);
				rest = pstmt.executeQuery();	
				while(rest.next()){
					String menuId = rest.getString("f_menu_id");
					menuIdMap.put(menuId, menuId);
				}
				// 增加微调的菜单
				pstmt = conn.prepareStatement(buf2.toString());
				pstmt.setString(1, employeeId);
				pstmt.setString(2, url);
				rest = pstmt.executeQuery();	
				while(rest.next()){
					String menuId = rest.getString("f_menu_id");
					if( !menuIdMap.containsKey(menuId)){//如果菜单map中不存在这个菜单，增加数据
						menuIdMap.put(menuId, menuId);
					}				
				}
				// 去掉微调掉的菜单
				pstmt = conn.prepareStatement(buf3.toString());
				pstmt.setString(1, employeeId);
				pstmt.setString(2, url);
				rest = pstmt.executeQuery();		
				while(rest.next()){
					String menuId = rest.getString("f_menu_id");
					if( menuIdMap.containsKey(menuId)){//从权限map中把这条数据去掉
						menuIdMap.remove(menuId);
					}				
				}
				if( !menuIdMap.isEmpty()){ //如果菜单map不为空，说明有权查看
					haveRight = true; //可以操作
				}
			}catch(SQLException e){
				SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--haveCheckBoxRight-1:"+e.getMessage());
				throw new DataAccessException(e);
			}catch(Exception e){
				SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--haveCheckBoxRight-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}
		 return haveRight;
	 }

	public String getMenuIDByResourceID(String employeeId, String resourceID) throws Exception {
        StringBuffer buf = new StringBuffer();
        buf.append("SELECT f_menu_id ");
        buf.append(" FROM om_menu_t ");
        buf.append(" WHERE f_page_link = ? ");
 
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String menuid = ""; //只支持 hidden
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, resourceID);
			rest = pstmt.executeQuery();		
	
			while(rest.next()) {
				//if(rest.getInt(1) != 0){
					menuid = rest.getString("f_menu_id");
				//}
			}
			//vec.add(SecurityFactory.getInstance().getResourceAdapterFactory().getAdapter(resourceTypeID).getPermissionByID(permission));

		}catch(SQLException e){
			SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--getMenuIDByResourceID-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("td security",GlobalParameters.ERROR,"PageDAOImpl--getMenuIDByResourceID-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return menuid;
	}
}
