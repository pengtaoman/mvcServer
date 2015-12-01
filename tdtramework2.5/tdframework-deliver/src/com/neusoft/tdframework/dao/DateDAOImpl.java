package com.neusoft.tdframework.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//import com.neusoft.om.OMAppContext;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**brief description
 * <p>Date       : 2004-10-25</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author liyj
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class DateDAOImpl extends BaseDaoImpl implements DateDAO { 
	
	public String getDate() throws DataAccessException {
		String date = "";

		String sql = "select to_char(sysdate,'yyyy-mm-dd hh24:mi:ss') from dual";
		Connection conn = null;
		PreparedStatement pstmt = null; 
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()) {
				date = rest.getString(1);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DateDAOImpl--getDate-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DateDAOImpl--getDate-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return date;
	}
	
}
