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
 * Description: 处理日期对象的工具类
 * Company: neusoft
 * Date: 2004-10-14
 * @author liyj
 * @version 1.0
 */

/*
 * 修改人 : weizj
 * 
 * 修改内容： 增加对星期和月的相关操作： 取得某一星期的时间区间 和 某一月的时间区间
 * 相关方法：
 * 
 * getDayOfOneDay(时间，偏移量x) 取得给定时间前（x<0）或后(x>0)x天的日期
 * getFirstDayOfWeek(时间，偏移量x) 取得给定时间前（x<0）或后(x>0)x个星期的第一天的日期
 * getLastDayOfWeek(时间，偏移量x)	取得给定时间前（x<0）或后(x>0)x个星期的最后一天的日期
 * getFirstDayOfMonth(时间，偏移量x)	取得给定时间前（x<0）或后(x>0)x个月的第一天的日期
 * getLastDayOfMonth(时间，偏移量x) 取得给定时间前（x<0）或后(x>0)x个月的最后一天的日期
 * 
 * getDateFromDB	从数据库取得 yyyy-MM-dd 格式的日期
 * getDateTimeFromDB 从数据库取得 yyyy-MM-dd HH:mm:ss 格式的日期时间
 * getFormatDateTime(Calendar cal,String format) 按指定格式格式化Calendar对象，并返回一个日期字符串
 * getCalendarFromString	将时间字符串转换成 Calendar 对象
 */
public class DateUtil {
	private static Log log = LogFactory.getLog(DateUtil.class);
	
	public static int FIRSTDAY_OF_WEEK=Calendar.MONDAY;
	
	public static String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
	
