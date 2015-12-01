package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.res.NWApplication;
import com.neusoft.uniflow.web.util.UniflowManager;
/**
 * @author fu-qiang 
 * 
 */
public class applicationAction extends Action{
	/**
	 * 获得菜单树
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward execute(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String type = request.getParameter("nodeType");
		String id = request.getParameter("id");
		//String currentDimId = request.getParameter("currentDimId");
		
		JSONArray array = new JSONArray();

			if("root".equalsIgnoreCase(type)){
				Vector units =  UniflowManager.getNWSession().openApplicationList();
				for(int i=0;i<units.size();i++){
					NWApplication unit = (NWApplication)units.get(i);
					try {
						JSONObject j = new JSONObject();
						j.put("id",unit.getID());
						j.put("text",unit.getName());
						j.put("qtip", "描述信息：");
						j.put("iconCls", "gunit");
						j.put("nodeType", "gunit");
						j.put("allowDrag", false);
						j.put("allowDrop", false);
					array.put(j);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}

		response.setContentType("text/html;charset=GBK");
		response.getWriter().write(array.toString());
		return null;
	}
	
}