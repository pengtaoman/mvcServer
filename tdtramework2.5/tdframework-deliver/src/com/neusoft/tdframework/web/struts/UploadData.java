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
	 * ���췽������BaseAction��ͨ����������õ��ļ���Ϣ��Hashtable,Ȼ�����ɸö���
	 * @param formFiles
	 */
	public UploadData(Hashtable formFiles) {
		this.formFiles = formFiles;
	}
	
	/**
	 * ��ȡ�ϴ����ļ�����
	 * @param fieldName
	 * @return
	 */
	public UploadFile getUploadFile(String fieldName) {
		FormFile formFile = (FormFile)formFiles.get(fieldName);
		return new UploadFile(formFile);
	}
	
	/**
	 * ֱ�ӷ���ԭstruts��FormFile��ɵ�Hashtable��
	 * ��Ϊ�Ѿ��г�������Hashtable�Ĵ������������ﷵ��Hashtable.
	 * @return
	 */
	public Hashtable getFormFiles() {
		return formFiles;
	}
}
