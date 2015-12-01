/*
 * Created on 2004-12-10
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.bo;

import com.neusoft.om.dao.dictionary.OMDictionaryDAO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author chenzt
 *
 * 权限系统数据字典的类，调用方式: <b>
 * OMDictionaryBO.instance.getGenderColl().
 * 
 * 参数类的封装在多个层面进行,调用方式也可以不同.
 * 
 */
public class OMDictionaryBO implements OMDictionaryBOInterface{
	OMDictionaryDAO dictionaryDAO = null;
	
	//性别
	private ParamObjectCollection genderColl = null;				//性别
	//教育程度
	private ParamObjectCollection educateLevelColl = null;		//教育程度
	//职位
	private ParamObjectCollection busDutyColl = null;				//职位
	//收入
	private ParamObjectCollection incomeColl = null;
	//组织机构类型
	private ParamObjectCollection organKindColl = null;	
	//婚姻状况
	private ParamObjectCollection marriageStatusColl = null;
	//所属组织机构人员信息
	private ParamObjectCollection organEmployeeColl = null;
	//所属组织机构人员信息 - channel
	private ParamObjectCollection organEmployeeCollForChnl = null;
	//职务
    private ParamObjectCollection dutyColl = null;
    //地区
    private ParamObjectCollection areaColl = null;
    //组织机构
    private ParamObjectCollection organColl = null;
    //职务
    private ParamObjectCollection dutyCollection = null;
    //职员级别
    private ParamObjectCollection personLevelColl = null;
    //操作级别
    private ParamObjectCollection operLevelColl=null;
     
	/**
     * @param dictionaryDAO
     */
	public void setDictionaryDAO(OMDictionaryDAO dictionaryDAO) {
		this.dictionaryDAO = dictionaryDAO;
	}

	/**
     * @return
     * @throws DataAccessException
     */
	public ParamObjectCollection getBusDutyColl() throws DataAccessException {
		if(busDutyColl==null) setBusDutyColl();
		return busDutyColl;
	}

	/**
     * @return
     * @throws DataAccessException
     */
	public ParamObjectCollection getEducateLevelColl() throws DataAccessException {
		if(educateLevelColl==null) setEducateLevelColl();
		return educateLevelColl;
	}

	/**
     * @return
     * @throws DataAccessException
     */
	public ParamObjectCollection getGenderColl() throws DataAccessException {
		if(genderColl==null) setGenderColl();
		return genderColl;
	}
	/**
     * @return
     * @throws DataAccessException
     */
	public ParamObjectCollection getIncomeColl() throws DataAccessException {
		if(incomeColl==null) setIncomeColl();
		return incomeColl;
	}
	/**
     * @return
     * @throws DataAccessException
     */
	public ParamObjectCollection getMarriageStatusColl() throws DataAccessException {
		if(marriageStatusColl==null) setMarriageStatusColl();
		return marriageStatusColl;
	}
	/**
     * @return
     * @throws DataAccessException
     */
	public ParamObjectCollection getOrganKindColl() throws DataAccessException {
			if(organKindColl==null) setOrganKindColl();
			return organKindColl;
		}
	/**
     * @param organId
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
	public ParamObjectCollection getOrganEmployeeColl(String organId,String employeeId) throws DataAccessException {
		setOrganEmployeeColl(organId,employeeId);
		return organEmployeeColl;
	}
    
    public ParamObjectCollection getDutyColl(String organId) throws DataAccessException {
        setDutyColl(organId);
        return dutyColl;
    }
    
    public ParamObjectCollection getDutyCollection() throws DataAccessException {
        setDutyCollection();
        return dutyCollection;
    }
    
    public ParamObjectCollection getAreaColl() throws DataAccessException {
        setAreaColl();
        return areaColl;
    }
    public ParamObjectCollection getAreaCollByAreaId(String areaId) throws DataAccessException {
        setAreaColl(areaId);
        return areaColl;
    }
    
    public ParamObjectCollection getOrganCollByAreaId(String areaId) throws DataAccessException {
        setOrganCollByAreaId(areaId);
        return organColl;
    }
    public ParamObjectCollection getPersonLevelColl() throws DataAccessException {
        setPersonLevelColl();
        return personLevelColl;
    }   
    public ParamObjectCollection getOperLevelColl() throws DataAccessException {
        setOperLevelColl();
        return operLevelColl;
    }   
	/**
     * @throws DataAccessException
     */
	public synchronized void setBusDutyColl() throws DataAccessException {
		busDutyColl = dictionaryDAO.getBusDutyColl();
	}

	/**
     * @throws DataAccessException
     */
	public synchronized void setEducateLevelColl() throws DataAccessException {
		educateLevelColl = dictionaryDAO.getEducateLevelColl();
	}

	/**
     * @throws DataAccessException
     */
	public synchronized void setGenderColl() throws DataAccessException {
		genderColl = dictionaryDAO.getGenderColl();
	}
	/**
     * @throws DataAccessException
     */
	public synchronized void setIncomeColl() throws DataAccessException {
		incomeColl = dictionaryDAO.getIncomeColl();
	}
	
	/**
     * @throws DataAccessException
     */
	public synchronized void setOrganKindColl() throws DataAccessException {
		organKindColl = dictionaryDAO.getOrganKindColl();
	}
	
	/**
     * @throws DataAccessException
     */
	public synchronized void setMarriageStatusColl() throws DataAccessException {
		marriageStatusColl = dictionaryDAO.getMarriageStatusColl();
	}
	
	/**
     * @param organId
     * @param employeeId
     * @throws DataAccessException
     */
	public synchronized void setOrganEmployeeColl(String organId,String employeeId) throws DataAccessException {
		organEmployeeColl = dictionaryDAO.getOrganEmployeeColl(organId,employeeId);
	}
    
	public synchronized void setDutyColl(String organId) throws DataAccessException{
	    dutyColl = dictionaryDAO.getDutyColl(organId);   
    }
    
    public synchronized void setDutyCollection() throws DataAccessException {
        dutyCollection = dictionaryDAO.getDutyColl();
    }
    public synchronized void setOrganCollByAreaId(String areaId) throws DataAccessException {
        organColl = dictionaryDAO.getOrganInfoByAreaId(areaId);
    }
    
    public synchronized void setAreaColl() throws DataAccessException {
        areaColl = dictionaryDAO.getAreaColl();
    }
    public synchronized void setAreaColl(String areaId) throws DataAccessException {
        areaColl = dictionaryDAO.getAreaColl(areaId);
    }
    
    
    public synchronized void setPersonLevelColl() throws DataAccessException {
        personLevelColl = dictionaryDAO.getPersonLevelColl();
    }
    public synchronized void setOperLevelColl() throws DataAccessException {
        operLevelColl = dictionaryDAO.getOperLevelColl();
    }
    /**
     * 所属机构人员列表信息 -- 渠道专用
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOrganEmployeeCollForChnl(String organId,
            String employeeId) throws DataAccessException{
		setOrganEmployeeCollForChnl (organId,employeeId);
		return organEmployeeCollForChnl;
    }
	public synchronized void setOrganEmployeeCollForChnl(String organId,String employeeId) throws DataAccessException {
		organEmployeeCollForChnl = dictionaryDAO.getOrganEmployeeCollForChnl(organId,employeeId);
	}
	/**
	 * 测试
	 * @param args
	 */
	public static void main(String args[]) {
		try {
			System.out.println(OMDictionaryBOInterface.instance.getBusDutyColl().getRowCount());
		} catch (DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
