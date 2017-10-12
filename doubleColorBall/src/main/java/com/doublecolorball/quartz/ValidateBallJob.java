package com.doublecolorball.quartz;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.doublecolorball.service.DoublecolorballInfoService;
import com.doublecolorball.utils.SpringContextUtil;

public class ValidateBallJob implements Job{
	

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		DoublecolorballInfoService doublecolorballInfoService = SpringContextUtil.getBean("doublecolorballInfoService");
		doublecolorballInfoService.queryBallListForValid();
	}
	
	
	
	

}