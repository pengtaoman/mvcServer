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
	 * ת��һ����ʵ��ʱ�ã����пɰ������Ա������List��Map��������ʵ���ļ��ϣ�
	 * ���json�ַ���������ֵΪ�����ͣ������ֱ��ת��Ϊ���е�java.util.Date���͵ĳ�Ա������������ʹ��
	 * json2Bean(String jsonStr, String className, String dateFormat)������
	 * json2Bean(String jsonStr, Class<T> type, String dateFormat)����
	 * 
	 * @param jsonStr Json�ַ���
	 * @param className ת��ʵ���������ƣ�ȫ����
	 * @return ��ʵ��
	 * @throws Exception ת�������з����쳣
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
			
			StringBuilder sbu = new StringBuilder("Jsonת��VO��������01��CLASS NAME��");
			sbu.append(className);
			log.error(sbu.toString(), ex);
			throw new Exception("Jsonת��VO��������01", ex);
		}
	}
	
	/**
	 * ת��һ����ʵ��ʱ�ã����пɰ������Ա������List��Map��������ʵ���ļ��ϣ�
	 * ���json�ַ���������ֵΪ�����ͣ������ֱ��ת��Ϊ���е�java.util.Date���͵ĳ�Ա������������ʹ��
	 * json2Bean(String jsonStr, String className, String dateFormat)������
	 * json2Bean(String jsonStr, Class<T> type, String dateFormat)����
	 * 
	 * @param jsonStr Json�ַ���
	 * @param type ת��ʵ����Classʵ��
	 * @return ��ʵ��
	 * @throws Exception ת�������з����쳣
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
			
			StringBuilder sbu = new StringBuilder("Jsonת��VO��������02��CLASS NAME��");
			sbu.append(type.getName());
			log.error(sbu.toString(), ex);
			throw new Exception("Jsonת��VO��������02", ex);
		}
	}
	
	/**
	 * ת������java.util.Date��Ա��������ʵ��ʱ�ã���ָ�����ڸ�ʽ
	 * @param jsonStr Json�ַ���
	 * @param className ת��ʵ���������ƣ�ȫ����
	 * @param dateFormat ���ڸ�ʽ���硰yyyy-MM-dd HH:mm:ss.SSS��
	 * @return ��ʵ��
	 * @throws Exception ת�������з����쳣
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
			StringBuilder sbu = new StringBuilder("Jsonת��VO��������03��CLASS NAME��");
			sbu.append(className);
			sbu.append("---");
			log.error(sbu.toString(), ex);
			throw new Exception("Jsonת��VO��������03", ex);
		}
	}
	
	/**
	 * ת������java.util.Date��Ա��������ʵ��ʱ�ã���ָ�����ڸ�ʽ
	 * @param jsonStr Json�ַ���
	 * @param type ת��ʵ����Classʵ��
	 * @param dateFormat ���ڸ�ʽ���硰yyyy-MM-dd HH:mm:ss.SSS��
	 * @return ��ʵ��
	 * @throws Exception ת�������з����쳣
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
			StringBuilder sbu = new StringBuilder("Jsonת��VO��������04��CLASS NAME��");
			sbu.append(type.getName());
			sbu.append("---");
			log.error(sbu.toString(), ex);
			throw new Exception("Jsonת��VO��������04", ex);
		}
	}
	
	/**
	 * ʹ�ö��Ƶ�ת������������ת��
	 * @param jsonStr Json�ַ���
	 * @param type ת��ʵ����Classʵ��
	 * @param typeAdapter �Զ����������ʵ��
	 * @return ��ʵ��
	 * @throws Exception ת�������з����쳣
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
			
			StringBuilder sbu = new StringBuilder("Jsonת��VO��������05��CLASS NAME��");
			sbu.append(type.getName());
			log.error(sbu.toString(), ex);
			throw new Exception("Jsonת��VO��������05", ex);
		}
	}
	
	/**
	 * ʹ�ö��Ƶ�ת������������ת��
	 * @param jsonStr Json�ַ���
	 * @param className ת��ʵ����������
	 * @param typeAdapter �Զ����������ʵ��
	 * @return ��ʵ�� 
	 * @throws Exception ת�������з����쳣
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
			
			StringBuilder sbu = new StringBuilder("Jsonת��VO��������06��CLASS NAME��");
			sbu.append(className);
			log.error(sbu.toString(), ex);
			throw new Exception("Jsonת��VO��������06", ex);
		}
	}

	
	/**
	 * ת��һ����ʵ��ʱ�ã����пɰ������Ա������List��Map��������ʵ���ļ��ϣ�
	 * ���ʵ���д���java.util.Date���͵ĳ�Ա�����������ֱ�ӳ�������ʽ���ַ����������Ҫת��Ϊ������ʽ���ַ�������ʹ��
	 * bean2Json (Object bean, String dateFormat)����
	 * 
	 * @param bean ��ʵ��
	 * @return Json�ַ���
	 * @throws Exception ת�������з����쳣
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
			
			StringBuilder sbu = new StringBuilder("VOת��Json��������01��CLASS NAME��");
			sbu.append(bean.getClass().getName());
			log.error(sbu.toString(), ex);
			throw new Exception("VOת��Json��������01", ex);
		}
	}
	
	/**
	 * @param bean ��ʵ��
	 * @param dateFormat ���ڸ�ʽ���硰yyyy-MM-dd HH:mm:ss.SSS��
	 * @return Json�ַ���
	 * @throws Exception  ת�������з����쳣
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
			
			StringBuilder sbu = new StringBuilder("VOת��Json��������02��CLASS NAME��");
			sbu.append(bean.getClass().getName());
			log.error(sbu.toString(), ex);
			throw new Exception("VOת��Json��������02", ex);
		}
	}
	
	/**
	 * @param bean ��ʵ��
	 * @param typeAdapter �Զ����ת��������
	 * @return Json�ַ���
	 * @throws Exception ת�������з����쳣
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
			
			StringBuilder sbu = new StringBuilder("VOת��Json��������03��CLASS NAME��");
			sbu.append(bean.getClass().getName());
			log.error(sbu.toString(), ex);
			throw new Exception("VOת��Json��������03", ex);
		}
	}


}
