package com.neusoft.om.bo;

import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.core.BaseBO;
/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: ְ���ɫ��ϵά��</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface DutyRoleRelationMaintanceBO extends BaseBO {
	public static final String BEAN = "dutyRoleRelationManagementFacade";
	/**
	 * ����ְ�����õ���ְ���϶�Ӧ�Ľ�ɫ�ļ���
	 * @param dutyId
	 * @return RoleColl
	 * @throws ServiceException
	 */
	public RoleColl getRoleInfoByDutyId(int dutyId) throws ServiceException;

	/**
	 * ��һ��ְ�������Ӷ����ɫ
	 * @param dutyId
	 * @param roleId
	 * @return int
	 * @throws ServiceException
	 */
	public int doAddRoleInfo(int dutyId,int[] roleId) throws ServiceException;
	/**
	 * ��ְ����ɾ��һ����ɫ
	 * @param dutyId
	 * @param roleId
	 * @return
	 * @throws ServiceException
	 */
	public int doDeleteRoleInfo(int dutyId, int roleId) throws ServiceException;
}
