package com.neusoft.tdframework.common.util;

/**<p>Module: </p>
 * <p>Description: 转义特殊字符</p>
 * <p>Remark:特殊字符： \n \t \r \f \b ' " </p>
 * <p>Date: 2006-10-25</p>
 *
 * @author zhangzhenzhong@neusoft.com
 * @version 1.0
 * 
 * <p> 修改历史</p>
 * <p> 序号 日期 修改人 修改原因</p>
 * 
 */
public class SpecialCharUtil {

	/**
	 * <p>Description:转义特殊字符 </p>
	 * <p>Remark:特殊字符： \n \t \r \f \b ' " \</p>
	 * @param str 要转义的字符串
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
