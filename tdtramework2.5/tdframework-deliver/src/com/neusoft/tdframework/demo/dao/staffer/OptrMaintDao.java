/*
 * Created on 2006-3-7
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.dao.staffer;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author zhangjn
 */
public interface OptrMaintDao extends BaseDao {
	
	int getOptrsByWorkNo(String workNo) throws DataAccessException;
	int getOptrsByRole(String areaId, String roleId) throws DataAccessException;
	int getOptrsByOrg(String areaId, String orgId) throws DataAccessException;
	int getOptrsByDate(String startDate, String endDate)throws DataAccessException;

	public int updateOptrById(String id, EmployeeVO vo)throws DataAccessException;
	public int deleteOptrById(String id) throws DataAccessException;
	
	List getOptrsByRole(String areaId, String roleId, int beginNum, int endNum)throws DataAccessException;
	List getAllOptrsByRole(String areaId, String roleId)throws DataAccessException;

	EmployeeVO findOptrById(String id) throws DataAccessException;
}