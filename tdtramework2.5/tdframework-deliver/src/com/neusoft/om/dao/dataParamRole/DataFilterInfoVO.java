/**
 * 
 */
package com.neusoft.om.dao.dataParamRole;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

/***************************************************************
 * 程序名 : DataFilterInfoVO.java.java
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
public class DataFilterInfoVO extends BaseVO { 

    /**
     * 
     */
    public DataFilterInfoVO() {
        super();
        // TODO Auto-generated constructor stub
    }

    private int filterId;
    private String filterInfo; 
    private String filterDesc; 
    private String filterSelId; 
    private String filterSelValue; 
    private String filterSelParam; 
    
    /** 
     * 以SQL的结果集设置数据 
     */ 
    public void setAttribute(ResultSet resultSet) throws SQLException { 
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) {
            String columnNames = metaData.getColumnName(i).toLowerCase();
            if(columnNames.intern()=="filter_id".intern())
                filterId = resultSet.getInt(i);
            if(columnNames.intern()=="filter_info".intern())
                filterInfo = resultSet.getString(i);
            if(columnNames.intern()=="filter_desc".intern())
                filterDesc = resultSet.getString(i);
            if(columnNames.intern()=="filter_sel_id".intern())
                filterSelId = resultSet.getString(i); 
            if(columnNames.intern()=="filter_sel_value".intern())
                filterSelValue = resultSet.getString(i); 
            if(columnNames.intern()=="filter_sel_param".intern())
                filterSelParam = resultSet.getString(i);
        }
    }

    /**
     * @return Returns the filterDesc.
     */
    public String getFilterDesc() {
        return filterDesc;
    }

    /**
     * @param filterDesc The filterDesc to set.
     */
    public void setFilterDesc(String filterDesc) {
        this.filterDesc = filterDesc;
    }

    /**
     * @return Returns the filterId.
     */
    public int getFilterId() {
        return filterId;
    }

    /**
     * @param filterId The filterId to set.
     */
    public void setFilterId(int filterId) {
        this.filterId = filterId;
    }

    /**
     * @return Returns the filterInfo.
     */
    public String getFilterInfo() {
        return filterInfo;
    }

    /**
     * @param filterInfo The filterInfo to set.
     */
    public void setFilterInfo(String filterInfo) {
        this.filterInfo = filterInfo;
    }

    /**
     * @return Returns the filterSelId.
     */
    public String getFilterSelId() {
        return filterSelId;
    }

    /**
     * @param filterSelId The filterSelId to set.
     */
    public void setFilterSelId(String filterSelId) {
        this.filterSelId = filterSelId;
    }

    /**
     * @return Returns the filterSelParam.
     */
    public String getFilterSelParam() {
        return filterSelParam;
    }

    /**
     * @param filterSelParam The filterSelParam to set.
     */
    public void setFilterSelParam(String filterSelParam) {
        this.filterSelParam = filterSelParam;
    }

    /**
     * @return Returns the filterSelValue.
     */
    public String getFilterSelValue() {
        return filterSelValue;
    }

    /**
     * @param filterSelValue The filterSelValue to set.
     */
    public void setFilterSelValue(String filterSelValue) {
        this.filterSelValue = filterSelValue;
    } 
  
   
}
