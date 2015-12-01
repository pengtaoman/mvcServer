package com.neusoft.tdframework.dao;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description 持久层需要继承的基本接口
 * <p>Date       : 2004-10-22</p>
 * <p>Module     : </p>
 * <p>Description: 封装一些公用方法和持久层必须实现的方法</p>
 * <p>Remark     : </p>
 * @author test
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */

public interface DateDAO extends BaseDao{
	public static final String BEAN = "dateDAO";
	/**
	 * 获取时间信息
	 * @return
	 * @throws DataAccessException
	 */
	public String getDate() throws DataAccessException;
	
}
