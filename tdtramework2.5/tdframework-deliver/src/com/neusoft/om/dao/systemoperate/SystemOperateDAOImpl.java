package com.neusoft.om.dao.systemoperate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;

public class SystemOperateDAOImpl extends BaseDaoImpl implements SystemOperateDAO {

	public SystemOperateVO getSystemInfoById(String systemId)  throws DataAccessException{
		SystemOperateVO vo = null;
		String sql = "SELECT * FROM om_system_t WHERE f_system_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,systemId);
			rest = pstmt.executeQuery();
	
			while(rest.next()) {
				vo = new SystemOperateVO();
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

	public SystemOperateColl getAllSystemInfo()  throws DataAccessException{
		SystemOperateColl coll = new SystemOperateColl();
		String sql = "SELECT * FROM om_system_test order by f_system_id";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
	
			while(rest.next()) {
				SystemOperateVO vo = new SystemOperateVO();
				vo.setAttribute(rest);
				coll.addSystem(vo);
			}
		}catch(SQLException e){
			e.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}

	public SystemOperateColl getSystemInfoByEmployeeId(String employeeId)  throws DataAccessException{
		SystemOperateColl coll = new SystemOperateColl();
		SystemOperateVO vo;
		/*String sql = "SELECT DISTINCT a.f_system_id,b.f_system_name,b.f_system_type,b.f_detail_desc " +
			" FROM om_employee_power_t a,om_system_test b"+
			" WHERE a.f_employee_id = ?" +
			" AND a.F_INUSE = 1 " +
			" AND a.F_EXEC_STATUS = 1" +
			" AND b.f_system_type = 1" +
			" AND a.f_system_id = b.f_system_id";*/
		StringBuffer buf = new StringBuffer("");
		
		/*om_employee_t.f_employee_id-->om_employee_role_relation_t.f_role_id-->om_func_role_t.f_menu_id
		 * -->om_menu_t.f_system_id and f_system_type=1(BS struction)-->om_system_test.f_system_name.......
		 */
		buf.append(" SELECT DISTINCT (n.f_system_id),m.f_system_name,m.f_system_type,m.f_detail_desc");
		buf.append(" FROM( ");
		buf.append(" SELECT f_menu_id");
		buf.append(" FROM om_func_role_t a,om_employee_role_relation_t b");
		buf.append(" WHERE b.f_employee_id = ?");
		buf.append(" AND a.f_role_id = b.f_role_id");
		buf.append(" GROUP BY f_menu_id) e,om_menu_t n,om_system_test m");
		buf.append(" WHERE e.f_menu_id = n.f_menu_id");
		buf.append(" AND n.f_system_id = m.f_system_id");
		buf.append(" AND n.f_if_my_work = 0");
		buf.append(" AND n.F_INUSE = 1");
		buf.append(" AND n.f_menu_type <> 0");
		buf.append(" AND m.f_system_type = 1");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			rest = pstmt.executeQuery();
	
			while(rest.next()) {
				vo = new SystemOperateVO();
				vo.setAttribute(rest);
				coll.addSystem(vo);
			}
		}catch(SQLException e){
			e.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public SystemOperateColl getSystemInfoWeb()  throws DataAccessException{
		SystemOperateColl coll = new SystemOperateColl();
		String sql = "SELECT * FROM om_system_test where f_system_type = 1";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
	
			while(rest.next()) {
				SystemOperateVO vo = new SystemOperateVO();
				vo.setAttribute(rest);
				coll.addSystem(vo);
			}
		}catch(SQLException e){
			e.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}

	public int doAddSystemInfo(SystemOperateVO vo)  throws DataAccessException{
		int code = 1;
		String sql ="insert into om_system_test (f_system_id,f_system_name,f_system_type,f_detail_desc,F_PORTAL_WIN_ID ) values(?,?,?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getSystemId());
			pstmt.setString(2,vo.getSystemName());
			pstmt.setString(3,vo.getSystemType());
			pstmt.setString(4,vo.getDetailDesc());
			pstmt.setInt(5,vo.getPortalWinId());
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

	public int doModifySystemInfo(SystemOperateVO vo,String oldSystemId)  throws DataAccessException{
		int code = 1;
		String sql ="update om_system_test " +
					" set f_system_id = ?,f_system_name = ?,f_system_type = ?,f_detail_desc = ?,F_PORTAL_WIN_ID=?" +
					" where f_system_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getSystemId());
			pstmt.setString(2,vo.getSystemName());
			pstmt.setString(3,vo.getSystemType());
			pstmt.setString(4,vo.getDetailDesc());
			pstmt.setInt(5,vo.getPortalWinId());
			pstmt.setString(6,oldSystemId);
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

	public int doDeleteSystemInfo(String systemId)  throws DataAccessException{
		int code = 1;
		String sql ="delete from om_system_test where f_system_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,systemId);
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

	public SystemOperateVO getSystemInfoByName(String systemName)  throws DataAccessException{
		SystemOperateVO vo = new SystemOperateVO();
		String sql = "SELECT * FROM om_system_test WHERE f_system_name = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,systemName);
			rest = pstmt.executeQuery();
	
			while(rest.next()) {
				vo = new SystemOperateVO();
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
	


	

}