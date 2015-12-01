/*
 * Created on 2006-11-28
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.batch.bo;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.batch.dao.BatchDAO;
import com.neusoft.tdframework.batch.dao.BatchDAOImpl;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class BatchBOImpl implements BatchBO {
	/**
	 * @return Returns the batchDAO.
	 */
	public BatchDAOImpl getBatchDAO() {
		return batchDAO;
	}
	/**
	 * @param batchDAO The batchDAO to set.
	 */
	public void setBatchDAO(BatchDAOImpl batchDAO) {
		this.batchDAO = batchDAO;
	}
	private BatchDAOImpl batchDAO;
	public void doDisposeFile(String batchNo,BufferedReader input,HashMap param) throws IOException,ServiceException{
		
		int i = -1;
		try{
            String filePreRow = (String)input.readLine();
	        if(batchNo!=null && filePreRow!=null){
	        	i = batchDAO.insertTempInfo(batchNo,filePreRow);
	        	while (filePreRow!=null) {
	        		filePreRow = input.readLine();
	        		if(filePreRow!=null){
	        			i = batchDAO.insertTempInfo(batchNo,filePreRow);
	        		}	
				}
	        	if(i>0){
	        		i = batchDAO.insertBatchInfo(batchNo,param);
	        	}
	        	
	        	if(i<0)
	        		throw new ServiceException(new Exception());
	        }
	        
		}catch (IOException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchDAOImpl--getFileinfo()-1 :"+e.getMessage());
			throw new ServiceException(e);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchDAOImpl--getFileinfo()-2 :"+e.getMessage());
			throw new ServiceException(e);
		}finally{
			input.close();
		}
       
	}
	/**
	 * 根据条件获取导入文件状态信息总行数
	 * 
	 * 
	 */
	public int getRowCount(HashMap param) throws ServiceException{
		int rowCount = 0;
		try{
			//从容器中获取接口
	        rowCount = batchDAO.getRowCount(param);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchBO--getRowCount()-1 :"+e.getMessage());
			throw new ServiceException(e);
		}
        
        return rowCount;
	}
	
	public List getStatusInfo(HashMap param,int beginNum,int endNum) throws ServiceException{
		List batchFileinfo = null;
		try{
	        batchFileinfo = batchDAO.getBatchFileStatus(param,beginNum,endNum);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchBO--getStatus()-1 :"+e.getMessage());
			throw new ServiceException(e);
		}
        
        return batchFileinfo;
	}


}
