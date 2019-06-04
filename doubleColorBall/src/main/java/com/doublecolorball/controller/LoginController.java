package com.doublecolorball.controller;


import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.doublecolorball.shiro.SessionUser;
import com.doublecolorball.utils.PublicKeyMap;
import com.doublecolorball.utils.RSAUtils;
import com.doublecolorball.utils.SecurityUtil;

@Controller
@RequestMapping("/login")
public class LoginController {

	
	@ResponseBody
	@RequestMapping(value = "/getSecurityPublicKey.json")
	public PublicKeyMap getSecurityPublicKey() {
		PublicKeyMap publicKeyMap = RSAUtils.getPublicKeyMap();
		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		session.setAttribute("keyToken", publicKeyMap.getToken());
		return publicKeyMap;
	}
	
	@ResponseBody
	@RequestMapping(value = "/login.json", method = RequestMethod.POST)
	public Map<String, Object> login(ServletRequest request, String loginName, String password) {
		Map<String, Object> result = new HashMap<String, Object>();
		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		try {
			password = RSAUtils.decryptStringByJs(password);
			String md5pwd = SecurityUtil.md5Pwd(loginName, password);
			UsernamePasswordToken token = new UsernamePasswordToken(loginName, md5pwd);
			subject.login(token);
			SessionUser user = (SessionUser) subject.getPrincipal();
			setSession(user);
			uniqueSession(request, loginName, session);
		} catch (AccountException e) {
			result.put("return_code", 1);
			return result;
		} catch (AuthenticationException e) {
			result.put("return_code", 1);
			result.put("return_msg", "用户名或者密码错误");
			return result;
		} catch (Exception e) {
			result.put("return_code", 1);
			result.put("return_msg", "服务端异常, 请联系管理员！");
			return result;
		}
		result.put("return_code", 0);
		result.put("return_msg", "ok");
		return result;
	}
	@ResponseBody
	@RequestMapping(value = "/logout.htm")
	public void logout(ServletRequest request, ServletResponse response) throws Exception {
		Subject subject = SecurityUtils.getSubject();
		subject.logout();
		WebUtils.issueRedirect(request, response, "/login.htm");
	}
	
	
	
	/**
	 * 剔除旧的用户登录session
	 * @param loginName
	 * @param session
	 */
	private void uniqueSession(ServletRequest request, String loginName, Session session) {
		// 处理session
		DefaultWebSecurityManager securityManager = (DefaultWebSecurityManager) SecurityUtils.getSecurityManager();
		DefaultWebSessionManager sessionManager = (DefaultWebSessionManager) securityManager.getSessionManager();
		Collection<Session> sessions = sessionManager.getSessionDAO().getActiveSessions();
		// 获取当前已登录的用户session列表
		for (Session item : sessions) {
			// 清除该用户以前登录时保存的session
			String itemUserName = (String) item.getAttribute("username");
			if (loginName.equals(itemUserName)) {
				if (!session.getId().equals(item.getId())) {
					sessionManager.getSessionDAO().delete(item);
				}
			}
		}
		
//		XSSHttpRequestWrapper xRequest = (XSSHttpRequestWrapper) request;
//		HttpServletRequest httpRequest = (HttpServletRequest) xRequest.getRequest();
//		SessionSynchro.closeOtherServer(httpRequest.getContextPath(), loginName, session.getId().toString());
	}
	protected void setSession(SessionUser user) {
		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		session.setAttribute("user_id", user.getId()); // 基础框架使用用户id
		session.setAttribute("username", user.getUsername());
		session.setAttribute("nickName", user.getNickname());
	}
	
}
