package com.neusoft.om.bo;

import java.util.Map;

import com.neusoft.om.dao.address.AddressColl;
import com.neusoft.om.dao.address.AddressVO;
import com.neusoft.om.dao.dutyrolerelation.DutyRoleRelationVO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationVO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.om.dao.organdisplay.OrganDisplayColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: ʵ����֯����ά�������нӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface OrganManagementBO extends BaseBO{
	public static final String BEAN = "organManagementFacade";
	/**
	 * ������֯����Id��ѯ��֯�����Ļ�����Ϣ
	 * @return
	 * @throws ServiceException
	 */
	public OrganVO getOrganInfoByOrganId(String organId) throws ServiceException;
	/**
	 * ������֯����Id�õ�����֯�����ĵ�ַ����ϵ��Ϣ
	 * @return
	 * @throws ServiceException
	 */
	public AddressColl getOrganAddressByOrganId(String organId) throws ServiceException;
	/**
	 * ���ݹ�����Ϣ�õ�������Ϣ
	 * @return
	 * @throws ServiceException
	 */
	public OrganVO getOrganInfoByFilter(Map filterInfo) throws ServiceException;
	/**
	 * �õ���֯��������Ϣ����(������ְ��)
	 * @param areaId
	 * @return OrganDisplayColl
	 * @throws ServiceException
	 */
	public OrganDisplayColl getOrganDisplayInfo (String areaId) throws ServiceException;
	
	public OrganDisplayColl getOrganDisplayInfo(String areaId,int areaLevel) throws ServiceException;
	/**
	 * �õ���֯��������Ϣ����(����ְ��)
	 * @param areaId
	 * @return
	 * @throws ServiceException
	 */
	public OrganDisplayColl getOrganDisplayInfoIncludeDuty(String areaId) throws ServiceException;
	/**
	 * ����һ����֯����(������Ϣ,��ϵ��ϢAddressVO),
	 * ��������֯�����µ�ְ��(������֯��������ȷ��ְ��DutyVO),ά����֯������ְ��Ĺ�ϵ��(
	 * OrganDutyRelationVO)
	 * @param vo
	 * @return
	 * @throws ServiceException
	 */
	public int doAddOrganInfo(OrganVO organVO,AddressVO vo,long partyId) throws ServiceException;
	/**
	 * �޸���֯������Ϣ(������Ϣ�޸�,��ϵ��Ϣ�޸�)
	 * ������Ϣ(OrganVO),��ϵ��ַ��Ϣ(AddressVO)
	 * @param organVO
	 * @param addressVO
	 * @return
	 * @throws ServiceException
	 */
	public int doModifyOrganInfo(OrganVO organVO,AddressVO addressVO,String priOrganName) throws ServiceException;
	/**
	 * organId,��Ӧ��Ҫά��: ��֯����-ְ���ϵ��,ְԱְ���ϵ��,
	 * ְ���µ���Ա��Ϣ,����Ա��ص���Ϣ
	 * @param organId
	 * @return
	 * @throws ServiceException
	 */
	public int doDeleteOrganInfo(String organId) throws ServiceException;
	/**
	 * ְ�������Ա��Ӧ��ϵά��(ά��ְԱ�ļ�ְ��Ϣ)
	 * ��Ӧ����Ҫά��:ְ��-ְԱ��ϵ��,ְԱ-��ɫ��ϵ��,ְԱȨ�������
	 * @return
	 * @throws ServiceException
	 */
	public int doDutyEmployeeRelationMaintance(EmployeeDutyRelationVO vo) throws ServiceException;
	/**
	 * ְ�����ɫ��Ӧ��ϵά��
	 * ��Ӧ����Ҫά��:ְ��-��ɫ��ϵ��,ְԱ-��ɫ��ϵ��,ְԱȨ�������
	 * @return
	 * @throws ServiceException
	 */
	public int doDutyRoleRelationMaintance(DutyRoleRelationVO vo) throws ServiceException;
	/**
	 * �õ���֯��������Ϣ����(ֻ�����ֹ�˾���г���)
	 * @param areaId
	 * @return OrganDisplayColl
	 * @throws ServiceException
	 */
	public OrganDisplayColl getMarketOrganDisplayInfo(String areaId) throws ServiceException;
	/**
	 * �õ�����Ӧ������
	 * @param key
	 * @return String
	 * @throws ServiceException
	 */
	public String getAppContainer(String key) throws ServiceException;
	
	/**
	 * ���ݹ���Աid�õ��ɼ�����֯������Χ��Ȩ��ϵͳʹ�ã����ݹ��ŵĹ���Ա����ȷ����ɼ��ķ�Χ
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getOrganByAuthId(String employeeId, int adminType) throws ServiceException;
	
	
		
	
}
