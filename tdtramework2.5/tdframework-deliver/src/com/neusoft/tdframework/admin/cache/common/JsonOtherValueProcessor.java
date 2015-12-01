package com.neusoft.tdframework.admin.cache.common;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.apache.commons.beanutils.ConversionException;

import net.sf.json.JsonConfig;
import net.sf.json.processors.*;

public class JsonOtherValueProcessor implements JsonValueProcessor {
	
    /** 
     * @param value 
     * @param jsonConfig 
     * @return Object 
     */ 
    public Object processArrayValue(Object value, JsonConfig jsonConfig) { 
        return process(value); 
    } 

    /** 
     * @param key 
     * @param value 
     * @param jsonConfig 
     * @return Object 
     */ 
    public Object processObjectValue(String key, Object value, 
            JsonConfig jsonConfig) { 
        return process(value); 
    } 

    /** 
     * process 
     * @param value 
     * @return 
     */ 
    private Object process(Object value) { 
        try { 
            if (value instanceof Date) { 
                SimpleDateFormat sdf = new SimpleDateFormat(CacheConst.datePattern); 
                return sdf.format((Date) value) + CacheConst.CACHE_SPEC_SEP + "DATE"; 
            } else if (value.getClass().equals(String.class)) {
    			return value;
    		} else if (value.getClass().equals(Long.class)) {
    			return value;
    		} else if (value.getClass().equals(Boolean.class)) {
    			return value;
    		} else if (value.getClass().equals(Integer.class)) {
    			return value;
    		} else if (value.getClass().equals(Float.class)) {
    			return value;
    		} else if (value.getClass().equals(Double.class)) {
    			return value;
    		} else if (value.getClass().equals(Character.class)) {
    			return value;
    		} else {
    			return CacheConst.CACHE_COMPLEX_DATA_AD + CacheConst.CACHE_SPEC_SEP + value.getClass().getName();
    		}
            
        } catch (Exception e) { 
            return ""; 
        } 

    } 

}
