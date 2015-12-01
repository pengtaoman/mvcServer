package com.neusoft.tdframework.demo.dao.common;

import java.io.Reader;
import java.io.Writer;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import oracle.sql.CLOB;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class EditorDemoDAOImpl extends BaseDaoImpl implements EditorDemoDAO {

	public List getAllHtmls() {
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		List list = new ArrayList();

		try {
			conn = getConnection();
			StringBuffer infoSql = new StringBuffer();
			infoSql.append("select F_CONTENT_ID from TD_DEMO_RICH_CONTENT ");
			pstmt = conn.prepareStatement(infoSql.toString());
			rest = pstmt.executeQuery();
			String str = "";
			while (rest.next()) {
				str = rest.getString(1);
				list.add(str);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("tddemo", GlobalParameters.ERROR,"EditorDemoDAOImpl--getAllHtmls-2:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("tddemo", GlobalParameters.ERROR,"EditorDemoDAOImpl--getAllHtmls-3:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return list;
	}

	public String getHtml(String contentId) {

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		Reader inStream = null;
		
		String retStr = null;

		try {
			conn = getConnection();
			StringBuffer infoSql = new StringBuffer();
			infoSql.append("select f_content from TD_DEMO_RICH_CONTENT where F_CONTENT_ID = '")
				   .append(contentId).append("'");
			
			pstmt = conn.prepareStatement(infoSql.toString());
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				java.sql.Clob clob = rest.getClob("f_content");
				inStream = clob.getCharacterStream();
				char[] c = new char[(int) clob.length()];
				inStream.read(c);
				retStr = new String(c);
				inStream.close();
			}
		} catch (SQLException e) {
			SysLog.writeLogs("tddemo", GlobalParameters.ERROR,"EditorDemoDAOImpl--getHtml-2:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("tddemo", GlobalParameters.ERROR,"EditorDemoDAOImpl--getHtml-3:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return retStr;
	}

	public void insertHTML(String contentId, String content) {
		
		if (getHtml(contentId) != null) {
			updateHTML(contentId, content);
			return;
		}
		
		int inRecord = 0;
		Writer outStream = null;
		// String contId = "1234";
		String _content = content;
		StringBuffer buf1 = new StringBuffer();

		buf1.append("INSERT INTO TD_DEMO_RICH_CONTENT ");
		buf1.append(" (F_CONTENT_ID,F_CONTENT) ");
		buf1.append(" VALUES (?,empty_clob())");

		String sql1 = buf1.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			conn.setAutoCommit(false);

			// 主表的插入
			pstmt = conn.prepareStatement(sql1);
			pstmt.setString(1, contentId);
			inRecord = pstmt.executeUpdate();
			pstmt.close();

			// 公告内容CLOB字段的插入
			if (inRecord > 0) {
				StringBuffer infoSql = new StringBuffer();
				infoSql.append("select f_content from TD_DEMO_RICH_CONTENT where F_CONTENT_ID = '")
					   .append(contentId).append("' for update");
				pstmt = conn.prepareStatement(infoSql.toString());
				rest = pstmt.executeQuery();
				if (rest.next()) {
					CLOB clob = (CLOB) rest.getClob(1);
					outStream = clob.getCharacterOutputStream();
					char[] c = _content.toCharArray();
					outStream.write(c, 0, c.length);
				}
			}
			outStream.flush();
			outStream.close();
			conn.commit();
			conn.setAutoCommit(true);
		} catch (SQLException e) {
			try {
				conn.setAutoCommit(true);
				conn.rollback();
			} catch (SQLException e1) {
				SysLog.writeLogs("tddemo", GlobalParameters.ERROR,"EditorDemoDAOImpl--insertHTML-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			SysLog.writeLogs("tddemo", GlobalParameters.ERROR,"EditorDemoDAOImpl--insertHTML-2:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("tddemo", GlobalParameters.ERROR,"EditorDemoDAOImpl--insertHTML-3:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
	}

	public void updateHTML(String contentId, String content) {
		
		Writer outStream = null;
		
		String contId = contentId;
		String _content = content;
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			// 主表的插入、公告内容CLOB字段的插入
			StringBuffer infoSql = new StringBuffer();
			infoSql.append("select f_content from TD_DEMO_RICH_CONTENT where F_CONTENT_ID = '")
				   .append(contId).append("' for update");
			pstmt = conn.prepareStatement(infoSql.toString());
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				CLOB clob = (CLOB) rest.getClob(1);
				outStream = clob.getCharacterOutputStream();
				char[] c = _content.toCharArray();
				outStream.write(c, 0, c.length);
			}
			outStream.flush();
			outStream.close();
			conn.commit();
			conn.setAutoCommit(true);
		} catch (SQLException e) {
			try {
				conn.setAutoCommit(true);
				conn.rollback();
			} catch (SQLException e1) {
				SysLog.writeLogs("tddemo", GlobalParameters.ERROR,"EditorDemoDAOImpl--insertHTML-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			SysLog.writeLogs("tddemo", GlobalParameters.ERROR,"EditorDemoDAOImpl--insertHTML-2:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("tddemo", GlobalParameters.ERROR,"EditorDemoDAOImpl--insertHTML-3:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
	}
}
