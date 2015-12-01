
package com.neusoft.tdframework.message.dao;

import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.message.data.PromptInfoVO;

public interface PromptInfoDAO {
	
	PromptInfoVO getPromptInfo(String busiCode) throws DataAccessException;
	
	Map<String, PromptInfoVO> preCacheMessageInfo() throws DataAccessException;
}