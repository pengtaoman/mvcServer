package com.lilai.framework.web;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.AbstractHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;

public class MyConverter<T> implements HttpMessageConverter<T>{

	protected Object readInternal(Class arg0, HttpInputMessage arg1)
			throws IOException, HttpMessageNotReadableException {
		// TODO Auto-generated method stub
		System.out.println("##########  MyConverter readInternal ##########" + arg1.getBody());
		return "##########  MyConverter readInternal ##########";
	}

	protected boolean supports(Class arg0) {
		// TODO Auto-generated method stub
		System.out.println("##########  MyConverter supports ##########" + arg0.getClass().getName());
		return true;
	}

	protected void writeInternal(Object arg0, HttpOutputMessage arg1)
			throws IOException, HttpMessageNotWritableException {
		// TODO Auto-generated method stub
		System.out.println("##########  MyConverter writeInternal ##########" + arg1.getBody());
	}

	@Override
	public boolean canRead(Class arg0, MediaType arg1) {
		// TODO Auto-generated method stub
	    System.out.println("##########  MyConverter canRead ##########"+arg0.getClass().getName());
		System.out.println("##########  MyConverter canRead ##########"+arg1);
		return true;
	}

	@Override
	public boolean canWrite(Class arg0, MediaType arg1) {
		// TODO Auto-generated method stub
	    System.out.println("##########  MyConverter canWrite ##########"+arg0.getClass().getName());
		System.out.println("##########  MyConverter canWrite ##########" +arg1);
		return true;
	}

	@Override
	public List getSupportedMediaTypes() {
		// TODO Auto-generated method stub
		System.out.println("##########  MyConverter getSupportedMediaTypes ##########");

		return Collections.singletonList(MediaType.TEXT_HTML);
	}

	@Override
	public Object read(Class arg0, HttpInputMessage arg1) throws IOException,
			HttpMessageNotReadableException {
		System.out.println("##########  MyConverter read ##########");
		return "gsdfgsdfgsdfg222222222222222";
	}

	@Override
	public void write(Object arg0, MediaType arg1, HttpOutputMessage arg2)
			throws IOException, HttpMessageNotWritableException {
	    System.out.println("##########  MyConverter write ##########" + arg0.getClass().getName());
	    System.out.println("##########  MyConverter write ##########" + arg1);
	    
	    if (arg0 instanceof HashMap) {
		Map<String, String> map  = (Map<String, String>)arg0;
		for (Map.Entry<String, String> en : map.entrySet()) {
		    System.out.println("##########  MyConverter write KEY : " + en.getKey() + "  >>> Value ::" +en.getValue());
		}
	    }
		System.out.println("##########  MyConverter write ##########" + arg2.getHeaders().getContentLength());
//		byte[] b =new byte[4096];
//		 arg2.getBody().write(b);
//		System.out.println("##########  MyConverter write ##########" + new String(b));
	}}
