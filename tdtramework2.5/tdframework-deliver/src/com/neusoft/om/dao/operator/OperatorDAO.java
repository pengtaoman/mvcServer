package com.neusoft.om.dao.operator;

import java.util.Properties;

import com.neusoft.popedom.Operator;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2007-04-18</p>
 * <p>Module     : om</p>
 * <p>Description: operator maintenance</p>
 * <p>Remark     : �޸�popedom�еķ���</p>
 * @author zhaof@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface OperatorDAO extends BaseDao{
	public Operator getOperator(String account) throws DataAccessException;
	public Properties getOperatorInfo(String account) throws DataAccessException;
}
