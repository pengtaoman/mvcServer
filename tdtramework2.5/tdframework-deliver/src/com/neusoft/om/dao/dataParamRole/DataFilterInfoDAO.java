package com.neusoft.om.dao.dataParamRole;

import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

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
public interface DataFilterInfoDAO extends BaseDao{
    
    public static final String BEAN = "dataFilterDAO";
    
    /**
     * 获取om_param_filter_info_t 中信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilters() throws DataAccessException;
    /**
     * 根据条件查询Bb_Account_Info_T结果集总行数
     * @param 
     * @return
     */
    public int getRowCount(String tableId, String tableDesc) throws DataAccessException;
    /**
     * 根据条件查询OM_DATA_FILTER_T结果集
     * @param 
     * @return
     */
    public List getInfoColl(String tableId, String tableDesc, int beginNum, int endNum) throws DataAccessException;
    /**
     * 获取表的列
     * @param 
     * @return
     */
    public ParamObjectCollection getColumn(String tableName) throws DataAccessException;
    /**
     * 新增保存方法
     * @param 
     * @return
     */
    public String doSave(HashMap map) throws DataAccessException;
    /**
     * 新增后回显方法
     * @param 
     * @return
     */
    public int getRowCountBack() throws DataAccessException ;
    /**
     * 新增后回显方法
     * @param 
     * @return
     */
    public List getInfoCollBack(int beginNum, int endNum) throws DataAccessException ;
    /**
     * 修改后回显
     * @param 
     * @return
     */
    public List getInfoCollBack(int filterId) throws DataAccessException;
    /**
     * 删除方法
     * @param 
     * @return
     */
    public String doDelete(String values[]) throws DataAccessException;
    
    /**
     * 修改方法
     * 
     * @param
     * @return
     */
    public DataFilterInfoVO modifyInit(String filterId) throws DataAccessException ;
    /**
     * 修改方法
     * @param 
     * @return
     */
    public String modify(HashMap map) throws DataAccessException;    
     
}
