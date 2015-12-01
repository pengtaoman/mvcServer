package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions;

import java.util.List;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.neusoft.unieap.action.EAPDispatchAction;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWProcDefManager;
import com.neusoft.uniflow.api.res.NWApplication;
import com.neusoft.uniflow.category.ICategory;
import com.neusoft.uniflow.category.ICategoryEntry;
import com.neusoft.uniflow.web.management.procresourcemgt.actions.ActTmpManagerAction;
import com.neusoft.uniflow.web.util.UniflowManager;

public class AppNewManagerAction extends EAPDispatchAction {
	private Log log = LogFactory.getLog(ActTmpManagerAction.class);

	public ActionForward appNewManager(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return actionMapping.findForward("appNewManager");
	}

	public ActionForward getCategory(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		NWSession session = UniflowManager.getNWSession();
		ICategoryEntry categoryEntry = session.getCategoryEntry();
		NWProcDefManager resourceManager = session.getProcDefManager();

		String id = request.getParameter("category_id");
		String type = request.getParameter("type");
		String name=request.getParameter("name");
		StringBuffer buf = new StringBuffer();
		buf
				.append("'text','category_id','category_name','leaf','cls','allowDelete','allowEdit','checked','type'");

		buf.append("\n");
		JSONArray array = new JSONArray();
		if ("root".equals(type)) {

			if (log.isDebugEnabled()) {
				log
						.debug("CategoryManagerProc : Type is #getCategory# ,get type is  #root# ");
			}
			Vector categories = categoryEntry
					.openAbsoluteRootCategoryList(ICategoryEntry.APPLICATION);

			for (int i = 0; i < categories.size(); i++) {
				ICategory category = (ICategory) categories.get(i);
				int size = resourceManager.getAppNumByClassifiedID(category
						.getId());
				if (size == 0) {
					List categoryList = categoryEntry
							.openNextLevelCategoryList(category.getId());
					size = categoryList.size();
				}
			
				try {
					JSONObject j = new JSONObject();
					j.put("category_name", category.getCategoryFeature());
					j.put("category_id", category.getId());
					j.put("text", category.getName());
					if (size > 0) {
						j.put("leaf", false);
					} else {
						j.put("leaf", true);
					}
					j.put("iconCls", "folder");
					j.put("cls", "cmp");
					j.put("allowDelete", true);
					j.put("allowEdit", true);
					j.put("type", "category");
					array.put(j);
				} catch (JSONException e) {
					throw new ServletException(e);
				}
				
			}

		}

		if ("category".equals(type)) {
			String realId = id;
			// realId = Integer.parseInt(id);
			if (log.isDebugEnabled()) {
				log
						.debug("CategoryManagerProc : Type is #getCategory# ,get type is  #category# , the id of category is "
								+ realId + "now");
			}

			// List categorie = (List)categoryEntry.getSubCategory(realId);
			Vector categorie = categoryEntry.openNextLevelCategoryList(realId);

			for (int i = 0; i < categorie.size(); i++) {
				ICategory categorySub = (ICategory) categorie.get(i);
				int size = resourceManager.getAppNumByClassifiedID(categorySub
						.getId());
				if (size == 0) {
					List categorieList = categoryEntry
							.openNextLevelCategoryList(categorySub.getId());
					size = categorieList.size();
				}
				try {
					JSONObject j = new JSONObject();
					j.put("category_name", categorySub.getCategoryFeature());
					j.put("category_id", categorySub.getId());
					j.put("text", categorySub.getName());
					j.put("type", "category");
					j.put("allowDelete", true);
					j.put("allowEdit", true);
					// j.put("categorytype", category.getCategoryType());
					j.put("iconCls", "folder");
					if (size > 0) {
						j.put("leaf", false);

					} else {
						j.put("leaf", true);
					}
					array.put(j);
				} catch (JSONException e) {
					throw new ServletException(e);
				}
				
			}
			String appType="JavaEXE";
			if(name=="openManualNodeApplication"){
				
			}
			Vector resource = resourceManager.openAppListByClassifiedID(realId);
			for (int i = 0; i < resource.size(); i++) {
				NWApplication appResource = (NWApplication) resource.get(i);
				try {
					if("openManualNodeApplication".equals(name)){
						if(appType.indexOf(appResource.getType())==-1){
							JSONObject json = new JSONObject();
							json.put("id", appResource.getID());
							json.put("category_name", appResource.getDescription());
							json.put("category_id", appResource.getID());
							json.put("text", appResource.getName());
							json.put("type", "resource");
							json.put("leaf", true);
							json.put("checked", false);
							json.put("iconCls", "leaf");
							array.put(json);
						}
					}else{
						if(appType.indexOf(appResource.getType())!=-1){
							JSONObject json = new JSONObject();
							json.put("id", appResource.getID());
							json.put("category_name", appResource.getDescription());
							json.put("category_id", appResource.getID());
							json.put("text", appResource.getName());
							json.put("type", "resource");
							json.put("leaf", true);
							json.put("iconCls", "leaf");
							array.put(json);
						}
					}
					
				} catch (JSONException ej) {
					throw new ServletException(ej);
				}
				
			}

		}
		// response.setCharacterEncoding("UTF-8");
		response.setContentType("text/xml;charset=UTF-8");// weblogic
		response.getWriter().write(array.toString());

		return null;
	}

}
