package com.doublecolorball.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.doublecolorball.model.UserSsq;
import com.doublecolorball.service.DoublecolorballInfoService;
import com.doublecolorball.service.UserSsqService;

@Controller
@RequestMapping("/")
public class DoublecolorballInfoController{ 

	/** 日志管理 */
    private static final Logger logger = LoggerFactory.getLogger(DoublecolorballInfoController.class);
	
	/** 双色球管理 */
    @Autowired
	private DoublecolorballInfoService doublecolorballInfoService;
    @Autowired
    private UserSsqService userSsqService;
    
    @RequestMapping("list")
    public String showArticle(@RequestParam(value="pageIndex", defaultValue="1")int pageIndex, ModelMap model){
        model.addAttribute("mainPage", "layout/content/doubleColorBall/list.vm");
        model.addAttribute("doubleColorBalls",doublecolorballInfoService.findAll(pageIndex, 20));
        return "index";
    }
    
    
    @RequestMapping("buyPage")
    public String buyPage(ModelMap model){
        model.addAttribute("mainPage", "layout/content/doubleColorBall/buyPage.vm");
        return "index";
    }
    
    @ResponseBody
    @RequestMapping(value="addSsq.json",method=RequestMethod.POST)
    public Map<String, Object> addSsq(UserSsq userSsq, ModelMap modelMap){
    	Map<String, Object> returnMap = new HashMap<String, Object>();
    	userSsqService.insertSelective(userSsq);
    	returnMap.put("returnCode", "1");
    	return returnMap;
    }
}
