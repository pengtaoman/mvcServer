package com.neusoft.tdframework.common.util;

/**<p>Module: </p>
 * <p>Description: ת�������ַ�</p>
 * <p>Remark:�����ַ��� \n \t \r \f \b ' " </p>
 * <p>Date: 2006-10-25</p>
 *
 * @author zhangzhenzhong@neusoft.com
 * @version 1.0
 * 
 * <p> �޸���ʷ</p>
 * <p> ��� ���� �޸��� �޸�ԭ��</p>
 * 
 */
public class SpecialCharUtil {

	/**
	 * <p>Description:ת�������ַ� </p>
	 * <p>Remark:�����ַ��� \n \t \r \f \b ' " \</p>
	 * @param str Ҫת����ַ���
	 * @return
	 */
	public static String changeSpecialChar(String str) {
		if(null!=str&&"".equals(str)){
			str=str.replace('\\', '/').replaceAll("/", "\\\\\\\\");
			str=str.replaceAll("\n", "\\\\n");
			str=str.replaceAll("\r", "\\\\r");
			str=str.replaceAll("\t", "\\\\t");
			str=str.replaceAll("\f", "\\\\f");
			str=str.replaceAll("\b", "\\\\b");
			str=str.replaceAll("\"", "`");
			str=str.replaceAll("\'", "`");
		}
		return str;
	}
}
