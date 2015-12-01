package com.neusoft.om.dao.sequence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.om.OMAppContext;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author renh
 *
 * 取得序列值接口的实现类
 */
public class SequenceDAOImpl extends BaseDaoImpl implements SequenceDAO{

	//职员编号
	public String getEmployeeSequenceValue() throws DataAccessException {
		String sequenceValue = "0";
		String sql = "SELECT om_employee_s.NEXTVAL  f_sequence_value FROM dual";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()) {
				sequenceValue = rest.getString("f_sequence_value");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"SequenceDAOImpl--getEmployeeSequenceValue-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"SequenceDAOImpl--getEmployeeSequenceValue-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return sequenceValue;
	}
	
	//职务编号
	public int getDutySequenceValue() throws DataAccessException {
		int sequenceValue = 0;
		String sql = "SELECT om_duty_s.NEXTVAL  f_sequence_value FROM dual";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()) {
				sequenceValue = rest.getInt("f_sequence_value");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"SequenceDAOImpl--getDutySequenceValue-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"SequenceDAOImpl--getDutySequenceValue-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return sequenceValue;
	}
	
	//组织机构编号
	public String getOrganSequenceValue() throws DataAccessException {
		String sequenceValue = "0";
		String sql = "SELECT om_organ_s.NEXTVAL  f_sequence_value FROM dual";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()) {
				sequenceValue = rest.getString("f_sequence_value");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"SequenceDAOImpl--getOrganSequenceValue-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"SequenceDAOImpl--getOrganSequenceValue-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return sequenceValue;
	}
	//角色编号
	public int getRoleSequenceValue() throws DataAccessException {
		int sequenceValue = 0;
		String sql = "SELECT om_role_s.NEXTVAL  f_sequence_value FROM dual";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()) {
				sequenceValue = rest.getInt("f_sequence_value");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"SequenceDAOImpl--getRoleSequenceValue-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"SequenceDAOImpl--getRoleSequenceValue-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return sequenceValue;
		}
//	测试方法
	  public static void main(String args[]){
		  SequenceDAO dao = (SequenceDAO)OMAppContext.getBean(SequenceDAO.BEAN);
		  try {
			  System.out.println(dao.getEmployeeSequenceValue());
			  System.out.println(dao.getDutySequenceValue());
			  System.out.println(dao.getOrganSequenceValue());
		  }catch(DataAccessException e){
			  e.printStackTrace();
		  }
	  }	  
}
