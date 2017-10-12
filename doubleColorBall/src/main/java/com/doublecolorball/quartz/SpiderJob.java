package com.doublecolorball.quartz;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.doublecolorball.spider.run.DoubleColorBallCrawler;
import com.doublecolorball.utils.SpringContextUtil;

public class SpiderJob implements Job{
	

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		DoubleColorBallCrawler doubleColorBallCrawler = SpringContextUtil.getBean("doubleColorBallCrawler");
		doubleColorBallCrawler.crawl(false);
	}
	
	
	
	

}