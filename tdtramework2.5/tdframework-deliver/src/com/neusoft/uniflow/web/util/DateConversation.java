package com.neusoft.uniflow.web.util;

import com.neusoft.uniflow.util.Util;


public class DateConversation {
	//private static StringBuffer reval= new StringBuffer("");
	
	public static String parseHouToDHMS(long t){
		return parseMillSecToDHMS(t*60*60*1000);
	}
	
	public static String parseMinToDHMS(String t){
		if(Util.isNullOrEmpty(t))
			return "";
		int value=Integer.valueOf(t).intValue();
		return parseMillSecToDHMS(value*60*1000);
	}
	
	public static String parseMinToDHMS(long t){
		 return parseMillSecToDHMS(t*60*1000);
	}
	public static String parseSecToDHMS(long t){
		return parseMillSecToDHMS(t*1000);
	}

	public static String parseMillSecToDHMS(long t){
		StringBuffer reval= new StringBuffer("");
		String d="0";
		String h="0";
		String m="0";
		String s="0";	
		if(t<0)
		  return  "0";
		if(t==0)
		  return "";
		t = t/1000;
		s = String.valueOf(t%60);
		t = t/60;
		m = String.valueOf(t%60);
		t = t/60;
		h = String.valueOf(t%24);
		t = t/24;
		d = String.valueOf(t);
		if(!d.equals("0")){
			reval.append(d+"天");
		}
		if(!h.equals("0")){
			reval.append(h+"小时");
		}
		if(!m.equals("0")){
			reval.append(m+"分钟");
		}
		if(!s.equals("0")){
			reval.append(s+"秒");
		}
		return reval.toString();
	}

	//D-hh:mm:ss to millionseconds;
	public static long parseToMillionSeconds(String date){
		String[] tmp1 = date.split("-");
		String[] tmp2 = tmp1[1].split(":");
		int d = Integer.parseInt(tmp1[0]);
		int h = Integer.parseInt(tmp2[0]);
		int m = Integer.parseInt(tmp2[1]);
		int s = Integer.parseInt(tmp2[2]);
		long tmp = (((d*24+h)*60+m)*60+s)*1000;
   		return tmp;
	}
//    public static void main(String [] args){
//    	long ss = DateConversation.parseToMillionSeconds("2-3:26:54");
//    	System.out.println(DateConversation.parseHouToDHMS(ss));
//    }
}
