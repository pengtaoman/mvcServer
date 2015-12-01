package com.neusoft.om.dao.work;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface WorkDAO extends BaseDao{
	public static final String BEAN = "workDAO";
	/**
	 * ����ϵͳId�õ���������Ϣ����
	 * 20050527 �����޸�,ֻ��ʾ�̶�������,��������Ȩ������
	 * @param systemId
	 * @return
	 * @throws DataAccessException
	 */
	public WorkColl getWorkInfoById(String systemId) throws DataAccessException;
	/**
	 * ����ְԱ���,����������Ϣ���в��¼,����ò���Ա��ĳ��ϵͳ��Ȩ��,�����ϵͳ��
	 * ����������������Ϣ,����ʾ��ϵͳ,������ʾ
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public WorkColl getAllWorkInfoByEmployeeId(String parentMenuId,String employeeId) throws DataAccessException;
	
}
