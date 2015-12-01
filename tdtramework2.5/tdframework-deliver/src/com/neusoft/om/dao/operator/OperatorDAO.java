package com.neusoft.om.dao.operator;

import java.util.Properties;

import com.neusoft.popedom.Operator;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2007-04-18</p>
 * <p>Module     : om</p>
 * <p>Description: operator maintenance</p>
 * <p>Remark     : 修改popedom中的方法</p>
 * @author zhaof@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface OperatorDAO extends BaseDao{
	public Operator getOperator(String account) throws DataAccessException;
	public Properties getOperatorInfo(String account) throws DataAccessException;
}
