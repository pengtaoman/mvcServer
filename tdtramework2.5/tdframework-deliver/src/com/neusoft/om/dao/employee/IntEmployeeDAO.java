package com.neusoft.om.dao.employee;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2008-8-15</p>
 * <p>Module     : om</p>
 * <p>Description: authorize</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface IntEmployeeDAO extends BaseDao {
	public static final String BEAN = "intEmployeeDAO";
	/**
	 * ���м���в�������,���ӣ�operType=1 �޸� 2  ɾ�� 3
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doInsertSynInfo(IntEmployeeVO vo,int operType) throws DataAccessException;
     
     /**
      * ��ȡͬ�����ݴ�����
      * @param vo
      * @return
      * @throws DataAccessException
      */
     public int getResult(IntEmployeeVO vo) throws DataAccessException; 
}
