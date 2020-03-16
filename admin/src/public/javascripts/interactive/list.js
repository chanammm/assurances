
if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    window.onload = function (params) {
        for (let i = 0; i < document.getElementsByClassName('el-dialog').length; i++) {
            document.getElementsByClassName('el-dialog')[i].style.width = '100%';  //iframe 里面的class 
        }
        for (let i = 0; i < document.getElementsByClassName('w400').length; i++) {
            document.getElementsByClassName('w400')[i].style.width = '100%'; //限定的表单宽度
        }
    }
}

window.addEventListener('pageshow', function (params) {
    let par = params.target.URL.split('*').length > 1 ? params.target.URL.split('*')[0] : params.target.URL;
    const [
        $,
        token,
        u,
        uri
    ] = [
            parent.all.jq,
            parent.all.json,
            // parent.document.getElementById('tagHref').getAttribute('src').replace('..', '/manage').split('?')[0],
            '/manage' + par.substring(par.lastIndexOf('/'), par.lastIndexOf('?') == -1 ? par.length : par.lastIndexOf('?')),
            document.getElementById('c-container-list').getAttribute('data-uri'),
        ];
    var _data = {
        id: ym.init.COMPILESTR.decrypt(token.id),
        token: ym.init.COMPILESTR.decrypt(token.asset),
        url: u
    };
    new Vue({
        el: '#c-container-list',
        data: () => {
            return {
                fileUpdata: (process.env.NODE_ENV == "development" ? parent.all.json._j.URLS.Development_Files_ : parent.all.json._j.URLS.ForMal_Files_) + 'picture_file_upload',
                fileUpdataExc: (process.env.NODE_ENV == "development" ? parent.all.json._j.URLS.Development_Server_ : parent.all.json._j.URLS.Development_Server_) + 'import_machine_by_excel',
                fileUpdataExcData: {
                    Authorization: JSON.parse(sessionStorage.getItem('token')).asset.secret
                },
                loading: false,
                testAdmin: ym.init.COMPILESTR.decrypt(JSON.parse(sessionStorage.getItem('_a'))._i) == "yuanmenghhx" || ym.init.COMPILESTR.decrypt(JSON.parse(sessionStorage.getItem('_a'))._i) == "yuanmengKSX" ? false : true,  //指定的账号不能显示订单查看
                more: false,
                tableData: [],
                UnFormData: [],
                UnTableFormData:[],
                currentPage: 1,
                pageSize: 20,
                page: 1,
                total: 0,
                formData: {},
                SearchTableAndVisible: false,
                UpdateTableAndVisible: false,
                detailTableAndVisible: false,
                TableAndVisible: false,
                dialogVisible: false,
                adoptModule: false,
                errorExe: false,
                dialogImageUrl: '',
                fileList: [],
                data: {},
                num: 1,
                listSearch: {
                },  //新的列表查询对象
                SearchTableFormData: {
                    realName: '',
                    workCount: '',
                    auditCount: '',
                    indexCount: '',
                    income: '',
                    loginTime: '',
                    loginIp: '',
                    registerIp: '',
                    classifyName: '',  //零件
                    parentId: '',
                    parentName: '',
                    sort: '',
                    level: '',
                    remark: '',
                    id: ''
                },
                imageList:{
                    machinePic: []
                },
                fileData:{
                    
                },
                pickerOptions: {  //时间节点
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近半年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                select_user: '', //用户列表的批量操作
                user_type: 1,  //用户类型
                statues: {
                    user: false,
                    flow: false,
                    state: false,
                    ount: false
                }, // 状态的显示/f
                overdueTime: '',
                grantCount: '',
                ount: '',  //赠送抽奖次数
                user_state: 1,
                order: {},
                refundMoney: {},  //订单退款
                pathUrlExe: {}, //导出
                optionsTime: [], //时间选择
                bool: '',
                StatusName: new Map([
                    ['free', {
                        user: new Map([
                            [1, '超级管理员'],
                            [2, '系统管理员'],
                            [3, '商户管理员']
                        ]),
                        statues: new Map([
                            [0, '冻结'],
                            [1, '正常']
                        ]),
                        machineType: new Map([
                            [1, '大型柜式机'],
                            [2, '小型桌面机'],
                            [3, '无网单机']
                        ])
                    }],
                    ['time', {
                        machineRun: new Map([
                            [1, '正常'],
                            [2, '故障'],
                            [3, '离线'],
                            [4, '维护'],
                            [5, '维修'],
                            [6, '维修完成']
                        ]),
                        couponTime: new Map([
                            [1, '年'],
                            [2, '月'],
                            [3, '日'],
                            [4, '周'],
                            [5, '小时']
                        ])
                    }]
                ]),
                miniTurnableMore: true,  //小程序大转盘添加按钮是否显示
                appointmentPay: {}, //预约详情
                objectId: '', //开通会员的查询 会员id
                objectIds: [], //开通会员的查询 会员id
                pageparams: {},  // 预存的页面搜索参数
                countPages: 1, // 无限滚动的 page
            }
        },
        created: function () {
            this.list();
            window.is = this;
        },
        methods: {
            IError(err) {
                setTimeout(() => {
                    this.loading = false;
                    if (err == `未登录或身份验证过时`) {
                        // window.top.location.href = `../login.htm?hash:[]`;
                        parent.location.href = `../login.htm?hash:[nK6t7a]`;
                    }
                }, 1000);
                this.$message.error('事务提醒：' + err);
            },
            ISuccessfull(e) {
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
                this.$message({
                    message: '事务提醒：,' + e,
                    type: 'success'
                });
            },
            handleSizeChange(e) {
                this.pageSize = e;
                this.list(this.pageparams ? this.pageparams : null, true);
            },
            handleCurrentChange(e) {
                this.page = e;
                this.list(this.pageparams ? this.pageparams : null, true);
            },
            list(params = {}, bool) {
                let _data_ = {}, it = this, xml = [];
                if (params) {
                    it.pageparams = params; //保存搜索条件
                    params._name_ ? params[params._name_] = params._value_ : null;
                }
                it.loading = true;
                params['page'] = !bool ? (() => {
                    it.currentPage = 1;
                    return it.currentPage
                })() : it.page;
                params['pageSize'] = 20;
                _data_ = qs.stringify(params);
                axios.post(uri, _data_).then(params => {
                    let xml = [], data = params.data;
                    data.page.total ? it.total = parseInt(data.page.total) : null;
                    // data.page.pages ? it.currentPage= parseInt(data.page.pages) : null;
                    if(data.state == 200){
                        if(uri == 'page_permission_tree'){
                            data.list.forEach((element, index) => {
                                if (element.lowers) {
                                    element['hasChildren'] = true;
                                    element['children'] = element.lowers;
                                }
                                xml.push(element);
                            })
                        }else{
                            xml = data.page.records;
                        }
                    }else{
                        is.IError(is.data.msg);
                        is.loading = false;
                    }
                    it.tableData = xml;
                    setTimeout(() => {
                        it.loading = false;
                    }, 1000);
                })
            },
            crud(arg) {
                window.parent.document.getElementById('tagHref').setAttribute('src', `../${arg.uri}.html?[hash]${arg.enitId ? '*' + encodeURI(JSON.stringify(arg.enitId)) : ''}`); // 编辑带参数
            },
            loadTree(tree, treeNode, resolve) {   //树结构表格
                setTimeout(() => {
                    resolve(tree.children);
                }, 500)
            },
            //新增 权限
            assets(params) {
                is.loading = true;
                params.parentId ? params.parentId : params['parentId'] = -1;
                params.permissionWeight == 1 ? params.requestUri = -1 : null;
                axios.post('create_permission', qs.stringify(params)).then(params => {
                    is.data = params.data;
                    if (is.data.state == 200) {
                        is.ISuccessfull(is.data.msg);
                        is.list();
                        is.UpdateTableAndVisible = false;
                    } else {
                        is.IError(is.data.msg);
                    }
                    setTimeout(() => {
                        is.loading = false;
                    }, 1000);
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            //查看 角色已赋予 权限
            serchAssetes(params) {
                axios.post('role_page_permission', qs.stringify({
                    roleId: params
                })).then(res => {
                    if (res.data.state == 200) {
                        is.detailTableAndVisible = true;
                        is.UnFormData = res.data.list;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            //查看 所有 权限 树结构
            serchAssetesAll(params) {
                axios.post('page_permission_tree').then(res => {
                    if (res.data.state == 200) {
                        is.TableAndVisible = true;
                        is.UnTableFormData = res.data.list;
                        res.data.list.forEach((element, index) => {
                            params.forEach((els) => {
                                if(els.permissionId == element.permissionId){
                                    it.$nextTick(function () {
                                        is.tableChecked(index);  //每次更新了数据，触发这个函数即可。
                                    });
                                }
                            })
                            
                        })
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            //提交绑定
            bindingAction(params) {
                axios.get('set_permission_role', {
                    params: {
                        permissionId: params.permissionId, roleId: params.adminId
                    }
                }).then(params => {
                    is.data = params.data;
                    if (is.data.state == 200) {
                        is.ISuccessfull(is.data.msg);
                        is.detailTableAndVisible = false;
                    } else {
                        is.IError(is.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            handleSelectionChange(val) {  //下拉选项
                this.multipleSelection = val;
                this.productCount = val.length;
                if (uri == 'manage_prodcut_list_list') return false;   //阻止继续渲染清单的操作
                this.productId = [];
                this.adIds = [];
                this.machineNumber = [];
                this.adminIds = [];
                this.userMode = [];
                val.forEach(e => {
                    this.productId.push(e.productId || [])
                    this.machineNumber.push(e.machineNumber || [])  //机器编号数组
                    this.adminIds.push(e.adminId || [])
                    this.adIds.push(e.madId || [])
                    e.userId != "无" ? this.userIdts.push(e.userId) : null;
                    this.userMode.push(e || []); //批量操作用户类型
                });
            },

            tableChecked(e) {  //表格打勾已选择回显 
                this.$refs.multipleTable.toggleRowSelection(this.tableData[e], true);
            },


            //查看客户详细
            customerDest(params){
                axios.get('machine_client_detail', {
                    params: {
                        clientId: params
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        is.SearchTableAndVisible = true;
                        is.SearchTableFormData = res.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //新增设备
            machine(params){
                //create_machine
                //is.data.machinePic
                document.querySelectorAll('#machine>div>div>div>input').forEach((element, index) => {
                    console.log(element);
                })
                
                params['machinePic'] = is.data.machinePic;
                params['exWarehouseTime'] = ym.init.getDateTime(params.exWarehouseTime).split(' ')[0];
                axios.post('create_machine', qs.stringify(params)).then(res => {
                    if (res.data.state == 200) {
                        is.UpdateTableAndVisible = false;
                        is.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //查看设备详细
            machineDest(params, timer = null){
                axios.get('sys_machine_detail', {
                    params: {
                        machineId: params
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        is.SearchTableAndVisible = true;
                        if(res.data.data.status == 1){
                           is.adoptModule = true; 
                        }else{
                            is.adoptModule = false; 
                        }
                        // Object.keys(res.data.data).forEach((element, index))
                        is.SearchTableFormData = res.data.data;
                        timer = setTimeout(() => {
                            if(res.data.data.auditStatus == 2){
                                document.getElementById('adopt-error').style.display = 'block';
                                document.getElementById('adopt').style.display = 'none';
                            }else{
                                document.getElementById('adopt-error').style.display = 'none';
                                document.getElementById('adopt').style.display = 'block';
                            }
                            timer = null;
                        }, 0)
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            //审核 工单
            adopt(params, bool){
                axios.get('audit_machine', {
                    params: {
                        auditResult: +bool + 1,
                        machineId: params.machineId
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        is.SearchTableAndVisible = false;
                        is.ISuccessfull(res.data.msg);
                        is.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            //上传EX
            ExecSceneSuccess(file){
                if(file.state == 200){
                    this.data['Execfile'] = file.data.failFilePath;
                    if(file.data.fail > 0){
                        is.errorExe = true;
                        is.fileList = [];
                        is.$nextTick(function () {
                            document.getElementById('ahrefDownload').onclick = function(){
                                parent.window.open(file.data.failFilePath,'_blank');
                            };
                        });
                        return false;
                    }
                    this.ISuccessfull('上传成功！');
                }else{
                    is.IError(file.msg);
                }
            },
            exeLength(error){
                is.IError('文件上传超出处理限制个数');
            },































            filterTag(value, row) {
                return row.machineType === value;
            },
            tableChecked(e) {
                this.$refs.multipleTable.toggleRowSelection(this.UpdateTableFormData[e], true);
            },
            searchAPIs(_v) {  //查找API
                const it = this;
                switch (_v._uri) {
                    case 'manage_machine_product_relation':  //清单的绑定解绑
                        if (_v._type == 4) {  //针对料仓配置绑定的机器查询
                            _data['adminId'] = _v._id;
                            delete _data['page']
                            delete _data['listId']
                            delete _data['type']
                            delete _data['machineNumber']
                            ym.init.XML({
                                method: 'GET',
                                uri: token._j.URLS.Development_Server_ + 'find_admin_machine',  //查询绑定关系
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    it.UnFormData = [];
                                    res.data.forEach(_params_ => {
                                        it.UnFormData.push({
                                            machineNumber: _params_.machineNumber,
                                            listName: _params_.listName,
                                            machineType: it.StatusName.get('free').machineType.get(_params_.machineType),
                                        })
                                    })
                                }
                            });
                            return false;
                        }
                        _v._type.forEach(e => {
                            if (e == 6) e = 4;  //暂时解决产品清单绑定问题
                            _data['type'] = e;
                            _data['adminId'] = _v._id || '';
                            _data['listId'] = _v._listid || '';
                            _data['machineNumber'] = this.machineNumber || [];
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + _v._uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            console.log(res)
                                            switch (e) {
                                                case 1:
                                                    it.listIds = [];
                                                    res.productListList.forEach(data => {
                                                        it.listIds.push({
                                                            value: data.listId,
                                                            label: data.listName
                                                        });
                                                    })
                                                    break;
                                                case 2:
                                                    it.adminIds = [];
                                                    res.userList.forEach(data => {
                                                        it.adminIds.push({
                                                            value: data.adminId,
                                                            label: data.adminName
                                                        });
                                                    })
                                                    break;
                                                case 3:
                                                    it.UnFormData = [];
                                                    for (let i = 0; i < res.machineNumberList.length; i++) {
                                                        it.UnFormData.push({
                                                            listId: res.machineNumberList[i].listId,
                                                            listName: res.machineNumberList[i].listName,
                                                            machineNumber: res.machineNumberList[i].machineNumber,
                                                            machineType: res.machineNumberList[i].machineType
                                                        })
                                                    }
                                                    break;
                                                default:
                                                    it.ISuccessfull(res.statusCode.msg);
                                                    it.detailTableAndVisible = false;
                                                    break;
                                            }
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                        })
                        break;
                    case 'get_machine_number_arr':  //绑定推送/解绑 
                        _data['name'] = '';  //处理name 缓存
                        this.userIds = [];  //处理name 缓存
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + _v._uri,
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                res.list.forEach(e => {
                                    _data['machineNumber'] = e;
                                    ym.init.XML({
                                        method: 'GET',
                                        uri: token._j.URLS.Development_Server_ + 'statistics_user_list',  //查询绑定关系
                                        async: false,
                                        xmldata: _data,
                                        done: function (res) {
                                            let uname = "无", uid = "无";
                                            res.statusCode.status != '4444' ? res.userList.forEach(arr => {
                                                uname = arr.nickName;
                                                uid = arr.userId;
                                            }) : null;
                                            it.UnFormData.push({
                                                machineNumber: e,
                                                userName: uname,
                                                userId: uid
                                            });
                                        }
                                    })
                                })
                            }
                        })
                        break;
                    case 'manage_advertisement_list_relation':  //广告视频清单
                        _v._type.forEach(e => {
                            _data['type'] = e;
                            _data['adminId'] = it.adminIds || [];
                            _data['listId'] = _v._listid || '';
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + _v._uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            switch (e) {
                                                case 1:
                                                    it.listIds = [];
                                                    res.advertisementListList.forEach(data => {
                                                        it.listIds.push({
                                                            value: data.listId,
                                                            label: data.listName
                                                        });
                                                    })
                                                    break;
                                                case 2:
                                                    it.UnFormData = [];
                                                    res.userList.forEach(data => {
                                                        it.UnFormData.push({
                                                            adminId: data.adminId,
                                                            adListId: data.adListId,
                                                            listName: data.listName,
                                                            adminName: data.adminName
                                                        });
                                                    })
                                                    break;
                                                default:
                                                    it.ISuccessfull(res.statusCode.msg);
                                                    it.detailTableAndVisible = false;
                                                    break;
                                            }
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                        })
                        break;
                    case 'find_user_milliliter_log':  //用户列表的毫升数日志
                        delete _data['type']
                        _data['userId'] = _v._id;
                        _data['page'] = 1;
                        _data['start'] = '';
                        _data['end'] = '';
                        ym.init.XML({
                            method: 'GET',
                            uri: token._j.URLS.Development_Server_ + 'find_user_milliliter_log',  //查询绑定关系
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                if (res.statusCode.status != 6666) return false;
                                res.logList.forEach(e => {
                                    it.TableFormData.push({
                                        logId: e.logId,
                                        userId: e.userId,
                                        userName: e.userName,
                                        createTime: e.createTime,
                                        milliliterChange: e.milliliterChange,
                                        stateComment: e.stateComment
                                    })
                                })
                            }
                        })
                        break;
                    case 'find_user_couponList':  //用户列表的毫升数日志
                        _data['userId'] = _v._id;
                        _data['page'] = 1;
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + 'find_user_couponList',  //查询绑定关系
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                res.logList.forEach(e => {
                                    it.TableFormData.push({
                                        logId: e.logId,
                                        userId: e.userId,
                                        userName: e.userName,
                                        createTime: e.createTime,
                                        milliliterChange: e.milliliterChange,
                                        stateComment: e.stateComment
                                    })
                                })
                            }
                        })
                        break;
                    default:
                        break
                }
            },
            querySearchAsync(queryString, cb) {  //动态查询用户
                const it = this;
                _data['type'] = 1;
                _data['name'] = queryString || '拉';
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'find_user_for_bind',  //查询绑定关系
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        let _arr = [];
                        res.list ? res.list.forEach(e => {
                            _arr.push({
                                value: e.nickName,
                                _id: e.userId
                            })
                        }) : it.IError(res.statusCode.msg)
                        it.UnFormData = res.list; //用户批量操作
                        var results = queryString ? _arr.filter(it.createStateFilter(queryString)) : _arr;
                        clearTimeout(it.timeout);
                        it.timeout = setTimeout(() => {
                            cb(results);
                        }, 3000 * Math.random());
                    }
                })

            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {  //取得选择的用户ID
                this.userIds = item._id;
                //this.UserTableData.push(item); //用户批量操作
            },
            bindUser(e) {  //执行绑定/解绑
                const it = this;
                switch (e._uri) {
                    case 'client_user_list':
                        e._session != '' ? null : it.IError('缺少参数！');
                        let _sess = JSON.parse(e._session);
                        switch (_sess._uri) {
                            case 'manage_client_user':
                                _data['userType'] = it.user_type;  //用户类型
                                _data['type'] = _sess._type;  //用户
                                it.userMode.forEach(_evnt => {
                                    _data['userId'] = _evnt.userId;
                                    _data['nickName'] = _evnt.nickName;
                                    ym.init.XML({
                                        method: 'POST',
                                        uri: token._j.URLS.Development_Server_ + _sess._uri,
                                        async: false,
                                        xmldata: _data,
                                        done: function (res) {
                                            it.detailTableAndVisible = false;
                                            it.ISuccessfull(res.statusCode.msg);
                                        }
                                    })
                                })
                                delete _data['userType']
                                delete _data['userId']
                                delete _data['nickName']
                                it.list(); //刷新列表
                                break;
                            case 'grant_compensate_milliliter': //补偿流量
                                //grant_compensate_milliliter
                                _data['grantCount'] = it.grantCount;
                                _data['overdueTime'] = it.overdueTime;
                                _data['type'] = _sess._type;  //用户
                                it.userMode.forEach(_evnt => {
                                    _data['userId'] = _evnt.userId;
                                    _data['nickName'] = _evnt.nickName;
                                    ym.init.XML({
                                        method: 'GET',
                                        uri: token._j.URLS.Development_Server_ + _sess._uri,
                                        async: false,
                                        xmldata: _data,
                                        done: function (res) {
                                            it.detailTableAndVisible = false;
                                            it.ISuccessfull(res.statusCode.msg);
                                        }
                                    })
                                })
                                delete _data['grantCount']
                                delete _data['overdueTime']
                                it.list(); //刷新列表
                                break;
                            case 'grant_sys_user_draw_chance': //小程序大转盘 赠送抽奖次数
                                _data['grantCount'] = it.ount;
                                it.userMode.forEach(_evnt => {
                                    _data['userId'] = _evnt.userId;
                                    ym.init.XML({
                                        method: 'GET',
                                        uri: token._j.URLS.Development_Server_ + _sess._uri,
                                        async: false,
                                        xmldata: _data,
                                        done: function (res) {
                                            it.detailTableAndVisible = false;
                                            it.ISuccessfull(res.statusCode.msg);
                                        }
                                    })
                                })
                                delete _data['grantCount']
                                delete _data['name']
                                delete _data['userId']
                                it.list(); //刷新列表
                                break;
                            case 'dredge_member': //后台开通会员
                                _data['memberRuleId'] = it.objectId;
                                it.userMode.forEach(_evnt => {
                                    _data['userId'] = _evnt.userId;
                                    ym.init.XML({
                                        method: 'GET',
                                        uri: token._j.URLS.Development_Server_ + _sess._uri,
                                        async: false,
                                        xmldata: _data,
                                        done: function (res) {
                                            it.detailTableAndVisible = false;
                                            it.ISuccessfull(res.statusCode.msg);
                                        }
                                    })
                                })
                                delete _data['memberRuleId']
                                delete _data['userId']
                                it.list(); //刷新列表
                                break;
                            default:  //赠送抽奖次数 （1.0版本赠送）
                                _data['grantCount'] = it.ount;
                                it.userMode.forEach(_evnt => {
                                    _data['userId'] = _evnt.userId;
                                    ym.init.XML({
                                        method: 'POST',
                                        uri: token._j.URLS.Development_Server_ + _sess._uri,
                                        async: false,
                                        xmldata: _data,
                                        done: function (res) {
                                            it.detailTableAndVisible = false;
                                            it.ISuccessfull(res.statusCode.msg);
                                        }
                                    })
                                })
                                delete _data['grantCount']
                                break;
                        }
                        break;
                    case 'batch_free_user':
                        _data['type'] = 2;
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + 'batch_free_user',
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                it.detailTableAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                            }
                        })
                        break;
                    default:
                        _data['machineNumber'] = this.machineNumber;
                        _data['type'] = e._type;
                        _data['userIds'] = (e._id ? this.userIdts : this.userIds);
                        ym.init.XML({
                            method: 'GET',
                            uri: token._j.URLS.Development_Server_ + e._uri,
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                it.detailTableAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                            }
                        })
                        break;
                }
            },
            machineLog(e) {
                const it = this;
                delete _data['page'];
                _data['type'] = 5;
                _data['machineNumber'] = e.enitId.machineNumber;
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'manage_machine',
                    async: true,
                    xmldata: _data,
                    done: function (res) {
                        res.machineFaultList.forEach(arr => {
                            it.machineLogs.push({
                                i: ym.init.getDateTime(arr.faultTime),
                                t: arr.faultContent
                            })
                        })
                    }
                })
            },
            fileChange(e) { //上传结构
                _data['type'] = 4;
                _data['mUpdateVersion'] = this.formData.mUpdateVersion;
            },
            filemadUrlChange(e) {
                _data['type'] = 9;
            },
            fileExceed() {
                this.IError('只允许单个上传')
            },
            machineSceneSuccess(e) {
                is.data['machinePic'] = e.data.path;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {  //点击查看放大的时候
                this.dialogVisible = true;
                this.dialogImageUrl = file.url;
            },
            machineVersion(_idata) {
                const it = this;
                _data['type'] = _idata._type;
                _data['machineType'] = _idata._machineType;
                _data['mUpdateVersion'] = _idata._d.mUpdateVersion;
                _data['versionCode'] = _idata._d.versionCode;
                _data['mUpdateDes'] = _idata._d.mUpdateDes;
                _data['mUpdateUrl'] = this.formData.mUpdateUrl;
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + _idata._uri,
                    async: true,
                    xmldata: _data,
                    done: function (res) {
                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                            it.ISuccessfull(res.statusCode.msg);
                            it.detailTableAndVisible = false;
                            it.list();
                        })() :
                            it.IError(res.statusCode.msg);
                    }
                })
            },
            deleteData(_del) {  //删除操作
                const it = this;
                switch (_del._uri) {
                    case "manage_poi":
                        _data['poiIds'] = _del._delete.poiId
                        _data['type'] = _del._type
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + _del._uri,
                            async: true,
                            xmldata: _data,
                            done: function (res) {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    it.list();
                                })() :
                                    it.IError(res.statusCode.msg);
                            }
                        })
                        break;
                    case 'manage_machine_advertisement':
                        _data['madId'] = _del._parameter
                        _data['type'] = _del._type
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + _del._uri,
                            async: true,
                            xmldata: _data,
                            done: function (res) {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    it.list();
                                })() :
                                    it.IError(res.statusCode.msg);
                            }
                        })
                        break;
                    case 'manage_coupon':
                        _data['couponId'] = _del._parameter
                        _data['type'] = _del._type
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + _del._uri,
                            async: true,
                            xmldata: _data,
                            done: function (res) {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    it.list();
                                })() :
                                    it.IError(res.statusCode.msg);
                            }
                        })
                        break;
                    default:
                        break;
                }
            },
            addEventData(_event) {  //添加视频广告///优惠券赠送
                const it = this;
                switch (_event._uri) {
                    case 'manage_machine_advertisement':
                        _data['madOrder'] = _event._parameter.madOrder;
                        _data['madTitle'] = _event._parameter.madTitle;
                        _data['madUrl'] = _event._parameter.madUrl;
                        _data['type'] = _event._type;
                        if (it.formData.madId) {
                            _data['madId'] = it.formData.madId;
                            _data['type'] = 4;
                        };
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + _event._uri,
                            async: true,
                            xmldata: _data,
                            done: function (res) {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    it.adevtmodel = false;
                                    it.list();
                                })() :
                                    it.IError(res.statusCode.msg);
                            }
                        })
                        break;
                    case 'manage_coupon':  //赠送优惠券
                        _data['grantCount'] = _event._parameter;
                        _data['couponId'] = it.unbinadmin.couponId;
                        _data['userId'] = [];
                        it.userMode.forEach(e => {
                            _data['userId'].push(e.userId);  //用户ID
                        })
                        _data['type'] = _event._type;
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + _event._uri,
                            async: true,
                            xmldata: _data,
                            done: function (res) {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    it.detailTableAndVisible = false;
                                    delete _data['name']
                                    delete _data['grantCount']
                                    delete _data['couponId']
                                    delete _data['userId']
                                    it.list();
                                })() :
                                    it.IError(res.statusCode.msg);
                            }
                        })
                        break;
                    default:
                        break;
                }
            },
            enitEventData(_event) {
                const it = this;
                switch (_event._uri) {
                    case 'manage_machine_advertisement':
                        if (!_event.hasOwnProperty('_status')) {
                            _data['madId'] = _event._parameter
                            _data['type'] = _event._type
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + _event._uri,
                                async: true,
                                xmldata: _data,
                                done: function (res) {
                                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                        it.imageList.madUrl = []; // 先清空视频地址列表
                                        it.ISuccessfull(res.statusCode.msg);
                                        it.formData.madTitle = res.machineAdvertisementInfo.madTitle
                                        it.formData.madUrl = res.machineAdvertisementInfo.madUrl
                                        it.formData.madOrder = res.machineAdvertisementInfo.madOrder
                                        it.formData.madId = res.machineAdvertisementInfo.madId
                                        it.imageList.madUrl.push({ name: 'madUrl', url: res.machineAdvertisementInfo.madUrl })
                                    })() :
                                        it.IError(res.statusCode.msg);
                                }
                            })
                        } else { //madStatus
                            _data['madId'] = _event._parameter
                            _data['type'] = _event._type
                            _data['madStatus'] = +!_event._status
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + _event._uri,
                                async: true,
                                xmldata: _data,
                                done: function (res) {
                                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                        delete _data['madId'];
                                        delete _data['madStatus'];
                                        it.list()
                                    })() :
                                        it.IError(res.statusCode.msg);
                                }
                            })
                        }
                        break;
                    default:
                        break;
                }
            },
            userSelect(_event) {  //用户批量操作
                _event = JSON.parse(_event);
                const it = this;
                switch (_event._uri) {
                    case 'manage_client_user':
                        if (_event._type == 2) {   //更改用户类型 
                            it.statues.user = true;
                            it.statues.state = false;
                            it.statues.flow = false;
                            it.statues.ount = false;
                            it.statues.objectId = false;
                        } else {  //更改用户状态
                            it.statues.user = false;
                            it.statues.state = true;
                            it.statues.flow = false;
                            it.statues.ount = false;
                            it.statues.objectId = false;
                        }
                        break;
                    case 'grant_compensate_milliliter':  //更改用户毫升数
                        it.statues.user = false;
                        it.statues.state = false;
                        it.statues.flow = true;
                        it.statues.ount = false;
                        it.statues.objectId = false;
                        break;
                    case 'dredge_member':  //后台开通会员-- 查询会员
                        it.statues.user = false;
                        it.statues.state = false;
                        it.statues.flow = false;
                        it.statues.ount = false;
                        it.statues.objectId = true;
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + 'get_member_list',
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                try {
                                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                        setTimeout(() => {
                                            it.objectIds = [];
                                            res.memberRuleList.forEach((key, index) => {
                                                it.objectIds.push({
                                                    memberRuleId: key.memberRuleId,
                                                    memberRuleName: `ID：${key.memberRuleId}   名称：${key.memberRuleName}`
                                                })
                                            })
                                        }, 500);
                                    })() : (() => {
                                        throw "收集到错误：\n\n" + res.statusCode.msg;
                                    })();
                                } catch (error) {
                                    it.IError(error);
                                }
                            }
                        })
                        break;
                    default:  //赠送抽奖次数
                        it.statues.user = false;
                        it.statues.state = false;
                        it.statues.ount = true;
                        it.statues.flow = false;
                        it.statues.objectId = false;
                        break;
                }
            },
            statusVip(e) { // 更改会员状态
                const it = this;
                _data['memberId'] = e;
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'change_member_status',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                it.list();
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },
            orderDetail(e) {  //订单详情
                const it = this;
                _data['orderId'] = e;
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'order_detail',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.order = {};
                                it.order.orderId = res.detail.orderId
                                it.order.userId = res.detail.userId
                                it.order.nickName = res.detail.nickName
                                it.order.headPicUrl = res.detail.headPicUrl
                                it.order.machineNumber = res.detail.machineNumber
                                it.order.machineType = res.detail.machineType
                                it.order.adminId = res.detail.adminId
                                it.order.adminName = res.detail.adminName

                                it.order.paymentType = res.detail.paymentType
                                it.order.spendingMoney = res.detail.spendingMoney
                                it.order.paymentMoney = res.detail.paymentMoney
                                it.order.productId = res.detail.productId
                                it.order.productName = res.detail.productName
                                it.order.flavorShow = JSON.stringify(res.detail.flavorShow)
                                it.order.couponName = res.detail.couponName
                                it.order.consumptionType = res.detail.consumptionType

                                it.order.orderStatus = res.detail.orderStatus
                                it.order.redeemCode = res.detail.redeemCode
                                it.order.paymentTime = res.detail.paymentTime
                                it.order.createTime = res.detail.createTime
                                it.order.orderType = res.detail.orderType
                                it.order.refundId = res.detail.refundId
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },
            refundMoneyNum(_event) { //order_refund  订单退款
                const it = this;
                it.loading = true;
                _data['orderId'] = _event.orderId;
                _data['refundLimit'] = parseFloat(_event.payNum * 100).toFixed(0) || 0;
                _data['milliliterLimit'] = _event.milliliterLimit || '';
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'order_refund',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                it.InputAndVisible = false;
                                setTimeout(() => {
                                    it.loading = false;
                                    it.list();
                                }, 500)
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },
            exportOrder(_event) { // 订单导出 excel
                const it = this;
                it.loading = true
                _data['name'] = JSON.stringify({
                    machineNumber: _event.machineNumber || '',
                    adminName: _event.adminName || '',
                    productName: _event.productName || '',
                    couponName: _event.couponName || ''
                });
                _data['consumptionType'] = _event.consumptionType || '';
                _data['orderStatus'] = _event.orderStatus || '';
                _data['startTime'] = it.optionsTime[0] || '';
                _data['endTime'] = it.optionsTime[1] || '';
                _data['orderLine'] = _event.orderLine || '';
                _data['sort'] = _event.sort || '';
                _data['orderType'] = _event.orderType || '';
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_order_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                setTimeout(() => {
                                    it.loading = false;
                                }, 500)
                                location.href = token._j.URLS.Development_Server_ + res.path;
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },
            exportPushOrder(_event) { // 资金管理导出 excel
                const it = this;
                it.loading = true
                _data['orderId'] = _event.consumptionType || '';
                _data['machineNumber'] = _event.orderStatus || '';
                _data['startTime'] = it.optionsTime[0] || '';
                _data['endTime'] = it.optionsTime[1] || '';
                _data['adminName'] = _event.orderLine || '';
                _data['userId'] = _event.sort || '';
                _data['orderType'] = _event.orderType || '';
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_order_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                setTimeout(() => {
                                    it.loading = false;
                                }, 500)
                                location.href = token._j.URLS.Development_Server_ + res.path;
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },
            getTime(_event) {   //时间区间
                this.optionsTime[0] = ym.init.getDateTime(_event[0]);
                this.optionsTime[1] = ym.init.getDateTime(_event[1]);
            },
            submit(_event, _type = 'POST') {
                const it = this;
                if (_event.en == 'pull') {  //编辑
                    if (_event.d) {
                        _data['maintainerId'] = _event.d;
                        _type = 'GET';
                    } else {
                        if (_event.unbinadmin.secc) {  //执行不同的操作
                            _data['operaType'] = 2
                            _data['operaVal'] = _event.unbinadmin.secc
                        } else if (_event.unbinadmin.bindMachine) {
                            _data['operaType'] = 5
                            _data['operaVal'] = _event.unbinadmin.bindMachine
                        } else {
                            _data['operaType'] = 4
                            _data['operaVal'] = it.userIds;
                        }
                    }
                } else {   //添加
                    _data['maintainerName'] = _event.formData.maintainerName || '';
                    _data['maintainerPhone'] = _event.formData.maintainerPhone || '';
                    _data['password'] = _event.formData.password || '';
                    _data['userId'] = it.userIds;
                }
                ym.init.XML({
                    method: _type,
                    uri: token._j.URLS.Development_Server_ + _event.uri,
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                if (_event.en == 'pull' && _event.d) {
                                    it.unbinadmin.maintainerName = res.maintainer.maintainerName;
                                    it.unbinadmin.maintainerPhone = res.maintainer.maintainerPhone;
                                    // it.unbinadmin.secc = res.maintainer.maintainerStatus;
                                    it.unbinadmin.bindMachine = (res.maintainer.bindMachine == -1 ? '' : res.maintainer.bindMachine);
                                    it.unbinadmin.state = (res.maintainer.nickName != '无' ? res.maintainer.nickName : '');
                                    it.userIds = res.maintainer.userId;
                                } else {
                                    it.ISuccessfull(res.statusCode.msg);
                                    delete _data['name']
                                    setTimeout(() => {
                                        it.TableAndVisible = false;
                                        it.detailTableAndVisible = false;
                                        it.loading = false;
                                    }, 500)
                                    it.list();
                                }
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },
            adminSubmit(_event) {  //超级管理员
                const it = this;
                if (_event.en == "pull") {
                    _data['type'] = 1;
                    _data['toAdminId'] = _event._d;
                } else {
                    _data['type'] = 5;
                    if (it.bool != '') {
                        delete _data['toAdminId']
                        delete _data['page']
                        _data['adminToken'] = it.bool.adminToken
                        _data['type'] = 6
                        _data['registerTime'] = it.bool.registerTime
                        _data['manageId'] = it.bool.manageId
                        _data['adminStatus'] = it.bool.adminStatus
                        _data['adminId'] = it.bool.adminId
                    };
                    _data['adminName'] = _event.formData.adminName;
                    _data['adminPwd'] = _event.formData.adminPwd;
                    _data['roleId'] = _event.formData.roleId;
                    _data['realName'] = _event.formData.realName;
                    _data['adminMobile'] = _event.formData.adminMobile;
                    _data['userId'] = it.userIds;
                    _data['named'] = _event.formData.named;
                }
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + _event.uri,
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                if (_event.en == 'pull' && _event._d) {
                                    it.formData.adminName = res.adminUser.adminName;
                                    it.formData.adminPwd = res.adminUser.adminPwd;
                                    it.formData.roleId = res.adminUser.roleId;
                                    it.formData.realName = res.adminUser.realName;
                                    it.formData.adminMobile = res.adminUser.adminMobile;
                                    it.formData.named = res.adminUser.named;
                                    it.formData.state = (res.adminUser.nickName != '无' ? res.adminUser.nickName : '');
                                    it.userIds = (res.adminUser.userId != -1 ? res.adminUser.userId : []);
                                    it.bool = {
                                        adminToken: res.adminUser.adminToken || '',
                                        registerTime: ym.init.getDateTime(res.adminUser.registerTime) || '',
                                        manageId: res.adminUser.manageId || '',
                                        adminStatus: res.adminUser.adminStatus || '',
                                        adminId: res.adminUser.adminId
                                    };
                                } else {
                                    it.ISuccessfull(res.statusCode.msg);
                                    delete _data['roleId']
                                    delete _data['adminName']
                                    delete _data['adminId']
                                    delete _data['realName']
                                    setTimeout(() => {
                                        it.TableAndVisible = false;
                                        it.detailTableAndVisible = false;
                                        it.loading = false;
                                    }, 500)
                                    it.list();
                                }
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },
            showtruntablelogs(params) {  //转盘记录
                console.log(params)
                const it = this;
                _data['addressId'] = params;
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'user_address_detail',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.UnFormData.push({
                                    userId: res.data.userId,
                                    named: res.data.named,
                                    phone: res.data.phone,
                                    province: res.data.province,
                                    city: res.data.city,
                                    district: res.data.district,
                                    address: res.data.address,
                                    createTime: res.data.createTime
                                })
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            exportTurntableUserLogs(params) {  //导出用户抽奖记录
                const it = this;
                _data['userId'] = params.userId || '';
                _data['drawInstanceId'] = params.drawInstanceId || '';
                _data['drawId'] = params.drawId || '';
                _data['drawName'] = params.drawName || '';
                _data['raffleVersion'] = params.raffleVersion || '';
                _data['itemName'] = params.itemName || '';
                _data['itemType'] = params.itemType || '';
                _data['status'] = params.status || '';
                _data['hasAddress'] = params.hasAddress || '';
                if (params.startTime > 1) {
                    _data['startTime'] = ym.init.getDateTime(params.startTime[0]) || '';
                    _data['endTime'] = ym.init.getDateTime(params.startTime[1]) || '';
                }

                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_user_draw_raffle_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                location.href = token._j.URLS.Development_Server_ + res.path;
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            //查询运维流程详情
            machineMaintenance(params) {
                const it = this;
                _data['maintainerId'] = params.maintainerId
                _data['maintainFlowId'] = params.maintainFlowLogId
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'maintain_question_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.UnFormData = [];
                                res.data.forEach(element => {
                                    it.UnFormData.push({
                                        question: element.question,
                                        answerPic: element.answerPic,
                                        answer: (() => {
                                            let _code = element.answer.split('$')[0], _code_ = '';
                                            element.answer.split('$')[0].includes('{') ? void function () {
                                                Object.keys(JSON.parse(_code)).forEach((element, index) => {
                                                    if (Object.keys(JSON.parse(_code)).length <= 2) {
                                                        _code_ = `料仓：${Object.values(JSON.parse(_code))[0]},坏料：${Object.values(JSON.parse(_code))[1]}`;
                                                    } else {
                                                        // _code_ += ` 【 料仓：${index + 1}, 数值：${Object.values(JSON.parse(_code))[index]} 】 `;
                                                        _code_ += `【 ${index + 1}、${Object.keys(JSON.parse(_code))[index].split('g')[0]}：${Object.values(JSON.parse(_code))[index]} g 】 `
                                                    }
                                                });
                                                _code = _code_;
                                            }() : null;
                                            return _code;
                                        })()
                                    })
                                })
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            //查看料仓配置
            machineBunkerConfig(params, enitBunkerConf) {
                const it = this;
                _data['machineBunkerConfigId'] = params.machineBunkerConfigId
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'machine_bunker_config',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.TableFormData = [];
                                it.formData.numberBigConf = [];  //编辑时的回显
                                it.formData.numberSmallConf = []; // 小机器
                                it.bunkerConf = {
                                    name: res.bunkerConfig.bunkerConfigName,
                                    time: ym.init.getDateTime(res.bunkerConfig.createTime)
                                };
                                JSON.parse(res.bunkerConfig.bunkerConfiguration).forEach(element => {
                                    it.TableFormData.push({
                                        name: element.name,
                                        number: element.number,
                                        isShow: element.isShow == +true ? '是' : '否',
                                    });
                                    if (enitBunkerConf) {  //编辑的时候回显
                                        it.numberConf(res.bunkerConfig.machineType); //重置大小机器的tag
                                        it.formData.disableConf = true;
                                        it.formData.disableConfMahineName = res.bunkerConfig.machineType == 2 ? "小型桌面机" : "大型柜式机";
                                        it.formData.has = res.bunkerConfig.machineBunkerConfigId; //是编辑操作的ID
                                        it.formData.bunkerConfigName = res.bunkerConfig.bunkerConfigName;  //配置名称
                                        it.formData.machineType = res.bunkerConfig.machineType; //设备类型
                                        it.formData.isSys = res.bunkerConfig.isSys;  //是否系统配置 
                                        if (res.bunkerConfig.machineType == 2) {
                                            it.formData.numberSmallConf.push({
                                                name: element.name,
                                                number: element.number,
                                                isShow: element.isShow,
                                            });
                                        } else {
                                            it.formData.numberBigConf.push({
                                                name: element.name,
                                                number: element.number,
                                                isShow: element.isShow,
                                            });
                                        }
                                    }
                                })
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            numberConf(params) { //切换料仓类型
                if (params == +true) {
                    this.bunkerConfNumber = true;
                } else {
                    this.bunkerConfNumber = false;
                }
            },

            pushNumberConf(params) { //提交 料仓配置
                const it = this;
                _data['bunkerConfigName'] = params.bunkerConfigName;
                _data['machineType'] = params.machineType;
                if (params.machineType == +true) {
                    _data['bunkerConfiguration'] = JSON.stringify(params.numberBigConf);
                } else {
                    _data['bunkerConfiguration'] = JSON.stringify(params.numberSmallConf);
                }
                _data['isSys'] = params.isSys;
                if (it.formData.has) {
                    _data['machineBunkerConfigId'] = it.formData.has;
                }
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'add_or_update_machine_bunker_config',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.InputAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['machineBunkerConfigId']
                                delete _data['bunkerConfigName'];
                                delete _data['machineType'];
                                delete _data['bunkerConfiguration'];
                                delete _data['isShow'];
                                delete _data['isSys'];
                                it.list();
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            bindMachineBunker(params) {  //绑定料仓配置
                const it = this;
                _data['machineBunkerConfigId'] = it.formData.machineBunkerConfigAllId;
                _data['machineNumbers'] = it.machineNumber;  //数组
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'bind_machine_bunker',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.detailTableAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['machineBunkerConfigId']
                                delete _data['machineNumbers'];
                                it.list();
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            miniTurntableUApush(params) {   //小程序大转盘新建 /更新提交
                const it = this;
                _data['raffleName'] = params.raffleName;
                _data['allowConsumeChance'] = params.allowConsumeChance;
                _data['allowMemberConvert'] = params.allowMemberConvert;
                _data['allowShareChance'] = params.allowShareChance;
                _data['convertMilliliter'] = params.convertMilliliter || 0;
                _data['maxLuckyValue'] = params.maxLuckyValue;
                _data['status'] = params.status;
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'add_or_update_sys_draw_raffle_info',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.InputAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                                it.list();
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            miniTurntablePrizeExe(params) {  //导出抽奖记录
                const it = this;
                this.loading = true;
                _data['userId'] = params.userId || '';
                _data['nickName'] = params.nickName || '';
                _data['adminName'] = params.adminName || '';
                _data['raffleVersion'] = params.raffleVersion || '';
                _data['itemType'] = params.itemType || '';
                _data['status'] = params.status || '';
                _data['startDate'] = params.startTime ? ym.init.getDateTime(params.startTime[0]).split(' ')[0] : '';
                _data['endDate'] = params.startTime ? ym.init.getDateTime(params.startTime[1]).split(' ')[0] : '';
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_sys_user_draw_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.UpdateTableAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                                location.href = token._j.URLS.Development_Server_ + res.path;
                                it.loading = false;
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.loading = false;
                            it.IError(error);
                        }
                    }
                })
            },

            maintenanceLogsOutPut(params) {  //导出运维日志
                const it = this;
                this.loading = true;
                _data['maintainerId'] = params.maintainerId || '';
                _data['maintainerName'] = params.maintainerName || '';
                _data['machineNumber'] = params.machineNumber || '';
                _data['status'] = params.status || '';
                _data['startDate'] = params.startTime ? ym.init.getDateTime(params.startTime[0]).split(' ')[0] : '';
                _data['endDate'] = params.startTime ? ym.init.getDateTime(params.startTime[1]).split(' ')[0] : '';
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_maintain_material_answer_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.UpdateTableAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                                location.href = token._j.URLS.Development_Server_ + res.path;
                                it.loading = false;
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.loading = false;
                            it.IError(error);
                        }
                    }
                })
            },

            miniTurntableUA(params, prize) {  //小程序大转盘配置查看， 奖品查看
                if (prize) {  //奖品查看
                    this.formData.raffleName = params[0].raffleName;
                    this.formData.allowConsumeChance = params[0].allowConsumeChance;
                    this.formData.allowMemberConvert = params[0].allowMemberConvert;
                    this.formData.allowShareChance = params[0].allowShareChance;
                    this.formData.convertMilliliter = params[0].convertMilliliter;
                    this.formData.maxLuckyValue = params[0].maxLuckyValue;
                    this.formData.status = params[0].status;
                } else {
                    this.formData.raffleName = params[0].raffleName;
                    this.formData.allowConsumeChance = params[0].allowConsumeChance;
                    this.formData.allowMemberConvert = params[0].allowMemberConvert;
                    this.formData.allowShareChance = params[0].allowShareChance;
                    this.formData.convertMilliliter = params[0].convertMilliliter;
                    this.formData.maxLuckyValue = params[0].maxLuckyValue;
                    this.formData.status = params[0].status;
                }
            },

            updateTurntableVersion() {  //大转盘版本升级，将会把所有用户数据记录重置
                //  upgrade_sys_draw_raffle_version
                let it = this;
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'upgrade_sys_draw_raffle_version',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                it.list();
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            exportLogExe(params) {  //导出预约记录
                let it = this;
                it.loading = true;
                _data = Object.assign(_data, { napeName: params.napeName || '', status: params.status })
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_pre_sell_nape_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                location.href = token._j.URLS.Development_Server_ + res.path;
                                setTimeout(() => {
                                    it.loading = false;
                                }, 1000)
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            appointmentPayEdesit(params) {  //预约详情
                let it = this;
                _data = Object.assign(_data, { preSellLogId: params })
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'pre_sell_nape_log_detail',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.appointmentPay = {};
                                Object.keys(res.data).forEach((element, index) => {
                                    it.appointmentPay[element] = Object.values(res.data)[index];
                                });
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            appointmentPayGrant(params) {  //核销 发券
                let it = this;
                _data = Object.assign(_data, { preSellLogId: params })
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'pre_sell_grant',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['preSellLogId'];
                                it.TableAndVisible = false;
                                it.list();
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },
            appointmentPayGrantCancel(params) {  //确认核销 信息【不发券】
                let it = this;
                _data = Object.assign(_data, { preSellLogId: params })
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'pre_sell_cancel',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['preSellLogId']
                                it.list();
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            statusPrize(params) { // 更改奖品状态
                const it = this;
                _data = Object.assign(_data, params);
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'change_sys_draw_item_info_status',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['itemId'];
                                it.list();
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            addressTableList(params) {  //查看单个用户地址
                const it = this;
                let xml = [];
                typeof params === 'object' ? params['page'] = it.pageTableNum : params['page'] = params;
                _data = Object.assign(_data, params);
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'user_address_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.addressTables = [];
                                for (let i = 0; i < res.data.length; i++) {  // 
                                    xml.push({
                                        address: res.data[i].address,
                                        phone: res.data[i].phone,
                                        named: res.data[i].named
                                    });
                                }
                                it.addressTables = xml;
                                // page++;

                                // it.pageTimerOut = setTimeout(() => {
                                //     if (it.pageCount - page < 0) {  //页数 > 总页数
                                //       clearTimeout(it.pageTimerOut);
                                //       return false;
                                //     }
                                //     it.addressTableList(page);
                                //   }, 500);

                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            marketingConfig(params, name) {  //营销配置编辑
                let it = this;
                if (name) {
                    _data['adminId'] = params.adminId;
                    _data['adminMarketingConfigId'] = params.adminMarketingConfigId;
                    _data['allowGrant'] = params.allowGrant;
                    params.allowGrant != 1 ? null : _data['grantMilliliter'] = params.grantMilliliter > 0 && params.grantMilliliter < params.convertMilliliter ? params.grantMilliliter : it.IError('数值异常！');
                    _data['allowShare'] = params.allowShare;
                    params.allowShare != 1 ? null : _data['shareMilliliter'] = params.shareMilliliter > 0 && params.shareMilliliter < params.convertMilliliter ? params.shareMilliliter : it.IError('数值异常！');
                    _data['allowSignIn'] = params.allowSignIn;
                    params.allowSignIn != 1 ? null : _data['signInMilliliter'] = params.signInMilliliter > 0 && params.signInMilliliter < params.convertMilliliter ? params.signInMilliliter : it.IError('数值异常！');
                    _data['allowChangeCup'] = params.allowChangeCup;
                    params.allowChangeCup != 1 ? null : _data['changeMilliliter'] = params.changeMilliliter > 0 && params.changeMilliliter < params.convertMilliliter ? params.changeMilliliter : it.IError('数值异常！');
                    _data['convertMilliliter'] = params.convertMilliliter > 0 ? params.convertMilliliter : it.IError('数值异常！');
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + 'update_admin_marketing_config',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    it.InputAndVisible = false;
                                    it.list();
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                } else {
                    _data['adminMarketingConfigId'] = params;
                    ym.init.XML({
                        method: 'GET',
                        uri: token._j.URLS.Development_Server_ + 'admin_marketing_config_detail',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    Object.keys(res.data).forEach((element, index) => {
                                        it.formData[element] = Object.values(res.data)[index];
                                    })
                                    it.$forceUpdate(); //input 输入问题
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                }
            },

            couponList(params) { //用户礼券 窗口 列表
                console.log(params);
                let it = this;
                // params ? pasessionStorage.setItem('params', params.userId) : params.userId = sessionStorage.getItem('params');
                _data['userId'] = params.userId;
                _data['page'] = it.countPages;
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'find_user_couponList',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                res.userCouponList.forEach((element, index) => {
                                    res.userCouponList[index].createTime = ym.init.getDateTime(element.createTime);
                                })
                                it.couponUnFormData = res.userCouponList;
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            exportMachineLog(_event, typeUrl) {
                const it = this;
                it.loading = true
                _event.machineNumber ? _data['machineNumber'] = _event.machineNumber : null;
                _event.startTime ? _data['startTime'] = _event.startTime[0] : null;
                _event.startTime ? _data['endTime'] = _event.startTime[1] : null;
                _event.machineType ? _data['machineType'] = _event.machineType : null;
                _event.status ? _data['status'] = _event.status : null;
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + typeUrl,
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                setTimeout(() => {
                                    it.loading = false;
                                    it.UpdateTableAndVisible = false;
                                }, 500)
                                location.href = token._j.URLS.Development_Server_ + res.path;
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            }

        }
    });
}, false)
