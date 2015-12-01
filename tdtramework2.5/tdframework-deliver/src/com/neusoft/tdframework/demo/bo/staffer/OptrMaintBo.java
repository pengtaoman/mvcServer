/*
 * Created on 2006-3-23
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.bo.staffer;

import java.util.List;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.demo.dao.staffer.EmployeeVO;
import com.neusoft.tdframework.demo.dao.staffer.OptrMaintDao;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author zhangjn
 */
public interface OptrMaintBo extends BaseBO {
	
	/**
	 * 
	 * @param workNo
	 * @return
	 * @throws DataAccessException
	 */
	public int getOptrsByWorkNo(String workNo);

	/**
	 * 
	 * @param areaId
	 * @param roleId
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getOptrsByRole(String areaId, String roleId, int beginNum,int endNum);

	public List getAllOptrsByRole(String areaId, String roleId);

	/**
	 * 
	 * @param areaId
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public int getOptrsByRole(String areaId, String roleId);

	/**
	 * 
	 * @param areaId
	 * @param orgId
	 * @return
	 * @throws DataAccessException
	 */
	public int getOptrsByOrg(String areaId, String orgId);

	/**
	 * 
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws DataAccessException
	 */
	public int getOptrsByDate(String startDate, String endDate);

	/**
	 * 
	 * @param id
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeVO findOptrById(String id);

	/**
	 * @param dao
	 *            The dao to set.
	 */
	public void setOptrMaintDao(OptrMaintDao dao);

	/**
	 * 
	 * @param id
	 * @param vo
	 * @return
	 */
	public int updateOptrById(String id, EmployeeVO vo) throws ServiceException;

	/**
	 * 
	 * @param id
	 * @return
	 */
	public int deleteOptrById(String id);
}