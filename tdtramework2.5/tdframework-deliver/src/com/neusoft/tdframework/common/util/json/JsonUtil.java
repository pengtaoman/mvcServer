package com.neusoft.tdframework.common.util.json;

import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;

public class JsonUtil {
	
	private static Log log = LogFactory.getLog(JsonUtil.class);
	
	private JsonUtil() {}
		
	/**
	 * 转换一般类实例时用，类中可包含类成员变量，List或Map的其他类实例的集合，
	 * 如果json字符串的日期值为长整型，则可以直接转换为类中的java.util.Date类型的成员变量，否则请使用
	 * json2Bean(String jsonStr, String className, String dateFormat)方法或
	 * json2Bean(String jsonStr, Class<T> type, String dateFormat)方法
	 * 
	 * @param jsonStr Json字符串
	 * @param className 转换实例的类名称（全名）
	 * @return 类实例
	 * @throws Exception 转换过程中发生异常
	 */
	public static Object json2Bean(String jsonStr, String className) throws Exception {
		try {
			TdDefaultDateTypeAdapter tdDefaultDateTypeAdapter = new TdDefaultDateTypeAdapter();
			TdTypeAdapterFactory<?> tdTypeAdapterFactory = new TdTypeAdapterFactory<Date>();
			tdTypeAdapterFactory.regAdapter(java.util.Date.class.getName(), tdDefaultDateTypeAdapter);
			Gson gson =  new GsonBuilder().registerTypeAdapterFactory(tdTypeAdapterFactory).create();
			Object returnObj = gson.fromJson(jsonStr, Class.forName(className));
			tdTypeAdapterFactory.clearAdapterMap();
		    return returnObj;
		    
		} catch (Exception ex) {
			
			StringBuilder sbu = new StringBuilder("Json转换VO发生错误01，CLASS NAME：");
			sbu.append(className);
			log.error(sbu.toString(), ex);
			throw new Exception("Json转换VO发生错误01", ex);
		}
	}
	
	/**
	 * 转换一般类实例时用，类中可包含类成员变量，List或Map的其他类实例的集合，
	 * 如果json字符串的日期值为长整型，则可以直接转换为类中的java.util.Date类型的成员变量，否则请使用
	 * json2Bean(String jsonStr, String className, String dateFormat)方法或
	 * json2Bean(String jsonStr, Class<T> type, String dateFormat)方法
	 * 
	 * @param jsonStr Json字符串
	 * @param type 转换实例的Class实例
	 * @return 类实例
	 * @throws Exception 转换过程中发生异常
	 */
	public static <T> Object json2Bean(String jsonStr, Class<T> type) throws Exception {
		try {
			TdDefaultDateTypeAdapter tdDefaultDateTypeAdapter = new TdDefaultDateTypeAdapter();
			TdTypeAdapterFactory<?> tdTypeAdapterFactory = new TdTypeAdapterFactory<Date>();
			tdTypeAdapterFactory.regAdapter(java.util.Date.class.getName(), tdDefaultDateTypeAdapter);
			Gson gson =  new GsonBuilder().registerTypeAdapterFactory(tdTypeAdapterFactory).create();
			Object returnObj = gson.fromJson(jsonStr, type);
			tdTypeAdapterFactory.clearAdapterMap();
		    return returnObj;
		    
		} catch (Exception ex) {
			
			StringBuilder sbu = new StringBuilder("Json转换VO发生错误02，CLASS NAME：");
			sbu.append(type.getName());
			log.error(sbu.toString(), ex);
			throw new Exception("Json转换VO发生错误02", ex);
		}
	}
	
