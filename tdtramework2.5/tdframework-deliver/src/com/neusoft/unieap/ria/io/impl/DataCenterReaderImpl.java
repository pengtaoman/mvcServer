package com.neusoft.unieap.ria.io.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.NoSuchAlgorithmException;


import net.sf.json.JSONObject;

import com.neusoft.unieap.bl.context.AppContextContainer;

import com.neusoft.unieap.ria.IDataCenter;
import com.neusoft.unieap.ria.config.RIAConfig;
import com.neusoft.unieap.ria.impl.DataCenter;
import com.neusoft.unieap.ria.io.DataCenterReader;
import com.neusoft.unieap.ria.util.Digest;
import com.neusoft.unieap.ria.util.Escape;
import com.neusoft.unieap.service.exception.AppException;

public class DataCenterReaderImpl implements DataCenterReader{

	InputStream is;
	
	public DataCenterReaderImpl(){
		
	}
	public DataCenterReaderImpl (InputStream is){
		this.is=is;
	}
	public IDataCenter parse(String json){
		JSONObject dcObj = JSONObject.fromObject(json);
		return new DataCenter(dcObj);
	}
	public IDataCenter parse() throws Exception{
		String jsonRequest = "";
		BufferedReader reader;
		String s = null;
		StringBuffer buf = new StringBuffer("");
		try {
			reader = new BufferedReader(new InputStreamReader(is,"UTF-8"));
			while ((s = reader.readLine()) != null){
				buf.append(s);
			}
		 } catch (IOException e){
			 throw e;
	    }finally{
	    	if(is!=null){
	    		try {
					is.close();
				} catch (Exception e) {
					
					e.printStackTrace();
				}
	    	}
	    }
		jsonRequest = buf.toString();
		if(RIAConfig.ENCRYPT){
		      String realSummary = (String) AppContextContainer.getAppContext().getProperty("digest");
		      AppContextContainer.getAppContext().removeProperty("digest");
		      if(realSummary!=null&&!"".equals(realSummary)){
		    	  String encodeStr = Escape.escape(jsonRequest).toLowerCase();
			      java.security.MessageDigest alga =null;
				   try {
						alga = java.security.MessageDigest.getInstance("SHA-1");
				   } catch (NoSuchAlgorithmException e) {
						AppException ex = new AppException(e);
						ex.setErrCode(-1);
						
						
						throw ex;
				  }
			      alga.update(encodeStr.getBytes());
			      byte[] digesta=alga.digest();
		    	  if(!realSummary.equalsIgnoreCase(Digest.byte2hex(digesta))){
		    		  AppException ex = new AppException("2222");
					  ex.setErrCode(-1);
					 
		    		  throw ex;
			      }
		      }
		}
		DataCenter dc;
		if("".equals(jsonRequest.trim())){
			dc =new DataCenter();
		}else{
			JSONObject dcObj = JSONObject.fromObject(jsonRequest);
			dc =new DataCenter(dcObj);
		}
		
		return dc;
		    
	}
}
