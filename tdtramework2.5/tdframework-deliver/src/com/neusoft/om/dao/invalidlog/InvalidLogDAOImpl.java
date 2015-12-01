package com.neusoft.om.dao.invalidlog;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.Map;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class InvalidLogDAOImpl extends BaseDaoImpl implements InvalidLogDAO{
	
	public InvalidLogColl getInvalidLogColl(Map map, int startLine, int endLine) throws DataAccessException {
		InvalidLogColl logColl = new InvalidLogColl();
		String partCity = (String)map.get("partCity");
        String workNo = (String)map.get("workNo");
        String startTime = (String)map.get("startTime");
        String endTime = (String)map.get("endTime");
        StringBuffer buf = new StringBuffer();
        buf.append(" select * from (");
        buf.append(" select b.f_work_no, b.f_time, rownum rowcount ");
        buf.append(" from om_employee_t a, om_invalid_emp_log_t b ");
        buf.append(" where upper(a.f_work_no) = upper(b.f_work_no)");
        if(partCity != null && !partCity.equals("")){
        	buf.append(" and a.f_area_id like ? ");
        }
        if(workNo != null && !workNo.equals("")){
        	buf.append(" and b.f_work_no like ? ");
        }    
        if(startTime != null && !startTime.equals("")){
        	buf.append("and b.f_time >= to_date(?,'yyyy-MM-dd')");
        }
        if(endTime != null && !endTime.equals("")){
        	buf.append(" and b.f_time <= to_date(?,'yyyy-MM-dd')+1 ");
        }       
        
        buf.append(" and rownum < ? ) where rowcount >= ?");
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i=1;
			
	        if(partCity != null && !partCity.equals("")){
	        	pstmt.setString(i++, partCity+"%");
	        }
	        if(workNo != null && !workNo.equals("")){
	        	pstmt.setString(i++, "%"+workNo+"%");
	        }    
	        if(startTime != null && !startTime.equals("")){
	        	pstmt.setString(i++, startTime);
	        }
	        if(endTime != null && !endTime.equals("")){
	        	pstmt.setString(i++, endTime);
	        }
	        pstmt.setInt(i++, endLine);
	        pstmt.setInt(i++, startLine);
	        rest = pstmt.executeQuery();
	        while(rest.next()){
	        	InvalidLogVO vo = new InvalidLogVO();
	        	vo.setAttribute(rest);
	        	logColl.addInvalidLog(vo);
	        }
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"InvalidLogDAOImpl--getInvalidLogColl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"InvalidLogDAOImpl--getInvalidLogColl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}		
		return logColl;
	}

	public int getInvalidLogCount(Map map) throws DataAccessException {
		int count = 0;
		String partCity = (String)map.get("partCity");
        String workNo = (String)map.get("workNo");
        String startTime = (String)map.get("startTime");
        String endTime = (String)map.get("endTime");
        StringBuffer buf = new StringBuffer();
        buf.append(" select count(*) from (");
        buf.append(" select b.f_work_no, b.f_time, rownum rowcount ");
        buf.append(" from om_employee_t a, om_invalid_emp_log_t b ");
        buf.append(" where upper(a.f_work_no) = upper(b.f_work_no)");
        if(partCity != null && !partCity.equals("")){
        	buf.append(" and a.f_area_id like ? ");
        }
        if(workNo != null && !workNo.equals("")){
        	buf.append(" and b.f_work_no like ? ");
        }    
        if(startTime != null && !startTime.equals("")){
        	buf.append(" and b.f_time >= to_date(?,'yyyy-MM-dd')");
        }
        if(endTime != null && !endTime.equals("")){
        	buf.append(" and b.f_time <= to_date(?,'yyyy-MM-dd')+1 ");
        }   
        buf.append(" ) ");
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i=1;
			
	        if(partCity != null && !partCity.equals("")){
	        	pstmt.setString(i++, partCity+"%");
	        }
	        if(workNo != null && !workNo.equals("")){
	        	pstmt.setString(i++, "%"+workNo+"%");
	        }    
	        if(startTime != null && !startTime.equals("")){
	        	pstmt.setString(i++, startTime);
	        }
	        if(endTime != null && !endTime.equals("")){
	        	pstmt.setString(i++, endTime);
	        }
	        rest = pstmt.executeQuery();
	        if(rest.next()){
	        	count = rest.getInt(1);
	        }
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"InvalidLogDAOImpl--getInvalidLogCount-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"InvalidLogDAOImpl--getInvalidLogCount-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}		
		return count;
	}
	
	public InvalidLogColl getInvalidLog(Map map) throws DataAccessException{
		InvalidLogColl logColl = new InvalidLogColl();
		String partCity = (String)map.get("partCity");
        String workNo = (String)map.get("workNo");
        String startTime = (String)map.get("startTime");
        String endTime = (String)map.get("endTime");
        StringBuffer buf = new StringBuffer();
        buf.append(" select b.f_work_no, b.f_time, rownum rowcount ");
        buf.append(" from om_employee_t a, om_invalid_emp_log_t b ");
        buf.append(" where upper(a.f_work_no) = upper(b.f_work_no)");
        if(partCity != null && !partCity.equals("")){
        	buf.append(" and a.f_area_id like ? ");
        }
        if(workNo != null && !workNo.equals("")){
        	buf.append(" and b.f_work_no like ? ");
        }    
        if(startTime != null && !startTime.equals("")){
        	buf.append("and b.f_time >= to_date(?,'yyyy-MM-dd')");
        }
        if(endTime != null && !endTime.equals("")){
        	buf.append(" and b.f_time <= to_date(?,'yyyy-MM-dd')+1 ");
        }       
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i=1;
			
	        if(partCity != null && !partCity.equals("")){
	        	pstmt.setString(i++, partCity+"%");
	        }
	        if(workNo != null && !workNo.equals("")){
	        	pstmt.setString(i++, "%"+workNo+"%");
	        }    
	        if(startTime != null && !startTime.equals("")){
	        	pstmt.setString(i++, startTime);
	        }
	        if(endTime != null && !endTime.equals("")){
	        	pstmt.setString(i++, endTime);
	        }
	        rest = pstmt.executeQuery();
	        while(rest.next()){
	        	InvalidLogVO vo = new InvalidLogVO();
	        	vo.setAttribute(rest);
	        	logColl.addInvalidLog(vo);
	        }
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"InvalidLogDAOImpl--getInvalidLog-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"InvalidLogDAOImpl--getInvalidLog-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}		
		return logColl;
	}

}
