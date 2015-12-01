package com.neusoft.tdframework.admin.asadmin;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

public class ServerControlAction extends TDDispatchAction{
	public ServerControlAction() {
		super();
	}
	public ActionForward init(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		List records=null;
		int totalRows=-1;
		records = getRecords();
    	String totalRowsS=request.getParameter("totalRows");
    	if (totalRowsS!=null){
    		try {
        		totalRows=Integer.parseInt(totalRowsS);
			} catch (Exception e) {
				totalRows=-1;
			}
    	}
    	if (totalRows<0){
    		//取得总行数
    		totalRows = records.size();
    	}
    	//设定页面totalRows参数
    	super.getStartEnd(request,totalRows,totalRows);
		request.setAttribute("records", records);
		request.setAttribute("totalRows",new Integer(totalRows));

		return actionMapping.findForward("init");
		
	}
	private List getRecords(){
		String filePath = "D:\\temp\\reasonInfoList.js";
		List records = new ArrayList();
    	File parsed = new File(filePath);
    	FileReader fp = null;
    	BufferedReader reader = null; 
 		try {
 			fp = new FileReader(parsed);
 	    	reader = new BufferedReader(fp);
 	    	String str = "";
 	    	while((str = reader.readLine())!=null){
 	    		HashMap mp = new HashMap();
 	    		mp.put("item", str);
 	    		records.add(mp);
			    System.out.println(str);
 	    	}
		
		} catch(FileNotFoundException e) {
		      e.printStackTrace();
	    }catch(Exception e) {
		      e.printStackTrace();
	    } finally{
	    		try {
	    			if(reader!=null)
	    				reader.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	    	
	    }
		return records;
		
	}
	public ActionForward update(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		
		return actionMapping.findForward("showCatchObject");

	}

}
