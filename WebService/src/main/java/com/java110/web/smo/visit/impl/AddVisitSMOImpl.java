package com.java110.web.smo.visit.impl;

import com.alibaba.fastjson.JSONObject;
import com.java110.common.constant.PrivilegeCodeConstant;
import com.java110.common.constant.ServiceConstant;
import com.java110.common.util.Assert;
import com.java110.web.smo.visit.IAddVisitSMO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.java110.core.context.IPageData;
import com.java110.web.core.AbstractComponentSMO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

/**
 * 添加小区服务实现类
 * 这个类有点意思，这个类可以说是Java继承的完美应用，首先继承一个接口就是IAddVisitSMO，实现了接口中的方法
 * 其次继承了一个抽象类，实现了两个抽象方法，而父类的方法中又调用了这两个抽象方法，这样实现了代码的灵活性
 * 当你调用父类方法的时候其实就是调用你自己实现的方法
 * add by wuxw 2019-06-30
 */
@Service("addVisitSMOImpl")
public class AddVisitSMOImpl extends AbstractComponentSMO implements IAddVisitSMO {

    @Autowired
    private RestTemplate restTemplate;  //可以理解为执行http方法的必要条件，spring封装，这个玩意时spring boot里自带的

    @Override
    protected void validate(IPageData pd, JSONObject paramIn) {

        //super.validatePageInfo(pd);

        //Assert.hasKeyAndValue(paramIn, "xxx", "xxx");
        Assert.hasKeyAndValue(paramIn, "name", "必填，请填写访客姓名");
        Assert.hasKeyAndValue(paramIn, "phoneNumber", "必填，请填写访客电话");
        Assert.hasKeyAndValue(paramIn, "ownerId", "必填，请填写目标业主信息");
        Assert.hasKeyAndValue(paramIn, "case", "可填，请填写访客来访事由");
        Assert.hasKeyAndValue(paramIn, "visit_time", "必填，请填写访客来访时间");
        Assert.hasKeyAndValue(paramIn, "departure_time", "必填，请填写访客离开时间");


        super.checkUserHasPrivilege(pd, restTemplate, PrivilegeCodeConstant.AGENT_HAS_LIST_VISIT); //权限检查

    }

    @Override
    protected ResponseEntity<String> doBusinessProcess(IPageData pd, JSONObject paramIn) {
        ResponseEntity<String> responseEntity = null;
        super.validateStoreStaffCommunityRelationship(pd, restTemplate);

        responseEntity = this.callCenterService(restTemplate, pd, paramIn.toJSONString(),
                ServiceConstant.SERVICE_API_URL + "/api/visit.saveVisit",
                HttpMethod.POST);
        return responseEntity;
    }

    @Override
    public ResponseEntity<String> saveVisit(IPageData pd) {
        return super.businessProcess(pd);
    }

    public RestTemplate getRestTemplate() {
        return restTemplate;
    }

    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
}
