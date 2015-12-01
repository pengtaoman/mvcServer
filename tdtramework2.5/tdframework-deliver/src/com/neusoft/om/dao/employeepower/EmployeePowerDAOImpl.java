package com.neusoft.om.dao.employeepower;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

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
public class EmployeePowerDAOImpl extends BaseDaoImpl implements EmployeePowerDAO{
	
	/**
	 * 删除操作员角色信息
	 */
	public int doDeleteEmployeePowerInfo(String employeeId) throws DataAccessException {
		int code = 1;
		String sql ="delete from OM_EMPLOYEE_ROLE_RELATION_T where f_employee_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeePowerDAOImpl--doDeleteEmployeePowerInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	//	测试方法
	public static void main(String args[]){
		EmployeePowerDAO dao = (EmployeePowerDAO)OMAppContext.getBean(EmployeePowerDAO.BEAN);
//		try {
//			  System.out.println(dao.doAddEmployeePowerInfo("502","renhtest"));
//		}catch(DataAccessException e){
//			e.printStackTrace();
//		}
	}

	/* (non-Javadoc)
	 * @see com.neusoft.om.dao.employeepower.EmployeePowerDAO#doModifyEmployeePowerInfo(java.lang.String, int[])
	 */
	public int[] doAddEmployeePowerInfo(String employeeId, int[] roleIds) throws DataAccessException {
		int codes[] = new int[roleIds.length];
		
		String sql ="insert into OM_EMPLOYEE_ROLE_RELATION_T values(?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			for(int i=0;i<roleIds.length;i++) {
				pstmt.setString(1,employeeId);
				pstmt.setInt(2,roleIds[i]);
				codes[i] = pstmt.executeUpdate();
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeePowerDAOImpl--doDeleteEmployeePowerInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		
		return codes;			
	}
}
