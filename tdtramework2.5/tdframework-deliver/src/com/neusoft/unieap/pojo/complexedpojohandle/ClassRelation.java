package com.neusoft.unieap.pojo.complexedpojohandle;

import com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.PojoParserComplexPropertyAnnotation.Relation;
import com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.PojoParserComplexPropertyAnnotation.StoresRelationType;

public class ClassRelation{
	
	
	
	public ClassRelation(StoresRelationType srts, String mainClsName,
			String childClsName, String dataStoreName, Relation relation,
			String setMethod, String getMethod, String fieldName) {
		super();
		this.srts = srts;
		this.mainClsName = mainClsName;
		this.childClsName = childClsName;
		this.dataStoreName = dataStoreName;
		this.relation = relation;
		this.setMethod = setMethod;
		this.getMethod = getMethod;
		this.fieldName=fieldName;
	}


	StoresRelationType srts=null;
	String mainClsName=null;	
	String childClsName=null;
	String dataStoreName=null;
	Relation relation=null;
	String setMethod=null;
	String getMethod=null;
	String fieldName=null;
	
	
	public String getFieldName() {
		return fieldName;
	}

	public StoresRelationType getStoresRelationType() {
		return srts;
	}
	
	public String getMainClsName() {
		return mainClsName;
	}
	public String getChildClsName() {
		return childClsName;
	}
	public String getDataStoreName() {
		return dataStoreName;
	}
	public Relation getRelation() {
		return relation;
	}
	public String getSetMethod() {
		return setMethod;
	}


	public String getGetMethod() {
		return getMethod;
	}

}

