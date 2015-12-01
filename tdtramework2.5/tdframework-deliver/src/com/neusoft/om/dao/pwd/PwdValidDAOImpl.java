package com.neusoft.om.dao.pwd;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author yanglm
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class PwdValidDAOImpl extends BaseDaoImpl implements PwdValidDAO {
	/**
	**获取密码过期验证表信息
	*/
	public PwdValidVO getAllPwdValidInfo() throws DataAccessException {

		PwdValidVO vo = null;
		String sql=" select * from check_pwd_valid ";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new PwdValidVO();
				vo.setAttribute(rest);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PwdValidDAOImpl--getAllPwdValidInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PwdValidDAOImpl--getAllPwdValidInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}
	/**
	**获取密码剩余有效时间
	*/
	public int getEffectDays(String compareDate,int inValidDays)throws DataAccessException{
	int effctDays = -9999;
	String sql = "SELECT TO_DATE(SUBSTR(?,1,8),'yyyymmdd')- TO_DATE(TO_CHAR(SYSDATE,'yyyymmdd'),'yyyymmdd') effctDays FROM dual";
	Connection conn = null;
	PreparedStatement pstmt       = null ;
	ResultSet         rest        = null ;

	try{
		conn = getConnection();
		pstmt = conn.prepareStatement(sql);
		pstmt.setString(1,compareDate);
		rest = pstmt.executeQuery();
		if(rest.next()){
			effctDays = rest.getInt("effctDays");
			effctDays = effctDays+inValidDays;
		}
	}catch(SQLException e){
	SysLog.writeLogs("om",GlobalParameters.ERROR,"PwdValidDAOImpl--getEffectDays-1:"+e.getMessage());
	throw new DataAccessException(e);
	}catch(Exception e){
		SysLog.writeLogs("om",GlobalParameters.ERROR,"PwdValidDAOImpl--getEffectDays-2:"+e.getMessage());
		throw new DataAccessException(e);
	}finally{
		close(rest,pstmt,conn);
	}
		return  effctDays;
	}
	/**
	 * 保存
	 */
	public int doModify(PwdValidVO vo) throws DataAccessException{
		int code = 1;// 成功
		StringBuffer insert_buf = new StringBuffer();
		insert_buf.append("update check_pwd_valid ");
		insert_buf.append(" set if_cortrol=?,invalid_days=?,alert_days=?,pwd_min_length=?, pwd_max_length=?, " +
				"upd_employee_id=?, upd_date=sysdate");
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(insert_buf.toString());
			pstmt.setInt(1, vo.getIfCortrol());
			pstmt.setInt(2, vo.getInValidDays());
			pstmt.setInt(3, vo.getAlertDays());
			pstmt.setInt(4, vo.getPwdMinLength());
			pstmt.setInt(5, vo.getPwdMaxLength());
			pstmt.setString(6, vo.getUpdEmployeeId());
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--doModifyMenuInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"MenuDAOImpl--doModifyMenuInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(pstmt, conn);
		}
		return code;
	}

}
