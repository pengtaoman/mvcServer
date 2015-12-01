/*
 * <p>Title:       通用的导出文件类 </p>
 * <p>Description: </p>
 * <p>Copyright:   Copyright (c) 2009</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.dao.common;

import javax.servlet.http.HttpServletResponse;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface CommonExportDAO extends BaseDao
{
	/**
	 * 通用的导出数据方法
	 * @param fileName ： 导出文件的名称，无需后缀，导出文件的后缀统一为：csv
	 * @param sql ：查询数据库语句，其中select结果列的顺序需要与表格标题一一对应
	 * @param tableTitle ： 表格标题，需要用“,”分隔（注意是半角的逗号）
	 * @param response
	 * @return
	 * @throws DataAccessException
	 */
	public int exportTextFile(String fileName, String sql, String tableTitle, HttpServletResponse response) throws DataAccessException;
	
}
