/**
 * 
 */
package com.neusoft.om.bo.dataParamRole.dataSourceInfo;

import java.util.HashMap;
import java.util.List;

import com.neusoft.om.dao.dataParamRole.DataSourceInfoVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/***************************************************************
 * 程序名 : 
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
/**
 * @author wbsuncg
 *
 */
public interface DataSourceInfoBO extends BaseBO{

    
    public static final String BEAN = "dataFilterBO";
    /**
     * 获取om_param_table_desc_t 中信息
     * @param 
     * @return
     */
    public ParamObjectCollection getTables() throws ServiceException;
    /**
     * 根据条件查询OM_DATA_FILTER_T结果集总行数
     * @param tableId
     * @param tableDesc
     * @param showNewData
     * @return
     * @throws ServiceException
     */
    public int getRowCount(String tableId,String tableDesc, String showNewData)throws ServiceException;
    
    /**
     *  根据条件查询OM_DATA_FILTER_T结果集
     * @param tableId
     * @param tableDesc
     * @param showNewData
     * @param beginNum
     * @param endNum
     * @return
     * @throws ServiceException
     */
    public List getInfoColl(String tableId,String tableDesc,String showNewData,int beginNum,int endNum)throws ServiceException;
    /**
     * 根据表名 获取 表内列和列类型的结果集
     * @param 
     * @return
     */
    public List getColsInfoColl(String tableName)throws ServiceException;
    /**
     * //根据表名查询该表含有列的总记录数
     * @param 
     * @return
     */
    public int getColsCount(String tableName) throws ServiceException;
    /**
     * 获取关联过滤器OM_PARAM_FILTER_INFO_T
     * @param 
     * @return
     */
    public ParamObjectCollection getFilter() throws ServiceException;

    /**
     * 向 om_param_table_desc_t 中增加数据
     * @param tableName
     * @param tableDesc
     * @param showNewData
     * @return
     * @throws ServiceException
     */
    public String doSaveDesc(String tableName,String tableDesc,String showNewData) throws ServiceException;
    /**
     * 新增保存方法
     * @param 
     * @return
     */
    public String doSave(String values []) throws ServiceException;
    /**
     * 新增保存后回显
     * @param 
     * @return
     */
    public int getRowCountBack()throws ServiceException;
    
    /**
     * 新增保存后回显
     * @param 
     * @return
     */
    public List getInfoCollBack(int beginNum,int endNum)throws ServiceException;
    /**
     * 删除方法
     * @param 
     * @return
     */
    public String doDelete(String values []) throws ServiceException;
    /**
     * 获取到详细信息用于修改 时显示数据
     * @param 
     * @return
     */
    public DataSourceInfoVO modiInit(String tableId,String columnInfo ) throws ServiceException;
    /**
     * 修改方法
     * @param 
     * @return
     */
    public String modify(HashMap map) throws ServiceException ;
    /**
     * 查询OM_PARAM_TABLE_INFO_T 总记录数 修改回显
     * @param 
     * @return
     */
    public int getRowCountL(HashMap map) throws ServiceException ;
    /**
     * 查询OM_PARAM_TABLE_INFO_T 总记录 修改回显
     * @param 
     * @return
     */
    public List getInfoCollL(HashMap map) throws ServiceException ;

}


