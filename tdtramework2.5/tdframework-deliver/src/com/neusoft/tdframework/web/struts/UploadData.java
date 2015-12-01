/*
 * Created on 2004-12-16
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.struts;

import java.util.Hashtable;

import org.apache.struts.upload.FormFile;

/**
 * @author chenzt
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class UploadData {
	private Hashtable formFiles = null;
	
	/**
	 * 构造方法，在BaseAction中通过解析请求得到文件信息的Hashtable,然后生成该对象
	 * @param formFiles
	 */
	public UploadData(Hashtable formFiles) {
		this.formFiles = formFiles;
	}
	
	/**
	 * 获取上传的文件对象
	 * @param fieldName
	 * @return
	 */
	public UploadFile getUploadFile(String fieldName) {
		FormFile formFile = (FormFile)formFiles.get(fieldName);
		return new UploadFile(formFile);
	}
	
	/**
	 * 直接返回原struts的FormFile组成的Hashtable。
	 * 因为已经有程序做了Hashtable的处理，所以在这里返回Hashtable.
	 * @return
	 */
	public Hashtable getFormFiles() {
		return formFiles;
	}
}
