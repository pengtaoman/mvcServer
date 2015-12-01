package com.neusoft.om.bo;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organkind.OrganKindColl;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;
/**
 * @author renh
 *
 * ��̬���ݵ���������ýӿ�
 */
public interface DynamicListBO extends BaseBO {
	public static final String BEAN = "dynamicListFacade";
	/**ְ��*/
	public DutyColl getDutyList() throws ServiceException;
	/**��֯����*/
	public OrganColl getOrganList() throws ServiceException;
	
	public OrganColl getOrganListByOragn(String organId) throws ServiceException;
	
	public OrganColl getOrganInfoByOragn(String organId) throws ServiceException;
	/**
	 * �������µ���֯����
	 * @param areaId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getOrganListByArea(String areaId) throws ServiceException;
	/**��������*/
	public AreaColl getAreaList() throws ServiceException;
	
	public AreaColl getAreaList(String areaId) throws ServiceException;
	
	public AreaColl getAreaListByOrgan(String organId) throws ServiceException;
	/**
	 * �õ���ǰAreaId,��AreaId�µ������ӽ��
	 * @return
	 * @throws ServiceException
	 */
	public AreaColl getAreaChildList(String areaId) throws ServiceException;
	/**��֯��������*/
	public OrganKindColl getOrganKindList() throws ServiceException;
	/**
	 * ���ܽ�ɫ
	 * @return RoleColl
	 * @throws ServiceException
	 */
	public RoleColl getFuncRoleList() throws ServiceException;
	/**
	 * ���ݽ�ɫ
	 * @return RoleColl
	 * @throws ServiceException
	 */
	public RoleColl getDataRoleList() throws ServiceException;
	/**
	 * ��ɫ(�������ݽ�ɫ�͹��ܽ�ɫ)
	 * @return
	 * @throws ServiceException
	 */
	public RoleColl getAllRoleList() throws ServiceException;
	/**
	 * ϵͳ
	 * @return
	 * @throws ServiceException
	 */
	public SystemColl getAllSystemList() throws ServiceException;
	/**
	 * ������֯��������(organ,area),���(id) �õ���֯�������ͼ���
	 * @param kind
	 * @param id
	 * @return OrganKindColl
	 * @throws ServiceException
	 */
	public OrganKindColl getOrganKindColl(String kind,String id) throws ServiceException;
}
