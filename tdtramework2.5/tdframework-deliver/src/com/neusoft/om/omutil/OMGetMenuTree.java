package com.neusoft.om.omutil;

import java.io.Serializable;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;

import com.neusoft.om.dao.funcrole.FuncRoleColl;
import com.neusoft.om.dao.funcrole.FuncRoleVO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.comp.menu.MenuComponent;
import com.neusoft.unieap.comp.menu.MenuOperationException;
import com.neusoft.unieap.comp.menu.MenuRepository;
import com.neusoft.unieap.comp.menu.access.MenuAcceptable;

public class OMGetMenuTree implements MenuAcceptable, Serializable {
	private MenuRepository repository = null;

	private FuncRoleColl roleFuncColl = null;

	private MenuColl adminFuncColl = null;

	private SystemColl systemColl = null;

	private ResultSet roleFuncRest = null;

	private ResultSet adminFuncRest = null;

	private StringBuffer menusStrBuf = null;

	public StringBuffer getMenusStrBuf() {
		return menusStrBuf;
	}

	public void setMenusStrBuf(StringBuffer menusStrBuf) {
		this.menusStrBuf = menusStrBuf;
	}

	public OMGetMenuTree(ResultSet roleFuncRest, ResultSet adminFuncRest) {
		this.roleFuncRest = roleFuncRest;
		this.adminFuncRest = adminFuncRest;
	}

	public OMGetMenuTree(FuncRoleColl roleFuncColl, MenuColl adminFuncColl,
			SystemColl systemColl) {
		this.roleFuncColl = roleFuncColl;
		this.adminFuncColl = adminFuncColl;
		this.systemColl = systemColl;
	}

	public OMGetMenuTree() {
	}

	public void update(MenuComponent arg0) throws MenuOperationException {
		// TODO Auto-generated method stub

	}

	public void insert(MenuComponent arg0) throws MenuOperationException {
		// TODO Auto-generated method stub

	}

	public void delete(MenuComponent arg0) throws MenuOperationException {
		// TODO Auto-generated method stub

	}

	public void load() throws MenuOperationException {
		List roleList = new ArrayList();
		int i;
		menusStrBuf = new StringBuffer("");

		if (roleFuncColl != null && roleFuncColl.getRowCount() != 0) {
			// roleList = roleFuncColl.getList();
			FuncRoleVO funcRoleVo = null;

			for (i = 0; i < roleFuncColl.getList().size(); i++) {
				funcRoleVo = (FuncRoleVO) (roleFuncColl.getFuncRole(i));
				String menuId = funcRoleVo.getMenuId().trim();
				roleList.add(i, menuId);
				menusStrBuf.append("-").append(menuId);
			}

		}
		Hashtable allMenus = new Hashtable();
		if (adminFuncColl != null && adminFuncColl.getRowCount() != 0
				&& systemColl != null && systemColl.getRowCount() != 0) {
			HashMap sysLayerMap = new HashMap();
			SystemVO systemVo = null;
			for(i=0;i<systemColl.getRowCount();i++){
				int sysLayer = 1;
				systemVo = systemColl.getSystem(i);
				String parentSystemId = systemVo.getParentSystemId();
				if(parentSystemId==null||parentSystemId.equals("")){
					
					sysLayerMap.put(systemVo.getSystemId(),new Integer(sysLayer));
				}else{
					sysLayer++;
					menusStrBuf.append("-").append(systemVo.getSystemId());
					sysLayerMap.put(systemVo.getSystemId(),new Integer(sysLayer));
				}
				
			}
			MenuVO menuVo = null;
			List roleSysList = new ArrayList();
			for (i = 0; i < adminFuncColl.getRowCount(); i++) {
				menuVo = adminFuncColl.getMenu(i);				
				String menuId = menuVo.getMenuId().trim();
				String systemId = menuVo.getSystemId();
				if(sysLayerMap.containsKey(systemId)){
					int sysLayer = ((Integer)sysLayerMap.get(systemId)).intValue();
					int layer = menuVo.getLayer()+ sysLayer;
					menuVo.setLayer(layer);
					boolean ifShowMenu = roleList.contains(menuId);
					MenuComponent menu = convertToMenu(menuVo, ifShowMenu);
					if (ifShowMenu && !roleSysList.contains(systemId)) {
						roleSysList.add(systemId);
						String parentSysId = systemColl.getSystem(systemId).getParentSystemId();
						if(sysLayer>1&&!roleSysList.contains(parentSysId)){
							roleSysList.add(parentSysId);
						}
					}				
					allMenus.put(menu.getName(), menu);
				}
			}
			
			MenuVO parentMenuVo = new MenuVO();
			for (i = 0; i < systemColl.getRowCount(); i++) {
				int sysLayer = 1;
				systemVo = systemColl.getSystem(i);
				parentMenuVo.setMenuId(systemVo.getSystemId());
				parentMenuVo.setMenuName(systemVo.getSystemName());
				parentMenuVo.setMenuDesc(systemVo.getDetailDesc());
				// int layer = 0;
				String parentSystemId = systemVo.getParentSystemId();
				parentMenuVo.setParentMenuId(parentSystemId);
				//parentMenuVo.setSystemId(parentSystemId);
				if(parentSystemId!=null&&!parentSystemId.equals("")){
					sysLayer++;		
				}
				parentMenuVo.setLayer(sysLayer);
				boolean ifShowSystem = roleSysList.contains(systemVo
						.getSystemId());
				MenuComponent menu = convertToMenu(parentMenuVo, ifShowSystem);
				if(parentSystemId==null||parentSystemId.equals("")){
					repository.addMenu(menu);		
				}
				
				allMenus.put(menu.getName(), menu);

				
			}

			Iterator allMenuKeys = allMenus.keySet().iterator();
			while (allMenuKeys.hasNext()) {

				MenuComponent menu = (MenuComponent) allMenus.get(allMenuKeys
						.next());
				String parent = menu.getParentName();
				if (parent != null && !parent.equalsIgnoreCase("")) {
					MenuComponent mc = (MenuComponent) allMenus.get(parent);

					if (mc == null) {
						repository.getAllMenu().put(menu.getName(), menu);
						continue;
					}
					mc.addMenuComponent(menu);
					// menu.setParent(mc);
					repository.getAllMenu().put(menu.getName(), menu);
					continue;
				}

				repository.getAllMenu().put(menu.getName(), menu);
			}

		}

	}

