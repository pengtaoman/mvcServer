package com.neusoft.tdframework.common.util;

/**<p>Module: </p>
 * <p>Description:����Ǯ�Ĺ��� </p>
 * <p>Remark: </p>
 * <p>Date: 2006-09-11</p>
 *
 * @author zhangzhenzhong@neusoft.com
 * @version 1.0
 * 
 * <p> �޸���ʷ</p>
 * <p> ��� ���� �޸��� �޸�ԭ��</p>
 * 
 */
public class MoneyUtil {
	
	/**
	 * <p>Description:���ַ����е�','ȥ��,Ȼ���ַ���ת����float�� </p>
	 * <p>Remark: </p>
	 * @param strMoney �ַ�����ʽ��Ǯ
	 * @return float
	 */
	public static float changFloat(String strMoney) {
		float floatMoney = 0;//

		if (null == strMoney||"".equals(strMoney)) {//���Ϊ��,�൱��û��Ǯ
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
