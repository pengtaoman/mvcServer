package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.subGridAction;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.toollistener.ServerIO.ServerIO;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.workflow.model.Data;
import com.neusoft.workflow.model.ProcessContentDocument;
public class SubGridAction extends Action{

	public ActionForward execute(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String type = request.getParameter("nodeType");
		String procId = request.getParameter("id");
		//String currentDimId = request.getParameter("currentDimId");
		ServerIO  serverIO = UniflowManager.getServerIO();
		ProcessContentDocument  EPDoc;
		EPDoc = serverIO.readProcFromServer(procId);
		if(EPDoc.getProcessContent().getProcess().getDatas()!=null){
			Data [] subDatas = EPDoc.getProcessContent().getProcess().getDatas().getDataArray();
		 
		JSONArray array = new JSONArray();

				for(int i=0;i<subDatas.length;i++){
			
					try {
						JSONObject j = new JSONObject();
						j.put("id",subDatas[i].getId());
						j.put("name", subDatas[i].getName());
						
					array.put(j);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				response.setContentType("text/html;charset=GBK");
				response.getWriter().write(array.toString());
				return null;
			}else{
				JSONArray array = new JSONArray();

				JSONObject j = new JSONObject();
				j.put("id"," ");
				j.put("name", " ");
				
			array.put(j);
			response.setContentType("text/html;charset=GBK");
			response.getWriter().write(array.toString());
			return null;
	
		
	
	}
  }
	
}
	

