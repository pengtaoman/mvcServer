package com.neusoft.uniflow.web.util;

import java.io.UnsupportedEncodingException;

public class TranslateCode {

	public TranslateCode() {
	}

	public static String translateISOtoUTF8(String word) {
		String resultString = null;
		try {
			resultString = java.net.URLDecoder.decode(word, "ISO-8859-1");
			resultString = new String(resultString.getBytes("ISO-8859-1"),
					"UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return resultString;
	}
}
