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
	**用线程读取文件，然后进行插入
	*/
	private void writeRowDataTable(String batchNo) throws IOException,ServiceException{
		try{

			InteractionObjectFactory factory = InteractionObjectFactory.getInstance();                 
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("");
	        BatchBO batchBO = (BatchBO) factory.getInteractionObject("batchFacade",appContext);
	        //传入参数
	       // batchDAO.setParameter(batchNo,input,param);
	        batchBO.doDisposeFile(batchNo,input,param);
	        //*****************************
	        //启动线程，读取文件，写入数据库临时表
	        //*****************************
	        //Thread threadBegin = new Thread(batchDAO);
	        //threadBegin.start();
			
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchFileImporter--writeTempTable()-1 :"+e.getMessage());
			throw new ServiceException(e);
		}
	}

	/**
	**批次号生成规则：操作员帐户 + "_" + 日期时间(14位)
	*/
	private String getBatchNo() throws ServiceException{
		String batchNo = null;
		String operator_date = DateUtil.getDate();
		if(operator_date!=null){
			param.put("status", "0");                   //批量导入的数据的状态;
			param.put("operator_date", operator_date);  //写入创建批量导入时间
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
		backMsg[0] = "数据导入成功,正在解析";
		int i = 1;
		try{
			String batchNo = getBatchNo();
			if(batchNo != null){
				writeRowDataTable(batchNo);
				backMsg[1] = batchNo;
//				if(getBatchNo(batchNo)){
//					backMsg[1] = batchNo;
//				}else{
//					backMsg[0] = "导入数据过程中出错,请重新导入";
//					backMsg[1] = " ";
//				}
			}else{
				backMsg[0] = "无法创建批次号,不能对数据进行处理";
				backMsg[1] = " ";
			}
			
		}catch(Exception e){
			backMsg[0] = "数据导入失败,请重新导入";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchFileImport--startDisposeFile()-1 :"+e.getMessage());
		}
		return backMsg;
	}
}
