package com.neusoft.om.dao.invpn;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface IpsInvpnDAO extends BaseDao{
	/**
	 * 通过地址获得唯一纪录
	 * @param address
	 * @return
	 */
	public IpsInvpnVO getIpsInvpnVO(String address);
	
	/**
	 * 通过地址，描述，模糊查询得到结果集
	 * @param address
	 * @param description
	 * @return
	 */
	public IpsInvpnColl getIpsInvpn(String address, String description);
	
	/**
	 * 增加一条纪录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddIpsInvpn(IpsInvpnVO vo) throws DataAccessException;
	
	/**
	 * 修改
	 * @param vo,priAddress
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyIpsInvpn(IpsInvpnVO vo,String priAddress) throws DataAccessException;
	
	/**
	 * 删除
	 * @param address
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteIpsInvpn(String address) throws DataAccessException;
	
	/**
	 * 查询，带分页
	 * @param address
	 * @param desc
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getIpsInvpnList(String address, String desc, int beginNum, int endNum) throws DataAccessException;
	
	public int getRowCount(String address, String desc) throws DataAccessException;
}
