package com.neusoft.om.dao.address;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-08</p>
 * <p>Module     : om</p>
 * <p>Description: 组织机构地址的dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface AddressDAO extends BaseDao {
	public static final String BEAN = "addressDAO";
	/**
	 * 根据主键地址编码查询地址信息
	 * @param addressId
	 * @return AddressVO
	 * @throws DataAccessException
	 */
	public AddressVO getAddressInfoByAddressId(int addressId) throws DataAccessException;
	/**
	 * 根据组织机构Id查询该组织机构的地址信息
	 * @param organId
	 * @return AddressColl
	 * @throws DataAccessException
	 */
	public AddressColl getAddressInfoByOrganId(String organId) throws DataAccessException;
	/**
	 * 增加一条记录
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddAddressInfo(AddressVO vo) throws DataAccessException;
	/**
	 * 根据主键修改一条记录
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doModifyAddressInfo(AddressVO vo) throws DataAccessException;
	/**
	 * 根据主键addressId删除一条记录
	 * @param addressId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteAddressInfoById(int addressId)throws DataAccessException;
	/**
	 * 根据组织机构Id删除该组织机构下的所有地址信息
	 * @param organId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteAddressInfoByOrganId(String organId)throws DataAccessException;

}