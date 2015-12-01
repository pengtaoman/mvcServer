/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.dao.dutypower;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;
/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class DutyPowerDAOImpl extends BaseDaoImpl  implements DutyPowerDAO{

	public int doAddDutyPower(int dutyId,DutyPowerColl coll) throws DataAccessException {
		int code = 1;//³É¹¦
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_duty_power_t ");
		buf.append(" (f_duty_id,f_menu_id,f_admin_status,f_exec_status ) ");
		buf.append(" values(?,?,?,?)");
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			if(coll !=null){
				for(int i=0;i<coll.getRowCount();i++){
					pstmt.setInt(1,coll.getDutyPower(i).getDutyId());
					pstmt.setString(2,coll.getDutyPower(i).getMenuId());
					pstmt.setInt(3,coll.getDutyPower(i).getAdminStatus());
					pstmt.setInt(4,coll.getDutyPower(i).getExecStatus());
					pstmt.addBatch();
				}
				pstmt.executeBatch();
			}
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyPowerDAOImpl--doAddDutyPower-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyPowerDAOImpl--doAddDutyPower-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteDutyPower(int dutyId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_duty_power_t where f_duty_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,dutyId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyPowerDAOImpl--doDeleteDutyPower-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyPowerDAOImpl--doDeleteDutyPower-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

}
