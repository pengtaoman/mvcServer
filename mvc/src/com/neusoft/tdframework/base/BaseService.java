package com.neusoft.tdframework.base;

import org.springframework.context.support.ApplicationObjectSupport;
import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor=Exception.class)
public class BaseService extends ApplicationObjectSupport{

}
