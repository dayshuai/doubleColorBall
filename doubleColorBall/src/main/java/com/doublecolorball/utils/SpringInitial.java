package com.doublecolorball.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.doublecolorball.quartz.QuartzInitService;

/**
 * spring容器初始化后进行的系统初始化
 * @author shi zunming
 *
 */
@Component
public class SpringInitial implements ApplicationListener<ContextRefreshedEvent> {

	private static Logger log = LoggerFactory.getLogger(SpringInitial.class);
	
	@Autowired
	private QuartzInitService quartzInitService;
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		if (event.getApplicationContext().getParent() == null) {
			try {
				log.info("初始化定时任务........");
				quartzInitService.init();
			} catch (Exception e) {
				log.error("系统初始化出现异常", e);
			}
		}
	}
}