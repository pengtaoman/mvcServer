/**
 * 
 */
package com.neusoft.om.bo.dataParamRole.dataFilterInfo;

import java.util.HashMap;
import java.util.List;

import com.neusoft.om.dao.dataParamRole.DataFilterInfoVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/***************************************************************
 * 程序名 : 
 * 日期  : 2007-8-15
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
public interface DataFilterInfoBO extends BaseBO{
   
    public static final String BEAN = "dataFilterBO";
    /**
     * 获取om_param_filter_info_t 中信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilters() throws ServiceException;
    /**
     * 根据条件查询OM_DATA_FILTER_T结果集总行数
     * @param 
     * @return
     */
    public int getRowCount(String tableId,String tableDesc)throws ServiceException;
    /**
     * 根据条件查询OM_DATA_FILTER_T结果集
     * @param 
     * @return
     */
    public List getInfoColl(String tableId,String tableDesc,int beginNum,int endNum)throws ServiceException;
    /**
     * 获取关联过滤器OM_PARAM_FILTER_INFO_T
     * @param 
     * @return
     */
    public ParamObjectCollection getColumn(String tableName) throws ServiceException;
    /**
     * 新增保存方法
     * @param 
     * @return
     */
    public String doSave(HashMap map) throws ServiceException;
    /**
     * 新增后回显方法
     * @param 
     * @return
     */
    public int getRowCountBack() throws ServiceException ;
    /**
     * 新增后回显方法
     * @param 
     * @return
     */
    public List getInfoCollBack(int beginNum, int endNum) throws ServiceException ;
    /**
     * 修改后回显
     * @param 
     * @return
     */
    public List getInfoCollBack(int filterId)throws ServiceException;   
    /**
     * 删除方法
     * @param 
     * @return
     */
    public String doDelete(String values []) throws ServiceException;
    /**
     * 修改初始化方法
     * 
     * @param
     * @return
     */
    public DataFilterInfoVO modifyInit(String filterId) throws ServiceException;
    /**
     * 修改方法
     * @param 
     * @return
     */
    public String modify(HashMap map) throws ServiceException ;
}


