package com.neusoft.tdframework.common.util;


public class DESUtil {

	public static String encrypt(String pwd){
		String passPhase = "PASSWORD";
        String text = pwd;
        byte[] passBytes = passPhase.getBytes();
        DES des = new DES(passBytes, 1);
        byte[] encrypedPass = des.encrypt(passBytes);

        // Encrypt text
        des = new DES(encrypedPass, 4);
        byte[] encrypedText = des.encrypt(text.getBytes());

        String encrypedString = BytesToHexString(encrypedText);
        return encrypedString;
	}
	
	public static String decrypt(String encrypedString){
		String passPhase = "PASSWORD";
        byte[] passBytes = passPhase.getBytes();
        DES des = new DES(passBytes, 1);
        byte[] encrypedPass = des.encrypt(passBytes);

        // Encrypt text
        des = new DES(encrypedPass, 4);
        byte[] convertedBytes = new byte[encrypedString.length()/2];;
		try {
			convertedBytes = DES.getBinFromString(encrypedString);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        byte[] decrypted2 = des.decrypt(convertedBytes);
        String ret = new String(decrypted2);
        ret = ret.substring(0, ret.indexOf(0));
        return ret;
	}
	
	public static void main(String args[])
	{
		String encd = encrypt("aaaaaa");
        System.out.println("encd is :" + encd);
        String desed = decrypt(encd);
        System.out.println("dencd is :" + desed);
		
	}
	public static String BytesToHexString(byte[]bytes)
	{
		StringBuffer sb = new StringBuffer();
		for (int i=0; i<bytes.length; ++i)
		{
			byte b = bytes[i];
			int low = b & 0x0000000f;
			int hi = (b >>> 4) & 0x0000000f;
			sb.append(ByteToChar(hi));
			sb.append(ByteToChar(low));
		}
		return sb.toString();
	}
	
	public static char ByteToChar(int b)
	{
		if (b < 10)
			return (char)('0' + b);
		else
			return (char)('A' + (b - 10));
	}

	
}
