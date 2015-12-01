/*
 * Created on 2004-12-16
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.struts;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.apache.struts.upload.FormFile;

/**
 * @author chenzt
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class UploadFile {
	FormFile formFile = null;
	
	public UploadFile(FormFile formFile){
		this.formFile = formFile;
	}
	/**
	 * @return
	 */
	public String getContentType() {
		return formFile.getContentType();
	}

	/**
	 * @return
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public byte[] getFileData() throws FileNotFoundException, IOException {
		return formFile.getFileData();
	}

	/**
	 * @return
	 */
	public String getFileName() {
		return formFile.getFileName();
	}

	/**
	 * @return
	 */
	public int getFileSize() {
		return formFile.getFileSize();
	}

	/**
	 * @return
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public InputStream getInputStream()
		throws FileNotFoundException, IOException {
		return formFile.getInputStream();
	}

}
