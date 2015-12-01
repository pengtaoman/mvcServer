package com.neusoft.om.omutil;

import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface OmOrganUtilDAO extends BaseDao{
	/**
	 * �õ����Ŷ�Ӧ����֯�������ݽ�ɫ
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int getOrganParamId(String employeeId) throws DataAccessException;
	
	/**
	 * �õ�����֯����ƽ������֯��������Щ��֯����������������֯������parent��Ϊ�գ��򷵻����ֵܲ��ţ�
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameLevelAndChildOrgan(String organId) throws DataAccessException;
	
	/**
	 * �õ�����֯����ƽ����������֯������parentΪ�գ��򷵻�ͬ��������parentΪ�յĲ��ź���Щ���ŵ������¼�����
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameAndChildPrtIsNull(String organId) throws DataAccessException;
	
	/**
	 * �õ���ǰ��֯���������¼���������֯�����������¼������¼�...��
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getChildOrganColl(String organId) throws DataAccessException;
	
	/**
	 * �õ�����֯����ƽ�����г�������Щ�г����¼��������г�����ֻ�����г������͵Ĳ�������
	 * �����ڵ�ǰ�г������ϼ���Ϊ�յ����
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameLevelAndChildMarket(String organId) throws DataAccessException;
	
	/**
	 * �õ�����֯����ƽ�����г�������Щ�г����¼��������г�����ֻ�����г������͵Ĳ�������
	 * �����ڵ�ǰ�г������ϼ�Ϊ�յ������
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameAndCldMarketPrtIsNull(String organId) throws DataAccessException;
	
	/**
	 * �õ���ǰ�г��������¼��������г����������¼������¼�...��
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getChildMarketColl(String organId) throws DataAccessException;

	/**
	 * �õ���ǰ�г��������¼��������г����������¼������¼�...��
	 * Ҫ��city_code��ͬ���г���
	 * @param organId
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameCityChildMarketColl(String organId, String cityCode) throws DataAccessException;
	/**
	 * �õ�����֯����ƽ�����г�������Щ�г����¼��������г�����ֻ�����г������͵Ĳ�������
	 * �����ڵ�ǰ�г������ϼ���Ϊ�յ����
	 * Ҫ�󷵻�city_code��ͬ���г���
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameLevelAndChildMarket(String organId, String cityCode) throws DataAccessException;
	
	/**
	 * �õ�����֯����ƽ�����г�������Щ�г����¼��������г�����ֻ�����г������͵Ĳ�������
	 * �����ڵ�ǰ�г������ϼ�Ϊ�յ������
	 *  Ҫ�󷵻�city_code��ͬ���г���
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameAndCldMarketPrtIsNull(String organId, String cityCode) throws DataAccessException;
	
	/**
	 * �õ�����city_code��Ӧ���е������г������������г���
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getAllCityMarket(String cityCode) throws DataAccessException;
	
	/**
	 * �õ�city_code��Ӧ���л�ʡ�ݵ����в���
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getAllCityOrgan(String cityCode) throws DataAccessException;
	
	public int getAreaLevel(String areaId) throws DataAccessException;
	
	public int getDepartmentKind(String organId) throws DataAccessException;
}
