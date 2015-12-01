package com.neusoft.tdframework.portal.bulletin.warnmsg.data;

import com.neusoft.common.ObjectCollection;
public class WarnMsgColl extends ObjectCollection{
    /**
     *  增加一个 FeelQueryVO 对象
    */
   public void addWarnMsgVO(WarnMsgVO vo)   {
       addElement(vo);
   }

   /**
    * 按照行号获取一个 FeelQueryVO 对象
    *  */
   public WarnMsgVO getWarnMsgVO(int index)
   {
       return (WarnMsgVO) getElement(index);
   }
}
