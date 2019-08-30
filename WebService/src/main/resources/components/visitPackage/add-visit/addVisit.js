(function (vc) {

    vc.extends({
        propTypes: {
            callBackListener: vc.propTypes.string, //父组件名称
            callBackFunction: vc.propTypes.string //父组件监听方法
        },
        data: {
            addVisitInfo: {
                vId: '',
                name: '',
                visitGender: '',
                phoneNumber: '',
                ownerId: '',
                case: '',
                visit_time: '',
                departure_time: '',

            }
        },
        _initMethod: function () {

        },
        _initEvent: function () {
            vc.on('addVisit', 'openAddVisitModal', function () {
                $('#addVisitModel').modal('show');
            });
        },
        methods: {
            addVisitValidate() {
                return vc.validate.validate({
                    addVisitInfo: vc.component.addVisitInfo
                }, {
                    'addVisitInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客姓名不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,50",
                            errInfo: "访客姓名必须在2至50字符之间"
                        },
                    ],
                    'addVisitInfo.visitGender': [
                        {
                            limit: "maxLength",
                            param: "1",
                            errInfo: "请填写男或女即可"
                        },
                    ],
                    'addVisitInfo.phoneNumber': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客电话不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "11",
                            errInfo: "电话号不能超过11位！"
                        },
                    ],
                    'addVisitInfo.ownerId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "目标业主不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "目标业主信息填写错误"
                        },
                    ],
                    'addVisitInfo.case': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "来访事由不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "500",
                            errInfo: "来访事由内容不能超过500"
                        },
                    ],
                    'addVisitInfo.visit_time': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "来访时间不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "访客来访时间错误"
                        },
                    ],
                    'addVisitInfo.departure_time': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "离开时间不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "访客离开时间错误"
                        },
                    ],


                });
            },
            saveVisitInfo: function () {
                if (!vc.component.addVisitValidate()) {
                    vc.message(vc.validate.errInfo);

                    return;
                }

                vc.component.addVisitInfo.communityId = vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (vc.notNull($props.callBackListener)) {
                    vc.emit($props.callBackListener, $props.callBackFunction, vc.component.addVisitInfo);
                    $('#addVisitModel').modal('hide');
                    return;
                }

                vc.http.post(
                    'addVisit',
                    'save',
                    JSON.stringify(vc.component.addVisitInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addVisitModel').modal('hide');
                            vc.component.clearAddVisitInfo();
                            vc.emit('visitManage', 'listVisit', {});

                            return;
                        }
                        vc.message(json);

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        vc.message(errInfo);

                    });
            },
            clearAddVisitInfo: function () {
                vc.component.addVisitInfo = {
                    name: '',
                    visitGender: '',
                    phoneNumber: '',
                    ownerId: '',
                    case: '',
                    visit_time: '',
                    departure_time: '',

                };
            }
        }
    });

})(window.vc);
