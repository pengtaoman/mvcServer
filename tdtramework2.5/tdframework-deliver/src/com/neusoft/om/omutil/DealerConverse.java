package com.neusoft.om.omutil;

import com.neusoft.om.dao.dealer.DealerColl;
import com.neusoft.om.dao.dealer.DealerTypeColl;
import com.neusoft.om.dao.dealer.DealerTypeVO;
import com.neusoft.om.dao.dealer.DealerVO;

public class DealerConverse {

    public static com.neusoft.om.dao.dealer.DealerColl conversetoOmDealer(com.neusoft.crm.channel.outInterface.om.data.DealerColl channelColl){
    	com.neusoft.om.dao.dealer.DealerColl dealerColl = new com.neusoft.om.dao.dealer.DealerColl();
    	if(channelColl != null){
    		for(int i=0; i < channelColl.getRowCount(); i++){
    			com.neusoft.crm.channel.outInterface.om.data.DealerVO  channelVO = channelColl.getDealerVO(i);
    			DealerVO dealerVO = new DealerVO();
    			dealerVO.setDealerId(channelVO.getDealer_id());
    			dealerVO.setDealerName(channelVO.getDealer_name());
    			dealerVO.setBelongsPart(channelVO.getBelongs_part());
    			dealerVO.setDealerType(Integer.valueOf(channelVO.getDealer_type()));
    			dealerVO.setRegionCode(channelVO.getRegion_code());
    			dealerColl.addDealerVO(dealerVO);
    		}
    	}
    	return dealerColl;
    }
    
    public static  DealerTypeColl concerseTypeColl(com.neusoft.crm.channel.outInterface.om.data.DealerTypeColl channelTypeColl){
    	DealerTypeColl typeColl = new DealerTypeColl();
    	if(channelTypeColl != null){	    		
    		for(int i=0; i< channelTypeColl.getRowCount();i++){
    			com.neusoft.crm.channel.outInterface.om.data.DealerTypeVO channelType = 
	    			channelTypeColl.getDealerTypeVO(i);
    			DealerTypeVO type = new DealerTypeVO();
    			type.setDealerType(Integer.valueOf(channelType.getDealer_type()));
    			type.setDealerTypeName(channelType.getDealer_type_name());
    			typeColl.addDealerTypeVO(type);
    		}	    		
    	}
    	return typeColl;
    }
    
    public static  DealerColl filterByName(DealerColl coll, String name){
    	DealerColl dealerColl = new DealerColl();
    	if(name == null || name.trim().equals("")){
    		dealerColl = coll; 
    	}else {
	    	if(coll != null){
	    		for(int i=0; i < coll.getRowCount(); i++){
	    			DealerVO vo = coll.getDealer(i);
	    			String dealerName = vo.getDealerName();
	    			if(dealerName.indexOf(name)>0){
	    				dealerColl.addDealerVO(vo);
	    			}
	    		}
	    	}
    	}
    	return dealerColl;
    }
}
