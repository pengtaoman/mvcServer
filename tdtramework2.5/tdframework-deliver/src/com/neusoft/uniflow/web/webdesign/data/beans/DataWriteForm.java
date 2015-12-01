package com.neusoft.uniflow.web.webdesign.data.beans;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.workflow.model.ProcessContentDocument;

public class DataWriteForm extends ActionForm{
		/**
	 * 
	 */
	private static final long serialVersionUID = 2953879058383007083L;
		private ProcessContentDocument processDoc = null;
		private String hasError = "No";
		
		 public String getHasError() {
			return hasError;
		}
		public void setHasError(String hasError) {
			this.hasError = hasError;
		}
		public void reset(ActionMapping mapping, HttpServletRequest request){
			processDoc = null;
		    }
		public ProcessContentDocument getPCD() {
			return this.processDoc;
		}
		public void setPCD(ProcessContentDocument doc) {
			this.processDoc = doc;
		}
}