	/**
	 * 转换带有java.util.Date成员变量的类实例时用，可指定日期格式
	 * @param jsonStr Json字符串
	 * @param className 转换实例的类名称（全名）
	 * @param dateFormat 日期格式，如“yyyy-MM-dd HH:mm:ss.SSS”
	 * @return 类实例
	 * @throws Exception 转换过程中发生异常
	 */
	public static Object json2Bean(String jsonStr, String className, String dateFormat) throws Exception {
		try {
			TdDateTypeAdapter tdDateTypeAdapter = new TdDateTypeAdapter(dateFormat);
			TdTypeAdapterFactory<?> tdTypeAdapterFactory = new TdTypeAdapterFactory<Date>();
			tdTypeAdapterFactory.regAdapter(java.util.Date.class.getName(), tdDateTypeAdapter);
			Gson gson =  new GsonBuilder().registerTypeAdapterFactory(tdTypeAdapterFactory).create();
			Object returnObj = gson.fromJson(jsonStr, Class.forName(className));
			tdTypeAdapterFactory.clearAdapterMap();
		    return returnObj;
		    
		} catch (Exception ex) {
			StringBuilder sbu = new StringBuilder("Json转换VO发生错误03，CLASS NAME：");
			sbu.append(className);
			sbu.append("---");
			log.error(sbu.toString(), ex);
			throw new Exception("Json转换VO发生错误03", ex);
		}
	}
	
	/**
	 * 转换带有java.util.Date成员变量的类实例时用，可指定日期格式
	 * @param jsonStr Json字符串
	 * @param type 转换实例的Class实例
	 * @param dateFormat 日期格式，如“yyyy-MM-dd HH:mm:ss.SSS”
	 * @return 类实例
	 * @throws Exception 转换过程中发生异常
	 */
	public static <T> Object json2Bean(String jsonStr, Class<T> type, String dateFormat) throws Exception {
		try {
			TdDateTypeAdapter tdDateTypeAdapter = new TdDateTypeAdapter(dateFormat);
			TdTypeAdapterFactory<?> tdTypeAdapterFactory = new TdTypeAdapterFactory<Date>();
			tdTypeAdapterFactory.regAdapter(java.util.Date.class.getName(), tdDateTypeAdapter);
			Gson gson =  new GsonBuilder().registerTypeAdapterFactory(tdTypeAdapterFactory).create();
			Object returnObj = gson.fromJson(jsonStr, type);
			tdTypeAdapterFactory.clearAdapterMap();
		    return returnObj;
		    
		} catch (Exception ex) {
			StringBuilder sbu = new StringBuilder("Json转换VO发生错误04，CLASS NAME：");
			sbu.append(type.getName());
			sbu.append("---");
			log.error(sbu.toString(), ex);
			throw new Exception("Json转换VO发生错误04", ex);
		}
	}
	
	/**
	 * 使用定制的转换适配器进行转换
	 * @param jsonStr Json字符串
	 * @param type 转换实例的Class实例
	 * @param typeAdapter 自定义的适配器实例
	 * @return 类实例
	 * @throws Exception 转换过程中发生异常
	 */
	public static <T> Object json2Bean(String jsonStr, Class<T> type, TypeAdapter<T> typeAdapter) throws Exception {
		try {

			TdTypeAdapterFactory<?> tdTypeAdapterFactory = new TdTypeAdapterFactory<Date>();
			tdTypeAdapterFactory.regAdapter(type.getName(), typeAdapter);
			Gson gson =  new GsonBuilder().registerTypeAdapterFactory(tdTypeAdapterFactory).create();
			Object returnObj = gson.fromJson(jsonStr, type);
			tdTypeAdapterFactory.clearAdapterMap();
		    return returnObj;
		    
		} catch (Exception ex) {
			
			StringBuilder sbu = new StringBuilder("Json转换VO发生错误05，CLASS NAME：");
			sbu.append(type.getName());
			log.error(sbu.toString(), ex);
			throw new Exception("Json转换VO发生错误05", ex);
		}
	}
	
