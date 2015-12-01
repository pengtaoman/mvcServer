package com.neusoft.tdframework.batch.util;

import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;

import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.tdframework.batch.bo.BatchBO;
import com.neusoft.tdframework.batch.dao.BatchDAOImpl;

public class BatchFileImporter{

	private HashMap param;
	private BufferedReader input;

	public BatchFileImporter(HashMap param, BufferedReader input) {
		this.param = param;
		this.input = input;
	}
	
	
	/**
	**���̶߳�ȡ�ļ���Ȼ����в���
	*/
	private void writeRowDataTable(String batchNo) throws IOException,ServiceException{
		try{

			InteractionObjectFactory factory = InteractionObjectFactory.getInstance();                 
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("");
	        BatchBO batchBO = (BatchBO) factory.getInteractionObject("batchFacade",appContext);
	        //�������
	       // batchDAO.setParameter(batchNo,input,param);
	        batchBO.doDisposeFile(batchNo,input,param);
	        //*****************************
	        //�����̣߳���ȡ�ļ���д�����ݿ���ʱ��
	        //*****************************
	        //Thread threadBegin = new Thread(batchDAO);
	        //threadBegin.start();
			
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchFileImporter--writeTempTable()-1 :"+e.getMessage());
			throw new ServiceException(e);
		}
	}

	/**
	**���κ����ɹ��򣺲���Ա�ʻ� + "_" + ����ʱ��(14λ)
	*/
	private String getBatchNo() throws ServiceException{
		String batchNo = null;
		String operator_date = DateUtil.getDate();
		if(operator_date!=null){
			param.put("status", "0");                   //������������ݵ�״̬;
			param.put("operator_date", operator_date);  //д�봴����������ʱ��
			operator_date = operator_date.replaceAll("-","");
			operator_date = operator_date.replaceAll(":","");
			operator_date = operator_date.replaceAll(" ","");
			batchNo = param.get("operator_name")+"_"+operator_date;
		}
		
		return batchNo;
	}
	/**
	 * 
	 */
	public String[] startDisposeFile(){
		
		String[] backMsg = new String[2];
		backMsg[0] = "���ݵ���ɹ�,���ڽ���";
		int i = 1;
		try{
			String batchNo = getBatchNo();
			if(batchNo != null){
				writeRowDataTable(batchNo);
				backMsg[1] = batchNo;
//				if(getBatchNo(batchNo)){
//					backMsg[1] = batchNo;
//				}else{
//					backMsg[0] = "�������ݹ����г���,�����µ���";
//					backMsg[1] = " ";
//				}
			}else{
				backMsg[0] = "�޷��������κ�,���ܶ����ݽ��д���";
				backMsg[1] = " ";
			}
			
		}catch(Exception e){
			backMsg[0] = "���ݵ���ʧ��,�����µ���";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchFileImport--startDisposeFile()-1 :"+e.getMessage());
		}
		return backMsg;
	}
}
