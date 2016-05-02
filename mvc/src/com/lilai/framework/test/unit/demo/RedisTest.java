package com.lilai.framework.test.unit.demo;

import javax.annotation.Resource;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.lilai.framework.auth.menu.service.MenuService;
import com.lilai.framework.entity.OmMenuT;
import com.lilai.framework.test.unit.BaseUnitTest;

public class RedisTest extends BaseUnitTest {
	
	@Autowired
	private RedisTemplate<String, String> template;
	
	//@Resource(name="redisTemplate")
	//private ListOperations<String, String> listOps;

	@Test  
	public void addLink() {
		ListOperations<String, String> listOps = template.opsForList();
		
		RedisSerializer<String> serializer = new StringRedisSerializer();
//		template.setKeySerializer(serializer);
//		template.setValueSerializer(serializer);
	    
		listOps.leftPush("firstR", "aliibbbbbababbababa23232323DDDDDDDDDDD");
		//long a = listOps.rightPush("firstR", "aliibbbbbababbababa");
		//template.execute(listOps);
		//System.out.println("#################### RedisTest : : " + a);
		//listOps.pus
		
	}
}
