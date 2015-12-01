package com.neusoft.tdframework.common.util;

import java.util.*;
import java.text.*;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import com.neusoft.tdframework.dao.DateDAO;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
/**
 * Title: DateUtil
 * Description: �������ڶ���Ĺ�����
 * Company: neusoft
 * Date: 2004-10-14
 * @author liyj
 * @version 1.0
 */

/*
 * �޸��� : weizj
 * 
 * �޸����ݣ� ���Ӷ����ں��µ���ز����� ȡ��ĳһ���ڵ�ʱ������ �� ĳһ�µ�ʱ������
 * ��ط�����
 * 
 * getDayOfOneDay(ʱ�䣬ƫ����x) ȡ�ø���ʱ��ǰ��x<0�����(x>0)x�������
 * getFirstDayOfWeek(ʱ�䣬ƫ����x) ȡ�ø���ʱ��ǰ��x<0�����(x>0)x�����ڵĵ�һ�������
 * getLastDayOfWeek(ʱ�䣬ƫ����x)	ȡ�ø���ʱ��ǰ��x<0�����(x>0)x�����ڵ����һ�������
 * getFirstDayOfMonth(ʱ�䣬ƫ����x)	ȡ�ø���ʱ��ǰ��x<0�����(x>0)x���µĵ�һ�������
 * getLastDayOfMonth(ʱ�䣬ƫ����x) ȡ�ø���ʱ��ǰ��x<0�����(x>0)x���µ����һ�������
 * 
 * getDateFromDB	�����ݿ�ȡ�� yyyy-MM-dd ��ʽ������
 * getDateTimeFromDB �����ݿ�ȡ�� yyyy-MM-dd HH:mm:ss ��ʽ������ʱ��
 * getFormatDateTime(Calendar cal,String format) ��ָ����ʽ��ʽ��Calendar���󣬲�����һ�������ַ���
 * getCalendarFromString	��ʱ���ַ���ת���� Calendar ����
 */
public class DateUtil {
	private static Log log = LogFactory.getLog(DateUtil.class);
	
	public static int FIRSTDAY_OF_WEEK=Calendar.MONDAY;
	
	public static String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
	
