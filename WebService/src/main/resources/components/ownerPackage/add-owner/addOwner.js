(function(vc){

    vc.extends({
        propTypes: {
               notifyLoadDataComponentName:vc.propTypes.string,
               componentTitle:vc.propTypes.string // 组件名称
        },
        data:{
            addOwnerInfo:{
                componentTitle:$props.componentTitle,
                name:'',
                age:'',
                link:'',
                sex:'',
                remark:'',
                ownerId:'',
                ownerPhoto:'',
                videoPlaying:false
            }
        },
         _initMethod:function(){

         },
         _initEvent:function(){
            vc.on('addOwner','openAddOwnerModal',function(_ownerId){
                if(_ownerId != null || _ownerId != -1){
                    vc.component.addOwnerInfo.ownerId = _ownerId;
                }
                $('#addOwnerModel').modal('show');
                vc.component._initAddOwnerMedia();
            });
        },
        methods:{
            addOwnerValidate:function(){
                return vc.validate.validate({
                    addOwnerInfo:vc.component.addOwnerInfo
                },{
                    'addOwnerInfo.name':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"名称不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,10",
                            errInfo:"名称长度必须在2位至10位"
                        },
                    ],
                    'addOwnerInfo.age':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"年龄不能为空"
                        },
                        {
                            limit:"num",
                            param:"",
                            errInfo:"年龄不是有效的数字"
                        },
                    ],
                    'addOwnerInfo.sex':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"性别不能为空"
                        }
                    ],
                    'addOwnerInfo.link':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"手机号不能为空"
                        },
                        {
                            limit:"phone",
                            param:"",
                            errInfo:"不是有效的手机号"
                        }
                    ],
                    'addOwnerInfo.remark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },
            saveOwnerInfo:function(){
                if(!vc.component.addOwnerValidate()){
                    vc.message(vc.validate.errInfo);

                    return ;
                }

                vc.component.addOwnerInfo.communityId = vc.getCurrentCommunity().communityId;
                vc.http.post(
                    'addOwner',
                    'saveOwner',
                    JSON.stringify(vc.component.addOwnerInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addOwnerModel').modal('hide');
                            vc.component.clearAddOwnerInfo();
                            vc.emit($props.notifyLoadDataComponentName,'listOwnerData',{});

                            return ;
                        }
                        vc.message(json);

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        vc.message(errInfo);

                     });
            },
            clearAddOwnerInfo:function(){
                vc.component.addOwnerInfo = {
                                            name:'',
                                            age:'',
                                            link:'',
                                            sex:'',
                                            remark:''
                                        };
            },
            _addUserMedia:function() {
                return navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia || null;
            },
            _initAddOwnerMedia:function () {
                if(vc.component._addUserMedia()){
                    vc.component.addOwnerInfo.videoPlaying = false;
                    var constraints = {
                        video: true,
                        audio: false
                    };
                    var video = document.getElementById('ownerPhoto');
                    var media = navigator.getUserMedia(constraints, function (stream) {
                        var url = window.URL || window.webkitURL;
                        //video.src = url ? url.createObjectURL(stream) : stream;
                        try {
                            video.src = url ? url.createObjectURL(stream) : stream;
                        } catch (error) {
                            video.srcObject = stream;
                        }
                        video.play();
                        vc.component.addOwnerInfo.videoPlaying = true;
                    }, function (error) {
                        console.log("ERROR");
                        console.log(error);
                    });
                }else{
                    console.log("初始化视频失败");
                }
            },
            _takePhoto:function () {
                if (vc.component.addOwnerInfo.videoPlaying) {
                    var canvas = document.getElementById('canvas');
                    var video = document.getElementById('ownerPhoto');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0);
                    var data = canvas.toDataURL('image/webp');
                    vc.component.addOwnerInfo.ownerPhoto = data;
                    //document.getElementById('photo').setAttribute('src', data);
                }
            }
        }
    });

})(window.vc);