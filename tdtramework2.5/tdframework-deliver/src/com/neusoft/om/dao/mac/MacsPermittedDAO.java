package com.neusoft.om.dao.mac;

import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface MacsPermittedDAO extends BaseDao{
	/**
	 * 通过地址获得唯一纪录
	 * @param address
	 * @return
	 */
	public MacsPermittedVO getMacsPermittedVO(String address);
	
	/**
	 * 通过地址，描述，模糊查询得到结果集
	 * @param address
	 * @param description
	 * @return
	 */
	public MacsPermittedColl getMacsPermitted(Map map);
	
	/**
	 * 增加一条纪录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddMacsPermitted(MacsPermittedVO vo) throws DataAccessException;
	
	/**
	 * 修改
	 * @param vo,priAddress
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyMacsPermitted(MacsPermittedVO vo,String priAddress) throws DataAccessException;
	
	/**
	 * 删除
	 * @param address
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteMacsPermitted(String address) throws DataAccessException;
	
	/**
	 * 查询，带分页
	 * @param map
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getMacsPermittedList(Map map, int beginNum, int endNum) throws DataAccessException;
	
	public int getRowCount(Map map) throws DataAccessException;
}
