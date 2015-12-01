package com.neusoft.om.dao.datatablefield;

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
public class DataTableFieldDAOImpl extends BaseDaoImpl implements DataTableFieldDAO{

	public DataTableFieldVO getDataTableFieldInfoByTableName(String tableName) throws DataAccessException {
		DataTableFieldVO vo = null;
		DataTableFieldColl coll = new DataTableFieldColl();
		String sql = "select * from om_data_table_field_t where f_table_name = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,tableName);
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new DataTableFieldVO();
				vo.setAttribute(rest);
				coll.addDataTableFieldVO(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataTableFieldDAOImpl--getDataTableFieldInfoByTableName-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataTableFieldDAOImpl--getDataTableFieldInfoByTableName-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);		
		}	
		return null;
	}
}
