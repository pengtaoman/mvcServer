package com.neusoft.om.dao.organdisplay;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-01</p>
 * <p>Module     : om</p>
 * <p>Description: ��ʾ��֯������ͼ��dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface OrganDisplayDAO extends BaseDao {
	public static final String BEAN = "organDisplayDAO";
	/**
	 * ��������Ϣ��OrganDisplay����洢
	 * @param areaId
	 * @return OrganDisplayColl
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getAreaInfoToOrganDisply(String areaId) throws DataAccessException;
	
	public OrganDisplayColl getAreaInfoToOrganDisply(String areaId,int areaLevel) throws DataAccessException;
	/**
	 * ����֯������Ϣ��OrganDisplay����洢
	 * @param areaId
	 * @param level
	 * @return OrganDisplayColl
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getOrganInfoToOrganDisply(String areaId,int level) throws DataAccessException;
	/**
	 * ��ְ����Ϣ��OrganDisplay����洢
	 * @param organId
	 * @param level
	 * @param areaId
	 * @param organKind
	 * @return OrganDisplayColl
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getDutyInfoToOrganDisplay(String organId,int level,String areaId,int organKind) throws DataAccessException;
	/**
	 * �õ�ֻ��������г��������ݣ�������ϵͳʹ��
	 * ע�⣬�����Ƿ��г�����ֻ��ͨ��om_organ_kind_t�е������жϣ�
	 * ���om_organ_kind_t��f_department_kind_t�ֶ�ֵ�������ױ仯���˴���Ϊ2��ʾ�г���
	 * @param areaId
	 * @param level
	 * @return
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getMarketOrganToDisplay(String areaId,int level)throws DataAccessException;
	/**
	 * �õ�ĳorgan_id�������г����µ���������
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getDealerColl(String organId,int level)throws DataAccessException;
	
	public OrganDisplayColl getMarketColl(String areaId, int level) throws DataAccessException;
	
	public OrganDisplayColl getMarketAreaColl(String areaId, int level) throws DataAccessException;
}
