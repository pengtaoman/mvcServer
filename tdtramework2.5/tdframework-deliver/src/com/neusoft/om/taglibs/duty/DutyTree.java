/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.taglibs.duty;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.duty.OrganKindDutyColl;
import com.neusoft.om.dao.duty.OrganKindDutyVO;
import com.neusoft.om.omutil.OMRequestParameter;
import com.neusoft.tdframework.web.taglibs.BaseXMLTagLib;

/**
 * @author chenzt
 *
 * 职务树的XML
 * 
 */
public class DutyTree extends BaseXMLTagLib{
	
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
		//测试的方法
		if(isDebug()) {
			test();
			return;
		}
		
		if(organKindDutyColl==null) return;
		write("<organKindDutyColl>\n");
		
		for(int i=0,j=organKindDutyColl.getRowCount();i<j;i++) {
			write("<organKind>\n");
			OrganKindDutyVO vo = organKindDutyColl.getOrganKindDuty(i);
			writeXMLTag("kindId",String.valueOf(vo.getOrganKind()));
			writeXMLTag("kindDesc",vo.getKindDesc());
			
			DutyColl dutyColl = vo.getDutyColl();
			if(dutyColl!=null) {
				String parentDutyId = null;
				for(int n=0,m=dutyColl.getRowCount();n<m;n++) {
					DutyVO duty = dutyColl.getDuty(n);
					write("<duty>\n");
					writeXMLTag("dutyId",String.valueOf(duty.getDutyId()));
					writeXMLTag("dutyName",duty.getDutyName());
					writeXMLTag("dutyLevel",String.valueOf(duty.getDutyLevel()));
					writeXMLTag("parentDutyId",parentDutyId);
					parentDutyId = String.valueOf(duty.getDutyId());
					write("</duty>\n");
				}
			}
			
			write("</organKind>\n");
		}
		
		write("</organKindDutyColl>\n");
		
	}
	
	/**
	 * 测试方法,直接生成XML
	 * @throws IOException
	 * @throws ServiceException
	 */
	private void test() throws IOException {
		StringBuffer buffer = new StringBuffer();
		buffer.append("        <organKindDutyColl>									  \n");
		buffer.append("                <organKind>                                    \n");
		buffer.append("                        <kindId>1</kindId>                     \n");
		buffer.append("                        <kindDesc>kind1</kindDesc>             \n");
		buffer.append("                        <duty>                                 \n");
		buffer.append("                                <dutyId>1</dutyId>             \n");
		buffer.append("                                <dutyName>duty_1</dutyName>    \n");
		buffer.append("                                <dutyLevel>1</dutyLevel>       \n");
		buffer.append("                                <parentDutyId/>                \n");
		buffer.append("                                <ifHaveSub>1</ifHaveSub>       \n");
		buffer.append("                        </duty>                                \n");
		buffer.append("                        <duty>                                 \n");
		buffer.append("                                <dutyId>2</dutyId>             \n");
		buffer.append("                                <dutyName>duty_2</dutyName>    \n");
		buffer.append("                                <dutyLevel>2</dutyLevel>       \n");
		buffer.append("                                <parentDutyId>1</parentDutyId> \n");
		buffer.append("                                <ifHaveSub>0</ifHaveSub>       \n");
		buffer.append("                        </duty>                                \n");
		buffer.append("                </organKind>                                   \n");
		buffer.append("                <organKind>                                    \n");
		buffer.append("                        <kindId>2</kindId>                     \n");
		buffer.append("                        <kindDesc>kind2</kindDesc>             \n");
		buffer.append("                        <duty>                                 \n");
		buffer.append("                                <dutyId>3</dutyId>             \n");
		buffer.append("                                <dutyName>duty_3</dutyName>    \n");
		buffer.append("                                <dutyLevel>1</dutyLevel>       \n");
		buffer.append("                                <parentDutyId/>                \n");
		buffer.append("                                <ifHaveSub>0</ifHaveSub>       \n");
		buffer.append("                        </duty>                                \n");
		buffer.append("                        <duty>                                 \n");
		buffer.append("                                <dutyId>4</dutyId>             \n");
		buffer.append("                                <dutyName>duty_4</dutyName>    \n");
		buffer.append("                                <dutyLevel>2</dutyLevel>       \n");
		buffer.append("                                <parentDutyId/>                \n");
		buffer.append("                                <ifHaveSub>0</ifHaveSub>       \n");
		buffer.append("                        </duty>                                \n");
		buffer.append("                        <duty>                                 \n");
		buffer.append("                                <dutyId>5</dutyId>             \n");
		buffer.append("                                <dutyName>duty_5</dutyName>    \n");
		buffer.append("                                <dutyLevel>1</dutyLevel>       \n");
		buffer.append("                                <parentDutyId/>                \n");
		buffer.append("                                <ifHaveSub>0</ifHaveSub>       \n");
		buffer.append("                        </duty>                                \n");
		buffer.append("                </organKind>                                   \n");
		buffer.append("        </organKindDutyColl>                                   \n");
		write(buffer.toString());		
		
	}
	public static void main(String args[]) {
		printTagConfig("dutyTree",DutyTree.class);
	}
}
