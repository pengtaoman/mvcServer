package com.neusoft.om.action.employee;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.poweradjust.PowerAdjustColl;
import com.neusoft.om.dao.poweradjust.PowerAdjustDAO;
import com.neusoft.om.dao.poweradjust.PowerAdjustVO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.util.RequestUtil;
import com.neusoft.unieap.util.ResponseUtil;

public class EmployeePowerAdjustAction extends TDDispatchAction{
	
	public ActionForward powerAdjust(ActionMapping actionMapping,ActionForm actionForm,
			HttpServletRequest request,HttpServletResponse response){	
		
	  	RequestUtil requestUtil=new RequestUtil(request);
	    ResponseUtil responseUtil=new ResponseUtil(response);
	    
    	String message = "权限微调成功";
    	String employeeId = requestUtil.getParameter("employeeId");
    	String treeName = requestUtil.getParameter("treeName");
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
    	SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
    	PowerAdjustDAO powerAdjustDao = (PowerAdjustDAO) factory.getInteractionObject("powerAdjustDAO",appContext);
    	//得到从页面传递过来的选中菜单集合;
    	String[]  treeNodes = requestUtil.getParameters("checked_node_"+treeName);
    	//原菜单集合
        MenuColl oldMenuColl = menuDao.getUsableMenuCollByEmpId(employeeId,"true");
        SystemColl allSystem = sysDao.getAllSystemInfo();
    	MenuColl allMenu = menuDao.getAllMenuInfo();
        //选中的菜单和子系统集合
    	MenuColl menuColl = new MenuColl();
    	SystemColl sysColl = new SystemColl();
    	//过滤,得到选中的子系统和菜单集合,按照约定的规则,菜单编码与系统编码不会出现重复,暂时没有考虑出现重复的情况
    	if(treeNodes != null){
        	for(int i = 0; i < treeNodes.length; i++){
        		String nodeId = treeNodes[i];
        		SystemVO sysVO = getSystemById(allSystem,nodeId);
        		if(sysVO != null && sysVO.getSystemId()!= null && sysVO.getSystemId() != ""){
        			sysColl.addSystem(sysVO);
        		}
        		MenuVO menuVO = getMenuById(allMenu,nodeId);
        		if(menuVO != null && menuVO.getMenuId() != null && menuVO.getMenuId() != ""){
        			menuColl.addMenu(menuVO);
        		}
        	}    		
    	}

    	//过滤得到新选中的菜单集合    	
    	PowerAdjustColl powerAdjColl = new PowerAdjustColl();    	
    	for(int i = 0; i < menuColl.getRowCount(); i ++){
    		MenuVO menuVO = menuColl.getMenu(i);
    		if(!contain(oldMenuColl, menuVO)){//如果旧集合中不包括某菜单,则将其增加到权限微调的新增数据中
    			PowerAdjustVO powerAdjVO = new PowerAdjustVO();
    			powerAdjVO.setAdminAdjust(1);//增加权限
    			powerAdjVO.setEmployeeId(employeeId);
    			powerAdjVO.setExecAdjust(1);//增加权限
    			powerAdjVO.setMenuId(menuVO.getMenuId());
    			powerAdjVO.setSystemId(menuVO.getSystemId());
    			powerAdjColl.addPowerAdjustVO(powerAdjVO);
    		}
    	}
    	//得到原菜单集合中存在，后去掉的菜单
    	PowerAdjustColl delPowerAdjColl = new PowerAdjustColl(); 
    	for(int i =0; i<oldMenuColl.getRowCount(); i++){
    		MenuVO oldMenuVO = oldMenuColl.getMenu(i);
    		if(menuColl.getMenu(oldMenuVO.getMenuId()) == null){//如果原集合中的某个菜单在心菜单集合中不存在，则将原来的数据删除
    			PowerAdjustVO delPowerAdjVO = new PowerAdjustVO();
    			delPowerAdjVO.setAdminAdjust(2);//减少权限
    			delPowerAdjVO.setEmployeeId(employeeId);
    			delPowerAdjVO.setExecAdjust(2);
    			delPowerAdjVO.setMenuId(oldMenuVO.getMenuId());
    			delPowerAdjVO.setSystemId(oldMenuVO.getSystemId());
    			delPowerAdjColl.addPowerAdjustVO(delPowerAdjVO);
    		}
    	}
    	//将权限微调信息保存到权限微调表中    	
    	//首先判断微调时新增的和去掉的菜单中是否有曾经微调过的菜单,需要先将这部分数据删除,保证数据库中只保留最后一次权限微调的结果
    	PowerAdjustColl empHasAdjColl = powerAdjustDao.getPowerAdjustCollByEmpId(employeeId);
    	PowerAdjustColl overlapAdjColl = new PowerAdjustColl(); //此职员曾经微调过的菜单集合
    	for(int i =0; i < empHasAdjColl.getRowCount(); i++){
    		PowerAdjustVO hasAdjVO = empHasAdjColl.getPowerAdjust(i);
    		for(int j = 0; j < powerAdjColl.getRowCount(); j ++){
    			PowerAdjustVO adjVO = powerAdjColl.getPowerAdjust(j);
    			if(adjVO.getMenuId().equals(hasAdjVO.getMenuId())){
    				overlapAdjColl.addPowerAdjustVO(hasAdjVO);
    			}
    		}
    		
    		for(int j =0; j < delPowerAdjColl.getRowCount(); j++){
    			PowerAdjustVO delAdjVO = delPowerAdjColl.getPowerAdjust(j);
    			if(hasAdjVO.getMenuId().equals(delAdjVO.getMenuId())){
    				overlapAdjColl.addPowerAdjustVO(hasAdjVO);
    			}
    		}
    	}
    	
    	int delCode = powerAdjustDao.doDeletePowerAdjust(overlapAdjColl);
    	int codeAdd = powerAdjustDao.doAddPowerAdjust(powerAdjColl);
    	int codeDel = powerAdjustDao.doAddPowerAdjust(delPowerAdjColl);
    	if(delCode == 0 || codeAdd == 0 || codeDel == 0){
    		message = "权限微调失败";
    	}
    	request.setAttribute("message", message);
    	request.setAttribute("employeeId", employeeId);    	
        request.setAttribute("needCheckBox","true");
        request.setAttribute("operType","showAdjustPowerInit");
        try {
			response.getWriter().print(message);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return null;
	}
	
    private boolean contain(MenuColl coll, MenuVO vo){
    	boolean con = false;
    	for(int i =0; i < coll.getRowCount(); i++){
    		MenuVO menuVO = coll.getMenu(i);
    		if(menuVO.getMenuId().intern().equals(vo.getMenuId().intern())){
    			con = true;
    			
    		}
    	}
    	return con;
    	
    }
    private SystemVO getSystemById(SystemColl sysColl, String sysId){
    	for(int i = 0; i < sysColl.getRowCount(); i++){
    		SystemVO sysVO = sysColl.getSystem(i);
    		if(sysVO.getSystemId().trim().equals(sysId)){
    			return sysVO;
    		}    		
    	}
    	return null;
    }
    
    private MenuVO getMenuById(MenuColl menuColl, String menuId){
    	for(int i=0; i < menuColl.getRowCount(); i++){
    		MenuVO vo = menuColl.getMenu(i);
    		if(vo.getMenuId().trim().equals(menuId)){
    			return vo;
    		}
    	}
    	return null;
    }
}
