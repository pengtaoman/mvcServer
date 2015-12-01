/*
 * Created on 2006-11-11
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.common.util.grid;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.tdframework.demo.dao.staffer.Employee;
import org.apache.commons.beanutils.PropertyUtils;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class PrintingFormatter {
	
	private List header;
	private List dataList;
	public void setHeader(List header)
	{
		this.header = header;
	}
	public void setData(List dataList)
	{
		this.dataList = dataList;
	}
	private StringBuffer getHeaderString()
	{
		String title;
		StringBuffer buf = new StringBuffer();
		for (int j = 0; j < header.size(); j++) {
			title = ((HeaderCell) header.get(j)).getTitle();
			int width = ((HeaderCell) header.get(j)).getWidth();
			buf.append(changeString(title,width,1," "));
		}
		buf.append("\n");
		return buf;
	}
	public String getString() {
		Iterator it = dataList.iterator();
		String methodName;
		StringBuffer buf = getHeaderString();
		while (it.hasNext()) {
			Object record = it.next();
			try {
				for (int j = 0; j < header.size(); j++) {
					methodName = ((HeaderCell) header.get(j)).getName();
					String column = (String) PropertyUtils.getProperty(
							(Object) record, methodName);
					int width = ((HeaderCell) header.get(j)).getWidth();
					buf.append(changeString(column,width,1," "));
				}
				buf.append("\n");
			} catch (Exception e) {

			}
		}
		return buf.toString();
	}
	public static String changeString(String param, int keepLength, int doMethod, String ins){
		
		String outStr = param;
		byte arr[] = param.getBytes();
		if(arr.length<keepLength){
		
			String temp = "";
			for(int i=0;i<keepLength-arr.length;i++){
				temp += ins;
			}
		
			if(doMethod==0){
				outStr = temp + outStr;
			}else{
				outStr = outStr + temp;
			}
		}else{
			outStr = param.substring(0,keepLength);	
		}
		return outStr;		
		}
	public static void main(String[] args) {
		//System.out.println(test().getInvoker());
		
		Employee empl = new Employee();
		empl.setArea("dalian");
		empl.setId("id");
		empl.setName("name");
		empl.setOrgan("org");
		
        Object result = null;

        try {
                result = PropertyUtils.getProperty((Object)empl, "area");
            
        } catch (Exception e) {
        }
		
		System.out.println(result);
		
	}

}
