package com.neusoft.tdframework.home.action;

import com.neusoft.tdframework.common.util.DateUtil;


public class HomePageUtil {

	
	public static String getDateSelect(){
//		String nowDate="2006-10-17 16:22:38";
		String nowDate=DateUtil.getDateFromDB();
		StringBuffer rs=new StringBuffer();
		String dateValue=null;
		
		
		dateValue="startTime="+DateUtil.getDayOfOneDay(nowDate,0)
			+"&endTime="+DateUtil.getDayOfOneDay(nowDate,0);
		rs.append("<option value=\""+dateValue+"\">今天</option>\n");
		
		dateValue="startTime="+DateUtil.getDayOfOneDay(nowDate,1)
			+"&endTime="+DateUtil.getDayOfOneDay(nowDate,1);
		rs.append("<option value=\""+dateValue+"\">明天</option>\n");
		
		dateValue="startTime="+DateUtil.getFirstDayOfWeek(nowDate,0)
			+"&endTime="+DateUtil.getLastDayOfWeek(nowDate,0);
		rs.append("<option value=\""+dateValue+"\">本周</option>\n");
		
		dateValue="startTime="+DateUtil.getFirstDayOfWeek(nowDate,1)
			+"&endTime="+DateUtil.getLastDayOfWeek(nowDate,1);
		rs.append("<option value=\""+dateValue+"\">下周</option>\n");
		
		dateValue="startTime="+DateUtil.getFirstDayOfMonth(nowDate,0)
			+"&endTime="+DateUtil.getLastDayOfMonth(nowDate,0);
		rs.append("<option value=\""+dateValue+"\">本月</option>\n");
		
		dateValue="startTime="+DateUtil.getFirstDayOfMonth(nowDate,1)
			+"&endTime="+DateUtil.getLastDayOfMonth(nowDate,1);
		rs.append("<option value=\""+dateValue+"\">下月</option>\n");
		
		return rs.toString();
	}
	
	public static void main(String[] args) {
		System.out.println(HomePageUtil.getDateSelect());
	}
}
