package com.neusoft.tdframework.authorization;

import java.io.Serializable;
import java.net.InetAddress;

/**
 * @projectName tdframework
 * @fileName UUIDGenerator.java
 * @Description
 * @author likj 2010-4-14 ����04:28:03
 * @email li.kj@neusoft.com
 * @copyright NeuSoft
 */
public class UUIDGenerator {

	private static UUIDGenerator generator = null;

	private static short counter = (short) 0;
	
	public UUIDGenerator() {
	}

	public static UUIDGenerator getInstanse() {
		if (null == generator) {
			generator = new UUIDGenerator();
		}
		return generator;
	}

	public final synchronized String getSequence() {
		return this.generate().toString();
	}

	private int getJVM() {
		return (int) (System.currentTimeMillis() >>> 8);
	}

	private short getCount() {
		synchronized (UUIDGenerator.class) {
			if (counter < 0)
				counter = 0;
			return counter++;
		}
	}

	private int getIP() {
		int ipAdrr;
		try {
			ipAdrr = toInt(InetAddress.getLocalHost().getAddress());
		} catch (Exception e) {
			ipAdrr = 0;
		}
		return ipAdrr;
	}

	private short getShortTime() {
		return (short) (System.currentTimeMillis() >>> 32);
	}

	private int getIntTime() {
		return (int) System.currentTimeMillis();
	}

	private static int toInt(byte[] bytes) {
		int result = 0;
		for (int i = 0; i < 4; i++) {
			result = (result << 8) - Byte.MIN_VALUE + (int) bytes[i];
		}
		return result;
	}

	private String format(int intval) {
		String formatted = Integer.toHexString(intval);
		StringBuffer buf = new StringBuffer("00000000");
		buf.replace(8 - formatted.length(), 8, formatted);
		return buf.toString();
	}

	private String format(short shortval) {
		String formatted = Integer.toHexString(shortval);
		StringBuffer buf = new StringBuffer("0000");
		buf.replace(4 - formatted.length(), 4, formatted);
		return buf.toString();
	}

	private Serializable generate() {
		return new StringBuffer(36).append(format(getIP())).append("").append(
				format(getJVM())).append("").append(format(getShortTime()))
				.append("").append(format(getIntTime())).append("").append(
						format(getCount())).toString();
	}

}