	public static String DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat(DEFAULT_DATETIME_FORMAT);
	
	
	/**
	 *(时间，偏移量x) 取得给定时间前（x<0）或后(x>0)x天的日期
	 *@param String 
	 *	时间 格式：yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	偏移量 x>0 x后天的日期
	 *		  x<0 x前天的日期
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getDayOfOneDay(String cal,int dayOffset){
		return getDayOfOneDay(getCalendarFromString(cal),dayOffset);
	}
	/**
	 *(时间，偏移量x) 取得给定时间前（x<0）或后(x>0)x天的日期
	 *@param Calendar 
	 *	时间 格式：yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	偏移量 x>0 x天后的日期
	 *		  x<0 x天前的日期
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getDayOfOneDay(Calendar cal,int dayOffset){
		cal.setFirstDayOfWeek(FIRSTDAY_OF_WEEK);
		cal.add(Calendar.DAY_OF_YEAR,dayOffset);
		return getFormatDateTime(cal);
	}
	/**
	 *(时间，偏移量x) 取得给定时间前（x<0）或后(x>0)x个星期的第一天的日期
	 *@param String 
	 *	时间 格式：yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	偏移量 x>0 x星期后的第一天的日期
	 *		  x<0 x星期前的第一天的日期
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getFirstDayOfWeek(String cal,int weekOffset){
		return getFirstDayOfWeek(getCalendarFromString(cal),weekOffset);
	}
	/**
	 *(时间，偏移量x)	取得给定时间前（x<0）或后(x>0)x个星期的最后一天的日期
	 *@param String 
	 *	时间 格式：yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	偏移量 x>0 x星期后的最后一天的日期
	 *		  x<0 x星期前的最后一天的日期
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getLastDayOfWeek(String cal,int weekOffset){
		return getLastDayOfWeek(getCalendarFromString(cal),weekOffset);
	}
	/**
	 *(时间，偏移量x)	取得给定时间前（x<0）或后(x>0)x个月的第一天的日期
	 *@param String 
	 *	时间 格式：yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	偏移量 x>0 x月后的最后一天的日期
	 *		  x<0 x月前的最后一天的日期
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getFirstDayOfMonth(String cal,int monthOffset){
		return getFirstDayOfMonth(getCalendarFromString(cal),monthOffset);
	}
	/**
	 *(时间，偏移量x) 取得给定时间前（x<0）或后(x>0)x个月的最后一天的日期
	 *@param String 
	 *	时间 格式：yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	偏移量 x>0 x月后的最后一天的日期
	 *		  x<0 x月前的最后一天的日期
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getLastDayOfMonth(String cal,int monthOffset){
		return getLastDayOfMonth(getCalendarFromString(cal),monthOffset);
	}
	
	/**
	 *(时间，偏移量x) 取得给定时间前（x<0）或后(x>0)x个星期的第一天的日期
	 *@param Calendar 
	 *	时间 格式：yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	偏移量 x>0 x星期后的第一天的日期
	 *		  x<0 x星期前的第一天的日期
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getFirstDayOfWeek(Calendar cal,int weekOffset){
		cal.setFirstDayOfWeek(FIRSTDAY_OF_WEEK);
		cal.add(Calendar.WEEK_OF_YEAR, weekOffset);
		cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());
		return getFormatDateTime(cal,DEFAULT_DATE_FORMAT);
	}
	/**
	 *(时间，偏移量x)	取得给定时间前（x<0）或后(x>0)x个星期的最后一天的日期
	 *@param Calendar 
	 *	时间 格式：yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	偏移量 x>0 x星期后的最后一天的日期
	 *		  x<0 x星期前的最后一天的日期
	 *@return String yyyy-MM-dd HH:mm:ss
	 */
	public static String getLastDayOfWeek(Calendar cal,int weekOffset){
		cal.setFirstDayOfWeek(FIRSTDAY_OF_WEEK);
		cal.add(Calendar.WEEK_OF_YEAR,weekOffset);
		cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek()+6);
		return getFormatDateTime(cal,DEFAULT_DATE_FORMAT);
	}
	/**
	 *(时间，偏移量x)	取得给定时间前（x<0）或后(x>0)x个月的第一天的日期
	 *@param Calendar 
	 *	时间 格式：yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	偏移量 x>0 x月后的最后一天的日期
	 *		  x<0 x月前的最后一天的日期
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
	 *(时间，偏移量x) 取得给定时间前（x<0）或后(x>0)x个月的最后一天的日期
	 *@param Calendar 
	 *	时间 格式：yyyy-MM-dd HH:mm:ss
	 *@return int
	 *	偏移量 x>0 x月后的最后一天的日期
	 *		  x<0 x月前的最后一天的日期
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
	 *从数据库中获取日期时间 yyyy-MM-dd
	 *@param
	 *@return String
	 *	格式：yyyy-MM-dd
	 */
	public static String getDateFromDB(){
		String dateTime = getDateTimeFromDB();
		
		return dateTime.substring(0,10);
	}
	/**
	 *从数据库中获取日期时间 yyyy-MM-dd HH:mm:ss
	 *@param
	 *@return String
	 *	格式：yyyy-MM-dd
	 */
	public static String getDateTimeFromDB(){
		String dateTime = null;
		//从容器中获取接口
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();                 
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        DateDAO dao = (DateDAO) factory.getInteractionObject("dateDAO",appContext); 
       
		dateTime = dao.getDate();
		return dateTime;
	}
	/* end of add  by weizj */
	/**
	*从数据库中获取日期时间 yyyy-MM-dd HH:mm:ss
	*@param applicationName 应用名
	*@return String
	*  格式：yyyy-MM-dd
	*/
	private static String getDateTimeFromDB(String applicationName){
		String dateTime = null;
		//从容器中获取接口
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();                 
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName(applicationName);
		DateDAO dao = (DateDAO) factory.getInteractionObject("dateDAO",appContext); 
		
		dateTime = dao.getDate();
		return dateTime;
	}
	
	/**
	从数据库中获取日期时间 yyyy-MM-dd HH:mm:ss
	*/
	public static String getDate(){
		return getDateTimeFromDB();
	}
	/**
	从数据库中获取日期时间 yyyy-MM-dd HH:mm:ss
	*/
	public static java.sql.Date getDateTime(){
		
		return java.sql.Date.valueOf(getDateTimeFromDB());
	}
	/**
	*从数据库中获取日期时间 yyyy-MM-dd HH:mm:ss
	*@param applicationName 应用名
	*@return java.sql.Date yyyy-MM-dd HH:mm:ss
	*/
	public static java.sql.Date getDateTime(String applicationName){
		return java.sql.Date.valueOf(getDateTimeFromDB(applicationName));
	}
	/** 获取当天的日期 */
	public static Date today()
	{
		return new Date(System.currentTimeMillis()); 
	}
	/**
	转换日期的格式到yyyy-MM-dd HH:mm:ss
	*/
	public static String stringDateTime(java.sql.Timestamp date){
		if(date==null) return "";
		else
			return 	dateFormat.format(date);	
	}
	
	/**
		转换日期的格式到yyyy-MM-dd HH:mm:ss
	*/
	public static String stringDateTime(Date date){
		if(date==null) return "";
		else
			return 	dateFormat.format(date);	
	}
	
	/**
	 按格式转换日期的格式到固定格式的时间 <br>
	 转换时格式的字符必须符合要求.
	 @param date 
		待转换的日期. 
	 @param format 
		转换格式. 
		格式必须符合: <br>
			yyyy, 输出四位年 yy, 输出两位年 <br>
			MM, 月 <br>
			dd, 日期 <br>
			HH,	小时24小时制 <br>
			mm,	分钟 <br>
			ss,	秒 <br>
		中间间隔符号按照需要填写. 如: yyyy--MM--dd
	*/
	public static String stringDateTime(Date date,String format){
		
		if(date==null) return null;
		
		SimpleDateFormat subDateFormat = new SimpleDateFormat(format);
		return subDateFormat.format(date);
	}
	
	/**
	 * 为 sql 里直接通过result.getObject获取日期型变量准备的方法.
	 * @param date
	 * @return 输出格式为"yyyy-MM-dd HH:mm:ss"
	 */
	public static String stringDateTime(Object date){
		return stringDateTime((java.util.Date)date);	
	}
	
	/**
	 *为 sql 里直接通过result.getObject获取日期型变量准备的方法.
	 *按格式转换日期的格式到固定格式的时间 <br>
	 *转换时格式的字符必须符合要求.
	 *@param date 
	 *	待转换的日期. Object date
	 *@param format 
	 *	转换格式. 
	 *	格式必须符合: <br>
	 *		yyyy, 输出四位年 yy, 输出两位年 <br>
	 *		MM, 月 <br>
	 *		dd, 日期 <br>
	 *		HH,	小时 <br>
	 *		mm,	分钟 <br>
	 *		ss,	秒 <br>
	 *	中间间隔符号按照需要填写. 如: yyyy--MM--dd <br>
	 *							 HH:mm:ss
	 *@return String 
	 */
	public static String stringDateTime(Object date,String format){
		return stringDateTime((java.util.Date)date,format);	
	}
	/**
	 * 将固定格式字符串转化为日期"
	 * @param strDate 格式为:"yyyy-MM-dd HH:mm:ss"
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
		将日期型的对象进行运算.
		@param date
			待计算的日期
		@param field
			待计算的项目 Calendar.YEAR, Calendar.MONTH, Calendar.DAY_OF_MONTH, <br>
						 Calendar.HOUR, Calendar.MINUTE, Calendar.SECOND
		@param amount
			待计算的数量. 负数表示减.
	*/
	public static Date dateAdd(Date date,int field,int amount){
		
		if(date==null) return null;
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(field,amount);
		return calendar.getTime();
	}
	/**
	*将日期型的对象进行运算.
	*@param date
	*	待计算的日期. String
	*@param field
	*	待计算的项目 Calendar.YEAR, Calendar.MONTH, Calendar.DAY_OF_MONTH, <br>
	*				 Calendar.HOUR, Calendar.MINUTE, Calendar.SECOND 
	*@param amount
	*	待计算的数量. 负数表示减.
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
	*计算当前时间的前（或后）几个月的日期，返回格式 yyyyMM. 
	*@param monthOffset
	*	待计算的月数. 负数表示减.
	*@return 
	*	String 格式：yyyyMM
	*/
	public static String monthlyBeforeToday(int monthOffset){
		Date monthInfo = dateAdd(today(),Calendar.MONTH,monthOffset);
		return stringDateTime(monthInfo,"yyyyMM");
	}
	
	/**
	*计算当前时间的前（或后）几天的日期. 
	*@param 
	*	dateOffset
	*	待计算的天数. 负数表示减.
	*	format
	*	返回日期的格式
	*@return 
	*	String 格式：yyyyMM
	*/
	public static String datelyBeforeToday(int dateOffset,String format){
		Date monthInfo = dateAdd(today(),Calendar.HOUR,dateOffset*24);
		return stringDateTime(monthInfo,format);
	}
	   /**
    *计算当前时间的前（或后）几个月的日期，返回指定格式的日期. 
	*@param monthOffset
	*	待计算的月数. 负数表示减.
	*@param format 
	*	转换格式. 
	*	格式必须符合: <br>
	*		yyyy, 输出四位年 yy, 输出两位年 <br>
	*		MM, 月 <br>
	*		dd, 日期 <br>
	*		HH,	小时 <br>
	*		mm,	分钟 <br>
	*		ss,	秒 <br>
	*	中间间隔符号按照需要填写. 如: yyyy--MM--dd <br>
	*							 HH:mm:ss
	*@return String 
    */
	public static String monthlyBeforeToday(int monthOffset,String fomat){
		Date monthInfo = dateAdd(today(),Calendar.MONTH,monthOffset);
		return stringDateTime(monthInfo,fomat);
	}
	
	/**
	    *计算当前时间的前（或后）几年的日期，返回指定格式的日期. 
		*@param monthOffset
		*	待计算的年数. 负数表示减.
		*@param format 
		*	转换格式. 
		*	格式必须符合: <br>
		*		yyyy, 输出四位年 yy, 输出两位年 <br>
		*		MM, 月 <br>
		*		dd, 日期 <br>
		*		HH,	小时 <br>
		*		mm,	分钟 <br>
		*		ss,	秒 <br>
		*	中间间隔符号按照需要填写. 如: yyyy--MM--dd <br>
		*							 HH:mm:ss
		*@return String 
	    */
		public static String yearlyBeforeToday(int yearOffset,String fomat){
			Date monthInfo = dateAdd(today(),Calendar.YEAR,yearOffset);
			return stringDateTime(monthInfo,fomat);
		}
	/**
		计算某天所在月的第一天
	*/
	public static Date monthlyFirstDate(Date date){
		if(date==null) return null;
		
		String strDate = stringDateTime(date,"yyyy-MM");
		return dateString(strDate + "-01 00:00:00");
	}
	
	/**
		当月第一天
	*/
	public static Date monthlyFirstDate(){
		return monthlyFirstDate(today());
	}
	
	/**
		计算某天所在月的最后一天
	*/
	public static Date monthlyEndDate(Date date){
		if(date==null) return null;
		Date nextMonth = dateAdd(date,Calendar.MONTH,1);
		String strDate = stringDateTime(nextMonth,"yyyy-MM");
		strDate += "-01 23:59:59";
		return dateAdd(dateString(strDate),Calendar.DATE,-1);
	}
	
	/**
		当月最后一天。
	*/
	public static Date monthlyEndDate(){
		return monthlyEndDate(today());
	}
	
	/**
	 *返回 String 型当前时间 
	 *@param 
	 *@return String 
	 *	格式：yyyy-MM-dd HH:mm:ss
	 */
	public static String getStringDateTime(){
		return dateFormat.format(new Date());
	}
	
	/**
	 *返回 String 型当前时间 
	 *@param 
	 *	format 日期格式例如 yyyy-MM-dd HH:mm:ss
	 *					  yyyy-MM-dd HH:mm
	 *@return String 
	 */
	public static String getStringDateTime(String format){
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		return dateFormat.format(new Date());
	}
	
	/**
	 *返回 java.util.Date 型当前时间
	 *@param 
	 *@return Date 
	 *	格式：yyyy-MM-dd HH:mm:ss
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
	 *返回两个时间的比较结果，如果相等则返回0，前者小于后者则返回负数，前者大于后者则返回正数
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
