/*
 * <p>Title:       �򵥵ı���</p>
 * <p>Description: ����ϸ��˵��</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
 */
package com.neusoft.tdframework.demo.dao.common;

import java.util.List;

import com.neusoft.tdframework.exception.DataAccessException;

/**
 * 
 * ��DemoDictionaryDAOImpl��ʵ���������ֵ��
 * 
 * @author zhangjianing zhangjn@neusoft.com
 * @version 1.0 Date 2006-4-20
 * @see java.lang.Class History: <author> <time> <version> <desc>
 */
public interface DemoDictionaryDAO {
	/**
	 * 
	 * @return
	 * @throws DataAccessException
	 */
	public abstract List getAreaColl() throws DataAccessException;

	/**
	 * 
	 * @return
	 * @throws DataAccessException
	 */
	public abstract List getOrgColl() throws DataAccessException;
}