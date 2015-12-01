/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.taglibs.duty;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagLibraryInfo;

import org.apache.struts.taglib.bean.WriteTag;

import com.neusoft.om.bo.DutyBO;
import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.duty.OrganKindDutyColl;
import com.neusoft.om.dao.duty.OrganKindDutyVO;
import com.neusoft.om.dao.organkind.OrganKindVO;
import com.neusoft.om.omutil.OMRequestParameter;
import com.neusoft.tdframework.context.FrameAppContext;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.taglibs.BaseXMLTagLib;

/**
 * @author chenzt
 *
 * ְ������XML
 * 
 */
public class DutyTree1 extends BaseXMLTagLib{
	
	OrganKindDutyColl organKindDutyColl = null;
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.taglibs.BaseXMLTagLib#init(javax.servlet.http.HttpServletRequest)
	 */
	protected void init(HttpServletRequest request) {
		organKindDutyColl = (OrganKindDutyColl)request.getAttribute(OMRequestParameter.DUTY_TREE);		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.taglibs.BaseXMLTagLib#createTagBody()
	 */
	protected void createTagBody() throws IOException {
		//���Եķ���
		if(isDebug()) {
			test();
			return;
		}
		
		createOrganXML(organKindDutyColl);
		
	}
	
	/**
	 * ����XML,������ز���ֵ,������һ�����Ƿ��Ѿ��ر�,���true��ʾ�ر�
	 * @param organKindColl
	 * @param maxRowCount
	 * @param currentRow
	 * @param parentLevel
	 */
	private void createOrganXML(
		OrganKindDutyColl organKindColl
		)  throws IOException{
		
		for(int i=0,j=organKindColl.getRowCount();i<j;i++) {
			OrganKindDutyVO vo = organKindColl.getOrganKindDuty(i);
			int currentLevel = vo.getOrganKindLevel();

			write("<item>\n");
			writeXMLTag("itemId", "organ_" + vo.getOrganKind());
			writeXMLTag("name",vo.getKindDesc());
			writeXMLTag("level",String.valueOf(currentLevel));
			writeXMLTag("spaceWidth",String.valueOf((currentLevel-1)*12));
			writeXMLTag("organKindId",String.valueOf(vo.getOrganKind()));
			writeXMLTag("type","organ");
			
			DutyColl dutyColl = vo.getDutyColl();
			
			if(i<(j-1)) {
				OrganKindDutyVO nextVO = organKindColl.getOrganKindDuty(i+1);
				int nextLevel = nextVO.getOrganKindLevel();
				if(nextLevel > currentLevel) { //���ӽڵ�
					writeXMLTag("ifChild","1");
					write("<child>\n");
					if(dutyColl!=null)
						createDutyXML(dutyColl,currentLevel);
				}else {
					if(dutyColl!=null&&dutyColl.getRowCount()>0) {
						writeXMLTag("ifChild","1");
						write("<child>\n");
						createDutyXML(dutyColl,currentLevel);
						write("</child>\n");
					}
					else
						writeXMLTag("ifChild","0");
					
					write("</item>\n");
					if(currentLevel>nextLevel)
						for(int n=0;n<(currentLevel-nextLevel);n++) {
							write("</child>\n</item>\n");
						}
				}
			}else {  //�������һ�������
				
				if(dutyColl!=null&&dutyColl.getRowCount()>0) {
					writeXMLTag("ifChild","1");
					write("<child>\n");
					createDutyXML(dutyColl,currentLevel);
					write("</child>\n");
				}
				else
					writeXMLTag("ifChild","0");
		
				write("</item>\n");
				for(int n=0;n<(currentLevel-1);n++) {
					write("</child>\n</item>\n");
				}
			}
		}
		
		
	}
	
	//����ְ����Ϣ
	private void createDutyXML(
		DutyColl dutyColl,int organKindLevel
		)  throws IOException{
		
		for(int i=0,j=dutyColl.getRowCount();i<j;i++) {
			DutyVO vo = dutyColl.getDuty(i);
			int currentLevel = vo.getDutyLevel();

			write("<item>\n");
			writeXMLTag("itemId", "duty_" + vo.getOrganKind());
			writeXMLTag("name",vo.getDutyName());
			writeXMLTag("level",String.valueOf(currentLevel+organKindLevel));
			writeXMLTag("spaceWidth",String.valueOf((currentLevel-1+organKindLevel)*12));
			writeXMLTag("dutyId",String.valueOf(vo.getDutyId()));
			writeXMLTag("type","duty");
		
			if(i<(j-1)) {
				DutyVO nextVO = dutyColl.getDuty(i+1);
				int nextLevel = nextVO.getDutyLevel();
				if(nextLevel > currentLevel) { //���ӽڵ�
					writeXMLTag("ifChild","1");
					write("<child>\n");
				}else {
					writeXMLTag("ifChild","0");
					write("</item>\n");
					if(currentLevel>nextLevel)
						for(int n=0;n<(currentLevel-nextLevel);n++) {
							write("</child>\n</item>\n");
						}
				}
			}else {  //�������һ���ڵ������
				writeXMLTag("ifChild","0");
				write("</item>\n");
				for(int n=0;n<(currentLevel-1);n++) {
					write("</child>\n</item>\n");
				}
				
			}
		}
	
	}
	
	/**
	 * ���Է���,ֱ������XML
	 * @throws IOException
	 * @throws ServiceException
	 */
	private void test() throws IOException {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<item>												");
		buffer.append("	<itemId>organ_3001</itemId>                         ");
		buffer.append("	<name>�зֹ�˾</name>                               ");
		buffer.append("	<level>1</level>                                    ");
		buffer.append("	<spaceWidth>0</spaceWidth>                          ");
		buffer.append("	<type>organ</type>                                  ");
		buffer.append("	<ifChild>1</ifChild>                                ");
		buffer.append("	<child>                                             ");
		buffer.append("		<item>                                          ");
		buffer.append("			<itemId>duty_3001</itemId>                  ");
		buffer.append("			<name>�ܾ���</name>                         ");
		buffer.append("			<level>2</level>                            ");
		buffer.append("			<spaceWidth>12</spaceWidth>                 ");
		buffer.append("			<type>duty</type>                           ");
		buffer.append("			<ifChild>0</ifChild>                        ");
		buffer.append("		</item>                                         ");
		buffer.append("		<item>                                          ");
		buffer.append("			<itemId>organ_3100</itemId>                 ");
		buffer.append("			<name>�г���</name>                         ");
		buffer.append("			<level>2</level>                            ");
		buffer.append("			<spaceWidth>12</spaceWidth>                 ");
		buffer.append("			<type>organ</type>                          ");
		buffer.append("			<ifChild>1</ifChild>                        ");
		buffer.append("			<child>                                     ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>duty_3100</itemId>          ");
		buffer.append("					<name>���ž���</name>               ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>duty</type>                   ");
		buffer.append("					<ifChild>0</ifChild>                ");
		buffer.append("				</item>                                 ");
		buffer.append("			</child>                                    ");
		buffer.append("		</item>                                         ");
		buffer.append("		<item>                                          ");
		buffer.append("			<itemId>organ_3200</itemId>                 ");
		buffer.append("			<name>�ͷ���</name>                         ");
		buffer.append("			<level>2</level>                            ");
		buffer.append("			<spaceWidth>12</spaceWidth>                 ");
		buffer.append("			<type>organ</type>                          ");
		buffer.append("			<ifChild>1</ifChild>                        ");
		buffer.append("			<child>                                     ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>duty_3200</itemId>          ");
		buffer.append("					<name>���ž���</name>               ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>duty</type>                   ");
		buffer.append("					<ifChild>0</ifChild>                ");
		buffer.append("				</item>                                 ");
		buffer.append("			</child>                                    ");
		buffer.append("		</item>                                         ");
		buffer.append("		<item>                                          ");
		buffer.append("			<itemId>organ_3300</itemId>                 ");
		buffer.append("			<name>����ҵ��</name>                     ");
		buffer.append("			<level>2</level>                            ");
		buffer.append("			<spaceWidth>12</spaceWidth>                 ");
		buffer.append("			<type>organ</type>                          ");
		buffer.append("			<ifChild>1</ifChild>                        ");
		buffer.append("			<child>                                     ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>duty_3300</itemId>          ");
		buffer.append("					<name>���ž���</name>               ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>duty</type>                   ");
		buffer.append("					<ifChild>0</ifChild>                ");
		buffer.append("				</item>                                 ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>organ_3310</itemId>         ");
		buffer.append("					<name>����ҵ���������</name>       ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>organ</type>                  ");
		buffer.append("					<ifChild>1</ifChild>                ");
		buffer.append("					<child>                             ");
		buffer.append("						<item>                          ");
		buffer.append("							<itemId>duty_3310</itemId>  ");
		buffer.append("							<name>��������</name>       ");
		buffer.append("							<level>4</level>            ");
		buffer.append("							<spaceWidth>36</spaceWidth> ");
		buffer.append("							<type>duty</type>           ");
		buffer.append("							<ifChild>0</ifChild>        ");
		buffer.append("						</item>                         ");
		buffer.append("					</child>                            ");
		buffer.append("				</item>                                 ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>organ_3320</itemId>         ");
		buffer.append("					<name>��ҵ��չ����</name>           ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>organ</type>                  ");
		buffer.append("					<ifChild>1</ifChild>                ");
		buffer.append("					<child>                             ");
		buffer.append("						<item>                          ");
		buffer.append("							<itemId>duty_3320</itemId>  ");
		buffer.append("							<name>��������</name>       ");
		buffer.append("							<level>4</level>            ");
		buffer.append("							<spaceWidth>36</spaceWidth> ");
		buffer.append("							<type>duty</type>           ");
		buffer.append("							<ifChild>0</ifChild>        ");
		buffer.append("						</item>                         ");
		buffer.append("					</child>                            ");
		buffer.append("				</item>                                 ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>organ_3330</itemId>         ");
		buffer.append("					<name>�ͻ����ֲ�</name>             ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>organ</type>                  ");
		buffer.append("					<ifChild>1</ifChild>                ");
		buffer.append("					<child>                             ");
		buffer.append("						<item>                          ");
		buffer.append("							<itemId>duty_3330</itemId>  ");
		buffer.append("							<name>��������</name>       ");
		buffer.append("							<level>4</level>            ");
		buffer.append("							<spaceWidth>36</spaceWidth> ");
		buffer.append("							<type>duty</type>           ");
		buffer.append("							<ifChild>0</ifChild>        ");
		buffer.append("						</item>                         ");
		buffer.append("					</child>                            ");
		buffer.append("				</item>                                 ");
		buffer.append("			</child>                                    ");
		buffer.append("		</item>                                         ");
		buffer.append("		<item>                                          ");
		buffer.append("			<itemId>organ_3400</itemId>                 ");
		buffer.append("			<name>��Ϣϵͳ��</name>                     ");
		buffer.append("			<level>2</level>                            ");
		buffer.append("			<spaceWidth>12</spaceWidth>                 ");
		buffer.append("			<type>organ</type>                          ");
		buffer.append("			<ifChild>1</ifChild>                        ");
		buffer.append("			<child>                                     ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>duty_3400</itemId>          ");
		buffer.append("					<name>���ž���</name>               ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>duty</type>                   ");
		buffer.append("					<ifChild>0</ifChild>                ");
		buffer.append("				</item>                                 ");
		buffer.append("			</child>                                    ");
		buffer.append("		</item>                                         ");
		buffer.append("		<item>                                          ");
		buffer.append("			<itemId>organ_3500</itemId>                 ");
		buffer.append("			<name>�ƶ���</name>                         ");
		buffer.append("			<level>2</level>                            ");
		buffer.append("			<spaceWidth>12</spaceWidth>                 ");
		buffer.append("			<type>organ</type>                          ");
		buffer.append("			<ifChild>1</ifChild>                        ");
		buffer.append("			<child>                                     ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>duty_3500</itemId>          ");
		buffer.append("					<name>���ž���</name>               ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>duty</type>                   ");
		buffer.append("					<ifChild>0</ifChild>                ");
		buffer.append("				</item>                                 ");
		buffer.append("			</child>                                    ");
		buffer.append("		</item>                                         ");
		buffer.append("		<item>                                          ");
		buffer.append("			<itemId>organ_3600</itemId>                 ");
		buffer.append("			<name>������������粿</name>               ");
		buffer.append("			<level>2</level>                            ");
		buffer.append("			<spaceWidth>12</spaceWidth>                 ");
		buffer.append("			<type>organ</type>                          ");
		buffer.append("			<ifChild>1</ifChild>                        ");
		buffer.append("			<child>                                     ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>duty_3600</itemId>          ");
		buffer.append("					<name>���ž���</name>               ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>duty</type>                   ");
		buffer.append("					<ifChild>0</ifChild>                ");
		buffer.append("				</item>                                 ");
		buffer.append("			</child>                                    ");
		buffer.append("		</item>                                         ");
		buffer.append("	</child>                                            ");
		buffer.append("</item>                                               ");
		buffer.append("<item>                                                ");
		buffer.append("	<itemId>organ_4001</itemId>                         ");
		buffer.append("	<name>���طֹ�˾</name>                             ");
		buffer.append("	<level>1</level>                                    ");
		buffer.append("	<spaceWidth>0</spaceWidth>                          ");
		buffer.append("	<type>organ</type>                                  ");
		buffer.append("	<ifChild>1</ifChild>                                ");
		buffer.append("	<child>                                             ");
		buffer.append("		<item>                                          ");
		buffer.append("			<itemId>duty_4001</itemId>                  ");
		buffer.append("			<name> �ֹ�˾�ܾ���</name>                  ");
		buffer.append("			<level>2</level>                            ");
		buffer.append("			<spaceWidth>12</spaceWidth>                 ");
		buffer.append("			<type>duty</type>                           ");
		buffer.append("			<ifChild>0</ifChild>                        ");
		buffer.append("		</item>                                         ");
		buffer.append("		<item>                                          ");
		buffer.append("			<itemId>organ_4100</itemId>                 ");
		buffer.append("			<name>��������</name>                       ");
		buffer.append("			<level>2</level>                            ");
		buffer.append("			<spaceWidth>12</spaceWidth>                 ");
		buffer.append("			<type>organ</type>                          ");
		buffer.append("			<ifChild>1</ifChild>                        ");
		buffer.append("			<child>                                     ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>duty_4100</itemId>          ");
		buffer.append("					<name>��������</name>               ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>duty</type>                   ");
		buffer.append("					<ifChild>0</ifChild>                ");
		buffer.append("				</item>                                 ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>organ_4110</itemId>         ");
		buffer.append("					<name>��������С��</name>           ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>organ</type>                  ");
		buffer.append("					<ifChild>1</ifChild>                ");
		buffer.append("					<child>                             ");
		buffer.append("						<item>                          ");
		buffer.append("							<itemId>duty_4110</itemId>  ");
		buffer.append("							<name>�鳤</name>           ");
		buffer.append("							<level>4</level>            ");
		buffer.append("							<spaceWidth>36</spaceWidth> ");
		buffer.append("							<type>duty</type>           ");
		buffer.append("							<ifChild>1</ifChild>        ");
		buffer.append("							<child>                     ");
		buffer.append("								<item>                  ");
		buffer.append("									<itemId>duty_4110</itemId>");
		buffer.append("									<name>��Ա</name>   ");
		buffer.append("									<level>5</level>    ");
		buffer.append("									<spaceWidth>48</spaceWidth>");
		buffer.append("									<type>duty</type>   ");
		buffer.append("									<ifChild>0</ifChild>");
		buffer.append("								</item>                 ");
		buffer.append("							</child>                    ");
		buffer.append("						</item>                         ");
		buffer.append("					</child>                            ");
		buffer.append("				</item>                                 ");
		buffer.append("			</child>                                    ");
		buffer.append("		</item>                                         ");
		buffer.append("		<item>                                          ");
		buffer.append("			<itemId>organ_4200</itemId>                 ");
		buffer.append("			<name>��������</name>                       ");
		buffer.append("			<level>2</level>                            ");
		buffer.append("			<spaceWidth>12</spaceWidth>                 ");
		buffer.append("			<type>organ</type>                          ");
		buffer.append("			<ifChild>1</ifChild>                        ");
		buffer.append("			<child>                                     ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>duty_4200</itemId>          ");
		buffer.append("					<name>��������</name>               ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>duty</type>                   ");
		buffer.append("					<ifChild>0</ifChild>                ");
		buffer.append("				</item>                                 ");
		buffer.append("				<item>                                  ");
		buffer.append("					<itemId>organ_4210</itemId>         ");
		buffer.append("					<name>��������С��</name>           ");
		buffer.append("					<level>3</level>                    ");
		buffer.append("					<spaceWidth>24</spaceWidth>         ");
		buffer.append("					<type>organ</type>                  ");
		buffer.append("					<ifChild>0</ifChild>                ");
		buffer.append("				</item>                                 ");
		buffer.append("			</child>                                    ");
		buffer.append("		</item>                                         ");
		buffer.append("	</child>                                            ");
		buffer.append("</item>                                               ");
		write(buffer.toString());		
		
	}
	public static void main(String args[]) {
		DutyBO bo = (DutyBO)FrameAppContext.getBean(DutyBO.BEAN);
		try {
			OrganKindDutyColl coll = bo.getOrganKindDuty();
			//System.out.println(coll.getRowCount());
			DutyTree1 taglib = new DutyTree1();
			taglib.setVMDebug(true);
			taglib.createOrganXML(coll);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
