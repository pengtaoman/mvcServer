package com.neusoft.om.dao.empiplimit;

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

public class EmpIpLimitDAOImpl extends BaseDaoImpl implements EmpIpLimitDAO{

	public EmpIpLimitColl getEmpIpLimit() {
		
		EmpIpLimitColl coll = new EmpIpLimitColl();
		EmpIpLimitVO vo = null;
		String sql = "select * from om_emp_ip_limit_t ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
	
			while(rest.next()){
				vo = new EmpIpLimitVO();
				vo.setAttribute(rest);
				coll.addIpLimit(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpIpLimitDAOImpl--getEmpIpLimit-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpIpLimitDAOImpl--getEmpIpLimit-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;	
	}


	public int doAddEmpIpLimit(EmpIpLimitVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_emp_ip_limit_t " +
				"(WORK_NO,IP_START_ADD,IP_END_ADD,AREA_ID,FORCE_FLAG," +
				"detail_desc,UPDATE_DATE, UPDATE_EMP,UPDATE_ORGAN) " +
				"values(?,?,?,?,?,?,sysdate,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getWorkNo());
			pstmt.setString(2,vo.getIpStartAdd());
			pstmt.setString(3,vo.getIpEndAdd());
			pstmt.setString(4,vo.getAreaId());
			pstmt.setInt(5,vo.getForceFlag());
			pstmt.setString(6,vo.getDetailDesc());			
			pstmt.setString(7,vo.getUpdateEmp());
			pstmt.setString(8,vo.getUpdateOrgan());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpIpLimitDAOImpl--doAddEmpIpLimit-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpIpLimitDAOImpl--doAddEmpIpLimit-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public EmpIpLimitVO getEmpIpLimitVO(String workNo, String ipStartAdd, String ipEndAdd) throws DataAccessException {
		EmpIpLimitVO vo = new EmpIpLimitVO();
		StringBuffer sqlBuf = new StringBuffer();
		sqlBuf.append("select a.*, b.f_area_name  area_name, c.f_employee_name employeename, " +
				" d.f_organ_name updateorganname, e.f_employee_name updateemployeename" +
				" from om_emp_ip_limit_t a, om_area_t b,om_employee_t c, om_organ_t d, om_employee_t e  " +
				" where a.area_id = b.f_area_id  " +
				" and d.f_organ_id = a.update_organ and e.f_employee_id = a.update_emp ");
		if(ipStartAdd != null && !ipStartAdd.trim().equals("")){
			sqlBuf.append(" and a.ip_start_add = '"+ipStartAdd+"'");
		}
		if(ipEndAdd != null && !ipEndAdd.trim().equals("")){
			sqlBuf.append(" and a.ip_end_add = '" + ipEndAdd + "'");
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
				vo = new EmpIpLimitVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpIpLimitDAOImpl--getEmpIpLimit-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpIpLimitDAOImpl--getEmpIpLimit-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	public int doModifyEmpIpLimit(EmpIpLimitVO vo,String workNo, String priStartAdd, String priEndAdd) throws DataAccessException {
		int code = 1;
		String sql =" update om_emp_ip_limit_t set WORK_NO=?, IP_START_ADD = ?,IP_END_ADD = ? ," +
				" AREA_ID = ?, FORCE_FLAG = ?, detail_desc = ?,"+
				" UPDATE_DATE = sysdate, UPDATE_EMP = ?, UPDATE_ORGAN = ? "+
				" where WORK_NO=? and IP_START_ADD = ?  and IP_END_ADD = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getWorkNo());
			pstmt.setString(2,vo.getIpStartAdd());
			pstmt.setString(3,vo.getIpEndAdd());
			pstmt.setString(4,vo.getAreaId());
			pstmt.setInt(5,vo.getForceFlag());
			pstmt.setString(6,vo.getDetailDesc());
			pstmt.setString(7,vo.getUpdateEmp());
			pstmt.setString(8,vo.getUpdateOrgan());
			pstmt.setString(9,workNo);
			pstmt.setString(10,priStartAdd);
			pstmt.setString(11,priEndAdd);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpIpLimitDAOImpl--doModifyIpLimit-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpIpLimitDAOImpl--doModifyIpLimit-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteEmpIpLimit(String workNo, String priStartAdd, String priEndAdd) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_emp_ip_limit_t where IP_START_ADD = ?  and IP_END_ADD = ? and work_No=?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,priStartAdd);
			pstmt.setString(2,priEndAdd);
			pstmt.setString(3, workNo);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpIpLimitDAOImpl--doDeleteEmpIpLimit-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmpIpLimitDAOImpl--doDeleteEmpIpLimit-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
    // 获取结果集
    public List getEmpIpLimitList(int beginNum, int endNum) throws DataAccessException {
        EmpIpLimitVO vo = null;
        List list = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from (");
        sqlBuf.append(" select rownum rowcound,a.work_no, a.IP_START_ADD,a.IP_END_ADD," +
        		"a.AREA_ID,a.FORCE_FLAG,a.detail_desc,a.UPDATE_DATE, a.UPDATE_EMP,a.UPDATE_ORGAN," +
        		"b.f_area_name area_name,c.f_employee_name employeename, d.f_organ_name updateOrganName," +
        		" e.f_employee_name updateEmployeeName" +
        		" from om_emp_ip_limit_t a, om_area_t b, om_employee_t c, om_organ_t d, om_employee_t e" +
        		" where a.area_id = b.f_area_id and upper(a.work_no) = upper(c.f_work_no) " +
        		"and d.f_organ_id = a.update_organ and e.f_employee_id = a.update_emp and rownum <").append(endNum);
        sqlBuf.append(" ) ");
        sqlBuf.append("where rowcound >= ").append(beginNum);
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new EmpIpLimitVO();
                vo.setAttribute(rest);
                list.add(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "EmpIpLimitDAOImpl--getEmpIpLimitList()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "EmpIpLimitDAOImpl--getEmpIpLimitList()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return list;
    }
    // 查询om_ip_limit_t 总记录数
    public int getRowCount() throws DataAccessException {
        int allRows = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from om_emp_ip_limit_t ");
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            rest = pstmt.executeQuery();
            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "EmpIpLimitDAOImpl--getRowCount()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "EmpIpLimitDAOImpl--getRowCount()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return allRows;
    }
}
