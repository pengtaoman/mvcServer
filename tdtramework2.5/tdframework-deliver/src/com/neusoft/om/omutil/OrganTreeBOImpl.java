package com.neusoft.om.omutil;

import java.util.ArrayList;
import java.util.List;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.taglib.commontree.tree.impl.Tree;
import com.neusoft.unieap.taglib.commontree.tree.impl.TreeNode;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;

public class OrganTreeBOImpl implements OrganTreeBO{
    private OrganDAO organDAO;
    private AreaDAO areaDAO;
    private EmployeeDAO employeeDAO;
	/**
	 * �õ���֯������
	 * @param minLevel
	 * @param MaxLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganTree(int minLevel, int maxLevel) throws ServiceException {
		try{
			AreaColl areaColl = areaDAO.getAreaByLevel(minLevel, maxLevel);
			OrganColl organColl = organDAO.getOrganByAreaLevel(minLevel, maxLevel);
			return OmOrganTree.constructOrganTree(areaColl,organColl);
			}catch(DataAccessException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganTreeBOImpl--getOrganTree:"+e.getMessage());
				throw new ServiceException(e);
			}
	}
	/**
	 * �õ�������
	 * @param minLevel
	 * @param maxLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getAreaTree(int minLevel, int maxLevel) throws ServiceException {
		try{
			AreaColl areaColl = areaDAO.getAreaByLevel(minLevel, maxLevel);
			return OmOrganTree.constructAreaTree(areaColl);
			}catch(DataAccessException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganTreeBOImpl--getAreaTree:"+e.getMessage());
				throw new ServiceException(e);
			}
	}
    /**
     * �õ�����-��֯������
     * @param minAreaLevel
     * @param maxAreaLevel
     * @return
     * @throws ServiceException
     */
	public ITree getAreaOrganTree(int minLevel, int maxLevel) throws ServiceException {
		try{
		AreaColl areaColl = areaDAO.getAreaByLevel(minLevel, maxLevel);
		OrganColl organColl = organDAO.getOrganByAreaLevel(minLevel, maxLevel);
		return OmOrganTree.constructAreaOrganTree(areaColl, organColl);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganTreeBOImpl--getAreaOrganTree:"+e.getMessage());
			throw new ServiceException(e);
		}
		
	}
	/**
	 * �õ�һ������-��֯����-��Ա���������򼶱�ȷ�����ݷ�Χ
	 * @param minAreaLevel
	 * @param maxAreaLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getAreaOrganEmpTree(int minLevel, int maxLevel) throws ServiceException {
		try{
		AreaColl areaColl = areaDAO.getAreaByLevel(minLevel,maxLevel);
		OrganColl organColl = organDAO.getOrganByAreaLevel(minLevel,maxLevel);
		EmployeeColl employeeColl = employeeDAO.getEmployeeByAreaLevel(minLevel,maxLevel);
		return OmOrganTree.constructAreaOrganEmpTree(areaColl, organColl, employeeColl);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganTreeBOImpl--getAreaOrganEmpTree:"+e.getMessage());
			throw new ServiceException(e);
		}
	}

	/**
	 * �õ���֯����-ְԱ���������򼶱�ȷ�����ݷ�Χ
	 * @param minAreaLevel
	 * @param maxAreaLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree(int minLevel, int maxLevel) throws ServiceException{
		try{
			AreaColl areaColl = areaDAO.getAreaByLevel(minLevel, maxLevel);
			OrganColl organColl = organDAO.getOrganByAreaLevel(minLevel, maxLevel);
			EmployeeColl empColl = employeeDAO.getEmployeeByAreaLevel(minLevel, maxLevel);
			return OmOrganTree.constructOrganEmpTree(areaColl,organColl, empColl);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganTreeBOImpl--getOrganEmpTree:"+e.getMessage());
			throw new ServiceException(e);
		}
	}
	
	public void setAreaDAO(AreaDAO areaDAO) {
		this.areaDAO = areaDAO;
	}

	public void setEmployeeDAO(EmployeeDAO employeeDAO) {
		this.employeeDAO = employeeDAO;
	}

	public void setOrganDAO(OrganDAO organDAO) {
		this.organDAO = organDAO;
	}
	/**
	 * ���ݵ�ǰ����Ա��������Ϣȷ����֯�������ϵĻ�������Ա����
	 */
	public ITree getOrganEmpTree(String authAreaId) throws ServiceException{
		int minLevel = 2; //ʡ��
		try{
			AreaColl areaColl = areaDAO.getAreaCollByAuthAreaId( authAreaId);
			OrganColl organColl = organDAO.getOrganCollByAuthAreaId(authAreaId);
			EmployeeColl empColl = employeeDAO.getEmployeeByArea(authAreaId);
			return OmOrganTree.constructOrganEmpTree(areaColl,organColl, empColl);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganTreeBOImpl--getOrganEmpTree:"+e.getMessage());
			throw new ServiceException(e);
		}
	}
	
