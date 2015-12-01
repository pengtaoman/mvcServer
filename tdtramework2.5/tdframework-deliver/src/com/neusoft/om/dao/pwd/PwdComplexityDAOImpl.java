package com.neusoft.om.dao.pwd;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class PwdComplexityDAOImpl  extends BaseDaoImpl implements PwdComplexityDAO{

	public PwdComplexityColl getAllPwdComlexityConfig() throws DataAccessException {		
		String sql=" select * from om_pwd_complexity_t order by f_id ";		
		PwdComplexityColl coll = new PwdComplexityColl(); 
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while(rest.next()) {
				PwdComplexityVO vo = new PwdComplexityVO();
				vo.setAttribute(rest);
				coll.addPwdComplexityVO(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PwdComplexityDAOImpl--getAllPwdComlexityConfig-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PwdComplexityDAOImpl--getAllPwdComlexityConfig-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}

	public PwdComplexityVO getPwdComplexityById(int id) throws DataAccessException {
		String sql=" select * from om_pwd_complexity_t where f_id = ? ";
		PwdComplexityVO vo = new PwdComplexityVO();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, id);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo.setAttribute(rest);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PwdComplexityDAOImpl--getPwdComplexityById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PwdComplexityDAOImpl--getPwdComplexityById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}

	public int doAddPwdComplexity( PwdComplexityVO vo) throws DataAccessException{
		StringBuffer sql = new StringBuffer();
		sql.append("insert into om_pwd_complexity_t(f_id, f_lowercase, f_uppercase, ");
		sql.append("f_special_char, f_number, f_desc,f_creater,f_create_date, f_updater, f_upd_date)");
		sql.append("values (om_pwd_comp_s.nextval,?,?,?,?,?,?,sysdate,?,sysdate)");
		int code = 0;		
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql.toString());
			pstmt.setString(1, vo.getLowercase());
			pstmt.setString(2, vo.getUppercase());
			pstmt.setString(3, vo.getSpecialChar());
			pstmt.setString(4, vo.getNumber());
			pstmt.setString(5, vo.getDesc());
			pstmt.setString(6, vo.getCreater());
			pstmt.setString(7, vo.getUpdater());
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PwdComplexityDAOImpl--doAddPwdComplexity-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PwdComplexityDAOImpl--doAddPwdComplexity-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(pstmt, conn);
		}
		return code;
	}
	
	public int doUpdatePwdComplexity( PwdComplexityVO vo) throws DataAccessException{
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("update om_pwd_complexity_t set f_lowercase = ? , f_uppercase = ?,");
		sqlBuffer.append("f_special_char = ?, f_number = ?, f_desc = ? , ");
		sqlBuffer.append("f_updater = ? , f_upd_date = sysdate where f_id = ? ");
		int code = 0;		
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			int i=1;
			pstmt.setString(i++, vo.getLowercase());
			pstmt.setString(i++, vo.getUppercase());
			pstmt.setString(i++, vo.getSpecialChar());
			pstmt.setString(i++, vo.getNumber());
			pstmt.setString(i++, vo.getDesc());
			pstmt.setString(i++, vo.getUpdater());
			pstmt.setInt(i++, vo.getId());
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PwdComplexityDAOImpl--doUpdatePwdComplexity-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PwdComplexityDAOImpl--doUpdatePwdComplexity-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(pstmt, conn);
		}
		return code;
	}
	
	public int doDeletePwdComplexity( int id) throws DataAccessException{
		String sql = new String();
		sql = "delete from om_pwd_complexity_t where f_id = ? ";
		int code = 0;		
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,id);
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PwdComplexityDAOImpl--doDeletePwdComplexity-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PwdComplexityDAOImpl--doDeletePwdComplexity-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(pstmt, conn);
		}
		return code;
	}
}
