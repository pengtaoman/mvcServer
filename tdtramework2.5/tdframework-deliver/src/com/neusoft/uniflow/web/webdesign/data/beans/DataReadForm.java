package com.neusoft.uniflow.web.webdesign.data.beans;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.workflow.model.ProcessContentDocument;

public class DataReadForm extends ActionForm{
		private ProcessContentDocument EPDoc = null;
		 public void reset(ActionMapping mapping, HttpServletRequest request){
			 EPDoc = null;
		    }
		public ProcessContentDocument getEPDoc() {
			return EPDoc;
		}
		public void setEPDoc(ProcessContentDocument doc) {
			EPDoc = doc;
		}
}
