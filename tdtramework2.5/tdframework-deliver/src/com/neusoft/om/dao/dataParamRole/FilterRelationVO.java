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
 * ������ : FilterRelationVO.java
 * ����  : 2007-8-11
 * ����  : yanglm@neusoft.com
 * ģ��  : 
 * ����  :  
 * ��ע  : 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���  ����  �޸���   �޸�ԭ��
 * 1
 * 2
 ***************************************************************/
public class FilterRelationVO extends BaseVO { 
	private int sequenceRowId;                            //��ʶ����
	private int tableId; 								  //����Դ��ID
	private String tableInfo;							  //����Դ����
    private String mainFilterInfo; 						  //���������������ֶΣ�����Դ���У�
    private String mainFilterTable;						  //��������������
    private String passiveFilterInfo; 					  //���������������ֶΣ�����Դ���У�
    private String columnDesc;							  //�ֶ�����
    private int filterId; 								  //��Ӧ������ID
    private String filterInfo;							  //����������
    private String paramColumnInfo;						  //�����������������ֶ�
    private ParamObjectCollection filterColumnColl = null;//�����������������ֶ����ݼ�
    private String selectTagName;						  //ѡ�������������������ֶ�������
    private HashMap keyMap = new HashMap();				  //�����ֶζ�Ӧ�洢MAP
    private String ifUsed;                                //�Ƿ�������������ϵ
    
    /**
     * 
     */
    public FilterRelationVO() {
        super();
    }
    /** 
     * ��SQL�Ľ������������ 
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
