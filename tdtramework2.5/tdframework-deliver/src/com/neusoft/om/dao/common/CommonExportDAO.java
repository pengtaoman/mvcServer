/*
 * <p>Title:       ͨ�õĵ����ļ��� </p>
 * <p>Description: </p>
 * <p>Copyright:   Copyright (c) 2009</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
 */
package com.neusoft.om.dao.common;

import javax.servlet.http.HttpServletResponse;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface CommonExportDAO extends BaseDao
{
	/**
	 * ͨ�õĵ������ݷ���
	 * @param fileName �� �����ļ������ƣ������׺�������ļ��ĺ�׺ͳһΪ��csv
	 * @param sql ����ѯ���ݿ���䣬����select����е�˳����Ҫ�������һһ��Ӧ
	 * @param tableTitle �� �����⣬��Ҫ�á�,���ָ���ע���ǰ�ǵĶ��ţ�
	 * @param response
	 * @return
	 * @throws DataAccessException
	 */
	public int exportTextFile(String fileName, String sql, String tableTitle, HttpServletResponse response) throws DataAccessException;
	
}
