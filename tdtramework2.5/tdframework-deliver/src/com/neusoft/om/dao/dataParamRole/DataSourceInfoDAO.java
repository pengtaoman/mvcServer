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
 * 作者  : sunchonggui@neusoft.com
 * 模块  : 
 * 描述  : 
 * 备注  : 
 * ------------------------------------------------------------
 * 修改历史
 * 序号  日期  修改人   修改原因
 * 1
 * 2
 ***************************************************************/
public interface DataSourceInfoDAO extends BaseDao{
    
    public static final String BEAN = "dataFilterDAO";
    
    /**
     * 获取om_param_table_desc_t 中信息
     * @param 
     * @return
     */
    public ParamObjectCollection getTables() throws DataAccessException;
   
    /**
     * 根据条件查询Bb_Account_Info_T结果集总行数
     * @param tableId
     * @param tableDesc
     * @param showNewData
     * @return
     * @throws DataAccessException
     */
    public int getRowCount(String tableId,String tableDesc,String showNewData) throws DataAccessException;
   
    /**
     * 根据条件查询OM_DATA_FILTER_T结果集
     * @param tableId
     * @param tableDesc
     * @param showNewData
     * @param beginNum
     * @param endNum
     * @return
     * @throws DataAccessException
     */
    public List getInfoColl(String tableId,String tableDesc,String showNewData,int beginNum,int endNum) throws DataAccessException;
    
    /**
     * //根据表名查询该表含有列的总记录数
     * @param 
     * @return
     */
    public int getColsCount(String tableName) throws DataAccessException;
    /**
     * 根据表名获取表内字段和数据类型 结果集
     * @param 
     * @return
     */
    public List getColsInfoColl(String table) throws DataAccessException; 
    /**
     * 获取关联过滤器OM_PARAM_FILTER_INFO_T
     * @param 
     * @return
     */
    public ParamObjectCollection getFilter() throws DataAccessException;
    
    /**
     *  向 om_param_table_desc_t 中增加数据
     * @param tableName
     * @param tableDesc
     * @param showNewData
     * @return
     * @throws DataAccessException
     */
    public String doSaveDesc(String tableName,String tableDesc,String showNewData) throws DataAccessException;
    /**
     * 新增保存方法
     * @param 
     * @return
     */
    public String doSave(String values []) throws DataAccessException;
    /**
     * //新增后回显
     * @param 
     * @return
     */
    public int getRowCountBack() throws DataAccessException ;
    /**
     * //新增后回显
     * @param 
     * @return
     */
    public List getInfoCollBack( int beginNum, int endNum)throws DataAccessException ;
    /**
     * 删除方法
     * @param 
     * @return
     */
    public String doDelete(String values []) throws DataAccessException;
    
    /**
     * 获取到详细信息用于修改 时显示数据
     * @param 
     * @return
     */
    public DataSourceInfoVO modiInit(String tableId,String columnInfo ) throws DataAccessException;
    /**
     * 修改方法
     * @param 
     * @return
     */
      public String modify(HashMap map) throws DataAccessException ;    
      /**
       * 查询OM_PARAM_TABLE_INFO_T 总记录数 修改回显
       * @param 
       * @return
       */
      public int getRowCountL(HashMap map) throws DataAccessException ;
      /**
       * 查询OM_PARAM_TABLE_INFO_T 总记录 修改回显
       * @param 
       * @return
       */
      public List getInfoCollL(HashMap map) throws DataAccessException ;
}
