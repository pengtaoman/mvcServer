package com.neusoft.tdframework.message.bo;

import com.neusoft.tdframework.message.data.PromptInfoVO;
import com.neusoft.tdframework.core.BaseBO;

public interface PromptInfoBO extends BaseBO {

	/**
	 * �����ʾ��Ϣ
	 * @param promptInfoVO
	 * @return
	 * @throws OrderServiceException
	 */
	PromptInfoVO getPromptInfo(String busiCode) throws Exception;
	
	void putMessageInfoToCache() throws Exception;

}