	/**
	 * �õ���ǰ��¼��Ա������֯�����͸���֯����������Ա��Ϣ����
	 * @param authId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getCurrentOrganEmpTree(String authId) throws ServiceException{
		EmployeeVO employee = employeeDAO.getEmployeeInfoById(authId);
		String organId = employee.getOrganId();
		OrganVO organ = organDAO.getOrganInfoById(organId);
		EmployeeColl employeeColl = employeeDAO.getEmployeeInfoByOrganId(organId);
		ITree organTree = new Tree();
		ITreeNode root = new TreeNode(organ.getOrganId(), organ.getOrganName(),"1");
		for(int i =0; i < employeeColl.getRowCount();i++){
			EmployeeVO emp = employeeColl.getEmployee(i);
			ITreeNode empNode = new TreeNode(emp.getEmployeeId(), emp.getEmployeeName(),"0");
			root.addChild(empNode);
		}
		organTree.setRoot(root);
		
		return organTree;
		//OmOrganTree.constructOrganEmpTree(areaColl, organColl, employeeColl);
		
	}
	
	public ITree getChildOrganEmpTree(String organIds) throws ServiceException{
		ITree tree =  new Tree();
		ITreeNode root = new TreeNode("om","��֯������","organtree");
		if(organIds != null){
			String[] organArry = organIds.split(",");
			for(int i=0; i < organArry.length ; i++){
				String organId = organArry[i];
				if(organId != null && !organId.trim().equals("")){
					OrganColl organColl = organDAO.getSelfAndChildren(organId);	
					EmployeeColl empColl = new EmployeeColl();
					for(int j=0; j< organColl.getRowCount();j++){
						OrganVO subOrganVO = organColl.getOrgan(j);
						EmployeeColl subEmpColl = employeeDAO.getEmployeeInfoByOrganId(subOrganVO.getOrganId());
						empColl = unionEmpColl(empColl,subEmpColl);
					}
					ITree subOrganTree = OmOrganTree.constructOrganEmpTree(organColl, empColl);//����һ����֯����������֧
					ITreeNode subRoot = subOrganTree.getRoot();
					root.addChild(subRoot);
				}
				
			}
		}	
		tree.setRoot(root);
		return tree;		
	}
	
	private EmployeeColl unionEmpColl(EmployeeColl coll, EmployeeColl subColl){
		if(subColl != null){
			for( int i=0; i < subColl.getRowCount(); i++){
				EmployeeVO vo = subColl.getEmployee(i);
				coll.addElement(vo);
			}
		}		
		return coll;
	}
	
	/**
	 * �õ���֯����-ְԱ���������򼶱�ȷ�����ݷ�Χ��רΪPPMϵͳʹ��
	 * @param minAreaLevel
	 * @param maxAreaLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree4PPM(int minLevel, int maxLevel) throws ServiceException{
		try{
			AreaColl areaColl = areaDAO.getAreaByLevel(minLevel, maxLevel);
			OrganColl organColl = organDAO.getOrganByAreaLevel(minLevel, maxLevel);
			EmployeeColl empColl = employeeDAO.getEmployeeByAreaLevel(minLevel, maxLevel);
			EmployeeColl partTimeColl = employeeDAO.getPtEmployee(organColl);//�õ����в����ڵļ�ְ����
			EmployeeColl unionEmpColl = unionEmpColl(empColl, partTimeColl);
			EmployeeColl filterColl = filterEmp(unionEmpColl);			
			return OmOrganTree.constructOrganEmpTree(areaColl,organColl, filterColl);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganTreeBOImpl--getOrganEmpTree4PPM:"+e.getMessage());
			throw new ServiceException(e);
		}
	}
	private EmployeeColl filterEmp(EmployeeColl unionEmpColl) {
		EmployeeColl filterColl = new EmployeeColl();
		if(unionEmpColl != null && unionEmpColl.getRowCount() > 0){
			for(int i=0; i<unionEmpColl.getRowCount();i++){
				EmployeeVO vo = unionEmpColl.getEmployee(i);
				String voName = vo.getEmployeeName();
				if(voName.trim().endsWith("_OA")){//ֻ��ʾ������"_OA"��β�Ĺ���
					filterColl.addEmployee(vo);
				}
			}
		}
		return filterColl;
	}
	
	/**
	 * ���ݵ�ǰ��¼�Ĳ���Ա���õ���֯������ְԱ���ϵ�����רΪPPMϵͳʹ��
	 * ��½�û���ʡ���û�����ʾʡ�ֵ������û��������½���û��ǵ����û�����ʾ��ǰ���������û���ʡ�ֵ������û���
	 * ������ص��û���¼�ˣ���ʾ��ǰ ���ص������û����������ڵ��������û���ʡ�ֵ������û�
	 * @param authAreaId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree4PPM(String authAreaId) throws ServiceException{
		try{
			AreaColl areaColl = areaDAO.getAreaCollByAuthAreaId( authAreaId);
			OrganColl organColl = organDAO.getOrganCollByAuthAreaId(authAreaId);
			EmployeeColl empColl = employeeDAO.getEmployeeByArea(authAreaId);
			EmployeeColl partTimeColl = employeeDAO.getPtEmployee(organColl);//�õ����в����ڵļ�ְ����
			EmployeeColl unionEmpColl = unionEmpColl(empColl, partTimeColl);
			EmployeeColl filterColl = filterEmp( unionEmpColl);	
			
			return OmOrganTree.constructOrganEmpTree(areaColl,organColl, filterColl);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganTreeBOImpl--getOrganEmpTree:"+e.getMessage());
			throw new ServiceException(e);
		}
	}
	
	/**
	 * �õ���ǰ��¼��Ա������֯�����͸���֯����������Ա��Ϣ������רΪPPMϵͳʹ��
	 * @param authId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getCurrentOrganEmpTree4PPM(String authId) throws ServiceException{
		EmployeeVO employee = employeeDAO.getEmployeeInfoById(authId);
		String organId = employee.getOrganId();
		OrganVO organ = organDAO.getOrganInfoById4PPM(organId);
		EmployeeColl employeeColl = employeeDAO.getEmployeeInfoByOrganId(organId);
		OrganColl organColl = new OrganColl();
		organColl.addOrgan(organ);
		EmployeeColl partTimeColl = employeeDAO.getPtEmployee(organColl);//�õ����в����ڵļ�ְ����
		EmployeeColl unionEmpColl = unionEmpColl(employeeColl, partTimeColl);
		EmployeeColl filterColl = filterEmp( unionEmpColl);	
		ITree organTree = new Tree();
		ITreeNode root = new TreeNode(organ.getOrganId(), organ.getOrganName(),"1");
		for(int i =0; i < filterColl.getRowCount();i++){
			EmployeeVO emp = filterColl.getEmployee(i);
			ITreeNode empNode = new TreeNode(emp.getEmployeeId(), emp.getEmployeeName(),"0");
			root.addChild(empNode);
		}
		organTree.setRoot(root);
		
		return organTree;
	}
	
	/**
	 * organIds ��,�ָ���������Ҫ��ʾ�Ĳ��ű��룬רΪPPMϵͳʹ��
	 * @param organIds
	 * @return
	 * @throws ServiceException
	 */
	public ITree getChildOrganEmpTree4PPM(String organIds) throws ServiceException{
		ITree tree =  new Tree();
		ITreeNode root = new TreeNode("om","��֯������","organtree");
		if(organIds != null){
			String[] organArry = organIds.split(",");
			for(int i=0; i < organArry.length ; i++){
				String organId = organArry[i];
				if(organId != null && !organId.trim().equals("")){
					OrganColl organColl = organDAO.getSelfAndChildren4PPM(organId);	
					EmployeeColl empColl = new EmployeeColl();
					for(int j=0; j< organColl.getRowCount();j++){
						OrganVO subOrganVO = organColl.getOrgan(j);
						EmployeeColl subEmpColl = employeeDAO.getEmployeeInfoByOrganId(subOrganVO.getOrganId());
						empColl = unionEmpColl(empColl,subEmpColl);
					}
					EmployeeColl partTimeColl = employeeDAO.getPtEmployee(organColl);
					empColl = unionEmpColl(empColl,partTimeColl);
					EmployeeColl filterColl = filterEmp( empColl );
					ITree subOrganTree = OmOrganTree.constructOrganEmpTree(organColl, filterColl);//����һ����֯����������֧
					ITreeNode subRoot = subOrganTree.getRoot();
					root.addChild(subRoot);
				}
				
			}
		}	
		tree.setRoot(root);
		return tree;
	}
	
