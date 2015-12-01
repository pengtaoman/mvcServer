package com.neusoft.om.dao.iplimit;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface IpLimitDAO extends BaseDao{

	
	/**
	 * 得到所有ip配置信息
	 * @param address
	 * @param description
	 * @return
	 */
	public IpLimitColl getIpLimit();
	
	/**
	 * 增加一条纪录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddIpLimit(IpLimitVO vo) throws DataAccessException;
	
	/**
	 * 得到某一条详细信息
	 * @param ipStartAdd
	 * @param ipEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public IpLimitVO getIpLimitVO(String ipStartAdd, String ipEndAdd) throws DataAccessException;
	
	/**
	 * 修改
	 * @param vo,priStartAdd,priEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyIpLimit(IpLimitVO vo,String priStartAdd, String priEndAdd) throws DataAccessException;
	
	/**
	 * 删除
	 * @param address
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteIpLimit(String priStartAdd, String priEndAdd) throws DataAccessException;
	
	/**
	 * 查询，带分页
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getIpLimitList(int beginNum, int endNum) throws DataAccessException;
	
	public int getRowCount() throws DataAccessException;
}
