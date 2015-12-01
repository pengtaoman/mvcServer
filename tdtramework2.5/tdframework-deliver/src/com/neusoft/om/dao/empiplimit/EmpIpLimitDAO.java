package com.neusoft.om.dao.empiplimit;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface EmpIpLimitDAO extends BaseDao{

	
	/**
	 * 得到所有配置信息
	 * @param address
	 * @param description
	 * @return
	 */
	public EmpIpLimitColl getEmpIpLimit();
	
	/**
	 * 增加一条纪录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddEmpIpLimit(EmpIpLimitVO vo) throws DataAccessException;
	
	/**
	 * 得到某一条详细信息
	 * @param workNo
	 * @param ipStartAdd
	 * @param ipEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public EmpIpLimitVO getEmpIpLimitVO(String workNo, String ipStartAdd, String ipEndAdd) throws DataAccessException;
	
	/**
	 * 修改
	 * @param vo
	 * @param workNo
	 * @param priStartAdd
	 * @param priEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyEmpIpLimit(EmpIpLimitVO vo,String workNo, String priStartAdd, String priEndAdd) throws DataAccessException;
	
	/**
	 * 删除
	 * @param workNo
	 * @param priStartAdd
	 * @param priEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmpIpLimit(String workNo, String priStartAdd, String priEndAdd) throws DataAccessException;
	
	/**
	 * 查询，带分页
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getEmpIpLimitList(int beginNum, int endNum) throws DataAccessException;
	
	public int getRowCount() throws DataAccessException;
}
