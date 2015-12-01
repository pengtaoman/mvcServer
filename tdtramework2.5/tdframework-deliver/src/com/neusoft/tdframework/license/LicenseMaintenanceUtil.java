package com.neusoft.tdframework.license;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class LicenseMaintenanceUtil {
	
	public static void addLicense(LicenseVO vo){
		File tempfile = ConfigFileUtil.createTempFile();
		ConfigFileUtil.getLicenseFile(tempfile);
		SAXBuilder sb = new SAXBuilder(); 
		
		Document doc = null;
		try {
			//doc = sb.build(new FileInputStream("out_td_license.xml"));
			doc = sb.build(new FileInputStream(tempfile));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		Element root = doc.getRootElement(); //得到根元素 
		java.util.List beans = root.getChildren(); //得到根元素所有子元素的集合 
		addNode(beans,vo);

		String indent = ""; 
		boolean newLines = false;  
		XMLOutputter outp = new XMLOutputter(indent,newLines,"GB2312"); 
		File outFile = null;
		try {
			outFile = new File("tt_license.xml");
			FileOutputStream outFileStream = new FileOutputStream(outFile);
			outp.output(doc, outFileStream);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		//ConfigFileUtil.printFile(outFile,"++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		desEncryptFile(outFile);
		ConfigFileUtil.deleteTempFile(tempfile);
		ConfigFileUtil.init();
		//ConfigFileUtil.init(outFile);
	}
	public static void removeLicenses(String[] list){
		File tempfile = ConfigFileUtil.createTempFile();
		ConfigFileUtil.getLicenseFile(tempfile);
		SAXBuilder sb = new SAXBuilder(); 
		
		Document doc = null;
		try {
			//doc = sb.build(new FileInputStream("out_td_license.xml"));
			doc = sb.build(new FileInputStream(tempfile));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		Element root = doc.getRootElement(); //得到根元素 
		java.util.List beans = root.getChildren(); //得到根元素所有子元素的集合 
		
		removeNode(beans,list);

		String indent = ""; 
		boolean newLines = false;  
		XMLOutputter outp = new XMLOutputter(indent,newLines,"GB2312"); 
		File outFile = null;
		try {
			outFile = new File("tt_license.xml");
			FileOutputStream outFileStream = new FileOutputStream(outFile);
			outp.output(doc, outFileStream);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		//ConfigFileUtil.printFile(outFile,"++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		desEncryptFile(outFile);
		ConfigFileUtil.deleteTempFile(tempfile);
		ConfigFileUtil.init();
		//ConfigFileUtil.init(outFile);
	}
	public static void addNode(List beans,LicenseVO vo){
		Element beanNode = new Element("bean");
		beanNode.setAttribute("class","com.neusoft.tdframework.license.LicenseVO");
		
		Element menuNode = new Element("property");
		menuNode.setAttribute("name","menuId");
		Element menuValue = new  Element("value");
		menuValue.setText(vo.getMenuId());
		menuNode.addContent(menuValue);
		beanNode.addContent(menuNode);
		
		Element projectNo = new Element("property");
		projectNo.setAttribute("name","projectNo");
		Element projectNoValue = new  Element("value");
		projectNoValue.setText(vo.getProjectNo());
		projectNo.addContent(projectNoValue);
		beanNode.addContent(projectNo);
		
		Element projectNanme = new Element("property");
		projectNanme.setAttribute("name","projectName");
		Element projectNanmeValue = new  Element("value");
		projectNanmeValue.setText(vo.getProjectName());
		projectNanme.addContent(projectNanmeValue);
		beanNode.addContent(projectNanme);
		
		Element licenseNo = new Element("property");
		licenseNo.setAttribute("name","licenseNo");
		Element licenseNoValue = new  Element("value");
		licenseNoValue.setText(vo.getLicenseNo());
		licenseNo.addContent(licenseNoValue);
		beanNode.addContent(licenseNo);
		
		Element expiredDate = new Element("property");
		expiredDate.setAttribute("name","expiredDate");
		Element expiredDateValue = new  Element("value");
		expiredDateValue.setText(vo.getExpiredDate());
		expiredDate.addContent(expiredDateValue);
		beanNode.addContent(expiredDate);
		
		Iterator it = beans.iterator();
		while(it.hasNext()) {
			Element et = (Element)it.next();
			if(et.getAttribute("id").getValue().equals("licenseColl")){
				et.getChild("property").getChild("list").getChildren().add(beanNode);
				
			}
		}
	}
	public static void removeNode(List beans,String[] selectednodes){
		
		Iterator it = beans.iterator();
		int nodelength = selectednodes.length;
		while(it.hasNext()) {
			Element et = (Element)it.next();
			if(et.getAttribute("id").getValue().equals("licenseColl")){
				List lics = et.getChild("property").getChild("list").getChildren();
				Iterator licsit = lics.iterator();
				List removed = new ArrayList();
				for(int i=0;i< nodelength;i++){
					String selected = selectednodes[i];
					while(licsit.hasNext()){
						Element lic = (Element)licsit.next();
						Element prop = (Element)lic.getChild("property").getChildren().get(0);
						String menuId = (String)prop.getContent().get(0);
						if(selected.equals(menuId)){
							//removed.add(lic);
							lics.remove(lic);
							licsit = lics.iterator();
							break;
						}
					}
					licsit = lics.iterator();
					
				}
				//lics.removeAll(removed);
				
			}
		}
	}
	
	public static void desEncryptFile(File fopts){
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
			ClassLoader loader = Thread.currentThread().getContextClassLoader();   
		  	String fpath = loader.getResource("").getFile().replaceAll("%20","   ");   	

	        encrypter.encrypt(new FileInputStream(fopts),
	        		new FileOutputStream(fpath+"end_license.xml"));
	    
	        // Decrypt
	        //FileOutputStream out = new FileOutputStream(file);
			//Resource rs = new ClassPathResource("end_license.xml");
	        //encrypter.decrypt(rs.getInputStream(),out);
	        
	    } catch (FileNotFoundException e) {
	    	e.printStackTrace();
	    	System.exit(0);
	    }catch (Exception e) {
	    	e.printStackTrace();
	    }
		
	}

}