	public static String DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat(DEFAULT_DATETIME_FORMAT);
	
	
	/**
	 *(ʱ�䣬ƫ����x) ȡ�ø���ʱ��ǰ��x<0�����(x>0)x�������
	 *@param String 
	 *	ʱ�� ��ʽ��yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	ƫ���� x>0 x���������
	 *		  x<0 xǰ�������
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getDayOfOneDay(String cal,int dayOffset){
		return getDayOfOneDay(getCalendarFromString(cal),dayOffset);
	}
	/**
	 *(ʱ�䣬ƫ����x) ȡ�ø���ʱ��ǰ��x<0�����(x>0)x�������
	 *@param Calendar 
	 *	ʱ�� ��ʽ��yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	ƫ���� x>0 x��������
	 *		  x<0 x��ǰ������
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getDayOfOneDay(Calendar cal,int dayOffset){
		cal.setFirstDayOfWeek(FIRSTDAY_OF_WEEK);
		cal.add(Calendar.DAY_OF_YEAR,dayOffset);
		return getFormatDateTime(cal);
	}
	/**
	 *(ʱ�䣬ƫ����x) ȡ�ø���ʱ��ǰ��x<0�����(x>0)x�����ڵĵ�һ�������
	 *@param String 
	 *	ʱ�� ��ʽ��yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	ƫ���� x>0 x���ں�ĵ�һ�������
	 *		  x<0 x����ǰ�ĵ�һ�������
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getFirstDayOfWeek(String cal,int weekOffset){
		return getFirstDayOfWeek(getCalendarFromString(cal),weekOffset);
	}
	/**
	 *(ʱ�䣬ƫ����x)	ȡ�ø���ʱ��ǰ��x<0�����(x>0)x�����ڵ����һ�������
	 *@param String 
	 *	ʱ�� ��ʽ��yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	ƫ���� x>0 x���ں�����һ�������
	 *		  x<0 x����ǰ�����һ�������
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getLastDayOfWeek(String cal,int weekOffset){
		return getLastDayOfWeek(getCalendarFromString(cal),weekOffset);
	}
	/**
	 *(ʱ�䣬ƫ����x)	ȡ�ø���ʱ��ǰ��x<0�����(x>0)x���µĵ�һ�������
	 *@param String 
	 *	ʱ�� ��ʽ��yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	ƫ���� x>0 x�º�����һ�������
	 *		  x<0 x��ǰ�����һ�������
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getFirstDayOfMonth(String cal,int monthOffset){
		return getFirstDayOfMonth(getCalendarFromString(cal),monthOffset);
	}
	/**
	 *(ʱ�䣬ƫ����x) ȡ�ø���ʱ��ǰ��x<0�����(x>0)x���µ����һ�������
	 *@param String 
	 *	ʱ�� ��ʽ��yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	ƫ���� x>0 x�º�����һ�������
	 *		  x<0 x��ǰ�����һ�������
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getLastDayOfMonth(String cal,int monthOffset){
		return getLastDayOfMonth(getCalendarFromString(cal),monthOffset);
	}
	
	/**
	 *(ʱ�䣬ƫ����x) ȡ�ø���ʱ��ǰ��x<0�����(x>0)x�����ڵĵ�һ�������
	 *@param Calendar 
	 *	ʱ�� ��ʽ��yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	ƫ���� x>0 x���ں�ĵ�һ�������
	 *		  x<0 x����ǰ�ĵ�һ�������
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getFirstDayOfWeek(Calendar cal,int weekOffset){
		cal.setFirstDayOfWeek(FIRSTDAY_OF_WEEK);
		cal.add(Calendar.WEEK_OF_YEAR, weekOffset);
		cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());
		return getFormatDateTime(cal,DEFAULT_DATE_FORMAT);
	}
	/**
	 *(ʱ�䣬ƫ����x)	ȡ�ø���ʱ��ǰ��x<0�����(x>0)x�����ڵ����һ�������
	 *@param Calendar 
	 *	ʱ�� ��ʽ��yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	ƫ���� x>0 x���ں�����һ�������
	 *		  x<0 x����ǰ�����һ�������
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getLastDayOfWeek(Calendar cal,int weekOffset){
		cal.setFirstDayOfWeek(FIRSTDAY_OF_WEEK);
		cal.add(Calendar.WEEK_OF_YEAR,weekOffset);
		cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek()+6);
		return getFormatDateTime(cal,DEFAULT_DATE_FORMAT);
	}
	/**
	 *(ʱ�䣬ƫ����x)	ȡ�ø���ʱ��ǰ��x<0�����(x>0)x���µĵ�һ�������
	 *@param Calendar 
	 *	ʱ�� ��ʽ��yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	ƫ���� x>0 x�º�����һ�������
	 *		  x<0 x��ǰ�����һ�������
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getFirstDayOfMonth(Calendar cal,int monthOffset){
		cal.setFirstDayOfWeek(FIRSTDAY_OF_WEEK);
		cal.add(Calendar.MONTH, monthOffset);
		int minDays=cal.getActualMinimum(Calendar.DAY_OF_MONTH);
		cal.set(Calendar.DAY_OF_MONTH, minDays);
		return getFormatDateTime(cal,DEFAULT_DATE_FORMAT);
	}
	/**
	 *(ʱ�䣬ƫ����x) ȡ�ø���ʱ��ǰ��x<0�����(x>0)x���µ����һ�������
	 *@param Calendar 
	 *	ʱ�� ��ʽ��yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	ƫ���� x>0 x�º�����һ�������
	 *		  x<0 x��ǰ�����һ�������
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getLastDayOfMonth(Calendar cal,int monthOffset){
		cal.setFirstDayOfWeek(FIRSTDAY_OF_WEEK);
		cal.add(Calendar.MONTH,monthOffset);
		int maxDays=cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		cal.set(Calendar.DAY_OF_MONTH, maxDays);
		return getFormatDateTime(cal,DEFAULT_DATE_FORMAT);
	}
	
	
	public static Calendar getCalendarFromString(String dateString){
		Calendar cal=Calendar.getInstance();
		try {
			cal.setTime(dateFormat.parse(dateString));
		} catch (ParseException e) {
			//cal=Calendar.getInstance();
		}
		return cal;
	}
	
	public static String getFormatDateTime(Calendar cal,String format) {
		SimpleDateFormat df = new SimpleDateFormat(format);
		return (String) df.format(cal.getTime());
	}
	
	public static String getFormatDateTime(Calendar cal) {
		return (String) dateFormat.format(cal.getTime());
	}
	/**
	 *�����ݿ��л�ȡ����ʱ�� yyyy-MM-dd
	 *@param
	 *@return String
	 *	��ʽ��yyyy-MM-dd
	 */
	public static String getDateFromDB(){
		String dateTime = getDateTimeFromDB();
		
		return dateTime.substring(0,10);
	}
	/**
	 *�����ݿ��л�ȡ����ʱ�� yyyy-MM-dd HH:mm:ss
	 *@param
	 *@return String
	 *	��ʽ��yyyy-MM-dd
	 */
	public static String getDateTimeFromDB(){
		String dateTime = null;
		//�������л�ȡ�ӿ�
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();                 
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        DateDAO dao = (DateDAO) factory.getInteractionObject("dateDAO",appContext); 
       
		dateTime = dao.getDate();
		return dateTime;
	}
	/* end of add  by weizj */
	/**
	*�����ݿ��л�ȡ����ʱ�� yyyy-MM-dd HH:mm:ss
	*@param applicationName Ӧ����
	*@return String
	*  ��ʽ��yyyy-MM-dd
	*/
	private static String getDateTimeFromDB(String applicationName){
		String dateTime = null;
		//�������л�ȡ�ӿ�
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();                 
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName(applicationName);
		DateDAO dao = (DateDAO) factory.getInteractionObject("dateDAO",appContext); 
		
		dateTime = dao.getDate();
		return dateTime;
	}
	
