/*
 * Created on 2005-1-4
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.struts;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.FrameWorkLogger;

/**
 * @author Administrator
 *
 * ʵ���ļ����صĻ����ࡣд����ҵ��ʵ���࣬ʵ��getBytes��getFileName�ӿڡ�
 * ������������ļ���Ҫ�������صĻ�������ifDel,����true��<b>
 * 
 * �ļ������ڷ�����Ӧ���£���Ҫ����WEB�İ�װ·����
 * 
 */
public abstract class DownloadAction extends BaseAction{
	private static final String FILE_ROOT = System.getProperty("user.dir");
	public static final int BYTE_BLOCK = 2048; //ÿ�ζ�ȡ�ļ����ֽ���
	
	private String baseDir = "/download/";
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseAction#service(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		//���·����Ϣ
		checkModule();
		//��ȡ�ļ���Ϣ
		String[] rawFileName =  getFileName(request);
				
		boolean ifProcessDownLoad = false;
		
		File file = null;
		if(!ifSaveFile()) ifProcessDownLoad = true;
		else {
			//���챾�ر����ļ�������
			String fileUri = baseDir + getModuleName() + "/";
			for(int i=0;i<rawFileName.length;i++) {
				fileUri = fileUri + rawFileName[i] + "-";
			}
		
			String fileName = FILE_ROOT + fileUri;
			file = new File(fileName);
		
			//�ж��ļ��Ƿ����,���������, �ӽӿڶ�ȡ��Ϣ,���Ѿ����ڣ�ֱ�Ӵ��ļ���ȡ��Ϣ
			if(!file.exists()) ifProcessDownLoad = true;
		}
		//����response��header
		try {
			String responseHeader =
				"attachment; filename=" + URLEncoder.encode(rawFileName[0], "UTF-8");
			response.setHeader("Content-Disposition",responseHeader);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			throw new ActionException("�ַ�ת��ʧ�ܣ�" + e.getMessage());
		}
		
		response.setContentType("application/x-msdownload; charset=gb2312");
		
		//ִ�����ش���
		if(ifProcessDownLoad) try {
			processDownload(request,response,file);
		} catch (ServiceException e) {
			String alertMessage = "���ش���ʧ��: " + e.getMessage();
			FrameWorkLogger.error(alertMessage,e);
			request.setAttribute(GlobalParameters.ALERT_ATTRIBUTE_KEY,alertMessage);
			return mapping.findForward(GlobalParameters.ALERT_PAGE);
		}else{
			//�������Ҫ�����ش���ֱ�ӷ����ļ�
			try{
				responseFile(request,response,file);
			}catch(IOException e) {
				FrameWorkLogger.error("���ļ�IO�쳣��" + e.getMessage(),e);
				throw new ActionException("���ļ�IO�쳣��" + e.getMessage());
			}
		}
				
		return null;
	}
	
	
	//���·���Ƿ����,��������ڵĻ��Զ�����
	private void checkModule() {
		File fileBaseDir = new File(FILE_ROOT + baseDir);
		if(!fileBaseDir.exists()) fileBaseDir.mkdir();
		File fileModuleDir = new File(FILE_ROOT + baseDir + getModuleName());
		if(!fileModuleDir.exists()) fileModuleDir.mkdir();
	}
	
	//�ӱ����ļ���ȡ��д��response����
	private void responseFile(HttpServletRequest request,HttpServletResponse response,File file) throws IOException, ActionException {
		FileInputStream in = new FileInputStream(file);
		//BufferedInputStream bIn = new BufferedInputStream(in); //����Ч������ȡ�ڴ�
		
		OutputStream out = response.getOutputStream();
		
		long l=file.length();
		long k=0;
		byte abyte0[] = new byte[BYTE_BLOCK];
		while (k < l) {			
			int j = in.read(abyte0, 0, 10);
		  	k += j;
		  	response.getOutputStream().write(abyte0, 0, j);
		}
		//bIn.close();
		in.close();				
	}
	
	/**
	 * ���ش���
	 * @param request
	 * @param response
	 * @throws ServiceException
	 */
	protected abstract void processDownload(HttpServletRequest request,HttpServletResponse response,File file) throws ServiceException;
		
	/**
	 * ��ȡ�ļ������ƣ�����·��,
	 * @param request
	 * @return �ַ����飬���е�һ��Ϊdialog�������ļ����ƣ��ڶ�������ͨ��Ϊ�ļ�ID��
	 * 			���ر�����ļ�����������String�����м��"-"���ɵ�һ�������磺
	 * 			mytest.txt-001
	 * @throws ActionException
	 */
	protected abstract String[] getFileName(HttpServletRequest request) throws ActionException ;
	
	/**
	 * 
	 * @return
	 */
	protected abstract String getModuleName();
	
	/**
	 * �Ƿ�ɾ����ǰ�����ļ�
	 * @return
	 */
	protected boolean ifSaveFile() {
		return true;
	}
	
}
