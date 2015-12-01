package com.neusoft.om.dao.work;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.om.OMAppContext;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class WorkDAOImpl extends BaseDaoImpl implements WorkDAO {
	
	// 20050527 modify by renh ,为适应工作区的新需求,在om_work_t中配置一个权限的记录信息,用于
	// 生成页面的工作区菜单,改菜单点击后谈出各系统的页面,om_work_t中为各系统提供配置.
	//20050605 modify by renh ,增加工作区内容的配置
	public WorkColl getWorkInfoById(String systemId) throws DataAccessException {
		WorkColl coll = new WorkColl();
		WorkVO vo = null;
		//String sql = "SELECT * FROM om_work_t WHERE f_system_id = ?";
		String sql = "SELECT * FROM om_work_t WHERE f_system_id = 18 AND f_if_display = '1' order by F_WORK_MENU_ORDER ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			//pstmt.setString(1,systemId);
			rest = pstmt.executeQuery();
			while(rest.next()) {
				vo = new WorkVO();
				vo.setAttribute(rest);
				coll.addWorkVO(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"WorkDAOImpl--getWorkInfoById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"WorkDAOImpl--getWorkInfoById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public WorkColl getAllWorkInfoByEmployeeId(String parentMenuId,String employeeId) throws DataAccessException {
		WorkColl coll = new WorkColl();
		WorkVO vo = null;
		StringBuffer buf = new StringBuffer("");
		
		buf.append(" select * from om_work_t ");
		buf.append(" where f_parent_menu_id = ? ");
		buf.append(" and f_system_id in (  ");
		buf.append(" 	SELECT distinct n.f_system_id ");
		buf.append(" 	FROM( ");
		buf.append(" 		SELECT f_menu_id ");
		buf.append(" 		FROM om_func_role_t a,om_employee_role_relation_t b ");
		buf.append(" 		WHERE b.f_employee_id = ? ");
		buf.append(" 		AND a.f_role_id = b.f_role_id ");
		buf.append(" 		GROUP BY f_menu_id) e,om_menu_t n");
		buf.append(" 	WHERE e.f_menu_id = n.f_menu_id ");
		buf.append(" 	AND n.f_if_my_work = 0 ");
		buf.append(" 	AND n.F_INUSE = 1 ");
		buf.append(" 	AND n.f_menu_type <> 0)");
		buf.append(" order by f_system_id ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,parentMenuId);
			pstmt.setString(2,employeeId);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new WorkVO();
				vo.setAttribute(rest);
				coll.addWorkVO(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"WorkDAOImpl--getAllWorkInfoByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"WorkDAOImpl--getAllWorkInfoByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	//测试方法
	public static void main(String args[]){
		WorkDAO dao = (WorkDAO)OMAppContext.getBean(WorkDAO.BEAN);
		try {
			WorkColl coll = dao.getWorkInfoById("16");
		   	System.out.println(coll.getWork(0).getWorkMenuId());
		}catch(DataAccessException e){
			e.printStackTrace();
		}
	}	  
}
