package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import javax.servlet.http.HttpServletRequest;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.parallelForms.ParallelForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.GetNameUtil;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.Parallel;
import com.neusoft.workflow.model.ProcessContentDocument;
public class ParallelParse {

	public static ParallelForm xmlParse(ProcessContentDocument doc, String id,
			HttpServletRequest request) {
		ParallelForm paform = new ParallelForm();
		Parallel parallel = null;
		String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//Parallel";
        Parallel[] results = (Parallel[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					parallel = results[i];
				}
			}
		}
		if (null != parallel) {
			paform = (ParallelForm) ActivityNodeParse.xmlParse(parallel,
					paform, request);
			if(parallel.getExpiration()!=null){
				paform.setExActionName(GetNameUtil.getAppName(parallel.getExpiration().getAction().getApplication(),request));
    		}
    		if(parallel.getExpiration()!=null){
    			paform.setExAlertActionName(GetNameUtil.getAppName(parallel.getExpiration().getAlertAction().getApplication(),request));
    		}
		}
		paform.setXmlStr(doc.toString());
		return paform;
	}

}