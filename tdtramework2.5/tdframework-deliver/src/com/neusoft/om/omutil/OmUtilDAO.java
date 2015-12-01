package com.neusoft.om.omutil;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-12</p>
 * <p>Module     : om</p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface OmUtilDAO extends BaseDao{
	public static final String BEAN = "omUtilDAO";
	/**
	 * ���ش���������뵱ǰϵͳʱ��Ĳ�ֵ,��ʽ:yyyymmddhh����yyyymmddhhmiss
	 * @param compareDate
	 * @return
	 * @throws DataAccessException
	 */
	public int getEffectDays(String compareDate)throws DataAccessException;
	/**
	 * ��ǰϵͳʱ��+numDays ���ʱ��,���ظ�ʽ yyyymmddhh24miss
	 * @param numDays
	 * @return
	 * @throws DataAccessException
	 */
	public String getDays(int numDays)throws DataAccessException;
	/**
	 * ���������ŵõ���������
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public String getPartCity(String areaId) throws DataAccessException;
	/**
     * ��ѯ��������������Ϣ
     * @param name
     * @return
     * @throws DataAccessException
     */
     public String getDealerNameById(String dealerId) throws DataAccessException;
     /**
      * ��ѯ��������������Ϣ
      * @param name
      * @return
      * @throws DataAccessException
      */
      public String getRegionCodeById(String dealerId) throws DataAccessException;

}
