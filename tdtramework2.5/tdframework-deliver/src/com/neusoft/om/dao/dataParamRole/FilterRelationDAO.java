package com.neusoft.om.dao.dataParamRole;

import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/***************************************************************
 * 程序名 : DataFilterDAO.java.java
 * 日期  : 2007-8-11
 * 作者  : yanglm@neusoft.com
 * 模块  : 
 * 描述  : 
 * 备注  : 
 * ------------------------------------------------------------
 * 修改历史
 * 序号  日期  修改人   修改原因
 * 1
 * 2
 ***************************************************************/
public interface FilterRelationDAO extends BaseDao{
    
    public static final String BEAN = "filterRelationDAO";
    
    /**
     * 获取所有配置了关联过滤器的数据源表信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterTables() throws DataAccessException;
    /**
     * 根据数据源表标识获取数据源表描述
     * @param 
     * @return
     */
    public String getTableDescById(int tableId) throws DataAccessException;
    /**
     * 根据数据源表标识获取过滤器信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterCollById(int tableId) throws DataAccessException;
    /**
     * 根据数据源表标识，获取过滤器下拉框关系信息
     * @param 
     * @return
     */
    public List getFilterRelList(int tableId) throws DataAccessException;
    /**
     * 根据数据源表标识和主过滤下拉框，获取被动下拉框信息
     * @param 
     * @return
     */
    public List getPassiveFilter(int tableId,String mainColumn,String operType) 
    	throws DataAccessException;
    /**
     * 根据过滤器表名和被动过滤字段类型，获取对应的被动下拉框字段信息集合
     * @param 
     * @return
     */
    public List getFilterColumn(List filterInfo) throws DataAccessException;
    /**
     *  获取该表对应的过滤器信息
     * @param
     * @return
     */
    public HashMap getPassiveSelectInfo(int tableId,String column_info,
    	String[] mainValues) throws DataAccessException;
    /**
     * 根据过滤器SQL获取过滤器信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterInfoColl(String sql) 
		throws DataAccessException;
    /**
     * 根据数据源表标识，主过滤器字段和被动过滤器标识，删除过滤器关系配置信息
     * @param 
     * @return
     */
    public int deleteFilterRel(List values) throws DataAccessException;
    /**
     * 根据数据源表标识，主过滤器字段和被动过滤器标识，删除过滤器关系配置信息
     * @param 
     * @return
     */
    public int addFilterRel(List values,int tableId,String mainColumn,
    	String operType) throws DataAccessException;

      
}
