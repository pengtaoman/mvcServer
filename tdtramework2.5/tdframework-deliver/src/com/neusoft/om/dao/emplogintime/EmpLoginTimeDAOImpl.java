package com.neusoft.om.dao.emplogintime;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class EmpLoginTimeDAOImpl extends BaseDaoImpl implements EmpLoginTimeDAO{

	public EmpLoginTimeColl getEmpLoginTime() {
		
		EmpLoginTimeColl coll = new EmpLoginTimeColl();
		EmpLoginTimeVO vo = null;
		String sql = "select * from om_emp_login_time_t ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
	
			while(rest.next()){
				vo = new EmpLoginTimeVO();
				vo.setAttribute(rest);
				coll.addEmpLoginTime(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpLoginTimeDAOImpl--getEmpLoginTime-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpLoginTimeDAOImpl--getEmpLoginTime-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;	
	}


	public int doAddEmpLoginTime(EmpLoginTimeVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_emp_login_time_t " +
				"(LOG_ID,WORK_NO,START_DATE,START_TIME,	END_DATE,END_TIME,FORCE_FLAG," +
				"detail_desc,UPDATE_DATE, UPDATE_EMP,UPDATE_ORGAN) " +
				"values(?,?,TO_DATE(?,'yyyy-mm-dd'),?,TO_DATE(?,'yyyy-mm-dd'),?,?,?,sysdate,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getLogId());
			pstmt.setString(2,vo.getWorkNo());
			pstmt.setString(3,vo.getStartDate());
			pstmt.setString(4,vo.getStartTime());
			pstmt.setString(5,vo.getEndDate());
			pstmt.setString(6,vo.getEndTime());
			pstmt.setInt(7,vo.getForceFlag());
			pstmt.setString(8,vo.getDetailDesc());			
			pstmt.setString(9,vo.getUpdateEmp());
			pstmt.setString(10,vo.getUpdateOrgan());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpLoginTimeDAOImpl--doAddEmpLoginTime-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpLoginTimeDAOImpl--doAddEmpLoginTime-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public EmpLoginTimeVO getEmpLoginTimeVO(String logId, String workNo) throws DataAccessException {
		EmpLoginTimeVO vo = new EmpLoginTimeVO();
		StringBuffer sqlBuf = new StringBuffer();
		sqlBuf.append("select a.*, c.f_employee_name employeename, " +
				" d.f_organ_name updateorganname, e.f_employee_name updateemployeename" +
				" from om_emp_login_time_t a, om_employee_t c, om_organ_t d, om_employee_t e  " +
				" where d.f_organ_id = a.update_organ and e.f_employee_id = a.update_emp ");
		if(logId != null && !logId.trim().equals("")){
			sqlBuf.append(" and a.log_id = '"+logId+"'");
		}
		if(workNo != null && !workNo.trim().equals("")){
			sqlBuf.append(" and a.work_no = '" + workNo + "'");
		}
		String sql = sqlBuf.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
	
			while(rest.next()){
				vo = new EmpLoginTimeVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpLoginTimeDAOImpl--getEmpLoginTimeVO-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpLoginTimeDAOImpl--getEmpLoginTimeVO-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	public int doModifyEmpLoginTime(EmpLoginTimeVO vo,String priLogId, String priWorkNo) throws DataAccessException {
		int code = 1;
		String sql =" UPDATE om_emp_login_time_t SET LOG_ID=?,WORK_NO=?, START_DATE = TO_DATE(?,'yyyy-mm-dd'),START_TIME = ? ," +
				" END_DATE = TO_DATE(?,'yyyy-mm-dd'), END_TIME=?, FORCE_FLAG = ?, detail_desc = ?,"+
				" UPDATE_DATE = sysdate, UPDATE_EMP = ?, UPDATE_ORGAN = ? "+
				" WHERE LOG_ID=? AND  WORK_NO=?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getLogId());
			pstmt.setString(2,vo.getWorkNo());
			pstmt.setString(3,vo.getStartDate());
			pstmt.setString(4,vo.getStartTime());
			pstmt.setString(5,vo.getEndDate());
			pstmt.setString(6,vo.getEndTime());
			pstmt.setInt(7,vo.getForceFlag());
			pstmt.setString(8,vo.getDetailDesc());
			pstmt.setString(9,vo.getUpdateEmp());
			pstmt.setString(10,vo.getUpdateOrgan());
			pstmt.setString(11,priLogId);
			pstmt.setString(12,priWorkNo);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpLoginTimeDAOImpl--doModifyEmpLoginTime-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpLoginTimeDAOImpl--doModifyEmpLoginTime-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteEmpLoginTime(String logId, String workNo) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_emp_login_time_t where log_id = ?  and work_no = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,logId);
			pstmt.setString(2,workNo);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpLoginTimeDAOImpl--doDeleteEmpLoginTime-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpLoginTimeDAOImpl--doDeleteEmpLoginTime-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
    // 获取结果集
    public List getEmpLoginTimeList(int beginNum, int endNum) throws DataAccessException {
        EmpLoginTimeVO vo = null;
        List list = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from (");
        sqlBuf.append(" select rownum rowcound,a.log_id,a.work_no, a.start_date,a.start_time," +
        		"a.end_date,a.end_time,a.FORCE_FLAG,a.detail_desc,a.UPDATE_DATE, a.UPDATE_EMP,a.UPDATE_ORGAN," +
        		" c.f_employee_name employeename, d.f_organ_name updateOrganName," +
        		" e.f_employee_name updateEmployeeName" +
        		" from om_emp_login_time_t a, om_employee_t c, om_organ_t d, om_employee_t e" +
        		" where upper(a.work_no) = upper(c.f_work_no) " +
        		"and d.f_organ_id = a.update_organ and e.f_employee_id = a.update_emp and rownum <").append(endNum);
        sqlBuf.append(" ) ");
        sqlBuf.append("where rowcound >= ").append(beginNum);
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new EmpLoginTimeVO();
                vo.setAttribute(rest);
                list.add(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "EmpLoginTimeDAOImpl--getEmpLoginTimeList()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "EmpLoginTimeDAOImpl--getEmpLoginTimeList()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return list;
    }
    // 查询om_emp_login_time_t 总记录数
    public int getRowCount() throws DataAccessException {
        int allRows = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from om_emp_login_time_t a, om_employee_t b where upper(a.work_no) = upper(b.f_work_no) ");
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            rest = pstmt.executeQuery();
            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "EmpLoginTimeDAOImpl--getRowCount()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "EmpLoginTimeDAOImpl--getRowCount()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return allRows;
    }
}
