package com.neusoft.om.dao.sequence;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * ���Ȩ�޵�����ֵ
 */
public interface SequenceDAO extends BaseDao {
	public static final String BEAN = "sequenceDAO";
	/**
	 * ְԱ��������ֵ
	 * @return int
	 * @throws DataAccessException
	 */
	public String getEmployeeSequenceValue() throws DataAccessException;
	/**
	 * ְ���������ֵ
	 * @return int
	 * @throws DataAccessException
	 */
	public int getDutySequenceValue() throws DataAccessException;
	/**
	 * ��֯������������ֵ
	 * @return
	 * @throws DataAccessException
	 */
	public String getOrganSequenceValue() throws DataAccessException;
	/**
	 * ��ɫ����ֵ
	 * @return
	 * @throws DataAccessException
	 */
	public int getRoleSequenceValue() throws DataAccessException;
}
