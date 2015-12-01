/**
 * 
 */
package com.neusoft.om.dao.dataParamRole;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

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
public class DataSourceInfoColsVO extends BaseVO { 

    /**
     * 
     */
    public DataSourceInfoColsVO() {
        super();
        // TODO Auto-generated constructor stub
    }


    private String columnName; 
    private String dataType; 
    
    /**
     * @return Returns the columnName.
     */
    public String getColumnName() {
        return columnName;
    }

    /**
     * @param columnName The columnName to set.
     */
    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    /**
     * @return Returns the dataType.
     */
    public String getDataType() {
        return dataType;
    }

    /**
     * @param dataType The dataType to set.
     */
    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    /** 
     * 以SQL的结果集设置数据 
     */ 
    public void setAttribute(ResultSet resultSet) throws SQLException { 
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) {
            String columnNames = metaData.getColumnName(i).toLowerCase();
            if(columnNames.intern()=="column_name".intern())
                columnName = resultSet.getString(i);
            if(columnNames.intern()=="data_type".intern())
                dataType = resultSet.getString(i);
           
        }
    } 
    /** 
     * 通过MAP初始化信息 
     */ 
//    public void setAttribute(java.util.HashMap map)throws NumberFormatException { 
//        filterName=NullProcessUtil.nvlToString(map.get("filter_name"),""); 
//        filterKey=Integer.parseInt(NullProcessUtil.nvlToString(map.get("filter_id"), "-100")); 
//        tableName=NullProcessUtil.nvlToString(map.get("table_name"),"");
//        
//        columnName=NullProcessUtil.nvlToString(map.get("column_name"),""); 
//        columnKind = Integer.parseInt(NullProcessUtil.nvlToString(map.get("column_kind"), "-100")); 
//        useType = Integer.parseInt(NullProcessUtil.nvlToString(map.get("use_type"), "-100")); 
//        value = NullProcessUtil.nvlToString(map.get("value"),""); 
//        operator =Integer.parseInt(NullProcessUtil.nvlToString(map.get("operator"),""));
//        condGroup =NullProcessUtil.nvlToString(map.get("condGroup"),"");
//    }
   
   
}
