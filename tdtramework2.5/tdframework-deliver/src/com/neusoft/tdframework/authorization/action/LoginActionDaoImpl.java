package com.neusoft.tdframework.authorization.action;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.neusoft.om.omutil.PassWord;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class LoginActionDaoImpl extends BaseDaoImpl{
	
	public long getLastMobileCodePutTime(String workNo) throws DataAccessException {
		StringBuilder sbu = new StringBuilder();
		sbu.append("select F_SEND_TIME from CRM_MOBILE_VALIDATE_CODE_T where F_WORK_NO=? order by F_SEND_TIME desc");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, workNo.toUpperCase());
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				long lastsendtime = rest.getTimestamp("F_SEND_TIME").getTime();
				//System.out.println("========================== " + lastsendtime);
				return lastsendtime;
			} 
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getLastMobileCodePutTime-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getLastMobileCodePutTime-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return 0L;
		
	}
	
	public String getTelephoneForEmp(String workNo) throws DataAccessException {
		StringBuilder sbu = new StringBuilder();
		sbu.append("select F_MOBILE from om_employee_t where f_work_no=?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, workNo.toUpperCase());
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				String telNum = rest.getString("F_MOBILE");
				return telNum;
			} 
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PortalPageDAOImpl--getTelephoneForEmp-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getTelephoneForEmp-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return null;
		
	}
	
	public String getMobileCode(String workNo) {
		StringBuilder sbu = new StringBuilder();
		sbu.append("select F_MOBILE_CODE from CRM_MOBILE_VALIDATE_CODE_T where F_WORK_NO=? order by F_SEND_TIME desc");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, workNo.toUpperCase());
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				String mobileCode = rest.getString("F_MOBILE_CODE");
				return mobileCode;
			} 
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getLastMobileCodePutTime-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getLastMobileCodePutTime-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return null;
	}
	
	public void removeCode(String workNo) {
		StringBuilder sbu = new StringBuilder();
		sbu.append("delete CRM_MOBILE_VALIDATE_CODE_T where F_WORK_NO=?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, workNo.toUpperCase());
			pstmt.execute();
			
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--removeCode-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--removeCode-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
	}
	
	public void insertSEND_SMS_OUT_TAB(String tel, String mobileCode, String workNo) throws DataAccessException {
		StringBuilder sbu = new StringBuilder();
		
		sbu.append("insert into SEND_SMS_OUT_TAB (ROW_NO, SEND_TIME,DESTADDR,MESSAGE,DEAL_FLAG) values (SEQ_SEND_SMS_OUT_TAB.nextval,sysdate,?,?,?)");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		PreparedStatement pstmt1 = null;

		try {
			
			conn = getConnection();
			conn.setAutoCommit(false);
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, tel);
			pstmt.setString(2, "登录BSS系统的验证码为 :'"+mobileCode+"'");
			pstmt.setString(3, "0");
			pstmt.execute();
			
			StringBuilder sbu1 = new StringBuilder();
			sbu1.append("insert into CRM_MOBILE_VALIDATE_CODE_T (ROW_NO, F_WORK_NO,F_MOBILE_CODE,F_SEND_TIME) values (?,?,?,sysdate)");
			pstmt1 = conn.prepareStatement(sbu1.toString());
			pstmt1.setString(1, String.valueOf(new java.util.Date().getTime()));
			pstmt1.setString(2, workNo.toUpperCase());
			pstmt1.setString(3, mobileCode);
			pstmt1.execute();
			
			conn.commit();
			conn.setAutoCommit(true);

		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--insertSEND_SMS_OUT_TAB-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--insertSEND_SMS_OUT_TAB-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
	}
	
	public boolean isMobileCodeCity(String cityCode) throws Exception {
		StringBuilder sbu = new StringBuilder();
		
		sbu.append("select F_USE_MOBILE_FLAG from CRM_CITY_MOBILE_VALIDATE_T where F_CITY_CODE=?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		PreparedStatement pstmt1 = null;

		try {
			
			conn = getConnection();
			conn.setAutoCommit(false);
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, cityCode);
            rest = pstmt.executeQuery();
			
			if (rest.next()) {
				int flag = rest.getInt("F_USE_MOBILE_FLAG");
				if (flag == 1) {
					return true;
				} else {
					return false;
				}
			} 
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--isMobileCodeCity-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--isMobileCodeCity-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return false;
	}
	
	
	public String getCityForEmp(String workNo) throws DataAccessException {
		StringBuilder sbu = new StringBuilder();
		sbu.append("select F_CITY_CODE from om_employee_t where f_work_no=?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, workNo.toUpperCase());
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				String city = rest.getString("F_CITY_CODE");
				return city;
			} 
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getCityForEmp-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getCityForEmp-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return null;
		
	}
	
	public String getEmp(String workNo) throws DataAccessException {
		StringBuilder sbu = new StringBuilder();
		sbu.append("select F_WORK_PWD from om_employee_t where f_work_no=?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, workNo.toUpperCase());
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				String psw = rest.getString("F_WORK_PWD");
				psw = PassWord.decode(psw);
				
				return psw;
			} 
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getEmp-1:" + e.getMessage());
			//throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getEmp-2:" + e.getMessage());
			//throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return null;
		
	}
	
	public String getDueTime() throws DataAccessException {
		StringBuilder sbu = new StringBuilder();
		sbu.append("select F_MOBILE_DUE_TIME from CRM_MOBILE_VALIDATE_DUETIME_T");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				String dueTime = rest.getString("F_MOBILE_DUE_TIME");
				//System.out.println("???????????/////???????????????" + dueTime);
				return dueTime;
			} 
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getDueTime-1:" + e.getMessage());
			//throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--getDueTime-2:" + e.getMessage());
			//throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return null;
		
	}
	
	public List<ChangeUserVO> isPFNo(String workNo) {
		StringBuilder sbu = new StringBuilder();
		sbu.append("SELECT c.PF_WORK_NO,c.DS_WORK_NO,c.F_CITY_CODE, b.F_AREA_NAME,a.f_work_pwd FROM om_employee_t a, om_area_t b, OM_WORKNO_RELATION c WHERE c.f_city_code = b.f_city_code AND a.f_work_no = c.pf_work_no and a.f_work_no = ?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, workNo.toUpperCase());
			rest = pstmt.executeQuery();
			List<ChangeUserVO> ret = new ArrayList<ChangeUserVO>();
			while (rest.next()) {
				ChangeUserVO cu = new ChangeUserVO();
				cu.setPfWorkNo(rest.getString("PF_WORK_NO"));
				cu.setDsWorkNo(rest.getString("DS_WORK_NO"));
				cu.setCityCode(rest.getString("F_CITY_CODE"));
				cu.setAreaName(rest.getString("F_AREA_NAME"));
				String psw = rest.getString("f_work_pwd");
				psw = PassWord.decode(psw);
				cu.setPwd(psw);
				ret.add(cu);
				
			} 

			return ret;
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--isPFNo-1:" + e.getMessage());
			//throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--isPFNo-2:" + e.getMessage());
			//throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return null;
	}
	
	public boolean canChangeUserLogin(String workNo) {
		StringBuilder sbu = new StringBuilder();
		sbu.append("select distinct DS_WORK_NO,F_CITY_CODE FROM OM_WORKNO_RELATION where DS_WORK_NO=?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, workNo.toUpperCase());
			rest = pstmt.executeQuery();
			while (rest.next()) {
				
				String cityCode = rest.getString("F_CITY_CODE");
				if (!"018".equals(cityCode)) {
					return false;
				}
				
			} 

		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--isPFNo-1:" + e.getMessage());
			//throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"LoginActionDaoImpl--isPFNo-2:" + e.getMessage());
			//throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return true;
	}
	

}
