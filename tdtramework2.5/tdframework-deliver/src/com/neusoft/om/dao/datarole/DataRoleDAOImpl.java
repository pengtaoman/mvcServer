package com.neusoft.om.dao.datarole;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
public class DataRoleDAOImpl extends BaseDaoImpl implements DataRoleDAO{

	public DataRoleColl getDataRoleInfoByRoleId(int roleId) throws DataAccessException {
		DataRoleVO vo = null;
		DataRoleColl coll = new DataRoleColl();
		String sql = "select * from om_data_role_t where f_role_id = ?";

		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new DataRoleVO();
				vo.setAttribute(rest);
				coll.addDataRoleVO(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataRoleDAOImpl--getDataRoleInfoByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataRoleDAOImpl--getDataRoleInfoByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}

	public int doAddDataRoleInfo(DataRoleVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_data_role_t (f_role_id,f_table_name,f_field_list,f_expression,f_expression_desc,f_admin_status,f_exec_status ) values(?,?,?,?,?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getRoleId());
			pstmt.setString(2,vo.getTableName());
			pstmt.setString(3,vo.getFieldList());
			pstmt.setString(4,vo.getExpression());
			pstmt.setString(5,vo.getExpressionDesc());
			pstmt.setInt(6,vo.getAdminStatus());
			pstmt.setInt(7,vo.getExecStatus());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataRoleDAOImpl--modifyAreaInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataRoleDAOImpl--modifyAreaInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return code;
	}
	
	public int doModifyDataRoleInfo(DataRoleVO vo) throws DataAccessException {
		int code = 1;
		String sql ="update om_data_role_t " +
			" set f_role_id = ?,f_table_name = ?,f_field_list = ?," +
			" f_expression = ?,f_expression_desc = ?,f_admin_status = ?,f_exec_status = ?" +
			" where f_role_id = ? and f_table_name = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getRoleId());
			pstmt.setString(2,vo.getTableName());
			pstmt.setString(3,vo.getFieldList());
			pstmt.setString(4,vo.getExpression());
			pstmt.setString(5,vo.getExpressionDesc());
			pstmt.setInt(6,vo.getAdminStatus());
			pstmt.setInt(7,vo.getExecStatus());
			pstmt.setInt(8,vo.getRoleId());
			pstmt.setString(9,vo.getTableName());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataRoleDAOImpl--doModifyDataRoleInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataRoleDAOImpl--doModifyDataRoleInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return code;
	}
	
	public int doDeleteDataRoleByRoleId(int roleId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_data_role_t where f_role_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataRoleDAOImpl--doDeleteDataRoleByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataRoleDAOImpl--doDeleteDataRoleByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return code;
	}

	public int doDeleteDataRoleByRoleIdTableName(int roleId, String tableName) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_data_role_t where f_role_id = ? anf f_table_name = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			pstmt.setString(2,tableName);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataRoleDAOImpl--doDeleteDataRoleByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataRoleDAOImpl--doDeleteDataRoleByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return code;
	}

}
