package com.neusoft.om.dao.employee;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
/**brief description
 * <p>Date       : 2008-08-15</p>
 * <p>Module     : om</p>
 * <p>Description: employee maintance</p>
 * <p>Remark     : </p>
 * @author zhaof@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class IntEmployeeDAOImpl extends BaseDaoImpl implements IntEmployeeDAO {

	public int doInsertSynInfo(IntEmployeeVO vo, int operType) throws DataAccessException {
		int code = 1; //成功
		StringBuffer buf = new StringBuffer();
		buf.append("insert into inter_om_employee_t (");
		buf.append("f_work_no, f_employee_name, f_work_pwd, f_oper_type, pick_status)");
		buf.append(" values(?,?,?,?,0)");	
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			conn.setAutoCommit(true);
			pstmt.setString(1,vo.getWorkNo());
			pstmt.setString(2,vo.getEmployeeName());
			pstmt.setString(3,vo.getWorkPwd());
			pstmt.setInt(4, operType);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IntEmployeeDAOImpl--doInsertAddInfo()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IntEmployeeDAOImpl--doInsertAddInfo()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}  		
		return code;
	}


	public int getResult(IntEmployeeVO vo) throws DataAccessException {
		int result = -10;
        StringBuffer buf = new StringBuffer();
       
        buf.append("select pick_status from inter_om_employee_t where f_work_no = ? ");
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, vo.getWorkNo());
            rest = pstmt.executeQuery();  
            if(rest.next()){
            	result = rest.getInt(1);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"IntEmployeeDAOImpl--getResult-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"IntEmployeeDAOImpl--getResult-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }  
		return result;
	}

}                                                                                                                      