	/**
	�����ݿ��л�ȡ����ʱ�� yyyy-MM-dd HH:mm:ss
	*/
	public static String getDate(){
		return getDateTimeFromDB();
	}
	/**
	�����ݿ��л�ȡ����ʱ�� yyyy-MM-dd HH:mm:ss
	*/
	public static java.sql.Date getDateTime(){
		
		return java.sql.Date.valueOf(getDateTimeFromDB());
	}
	/**
	*�����ݿ��л�ȡ����ʱ�� yyyy-MM-dd HH:mm:ss
	*@param applicationName Ӧ����
	*@return java.sql.Date yyyy-MM-dd HH:mm:ss
	*/
	public static java.sql.Date getDateTime(String applicationName){
		return java.sql.Date.valueOf(getDateTimeFromDB(applicationName));
	}
	/** ��ȡ��������� */
	public static Date today()
	{
		return new Date(System.currentTimeMillis()); 
	}
	/**
	ת�����ڵĸ�ʽ��yyyy-MM-dd HH:mm:ss
	*/
	public static String stringDateTime(java.sql.Timestamp date){
		if(date==null) return "";
		else
			return 	dateFormat.format(date);	
	}
	
	/**
		ת�����ڵĸ�ʽ��yyyy-MM-dd HH:mm:ss
	*/
	public static String stringDateTime(Date date){
		if(date==null) return "";
		else
			return 	dateFormat.format(date);	
	}
	
	/**
	 ����ʽת�����ڵĸ�ʽ���̶���ʽ��ʱ�� <br>
	 ת��ʱ��ʽ���ַ��������Ҫ��.
	 @param date 
		��ת��������. 
	 @param format 
		ת����ʽ. 
		��ʽ�������: <br>
			yyyy, �����λ�� yy, �����λ�� <br>
			MM, �� <br>
			dd, ���� <br>
			HH,	Сʱ24Сʱ�� <br>
			mm,	���� <br>
			ss,	�� <br>
		�м������Ű�����Ҫ��д. ��: yyyy--MM--dd
	*/
	public static String stringDateTime(Date date,String format){
		
		if(date==null) return null;
		
		SimpleDateFormat subDateFormat = new SimpleDateFormat(format);
		return subDateFormat.format(date);
	}
	
