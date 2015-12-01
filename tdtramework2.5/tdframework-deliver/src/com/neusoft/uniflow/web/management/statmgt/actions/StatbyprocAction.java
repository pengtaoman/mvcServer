package com.neusoft.uniflow.web.management.statmgt.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.stat.NWStatMgr;
import com.neusoft.uniflow.web.management.statmgt.forms.StatisticsForm;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class StatbyprocAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();
		StatisticsForm statisticsForm = (StatisticsForm) form;
		try {
			NWStatMgr statMgr;
			statMgr = (NWStatMgr) session
					.getAttribute(SessionManager.STATISTICS);
			if (statMgr == null) {
				statMgr = nwsession.newStatMgrInstance();
				session.setAttribute(SessionManager.STATISTICS, statMgr);
			}
			Vector statList = statMgr.statbyProc();
			
			int countofPage=statisticsForm.getCountofPage();
			if(countofPage==0){
				String custom=(String)session.getAttribute(SessionManager.CUSTOMATION);
				String strnum=CustomHandler.getElements(CustomHandler. PREFERENCE_NUMBER,custom);
				countofPage=Integer.valueOf(strnum).intValue();
			}
			
			int totalSize=statList.size();
			statisticsForm.setTotal(totalSize);//total records
			int pagesCount=getPagesCount(totalSize, countofPage);
			statisticsForm.setPagesCount(pagesCount);//total pages
			
			int requestPage=statisticsForm.getRequestPage();
			if(requestPage>pagesCount){
				requestPage=pagesCount;
			}
			statisticsForm.setCurrentPage(requestPage);
			
			int startLocation=(requestPage-1)*countofPage;
			
			Vector showList=getShowList(statList,startLocation, countofPage);
			// System.out.println(statList.toString());
			statisticsForm.setList(showList);
			request.setAttribute("num", String.valueOf(showList.size()));
			
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e,
					"error.invokeinterface"));
			return mapping.findForward("error");
		}
		return mapping.findForward("success");
	}
	
	private int getPagesCount(int totalSize,int countofpage){
		int pagescount=0;
		if(totalSize<2){
			pagescount=1;
		}else if(totalSize%countofpage==0){
			pagescount=totalSize/countofpage;
		}else{
			pagescount=totalSize/countofpage+1;
		}
		return pagescount;
	}
	private Vector getShowList(Vector list,int startLocation,int offset){
		int size=list.size();
		Vector resultList=new Vector();
		if(startLocation<=size&&startLocation+offset>size){
			offset=size-startLocation;
		}
		for(int i=startLocation;i<startLocation+offset;i++){
			resultList.add(list.elementAt(i));
		}
		return resultList;
	}
}
