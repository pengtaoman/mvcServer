package com.neusoft.om.interfase.ebisp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class DataTransferDAOImpl extends BaseDaoImpl implements DataTransferDAO{

	public int trsWindowToSystem() throws DataAccessException {
		int flag = 0;
		int code_rel = 0;
		int code_sys = 0;
		//将一级子系统导入子系统与窗口关系表
		StringBuffer buf_rel = new StringBuffer();
		buf_rel.append("insert into om_system_rel_window_t(f_system_id, f_window_id,f_layer)");
		buf_rel.append(" SELECT om_system_s.nextval f_system_id, f_child_id,1 " +
				       " from om_window_relation_t where f_parent_id = '1' ");
		String sql_rel = buf_rel.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql_rel);
			code_rel = pstmt.executeUpdate();	
			//将一级子菜单导入子系统表
			StringBuffer buf = new StringBuffer(); 
			buf.append("insert into om_system_t (f_system_id,f_system_name,f_system_type,f_detail_desc,f_parent_system_id,f_order,f_if_show_favorite ) ");
	        buf.append("SELECT b.f_system_id, a.f_window_name,1, a.f_description, null,null,0");
			buf.append(" FROM om_window_t a, om_system_rel_window_t b WHERE a.f_window_id = b.f_window_id and a.f_window_id in ");
			buf.append(" (select f_child_id from om_window_relation_t where f_parent_id = '1' )");
			String sql = buf.toString();		
			pstmt = conn.prepareStatement(sql);
			code_sys = pstmt.executeUpdate();	
		    //将二级子系统数据导入子系统与window关系表			
			StringBuffer buf_child_rel = new StringBuffer();
			buf_child_rel.append("insert into om_system_rel_window_t(f_system_id, f_window_id,f_layer)");
			buf_child_rel.append(" SELECT om_system_s.nextval f_system_id, a.f_child_id,2 " +
					       " from om_window_relation_t a, om_window_relation_t b " +
					       " where a.f_parent_id = b.f_child_id and b.f_parent_id = 1" +
					       " AND a.f_child_id NOT IN "+//系统表中不存在的二级子系统
					       " (SELECT f_child_id FROM om_window_relation_t WHERE f_parent_id = 1) ");
			String sql_child_rel = buf_child_rel.toString();
			pstmt = conn.prepareStatement(sql_child_rel);
			int code_child_rel = pstmt.executeUpdate();	
			
//			某个子系统已经是一级子系统，同时又属于某一个一级子系统作为一个二级子系统存在，这种情况，权限系统中在子系统表中增加一条数据，按照另外一个子系统进行表示
			StringBuffer buf_child_rel_repeat = new StringBuffer();
			buf_child_rel.append("insert into om_system_rel_window_t(f_system_id, f_window_id,f_layer)");
			buf_child_rel.append(" SELECT om_system_s.nextval f_system_id, a.f_child_id,2 " +
					       " from om_window_relation_t a, om_window_relation_t b " +
					       " where a.f_parent_id = b.f_child_id and b.f_parent_id = 1" +
					       " AND a.f_child_id IN "+ 
					       " (SELECT f_child_id FROM om_window_relation_t WHERE f_parent_id = 1) ");
			String sql_child_rel_repeat = buf_child_rel_repeat.toString();
			pstmt = conn.prepareStatement(sql_child_rel_repeat);
			int code_child_rel_repeat = pstmt.executeUpdate();	
			
			//将二级子系统数据导入子系统表
			StringBuffer buf_child = new StringBuffer();
			buf_child.append("insert into om_system_t (f_system_id,f_system_name,f_system_type,f_detail_desc,f_parent_system_id,f_order,f_if_show_favorite ) ");
			buf_child.append(" SELECT b.f_system_id,a.f_window_name,1, a.f_description, f.f_system_id,null,0 " +
					"FROM om_window_t a, om_system_rel_window_t b,om_window_relation_t c,om_system_rel_window_t f " +
					"WHERE a.f_window_id = b.f_window_id and a.f_window_id = c.f_child_id and c.f_parent_id in " +
					"(select e.f_parent_id from om_window_relation_t d, om_window_relation_t e " +
					"where d.f_child_id = e.f_parent_id and d.f_parent_id = '1') " +
					" AND b.f_layer = 2 AND f.f_window_id = c.f_parent_id"); 	

			String sql_child = buf_child.toString();
			pstmt = conn.prepareStatement(sql_child);
			int code_child = pstmt.executeUpdate();	
			
			
			if(code_sys != 0 && code_rel != 0 && code_child_rel!=0 
					&& code_child != 0 && code_child_rel_repeat != 0){
				flag = 1;
			}
			
		}catch(SQLException e){
			flag = 0;
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"DataTransferDAOImpl--trsWindowToSystem-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			flag = 0;
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"DataTransferDAOImpl--trsWindowToSystem-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}  
		return flag;
	}

	public int trsWindowToMenu() throws DataAccessException {
		int flag = 0;
		int code_rel_1 = 0;
		int code_menu_1 = 0;
		//将直属于子系统的菜单加入menu-window关系表
		StringBuffer buf_rel_1 = new StringBuffer();
		buf_rel_1.append("INSERT INTO om_menu_rel_window_t (f_menu_id, f_window_id,f_belong_sys)" +
				" SELECT om_menu_s.NEXTVAL, b.f_window_id,1 " +
				"FROM OM_SYSTEM_REL_WINDOW_T a, OM_WINDOW_T b , OM_WINDOW_RELATION_T c " +
				"WHERE b.f_window_id = c.f_child_id	AND a.F_LAYER = 2 AND a.F_WINDOW_ID = c.f_parent_id");
		String sql_rel_1 = buf_rel_1.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql_rel_1);
			code_rel_1 = pstmt.executeUpdate();	
			//将直属于子系统的菜单加入menu表
			StringBuffer buf_menu_1 = new StringBuffer(); 
			buf_menu_1.append("INSERT INTO OM_MENU_T " +
					"( F_MENU_ID, F_MENU_NAME, F_SYSTEM_ID, F_MODULE_ID, " +
					" F_MENU_TYPE,F_OPEN_METHOD, F_PAGE_LINK, F_LAYER, F_LOG, F_ORDER, F_IF_MY_WORK," +
					" F_INUSE,F_MENU_DESC, F_CONTAINER )" +
					" SELECT DISTINCT d.f_menu_id , b.f_window_name,a.f_system_id,0," +
					" 5, 0,b.f_page_path,1,1,c.f_order_no,0," +
					" 1, b.F_DESCRIPTION, 4 " +
					" FROM OM_SYSTEM_REL_WINDOW_T a, OM_WINDOW_T b , OM_WINDOW_RELATION_T c,om_menu_rel_window_t d" +
					" WHERE b.f_window_id = c.f_child_id AND a.F_LAYER = 2 AND a.F_WINDOW_ID = c.f_parent_id " +
					" AND d.f_window_id = b.f_window_id");
			String sql_menu_1 = buf_menu_1.toString();		
			pstmt = conn.prepareStatement(sql_menu_1);
			code_menu_1 = pstmt.executeUpdate();	
			
		    //非直属于子系统的所有window加入menu_rel_window_t		
			StringBuffer buf_rel_2 = new StringBuffer();
			buf_rel_2.append("INSERT INTO om_menu_rel_window_t (f_menu_id, f_window_id, f_belong_sys)" +
					" SELECT om_menu_s.NEXTVAL, b.f_window_id,0" +
					" FROM OM_menu_REL_WINDOW_T a, OM_WINDOW_T b ,om_window_relation_t c" +
					" WHERE a.F_BELONG_SYS=1 AND a.F_WINDOW_ID = c.f_parent_id AND c.f_child_id = b.f_window_id");
			String sql_rel_2 = buf_rel_2.toString();
			pstmt = conn.prepareStatement(sql_rel_2);
			int code_rel_2 = pstmt.executeUpdate();	
			
			//非直属于子系统的所有window加入menu_t
			StringBuffer buf_menu_2 = new StringBuffer();
			buf_menu_2.append("INSERT INTO OM_MENU_T " +
					"( F_MENU_ID, F_MENU_NAME, F_SYSTEM_ID, F_MODULE_ID, " +
					" F_MENU_TYPE,F_OPEN_METHOD, F_PAGE_LINK, F_LAYER, F_LOG, F_ORDER, F_IF_MY_WORK, " +
					" F_INUSE, f_parent_menu_id,F_MENU_DESC, F_CONTAINER )" +
					" SELECT DISTINCT d.f_menu_id , b.f_window_name,a.f_system_id,0," +
					" 5,0,b.f_page_path,1,1,c.f_order_no,0," +
					" 1,e.f_menu_id,b.F_DESCRIPTION, 4" +
					" FROM OM_menu_t a, OM_WINDOW_T b , OM_WINDOW_RELATION_T c,om_menu_rel_window_t d," +
					" om_menu_rel_window_t e" +
					" WHERE b.f_window_id = d.f_window_id AND c.F_CHILD_ID = d.f_window_id " +
					" AND c.F_PARENT_ID = e.f_window_id AND e.f_menu_id = a.f_menu_id");

			String sql_menu_2 = buf_menu_2.toString();
			pstmt = conn.prepareStatement(sql_menu_2);
			int code_menu_2 = pstmt.executeUpdate();	
			
			
			if(code_rel_1 != 0 && code_rel_2 != 0 && code_menu_1!=0 && code_menu_2 != 0){
				flag = 1;
			}
			
		}catch(SQLException e){
			flag = 0;
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"DataTransferDAOImpl--trsWindowToMenu-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			flag = 0;
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"DataTransferDAOImpl--trsWindowToMenu-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}  
		return flag;
		/*
		* 将直属于子系统的菜单加入menu-window关系表
		INSERT INTO om_menu_rel_window_t (f_menu_id, f_window_id,f_belong_sys)
		SELECT om_menu_s.NEXTVAL, b.f_window_id,1
		FROM OM_SYSTEM_REL_WINDOW_T a, OM_WINDOW_T b , OM_WINDOW_RELATION_T c
		WHERE b.f_window_id = c.f_child_id	AND a.F_LAYER = 2 AND a.F_WINDOW_ID = c.f_parent_id
		* 将直属于子系统的菜单加入menu表
		INSERT INTO OM_MENU_T ( F_MENU_ID, F_MENU_NAME, F_SYSTEM_ID, F_MODULE_ID, F_MENU_TYPE,
			F_OPEN_METHOD, F_PAGE_LINK, F_LAYER, F_LOG, F_ORDER, F_IF_MY_WORK, F_INUSE,
			F_MENU_DESC, F_CONTAINER )			
		SELECT DISTINCT d.f_menu_id , b.f_window_name,a.f_system_id,0,5,
			0,b.f_page_path,1,1,c.f_order_no,0,1,
			b.F_DESCRIPTION, 4
		FROM OM_SYSTEM_REL_WINDOW_T a, OM_WINDOW_T b , OM_WINDOW_RELATION_T c,om_menu_rel_window_t d
		WHERE b.f_window_id = c.f_child_id	AND a.F_LAYER = 2 AND a.F_WINDOW_ID = c.f_parent_id
			AND d.f_window_id = b.f_window_id
	
		* 非直属于子系统的所有window加入menu_rel_window_t
		INSERT INTO om_menu_rel_window_t (f_menu_id, f_window_id, f_belong_sys)
		SELECT om_menu_s.NEXTVAL, b.f_window_id,0
		FROM OM_menu_REL_WINDOW_T a, OM_WINDOW_T b ,om_window_relation_t c
		WHERE a.F_BELONG_SYS=1 AND a.F_WINDOW_ID = c.f_parent_id AND c.f_child_id = b.f_window_id

		* 非直属于子系统的所有window加入menu_t
		INSERT INTO OM_MENU_T ( F_MENU_ID, F_MENU_NAME, F_SYSTEM_ID, F_MODULE_ID, F_MENU_TYPE,
			F_OPEN_METHOD, F_PAGE_LINK, F_LAYER, F_LOG, F_ORDER, F_IF_MY_WORK, F_INUSE,f_parent_menu_id,
			F_MENU_DESC, F_CONTAINER )					
		SELECT DISTINCT d.f_menu_id , b.f_window_name,a.f_system_id,0,5,
			0,b.f_page_path,1,1,c.f_order_no,0,1,e.f_menu_id,
			b.F_DESCRIPTION, 4
		FROM OM_menu_t a, OM_WINDOW_T b , OM_WINDOW_RELATION_T c,om_menu_rel_window_t d, om_menu_rel_window_t e
		WHERE b.f_window_id = d.f_window_id AND c.F_CHILD_ID = d.f_window_id AND c.F_PARENT_ID = e.f_window_id
		AND e.f_menu_id = a.f_menu_id
		*/
	}

	public int trsFrameToMenu() throws DataAccessException {
		int flag = 0;
		int code_rel = 0;
		int code_menu = 0;
		//将frame信息插入menu_rel_frame表
		StringBuffer buf_rel = new StringBuffer();
		buf_rel.append("INSERT INTO OM_MENU_REL_FRAME_T (f_menu_id, f_frame_id) " +
				" SELECT om_menu_s.NEXTVAL, f_frame_id " +
				" FROM  OM_FRAME_T");
		String sql_rel = buf_rel.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql_rel);
			code_rel = pstmt.executeUpdate();	
			//将frame信息插入menu表
			StringBuffer buf_menu = new StringBuffer(); 
			buf_menu.append("INSERT INTO OM_MENU_T " +
				"( F_MENU_ID, F_MENU_NAME, F_SYSTEM_ID, F_MODULE_ID, F_MENU_TYPE, F_OPEN_METHOD, " +
				" F_PAGE_LINK, F_LAYER, F_LOG, F_ORDER, F_IF_MY_WORK, F_INUSE,f_parent_menu_id," +
				" F_MENU_DESC, F_CONTAINER )" +
				" SELECT d.f_menu_id, a.F_FRAME_NAME,c.f_system_id,0,6,0," +
				" a.F_PAGE_PATH,1,1,0,0,1,c.f_menu_id,a.F_DESCRIPTION,4 " +
				" FROM OM_FRAME_T a, OM_WINDOW_REL_FRAME_T b, OM_MENU_T c,om_menu_rel_frame_t d, " +
				" OM_MENU_REL_WINDOW_T e " +
				" WHERE a.F_FRAME_ID = d.F_FRAME_ID AND c.F_menu_id = e.f_menu_id " +
				" AND b.f_window_id = e.f_window_id AND a.f_frame_id = b.f_frame_id	");
			String sql_menu = buf_menu.toString();		
			pstmt = conn.prepareStatement(sql_menu);
			code_menu = pstmt.executeUpdate();	
						
			if(code_rel != 0 && code_menu!=0 ){
				flag = 1;
			}
			
		}catch(SQLException e){
			flag = 0;
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"DataTransferDAOImpl--trsFrameToMenu-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			flag = 0;
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"DataTransferDAOImpl--trsFrameToMenu-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}  
		return flag;
		/**
		将frame信息插入menu_rel_frame表
		INSERT INTO OM_MENU_REL_FRAME_T (f_menu_id, f_frame_id)
		SELECT om_menu_s.NEXTVAL, f_frame_id
		FROM  OM_FRAME_T
		
		将frame信息插入menu表
		INSERT INTO OM_MENU_T ( F_MENU_ID, F_MENU_NAME, F_SYSTEM_ID, F_MODULE_ID, F_MENU_TYPE,
			F_OPEN_METHOD, F_PAGE_LINK, F_LAYER, F_LOG, F_ORDER, F_IF_MY_WORK, F_INUSE,f_parent_menu_id,
			F_MENU_DESC, F_CONTAINER )	
		SELECT d.f_menu_id, a.F_FRAME_NAME,c.f_system_id,0,6,
			0,a.F_PAGE_PATH,1,1,0,0,1,c.f_menu_id,
			a.F_DESCRIPTION,4
		FROM OM_FRAME_T a, OM_WINDOW_REL_FRAME_T b, OM_MENU_T c,om_menu_rel_frame_t d, OM_MENU_REL_WINDOW_T e
		WHERE a.F_FRAME_ID = d.F_FRAME_ID AND c.F_menu_id = e.f_menu_id AND b.f_window_id = e.f_window_id AND a.f_frame_id = b.f_frame_id
		*/
	}

	public int trsViewToMenu() throws DataAccessException {
		int flag = 0;
		int code_rel = 0;
		int code_menu = 0;
		//将frame信息插入menu_rel_frame表
		StringBuffer buf_rel = new StringBuffer();
		buf_rel.append("INSERT INTO OM_MENU_REL_view_T (f_menu_id, f_view_id, f_parent_menu_id)" +
				" SELECT om_menu_s.NEXTVAL, a.f_view_id, c.f_menu_id " +
				" FROM  OM_VIEW_T a, OM_FRAME_REL_VIEW_T b, om_menu_rel_frame_t c " +
				" WHERE a.f_view_id = b.f_view_id AND b.f_frame_id = c.f_frame_id");
		String sql_rel = buf_rel.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql_rel);
			code_rel = pstmt.executeUpdate();	
			//将frame信息插入menu表
			StringBuffer buf_menu = new StringBuffer(); 
			buf_menu.append("INSERT INTO OM_MENU_T " +
					"( F_MENU_ID, F_MENU_NAME, F_SYSTEM_ID, F_MODULE_ID, F_MENU_TYPE," +
					" F_OPEN_METHOD, F_PAGE_LINK, F_LAYER, F_LOG, F_ORDER, F_IF_MY_WORK, " +
					"F_INUSE,f_parent_menu_id, F_MENU_DESC, F_CONTAINER )" +
					" SELECT DISTINCT c.f_menu_id, a.F_VIEW_NAME,d.F_SYSTEM_ID,0,7," +
					" 0,a.F_PAGE_PATH,1,1,0,0,1,c.f_parent_menu_id,a.F_DESCRIPTION,4" +
					" FROM OM_VIEW_T a, OM_FRAME_REL_VIEW_T b, om_menu_rel_view_t c," +
					" OM_MENU_T d,om_menu_rel_frame_t e" +
					" WHERE a.f_view_id = c.f_view_id AND a.f_view_id = b.f_view_id AND " +
					" d.f_menu_id = e.f_menu_id  AND e.f_frame_id = b.f_frame_id");
			String sql_menu = buf_menu.toString();		
			pstmt = conn.prepareStatement(sql_menu);
			code_menu = pstmt.executeUpdate();	
						
			if(code_rel != 0 && code_menu!=0 ){
				flag = 1;
			}
			
		}catch(SQLException e){
			flag = 0;
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"DataTransferDAOImpl--trsFrameToMenu-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			flag = 0;
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"DataTransferDAOImpl--trsFrameToMenu-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}  
		/** 插入关系表
		INSERT INTO OM_MENU_REL_view_T (f_menu_id, f_view_id, f_parent_menu_id)				
		SELECT om_menu_s.NEXTVAL, a.f_view_id, c.f_menu_id
		FROM  OM_VIEW_T a, OM_FRAME_REL_VIEW_T b, om_menu_rel_frame_t c
		WHERE a.f_view_id = b.f_view_id AND b.f_frame_id = c.f_frame_id
		 */
		/**插入menu表
		INSERT INTO OM_MENU_T ( F_MENU_ID, F_MENU_NAME, F_SYSTEM_ID, F_MODULE_ID, F_MENU_TYPE,
			F_OPEN_METHOD, F_PAGE_LINK, F_LAYER, F_LOG, F_ORDER, F_IF_MY_WORK, F_INUSE,f_parent_menu_id,
			F_MENU_DESC, F_CONTAINER )							
		SELECT DISTINCT c.f_menu_id, a.F_VIEW_NAME,d.F_SYSTEM_ID,0,7,
			   0,a.F_PAGE_PATH,1,1,0,0,1,c.f_parent_menu_id,
			   a.F_DESCRIPTION,4
		FROM OM_VIEW_T a, OM_FRAME_REL_VIEW_T b, om_menu_rel_view_t c,OM_MENU_T d,om_menu_rel_frame_t e
		WHERE a.f_view_id = c.f_view_id AND a.f_view_id = b.f_view_id AND d.f_menu_id = e.f_menu_id
			  AND e.f_frame_id = b.f_frame_id
		 */
		return flag;
	}
	
	public int trsButtonToMenu() throws DataAccessException{
		int flag = 0;
		int code_rel = 0;
		int code_menu = 0;
		//将button信息插入OM_MENU_REL_BUTTON_T表
		StringBuffer buf_rel = new StringBuffer();
		buf_rel.append("INSERT INTO OM_MENU_REL_BUTTON_T (f_menu_id, f_button_id)" +
				" SELECT om_menu_s.NEXTVAL, f_button_id" +
				" FROM  OM_BUTTON_T  ");
		String sql_rel = buf_rel.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql_rel);
			code_rel = pstmt.executeUpdate();	
			//将button信息插入menu表
			StringBuffer buf_menu = new StringBuffer(); 
			buf_menu.append("INSERT INTO OM_MENU_T " +
					"( F_MENU_ID, F_MENU_NAME, F_SYSTEM_ID, F_MODULE_ID, F_MENU_TYPE," +
					" F_OPEN_METHOD, F_LAYER, F_LOG, F_ORDER, F_IF_MY_WORK, F_INUSE," +
					" f_parent_menu_id,F_MENU_DESC, F_CONTAINER )" +
					" SELECT a.f_menu_id, b.f_button_name, c.f_system_id, 0,8," +
					" 0,0,b.f_log_enabled,NULL,0,1,c.f_menu_id,b.f_button_desc,4" +
					" FROM om_menu_rel_button_t a, om_button_t b, om_menu_t c,om_menu_rel_window_t d" +
					" WHERE a.f_button_id = b.f_button_id AND c.f_menu_id = d.f_menu_id " +
					" AND d.f_window_id = b.f_window_id");
			String sql_menu = buf_menu.toString();		
			pstmt = conn.prepareStatement(sql_menu);
			code_menu = pstmt.executeUpdate();	
						
			if(code_rel != 0 && code_menu!=0 ){
				flag = 1;
			}
			
		}catch(SQLException e){
			flag = 0;
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"DataTransferDAOImpl--trsFrameToMenu-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			flag = 0;
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"DataTransferDAOImpl--trsFrameToMenu-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		} 
		return flag;
		/*
		INSERT INTO OM_MENU_REL_BUTTON_T (f_menu_id, f_button_id)				
		SELECT om_menu_s.NEXTVAL, f_button_id
		FROM  OM_BUTTON_T 
		*/
		/*
		INSERT INTO OM_MENU_T ( F_MENU_ID, F_MENU_NAME, F_SYSTEM_ID, F_MODULE_ID, F_MENU_TYPE,
			F_OPEN_METHOD, F_LAYER, F_LOG, F_ORDER, F_IF_MY_WORK, F_INUSE,f_parent_menu_id,
			F_MENU_DESC, F_CONTAINER )	
		SELECT a.f_menu_id, b.f_button_name, c.f_system_id, 0,8,
			0,0,b.f_log_enabled,NULL,0,1,c.f_menu_id,b.f_button_desc,4
		FROM om_menu_rel_button_t a, om_button_t b, om_menu_t c,om_menu_rel_window_t d
		WHERE a.f_button_id = b.f_button_id AND c.f_menu_id = d.f_menu_id AND d.f_window_id = b.f_window_id  
		 
		 */
	}
	
	


}