	/**
	 * Ϊ sql ��ֱ��ͨ��result.getObject��ȡ�����ͱ���׼���ķ���.
	 * @param date
	 * @return �����ʽΪ"yyyy-MM-dd HH:mm:ss"
	 */
	public static String stringDateTime(Object date){
		return stringDateTime((java.util.Date)date);	
	}
	
	/**
	 *Ϊ sql ��ֱ��ͨ��result.getObject��ȡ�����ͱ���׼���ķ���.
	 *����ʽת�����ڵĸ�ʽ���̶���ʽ��ʱ�� <br>
	 *ת��ʱ��ʽ���ַ��������Ҫ��.
	 *@param date 
	 *	��ת��������. Object date
	 *@param format 
	 *	ת����ʽ. 
	 *	��ʽ�������: <br>
	 *		yyyy, �����λ�� yy, �����λ�� <br>
	 *		MM, �� <br>
	 *		dd, ���� <br>
	 *		HH,	Сʱ <br>
	 *		mm,	���� <br>
	 *		ss,	�� <br>
	 *	�м������Ű�����Ҫ��д. ��: yyyy--MM--dd <br>
	 *							 HH:mm:ss
	 *@return String 
	 */
	public static String stringDateTime(Object date,String format){
		return stringDateTime((java.util.Date)date,format);	
	}
	/**
	 * ���̶���ʽ�ַ���ת��Ϊ����"
	 * @param strDate ��ʽΪ:"yyyy-MM-dd HH:mm:ss"
	 * @return
	 */
	public static Date dateString(String strDate){
		try{
			return dateFormat.parse(strDate);
		}catch(ParseException e){
			log.error("trans '"+strDate+"' to Date:"+e.getMessage());
			return null;
		}
	}
	
	/**
		�������͵Ķ����������.
		@param date
			�����������
		@param field
			���������Ŀ Calendar.YEAR, Calendar.MONTH, Calendar.DAY_OF_MONTH, <br>
						 Calendar.HOUR, Calendar.MINUTE, Calendar.SECOND
		@param amount
			�����������. ������ʾ��.
	*/
	public static Date dateAdd(Date date,int field,int amount){
		
		if(date==null) return null;
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(field,amount);
		return calendar.getTime();
	}
	/**
	*�������͵Ķ����������.
	*@param date
	*	�����������. String
	*@param field
	*	���������Ŀ Calendar.YEAR, Calendar.MONTH, Calendar.DAY_OF_MONTH, <br>
	*				 Calendar.HOUR, Calendar.MINUTE, Calendar.SECOND 
	*@param amount
	*	�����������. ������ʾ��.
	*@return java.util.Date
	*/
	public static String dateAdd(String date,int field,int amount){
	
		if(date==null){ 
			return null;
		}else{
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(dateString(date));
			calendar.add(field,amount);
			return dateFormat.format(calendar.getTime());
		}
	}
	/**
	*���㵱ǰʱ���ǰ����󣩼����µ����ڣ����ظ�ʽ yyyyMM. 
	*@param monthOffset
	*	�����������. ������ʾ��.
	*@return 
	*	String ��ʽ��yyyyMM
	*/
	public static String monthlyBeforeToday(int monthOffset){
		Date monthInfo = dateAdd(today(),Calendar.MONTH,monthOffset);
		return stringDateTime(monthInfo,"yyyyMM");
	}
	
