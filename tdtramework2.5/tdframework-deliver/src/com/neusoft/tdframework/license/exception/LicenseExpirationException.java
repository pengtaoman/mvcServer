package com.neusoft.tdframework.license.exception;

import org.springframework.core.NestedCheckedException;

import com.neusoft.tdframework.exception.BaseUncheckedException;

public class LicenseExpirationException extends BaseUncheckedException{
	public LicenseExpirationException(String msg){
		  super(msg);
	}
}
