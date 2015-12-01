package com.neusoft.tdframework.common.util;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * Title: StringUtil
 * Description: �����ַ����Ĺ�����
 * Company: neusoft
 * Date: 2004-10-14
 * @author liyj
 * @version 1.0
 */
public class StringUtil {
	
	/** 
	 ���ַ����е�ĳλ�õ��ַ��滻Ϊ�����ַ�
	 @param origin 
		��ת�����ַ���
	 @param begin 
		��ʼλ�ã�0 ��ʼ
	 @param end
		����λ�ã�0 ��ʼ
	 @param target
		Ŀ���滻�ַ���
	*/
	public static String replace(String origin, int begin, int end, String target){
	
		StringBuffer strTemp=new StringBuffer(origin.substring(0,begin));
		int length = origin.length();	
		strTemp.append(target);
		strTemp.append(origin.substring(end+1,length));
		return strTemp.toString();
	
	}
	
	/** 
	 * ת���ַ�����ʽ��������ȡ�����
	 * @param param 
		��Ҫת�����ַ�����
	 * @param keepLength
		�����ִ��ĳ��ȡ�
	 * @param doMethod 
		0: ��
		1: ǰ��
	 * @param ins 
		�������ݡ�
	*/
	public static String changeString(String param, int keepLength, int doMethod, String ins){
	
	String outStr = param;
	
	if(param.length()<keepLength){
	
		String temp = "";
		for(int i=0;i<keepLength-param.length();i++){
			temp += ins;
		}
	
		if(doMethod==0){
			outStr = temp + outStr;
		}else{
			outStr = outStr + temp;
		}
	
	}else{
		outStr = param.substring(0,keepLength);	
	}
	return outStr;		
	}
	
	/**
	���ؼ���tab�ƽ����ַ���
	*/
	public static String tabs(int tabs){
		//�ƽ�����tab
		String str_tab="";
		
		for(int i=0;i<tabs;i++)
			str_tab = str_tab + "	";
		
		return str_tab;
	}
	
	
	/** 
		ȡ�ַ��������
		@str 
			�������ַ���
		@target
			�ָ����ַ���
		@notFound 
			���û�зָ��ַ���, ���ظ�ֵ 
	*/
	public static String left(String str,String target,String notFound) {
		
		if(str==null) return null;
		
		int pos = str.indexOf(target);
		if(pos >= 0 ) {
			return str.substring(0,pos);
		}else {
			return notFound;
		}
		
	}
	/** 
		ȡ�ַ��������
		@str 
			�������ַ���
		@target
			�ָ����ַ���
		@notFound 
			���û�зָ��ַ���, ���ظ�ֵ 
		@dir
			����. ����� ? �ұ�
	*/
	public static String left(String str,String target,String notFound,int dir) {
		
		if(dir==0) return left(str,target,notFound);
		
		if(str==null) return null;
		
		int pos = str.lastIndexOf(target);
		if(pos >= 0 ) {
			return str.substring(0,pos);
		}else {
			return notFound;
		}
		
	}

	/** 
		ȡ�ַ������Ҷ� 		
		@str 
			�������ַ���
		@target
			�ָ����ַ���
		@notFound 
			���û�зָ��ַ���, ���ظ�ֵ 
	*/
	public static String right(String str, String target, String notFound) {
		
		if(str==null) return null;
		
		int pos = str.indexOf(target);
		int length = str.length();
		if(pos >= 0 ) {
			if(pos == length - 1) return "";
			else
				return str.substring(pos+target.length(),length);
		}else {
			return notFound;
		}
		
	}

	/** 
		ȡ�ַ������Ҷ� 		
		@str 
			�������ַ���
		@target
			�ָ����ַ���
		@notFound 
			���û�зָ��ַ���, ���ظ�ֵ 
		@dir
			����. ����� ? �ұ�
	*/
	public static String right(String str, String target, String notFound, int dir) {
		
		if(dir==0) return right(str,target,notFound);
		
		if(str==null) return null;
		
		int pos = str.lastIndexOf(target);
		int length = str.length();
		if(pos >= 0 ) {
			if(pos == length - 1) return "";
			else
				return str.substring(pos+target.length(),length);
		}else {
			return notFound;
		}
		
	}
	
	/** 
		�����ַ�����ĳ�ַ��ĸ��� 
		@str 
			�������ַ���
		@target
			�ָ����ַ���
	*/
	public static int count(String str,String target) {
		if(str.indexOf(target)>0)
			return 1 + count(right(str,target,""),target);
		else return 0;
	}
	
	/**
	 * �޸Ĵ����ַ�����,��ISO8859-1ת��Ϊgb2312
	 * ����Ѿ������ĵ��ַ�,����ת��.
	 */
	public static String convertToChinese(String str){
		
		//��ֵ�ж�
		if(str==null) return null;
		
		try{
			return new String(str.getBytes("ISO8859-1"),"gb2312");
		}catch(java.io.UnsupportedEncodingException stre){
			stre.printStackTrace();
		}
		return null;
	}
	
	/**
	 * ��ö�ջ��Ϣ����
	 * @param exception
	 * @return String
	 */
	public static String getStackTrace(Exception exception) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		exception.printStackTrace(pw);
		return sw.toString();
	}
	
	public static String emptyTo(String inStr,String newStr){
		if (inStr==null || inStr.trim().length()==0){
			return newStr;
		}else{
			return inStr;
		}
	}
}
