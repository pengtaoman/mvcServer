package com.neusoft.tdframework.common.util;

import java.io.InputStream;
import java.io.IOException;
import java.io.FileInputStream;
import java.util.Properties;
import java.util.Hashtable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Title: FileUtil
 * Description: �����ȡ�ļ���Ϣ�Ĺ�����
 * Company: neusoft
 * Date: 2004-10-14
 * @author liyj
 * @version 1.0
 */
public class FileUtil {
	private static Log log = LogFactory.getLog(FileUtil.class);
	private static java.util.Properties sysParams = null;	

	/** ��ȡ��ʼ���ļ�. ���س�ʼ���������ƺͱ���ֵ.
	 * ��ʼ���ļ���ʽ:
	 * VAR=value
	 * 
	 * @param filename 
	*/
	public static Hashtable readFile(String filename)
	{
		
		Properties property = new Properties();
		try{
			property.load(new FileInputStream(filename));
		}catch(IOException e){
			log.error("��ȡ��ʼ���ļ��쳣��"+System.getProperty("user.dir")+System.getProperty("file.separator")+"--"+filename+"--"+e.getMessage());
		}
		
		return property;
	
	}
	
	/**
	 * ͨ�� class loader�����·����� �ļ���
	 * @param source Path
	 *		���classloader��·��: ��: com/neusoft/common/config.xml
	 */
	public static InputStream getStream(String sourcePath){
		ClassLoader _loader = FileUtil.class.getClassLoader();
		return _loader.getResourceAsStream(sourcePath);
	}
	
	/** 
	 * ͨ�� class loader�����·�����һ��Properties�ļ��� Properties�Ķ���.
	 * @param source Path
	 *		���classloader��·��: ��: com/neusoft/common/config.xml
	 */
	public static Properties getProperties(String sourcePath) throws IOException{
		InputStream in = getStream(sourcePath);
		
		if(in==null) throw new IOException(sourcePath + "�ļ�û���ҵ�! ��ȡ�ļ���Ϊ��.");
		
		Properties props = new Properties();
		props.load(in);
		
		return props;
	}
	
	/**
	 * ��ȡ���õ�ϵͳ��Ϣ
	 * ����������SysParam.properties�ļ���.
	 * ���û���ҵ��ַ���ֵ,����NULL
	 */
	public static String getSysParams(String paramKey){
		if(sysParams==null) 
			try{
				sysParams = FileUtil.getProperties("SysParams.properties");
			}catch(Exception e){
				log.error("getSysParams:"+e.getMessage());
				e.printStackTrace();
				return null;
			}
		
		return StringUtil.convertToChinese(sysParams.getProperty(paramKey))
		;
	}
	
	/**
	 * ��ȡ���õ�ϵͳ��Ϣ
	 * ���������ļ���.
	 * ���û���ҵ��ַ���ֵ,����NULL
	 */
	public static String getConfigParams(String properName,String paramKey){
	 
		Properties configParams = new Properties();
		
		try{
			configParams = FileUtil.getProperties(properName);
		}catch(Exception e){
			log.error("getConfigParams:"+e.getMessage());
			e.printStackTrace();
			return null;
		}
		
		return StringUtil.convertToChinese(configParams.getProperty(paramKey));
	}	
	
	/**
	 * ��ȡJ2EE�汾
	 * ������ SysParam.properties
	 */
	public static short getJ2eeVersion(){
		
		String j2eeVersion=getSysParams("J2EE_VERSION");
		
		if(j2eeVersion==null) return 140;
		
		return Short.parseShort(j2eeVersion);
	} 
}
