package com.java110.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * Created by wuxw on 2017/7/25.
 */
@Component
@ConfigurationProperties(prefix = "java110.utils")
@PropertySource("classpath:config/utils.properties")
public class CommonProperties {
}
