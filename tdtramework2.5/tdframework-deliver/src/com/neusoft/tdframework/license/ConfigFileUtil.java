package com.neusoft.tdframework.license;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;

public class ConfigFileUtil {
	private static ICacheManager manager = CacheConfig.manager;
	public static void init(){
		File file = createTempFile();
		getLicenseFile(file);
		init(file);
		deleteTempFile(file);
	
	}
	public static void printFile(File file,String str){
		  String s;
		  try {
			BufferedReader in = new BufferedReader(new FileReader(file));
			System.out.println(str);
			int i=0;
		    while((s = in.readLine()) != null){
		    	i++;
		    	if(i==36)
		        System.out.println(s);
		    }
		    in.close();
			System.out.println(str);
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public static void init(File file) {
		//printFile(file,"=======================================================");
		Resource rs = new FileSystemResource(file);
		
		XmlBeanFactory xmlBeanFactory = new XmlBeanFactory(rs);
		
		LicenseWarnConfig conf = (LicenseWarnConfig)xmlBeanFactory.getBean("licenseWarnConfig");
		LicenseColl coll = (LicenseColl)xmlBeanFactory.getBean("licenseColl");
		List listdetail = coll.getDetailList();
		Iterator it = listdetail.iterator();
		List list = new ArrayList();
		while(it.hasNext()){
			LicenseVO vo = (LicenseVO)it.next();
			try {
				manager.putCacheObject(vo.getMenuId(), vo);
			} catch (CachingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			list.add(vo.getMenuId());
		}
		try {
			manager.putCacheObject("licenseNamelist", list);
			manager.putCacheObject("licenseWarnConfig", conf);
			manager.putCacheObject("licenselistdetail", listdetail);
		} catch (CachingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void getLicenseFile(File file){
		
	    try {
	        // Generate a temporary key. In practice, you would save this key.
	        // See also e464 Encrypting with DES Using a Pass Phrase.
	        byte[] pwd="password".getBytes();   
	        DESKeySpec desKeySpec = new DESKeySpec(pwd);
	        SecretKeyFactory   key_fac=SecretKeyFactory.getInstance("DES");   
	        SecretKey key=key_fac.generateSecret(desKeySpec);   
	    
	        // Create encrypter/decrypter class
	        DesEncrypter encrypter = new DesEncrypter(key);
	    
	        // Encrypt
	        //encrypter.encrypt(new FileInputStream("portalContext.xml"),
	        //    new FileOutputStream("en_portalContext.xml"));
	    
	        // Decrypt
	        FileOutputStream out = new FileOutputStream(file);
			//Resource rs = new ClassPathResource("end_license.xml");
			ClassLoader loader = Thread.currentThread().getContextClassLoader();   
		  	String fpath = loader.getResource("").getFile().replaceAll("%20","   ");   	

	        encrypter.decrypt(new FileInputStream(fpath+"end_license.xml"),out);
	        //printFile(file,"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
	        
	        
	    } catch (FileNotFoundException e) {
	    	e.printStackTrace();
	    	System.exit(0);
	    }catch (Exception e) {
	    	e.printStackTrace();
	    }
	    //deleteTempFile(file);
	}

	public static File createTempFile(){
		File file = new File("_temp_license.xml");
/*		try {
			file.createNewFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
*/		return file;
	}
	
	public static void deleteTempFile(File file){
		file.delete();
	}

}
