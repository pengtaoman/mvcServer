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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.FrameWorkLogger;

/**
 * @author chenzt
 *
 * �ֽ�������������
 * 
 */
public abstract class BytesDownloadAction extends DownloadAction {
	
	/**
	 * �ֽ��������ش���, ����ļ���������ļ������ڶ���������·���
	 * 
	 */
	public void processDownload(HttpServletRequest request,HttpServletResponse response,File file) throws ServiceException{
		byte[] bytes = getBytes(request);
		
		try{
			//�����ļ�
			if(ifSaveFile())saveFile(request,response,file,bytes);
			//��Ӧ��
			response.getOutputStream().write(bytes);
		} catch (IOException e) {
			FrameWorkLogger.error("�ֽڴ���ʧ�ܣ�" + e.getMessage(),e);
			throw new ServiceException("�ֽڴ���ʧ�ܣ�" + e.getMessage());
		}
	}
	
	
	//���ֽ����ڱ��ر��沢���ֽ�д��
	private void saveFile(HttpServletRequest request,HttpServletResponse response,File file,byte[] bytes) throws IOException, ServiceException {

		if(bytes==null) throw new ServiceException("��ȡ���ļ���Ϊ��!");

		FileOutputStream out = new FileOutputStream(file);
		out.write(bytes);
		out.close();

		response.getOutputStream().write(bytes);
	}
	
	/**
	 * 
	 * ����������Ϣ��ȡ�ֽ�����Ϣ
	 * 
	 * @param request
	 * @return
	 * @throws ServiceException
	 */
	protected abstract byte[] getBytes(HttpServletRequest request) throws ServiceException;
	
}