	/**
	 * 使用定制的转换适配器进行转换
	 * @param jsonStr Json字符串
	 * @param className 转换实例的类名称
	 * @param typeAdapter 自定义的适配器实例
	 * @return 类实例 
	 * @throws Exception 转换过程中发生异常
	 */
	public static <T> Object json2Bean(String jsonStr, String className, TypeAdapter<T> typeAdapter) throws Exception {
		try {

			TdTypeAdapterFactory<?> tdTypeAdapterFactory = new TdTypeAdapterFactory<Date>();
			tdTypeAdapterFactory.regAdapter(className, typeAdapter);
			Gson gson =  new GsonBuilder().registerTypeAdapterFactory(tdTypeAdapterFactory).create();
			Object returnObj = gson.fromJson(jsonStr, Class.forName(className));
			tdTypeAdapterFactory.clearAdapterMap();
		    return returnObj;
		    
		} catch (Exception ex) {
			
			StringBuilder sbu = new StringBuilder("Json转换VO发生错误06，CLASS NAME：");
			sbu.append(className);
			log.error(sbu.toString(), ex);
			throw new Exception("Json转换VO发生错误06", ex);
		}
	}

	
	/**
	 * 转换一般类实例时用，类中可包含类成员变量，List或Map的其他类实例的集合，
	 * 如果实例中存在java.util.Date类型的成员变量，则可以直接长整型形式的字符串，如果需要转换为其他格式的字符串，请使用
	 * bean2Json (Object bean, String dateFormat)方法
	 * 
	 * @param bean 类实例
	 * @return Json字符串
	 * @throws Exception 转换过程中发生异常
	 */
	public static String bean2Json (Object bean) throws Exception {
		try {
			
			TdDefaultDateTypeAdapter tdDefaultDateTypeAdapter = new TdDefaultDateTypeAdapter();
			TdTypeAdapterFactory<?> tdTypeAdapterFactory = new TdTypeAdapterFactory<Date>();
			tdTypeAdapterFactory.regAdapter(java.util.Date.class.getName(), tdDefaultDateTypeAdapter);
			Gson gson =  new GsonBuilder().registerTypeAdapterFactory(tdTypeAdapterFactory).create();
			String returnStr = gson.toJson(bean);
			tdTypeAdapterFactory.clearAdapterMap();
		    return returnStr;
		    
		} catch (Exception ex) {
			
			StringBuilder sbu = new StringBuilder("VO转换Json发生错误01，CLASS NAME：");
			sbu.append(bean.getClass().getName());
			log.error(sbu.toString(), ex);
			throw new Exception("VO转换Json发生错误01", ex);
		}
	}
	
	/**
	 * @param bean 类实例
	 * @param dateFormat 日期格式，如“yyyy-MM-dd HH:mm:ss.SSS”
	 * @return Json字符串
	 * @throws Exception  转换过程中发生异常
	 */
	public static String bean2Json (Object bean, String dateFormat) throws Exception {
		try {
			TdDateTypeAdapter tdDateTypeAdapter = new TdDateTypeAdapter(dateFormat);
			TdTypeAdapterFactory<?> tdTypeAdapterFactory = new TdTypeAdapterFactory<Date>();
			tdTypeAdapterFactory.regAdapter(java.util.Date.class.getName(), tdDateTypeAdapter);
			Gson gson =  new GsonBuilder().registerTypeAdapterFactory(tdTypeAdapterFactory).create();
			String returnStr = gson.toJson(bean);
			tdTypeAdapterFactory.clearAdapterMap();
		    return returnStr;
		    
		} catch (Exception ex) {
			
			StringBuilder sbu = new StringBuilder("VO转换Json发生错误02，CLASS NAME：");
			sbu.append(bean.getClass().getName());
			log.error(sbu.toString(), ex);
			throw new Exception("VO转换Json发生错误02", ex);
		}
	}
	
	/**
	 * @param bean 类实例
	 * @param typeAdapter 自定义的转换适配器
	 * @return Json字符串
	 * @throws Exception 转换过程中发生异常
	 */
	public static <T> String bean2Json (Object bean, TypeAdapter<T> typeAdapter) throws Exception {
		try {
			
			TdTypeAdapterFactory<?> tdTypeAdapterFactory = new TdTypeAdapterFactory<Date>();
			tdTypeAdapterFactory.regAdapter(java.util.Date.class.getName(), typeAdapter);
			Gson gson =  new GsonBuilder().registerTypeAdapterFactory(tdTypeAdapterFactory).create();
			String returnStr = gson.toJson(bean);
			tdTypeAdapterFactory.clearAdapterMap();
		    return returnStr;
		    
		} catch (Exception ex) {
			
			StringBuilder sbu = new StringBuilder("VO转换Json发生错误03，CLASS NAME：");
			sbu.append(bean.getClass().getName());
			log.error(sbu.toString(), ex);
			throw new Exception("VO转换Json发生错误03", ex);
		}
	}


}
