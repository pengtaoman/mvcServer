package com.neusoft.om.omutil;

import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

public interface OmOrganUtilBO extends BaseBO{
	/**
	 * �������ԱID�����ظò���Ա�ɼ���������֯������Ϣ
	 * ����ԱȨ�޷�Ϊ����
	 * ���Ȩ�޵Ŀɼ����������ڲ��ţ��뱾�����ڲ���ƽ�������parent��Ϊ����ƽ����ʾͬһ�����׵��ֵܣ����parentΪ�գ�
	 * 				��ƽ����ʾareaId��ͬ��parentΪ�յĲ��ţ�������Щ��֯�������¼�������֯����
	 * �е�Ȩ�޵Ŀɼ����������ڲ��ż����¼����еĲ���
	 * ��СȨ�޵Ŀɼ����������ڲ���
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getOrganCollByAuthId(String employeeId) throws ServiceException;
	
	/**
	 * �������ԱID�����ظò���Ա�ɼ��������г�����Ϣ
	 * ����ԱȨ�޷�Ϊ����
	 * ���Ȩ�޵Ŀɼ������������г������뱾�������г���ƽ�������parent��Ϊ����ƽ����ʾͬһ�����׵��ֵܣ����parentΪ�գ�
	 * 				��ƽ����ʾareaId��ͬ��parentΪ�յ��г�����������Щ�г������¼������г���
	 * �е�Ȩ�޵Ŀɼ������������г��������¼����е��г���
	 * ��СȨ�޵Ŀɼ������������г���
	 * ǰ�᣺��ǰ����Ա�����Ĳ���һ�����г������Ͳſ���
	 * @param employeeId
	 * @param cityCode
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getMarketCollByAuthId(String employeeId, String cityCode) throws ServiceException;
	
	/**
	 * ���ز���Ա�������¼��г�����Ϣ�����ص�����Ҫ��city_code��ͬ��
	 * @param employeeId
	 * @param cityCode
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getChildMarketCollByAuthId(String employeeId, String cityCode) throws ServiceException;
	
	/**
	 * �����г���ID�������г����������¼��г�����Ϣ(ͬ����)
	 * ���ص�����Ҫ��city_code��ͬ
	 * @param organId
	 * @param cityCode
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getChildMarketCollByOrgId( String organId, String cityCode ) throws ServiceException;
	
	/**
	 * �����г���ID�������г���������ͬ�����г�����Ϣ(�˴�ͬ������ָ���г������������AREA_LEVEL��ͬ�����ҹ�����ͬһ���г���)
	 * ���ص�����Ҫ��city_code��ͬ
	 * @param organId
	 * @param cityCode
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getSameLevelAndCldOrgColl(String organId, String cityCode) throws ServiceException;
}
