package com.neusoft.tdframework.admin.login;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class LoginUserDAOImpl extends BaseDaoImpl implements LoginUserDAO {
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.admin.login.LoginUserDAO#delUserList(java.lang.String)
	 */
	public void delUserList(String sessionId,String citycode){
		int code = 1; //�ɹ�
		StringBuffer buf = new StringBuffer();
		buf.append("UPDATE om_login_userlist"); 
		buf.append(" set LOGOUTTIME = sysdate ");
		buf.append(" WHERE ID = ? and LOGOUTTIME is null and f_part_city = ? and f_part_mm = to_char(sysdate,'mm') ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,sessionId);
			pstmt.setString(2,citycode);
            
			pstmt.executeUpdate();
			
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"LoginUserDAOImpl--delUserList()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"LoginUserDAOImpl--delUserList()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		
	}
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.admin.login.LoginUserDAO#insertUserList(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.util.Date, java.util.Date, java.lang.String)
	 */
	public void insertUserList(String sessionId,String psName,String logType,String ipInfo,Date inDate,Date outDate,String citycode,String mac,String dnsname){
		int code = 1; //�ɹ�
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_login_userlist (");
		buf.append("f_part_city,f_part_mm,ID,PERSIONID,LOGINTYPE,IPADDRESS,");
		buf.append("LOGINTIME,LOGOUTTIME,LOCATION,macaddress,dnsname )");
		buf.append("values(");
		buf.append("?,to_char(sysdate,'mm'),?,?,?,?,");
        buf.append("sysdate,?,?,?,?)");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,citycode);
			pstmt.setString(2,sessionId);
			pstmt.setString(3,psName);
			pstmt.setString(4,logType);
			pstmt.setString(5,ipInfo);
			pstmt.setDate(6,null);
			pstmt.setString(7, citycode);
			pstmt.setString(8, mac);
			pstmt.setString(9, dnsname);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"LoginUserDAOImpl--insertUserList()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"LoginUserDAOImpl--insertUserList()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}  
		
	}
	public void doInsertLastLoginTime(String workNo){
		int code = 1; //�ɹ�
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_last_login_t ");
		buf.append(" (f_work_no, f_last_login_time) ");
		buf.append(" values (?,sysdate)");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,workNo);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"LoginUserDAOImpl--doInsertLastLoginTime()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"LoginUserDAOImpl--doInsertLastLoginTime()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		} 
	}
	public void doUpdateLastLoginTime(String workNo){
		int code = 1; //�ɹ�
		StringBuffer buf = new StringBuffer();
		buf.append("update om_last_login_t set f_last_login_time = sysdate where upper(f_work_no) = ?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,workNo.toUpperCase());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"LoginUserDAOImpl--doUpdateLastLoginTime()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"LoginUserDAOImpl--doUpdateLastLoginTime()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}  
	}
	
	public  boolean haveRecord(String workNo){
		boolean have = false;
		StringBuffer buf = new StringBuffer();
		buf.append("select count(*) from om_last_login_t where upper(f_work_no) = ?");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,workNo.toUpperCase());
			rest = pstmt.executeQuery();
			if(rest.next()){
				int count = rest.getInt(1);
				if(count > 0){
					have = true;
				}
			}
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"LoginUserDAOImpl--haveRecord()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"LoginUserDAOImpl--haveRecord()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}  
		return have;
	}
}
