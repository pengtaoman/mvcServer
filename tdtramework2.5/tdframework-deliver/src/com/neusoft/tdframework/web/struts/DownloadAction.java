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
 * 实现文件下载的基础类。写具体业务实现类，实现getBytes和getFileName接口。
 * 如果对于已有文件需要重新下载的话，重新ifDel,返回true。<b>
 * 
 * 文件保存在发布的应用下，需要配置WEB的安装路径。
 * 
 */
public abstract class DownloadAction extends BaseAction{
	private static final String FILE_ROOT = System.getProperty("user.dir");
	public static final int BYTE_BLOCK = 2048; //每次读取文件的字节数
	
	private String baseDir = "/download/";
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseAction#service(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		//检查路径信息
		checkModule();
		//获取文件信息
		String[] rawFileName =  getFileName(request);
				
		boolean ifProcessDownLoad = false;
		
		File file = null;
		if(!ifSaveFile()) ifProcessDownLoad = true;
		else {
			//构造本地保存文件的名称
			String fileUri = baseDir + getModuleName() + "/";
			for(int i=0;i<rawFileName.length;i++) {
				fileUri = fileUri + rawFileName[i] + "-";
			}
		
			String fileName = FILE_ROOT + fileUri;
			file = new File(fileName);
		
			//判断文件是否存在,如果不存在, 从接口读取信息,如已经存在，直接从文件读取信息
			if(!file.exists()) ifProcessDownLoad = true;
		}
		//设置response的header
		try {
			String responseHeader =
				"attachment; filename=" + URLEncoder.encode(rawFileName[0], "UTF-8");
			response.setHeader("Content-Disposition",responseHeader);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			throw new ActionException("字符转换失败：" + e.getMessage());
		}
		
		response.setContentType("application/x-msdownload; charset=gb2312");
		
		//执行下载处理
		if(ifProcessDownLoad) try {
			processDownload(request,response,file);
		} catch (ServiceException e) {
			String alertMessage = "下载处理失败: " + e.getMessage();
			FrameWorkLogger.error(alertMessage,e);
			request.setAttribute(GlobalParameters.ALERT_ATTRIBUTE_KEY,alertMessage);
			return mapping.findForward(GlobalParameters.ALERT_PAGE);
		}else{
			//如果不需要做下载处理，直接返回文件
			try{
				responseFile(request,response,file);
			}catch(IOException e) {
				FrameWorkLogger.error("读文件IO异常：" + e.getMessage(),e);
				throw new ActionException("读文件IO异常：" + e.getMessage());
			}
		}
				
		return null;
	}
	
	
	//检查路径是否存在,如果不存在的话自动创建
	private void checkModule() {
		File fileBaseDir = new File(FILE_ROOT + baseDir);
		if(!fileBaseDir.exists()) fileBaseDir.mkdir();
		File fileModuleDir = new File(FILE_ROOT + baseDir + getModuleName());
		if(!fileModuleDir.exists()) fileModuleDir.mkdir();
	}
	
	//从本地文件读取并写到response流里
	private void responseFile(HttpServletRequest request,HttpServletResponse response,File file) throws IOException, ActionException {
		FileInputStream in = new FileInputStream(file);
		//BufferedInputStream bIn = new BufferedInputStream(in); //降低效率来换取内存
		
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
	 * 下载处理
	 * @param request
	 * @param response
	 * @throws ServiceException
	 */
	protected abstract void processDownload(HttpServletRequest request,HttpServletResponse response,File file) throws ServiceException;
		
	/**
	 * 获取文件的名称，不带路径,
	 * @param request
	 * @return 字符数组，其中第一个为dialog弹出的文件名称，第二个参数通常为文件ID。
	 * 			本地保存的文件名称是整个String数组中间加"-"构成的一个串，如：
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
	 * 是否删除当前已有文件
	 * @return
	 */
	protected boolean ifSaveFile() {
		return true;
	}
	
}
