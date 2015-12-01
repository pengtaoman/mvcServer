package com.neusoft.tdframework.batch.dao;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author yang-lm
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface BatchDAO extends BaseDao{
	
	public static final String BEAN = "batchDAO";
	/**
	 * �������
	 * @param 
	 * @return
	 * @throws DataAccessException
	 */
	public void setParameter(String batch_no,BufferedReader input, HashMap param);
	/**
	 * ������ʱ����Ϣ
	 * @param 
	 * @return
	 * @throws DataAccessException
	 */
	public int insertTempInfo(String batch_no,String record) throws DataAccessException;
	/**
	 * �������α���Ϣ
	 * @param 
	 * @return
	 * @throws DataAccessException
	 */
	public int insertBatchInfo(String batch_no,HashMap param) throws DataAccessException;
	/**
	 * ��ȡ�ļ�������Ϣ
	 * @param 
	 * @return
	 * @throws DataAccessException
	 */
	public int disposeFile(String batchNo,BufferedReader input) throws IOException,DataAccessException;
	/**
	 * �жϵ����ļ�״̬��Ϣ
	 * @param 
	 * @return
	 * @throws DataAccessException
	 */
	public List getBatchFileStatus(HashMap mapData,int beginNum,int endNum) throws DataAccessException;
	/**
	 * ����������ȡ���α�������
	 * @param 
	 * @return
	 * @throws DataAccessException
	 */
	public int getRowCount(HashMap mapData) throws DataAccessException;
	
}
