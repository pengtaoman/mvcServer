
package com.neusoft.tdframework.message.dao;

import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;


import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.message.data.PromptInfoVO;

public class PromptInfoDAOImpl  extends BaseDaoImpl implements  PromptInfoDAO{
	
	public PromptInfoVO getPromptInfo(String busiCode) throws DataAccessException {
		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT * from BS_PROMPT_INFO_T where BUSI_CODE=? ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, busiCode);
			rest = pstmt.executeQuery();
            
			if (rest.next()) {
				PromptInfoVO promptInfoVO = new PromptInfoVO();
				promptInfoVO.setBusiCode(rest.getString("busi_code"));
				promptInfoVO.setMessage(rest.getString("message"));
				promptInfoVO.setModule(rest.getString("module"));
				promptInfoVO.setRemark(rest.getString("remark"));
				promptInfoVO.setStatusCd(rest.getString("status_cd"));
				promptInfoVO.setStatusDate(rest.getDate("status_date"));
				promptInfoVO.setTitle(rest.getString("title"));
				promptInfoVO.setType(rest.getString("type"));
				return promptInfoVO;
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PromptInfoDAOImpl--getPromptInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PromptInfoDAOImpl--getPromptInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return null;
	}
	
	
	public Map<String, PromptInfoVO> preCacheMessageInfo() throws DataAccessException {
		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT * from BS_PROMPT_INFO_T");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		Map<String, PromptInfoVO> returnMap = new HashMap<String, PromptInfoVO>();
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
            
			while (rest.next()) {
				PromptInfoVO promptInfoVO = new PromptInfoVO();
				promptInfoVO.setBusiCode(rest.getString("busi_code"));
				promptInfoVO.setMessage(rest.getString("message"));
				promptInfoVO.setModule(rest.getString("module"));
				promptInfoVO.setRemark(rest.getString("remark"));
				promptInfoVO.setStatusCd(rest.getString("status_cd"));
				promptInfoVO.setStatusDate(rest.getDate("status_date"));
				promptInfoVO.setTitle(rest.getString("title"));
				promptInfoVO.setType(rest.getString("type"));
				returnMap.put(promptInfoVO.getBusiCode(), promptInfoVO);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PromptInfoDAOImpl--preCacheMessageInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"PromptInfoDAOImpl--preCacheMessageInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return returnMap;
	}

}