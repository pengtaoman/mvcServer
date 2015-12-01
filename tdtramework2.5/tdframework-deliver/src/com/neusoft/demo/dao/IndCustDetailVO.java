package com.neusoft.demo.dao;




public class IndCustDetailVO {
	private String partCity=""; //���б���(����)
	private long customerId; //�ͻ����
	private String custName=""; //�ͻ����
	private int serviceKind; //ҵ������
	private String serviceId=""; //ҵ�����
	private int ifValid; //�Ƿ���Ч��1.��Ч0.��Ч
	private long subscriberId; //ʹ���߱��

	private String custPartCity=""; //���б���(����)
	private int partCustId; //�ͻ����ĩλ(����)
	//�ͻ���š��������Ϊ�ͻ����ͣ�1λ��1.���ˣ�2.��λ�������1λ��1.�й��½��2.��۵���3.���ŵ���4.̨�����5.�����Ҽ���������
	private long custCustomerId;
	private String custCustName=""; //�ͻ����
	private int coreHigh;//���ĸ߶˻�Ա
	private int coreHighs;//���ĸ߶˻�Ա��
	
	private int hcustType;//��Ա����
	private int hcustKind;//��Ա���
	private String hcustKindStr="";//��Ա������
	private int hcustGrade;//��Ա�ȼ�
	private String hcustGradeStr="";//��Ա�ȼ����
	private int hcustStatus;//��Ա״̬
	private String retainDate="";//ĩ�ΰݷ�ʱ��
	
	private String groupName="";//���������
	private String custMgr="";//������
	private String custMgrs="";//�����?
	private String careCustName="";//ʹ���ߵĿͻ����
	private String impMon="";//��Ҫ����-��
	private String impDay="";//��Ҫ����-��
	private String page="";//��ʾҳ��
	private String srvStatus;//ҵ��״̬
	private int areaLevel;//����Ա���� 1 ȫ�� 2 ʡ�� 3 ���� 4 �鳤 5��ͨ������
	private String areaId="";//�������
	private int flag;//����Ƿ�ѡ�������
	private long serviceNo;//�ͻ����
	/**άϵ��������*/
	private int careCustType;
	
	private String channelName="";
	
	/**
		����ҵ��״̬
	*/
	public void setSrvStatus(String in) {
		this.srvStatus = in;
	}
	/**
		��ȡҵ��״̬
	*/
	public String getSrvStatus() {
		return (this.srvStatus);
	}
	/**
		���÷����?
	*/
	public void setCustMgrs(String in) {
		this.custMgrs = in;
	}
	/**
		��ȡ�����?
	*/
	public String getCustMgrs() {
		return (this.custMgrs);
	}

	/**
		������ʾҳ��
	*/
	public void setPage(String in) {
		this.page = in;
	}
	/**
		��ȡ��ʾҳ��
	*/
	public String getPage() {
		return (this.page);
	}

	/**
		������Ҫ����-��
	*/
	public void setImpDay(String in) {
		this.impDay = in;
	}
	/**
		��ȡ��Ҫ����-��
	*/
	public String getImpDay() {
		return (this.impDay);
	}
	

	/**
		������Ҫ����-��
	*/
	public void setImpMon(String in) {
		this.impMon = in;
	}
	/**
		��ȡ��Ҫ����-��
	*/
	public String getImpMon() {
		return (this.impMon);
	}
	
	/**
		����ʹ���ߵĿͻ����
	*/
	public void setCareCustName(String in) {
		this.careCustName = in;
	}
	/**
		��ȡʹ���ߵĿͻ����
	*/
	public String getCareCustName() {
		return (this.careCustName);
	}
	
	/**
		���÷�����
	*/
	public void setCustMgr(String in) {
		this.custMgr = in;
	}
	/**
		��ȡ������
	*/
	public String getCustMgr() {
		return (this.custMgr);
	}
	
	/**
		�������������
	*/
	public void setGroupName(String in) {
		this.groupName = in;
	}
	/**
		��ȡ���������
	*/
	public String getGroupName() {
		return (this.groupName);
	}

