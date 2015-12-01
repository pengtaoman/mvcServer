package com.neusoft.uniflow.web.webdesign.AttributeOperation.util;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.AutoNodeParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.BranchBeginNodeParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.BranchEndNodeParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.BranchParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.ChoiceNodeParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.EndNodeParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.ManualNodeParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.ParallelParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.StartNodeParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.SubProcNodeParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherParse.AppParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherParse.DataParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherParse.ProcParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherParse.TransitionParse;
import com.neusoft.workflow.model.ProcessContentDocument;



public class XMLParse {
	
    public static String parse(ProcessContentDocument doc , String type , String id , HttpServletRequest request)throws Exception{
    	
    	Object ob = null;
    	String forward = "error";
    	if("Transition".equals(type)){
		    ob = TransitionParse.xmlParse(doc, type, id,request);
		    request.setAttribute("TransitionForm", ob);
		    forward = "toTrans";
	    }
        else if("Process".equals(type)){
		    ob = ProcParse.xmlParse(doc, id ,request);
		    request.setAttribute("ProcForm", ob);
		    forward = "toProc";
	    }
        else if("Data".equals(type)){
			ob = DataParse.xmlParse(doc, id);
			request.setAttribute("DataForm", ob);
			forward = "toData";
	    }
        else if("Application".equals(type)){
		    ob = AppParse.xmlParse(doc, id);
		    request.setAttribute("AppForm", ob);
		    forward = "toApp";
	    }
        else if((Integer.parseInt(type))== NWActDef.ACT_TYPE_MANUAL){
    		ob = ManualNodeParse.xmlParse(doc ,id , request);
    		request.setAttribute("ManualNodeForm", ob);
    		forward = "toManual";
    	}else 
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_AUTO){
    		    ob = AutoNodeParse.xmlParse(doc, type, id ,request);
    		    request.setAttribute("AutoNodeForm", ob);
    		    forward = "toAuto";
    	}else 
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_SYNCHSUBPROC){
    		    ob = SubProcNodeParse.xmlParse(doc, type, id , request);
    		    request.setAttribute("SubProcNodeForm", ob);
    		    forward = "toSubproc";
    	}else 
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_START){
    		    ob = StartNodeParse.xmlParse(doc, type, id);
    		    request.setAttribute("StartNodeForm", ob);
    		    forward = "toStart";
    	}else 
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_END){
    		    ob = EndNodeParse.xmlParse(doc, type, id);
    		    request.setAttribute("EndNodeForm", ob);
    		    forward = "toEnd";
    	}else 
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_CHOICE){
    		    ob = ChoiceNodeParse.xmlParse(doc, type, id);
    		    request.setAttribute("ChoiceNodeForm", ob);
    		    forward = "toChoice";
    	}else
    	if(Integer.parseInt(type)== NWActDef.ACT_TYPE_PARALLEL_UNIT){
		    ob = ParallelParse.xmlParse(doc ,id , request);
		    request.setAttribute("ParallelForm", ob);
		    forward = "toParallel";
    	}else
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_PARALLEL_BRANCH){
    		    ob = BranchParse.xmlParse(doc ,id , request);
    		    request.setAttribute("BranchForm", ob);
    		    forward = "toBranch";
    	}else
        	if(Integer.parseInt(type)== NWActDef.ACT_TYPE_PARALLEL_BRANCH_BEGIN){
        		 ob = BranchBeginNodeParse.xmlParse(doc, type, id);
        		 request.setAttribute("BranchBeginNodeForm", ob);
        		 forward = "toBranchBegin";
            	
        }else
        	if(Integer.parseInt(type)== NWActDef.ACT_TYPE_PARALLEL_BRANCH_END){
        		ob = BranchEndNodeParse.xmlParse(doc, type, id);
        		request.setAttribute("BranchEndNodeForm", ob);
        		forward = "toBranchEnd";
    	}
  
    	return forward;
    }
    
}
