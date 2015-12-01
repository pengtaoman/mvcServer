package com.neusoft.om.dao.organ;

import java.util.Map;
import java.util.Vector;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.organkind.OrganKindColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: ʵ��organ��dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface OrganDAO extends BaseDao {
	public static final String BEAN = "organDAO";
	
	/**
	 * �õ�������֯������Ϣ����
	 * @return OrganColl
	 * @throws DataAccessException
	 */
	public OrganColl getAllOrganInfo() throws DataAccessException;
	
	public OrganColl getAllOrganInfo(String organId) throws DataAccessException;
	
	public OrganColl getOrganInfo(String organId) throws DataAccessException;
	/**
	 * �����������Ҽ�¼
	 * @param organId
	 * @return 
	 * @throws DataAccessException
	 */
	public OrganVO getOrganInfoById(String organId) throws DataAccessException;
	/**
	 * ����������������֯��������
	 * @param areaId
	 * @return 
	 * @throws DataAccessException
	 */
	public OrganColl getOrganInfoByAreaId(String areaId) throws DataAccessException;
	/**
	 * ���ݹ���������ѯ
	 * @param areaId
	 * @return 
	 * @throws DataAccessException
	 */
	public OrganVO getOrganInfoFilter(Map filter) throws DataAccessException;
	/**
	 * ������֯��������,���Ҹ���֯�������¼�����
	 * @param organId
	 * @return OrganColl
	 * @throws DataAccessException
	 */
	public OrganColl getChildOrganInfo(String organId) throws DataAccessException;
	/**
	 * ������֯�������Ͳ�ѯ�������ڸ����͵���֯������Ϣ
	 * @param organKind
	 * @return OrganColl
	 * @throws DataAccessException
	 */
	public OrganColl getOrganInfoByOrganKind(int organKind) throws DataAccessException;
	/**
	 * ����һ����¼����֯��������
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddOrgan(OrganVO vo) throws DataAccessException;
	/*
	 * ͨ���洢�������Ӽ�¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 *
	public int doAddOrganByProc(OrganVO vo) throws DataAccessException;*/
	/**
	 * ��������ɾ��һ����¼
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteOrganById(String organId) throws DataAccessException;
	/**
	 * ���������޸ļ�¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyOrganById(OrganVO vo) throws DataAccessException;

	/**
	 * �����������֮���������е���֯����
	 * @param level1
	 * @param level2
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganByAreaLevel(int level1, int level2) throws DataAccessException;
	
	/**
	 * �ж��Ƿ��������
	 * @return
	 * @throws DataAccessException
	 */
	public boolean repeatedName(String areaId, String organName) throws DataAccessException;
	/**
	 * ����Ӧ������
	 * @return
	 * @throws DataAccessException
	 */
	public String getAppContainer(String key) throws DataAccessException;
	/**
	 * �õ�ʡ��(minLevel)�����¼�������areaId���ϼ���areaIdȷ��������֮���������������֯�����ļ���
	 * @param minLevel
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganCollByAuthAreaId(String areaId) throws DataAccessException;
	
	/**
	 * �õ�ĳ�������֯�������� -- innerTreeʹ��
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public Vector getOrgsByAreaId(String areaId) throws DataAccessException;
	
	/**
	* �õ�������Ϊ�ϼ�ְ�ܲ��ŵ���֯��������
	*/
	public OrganColl getOrganCollByAreaId(String areaId,String organId) throws DataAccessException;
	
	public OrganKindColl getOrganKindColl() throws DataAccessException;

	/**
	 * ����Ȩ����Ա����Ȩ��ϵͳ�п��Կ�����������������в��ż���Щ�������������в���
	 * @param areaId
	 * @param adminType
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganByAreaForOM(String areaId) throws DataAccessException;

	/**
	 * �õ���֯�����������򣬼����¼������򼯺�
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public AreaColl getChildAreaCollByOrganId(String organId) throws DataAccessException;
	
	public OrganColl getSelfAndChildren(String organId) throws DataAccessException;
	
	/**
	 * ������֯�������Ͳ�ѯ��֯������Ϣ
	 * @param minLevel
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganVO getOrganCollByKind4PPM(String organKind,String areaId) throws DataAccessException;
	
	/**
	 * ֻΪPPMʹ�ã���ѯ���ŵķ���
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganVO getOrganInfoById4PPM(String organId) throws DataAccessException;
	
	/**
	 * ������֯����ID��ѯ��֯�ṹ
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSelfAndChildren4PPM(String organId) throws DataAccessException;
	
}
