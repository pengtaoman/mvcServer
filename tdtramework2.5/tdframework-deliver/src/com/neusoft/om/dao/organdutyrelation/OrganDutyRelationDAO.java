package com.neusoft.om.dao.organdutyrelation;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: 组织机构和职务对应关系的dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface OrganDutyRelationDAO extends BaseDao {
	public static final String BEAN = "organDutyRelationDAO";
	/**
	 * 增加一条记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddOrganDutyRelationInfo(OrganDutyRelationVO vo)throws DataAccessException;
	/**
	 * 增加多条记录
	 * @param coll
	 * @return int[]
	 * @throws DataAccessException
	 */
	public int[] doAddOrganDutyRelationInfo(OrganDutyRelationColl coll)throws DataAccessException;
	/**
	 * 根据组织机构类型和职务编码维护所有属于该类型的组织机构,都增加此职务
	 * @param organKind
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddOrganDutyRelationInfo(int organKind,int dutyId)throws DataAccessException;
	/**
	 * 根据传入的组织机构Id增加该组织机构下的职务信息
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddOrganDutyRelationInfo(String organId,int organKind) throws DataAccessException;
	/**
	 * 按组织机构id删除记录
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteOrganDutyRelationInfoByOrganId(String organId)throws DataAccessException;
	/**
	 * 按职务id删除
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteOrganDutyRelationInfoByDuytId(int dutyId)throws DataAccessException;
	
}
