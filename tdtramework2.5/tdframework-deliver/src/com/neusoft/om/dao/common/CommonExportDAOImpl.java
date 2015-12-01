/*
 * <p>Title:       转换程序接口</p>
 * <p>Description: 实现通过id得到name或通过name得到id的方法</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.dao.common;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class CommonExportDAOImpl extends BaseDaoImpl implements CommonExportDAO
{

	public int exportTextFile(String fileName, String sql, String tableTitle, HttpServletResponse response) throws DataAccessException{
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {					
			if(fileName == null || fileName.trim().equals("")){
				fileName = "导出数据";
			}
			response.setContentType("text/plain");			
			String codedfilename = URLEncoder.encode(fileName+".csv","UTF8");
			response.setHeader("Content-Disposition", "attachment;filename=\""+ codedfilename + "\"");
			response.setHeader("Cache-Control","must-revalidate, post-check=0, pre-check=0");
			response.setHeader("Pragma", "public");			
			
			ByteArrayOutputStream fos = new ByteArrayOutputStream();
			OutputStreamWriter osw = new OutputStreamWriter(fos);
			java.io.BufferedWriter bw = new BufferedWriter(osw);
			bw.write(tableTitle);
			bw.newLine();			
			
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			int titleLength = 0;
			if(tableTitle != null && !tableTitle.trim().equals("")){
				String [] titleArray = tableTitle.split(",");
				titleLength = titleArray.length;
			}
			while (rest.next()) {
				for(int i=1; i< titleLength; i++){
					bw.write(nvl(rest.getString(i))+",");					
				}
				bw.write(rest.getString(titleLength));
				bw.newLine();			
			}
			bw.flush();
			bw.close();
			fos.writeTo(response.getOutputStream());			
			response.getOutputStream().flush();
			response.getOutputStream().close();
			
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"CommonExportDAOImpl--exportTextFile-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"CommonExportDAOImpl--exportTextFile-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return 0;
	}
    private String nvl(String str) {
        return str==null?"":str;
    }
}
