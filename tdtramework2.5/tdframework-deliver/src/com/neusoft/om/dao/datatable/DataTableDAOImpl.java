package com.neusoft.om.dao.datatable;

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
public class DataTableDAOImpl extends BaseDaoImpl implements DataTableDAO {

	public DataTableVO getDataTableInfoByTalbeName(String tableName) throws DataAccessException {
		DataTableVO vo = null;
		String sql = "select * from om_data_table_t where f_table_name = ?";
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,tableName);
			rest = pstmt.executeQuery();

			if(rest.next()) {
				vo = new DataTableVO();
				vo.setAttribute(rest);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataTableDAOImpl--getDataTableInfoByTalbeName-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataTableDAOImpl--getDataTableInfoByTalbeName-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}
	
	public DataTableColl getDataTableInfoByRoleId(int roleId) throws DataAccessException {
		DataTableVO vo = null;
		DataTableColl coll = new DataTableColl();
		String sql = "select * from om_data_table_t where f_table_name = ?";
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new DataTableVO();
				vo.setAttribute(rest);
				coll.addDataTableVO(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataTableDAOImpl--getDataTableInfoByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataTableDAOImpl--getDataTableInfoByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}

}
