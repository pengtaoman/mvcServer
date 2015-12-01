/**
 * 
 */
package com.neusoft.om.bo.dataParamRole.filterRelation;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.neusoft.om.dao.dataParamRole.DataSourceInfoVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/***************************************************************
 * 程序名 : 
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
public interface FilterRelationBO extends BaseBO{

    
    public static final String BEAN = "filterRelationBO";
    /**
     * 获取所有配置了关联过滤器的数据源表信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterTables() throws ServiceException;
    /**
     * 根据数据源表标识获取数据源表描述
     * @param 
     * @return
     */
    public String getTableDescById(String tableId) throws ServiceException;
    /**
     * 根据数据源表标识获取过滤器信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterCollById(String tableId) throws ServiceException;
    /**
     * 局部刷新，获取过滤器下拉框
     * @param 
     * @return
     */
    public ParamObjectCollection getPassiveSelect(String tableId,HashMap dataMap,
    		HttpSession session) throws ServiceException;
    /**
     * 根据数据源表标识和主过滤下拉框，获取被动下拉框信息
     * @param 
     * @return
     */
    public List getFilterRelList(String tableId) throws ServiceException;
    /**
     * 根据数据源表标识和主过滤下拉框，获取被动下拉框信息
     * @param 
     * @return
     */
    public List getPassiveFilter(String tableId,String mainColumn,String operType) 
    	throws ServiceException;
    /**
     * 根据数据源表标识，主过滤器字段和被动过滤器标识，删除过滤器关系配置信息
     * @param 
     * @return
     */
    public String deleteFilterRel(String[] values) throws ServiceException;
    /**
     * 根据数据源表标识，主过滤器字段和被动过滤器标识，删除过滤器关系配置信息
     * @param 
     * @return
     */
    public String addFilterRel(String[] values,String tableId,String mainColumn,
    	String operType) throws ServiceException;
    
    
}


