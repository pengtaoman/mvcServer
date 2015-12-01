package com.neusoft.om.action.organ;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.OrganManagementBO;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.omswitch.OmSwitchDAO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organdisplay.OrganDisplayColl;
import com.neusoft.om.omutil.OmOrganUtilBO;
import com.neusoft.om.omutil.OmOrganUtilDAO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.BaseAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OrganDisplayAction extends BaseAction {
	public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException{
			String operType  = NullProcessUtil.nvlToString(request.getParameter("OperType"),"init").trim();
			String area_id  = request.getParameter("areaId");
			OrganManagementBO service =(OrganManagementBO)getBaseService().getServiceFacade("organManagementFacade");
			OmOrganUtilBO utilBO = (OmOrganUtilBO)getBaseService().getServiceFacade("omUtilBO");
			InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("om");
	        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
	        OmOrganUtilDAO organUtilDAO = (OmOrganUtilDAO) factory.getInteractionObject("organUtilDAO", appContext);
	        AreaDAO areaDAO = (AreaDAO)factory.getInteractionObject("areaDAO", appContext);
	        String organDim = switchDAO.getOrganDim();
	        OrganColl organColl = new OrganColl();
			String message = "";
			//从session中得到操作员区域信息
			AuthorizeVO vo = getAuthorize(request);
			String areaId = vo.getAreaId();
			String changArea = (String)request.getParameter("changArea");
			if(operType.intern()=="init".intern()){
				OrganDisplayColl organDisplayColl = null;
				try{
					if(changArea != null && !changArea.trim().equals("")){
//						如果组织机构不受区域限制，则组织机构树中不显示区域节点。且所显示组织机构需受到当前登录工号的管理员类型属性决定
						if(organDim != null && organDim.trim().toUpperCase().equals("ORGAN")){
							int adminType = vo.getAdminType();
							int areaLevel = vo.getAreaLevel();
							AreaVO areaVO = areaDAO.getAreaById(changArea);							
							String cityCode = areaVO.getCityCode();
							if(areaLevel >= 3){
								organColl = service.getOrganByAuthId(vo.getEmployeeId(), adminType);
							}else{
								organColl = organUtilDAO.getAllCityOrgan(cityCode);
							}									
						}else{
							organDisplayColl = service.getOrganDisplayInfo(changArea,4);						
							request.setAttribute("openFlag","areaTree");
						}									
					}else{
						if(area_id!=null && !area_id.trim().equals("")){
							organDisplayColl = service.getOrganDisplayInfo(area_id);
							request.setAttribute("openFlag","countryTree");
						}else{
//							如果组织机构不受区域限制，则组织机构树中不显示区域节点。且所显示组织机构需受到当前登录工号的管理员类型属性决定
							if(organDim != null && organDim.trim().toUpperCase().equals("ORGAN")){
								int adminType = vo.getAdminType();
								organColl = service.getOrganByAuthId(vo.getEmployeeId(), adminType);
							}else{
								organDisplayColl = service.getOrganDisplayInfo(areaId,4);
								request.setAttribute("openFlag","areaTree");
							}							
						}	
					}					
				}catch (ServiceException e) { 
					SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayAction--getOrganDisplayInfo:"+e.getMessage());
					message = e.getMessage();		
				}
				request.setAttribute("OperType",operType);
				request.setAttribute("Message",message);
				request.setAttribute("OrganDisplayColl",organDisplayColl);
				request.setAttribute("organColl", organColl);
				if(organDim != null && organDim.trim().toUpperCase().equals("ORGAN")){
					return mapping.findForward("organdisplay");
					
				}else{
					return mapping.findForward("organdisplayresult");
				}			
				
			}else  if(operType.intern()=="createTree".intern()){
				OrganDisplayColl organDisplayColl = null;
				try{
					organDisplayColl = service.getOrganDisplayInfo(areaId);
				}catch (ServiceException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayAction--getOrganDisplayInfo:"+e.getMessage());
					message = e.getMessage();		
				}
				request.setAttribute("OperType",operType);
				request.setAttribute("Message",message);
				request.setAttribute("OrganDisplayColl",organDisplayColl);
				return mapping.findForward("organdisplaytree");
			}else if(operType.intern()=="showMarketTree".intern()){
				OrganDisplayColl organDisplayColl = null;
				try{
					organDisplayColl = service.getMarketOrganDisplayInfo(areaId);
				}catch (ServiceException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayAction--getOrganDisplayInfo:"+e.getMessage());
					message = e.getMessage();		
				}
				request.setAttribute("OperType",operType);
				request.setAttribute("Message",message);
				request.setAttribute("OrganDisplayColl",organDisplayColl);
				return mapping.findForward("dealertree");
				
			}else if(operType.intern()=="getCityColl".intern()){
				AuthorizeVO authVO =  getAuthorize(request);
				int areaLevel = authVO.getAreaLevel();
				String employeeId = authVO.getEmployeeId();
				ParamObjectCollection cityColl = new ParamObjectCollection(); 
				if(areaLevel <= 3){
			        cityColl = areaDAO.getAreaCollByEmp(employeeId);			        
				}else{
					ParamObject obj = new ParamObject();
					String authAreaId = authVO.getAreaId();
					String authAreaName = authVO.getAreaName();
					obj.setId(authAreaId);
					obj.setName(authAreaName);
					cityColl.addParamObject(obj);
				}
				request.setAttribute("cityColl", cityColl);
				return mapping.findForward("showCityColl");
			}else if(operType.intern()=="showTab".intern()){
				request.setAttribute("organDim", organDim);
				return mapping.findForward("showTab");
			}
			else{
				return null;
			}
	}
	

}















