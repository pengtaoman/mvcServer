package com.neusoft.om.dao.iplimit;

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

public class IpLimitDAOImpl extends BaseDaoImpl implements IpLimitDAO{

	public IpLimitColl getIpLimit() {
		
		IpLimitColl coll = new IpLimitColl();
		IpLimitVO vo = null;
		String sql = "select * from om_ip_limit_t ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
	
			while(rest.next()){
				vo = new IpLimitVO();
				vo.setAttribute(rest);
				coll.addIpLimit(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpLimitDAOImpl--getIpLimit-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpLimitDAOImpl--getIpLimit-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;	
	}


	public int doAddIpLimit(IpLimitVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_ip_limit_t " +
				"(IP_START_ADD,IP_END_ADD,TERMINAL,LOGIN_FLAG,AREA_ID,ORGAN_ID,FORCE_FLAG," +
				"detail_desc,UPDATE_DATE, UPDATE_EMP,UPDATE_ORGAN) " +
				"values(?,?,?,?,?,?,?,?,sysdate,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getIpStartAdd());
			pstmt.setString(2,vo.getIpEndAdd());
			pstmt.setString(3,vo.getTerminal());
			pstmt.setInt(4, vo.getLoginFlag());
			pstmt.setString(5,vo.getAreaId());
			pstmt.setString(6,vo.getOrganId());
			pstmt.setInt(7,vo.getForceFlag());
			pstmt.setString(8,vo.getDetailDesc());			
			pstmt.setString(9,vo.getUpdateEmp());
			pstmt.setString(10,vo.getUpdateOrgan());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpLimitDAOImpl--doAddIpLimit-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpLimitDAOImpl--doAddIpLimit-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public IpLimitVO getIpLimitVO(String ipStartAdd, String ipEndAdd) throws DataAccessException {
		IpLimitVO vo = new IpLimitVO();
		StringBuffer sqlBuf = new StringBuffer();
		sqlBuf.append("select a.*, c.f_organ_name organ_name , b.f_area_name  area_name, " +
				" d.f_organ_name updateorganname, e.f_employee_name updateemployeename" +
				" from om_ip_limit_t a, om_area_t b, om_organ_t c, om_organ_t d, om_employee_t e  " +
				" where a.area_id = b.f_area_id and a.organ_id = c.f_organ_id " +
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
				vo = new IpLimitVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpLimitDAOImpl--getIpLimit-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpLimitDAOImpl--getIpLimit-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	public int doModifyIpLimit(IpLimitVO vo,String priStartAdd, String priEndAdd) throws DataAccessException {
		int code = 1;
		String sql =" update om_ip_limit_t set IP_START_ADD = ?,IP_END_ADD = ? ,TERMINAL=? ," +
				" LOGIN_FLAG = ?, AREA_ID = ?, ORGAN_ID = ?, FORCE_FLAG = ?, detail_desc = ?,"+
				" UPDATE_DATE = sysdate, UPDATE_EMP = ?, UPDATE_ORGAN = ? "+
				" where IP_START_ADD = ?  and IP_END_ADD = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getIpStartAdd());
			pstmt.setString(2,vo.getIpEndAdd());
			pstmt.setString(3,vo.getTerminal());
			pstmt.setInt(4, vo.getLoginFlag());
			pstmt.setString(5,vo.getAreaId());
			pstmt.setString(6,vo.getOrganId());
			pstmt.setInt(7,vo.getForceFlag());
			pstmt.setString(8,vo.getDetailDesc());
			pstmt.setString(9,vo.getUpdateEmp());
			pstmt.setString(10,vo.getUpdateOrgan());
			pstmt.setString(11,priStartAdd);
			pstmt.setString(12,priEndAdd);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpLimitDAOImpl--doModifyIpLimit-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpLimitDAOImpl--doModifyIpLimit-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteIpLimit(String priStartAdd, String priEndAdd) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_ip_limit_t where IP_START_ADD = ?  and IP_END_ADD = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,priStartAdd);
			pstmt.setString(2,priEndAdd);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpLimitDAOImpl--doDeleteIpLimit-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpLimitDAOImpl--doDeleteIpLimit-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
    // 获取 om_ip_limit_t 的结果集
    public List getIpLimitList(int beginNum, int endNum) throws DataAccessException {
        IpLimitVO vo = null;
        List list = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from (");
        sqlBuf.append(" select rownum rowcound,a.IP_START_ADD,a.IP_END_ADD,a.TERMINAL,a.LOGIN_FLAG," +
        		"a.AREA_ID,a.ORGAN_ID,a.FORCE_FLAG,a.detail_desc,a.UPDATE_DATE, a.UPDATE_EMP,a.UPDATE_ORGAN," +
        		"b.f_area_name area_name, c.f_organ_name organ_name, d.f_organ_name updateOrganName," +
        		" e.f_employee_name updateEmployeeName" +
        		" from om_ip_limit_t a, om_area_t b, om_organ_t c, om_organ_t d, om_employee_t e" +
        		" where a.area_id = b.f_area_id and a.organ_id = c.f_organ_id " +
        		"and d.f_organ_id = a.update_organ and e.f_employee_id = a.update_emp and rownum <").append(endNum);
        sqlBuf.append(" ) ");
        sqlBuf.append("where rowcound >= ").append(beginNum);
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new IpLimitVO();
                vo.setAttribute(rest);
                list.add(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "IpLimitDAOImpl--getIpLimitList()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "IpLimitDAOImpl--getIpLimitList()-2:"
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
        sqlBuf.append(" from om_ip_limit_t ");
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            rest = pstmt.executeQuery();
            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "IpLimitDAOImpl--getRowCount()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "IpLimitDAOImpl--getRowCount()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return allRows;
    }
}
