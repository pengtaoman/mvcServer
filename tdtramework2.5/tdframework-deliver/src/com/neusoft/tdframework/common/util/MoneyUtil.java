package com.neusoft.tdframework.common.util;

/**<p>Module: </p>
 * <p>Description:处理钱的工具 </p>
 * <p>Remark: </p>
 * <p>Date: 2006-09-11</p>
 *
 * @author zhangzhenzhong@neusoft.com
 * @version 1.0
 * 
 * <p> 修改历史</p>
 * <p> 序号 日期 修改人 修改原因</p>
 * 
 */
public class MoneyUtil {
	
	/**
	 * <p>Description:将字符串中的','去掉,然后将字符串转化成float型 </p>
	 * <p>Remark: </p>
	 * @param strMoney 字符串形式的钱
	 * @return float
	 */
	public static float changFloat(String strMoney) {
		float floatMoney = 0;//

		if (null == strMoney||"".equals(strMoney)) {//如果为空,相当于没有钱
			return floatMoney;
		}

		String[] strMoneyArray = strMoney.split(",");
		strMoney = "";
		
		for (int i = 0; i < strMoneyArray.length; i++) {
			strMoney += strMoneyArray[i];
		}
		
		floatMoney = Float.parseFloat(strMoney);
		return floatMoney;
	}

}
