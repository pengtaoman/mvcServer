package com.neusoft.om.dao.dealer;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class DealerStructureVO extends BaseVO{
	private String structId;
	private String structName;
	private String parentStructId;
	private int layer;
	private int leafNode;
	private int dealerType;
	private int dealerKind;
	private String preserve01;
	private String preserve02;

    public int getDealerKind() {
		return dealerKind;
	}

	public void setDealerKind(int dealerKind) {
		this.dealerKind = dealerKind;
	}

	public int getDealerType() {
		return dealerType;
	}

	public void setDealerType(int dealerType) {
		this.dealerType = dealerType;
	}

	public int getLayer() {
		return layer;
	}

	public void setLayer(int layer) {
		this.layer = layer;
	}

	public int getLeafNode() {
		return leafNode;
	}

	public void setLeafNode(int leafNode) {
		this.leafNode = leafNode;
	}

	public String getParentStructId() {
		return parentStructId;
	}

	public void setParentStructId(String parentStructId) {
		this.parentStructId = parentStructId;
	}

	public String getPreserve01() {
		return preserve01;
	}

	public void setPreserve01(String preserve01) {
		this.preserve01 = preserve01;
	}

	public String getPreserve02() {
		return preserve02;
	}

	public void setPreserve02(String preserve02) {
		this.preserve02 = preserve02;
	}

	public String getStructId() {
		return structId;
	}

	public void setStructId(String structId) {
		this.structId = structId;
	}

	public String getStructName() {
		return structName;
	}

	public void setStructName(String structName) {
		this.structName = structName;
	}

	/** 
	    ø’÷µ¥¶¿Ì
	*/
	private String nvl(String str) {
	    return str==null?"":str;
	}
	
	public void setAttribute(ResultSet resultSet) throws SQLException {
	    ResultSetMetaData metaData = resultSet.getMetaData();	
	    for(int i=1;i<=metaData.getColumnCount();i++) { 	
	        String columnName = metaData.getColumnName(i).toLowerCase();
	        if(columnName.intern()=="struct_id".intern())
	        	structId = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="struct_name".intern())
	        	structName = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="parent_struct_id".intern())
	        	parentStructId = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="leaf_node".intern())
	        	leafNode = resultSet.getInt(i);
	        else if(columnName.intern()=="dealer_type".intern())
	        	dealerType = resultSet.getInt(i);
	        else if(columnName.intern()=="dealer_kind".intern())
	        	dealerKind = resultSet.getInt(i);
	        else if(columnName.intern()=="preserve01".intern())
	        	preserve01 = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="preserve02".intern())
	        	preserve02 = nvl(resultSet.getString(i));
	    }
	}
}
