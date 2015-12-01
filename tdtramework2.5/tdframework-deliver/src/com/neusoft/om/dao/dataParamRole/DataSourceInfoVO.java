/**
 * 
 */
package com.neusoft.om.dao.dataParamRole;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

/***************************************************************
 * 程序名 : DataFilterVO.java.java
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
public class DataSourceInfoVO extends BaseVO { 
	private String tableId; 
    private String columnInfo; 
    private String columnKind; 
    private String columnType; 
    private int columnOrder; 
    private String columnDesc; 
    private String filterId; 

    private String tableDesc;
    private String tableName;
    private String ifUsed;
    /**
     * 
     */
    public DataSourceInfoVO() {
        super();
    }
    
    public String getIfUsed() {
		return ifUsed;
	}
	public void setIfUsed(String ifUsed) {
		this.ifUsed = ifUsed;
	}
	/** 
     * 以SQL的结果集设置数据 
     */ 
    public void setAttribute(ResultSet resultSet) throws SQLException { 
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) {
            String columnNames = metaData.getColumnName(i).toLowerCase();
            if(columnNames.intern()=="table_name".intern())
                tableName = resultSet.getString(i);
            if(columnNames.intern()=="table_desc".intern())
                tableDesc = resultSet.getString(i);
            if(columnNames.intern()=="table_id".intern())
                tableId = resultSet.getString(i);
            if(columnNames.intern()=="column_info".intern())
                columnInfo = resultSet.getString(i);
            if(columnNames.intern()=="table_kind".intern())
                columnKind = resultSet.getString(i); 
            if(columnNames.intern()=="column_type".intern()){
                int valcolumnType = resultSet.getInt(i);
                if(valcolumnType==1){
                    columnType="ID";
                }else if(valcolumnType==2){
                    columnType="NAME";
                }else if(valcolumnType==3){
                    columnType="PK";
                }else if(valcolumnType==4){
                    columnType="FK";
                }
            } 
            if(columnNames.intern()=="column_kind".intern())
                columnKind = resultSet.getString(i);
            if(columnNames.intern()=="column_order".intern())
                columnOrder = resultSet.getInt(i);
            if(columnNames.intern()=="column_desc".intern())
                columnDesc = resultSet.getString(i);
            if(columnNames.intern()=="filter_id".intern())
                filterId = resultSet.getString(i);
            
        }
    } 
    /** 
     * 以SQL的结果集设置数据 
     */ 
    public void setAttributeVO(ResultSet resultSet) throws SQLException { 
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) {
            String columnNames = metaData.getColumnName(i).toLowerCase();
            if(columnNames.intern()=="table_name".intern())
                tableName = resultSet.getString(i);
            if(columnNames.intern()=="table_desc".intern())
                tableDesc = resultSet.getString(i);
            if(columnNames.intern()=="table_id".intern())
                tableId = resultSet.getString(i);
            if(columnNames.intern()=="column_info".intern())
                columnInfo = resultSet.getString(i);
            if(columnNames.intern()=="table_kind".intern())
                columnKind = resultSet.getString(i); 
            if(columnNames.intern()=="column_type".intern()){
                columnType = resultSet.getString(i);
            }                
            if(columnNames.intern()=="column_kind".intern())
                columnKind = resultSet.getString(i);
            if(columnNames.intern()=="column_order".intern())
                columnOrder = resultSet.getInt(i);
            if(columnNames.intern()=="column_desc".intern())
                columnDesc = resultSet.getString(i);
            if(columnNames.intern()=="filter_id".intern())
                filterId = resultSet.getString(i);
//            if(columnNames.intern()=="table_desc".intern())
//                tableDesc = resultSet.getString(i);
        }
    } 
  
    /**
     * @return Returns the columnDesc.
     */
    public String getColumnDesc() {
        return columnDesc;
    }
    /**
     * @param columnDesc The columnDesc to set.
     */
    public void setColumnDesc(String columnDesc) {
        this.columnDesc = columnDesc;
    }
    /**
     * @return Returns the columnInfo.
     */
    public String getColumnInfo() {
        return columnInfo;
    }
    /**
     * @param columnInfo The columnInfo to set.
     */
    public void setColumnInfo(String columnInfo) {
        this.columnInfo = columnInfo;
    }
    /**
     * @return Returns the columnKind.
     */
    public String getColumnKind() {
        return columnKind;
    }
    /**
     * @param columnKind The columnKind to set.
     */
    public void setColumnKind(String columnKind) {
        this.columnKind = columnKind;
    }
    /**
     * @return Returns the columnOrder.
     */
    public int getColumnOrder() {
        return columnOrder;
    }
    /**
     * @param columnOrder The columnOrder to set.
     */
    public void setColumnOrder(int columnOrder) {
        this.columnOrder = columnOrder;
    }
    /**
     * @return Returns the columnType.
     */
    public String getColumnType() {
        return columnType;
    }
    /**
     * @param columnType The columnType to set.
     */
    public void setColumnType(String columnType) {
        this.columnType = columnType;
    }
    /**
     * @return Returns the filterId.
     */
    public String getFilterId() {
        return filterId;
    }
    /**
     * @param filterId The filterId to set.
     */
    public void setFilterId(String filterId) {
        this.filterId = filterId;
    }
   /* *//**
     * @return Returns the tableDesc.
     *//*
    public String getTableDesc() {
        return tableDesc;
    }
    *//**
     * @param tableDesc The tableDesc to set.
     *//*
    public void setTableDesc(String tableDesc) {
        this.tableDesc = tableDesc;
    }*/
    /**
     * @return Returns the tableId.
     */
    public String getTableId() {
        return tableId;
    }
    /**
     * @param tableId The tableId to set.
     */
    public void setTableId(String tableId) {
        this.tableId = tableId;
    }
    /**
     * @return Returns the tableDesc.
     */
    public String getTableDesc() {
        return tableDesc;
    }
    /**
     * @param tableDesc The tableDesc to set.
     */
    public void setTableDesc(String tableDesc) {
        this.tableDesc = tableDesc;
    }
    /**
     * @return Returns the tableName.
     */
    public String getTableName() {
        return tableName;
    }
    /**
     * @param tableName The tableName to set.
     */
    public void setTableName(String tableName) {
        this.tableName = tableName;
    }
   
}
