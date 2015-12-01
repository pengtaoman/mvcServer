package com.neusoft.tdframework.common.util;

import java.util.Date;

/**
 * Title: NullProcessUtil
 * Description: ����NULL����Ĺ�����
 * Company: neusoft
 * Date: 2004-10-14
 * @author liyj
 * @version 1.0
 */
public class NullProcessUtil {
	 	
	/**
	 * �����ݶ������null��⣬���Ϊnull���򷵻���Ӧ���ַ���
	 * @param obj ��Ҫ�������ݶ���
	 * @param target ���objΪnull����Ҫ���ص�Ŀ���ַ���
	 * @return ������ֵ�������ַ���
	 */
	public static String nvlToString(Object obj,String target){
		return obj==null?target:String.valueOf(obj);
	}
	
	/**
	 * ��Integer���ݶ������null��⣬���Ϊnull���򷵻���Ӧintֵ
	 * @param obj ��Ҫ�������ݶ���
	 * @param target ���objΪnull����Ҫ���ص�int����ֵ
	 * @return ������ֵ������int����ֵ
	 */
	public static int nvlToInt(Integer obj,int target){
		return obj==null?target:obj.intValue();
	}
	
	/**
	 * ��Long���ݶ������null��⣬���Ϊnull���򷵻���Ӧlongֵ
	 * @param obj ��Ҫ�������ݶ���
	 * @param target ���objΪnull����Ҫ���ص�long����ֵ
	 * @return ������ֵ������long����ֵ
	 */
	public static long nvlToLong(Long obj,long target){
		return obj==null?target:obj.longValue();
	}
	
	/**
	 * ��Float���ݶ������null��⣬���Ϊnull���򷵻���Ӧfloatֵ
	 * @param obj ��Ҫ�������ݶ���
	 * @param target ���objΪnull����Ҫ���ص�float����ֵ
	 * @return ������ֵ������float����ֵ
	 */
	public static float nvlToFloat(Float obj,float target){
		return obj==null?target:obj.floatValue();
	}
	
	/**
	 * ��Double���ݶ������null��⣬���Ϊnull���򷵻���Ӧdoubleֵ
	 * @param obj ��Ҫ�������ݶ���
	 * @param target ���objΪnull����Ҫ���ص�double����ֵ
	 * @return ������ֵ������float����ֵ
	 */
	public static double nvlToDouble(Double obj,double target){
		return obj==null?target:obj.doubleValue();
	}
	
	/**
	 * ��Date���ݶ������null��⣬���Ϊnull���򷵻���ӦDateֵ
	 * @param obj ��Ҫ�������ݶ���
	 * @param target ���objΪnull����Ҫ���ص�Date
	 * @return ������ֵ������Date����ֵ
	 */
	public static Date nvlToDate(Date obj,Date target){
		return obj==null?target:obj;
	}
}
