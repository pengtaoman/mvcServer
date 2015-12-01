/*
 * Created on 2005-1-4
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.struts;

import java.io.File;
import java.io.FileInputStream;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author Administrator
 *
 * 测试文件下载的action
 */
public class MyTestDownLoadAction extends InputStreamDownloadAction implements DownloadBO{

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.InputStreamDownloadAction#getDownloadBO()
	 */
	protected DownloadBO getDownloadBO() {
		return this;
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.InputStreamDownloadAction#getRequestObject(javax.servlet.http.HttpServletRequest)
	 */
	protected Object getRequestObject(HttpServletRequest request) {
		return null;
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.DownloadAction#getFileName(javax.servlet.http.HttpServletRequest)
	 */
	protected String[] getFileName(HttpServletRequest request) throws ActionException {
		return new String[] {
			"aopalliance.jar","001"
		};
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.DownloadAction#getModuleName()
	 */
	protected String getModuleName() {
		return "om";
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.DownloadBO#download(java.lang.Object, com.neusoft.tdframework.web.struts.DownloadInputStreamReader)
	 */
	public void download(Object requestObject, DownloadInputStreamReader reader) throws ServiceException {
		try {
			File file = new File("E:\\devlop\\CRM系统\\权限系统\\src\\om_web\\web_root\\WEB-INF\\lib\\aopalliance.jar");
			FileInputStream in = new FileInputStream(file);
			reader.read(in,file.length());
			in.close();
		} catch (Exception e) {
			throw new ServiceException(e.getMessage());
		}
	}
	
}