	public void save() throws MenuOperationException {
		// TODO Auto-generated method stub

	}

	public void deleteRole(String arg0) throws MenuOperationException {
		// TODO Auto-generated method stub

	}

	public void deleteAllRole() throws MenuOperationException {
		// TODO Auto-generated method stub

	}

	public List queryMenuRoles(String arg0) throws MenuOperationException {
		// TODO Auto-generated method stub
		return null;
	}

	public List queryAllMenuRoles() throws MenuOperationException {
		// TODO Auto-generated method stub
		return null;
	}

	public void insertMenuRoles(List arg0) throws MenuOperationException {
		// TODO Auto-generated method stub

	}

	public void copyRole(String arg0, String arg1)
			throws MenuOperationException {
		// TODO Auto-generated method stub

	}

	private MenuComponent convertToMenu(MenuVO menuVo, boolean ifShowMenu) {
		MenuComponent menu = new MenuComponent();
		menu.setName(menuVo.getMenuId().trim());
		menu.setTitle(menuVo.getMenuName().trim());
		menu.setTarget("");
		menu.setLocation("");
		String parentMenuId = menuVo.getParentMenuId();
		if (parentMenuId == null || parentMenuId.intern() == "".intern())
			menu.setParentName(menuVo.getSystemId());
		else
			menu.setParentName(parentMenuId);
		
		
		if (ifShowMenu) {
			menu.setRoles("1");
		} else {
			menu.setRoles("0");
		}

		String chief = "false";
		menu.setChief(chief);
		menu.setImage("");
		menu.setAltImage("");
		menu.setDescription(menuVo.getMenuDesc());
		int order = -1;
		order = menuVo.getLayer();
		menu.setLayer(order);
		menu.setOrder(order);
		// System.out.println(menuVo.getMenuId()+":"+menu.getOrder());
		return menu;
	}

	public MenuRepository createTree() {
		repository = new MenuRepository();
		try {
			load();
		} catch (MenuOperationException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OMGetMenuTree--createTree-1:" + e.getMessage());
			e.printStackTrace();
		}

		return repository;
	}

	public MenuRepository getRepository() {
		return repository;
	}

	public void setRepository(MenuRepository repository) {
		this.repository = repository;
	}

}
