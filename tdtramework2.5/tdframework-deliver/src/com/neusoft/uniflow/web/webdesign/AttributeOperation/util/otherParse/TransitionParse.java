package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherParse;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.transitionForms.TransitionForm;
import com.neusoft.workflow.model.Branch;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.Transition;

public class TransitionParse {
	public static TransitionForm xmlParse(ProcessContentDocument doc , String type , String id,HttpServletRequest request){
		TransitionForm form = new TransitionForm();
		String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//Transition";
        Transition[] results = (Transition[])doc.selectPath(namespace+pathExpression);
        String procId=doc.getProcessContent().getProcess().getID();
        request.setAttribute("procId", procId);
       
        Transition transition = null;
		if(results!=null){
	    	if (results.length > 0) {
	    		
				for (int i = 0; i < results.length; i++) {
					if (results[i].getId().equals(id)) {
						transition = results[i];
					}
				}
			}
	    	if(transition == null){		
	    	}else{
	    		form.setName(transition.getName());
	    		form.setDesc(transition.getDescription());
	    		form.setTransType(Integer.toString(transition.getTransType()));
	    		form.setPriority(Integer.toString(transition.getPriority()));
	    		
	    		if(transition.getExpression() != null){
	    			String exp = transition.getExpression().getCondition();

//	    			String data1 = "";
//	    			String data2 = "";
//	    			String str1 = "";
//	    			String str2 = "";
//	    			String operator = "";
//	    			
//                    if(exp != "" && exp != null){
//                    	int op = exp.indexOf("AND");
//    	    			if(op == -1){
//    	    				op = exp.indexOf("OR");
//    	    				if(op != -1){
//    	    					operator = "OR";
//    	    				}
//    	    			}else{
//    	    				operator = "AND";
//    	    			}
//    	    			
//    	    			if(op != -1){
//    	    			    String condition1 =	exp.substring(0, op);
//    	    			    String condition2 = exp.substring(op).replace(operator, "");
//    	    			    int m = condition2.length();
//    	    			    condition2 = condition2.substring(0, m-1).trim();
//    	    			    
//    	    			    int n = condition1.indexOf("=");
//    	    			    
//    	    			    data1 = condition1.substring(0, n).trim().substring(1);
//    	    			    str1 = condition1.substring(n+1).trim();
//    	    			    int temp = str1.length();
//    	    			    str1 = str1.substring(0, temp-1);
//    	    			    
//    	    			    if( !"".equals(condition2)){
//    	    			    	n = condition2.indexOf("=");
//    		    			    
//    		    			    data2 = condition2.substring(0, n).trim().substring(1);
//    		    			    str2 = condition2.substring(n+1).trim();
//    		    			    temp = str2.length();
//    		    			    str2 = str2.substring(0, temp-1);
//    	    			    }
//    	    			    
//    	    			    if(str1.indexOf("\"") != -1){
//    	    			    	str1 = str1.replaceAll("\"", "").trim();
//    	    			    }
//    	    			    
//    	    			    if(str2.indexOf("\"") != -1){
//    	    			    	str2 = str2.replaceAll("\"", "").trim();
//    	    			    }
//    	    			    
//    	    			}else{
//    	    				int m = exp.length();
//    	    				String condition = exp.substring(0, m-1);
//                            int n = condition.indexOf("=");
//    	    			    
//    	    			    data1 = condition.substring(0, n).trim();
//    	    			    str1 = condition.substring(n+1).trim();
//    	    			    if(str1.indexOf("\"") != -1){
//    	    			    	str1 = str1.replaceAll("\"", "").trim();
//    	    			    }
//    	    			}
//	    			}
//	    			
//	    			
//	    			
//	    			
//	    			
//	    			form.setData1(data1);
//	    			form.setData2(data2);
//	    			form.setStr1(str1);
//	    			form.setStr2(str2);
//	    			form.setOperator(operator);
	    			form.setExpression(transition.getExpression().getCondition());
	    		}
	    	}
		}
    	
    	return form;
    }
}
