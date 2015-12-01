package com.neusoft.om.dao.emplogintime;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface EmpLoginTimeDAO extends BaseDao{

	
	/**
	 * 得到所有配置信息
	 * @param address
	 * @param description
	 * @return
	 */
	public EmpLoginTimeColl getEmpLoginTime();
	
	/**
	 * 增加一条纪录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddEmpLoginTime(EmpLoginTimeVO vo) throws DataAccessException;
	
	/**
	 * 得到某一条详细信息
	 * @param workNo
	 * @param logId
	 * @return
	 * @throws DataAccessException
	 */
	public EmpLoginTimeVO getEmpLoginTimeVO(String logId,String workNo) throws DataAccessException;
	
	/**
	 * 修改
	 * @param vo
	 * @param workNo
	 * @param priStartAdd
	 * @param priEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyEmpLoginTime(EmpLoginTimeVO vo,String priLogId, String priWorkNo) throws DataAccessException;
	
	/**
	 * 删除
	 * @param workNo
	 * @param logId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmpLoginTime(String logId, String workNo) throws DataAccessException;
	
	/**
	 * 查询，带分页
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getEmpLoginTimeList(int beginNum, int endNum) throws DataAccessException;
	
	public int getRowCount() throws DataAccessException;
}
