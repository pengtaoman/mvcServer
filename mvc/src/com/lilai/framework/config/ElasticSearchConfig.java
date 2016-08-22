package com.lilai.framework.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;

@PropertySource(value = { "classpath:resource/properties/system-config.properties" })
@ImportResource("${elasticsearch.config.resource}")  
public class ElasticSearchConfig {

}