	/**
		�յĹ��췽��
	*/
	public IndCustDetailVO() {

	}
	/**
		ͨ������ֵ����һ�����
	*/
	public IndCustDetailVO(
		String partCity,
		long customerId,
		String custName,
		int serviceKind,
		String serviceId,
		int ifValid,
		long subscriberId,
		String custPartCity,
		int partCustId,
		long custCustomerId,
		int coreHigh,
		String custCustName) {

	}
	/**
		ͨ��һ�����ж�����һ�����
	*/
	public IndCustDetailVO(IndCustDetailVO other) {
		if (this != other) {
			this.partCity = other.partCity;
			this.customerId = other.customerId;
			this.custName = other.custName;
			this.serviceKind = other.serviceKind;
			this.serviceId = other.serviceId;
			this.ifValid = other.ifValid;
			this.subscriberId = other.subscriberId;

			this.custPartCity = other.custPartCity;
			this.partCustId = other.partCustId;
			this.custCustomerId = other.custCustomerId;
			this.custCustName = other.custCustName;
			this.coreHigh=other.coreHigh;
		}
	}

	/**
		���ó��б���(����)
	*/
	public void setPartCity(String partCity) {
		this.partCity = partCity;
	}
	/**
		��ȡ���б���(����)
	*/
	public String getPartCity() {
		return (this.partCity);
	}
	/**
		���ÿͻ����
	*/
	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}
	/**
		��ȡ�ͻ����
	*/
	public long getCustomerId() {
		return (this.customerId);
	}
	/**
		���ÿͻ����
	*/
	public void setCustName(String custName) {
		this.custName = custName;
	}
	/**
		��ȡ�ͻ����
	*/
	public String getCustName() {
		return (this.custName);
	}
	/**
		����ҵ������
	*/
	public void setServiceKind(int serviceKind) {
		this.serviceKind = serviceKind;
	}
	/**
		��ȡҵ������
	*/
	public int getServiceKind() {
		return (this.serviceKind);
	}
	/**
		����ҵ�����
	*/
	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}
	/**
		��ȡҵ�����
	*/
	public String getServiceId() {
		return (this.serviceId);
	}
	/**
		�����Ƿ���Ч��1.��Ч0.��Ч
	*/
	public void setIfValid(int ifValid) {
		this.ifValid = ifValid;
	}
	/**
		��ȡ�Ƿ���Ч��1.��Ч0.��Ч
	*/
	public int getIfValid() {
		return (this.ifValid);
	}
	/**
		����ʹ���߱��
	*/
	public void setSubscriberId(long subscriberId) {
		this.subscriberId = subscriberId;
	}
	/**
		��ȡʹ���߱��
	*/
	public long getSubscriberId() {
		return (this.subscriberId);
	}

	//*******************************************************************

	/**
		�� cm_customer_t ���ó��б���(����)
	*/
	public void setCustPartCity(String custPartCity) {
		this.custPartCity = custPartCity;
	}
	/**
		�� cm_customer_t ��ȡ���б���(����)
	*/
	public String getCustPartCity() {
		return (this.custPartCity);
	}
	/**
		���ÿͻ����ĩλ(����)
	*/
	public void setPartCustId(int partCustId) {
		this.partCustId = partCustId;
	}
	/**
		��ȡ�ͻ����ĩλ(����)
	*/
	public int getPartCustId() {
		return (this.partCustId);
	}
	/**
		�� cm_customer_t ���ÿͻ���š��������Ϊ�ͻ����ͣ�1λ��1.���ˣ�2.��λ�������1λ��1.�й��½��2.��۵���3.���ŵ���4.̨�����5.�����Ҽ���������
	*/
	public void setCustCustomerId(long custCustomerId) {
		this.custCustomerId = custCustomerId;
	}
	/**
		�� cm_customer_t ��ȡ�ͻ���š��������Ϊ�ͻ����ͣ�1λ��1.���ˣ�2.��λ�������1λ��1.�й��½��2.��۵���3.���ŵ���4.̨�����5.�����Ҽ���������
	���⣺�ͻ�������Ƿ�Ҫ����ʡ�ݣ�����
	*/
	public long getCustCustomerId() {
		return (this.custCustomerId);
	}
	/**
		�� cm_customer_t ���ÿͻ����
	*/
	public void setCustCustName(String custCustName) {
		this.custCustName = custCustName;
	}
	/**
		�� cm_customer_t ��ȡ�ͻ����
	*/
	public String getCustCustName() {
		return (this.custCustName);
	}
	//*******************************************************************


	/**
		��ȡ��Ա����
	*/
	public int getHcustType() {
		return (this.hcustType);
	}
	/**
		���û�Ա����
	*/
	public void setHcustType(int in) {
		this.hcustType = in;
	}
	/**
		��ȡ��Ա���
	*/
	public int getHcustKind() {
		return (this.hcustKind);
	}
	/**
		���û�Ա���
	*/
	public void setHcustKind(int in) {
		this.hcustKind = in;
	}	
	/**
	 	��ȡ��Ա������
	*/
	public String getHcustKindStr() {
		return (this.hcustKindStr);
	}
	/**
	 	���û�Ա������
    	*/
	public void setHcustKindStr(String in) {
		this.hcustKindStr = in;
	}
	/**
	 	��ݴ�ͻ�����ID����ͻ����ID��ȡ��ͻ�������
    	*/
	public void setHcustKindStr(int hcustType,int hcustKind) 
	{
//		this.hcustKindStr = RetainUtil.getHcustKindName(hcustType,hcustKind);
	}	
	/**
		��ȡ��Ա�ȼ�
	*/
	public int getHcustGrade() {
		return (this.hcustGrade);
	}
	/**
		���û�Ա�ȼ�
	*/
	public void setHcustGrade(int in) {
		this.hcustGrade = in;
	}
	
	/**
		��ȡ��Ա�ȼ����
	*/
	public String getHcustGradeStr() {
		return (this.hcustGradeStr);
	}
	/**
		���û�Ա�ȼ����
	*/
	public void setHcustGradeStr(String in) {
		this.hcustGradeStr = in;
	}
	/**
		��ݴ�ͻ�����ID����ͻ����ID����ͻ��ȼ�ID��ȡ��ͻ��ȼ����
	*/
	public void setHcustGradeStr(int hcustType,int hcustKind,int hcustGrade) {
//		this.hcustGradeStr = RetainUtil.getHcustGradeName(hcustType,hcustKind,hcustGrade);
	}	
	
	/**
		��ȡ��Ա״̬
	*/
	public int getHcustStatus() {
		return (this.hcustStatus);
	}
	/**
		���û�Ա״̬
	*/
	public void setHcustStatus(int in) {
		this.hcustStatus = in;
	}
	/**
		��ȡĩ�ΰݷ�ʱ��
	*/
	public String getRetainDate() {
		return (this.retainDate);
	}
	/**
		����ĩ�ΰݷ�ʱ��
	*/
	public void setRetainDate(String in) {
		this.retainDate = in;
	}
	/**
	 * ��ȡ����Ա����
	 */
	public int getAreaLevel() {
		return areaLevel;
	}

	/**
	 * ���ù���Ա����
	 */
	public void setAreaLevel(int string) {
		areaLevel = string;
	}
	
	/**
	 * ��ȡ���б���
	 */
	public String getAreaId() {
		return areaId;
	}

	/**
	 * ���õ��б���
	 */
	public void setAreaId(String string) {
		areaId = string;
	}
	
	/**
	 * ��ȡ��־�Ƿ�ѡ�������
	 */
	public int getFlag() {
		return flag;
	}

	/**
	 * ���ñ�־�Ƿ�ѡ�������
	 */
	public void setFlag(int i) {
		flag = i;
	}

	/**
	 * ��ȡάϵ��������
	 * @return
	 */
	public int getCareCustType() {
		return careCustType;
	}

	/**
	 * ����άϵ��������
	 * @param i
	 */
	public void setCareCustType(int i) {
		careCustType = i;
	}
	/**
	 * ��ȡ���ĸ߶˻�Ա��ʾ
	 * @return
	 */
	public int getCoreHigh() {
		return coreHigh;
	}

	/**
	 * ���ú��ĸ߶˻�Ա��ʾ
	 * @param i
	 */
	public void setCoreHigh(int i) {
		coreHigh = i;
	}
	
	public long getServiceNo() {
		return serviceNo;
	}
	public void setServiceNo(long serviceNo) {
		this.serviceNo = serviceNo;
	}
	public int getCoreHighs() {
		return coreHighs;
	}
	public void setCoreHighs(int coreHighs) {
		this.coreHighs = coreHighs;
	}
	public String getChannelName() {
		return channelName;
	}
	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}

}