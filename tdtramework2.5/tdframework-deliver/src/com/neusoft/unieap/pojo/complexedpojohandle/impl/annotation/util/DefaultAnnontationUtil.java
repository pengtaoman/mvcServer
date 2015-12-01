package com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import com.neusoft.unieap.pojo.complexedpojohandle.ClassRelation;
import com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.PojoParserClassAnnotation;
import com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.PojoParserComplexPropertyAnnotation;
import com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.PojoParserComplexPropertyAnnotation.Relation;
import com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.PojoParserComplexPropertyAnnotation.StoresRelationType;
import com.neusoft.unieap.pojo.complexedpojohandle.impl.parser.DefaultPojoAnnotationParser;
import com.neusoft.unieap.ria.IDataStore;

public class DefaultAnnontationUtil {

	
	
	public final static Class POJO_PARSER_COMPLEX_PRPPERTY_ANNOTATION_CLASS=PojoParserComplexPropertyAnnotation.class;
	
	public final static Class POJO_PARSER_TOP_CLASS_ANNOTATION_CLASS=PojoParserClassAnnotation.class;
	
	
	public final static String POJO_PARSER_STORE_SEPERATOR=".";

	public static final String RULE_BASED_DEFAULT_SET_GET_METHOD = PojoParserComplexPropertyAnnotation.RULE_BASED_DEFAULT_SET_GET_METHOD;
	
	
	public static List<ClassRelation> getAllClassRelationsByAnnotation(Class objcls){
		
		
		List<ClassRelation> list=new ArrayList<ClassRelation>();

		Field[] fields=objcls.getDeclaredFields();
	
		int length=fields.length;
		Field field=null;
		for(int i=0;i<length;i++){
			field=fields[i];
			if(field.isAnnotationPresent(DefaultAnnontationUtil.POJO_PARSER_COMPLEX_PRPPERTY_ANNOTATION_CLASS)){
				PojoParserComplexPropertyAnnotation mnao=(PojoParserComplexPropertyAnnotation)field.getAnnotation(DefaultAnnontationUtil.POJO_PARSER_COMPLEX_PRPPERTY_ANNOTATION_CLASS);
				String mainClsName=objcls.getName();
				String childClsName=mnao.targetClass();
				String dataStoreName=mnao.datastoreName();
				Relation relation=mnao.relation();
				StoresRelationType srts=mnao.storesRelationType();
				String setMethod=mnao.setMethod();
				String getMethod=mnao.getMethod();
				
				String fieldName=field.getName();
				
				ClassRelation cr=new ClassRelation(srts,mainClsName,childClsName,dataStoreName,relation,setMethod,getMethod,fieldName);
				
				/*if(this.isOneToOne(cr)){//one to one要被merge,这里先不做,另外多对多(非封閉情况较复杂),多对一先不作
					
					
					
				}else{//一对多 
				
				List<IDataStore> ds=this.createChildrenDataStore(objs,cr);
			
				
				if(ds!=null){				   
					datastores.addAll(ds);
			    }
				}*/
				list.add(cr);
			}
		}
		
		return list;
	}


	public static boolean isOneToOne(ClassRelation cr) {
		// TODO Auto-generated method stub
		return cr.getRelation().equals(PojoParserComplexPropertyAnnotation.Relation.ONE_TO_ONE);
	}


	public static boolean isTopDataStore(IDataStore tm, Class cls) {
		// TODO Auto-generated method stub
		String stname=tm.getStoreName();
		if(cls.isAnnotationPresent(DefaultAnnontationUtil.POJO_PARSER_TOP_CLASS_ANNOTATION_CLASS)){
			PojoParserClassAnnotation ppca=(PojoParserClassAnnotation) cls.getAnnotation(DefaultAnnontationUtil.POJO_PARSER_TOP_CLASS_ANNOTATION_CLASS);
		  // System.out.println(ppca.dataStoreNameIfTopClass()+":"+tm.getStoreName());
			if(ppca.dataStoreNameIfTopClass().equalsIgnoreCase(tm.getStoreName())){
		    	
		      return true;	
		    }
		
		}
		
		return false;
	}


	public static boolean isDataStoreByClass(IDataStore tm, Class cls) {
		// TODO Auto-generated method stub
		
		boolean flag=DefaultAnnontationUtil.isTopDataStore(tm,cls);
		if(flag){
			return true;
		}
		
		
		
		
		return false;
	}



	
	
}
