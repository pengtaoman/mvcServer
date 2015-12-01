package com.neusoft.uniflow.web.webdesign.procmodify.actions;

import java.util.Vector;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListForm;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;

public class ProcModifyAction extends OpenListAction
{
	public int getItemsCount(String userID, NWSession nwsession,
					 ActionMapping mapping,
					 ActionForm form) throws NWException
	{
		int count = 1;
		count = nwsession.getCanModifyProcDefNum(userID);
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
				     ActionMapping mapping,
				     ActionForm form, OpenListParamBean param
				     ) throws NWException 
	{   		
		Vector list = nwsession.openCanModifyProcDefList(userID, 0);
		if (list != null && list.size() > 0){
			
			String id =((com.neusoft.uniflow.api.def.NWProcDef) list.elementAt(0)).getID();		
		    String verName = ((com.neusoft.uniflow.api.def.NWProcDef) list.elementAt(0)).getVersionName();
         
			((OpenListForm) form).setSelectedItem( id + "&v=" + verName);
        
		}
		return list;
	}
}