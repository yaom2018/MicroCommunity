package com.java110.web.controller;

import com.java110.common.constant.CommonConstant;
import com.java110.common.exception.SMOException;
import com.java110.common.factory.ApplicationContextFactory;
import com.java110.common.util.Assert;
import com.java110.core.base.controller.BaseController;
import com.java110.core.context.IPageData;
import com.java110.web.smo.impl.LoginServiceSMOImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;


/**
 * 组件调用处理类
 * 这个指的是在页面中需要做某些操作的时候通过反射的方式去调用对应的Java类去处理
 */
@RestController
public class CallComponentController extends BaseController {

    private final static Logger logger = LoggerFactory.getLogger(CallComponentController.class);

    /**
     * 调用组件方法
     *  路径参数后面两个参数分别就是对应Java类和该类中对应的方法
     * @return
     */

    @RequestMapping(path = "/callComponent/{componentCode}/{componentMethod}")
    public ResponseEntity<String> callComponent(
            @PathVariable String componentCode,
            @PathVariable String componentMethod,
            //@RequestBody String info,
            HttpServletRequest request) {
        ResponseEntity<String> responseEntity = null;
        try {
            Assert.hasLength(componentCode, "参数错误，未传入组件编码");
            Assert.hasLength(componentMethod, "参数错误，未传入调用组件方法");

            Object componentInstance = ApplicationContextFactory.getBean(componentCode); //通过类名找到对应注册在spring的Javabean

            Assert.notNull(componentInstance, "未找到组件对应的处理类，请确认 " + componentCode);

            Method cMethod = componentInstance.getClass().getDeclaredMethod(componentMethod, IPageData.class); //再通过方法名找到对应的Java中的方法，此处约定每个方法中的参数类型是一样的都是IPageData；返回值是一个方法对象

            Assert.notNull(cMethod, "未找到组件对应处理类的方法，请确认 " + componentCode + "方法：" + componentMethod);

            IPageData pd = (IPageData) request.getAttribute(CommonConstant.CONTEXT_PAGE_DATA);  //获得页面数据对象

            logger.debug("组件编码{}，组件方法{}，pd 为{}", componentCode, componentMethod, pd.toString());

            responseEntity = (ResponseEntity<String>) cMethod.invoke(componentInstance, pd);    //执行方法invoke方法中的两个参数为拥有该方法的对象和方法中的参数

        } catch (SMOException e) {
            MultiValueMap<String, String> headers = new HttpHeaders();
            headers.add("code", e.getResult().getCode());
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            String msg = "";
            if (e instanceof InvocationTargetException) {
                Throwable targetEx = ((InvocationTargetException) e).getTargetException();
                if (targetEx != null) {
                    msg = targetEx.getMessage();
                }
            } else {
                msg = e.getMessage();
            }
            responseEntity = new ResponseEntity<>(msg, HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            logger.debug("组件调用返回信息为{}", responseEntity);
            return responseEntity;
        }
    }


}
