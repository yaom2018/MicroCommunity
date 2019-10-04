
(function(vc){

    vc.extends({

        data:{
            viewVisitInfo:{
                index:0,
                flowComponent:'visit',
                needShowAddAppButton:'true',
                vName:'',
                visitGender:'',
                phoneNumber:''
            }
        },
        _initMethod:function(){
            //根据请求参数查询 查询 业主信息
            vc.component._loadAppInfoData();
        },
        _initEvent:function(){
            vc.on('viewVisitInfo','addNewVisit',function(_app){
                console.log(_app);

                vc.copyObject(_app, vc.component.viewVisitInfo);
                vc.emit('addVisitSpace','notify',vc.component.viewVisitInfo);
            });

            vc.on('viewVisitInfo', 'onIndex', function(_index){
                vc.component.viewAppInfo.index = _index;
            });


        },
        methods:{

            _openSelectAppInfoModel(){
                alert("打开查询访客模态框");
                // vc.emit('chooseApp','openChooseAppModel',{});
            },
            _openAddVisitInfoModel(){
                vc.emit('addVisit','openAddVisitAppModal',{});
                // $("#addNewVisitModel").model("show");
            },
            _loadAppInfoData:function(){

            }
        }
    });

})(window.vc);