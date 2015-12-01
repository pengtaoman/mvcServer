package com.neusoft.om.action.pwd;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.pwd.PwdComplexityColl;
import com.neusoft.om.dao.pwd.PwdComplexityDAO;
import com.neusoft.om.dao.pwd.PwdComplexityVO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.GridUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class PwdComplexityAction extends TDDispatchAction {
	
	public ActionForward getAllInfo(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {	
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    PwdComplexityDAO dao = (PwdComplexityDAO) factory.getInteractionObject("pwdComplexityDAO",appContext);//得到DAO
	    PwdComplexityColl coll = dao.getAllPwdComlexityConfig();
	    GridUtil.getStartEnd(request,coll.getRowCount(),coll.getRowCount(), 1);
	    request.setAttribute("pwdList", coll.getList());
		return actionMapping.findForward("pwdList");
	}
	
	public ActionForward getDetailInfo(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    PwdComplexityDAO dao = (PwdComplexityDAO) factory.getInteractionObject("pwdComplexityDAO",appContext);//得到DAO
	    String id_string = request.getParameter("id");
	    int id = Integer.parseInt(id_string);	    
	    PwdComplexityVO vo = dao.getPwdComplexityById( id );
	    
	    request.setAttribute("pwdVO", vo);
	    return actionMapping.findForward("pwdDetail");
	}
	
	public ActionForward doModifyPwdComplexity(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    PwdComplexityDAO dao = (PwdComplexityDAO) factory.getInteractionObject("pwdComplexityDAO",appContext);//得到DAO
	    AuthorizeVO authVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
	    String operType = request.getParameter("operType");
		String lowercase = request.getParameter("lowercase");
		String uppercase = request.getParameter("uppercase");
		String specialChar = request.getParameter("specialChar");
		String number = request.getParameter("number");
		String desc = request.getParameter("desc");
		String ids = request.getParameter("pwdId");
		int id = Integer.parseInt(ids);
		PwdComplexityVO vo = new PwdComplexityVO();
		vo.setId(id);
		vo.setLowercase(lowercase);
		vo.setUppercase(uppercase);
		vo.setSpecialChar(specialChar);
		vo.setNumber(number);
		vo.setDesc(desc);
		vo.setCreater(authVO.getWorkNo());
		vo.setUpdater(authVO.getWorkNo());
		String message = "";
	    try{
	    	if(operType.trim().equals("add")){
	    		message = "增加成功！";
		    	int code = dao.doAddPwdComplexity(vo);
		    	if(code == 0){
			    	message = "增加失败";
			    }
	    	}else if(operType.trim().equals("modify")){
	    		message = "修改成功";
	    		int code = dao.doUpdatePwdComplexity(vo);
	    		if(code == 0){
	    			message = "修改失败";
	    		}
	    	}
	    }catch(DataAccessException e){
	    	message = "保存失败："+e.getMessage();
	    }
	    PwdComplexityColl coll = dao.getAllPwdComlexityConfig();
	    request.setAttribute("pwdList", coll.getList());
	    request.setAttribute("message", message);
	    return actionMapping.findForward("hidden");		
	}
	public ActionForward doDeletePwdComplexity(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    PwdComplexityDAO dao = (PwdComplexityDAO) factory.getInteractionObject("pwdComplexityDAO",appContext);//得到DAO
	    String id = request.getParameter("id");
		String message = "";
	    try{	    	
    		message = "删除成功";
    		int code = dao.doDeletePwdComplexity(Integer.parseInt(id));
    		if(code == 0){
    			message = "删除失败";
    		}
	    }catch(DataAccessException e){
	    	message = "删除失败："+e.getMessage();
	    }
	    PwdComplexityColl coll = dao.getAllPwdComlexityConfig();
	    GridUtil.getStartEnd(request,coll.getRowCount(),coll.getRowCount(), 1);
	    request.setAttribute("pwdList", coll.getList());
	    request.setAttribute("message", message);
	    return actionMapping.findForward("pwdList");		
	}

}
