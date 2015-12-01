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
import com.neusoft.uniflow.api.stat.NWStatbyMember;
import com.neusoft.uniflow.web.management.statmgt.beans.StatByMemberBean;
import com.neusoft.uniflow.web.management.statmgt.forms.StatisticsForm;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class StatisticsAction
    extends Action {
  public ActionForward execute(ActionMapping mapping,
                               ActionForm form,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
    HttpSession session = request.getSession();
    NWSession nwsession = WorkflowManager.getSysNWSession();
    StatisticsForm statisticsForm = (StatisticsForm) form;
    int requestPage=statisticsForm.getRequestPage();
    try {
      NWStatMgr statMgr;
      statMgr = (NWStatMgr) session.getAttribute(SessionManager.STATISTICS);
      if (statMgr == null) {
        statMgr = nwsession.newStatMgrInstance();
        session.setAttribute(SessionManager.STATISTICS,statMgr);
      }
      Vector statList = statMgr.statbyMember();
      int totalSize=statList.size();//total records
      statisticsForm.setTotal(totalSize);
      
      int countofPage=statisticsForm.getCountofPage();
      if(countofPage==0){
			String custom=(String)session.getAttribute(SessionManager.CUSTOMATION);
			String strnum=CustomHandler.getElements(CustomHandler. PREFERENCE_NUMBER,custom);
			countofPage=Integer.valueOf(strnum).intValue();
		}
      int pagesCount=this.getPagesCount(totalSize, countofPage);
      statisticsForm.setPagesCount(pagesCount);
      if(requestPage>pagesCount)
    	  requestPage=pagesCount;
      
      statisticsForm.setCurrentPage(requestPage);
      
      int startLocation=(requestPage-1)*countofPage;
      
      Vector Showlist=new Vector();
      Showlist=this.getShowList(statList, startLocation, countofPage);
//      System.out.println(statMgr.getFilter().getStartDate());
      Vector list=new Vector();
      for (int i=0;i<Showlist.size();i++){
      	list.add(new StatByMemberBean((NWStatbyMember)Showlist.elementAt(i)));
      }
      statisticsForm.setList(list);
      request.setAttribute("num",String.valueOf(list.size()));
    }
    catch (Exception e) {
      session.setAttribute(SessionManager.ERROR,
                           new UniException(e, "error.invokeinterface"));
      return mapping.findForward("error");
    }
    return mapping.findForward("success");
  }
  private int getPagesCount(int totalSize,int coutofPage){
	  int pages=0;
	  if(totalSize<2){
		  pages=1;
	  }else if(totalSize%coutofPage==0){
		  pages=totalSize/coutofPage;
	  }else{
		  pages=totalSize/coutofPage+1;
	  }
	  return pages;
  }
  private Vector getShowList(Vector list,int startLocation,int offset){
	  int size=list.size();
	  Vector returnList=new Vector();
	  if(startLocation<=size&&startLocation+offset>size)
		  offset=size-startLocation;
	  for(int i=startLocation;i<startLocation+offset;i++){
		  returnList.add(list.elementAt(i));
	  }
	  return returnList;
  }
}