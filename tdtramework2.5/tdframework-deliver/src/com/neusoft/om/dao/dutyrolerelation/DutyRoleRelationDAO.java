package com.neusoft.om.dao.dutyrolerelation;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: 实现职务和角色关系的dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface DutyRoleRelationDAO extends BaseDao {

	public static final String BEAN = "dutyRoleRelationDAO";
	/**
	 * 增加一条记录到职务与角色对应关系表中
	 * @param vo
	 * @return int 1:成功;0:失败
	 * @throws DataAccessException
	 */
	public int doAddDutyRoleRelation(DutyRoleRelationVO vo) throws DataAccessException;
	/**
	 * 增加多条记录到职务角色对应关系表中
	 * @param vo
	 * @return int[] 
	 * @throws DataAccessException
	 */
	public int[] doAddDutyRoleRelation(DutyRoleRelationColl coll) throws DataAccessException;
	/**
	 * 根据角色标识删除信息
	 * @param roleId
	 * @return int 1:成功;0:失败
	 * @throws DataAccessException
	 */
	public int doDeleteAllInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * 根据职务标识删除信息
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteAllInfoByDutyId(int dutyId) throws DataAccessException;
	/**
	 * 根据主键删除信息
	 * @param dutyId
	 * @param roleId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteInfoByKey(int dutyId,int roleId) throws DataAccessException;
}
