/**
 * Copyright (c) 2006-2010 东软基础软件事业部版权所有
 */

package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.exportXmlAction;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * @author miaoh
 * @date 2007-1-19
 */
public class Base64Util {

	private final static BASE64Encoder encoder = new BASE64Encoder();

	private final static BASE64Decoder decoder = new BASE64Decoder();

	/**
	 * 使用Base64编码
	 * @throws UnsupportedEncodingException 
	 */
	public static String encodeStrByBASE64(String s)
			throws UnsupportedEncodingException {

		if (s == null) {
			return null;
		}
		final String charEncoding = "UTF-8";

		return encoder.encode(s.getBytes(charEncoding));

	}

	/**
	 * 使用Base64解码
	 * @throws IOException 
	 */
	public static String decodeStrByBASE64(String str) throws IOException {
		if (str == null)
			return null;

		final String charEncoding = "UTF-8";

		byte[] b = decoder.decodeBuffer(str);
		return new String(b, charEncoding);

	}

	/**
	 * 将二进制数组BASE64编码
	 * @param bytes
	 * @return
	 */
	public static String encodeByBASE64(byte[] bytes) {
		if (bytes == null || bytes.length == 0) {
			return null;
		}
		return encoder.encode(bytes);
	}

	/**
	 * 将base64编码后的字符串进行解码，返回字符数组
	 * @param str
	 * @return
	 * @throws IOException 
	 */
	public static byte[] decodeByBASE64(String str) throws IOException {

		if (str == null)
			return null;

		return decoder.decodeBuffer(str);

	}

}
