package com.doublecolorball.spider.pipeline;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.doublecolorball.model.DoubleColorBallInfo;
import com.doublecolorball.spider.dao.DoubleColorBallInfoDAO;

import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.pipeline.PageModelPipeline;

/**
 * @author code4crafer@gmail.com
 *         Date: 13-6-23
 *         Time: 下午8:56
 */
@Component("doubleColorBallInfoDAOPipeline")
public class DoubleColorBallInfoDAOPipeline implements PageModelPipeline<DoubleColorBallInfo> {

    @Resource
    private DoubleColorBallInfoDAO doubleColorBallInfoDAO;

    @Override
    public void process(DoubleColorBallInfo doubleColorBallInfo, Task task) {
    	handleDoubleBallEntity(doubleColorBallInfo);
    }

	private void handleDoubleBallEntity(DoubleColorBallInfo doubleColorBallInfo) {
		for (String tr : doubleColorBallInfo.getTableTr()) {
    		Document document = Jsoup.parse("<table>" + tr + "</table>");
    		Elements element = document.select("em");
    		if (CollectionUtils.isNotEmpty(element)) {
    			String openDate = document.select("td").get(0).html();
    			String openNo = document.select("td").get(1).html();
    			String nums = element.html().replace("\n", ",");
    			String saleNum = document.select("strong").get(0).html();
    			String firstGradeNum = document.select("strong").get(1).html();
    			String secondGradeNum = document.select("strong").get(2).html();
    			//一等奖个数
    			doubleColorBallInfo.setFirstGradeNum(firstGradeNum);
    			//二等奖个数
    			doubleColorBallInfo.setSecondGradeNum(secondGradeNum);
    			//金额
    			doubleColorBallInfo.setSaleNum(saleNum);
    			//开奖日期
    			doubleColorBallInfo.setOpenDate(openDate);
    			//期号
    			doubleColorBallInfo.setOpenNo(openNo);
    			//红球
    			doubleColorBallInfo.setRedNums(nums.substring(0, nums.lastIndexOf(",")));
    			//蓝球
    			doubleColorBallInfo.setBlueNum(element.get(6).html());
    			//所有号码
    			doubleColorBallInfo.setAllNums(nums);
    			//保存至数据库
    			if(doubleColorBallInfoDAO.queryOpenNoIsExists(doubleColorBallInfo) == 0){
    				doubleColorBallInfoDAO.add(doubleColorBallInfo);
    			} else {
    				doubleColorBallInfoDAO.update(doubleColorBallInfo);
    			}
			}
    	}
	}
    
    
}
