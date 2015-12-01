package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.json.JSONArray;
import org.json.JSONObject;

import com.neusoft.form.api.FormDefBrief;
import com.neusoft.form.api.FormPersistManager;
import com.neusoft.form.manage.server.FormManagerFactory;

public class FormListAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		try{
			FormPersistManager manager = FormManagerFactory.createManagerFactory(request).getFormPersistManager();
			List formList = manager.loadFormBriefList();
			JSONArray array = new JSONArray();
			
			for (int i = 0; i < formList.size(); i++) {
				FormDefBrief formDef = (FormDefBrief) formList.get(i);
			
					JSONObject j = new JSONObject();
					j.put("text", formDef.getName());
					j.put("id",formDef.getID());
					j.put("leaf",true);
					array.put(j);
				
			}
			response.setContentType("text/xml;charset=UTF-8");
			response.getWriter().write(array.toString());
		}
		catch(Exception ex){
			ex.printStackTrace();
			throw new RuntimeException("can not get form list!!");
		}
		return null;
	}
}
