package com.neusoft.om.dao.sequence;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * 获得权限的序列值
 */
public interface SequenceDAO extends BaseDao {
	public static final String BEAN = "sequenceDAO";
	/**
	 * 职员编码序列值
	 * @return int
	 * @throws DataAccessException
	 */
	public String getEmployeeSequenceValue() throws DataAccessException;
	/**
	 * 职务编码序列值
	 * @return int
	 * @throws DataAccessException
	 */
	public int getDutySequenceValue() throws DataAccessException;
	/**
	 * 组织机构编码序列值
	 * @return
	 * @throws DataAccessException
	 */
	public String getOrganSequenceValue() throws DataAccessException;
	/**
	 * 角色序列值
	 * @return
	 * @throws DataAccessException
	 */
	public int getRoleSequenceValue() throws DataAccessException;
}
