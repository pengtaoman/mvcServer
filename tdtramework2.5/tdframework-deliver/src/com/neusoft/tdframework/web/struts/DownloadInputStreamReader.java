/*
 * Created on 2005-1-8
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.struts;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

/**
 * @author chenzt
 *
 * Inputstream处理类
 */
public class DownloadInputStreamReader {
	
	File file = null;
	HttpServletResponse response = null;
	boolean ifSaveFile = true;
	
	public DownloadInputStreamReader(File file,HttpServletResponse response,boolean ifSaveFile){
		this.file = file;
		this.response = response;
		this.ifSaveFile = ifSaveFile;
	}
	
	/**
	 * 处理Inputstream，注意InputStream没有close！！
	 * @param in
	 * @throws IOException
	 */
	public void read(InputStream in,long size) throws IOException {
		
		OutputStream resOut = response.getOutputStream();
		OutputStream fileOut = null;
		if(ifSaveFile)
			fileOut = new FileOutputStream(file);
		
		long k=0;
		byte abyte0[] = new byte[DownloadAction.BYTE_BLOCK];
		while (k < size) {			
			int j = in.read(abyte0, 0, 10);
			k += j;
			resOut.write(abyte0, 0, j);
			if(ifSaveFile)
				fileOut.write(abyte0, 0, j);
		}
		
		if(fileOut!=null) fileOut.close();
	}
	
}
