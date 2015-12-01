package com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation;

import java.lang.annotation.*;


	

@Retention(RetentionPolicy.RUNTIME)
public @interface	PojoParserComplexPropertyAnnotation {
	public enum Relation { ONE_TO_ONE,ONE_MANY,MANY_ONE, MANY_MANY}; 
	//public enum Types { List,Array};
	public enum StoresRelationType { REFERENCE,CONTAINED};
	//public final String RULE_BASED_DEFAULT_TARGET_CLASS_NAME="ruled";	
	public final String RULE_BASED_DEFAULT_SET_GET_METHOD="ruled";
	
	Relation relation()  
              default Relation.ONE_MANY;  
    String targetClass ()  ;//可以考虑制定规范让targetClass和datastoreName名字一样,但是这样会有"."冲突 
             
    String datastoreName();//如果不是定层结点,最后会加上上级datastore命子
    StoresRelationType storesRelationType()//实体是否可以被其他对象引用
               default  StoresRelationType.CONTAINED;
    String setMethod()
              default RULE_BASED_DEFAULT_SET_GET_METHOD;
    String getMethod()
              default RULE_BASED_DEFAULT_SET_GET_METHOD;
    
             
  
   
}


	
	
	

