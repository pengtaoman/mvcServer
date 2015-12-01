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
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface IntEmployeeDAO extends BaseDao {
	public static final String BEAN = "intEmployeeDAO";
	/**
	 * 向中间表中插入数据,增加：operType=1 修改 2  删除 3
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doInsertSynInfo(IntEmployeeVO vo,int operType) throws DataAccessException;
     
     /**
      * 读取同步数据处理结果
      * @param vo
      * @return
      * @throws DataAccessException
      */
     public int getResult(IntEmployeeVO vo) throws DataAccessException; 
}
