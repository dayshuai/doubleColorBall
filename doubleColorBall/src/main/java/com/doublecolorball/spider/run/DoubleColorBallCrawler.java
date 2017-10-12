package com.doublecolorball.spider.run;


import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;

import com.doublecolorball.model.DoubleColorBallInfo;
import com.doublecolorball.service.DoublecolorballInfoService;
import com.doublecolorball.spider.pipeline.DoubleColorBallInfoDAOPipeline;

import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.model.OOSpider;

/**
 * @author code4crafer@gmail.com
 *         Date: 13-6-23
 *         Time: 下午4:19
 */
@Component("doubleColorBallCrawler")
public class DoubleColorBallCrawler {

    @Qualifier("doubleColorBallInfoDAOPipeline")
    @Autowired
    private DoubleColorBallInfoDAOPipeline doubleColorBallInfoDAOPipeline;

    public void crawl(String... url) {
        OOSpider.create(Site.me()
                .setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36"),doubleColorBallInfoDAOPipeline, DoubleColorBallInfo.class)
                .addUrl(url)
                .thread(5)
                .run();
    }

    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:/spring/applicationContext*.xml");
        final DoubleColorBallCrawler doubleColorBallCrawler = applicationContext.getBean(DoubleColorBallCrawler.class);
        doubleColorBallCrawler.crawl(false);
    }
    /**
     * isAll = true 抓取全部
     * @param isAll
     */
    public void crawl(boolean isAll) { 
    	if (isAll) {
    		int allPageNo = 1;
    		try {
     			Document document = Jsoup.connect("http://kaijiang.zhcw.com/zhcw/html/ssq/list_1.html").get();
     			Element element = document.select(".pg > strong").get(0);
     			allPageNo = Integer.valueOf(element.html());
     		} catch (IOException e) {
     			e.printStackTrace();
     		}
		     String url = "http://kaijiang.zhcw.com/zhcw/html/ssq/list_@.html";
		     String [] urlArr = new String [allPageNo];
		     for(int i = 1; i <= allPageNo; i++){
		     	urlArr[i-1] = url.replaceAll("@", i+"");
		     }
             crawl(urlArr);
    	} else {
    		crawl("http://kaijiang.zhcw.com/zhcw/html/ssq/list_1.html");
    	}
    }
    
}
