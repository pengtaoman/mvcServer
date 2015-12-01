package com.neusoft.uniflow.web.webdesign.data.beans;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.workflow.ActTempletsDocument;

public class ActTempletsDocReadForm extends ActionForm{
		private ActTempletsDocument ATDoc = null;
		 public void reset(ActionMapping mapping, HttpServletRequest request){
			 ATDoc = null;
		    }
		public ActTempletsDocument getATDoc() {
			return ATDoc;
		}
		public void setATDoc(ActTempletsDocument doc) {
			ATDoc = doc;
		}
		
}
