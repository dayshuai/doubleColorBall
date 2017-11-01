package com.doublecolorball.quartz;

import javax.servlet.ServletException;

import org.quartz.Scheduler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.doublecolorball.utils.SpringContextUtil;

@Component
public class QuartzInitService {
	
	private static final Logger log = LoggerFactory.getLogger(QuartzInitService.class);

	public void init() throws ServletException {
		try {
			Scheduler scheduler = (Scheduler) SpringContextUtil.getBean("quartzScheduler");
			
			QuartzHelper.addjob("validateBall", "com.doublecolorball.quartz.ValidateBallJob", "*/59 * * ? * MON-SUN", scheduler);
			QuartzHelper.addjob("spider", "com.doublecolorball.quartz.SpiderJob", "*/59 * * ? * MON-SUN", scheduler);
			
			if (!scheduler.isShutdown())
				scheduler.start();
			// --------------------------------------------
		} catch (Exception e) {
			log.error("定时任务Job使用异常:"+e.toString());
		}
	}
}
