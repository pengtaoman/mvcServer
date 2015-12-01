package com.neusoft.tdframework.license;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CalendarUtil {
	public static int getDaysBetween(Date firstDate,String secondDateStr){
		//String strDateEnd = "2006-10-14";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date secondDate = null;
		try {
			secondDate = sdf.parse(secondDateStr);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		int days = 0;
		Calendar cal_start = Calendar.getInstance();
		Calendar cal_end = Calendar.getInstance();
		cal_start.setTime(firstDate);
		cal_end.setTime(secondDate);
		days = getDaysBetween(cal_start, cal_end);
		return days;
	}
	public static int getDaysBetween(Date firstDate,Date secondDate){
		int days = 0;
		Calendar cal_start = Calendar.getInstance();
		Calendar cal_end = Calendar.getInstance();
		cal_start.setTime(firstDate);
		cal_end.setTime(secondDate);
		days = getDaysBetween(cal_start, cal_end);
		return days;
	}
	public static int getDaysBetween(java.util.Calendar d1, java.util.Calendar d2) {
		  boolean assignedFlag = true; // positive sign
		  if (d1.after(d2)) { // swap dates so that d1 is start and d2 is end
		   java.util.Calendar swap = d1;
		   d1 = d2;
		   d2 = swap;
		   assignedFlag = false; // negative sign
		  }
		  int days = d2.get(java.util.Calendar.DAY_OF_YEAR)  - d1.get(java.util.Calendar.DAY_OF_YEAR);
		  int y2 = d2.get(java.util.Calendar.YEAR);
		  if (d1.get(java.util.Calendar.YEAR) != y2) {
		   d1 = (java.util.Calendar) d1.clone();
		   do {
		    days += d1.getActualMaximum(java.util.Calendar.DAY_OF_YEAR);
		    d1.add(java.util.Calendar.YEAR, 1);
		   } while (d1.get(java.util.Calendar.YEAR) != y2);
		  }
		  if(!assignedFlag)
			  days = 0 - days;
		  return days;
		 }
	 /**
	  * 计算2个日期之间的相隔天数
	  * @param d1
	  * @param d2
	  * @return
	  */
	 public static int getWorkingDay(java.util.Calendar d1, java.util.Calendar d2) {
	  int result = -1;
	  if (d1.after(d2)) { // swap dates so that d1 is start and d2 is end
	   java.util.Calendar swap = d1;
	   d1 = d2;
	   d2 = swap;
	  }

	  int betweendays = getDaysBetween(d1, d2);

	  int charge_date = 0;
	  int charge_start_date = 0;//开始日期的日期偏移量
	  int charge_end_date = 0;//结束日期的日期偏移量
	   // 日期不在同一个日期内
	   int stmp;
	   int etmp;
	   stmp = 7 - d1.get(Calendar.DAY_OF_WEEK);
	   etmp = 7 - d2.get(Calendar.DAY_OF_WEEK);
	   if (stmp != 0 && stmp != 6) {// 开始日期为星期六和星期日时偏移量为0
	    charge_start_date = stmp - 1;
	   }
	   if (etmp != 0 && etmp != 6) {// 结束日期为星期六和星期日时偏移量为0
	    charge_end_date = etmp - 1;
	   }
//	  }
	  result = (getDaysBetween(getNextMonday(d1), getNextMonday(d2)) / 7) * 5 + charge_start_date - charge_end_date;
	  //System.out.println("charge_start_date>" + charge_start_date);
	  //System.out.println("charge_end_date>" + charge_end_date);
	  //System.out.println("between day is-->" + betweendays);
	  return result;
	 }

	 public static String getChineseWeek(Calendar date) {
	 	final String dayNames[] = { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五","星期六" };
		int dayOfWeek = date.get(Calendar.DAY_OF_WEEK);
		// System.out.println(dayNames[dayOfWeek - 1]);
	  	return dayNames[dayOfWeek - 1];
	}

	 /**
	  * 获得日期的下一个星期一的日期
	  * 
	  * @param date
	  * @return
	  */
	 public static Calendar getNextMonday(Calendar date) {
	 	Calendar result = null;
	 	result = date;
	  	do {
	   		result = (Calendar) result.clone();
	   		result.add(Calendar.DATE, 1);
	  	} while (result.get(Calendar.DAY_OF_WEEK) != 2);
	 	return result;
	 } 
	 
	 /**
	  * 
	  * @param d1
	  * @param d2
	  * @return
	  */
	 public static int getHolidays(Calendar d1,Calendar d2){
	  	return getDaysBetween(d1, d2)-getWorkingDay(d1, d2);
	 }
	 public static void main(String[] args) {
		  try {

			   String strDateStart = "2006-10-1";
			   String strDateEnd = "2006-10-14";
			   SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			   Date date_start = sdf.parse(strDateStart);
			   Date date_end = new Date();//sdf.parse(strDateEnd);
			   //DateCal app = new DateCal();
			   Calendar cal_start = Calendar.getInstance();
			   Calendar cal_end = Calendar.getInstance();
			   cal_start.setTime(date_start);
			   cal_end.setTime(date_end);
			   System.out.println("星期-->" + getChineseWeek(cal_start) + " 日期-->" + cal_start.get(Calendar.YEAR) + "-"
			     + (cal_start.get(Calendar.MONTH) + 1) + "-" + cal_start.get(Calendar.DAY_OF_MONTH));
			   System.out.println("星期-->" + getChineseWeek(cal_end) + " 日期-->" + cal_end.get(Calendar.YEAR) + "-"
			     + (cal_end.get(Calendar.MONTH) + 1) + "-" + cal_end.get(Calendar.DAY_OF_MONTH));
			   System.out.println("日数为-->" + getDaysBetween(date_start, date_end));
			   System.out.println("工作日为-->" + getWorkingDay(cal_start, cal_end));
			   System.out.println("休息日-->"+getHolidays(cal_start, cal_end));
			  } catch (Exception e) {
			   // TODO: handle exception
			  }		
		 
	 }
}
