/*
 * <p>Title:       简单的标题</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.tdframework.demo.dao.common;

import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDictionaryDAO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**
 * 
 * 类DemoDictionaryDAOImpl的实现描述：字典表
 * 
 * @author zhangjianing zhangjn@neusoft.com
 * @version 1.0 Date 2006-4-20
 * @see java.lang.Class History: <author> <time> <version> <desc>
 */
public class DemoDictionaryDAOImpl extends BaseDictionaryDAO implements DemoDictionaryDAO{
	
	/**
	 * 
	 * @return
	 * @throws DataAccessException
	 */
	public List getAreaColl() throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append("select level,f_area_id,f_parent_area_id,f_area_name,f_area_level,f_postal_code,f_area_code ");
			strBuf.append(" from td_demo_area_t ");
			strBuf.append(" start with f_parent_area_id is null ");
			strBuf.append(" connect by prior f_area_id = f_parent_area_id ");
			return executeQueryForSimpleList(strBuf.toString(), "f_area_id","f_area_name");
		} catch (DataAccessException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"DemoDictionaryDAOImpl--getAreaColl:"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
	/**
	 * 
	 * @return
	 * @throws DataAccessException
	 */
	public List getOrgColl() throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append("select f_organ_id,f_organ_name FROM td_demo_organ_t ");
			return executeQueryForSimpleList(strBuf.toString(), "f_organ_id","f_organ_name");
		} catch (DataAccessException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"DemoDictionaryDAOImpl--getOrgColl:"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
}
