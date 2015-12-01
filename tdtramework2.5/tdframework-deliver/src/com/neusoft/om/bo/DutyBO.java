package com.neusoft.om.bo;

import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.duty.OrganKindDutyColl;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2005-02-18</p>
 * <p>Module     : om</p>
 * <p>Description: ʵ��ְ��ά���Ľӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface DutyBO extends BaseBO{
	public static final String BEAN = "dutyFacade";
	/**
	 * �޸�ְ����Ϣ
	 * @param vo
	 * @return int
	 * @throws ServiceException
	 */
	public int doAddDutyInfo(DutyVO vo) throws ServiceException;
	/**
	 * �޸�ְ����Ϣ
	 * @param vo
	 * @return int
	 * @throws ServiceException
	 */
	public int doModifyDudyInfo(DutyVO vo) throws ServiceException;
	/**
	 * ����ְ��IDɾ��
	 * @param dutyId
	 * @return int
	 * @throws ServiceException
	 */
	public int doDeleteDutyInfoByDutyId(int dutyId) throws ServiceException;
	/**
	 * ����ְ�����õ�ְ����Ϣ
	 * @param dutyId
	 * @return
	 * @throws ServiceException
	 */
	public DutyVO getDutyInfoByDutyId(int dutyId) throws ServiceException;
	/**
	 * �õ���֯�������ͺ�ְ��
	 * @return OrganKindDuty
	 * @throws ServiceException
	 */
	public OrganKindDutyColl getOrganKindDuty() throws ServiceException;
	/**
	 * �޸�ְ��ְ��Χ
	 * @param dutyId
	 * @param delFuncStr
	 * @param allFuncStr
	 * @return int
	 * @throws ServiceException
	 */
	public int doModifyDutyPower(int dutyId,String delFuncStr,String allFuncStr) throws ServiceException;
	/**
	 * ��������ϵͳ�˵���Ϣ
	 * @param dutyId
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getAllDutyPowerInfo(int dutyId) throws ServiceException;
	/**
	 * ��Ȩ���Ĳ˵���Ϣ
	 * @param dutyId
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getDutyPowerInfo(int dutyId) throws ServiceException;
	
}
