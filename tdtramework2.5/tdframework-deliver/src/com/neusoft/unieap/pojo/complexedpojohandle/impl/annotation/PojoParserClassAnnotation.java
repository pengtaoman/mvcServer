package com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface PojoParserClassAnnotation {

	 String[] parentClass()
	                     default {};

	  String dataStoreNameIfTopClass()
	                     default "I_AM_NOT_TOP_CLASS_ANYWHERE";

	 
	
}
