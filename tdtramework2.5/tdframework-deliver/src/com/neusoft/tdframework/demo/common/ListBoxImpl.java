/*
 * Created on 2006-2-23
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.common;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.HttpObjectUtil;
import com.neusoft.tdframework.demo.bo.common.RoleListBo;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.comp.datawindow.OptionCell;
import com.neusoft.unieap.taglib.listbox.ListBoxData;

/**
 * @author yangzz
 */
public class ListBoxImpl extends ListBoxData {

	public List getOptionData(HttpServletRequest request) {
		
		List list = new ArrayList();
		
		AuthorizeVO vo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
		String areaId = vo.getAreaId();

		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName(HttpObjectUtil.getAppName(request));
		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		
		RoleListBo bo = (RoleListBo) factory.getInteractionObject("roleListBo",appContext);
		List roles = bo.getRolesByAreaId(areaId);

		Iterator it = roles.iterator();
		
		while (it.hasNext()) {
			Map role = (Map) it.next();
			OptionCell cell = new OptionCell((String) role.get("name"));
			cell.setOthersExtendsInfo((String) role.get("name"), (String) role.get("name"));
			list.add(cell);
		}
		return list;
	}
}