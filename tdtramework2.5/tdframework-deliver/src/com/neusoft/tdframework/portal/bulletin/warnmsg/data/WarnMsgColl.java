package com.neusoft.tdframework.portal.bulletin.warnmsg.data;

import com.neusoft.common.ObjectCollection;
public class WarnMsgColl extends ObjectCollection{
    /**
     *  ����һ�� FeelQueryVO ����
    */
   public void addWarnMsgVO(WarnMsgVO vo)   {
       addElement(vo);
   }

   /**
    * �����кŻ�ȡһ�� FeelQueryVO ����
    *  */
   public WarnMsgVO getWarnMsgVO(int index)
   {
       return (WarnMsgVO) getElement(index);
   }
}
