package com.neusoft.om.dao.organkind;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface OrganKindDAO extends BaseDao{
	/**
	 * 根据组织机构类型查组织机构类型唯一记录信息
	 * @return OrganKindVO
	 * @throws DataAccessException
	 */
	public OrganKindVO getOrganKindInfoByOrganKind(int organKind) throws DataAccessException;
	/**
	 * 查询所有组织机构类型信息
	 * @return OrganKindColl
	 * @throws DataAccessException
	 */
	public OrganKindColl getOrganKindInfo() throws DataAccessException;
	/**
	 * 增加组织机构类型信息
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddOrganKindInfo(OrganKindVO vo) throws DataAccessException;
	/**
	 * 修改组织机构类型信息
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyOrganKindInfo(OrganKindVO vo) throws DataAccessException;
	/**
	 * 删除组织机构类型信息
	 * @param organKind
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteOrganKindInfo(int organKind) throws DataAccessException;
	/**
	 * 根据组织机构类型得到直接下级的组织机构类型
	 * @param organKind
	 * @return OrganKindColl
	 */
	public OrganKindColl getChildOrganKindCollByOrganKind(int organKind) throws DataAccessException;
	/**
	 * 根据组织机构的所属区域级别,得到组织机构信息,只取第一层(实际只有一个,这里返回coll为了程序实现方便)
	 * @param areaLevel
	 * @return OrganKindColl
	 * @throws DataAccessException
	 */
	public OrganKindColl getOrganKindCollByLevel(int areaLevel) throws DataAccessException;

}
