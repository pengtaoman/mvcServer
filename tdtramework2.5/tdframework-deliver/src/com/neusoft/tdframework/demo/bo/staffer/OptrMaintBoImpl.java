/*
 * Created on 2006-3-7
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.bo.staffer;

import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.demo.dao.staffer.EmployeeVO;
import com.neusoft.tdframework.demo.dao.staffer.OptrMaintDao;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author zhangjn
 */
public class OptrMaintBoImpl implements OptrMaintBo {
	
	private OptrMaintDao dao;

	/**
	 * 
	 * @param workNo
	 * @return
	 * @throws DataAccessException
	 */
	public int getOptrsByWorkNo(String workNo) {
		return dao.getOptrsByWorkNo(workNo);
	}

	/**
	 * 
	 * @param areaId
	 * @param roleId
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getOptrsByRole(String areaId, String roleId, int beginNum,
			int endNum) {
		return dao.getOptrsByRole(areaId, roleId, beginNum, endNum);
	}

	/**
	 * 
	 * @param areaId
	 * @param roleId
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getAllOptrsByRole(String areaId, String roleId) {
		return dao.getAllOptrsByRole(areaId, roleId);
	}

	/**
	 * 
	 * @param areaId
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public int getOptrsByRole(String areaId, String roleId) {
		return dao.getOptrsByRole(areaId, roleId);
	}

	/**
	 * 
	 * @param areaId
	 * @param orgId
	 * @return
	 * @throws DataAccessException
	 */
	public int getOptrsByOrg(String areaId, String orgId) {
		return dao.getOptrsByOrg(areaId, orgId);
	}

	/**
	 * 
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws DataAccessException
	 */
	public int getOptrsByDate(String startDate, String endDate) {
		return dao.getOptrsByDate(startDate, endDate);
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeVO findOptrById(String id) {

		return dao.findOptrById(id);
	}

	/**
	 * @param dao
	 *            The dao to set.
	 */
	public void setOptrMaintDao(OptrMaintDao dao) {
		this.dao = dao;
	}

	/**
	 * 
	 * @param id
	 * @param vo
	 * @return
	 */
	public int updateOptrById(String id, EmployeeVO vo) throws ServiceException {
		int result = dao.updateOptrById(id, vo);
		if (result < 0) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintBoImpl--updateOptrById:" + "操作员信息修改未成功！");
			throw new ServiceException("操作员信息修改未成功！");
		}
		return result;
	}

	/**
	 * 
	 * @param id
	 * @return
	 */
	public int deleteOptrById(String id) {
		return dao.deleteOptrById(id);
	}
}
