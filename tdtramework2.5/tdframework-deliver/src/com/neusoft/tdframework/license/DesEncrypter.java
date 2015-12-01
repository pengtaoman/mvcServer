package com.neusoft.tdframework.license;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.spec.AlgorithmParameterSpec;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;

public class DesEncrypter {
    Cipher ecipher;
    Cipher dcipher;

    public DesEncrypter(SecretKey key) {
        // Create an 8-byte initialization vector
        byte[] iv = new byte[]{
            (byte)0x8E, 0x12, 0x39, (byte)0x9C,
            0x07, 0x72, 0x6F, 0x5A
        };
        AlgorithmParameterSpec paramSpec = new IvParameterSpec(iv);
        try {
            ecipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
            dcipher = Cipher.getInstance("DES/CBC/PKCS5Padding");

            // CBC requires an initialization vector
            ecipher.init(Cipher.ENCRYPT_MODE, key, paramSpec);
            dcipher.init(Cipher.DECRYPT_MODE, key, paramSpec);
        } catch (java.security.InvalidAlgorithmParameterException e) {
        } catch (javax.crypto.NoSuchPaddingException e) {
        } catch (java.security.NoSuchAlgorithmException e) {
        } catch (java.security.InvalidKeyException e) {
        }
    }

    // Buffer used to transport the bytes from one stream to another
    byte[] buf = new byte[1024];

    public void encrypt(InputStream in, OutputStream out) {
        try {
            // Bytes written to out will be encrypted
            out = new CipherOutputStream(out, ecipher);

            // Read in the cleartext bytes and write to out to encrypt
            int numRead = 0;
            while ((numRead = in.read(buf)) >= 0) {
                out.write(buf, 0, numRead);
            }
            out.close();
        } catch (java.io.IOException e) {
        }
    }

    public void decrypt(InputStream in, OutputStream out) {
        try {
            // Bytes read from in will be decrypted
            in = new CipherInputStream(in, dcipher);

            // Read in the decrypted bytes and write the cleartext to out
            int numRead = 0;
            while ((numRead = in.read(buf)) >= 0) {
                out.write(buf, 0, numRead);
            }
            out.close();
        } catch (java.io.IOException e) {
        }
    }
    public void decrypt(InputStream in, File file) {
        try {
            // Bytes read from in will be decrypted
            in = new CipherInputStream(in, dcipher);

            // Read in the decrypted bytes and write the cleartext to out
            int numRead = 0;
            FileOutputStream out = new FileOutputStream(file);
            while ((numRead = in.read(buf)) >= 0) {
                out.write(buf, 0, numRead);
            }
            out.close();
        } catch (java.io.IOException e) {
        }
    }
	public static void main(String args[])
	{
	    try {
	        // Generate a temporary key. In practice, you would save this key.
	        // See also e464 Encrypting with DES Using a Pass Phrase.
	        //SecretKey key = KeyGenerator.getInstance("DES").generateKey();
	        byte[] pwd="password".getBytes();   
	        DESKeySpec desKeySpec = new DESKeySpec(pwd);
	        SecretKeyFactory   key_fac=SecretKeyFactory.getInstance("DES");   
	        SecretKey key=key_fac.generateSecret(desKeySpec);   
	    
	        // Create encrypter/decrypter class
	        DesEncrypter encrypter = new DesEncrypter(key);
	    
	        // Encrypt
	        encrypter.encrypt(new FileInputStream("td_license.xml"),
	            new FileOutputStream("end_license.xml"));
	    
	        //Decrypt
	       //File file= new File("temp_license.xml");
	       //FileOutputStream out = new FileOutputStream(file);
	       //encrypter.decrypt(new FileInputStream("3end_license.xml"),
	    	//	   new FileOutputStream("temp_license.xml"));
	    } catch (Exception e) {
	    }

	}
}
