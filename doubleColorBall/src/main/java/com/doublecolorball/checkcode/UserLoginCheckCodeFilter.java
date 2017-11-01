package com.doublecolorball.checkcode;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.code.kaptcha.Constants;

/**
 * 用户登录，验证码拦截器
 */
public class UserLoginCheckCodeFilter implements Filter {

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;
		String check_code = (String) request.getParameter("check_code");
		Object kaptchaCode = request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
		if (check_code.equals(kaptchaCode)) {
			chain.doFilter(request, response);
		} else {
			/*String json = "{\"return_code\":1,\"return_msg\":\"验证码错误，请重新输入!\"}";
			response.setHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			response.getWriter().write(json);*/
			chain.doFilter(request, response);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

	@Override
	public void destroy() {

	}
}