	/**
	 * �õ���ǰ��¼��Ա������֯�����͸���֯����������Ա��Ϣ������רΪPPMϵͳʹ��
	 * @param authId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganCollByKind4PPM(String organKind,String areaId) throws ServiceException{
		OrganVO organ = organDAO.getOrganCollByKind4PPM(organKind,areaId);
		EmployeeColl employeeColl = employeeDAO.getEmployeeInfoByOrganId(organ.getOrganId());
		OrganColl organColl = new OrganColl();
		organColl.addOrgan(organ);
		EmployeeColl partTimeColl = employeeDAO.getPtEmployee(organColl);//�õ����в����ڵļ�ְ����
		EmployeeColl unionEmpColl = unionEmpColl(employeeColl, partTimeColl);
		EmployeeColl filterColl = filterEmp( unionEmpColl);	
		ITree organTree = new Tree();
		ITreeNode root = new TreeNode(organ.getOrganId(), organ.getOrganName(),"1");
		for(int i =0; i < filterColl.getRowCount();i++){
			EmployeeVO emp = filterColl.getEmployee(i);
			ITreeNode empNode = new TreeNode(emp.getEmployeeId(), emp.getEmployeeName(),"0");
			root.addChild(empNode);
		}
		organTree.setRoot(root);
		
		return organTree;
	}
}

