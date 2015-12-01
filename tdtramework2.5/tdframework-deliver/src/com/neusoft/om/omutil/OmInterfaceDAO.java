package com.neusoft.om.omutil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.neusoft.om.dao.container.ContainerVO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.organization.OrganColl;
import com.neusoft.om.dao.region.RegionVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;

public interface OmInterfaceDAO {

	/**
	 * ���������ʶȡ��������Ϣ�����ݶ����������ṩ
	 */
	public ParamObjectCollection getRegionCollById(HashMap<String, String> paramMap) throws DataAccessException;
	
	/**
	 * ���������ʶ�����򼶱�ȡ��������Ϣ�����ݶ����������ṩ
	 */
	public ParamObjectCollection getRegionCollByLevel(HashMap<String, String> paramMap) throws DataAccessException;
	
	/**
	 * ���������ʶȡ������������Ϣ�����ݶ����������ṩ
	 */
	public ParamObjectCollection getAllCityCollById(HashMap<String, String> paramMap) throws DataAccessException;
	
	/**
	 * ���������ʶȡ������������Ϣ�����ݶ����������ṩ
	 */
	public ParamObjectCollection getAllTownCollById(HashMap<String, String> paramMap) throws DataAccessException;
	
	/**
	 * ���ݲ���Ա����ȡ��ָ�����б���������������Ϣ�����ݶ����������ṩ
	 */
	public ParamObjectCollection getRegionCollByOperLevel(HashMap<String, String> paramMap) throws DataAccessException;
	
	/**
	 * ȡ�ö�Ӧ�����µĵ�½�˺ź�ְԱ���������ݶ����������ṩ
	 */
	public ParamObjectCollection getStaffCollByDealerId(HashMap<String, String> paramMap) throws DataAccessException; 
	
	/**
	 * ����city_code�������е���֯������������Դ�������ṩ
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getOrganCollByCityCode(String cityCode) throws DataAccessException;
	
	/**
	 * �õ�������ĳ���������й��ţ�������Դ�������ṩ
	 * @param channelId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getSystemUserCollByChannelId(int channelId) throws DataAccessException;
	
	/**
	 * �õ�ָ����֯�����ڵ����й��ţ�������Դ�������ṩ
	 * @param orgId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getSystemUserCollByOrgId(int orgId) throws DataAccessException;
	
	/**
	 * �����ϼ����б���õ���������������Ϣ�����ݶ����������ṩ
	 * @param parentRegionId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getCountyByParentRegionId (int parentRegionId) throws DataAccessException;
	
	/**
	 * ��ȡom_container_t��Ϣ�����ݴ����VO�����õ����Բ�ѯ�����з�������,Ϊ�����������ṩ
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public List getContainerColl (ContainerVO vo) throws DataAccessException;
	
	/**Ϊ�������ṩ
	 * ��ȡ������Ϣ�����ݴ����VO�����õ����Բ�ѯ�����з��������ļ�¼����List��
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public List getRegionCollByVO(RegionVO vo) throws DataAccessException;
	
	/** Ϊ�������ṩ
	 * @param map
	 * 	CITY_CODE	����(��ֵ����Ϊ��ѯ����)	String
		COMMON_REGION_ID	����(����ֵ��ȡ���������µ���������ֵ����Ϊ��ѯ����)	String
		STAFF_ID	Ա����ʶ(��ֵ����Ϊ��ѯ����)	number
		STAFF_NAME	Ա������(֧��ģ����ѯ, ��ֵ����Ϊ��ѯ����)	String		
	 * @return
	 * 	HashMap	FLAG	�ɹ�ʧ�ܱ�ʶ 1-�ɹ� 0-ʧ��	Int
				REMSG	ʧ��ʱ��ԭ��	String
				NUM	��������	int
	 * @throws DataAccessException
	 */
	public int getStaffCollCount(Map map) throws DataAccessException;
	
	/**
	 * Ϊ�������ṩ
	 * @param map
	 * 	CITY_CODE	����(��ֵ����Ϊ��ѯ����)	String
		COMMON_REGION_ID	����(����ֵ��ȡ���������µ���������ֵ����Ϊ��ѯ����)	String
		STAFF_ID	Ա����ʶ(��ֵ����Ϊ��ѯ����)	number
		STAFF_NAME	Ա������(֧��ģ����ѯ, ��ֵ����Ϊ��ѯ����)	String
		BEGIN_RN	��ѯ��ʼ��	Int
		END_RN	��ѯ������	Int
	 * @return
	 * 	FLAG	�ɹ�ʧ�ܱ�ʶ 1-�ɹ� 0-ʧ��	Int
		REMSG	ʧ��ʱ��ԭ��	String
		STAFFLIST	���ϲ�ѯ����Ա���б�(list�е�ÿ��VO����Ա�����ڵ�CITY_CODE, COMMON_REGION_ID,
		STAFF_ID,
		STAFF_NAME)	List
	 * @throws DataAccessException
	 */
	public List getStaffColl(Map map) throws DataAccessException;
	
	/**Ϊ�������ṩ  -- ��һ���Է����ֶ��Ż����ƵĹ���ʹ��  
	 * �жϴ�����û��������� �Ƿ�ƥ���Լ��Ĺ��Ŷ�ָ����pageLink��Ӧ������Ƿ��в�����Ȩ��
	 * @param account
	 * @param pwd
	 * @param pageLink 
	 * @return
	 */
	public boolean haveRight(String account, String pwd, String pageLink) throws DataAccessException;
	/**
	 * �����������֮��,��ͬCityCode�������е���֯����
	 * Ϊ��Դ-�������ṩ
	 * @param level1
	 * @param level2
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganByAreaLevel1(int level1, int level2,String cityCode) throws DataAccessException;
	/**
	 * �����������֮���������е���֯����
	 * Ϊ��Դ-�������ṩ
	 * @param level1
	 * @param level2
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganByAreaLevel(int level1, int level2) throws DataAccessException;
	
	/**
	 * �õ�ʡ��(minLevel)�����¼�������areaId���ϼ���areaIdȷ��������֮���������������֯�����ļ���
	 * ��Դ-������ʹ��
	 * @param minLevel
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganCollByAuthAreaId(String areaId) throws DataAccessException;
    /**
     * �õ���������֮�����������ְԱ
     * Ϊ��Դ-�������ṩ
     * @param level1
     * @param level2
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getEmployeeByAreaLevel1(int level1, int level2,String cityCode) throws DataAccessException;
    /**
     * �õ���������֮�����������ְԱ
     * Ϊ��Դ-�������ṩ
     * @param level1
     * @param level2
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getEmployeeByAreaLevel(int level1, int level2) throws DataAccessException;
    /**
     * 
     * @param areaId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getEmployeeByArea(String areaId) throws DataAccessException;
    
    /**
     * ����ְԱ����õ�Ա����Ϣ
     * @param staffId
     * @return
     * @throws DataAccessException
     */
    public EmployeeVO getEmpByStaffId(String staffId) throws DataAccessException;
    
    /**
     * ���ݹ��ű���õ�Ա����Ϣ
     * @param staffId
     * @return
     * @throws DataAccessException
     */
    public EmployeeVO getEmpBySystemUserId(String systemUserId) throws DataAccessException;
}
