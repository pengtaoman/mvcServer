/*
 * Created on 2004-11-24
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.management.enginecap.actions;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.management.enginecap.forms.EngineStatForm;


public class EngineStatAction extends Action {
	public ActionForward execute(ActionMapping mapping,
					   ActionForm form,
					   HttpServletRequest request,
					   HttpServletResponse response) throws Exception {
			EngineStatForm engineStatForm = (EngineStatForm) form;			
			SimpleDateFormat dateformat = new SimpleDateFormat(EngineStatForm.DATEFORMAT);
            String startTime = engineStatForm.getStartTime();
            String endTime = engineStatForm.getEndTime();
            if(startTime==null||startTime.equals("")||dateformat.parse(startTime).after(dateformat.parse(endTime))){
            	Date d = new Date();
            	d.setTime(d.getTime()-24*60*60*1000*12);
            	startTime = dateformat.format(d);
				engineStatForm.setStartTime(startTime);
            }
			if(endTime==null||endTime.equals("")||dateformat.parse(startTime).after(dateformat.parse(endTime))){
				endTime = dateformat.format(new Date());
				engineStatForm.setEndTime(endTime);
			}
			Date start_date = dateformat.parse(startTime);
			Date end_date = dateformat.parse(endTime);
			request.setAttribute("begin",start_date);
			request.setAttribute("end",end_date);
				
            return mapping.findForward("success");
   }
}
