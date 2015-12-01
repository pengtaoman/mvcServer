package com.neusoft.om.dao.menuoperate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;


public class MenuOperateDAOImpl extends BaseDaoImpl implements MenuOperateDAO{
	
	public MenuOperateVO getMenuByMenuName(String menuName) throws DataAccessException{
		MenuOperateVO vo = new MenuOperateVO();
		StringBuffer buf = new StringBuffer(); 
		buf.append("select * from om_menu_t where f_menu_name = ? ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,menuName);
			rest = pstmt.executeQuery();
			if(rest.next()){
				vo = new MenuOperateVO();
				vo.setAttribute(rest);
			}
		}catch(SQLException e){
				e.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}
	
	public MenuOperateVO getMenuByMenuId(String menuId) throws DataAccessException{
		MenuOperateVO vo = new MenuOperateVO();
		StringBuffer buf = new StringBuffer(); 
		buf.append("select * from om_menu_t where f_menu_id = ? ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,menuId);
			rest = pstmt.executeQuery();
			if(rest.next()){
				vo = new MenuOperateVO();
				vo.setAttribute(rest);
			}
		}catch(SQLException e){
				e.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}
	
	public MenuOperateColl getAllMenuInfo() throws DataAccessException{
		String sql = "SELECT * FROM om_menu_t ORDER BY f_system_id,f_order" ;
		MenuOperateVO vo = null;
		MenuOperateVO sysMenuVO = null;
		MenuOperateColl coll = new MenuOperateColl();
		String systemId = "-1";
		String currentSystemId;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new MenuOperateVO();
				vo.setAttribute(rest);
				coll.addMenu(vo);
			}
		}catch(SQLException e){
			e.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			close(rest,pstmt,conn);
		}
		//return coll;
		return setIfChild(coll);
	}
	
	
	public int doAddMenuInfo(MenuOperateVO vo)  throws DataAccessException{
		int code = 1;
		StringBuffer buf = new StringBuffer("");
		buf.append("insert into om_menu_t (");
		buf.append(" f_menu_id,f_menu_name,f_system_id,f_module_id,f_menu_type,f_open_method,f_page_link,f_layer,f_log,f_order,f_if_my_work,f_parent_menu_id,f_inuse,f_menu_desc,f_portal_win_id )");
		buf.append(" values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,vo.getMenuId());
			pstmt.setString(2,vo.getMenuName());
			pstmt.setString(3,vo.getSystemId());
			pstmt.setString(4,vo.getModuleId());
			pstmt.setInt(5,vo.getMenuType());
			pstmt.setInt(6,vo.getOpenMethod());
			pstmt.setString(7,vo.getPageLink());
			pstmt.setInt(8,vo.getLayer());
			pstmt.setInt(9,vo.getLog());
			pstmt.setInt(10,vo.getOrder());
			pstmt.setInt(11,vo.getIfMyWork());
			pstmt.setString(12,vo.getParentMenuId());
			pstmt.setInt(13,vo.getInuse());
			pstmt.setString(14,vo.getMenuDesc());
			pstmt.setInt(15,vo.getPortalWinId());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			e.printStackTrace();
		}catch(Exception e){
			code = 0;
			e.printStackTrace();
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	
	public int doModifyMenuInfo(MenuOperateVO vo,String oldMenuId) throws DataAccessException{
		int code = 0;
		String sql = "update om_menu_t set f_menu_id = ?,f_menu_name = ?,f_system_id = ?,f_module_id = ?,f_menu_type = ?,f_open_method = ?,f_page_link = ?,f_layer = ?,f_log = ?,f_order = ?,f_if_my_work = ?,f_parent_menu_id = ?,f_inuse = ?,f_menu_desc = ?,f_portal_win_id = ? where f_menu_id = '"+oldMenuId+"'";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getMenuId());
			pstmt.setString(2,vo.getMenuName());
			pstmt.setString(3,vo.getSystemId());
			pstmt.setString(4,vo.getModuleId());
			pstmt.setInt(5,vo.getMenuType());
			pstmt.setInt(6,vo.getOpenMethod());
			pstmt.setString(7,vo.getPageLink());
			pstmt.setInt(8,vo.getLayer());
			pstmt.setInt(9,vo.getLog());
			pstmt.setInt(10,vo.getOrder());
			pstmt.setInt(11,vo.getIfMyWork());
			pstmt.setString(12,vo.getParentMenuId());
			pstmt.setInt(13,vo.getInuse());
			pstmt.setString(14,vo.getMenuDesc());
			pstmt.setInt(15,vo.getPortalWinId());
			code = pstmt.executeUpdate();	
		}catch(SQLException e){
			code = -1;
			e.printStackTrace();
		}catch(Exception e){
			code = -1;
			e.printStackTrace();
		}finally{
			close(rest,pstmt,conn);
		}
		return code;	
	}

	/* (non-Javadoc)
	 * @see com.neusoft.om.dao.menu.MenuDAO#doDeleteMenu(com.neusoft.om.dao.menu.MenuVO)
	 */
	public int doDeleteMenu(String menuId) throws DataAccessException{
int code = 1;
		
		String sql = "delete om_menu_t where f_menu_id = ? ";
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
			e.printStackTrace();	
		}catch(Exception e){
			code = 0;
			e.printStackTrace();
		}finally{
			close(rest,pstmt,conn);
		}
		return code;
	}
	
	//	重新设定是否有子节点
	  private static MenuOperateColl setIfChild(MenuOperateColl menuColl){
		  MenuOperateColl menuTempColl = new MenuOperateColl();
		  for(int i=0;i<menuColl.getRowCount();i++){

			  MenuOperateVO vo = menuColl.getMenu(i);

			  if(i==menuColl.getRowCount()-1)
			  	{vo.setIfChild(false);}
			  else{
			  	if(vo.getLayer()<(menuColl.getMenu(i+1)).getLayer()){
					vo.setIfChild(true);}
			 	else{vo.setIfChild(false);}
			  }
			  menuTempColl.addMenu(vo);
		  }

		return menuTempColl;
	}

}
