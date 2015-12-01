package com.neusoft.tdframework.common.util;

/** 
  * <p>Title: PassWord </p>
  * <p>Description: �������/����</p>
  * <p>Company: neusoft</p>
  * 
  * @author liyj
  * @version 1.0 
*/

public class PassWord
{
	private static final String m_strKey1 = "zxcvbnm,./asdfg";
	private static final String m_strKeya = "cjk;";
	private static final String m_strKey2 = "hjkl;'qwertyuiop";
	private static final String m_strKeyb = "cai2";
	private static final String m_strKey3 = "[]\\1234567890-";
	private static final String m_strKeyc = "%^@#";
	private static final String m_strKey4 = "=` ZXCVBNM<>?:LKJ";
	private static final String m_strKeyd = "*(N";
	private static final String m_strKey5 = "HGFDSAQWERTYUI";
	private static final String m_strKeye = "%^HJ";
	private static final String m_strKey6 = "OP{}|+_)(*&^%$#@!~";
	
	/** ���ܺ���
	 * 
	 * 
	 * @param strPasswd */
	public static String encode(String strPasswd)
	{
		if(strPasswd==null) return null;
		/*����ǰ������*/
		String orig_passwd;
		/*���ܺ󷵻ص�����*/
		String strEncodePasswd = "";
		/*�����ַ�*/
		String strKey;
		/*�������*/
		char code,mid = 0,temp = 0;
		int n,length,flag;
		
		/*ȡ��ԭ����*/
		orig_passwd = strPasswd;
		
		if(orig_passwd.length() == 0)
		{
			strEncodePasswd = "";
			return strEncodePasswd;
		}
		if(includeChineseChar(strPasswd)){
			System.out.print(" code is " + strPasswd);
			orig_passwd="123456";
		}
			
		/*�õ������ַ�*/
		strKey = m_strKey1+m_strKey2+m_strKey3+m_strKey4+m_strKey5+m_strKey6;
	
		/*���ܿ�ʼ*/	
		
		for(n = 0;n < orig_passwd.length();n++)
		{
			while(true)
			{
				code = (char)(Math.rint(Math.random() * 100));
				while((code > 0)&&(((code^orig_passwd.charAt(n)) < 0) || ((code^orig_passwd.charAt(n)) > 90)))
				{
					code = (char)((int)code - 1);
				}
				//System.out.print(" code is " + code);

				flag = code^orig_passwd.charAt(n);
				
				if(flag > 93)
				{
					mid = 0;
				}
				else
				{
					mid = strKey.charAt(flag);
				}
	
				/*ȷ����ɵ��ַ��ǿɼ��ַ�����SQL�������Ч*/			
				if((code > 35)&&(code < 122)&&(code != 124)&&(code != 39)&&(code != 44)&&(mid != 124)&&(mid != 39)&&(mid != 44))
			    {
					break;
				}
	
			}
		
		temp = strKey.charAt(code^orig_passwd.charAt(n));
		
		//��ɼ����ַ�
		strEncodePasswd = strEncodePasswd + new Character(code).toString();
		strEncodePasswd = strEncodePasswd + new Character(temp).toString();
		
		}
		/*���ܽ���*/
		return strEncodePasswd;
	}
	
	/** ���ܺ���
	 * 
	 * 
	 * @param strPasswd */
	public static String decode(String strPasswd)
	{
		if(strPasswd==null) return null;
		/*����ǰ������*/
		String orig_passwd;
		/*���ܺ󷵻ص�����*/
		String strDecodePasswd="";
		/*�����ַ�*/
		String strKey;
		/*�������*/
		char b;
		int n,length;
			
		/*ȡ����ǰ������*/
		orig_passwd = strPasswd;
		if(orig_passwd.length() == 0)
		{
			strDecodePasswd = "";
			return strDecodePasswd;
		}
		
		/*�õ������ַ�*/
		strKey = m_strKey1+m_strKey2+m_strKey3+m_strKey4+m_strKey5+m_strKey6;
		
		if((length = orig_passwd.length()) % 2 == 1)
		{
			orig_passwd = orig_passwd + "?";
		}
	
		for(n = 0;n <= orig_passwd.length() / 2 - 1;n++)
		{
			b = orig_passwd.charAt(n*2);
			char c = (char)strKey.indexOf(orig_passwd.charAt(n*2+1));
			int flag = b^c;
			char a = (char)flag;
			strDecodePasswd = strDecodePasswd + new Character(a).toString();
		}
		
		n = strDecodePasswd.indexOf(1);
		
		if(n>0&&n<=strDecodePasswd.length()){
			strDecodePasswd = strDecodePasswd.substring(0,n);}
	
		return strDecodePasswd;
	}
	public static boolean includeChineseChar(String strPwd){
		int l=strPwd.length();   
		for (int i=0;i<l;i++){   
			if(strPwd.charAt(i)<0||strPwd.charAt(i)>255||strPwd.charAt(i)==38||strPwd.charAt(i)==63)
				return true;   
		}   
		return false;   
	}
	
	public static void main(String args[]) {
		//for(int i=0;i<10;i++){
		System.out.println(""+PassWord.decode("b)?g?g-iRV2)ZL;#"));
		System.out.println("#### " + DESUtil.encrypt("1111qqqq"));
		//System.out.println("-------------------------------"+ i + "-------------------------------");
		//}
	}
	
}

