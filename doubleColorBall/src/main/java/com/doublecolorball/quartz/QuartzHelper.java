package com.doublecolorball.quartz;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;

import javax.servlet.http.HttpServlet;

import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Quartz帮助类
 * 
 * @author hukw18431
 *
 */
public class QuartzHelper {
	private static final Logger log = LoggerFactory.getLogger(HttpServlet.class);
	private static String JOB_GROUP_NAME = "defaultgroup";
	private static String TRIGGER_GROUP_NAME = "defaulttrigger";

	public static void addjob(String jobname, String classname, String cronString, Scheduler scheduler) {
		try {
			deljob(jobname, scheduler);
			Class jobclass = Class.forName(classname);
			JobDetail job = newJob(jobclass).withIdentity(jobname, JOB_GROUP_NAME).build();
			// 构建一个触发器，规定触发的规则
			Trigger trigger = TriggerBuilder.newTrigger()// 创建一个新的TriggerBuilder来规范一个触发器
					.withIdentity(jobname + "trigger", TRIGGER_GROUP_NAME)// 给触发器起一个名字和组名
					.startNow()// 立即执行
					.withSchedule(cronSchedule(cronString)).build();// 产生触发器
			scheduler.scheduleJob(job, trigger);
			// 启动
			if (!scheduler.isShutdown())
				scheduler.start();

		} catch (Exception e) {
			log.error(e.toString());
		}
	}

	public static void deljob(String jobname, Scheduler scheduler) {
		try {
			// 停止触发器
			scheduler.pauseTrigger(new TriggerKey(jobname + "trigger", TRIGGER_GROUP_NAME));
			// 移除触发器
			scheduler.unscheduleJob(new TriggerKey(jobname + "trigger", TRIGGER_GROUP_NAME));
			// 删除任务
			scheduler.deleteJob(new JobKey(jobname, JOB_GROUP_NAME));
		} catch (Exception e) {
			log.error(e.toString());
		}
	}
}