	/**
	*���㵱ǰʱ���ǰ����󣩼��������. 
	*@param 
	*	dateOffset
	*	�����������. ������ʾ��.
	*	format
	*	�������ڵĸ�ʽ
	*@return 
	*	String ��ʽ��yyyyMM
	*/
	public static String datelyBeforeToday(int dateOffset,String format){
		Date monthInfo = dateAdd(today(),Calendar.HOUR,dateOffset*24);
		return stringDateTime(monthInfo,format);
	}
	   /**
    *���㵱ǰʱ���ǰ����󣩼����µ����ڣ�����ָ����ʽ������. 
	*@param monthOffset
	*	�����������. ������ʾ��.
	*@param format 
	*	ת����ʽ. 
	*	��ʽ�������: <br>
	*		yyyy, �����λ�� yy, �����λ�� <br>
	*		MM, �� <br>
	*		dd, ���� <br>
	*		HH,	Сʱ <br>
	*		mm,	���� <br>
	*		ss,	�� <br>
	*	�м������Ű�����Ҫ��д. ��: yyyy--MM--dd <br>
	*							 HH:mm:ss
	*@return String 
    */
	public static String monthlyBeforeToday(int monthOffset,String fomat){
		Date monthInfo = dateAdd(today(),Calendar.MONTH,monthOffset);
		return stringDateTime(monthInfo,fomat);
	}
	
	/**
	    *���㵱ǰʱ���ǰ����󣩼�������ڣ�����ָ����ʽ������. 
		*@param monthOffset
		*	�����������. ������ʾ��.
		*@param format 
		*	ת����ʽ. 
		*	��ʽ�������: <br>
		*		yyyy, �����λ�� yy, �����λ�� <br>
		*		MM, �� <br>
		*		dd, ���� <br>
		*		HH,	Сʱ <br>
		*		mm,	���� <br>
		*		ss,	�� <br>
		*	�м������Ű�����Ҫ��д. ��: yyyy--MM--dd <br>
		*							 HH:mm:ss
		*@return String 
	    */
		public static String yearlyBeforeToday(int yearOffset,String fomat){
			Date monthInfo = dateAdd(today(),Calendar.YEAR,yearOffset);
			return stringDateTime(monthInfo,fomat);
		}
	/**
		����ĳ�������µĵ�һ��
	*/
	public static Date monthlyFirstDate(Date date){
		if(date==null) return null;
		
		String strDate = stringDateTime(date,"yyyy-MM");
		return dateString(strDate + "-01 00:00:00");
	}
	
	/**
		���µ�һ��
	*/
	public static Date monthlyFirstDate(){
		return monthlyFirstDate(today());
	}
	
	/**
		����ĳ�������µ����һ��
	*/
	public static Date monthlyEndDate(Date date){
		if(date==null) return null;
		Date nextMonth = dateAdd(date,Calendar.MONTH,1);
		String strDate = stringDateTime(nextMonth,"yyyy-MM");
		strDate += "-01 23:59:59";
		return dateAdd(dateString(strDate),Calendar.DATE,-1);
	}
	
	/**
		�������һ�졣
	*/
	public static Date monthlyEndDate(){
		return monthlyEndDate(today());
	}
	
	/**
	 *���� String �͵�ǰʱ�� 
	 *@param 
	 *@return String 
	 *	��ʽ��yyyy-MM-dd HH:mm:ss
	 */
	public static String getStringDateTime(){
		return dateFormat.format(new Date());
	}
	
	/**
	 *���� String �͵�ǰʱ�� 
	 *@param 
	 *	format ���ڸ�ʽ���� yyyy-MM-dd HH:mm:ss
	 *					  yyyy-MM-dd HH:mm
	 *@return String 
	 */
	public static String getStringDateTime(String format){
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		return dateFormat.format(new Date());
	}
	
	/**
	 *���� java.util.Date �͵�ǰʱ��
	 *@param 
	 *@return Date 
	 *	��ʽ��yyyy-MM-dd HH:mm:ss
	 */
	public static Date getDateDateTime(){
		try {
			return dateFormat.parse(getStringDateTime());
		} catch (ParseException e) {
			//cal=Calendar.getInstance();
		}
		return null;
	}
	
	/**
	 *��������ʱ��ıȽϽ�����������򷵻�0��ǰ��С�ں����򷵻ظ�����ǰ�ߴ��ں����򷵻�����
	 *@param 
	 *	firstDateParam
	 *@param
	 *	secondDateParam
	 *@return int 
	 */
	public static int compareStringDate(String firstDateParam,String secondDateParam){
		return dateString(firstDateParam).compareTo(dateString(secondDateParam));
	}
}
