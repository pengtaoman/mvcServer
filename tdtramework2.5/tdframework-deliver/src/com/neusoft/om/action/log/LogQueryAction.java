/*
 * Created on 2005-1-27
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.action.log;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.crm.channel.outInterface.om.bo.OmQueryBO;
import com.neusoft.om.bo.MenuOperateBO;
import com.neusoft.om.common.commonBO.OmCommon;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.dealer.DealerColl;
import com.neusoft.om.dao.dealer.DealerDAO;
import com.neusoft.om.dao.dealer.DealerTypeColl;
import com.neusoft.om.dao.log.LogColl;
import com.neusoft.om.dao.log.LogDAO;
import com.neusoft.om.dao.log.LogVO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menuoperate.MenuOperateVO;
import com.neusoft.om.dao.omswitch.OmSwitchDAO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.omutil.DealerConverse;
import com.neusoft.om.omutil.DealerTree;
import com.neusoft.om.omutil.MenuTreeUtil;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.common.util.GridUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.DBLogger;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.BaseAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.taglib.commontree.tree.impl.Tree;
import com.neusoft.unieap.taglib.commontree.tree.impl.TreeNode;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;
/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class LogQueryAction extends BaseAction{
	static int DEFAULT_PAGE_SIZE=10;
	
	public ActionForward service(
			ActionMapping mapping,
			ActionForm form,
			HttpServletRequest request,
			HttpServletResponse response)
			throws ActionException{
				String operType = NullProcessUtil.nvlToString(request.getParameter("OperType"),"init");
				if(operType.equals("init")){
					try{
						return getInit(mapping,request,response);
					}catch(Exception e){
						SysLog.writeLogs("billing",GlobalParameters.ERROR,"LogQueryAction--getInit()-1 :"+e.getMessage());
						return null;
					}
					
				}
				else if(operType.equals("query")){//query
					return getResult(mapping,request,response);
				}else if(operType.equals("showMenuTree")){
					return showMenuTree(mapping, request, response);
				}else if(operType.equals("showDealerTree")){
					return showDealerTree(mapping, request, response);
				}else if(operType.equals("export")){
					return export(mapping, request, response);
				}
				else//getLogInfo
				{
				    return getLogInfo(mapping,request,response);
				}
			}
			
		private ActionForward getInit(ActionMapping mapping,
			HttpServletRequest request,HttpServletResponse response)throws Exception {	
			
			AuthorizeVO vo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
			OmCommon bo =(OmCommon)getBaseService().getServiceFacade(OmCommon.BEAN);
			String beginDate = DateUtil.getDate().substring(0,8)+"01";
			String endDate = DateUtil.getDate().substring(0,10);
			String cityCode = vo.getCityCode();
			int cityLevel = vo.getAreaLevel();
			//String areaName = vo.getAreaName();
			
			request.setAttribute("AreaColl",bo.getCityColl(cityLevel,cityCode));
			request.setAttribute("cityCode",cityCode);
			request.setAttribute("beginDate",beginDate);
			request.setAttribute("endDate",endDate);
			request.setAttribute("operatorCity", cityCode);
			
			return mapping.findForward("init");
		}
		
		private ActionForward getResult(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response) {
            MenuOperateBO serviceMenu= (MenuOperateBO)getBaseService().getServiceFacade(MenuOperateBO.BEAN);//得到BO
            String message = "";	
            HashMap map = new HashMap();
			//得到页面的参数
			String sysmenu = "";  //request.getParameter("sysmenu");
			String queryInfo = "";
			String funcmenu = request.getParameter("funcmenu");
			
			if(funcmenu!=null && !funcmenu.trim().equals("")){
				queryInfo += "&funcmenu="+funcmenu;
				try
	            {
					MenuOperateVO menuVO = serviceMenu.getMenuById(funcmenu);
	                sysmenu = menuVO.getSystemId();
	                if( menuVO.getMenuId() == null || menuVO.getMenuId().trim() == ""){
	                    sysmenu = serviceMenu.getSystemInfoById(funcmenu).getSystemId();
	                }
	            } catch (ServiceException e1)
	            {
	                SysLog.writeLogs("om",GlobalParameters.ERROR,"LogQueryAction--getResult:"+e1.getMessage());
	                message = "查询失败!"+e1.getMessage();   
	            }
	            
	            map.put("systemId",sysmenu);
				map.put("menuId",funcmenu);
			}
            
			String area = request.getParameter("area");	        
			String starttime = request.getParameter("starttime");
			starttime = starttime+" 00:00:00";
			String endtime = request.getParameter("endtime");
			endtime = endtime+" 23:59:59";
			String partMonth=starttime.substring(5,7);
			partMonth=String.valueOf(Integer.parseInt(partMonth));			
			String workNo = request.getParameter("workNo");
			String discription = request.getParameter("discription");			
			String loginHost = request.getParameter("loginHost");
			String employeeName = request.getParameter("employeeName");
			
			map.put("employeeWorkNo", workNo);
			map.put("description",discription);
			map.put("startDate",starttime);
			map.put("endDate",endtime);
			map.put("cityCode",area);
			map.put("month",partMonth);
			map.put("loginHost", loginHost);
			map.put("employeeName", employeeName);
			DBLogger serviceLog= (DBLogger)getDBLogger();//得到BO
			
			queryInfo += "&area="+area;
			queryInfo += "&starttime="+starttime;
			queryInfo += "&endtime="+endtime;
			queryInfo += "&workNo="+workNo;
			queryInfo += "&discription="+discription;
			queryInfo += "&loginHost="+loginHost;
			queryInfo += "&employeeName="+employeeName;
			
			
			int totalRows = GridUtil.getTotalRowsFromRequest(request);
			LogColl logColl = new LogColl();
			try{
				if(totalRows<0){
					totalRows = serviceLog.getLogRowCount(map);
				}
				int[] startEnd = GridUtil.getStartEnd(request,totalRows,DEFAULT_PAGE_SIZE,1);
				if(totalRows > 0){
					logColl = serviceLog.getLogInfo(map,startEnd[0],startEnd[1]);
				}
			}catch (ServiceException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"LogQueryAction--getResult:"+e.getMessage());
				message = "查询失败!"+e.getMessage();			
			}	
			List logList= logColl.getList();
			if(logList.isEmpty())
			    message="没有您要查找的日志信息";
			request.setAttribute("totalRows",new Integer(totalRows));
			request.setAttribute("Message",message);
			request.setAttribute("LogList",logList);
			request.setAttribute("area",area);
			request.setAttribute("queryInfo", queryInfo);
			
			return mapping.findForward("result");
		}
			
		
		private ActionForward getLogInfo(ActionMapping mapping,
				HttpServletRequest request,
				HttpServletResponse response) {				
				String message = "";				
				//得到页面的参数
				String workNo = request.getParameter("f_work_no");	
				String operTime = request.getParameter("oper_time");
				String partCity = request.getParameter("part_city");
				DBLogger serviceLog= (DBLogger)getDBLogger();//得到BO				
				LogVO vo = null;
				try{
				    vo = serviceLog.getDetailLogInfo(partCity,workNo,operTime);
				}catch (ServiceException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"LogQueryAction--getResult:"+e.getMessage());
					message = "查询失败!"+e.getMessage();			
				}				
			    request.setAttribute("Message",message);
				request.setAttribute("LogInfo",vo);
				return mapping.findForward("info");
			}
		
		private ActionForward showMenuTree(ActionMapping mapping,
				HttpServletRequest request,
				HttpServletResponse response){
			HttpSession session = request.getSession();
			AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
			String employeeId = authvo.getEmployeeId();
	    	String message = "";
	        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("om");
	        MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
	        SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
	        MenuColl employeeMenuColl = menuDao.getUsableMenuCollByEmpId(employeeId,"false");
	        SystemColl sysColl = sysDao.getAdminSystemInfoByEmployeeId(employeeId);//包括一级和二级子系统
	        ITree menuTree =MenuTreeUtil.constructTree(employeeMenuColl,sysColl);
	        //如果不显示业务系统菜单
	        if(!showBusiMenu()){
		        String omSystemId = getOmSystemId();
		        SystemColl omSysColl = sysDao.getSystemCollInfo(omSystemId);
		      //如果当前操作员无权查看权限系统，显示空树,这种情况不大可能发生，因为能操作"日至查询"页面的用户应该可以看到权限系统
		        if(sysColl.getSystem(omSystemId)== null ){	
		        	menuTree = new Tree();
		        	ITreeNode root = new TreeNode("om", "功能菜单", "om");//根节点
		            menuTree.expand("om");
		            menuTree.setRoot(root);
		        }else{//否则组建权限系统树
		        	MenuColl omMenuColl = menuDao.getMenuInfoBySystemId(omSystemId);
		        	menuTree = MenuTreeUtil.constructTree(omMenuColl,omSysColl);
		        }
	        }
	        
	        request.setAttribute("message", message);
	       // session.setAttribute("menuTree", menuTree);
	        request.setAttribute("menuColl", employeeMenuColl);
	        request.setAttribute("sysColl", sysColl);
	        request.setAttribute("needCheckBox","false");			
			
			return mapping.findForward("showMenuTree");
		}
		
		private ActionForward showDealerTree(ActionMapping mapping,HttpServletRequest request,
				HttpServletResponse response){
			String currentOrganId = NullProcessUtil.nvlToString(request.getParameter("OrganId"),"").trim();
	        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("om");
	        DealerDAO dealerDAO = (DealerDAO) factory.getInteractionObject("dealerDAO", appContext);
	        OmQueryBO dealerService =(OmQueryBO)getServiceFacade("omQueryBOInterface");
	        DealerColl dealerColl = new DealerColl();
	        ITree dealerTree = null;
	        try{
	        	com.neusoft.crm.channel.outInterface.om.data.DealerColl channelColl = 
		        	dealerService.doGetDealerByBelongs(Integer.valueOf(currentOrganId));	        
		        dealerColl = DealerConverse.conversetoOmDealer(channelColl);
		        com.neusoft.crm.channel.outInterface.om.data.DealerTypeColl channelTypeColl = 
		        	dealerService.doGetDealerTypeColl();
		        DealerTypeColl typeColl = DealerConverse.concerseTypeColl(channelTypeColl);
			    dealerTree = DealerTree.constructTree(currentOrganId,dealerColl,typeColl);
	        }catch (Exception e) {
        		SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeQueryAction--getEmployeeInfo:"+e.getMessage());
			}	        
		    String nullTree = "true";
		    if(dealerColl.getRowCount() != 0){
		    	nullTree = "false";
		    }
		    HttpSession session = request.getSession();
		    session.setAttribute("dealerTree", dealerTree);
		    request.setAttribute("nullTree", nullTree);

			return mapping.findForward("dealertree");
		}
		/*
		 * 是否显示业务系统菜单
		 */
		private boolean showBusiMenu(){
	        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("om");
	        OmSwitchDAO omSwitchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
	        boolean need = false;
	        try{
	        	need  = omSwitchDAO.getIfShowBusiLog();
	        }catch(DataAccessException e){
	            SysLog.writeLogs("om",GlobalParameters.ERROR,
	                	"EmployeeMaintanceAction--showBusiMenu:"+e.getMessage());
	        }
	        return need;
		}

		private String getOmSystemId(){
	        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("om");
	        OmSwitchDAO omSwitchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
	        String sysId  = "";
	        try{
	        	sysId  = omSwitchDAO.getOmSystemId();
	        }catch(DataAccessException e){
	            SysLog.writeLogs("om",GlobalParameters.ERROR,
	                	"EmployeeMaintanceAction--getOmSystemId:"+e.getMessage());
	        }
	        return sysId;
		}
		
		private ActionForward export(ActionMapping mapping,HttpServletRequest request,
				HttpServletResponse response){
            MenuOperateBO serviceMenu= (MenuOperateBO)getBaseService().getServiceFacade(MenuOperateBO.BEAN);//得到BO
            InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
            AppContext appContext = new AppContextImpl();
            appContext.setApplicationName("om");
            AreaDAO areaDao = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
            LogDAO logDAO = (LogDAO) factory.getInteractionObject("logDAO", appContext);
            HashMap map = new HashMap();
			//得到页面的参数
			String sysmenu = "";
			String funcmenu = request.getParameter("funcmenu");
			
			if(funcmenu!=null && !funcmenu.trim().equals("")){
				try
	            {
	                MenuOperateVO menuVO = serviceMenu.getMenuById(funcmenu);
	                sysmenu = menuVO.getSystemId();
	                if( menuVO.getMenuId() == null || menuVO.getMenuId().trim() == ""){
	                    sysmenu = serviceMenu.getSystemInfoById(funcmenu).getSystemId();
	                }
	            } catch (ServiceException e1)
	            {
	                SysLog.writeLogs("om",GlobalParameters.ERROR,"LogQueryAction--getResult:"+e1.getMessage());
	            }
	            
	            map.put("systemId",sysmenu);
				map.put("menuId",funcmenu);
			}
            
			String area = request.getParameter("area");	    			
			String starttime = request.getParameter("starttime");
			String endtime = request.getParameter("endtime");
			String partMonth=starttime.substring(5,7);
			partMonth=String.valueOf(Integer.parseInt(partMonth));			
			String workNo = request.getParameter("workNo");
			String discription = request.getParameter("discription");			
			String loginHost = request.getParameter("loginHost");
			String employeeName = request.getParameter("employeeName");
			
			map.put("employeeWorkNo", workNo);
			map.put("description",discription);
			map.put("startDate",starttime);
			map.put("endDate",endtime);
			map.put("cityCode",area);
			map.put("month",partMonth);
			map.put("loginHost", loginHost);
			map.put("employeeName", employeeName);			
			LogColl logColl = new LogColl();
			try{
					logColl = logDAO.getLogInfo(map);
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"LogQueryAction--getResult:"+e.getMessage());
			}			
		 try {
			response.setContentType("text/plain");
			
			String codedfilename = URLEncoder.encode("日志信息.csv","UTF8");
			response.setHeader("Content-Disposition", "attachment;filename=\""+ codedfilename + "\"");
			response.setHeader("Cache-Control","must-revalidate, post-check=0, pre-check=0");
			response.setHeader("Pragma", "public");
		
			ByteArrayOutputStream wb = new ByteArrayOutputStream();
			String areaName = areaDao.getAreaNameByAreaId(area);	
			wb = getTxtFileStream(logColl, areaName);			
			wb.writeTo(response.getOutputStream());
			response.getOutputStream().flush();
			response.getOutputStream().close();

		} catch (Exception e) {
			System.out.println("Error : " + e.toString());
		}
		return null;
		}
		private ByteArrayOutputStream getTxtFileStream(LogColl logColl, String areaName) {
			
			ByteArrayOutputStream fos = new ByteArrayOutputStream();
			OutputStreamWriter osw = new OutputStreamWriter(fos);
			java.io.BufferedWriter bw = new BufferedWriter(osw);
			
			try {

				if(logColl!= null){
					bw.write("地市名称,地市编码,归属部门,职员编号,工号,姓名,系统菜单,功能菜单,按钮,操作时间,登录ip,详细描述");
					bw.newLine();
					for (short i = 0; i < logColl.getRowCount(); i++) {
						LogVO logVO = logColl.getLog(i);
						bw.write(areaName+","+logVO.getAreaId()+","
								+ logVO.getOrganName()+","+logVO.getEmployeeId()+","
								+ logVO.getWorkNo() + "," + logVO.getEmployeeName()+","
								+ logVO.getSystemName() + "," + logVO.getMenuName()+","
								+ logVO.getBottomName() +","+ logVO.getOperateDate()+","
								+logVO.getLoginHost()+","+logVO.getOperateDesc());
						bw.newLine();
					}
					bw.flush();
					bw.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			return fos;
		}
		private ByteArrayOutputStream createJxl(LogColl logColl, String areaName) {

			WritableWorkbook book = null ;
			ByteArrayOutputStream fos = null;
			Workbook workbook = null;
			
			try{
				fos = new ByteArrayOutputStream();
				book = workbook.createWorkbook(fos); 	
				
				WritableSheet sheet=book.createSheet("第一页",0); 
				sheet.addCell(new Label(0,0,"地市名称"));
				sheet.addCell(new Label(1,0,"地市编码"));						
				sheet.addCell(new Label(2,0,"职员编号"));
				sheet.addCell(new Label(3,0,"姓名"));
				sheet.addCell(new Label(4,0,"工号"));
				sheet.addCell(new Label(5,0,"系统菜单"));
				sheet.addCell(new Label(6,0,"功能菜单"));
				sheet.addCell(new Label(7,0,"按钮"));
				sheet.addCell(new Label(8,0,"操作时间"));
				sheet.addCell(new Label(9,0,"详细描述"));

				for(int i=0; i < logColl.getRowCount(); i++){
					LogVO logVO = logColl.getLog(i);					
					sheet.addCell(new Label(0,i+1,areaName)); 
					sheet.addCell(new Label(1,i+1,logVO.getAreaId()));
					sheet.addCell(new Label(2,i+1,logVO.getEmployeeId()));
					sheet.addCell(new Label(3,i+1,logVO.getEmployeeName()));
					sheet.addCell(new Label(4,i+1,logVO.getWorkNo()));				
					sheet.addCell(new Label(5,i+1,logVO.getSystemName()));			
					sheet.addCell(new Label(6,i+1,logVO.getMenuName()));				
					sheet.addCell(new Label(7,i+1,logVO.getBottomName()));
					sheet.addCell(new Label(8,i+1,logVO.getOperateDate()));
					sheet.addCell(new Label(9,i+1,logVO.getOperateDesc()));
				}
				book.write();
				book.close();
			}
			catch(IOException ioe)
			{
				ioe.printStackTrace();
			}
			catch(WriteException we)
			{
				we.printStackTrace();			
			}
			catch(Exception e)
			{
				e.printStackTrace();			
			}
			
			return fos;
		}
}


