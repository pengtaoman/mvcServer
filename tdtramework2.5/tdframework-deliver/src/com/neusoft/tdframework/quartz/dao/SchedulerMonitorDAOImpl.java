package com.neusoft.tdframework.quartz.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class SchedulerMonitorDAOImpl  extends BaseDaoImpl implements SchedulerMonitorDAO {
	

	public Map<String,String> getSchedulerWar() throws DataAccessException {
		StringBuilder sbu = new StringBuilder();
		sbu.append("select b.SCHEDULER_NAME, a.WAR_HTTP from BB_CRM_SERVER_CONF_T a, BB_CRM_WAR_CONF_T b where a.WAR_INSTANCE=b.WAR_INSTANCE ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		Map<String,String> returnMap = new HashMap<String,String>();
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				String schedulerName = rest.getString("SCHEDULER_NAME");
				String warHttp = rest.getString("WAR_HTTP");
				
				returnMap.put(schedulerName, warHttp);
			} 
			return returnMap;
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"SchedulerMonitorDAOImpl--getSchedulerWar-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"SchedulerMonitorDAOImpl--getSchedulerWar-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
	}

	
	public List<String> getHttpWars() throws DataAccessException {
		StringBuilder sbu = new StringBuilder();
		sbu.append("select distinct(WAR_HTTP) as WAR_HTTP from BB_CRM_SERVER_CONF_T");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		List<String> returnLst = new ArrayList<String>();
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				String warHttp = rest.getString("WAR_HTTP");
				
				returnLst.add(warHttp);
			} 
			return returnLst;
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"SchedulerMonitorDAOImpl--getHttpWars-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"SchedulerMonitorDAOImpl--getHttpWars-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
	}
	
	public boolean updateWar(String scheName, String httpwar) throws DataAccessException {
		StringBuilder sbu = new StringBuilder();
		sbu.append("update BB_CRM_WAR_CONF_T ");
		sbu.append("set WAR_INSTANCE=(select WAR_INSTANCE from BB_CRM_SERVER_CONF_T where war_http=?)");
		sbu.append("where scheduler_name=?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sbu.toString());
			pstmt.setString(1, httpwar);
			pstmt.setString(2, scheName);
			pstmt.executeUpdate();
			return true;
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"SchedulerMonitorDAOImpl--updateWar-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"SchedulerMonitorDAOImpl--updateWar-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
	}
}
