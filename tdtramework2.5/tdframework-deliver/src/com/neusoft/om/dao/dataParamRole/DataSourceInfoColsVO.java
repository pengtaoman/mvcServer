/**
 * 
 */
package com.neusoft.om.dao.dataParamRole;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

/***************************************************************
 * ������ : 
 * ����  : 2007-8-11
 * ����  : sunchonggui@neusoft.com
 * ģ��  : 
 * ����  :  
 * ��ע  : 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���  ����  �޸���   �޸�ԭ��
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
     * ��SQL�Ľ������������ 
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
     * ͨ��MAP��ʼ����Ϣ 
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
