/**
 * 
 */
package com.neusoft.om.dao.dataParamRole;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;

/***************************************************************
 * 程序名 : FilterRelationVO.java
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
public class FilterRelationVO extends BaseVO { 
	private int sequenceRowId;                            //标识序列
	private int tableId; 								  //数据源表ID
	private String tableInfo;							  //数据源表名
    private String mainFilterInfo; 						  //主动过滤下拉框字段（数据源表中）
    private String mainFilterTable;						  //主动过滤器表名
    private String passiveFilterInfo; 					  //被动过滤下拉框字段（数据源表中）
    private String columnDesc;							  //字段描述
    private int filterId; 								  //对应过滤器ID
    private String filterInfo;							  //过滤器表名
    private String paramColumnInfo;						  //主被动过滤器关联字段
    private ParamObjectCollection filterColumnColl = null;//主被动过滤器关联字段数据集
    private String selectTagName;						  //选择主被动过滤器关联字段下拉框
    private HashMap keyMap = new HashMap();				  //主键字段对应存储MAP
    private String ifUsed;                                //是否已配置联动关系
    
    /**
     * 
     */
    public FilterRelationVO() {
        super();
    }
    /** 
     * 以SQL的结果集设置数据 
     */ 
    public void setAttribute(ResultSet resultSet) throws SQLException { 
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) {
            String columnNames = metaData.getColumnName(i).toLowerCase();
            if(columnNames.intern()=="row_id".intern())
            	sequenceRowId = resultSet.getInt(i);
            if(columnNames.intern()=="table_id".intern())
            	tableId = resultSet.getInt(i);
            if(columnNames.intern()=="table_name".intern())
            	tableInfo = resultSet.getString(i);
            if(columnNames.intern()=="main_filter_info".intern())
            	mainFilterInfo = resultSet.getString(i);
            if(columnNames.intern()=="passive_filter_info".intern())
            	passiveFilterInfo = resultSet.getString(i);
            if(columnNames.intern()=="filter_id".intern())
            	filterId = resultSet.getInt(i);
            if(columnNames.intern()=="filter_info".intern())
            	filterInfo = resultSet.getString(i); 
            if(columnNames.intern()=="param_column_info".intern())
            	paramColumnInfo = resultSet.getString(i); 
            if(columnNames.intern()=="column_desc".intern())
            	columnDesc = resultSet.getString(i);
        }
    }

	public int getFilterId() {
		return filterId;
	}

	public void setFilterId(int filterId) {
		this.filterId = filterId;
	}

	public String getMainFilterInfo() {
		return mainFilterInfo;
	}

	public void setMainFilterInfo(String mainFilterInfo) {
		this.mainFilterInfo = mainFilterInfo;
	}

	public String getParamColumnInfo() {
		return paramColumnInfo;
	}

	public void setParamColumnInfo(String paramColumnInfo) {
		this.paramColumnInfo = paramColumnInfo;
	}

	public String getPassiveFilterInfo() {
		return passiveFilterInfo;
	}

	public void setPassiveFilterInfo(String passiveFilterInfo) {
		this.passiveFilterInfo = passiveFilterInfo;
	}

	public int getTableId() {
		return tableId;
	}

	public void setTableId(int tableId) {
		this.tableId = tableId;
	} 
    
	public void setKeyMap(String key,String value){
		this.keyMap.put(key,value);
	}
	
	public String getKeyValue(String key){
		return (String)this.keyMap.get(key);
	}
	public String getFilterInfo() {
		return filterInfo;
	}
	public void setFilterInfo(String filterInfo) {
		this.filterInfo = filterInfo;
	}
	public String getTableInfo() {
		return tableInfo;
	}
	public void setTableInfo(String tableInfo) {
		this.tableInfo = tableInfo;
	}
	public String getColumnDesc() {
		return columnDesc;
	}
	public void setColumnDesc(String columnDesc) {
		this.columnDesc = columnDesc;
	}
	public ParamObjectCollection getFilterColumnColl() {
		return filterColumnColl;
	}
	public void setFilterColumnColl(ParamObjectCollection filterColumnColl) {
		this.filterColumnColl = filterColumnColl;
	}
	public int getSequenceRowId() {
		return sequenceRowId;
	}
	public void setSequenceRowId(int sequenceRowId) {
		this.sequenceRowId = sequenceRowId;
	}
	public String getSelectTagName() {
		return selectTagName;
	}
	public void setSelectTagName(String selectTagName) {
		this.selectTagName = selectTagName;
	}
	public String getIfUsed() {
		return ifUsed;
	}
	public void setIfUsed(String ifUsed) {
		this.ifUsed = ifUsed;
	}
	public String getMainFilterTable() {
		return mainFilterTable;
	}
	public void setMainFilterTable(String mainFilterTable) {
		this.mainFilterTable = mainFilterTable;
	}
}
