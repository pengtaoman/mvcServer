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
 * 字节数据数组下载
 * 
 */
public abstract class BytesDownloadAction extends DownloadAction {
	
	/**
	 * 字节数组下载处理, 如果文件不保存或文件不存在都会调用如下方法
	 * 
	 */
	public void processDownload(HttpServletRequest request,HttpServletResponse response,File file) throws ServiceException{
		byte[] bytes = getBytes(request);
		
		try{
			//保存文件
			if(ifSaveFile())saveFile(request,response,file,bytes);
			//响应流
			response.getOutputStream().write(bytes);
		} catch (IOException e) {
			FrameWorkLogger.error("字节处理失败：" + e.getMessage(),e);
			throw new ServiceException("字节处理失败：" + e.getMessage());
		}
	}
	
	
	//将字节流在本地保存并将字节写到
	private void saveFile(HttpServletRequest request,HttpServletResponse response,File file,byte[] bytes) throws IOException, ServiceException {

		if(bytes==null) throw new ServiceException("获取的文件流为空!");

		FileOutputStream out = new FileOutputStream(file);
		out.write(bytes);
		out.close();

		response.getOutputStream().write(bytes);
	}
	
	/**
	 * 
	 * 根据请求信息获取字节流信息
	 * 
	 * @param request
	 * @return
	 * @throws ServiceException
	 */
	protected abstract byte[] getBytes(HttpServletRequest request) throws ServiceException;
	
}
