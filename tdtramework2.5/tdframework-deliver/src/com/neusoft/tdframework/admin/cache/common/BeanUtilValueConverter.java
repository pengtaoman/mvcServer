package com.neusoft.tdframework.admin.cache.common;

import java.util.Date;
import java.text.SimpleDateFormat;

import org.apache.commons.beanutils.ConversionException;
import org.apache.commons.beanutils.Converter;

public class BeanUtilValueConverter implements Converter {

	private Object defaultValue = null;
	private boolean useDefault;

	public BeanUtilValueConverter() {
		this(true, null);
	}

	public BeanUtilValueConverter(boolean useDefault, Object defaultValue) {
		this.useDefault = useDefault;
		this.defaultValue = defaultValue;
	}

	public Object convert(Class type, Object value) {
		
		//System.out.println("################# CONVERT CLASS : " + type.getName() + "### CONVERT VALUE :" + value);

		if (value == null || !(value instanceof String)) {
			if (useDefault) {
				return defaultValue;
			} else {
				throw new ConversionException("No default value specified");
			}
		}

		if (type.equals(String.class)) {
			return value;
		}
		
		if (type.equals(long.class)) {
			return Long.parseLong((String)value);
		}
		
		if (type.equals(Date.class)) {
			SimpleDateFormat sdf = new SimpleDateFormat(CacheConst.datePattern); 
			try {
				return sdf.parse((String)value);
			} catch (Exception ex) {
				ex.printStackTrace();
				throw new ConversionException(ex);
			}
		}
		
		if (type.equals(boolean.class)) {
			return Boolean.parseBoolean((String)value);
		}
		
		if (type.equals(int.class)) {
			return Integer.parseInt((String)value);
		}
		
		if (type.equals(float.class)) {
			return Float.parseFloat((String)value);
		}
		
		if (type.equals(double.class)) {
			return Double.parseDouble((String)value);
		}
		
		if (type.equals(char.class)) {
			return ((String)value).charAt(0);
		}
		
		return null;

	}

}
