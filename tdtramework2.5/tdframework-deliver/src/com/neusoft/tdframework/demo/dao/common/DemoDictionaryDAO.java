/*
 * <p>Title:       简单的标题</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.tdframework.demo.dao.common;

import java.util.List;

import com.neusoft.tdframework.exception.DataAccessException;

/**
 * 
 * 类DemoDictionaryDAOImpl的实现描述：字典表
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