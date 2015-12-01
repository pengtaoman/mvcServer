package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.neusoft.workflow.model.Application;
/**
 * @author fu-qiang 
 * 
 */
public class locApplicationAction extends Action{
	public ActionForward execute(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String type = request.getParameter("nodeType");
		JSONArray array = new JSONArray();
			if("root".equalsIgnoreCase(type)){
				Application [] locApp =(Application []) request.getSession().getAttribute("applications");
				for(int i=0;i<locApp.length;i++){
					Application locunit = locApp[i];
					try {
						JSONObject j = new JSONObject();
						j.put("id",locunit.getId());
						j.put("text",locunit.getName());
						j.put("iconCls", "lunit");
						j.put("nodeType", "lunit");
						j.put("allowDrag", false);
						j.put("allowDrop", false);
					array.put(j);
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
			}

		response.setContentType("text/html;charset=GBK");
		response.getWriter().write(array.toString());
		return null;
	}
}
