package com.neusoft.tdframework.batch.util;


import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.comp.upload.Upload;

public class BatchFileUtil {
	public boolean saveFile(String path, HttpServletRequest request, 
			 HttpServletResponse response) throws Exception {
		boolean ret = false;
		try{
	        Upload myUpload = new Upload();
	        myUpload.initialize(request, response);
	        myUpload.upload();
	        myUpload.getRequest();
	        if (myUpload.getFiles().getSize() < 1) {
                //message = "文件不存在或者文件为空";
                return false;
            } 
	        String fileName = saveFileToTemp(path,myUpload);
	        if(fileName!=null ){
	        	//ret = moveFileToDes(path,fileName);	
	        }
	        return ret;
		}catch(Exception e) {
            SysLog.writeLogs("BatchFileUtil", GlobalParameters.ERROR, "BatchFileUtil--save:" + e.getMessage());
            throw new Exception(e);
		} 
	}
	/**
	 * 
	 * @param path
	 * @param myUpload
	 * @return
	 */
	private String saveFileToTemp(String path,Upload myUpload) throws Exception{
		String fileName = null;
		try{
	        // 0 represents absolute file path
			myUpload.save(path,0);
			fileName = myUpload.getFiles().getFile(0).getFileName();
		}
		catch(Exception e)
		{
	        SysLog.writeLogs("FileUtil", GlobalParameters.ERROR, "saveFileToTemp--doUpLoad:" + e.getMessage());
            throw new Exception(e);
		}
		
		return fileName;
		
	}
	private boolean moveFileToDes(String desPath,String fileName){
		File file = new File(fileName);
		boolean ret = file.renameTo(new File(desPath+ File.separator +fileName));
		return ret;
	}

}
