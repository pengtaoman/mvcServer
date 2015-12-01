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
 * Ȩ��ϵͳ�����ֵ���࣬���÷�ʽ: <b>
 * OMDictionaryBO.instance.getGenderColl().
 * 
 * ������ķ�װ�ڶ���������,���÷�ʽҲ���Բ�ͬ.
 * 
 */
public class OMDictionaryBO implements OMDictionaryBOInterface{
	OMDictionaryDAO dictionaryDAO = null;
	
	//�Ա�
	private ParamObjectCollection genderColl = null;				//�Ա�
	//�����̶�
	private ParamObjectCollection educateLevelColl = null;		//�����̶�
	//ְλ
	private ParamObjectCollection busDutyColl = null;				//ְλ
	//����
	private ParamObjectCollection incomeColl = null;
	//��֯��������
	private ParamObjectCollection organKindColl = null;	
	//����״��
	private ParamObjectCollection marriageStatusColl = null;
	//������֯������Ա��Ϣ
	private ParamObjectCollection organEmployeeColl = null;
	//������֯������Ա��Ϣ - channel
	private ParamObjectCollection organEmployeeCollForChnl = null;
	//ְ��
    private ParamObjectCollection dutyColl = null;
    //����
    private ParamObjectCollection areaColl = null;
    //��֯����
    private ParamObjectCollection organColl = null;
    //ְ��
    private ParamObjectCollection dutyCollection = null;
    //ְԱ����
    private ParamObjectCollection personLevelColl = null;
    //��������
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
     * ����������Ա�б���Ϣ -- ����ר��
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
	 * ����
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
