package com.neusoft.tdframework.dao;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description �־ò���Ҫ�̳еĻ����ӿ�
 * <p>Date       : 2004-10-22</p>
 * <p>Module     : </p>
 * <p>Description: ��װһЩ���÷����ͳ־ò����ʵ�ֵķ���</p>
 * <p>Remark     : </p>
 * @author test
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */

public interface DateDAO extends BaseDao{
	public static final String BEAN = "dateDAO";
	/**
	 * ��ȡʱ����Ϣ
	 * @return
	 * @throws DataAccessException
	 */
	public String getDate() throws DataAccessException;
	
}
