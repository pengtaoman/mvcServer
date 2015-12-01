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

import com.neusoft.tdframework.batch.dao.BatchDAOImpl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public interface BatchBO extends BaseBO{
	/**
	 * @return Returns the batchDAO.
	 */
	public BatchDAOImpl getBatchDAO();

	/**
	 * @param batchDAO The batchDAO to set.
	 */
	public void setBatchDAO(BatchDAOImpl batchDAO);
	
	public void doDisposeFile(String batchNo,BufferedReader input,HashMap param) throws IOException,ServiceException;
	public int getRowCount(HashMap param) throws ServiceException;
	public List getStatusInfo(HashMap param,int beginNum,int endNum) throws ServiceException;
}