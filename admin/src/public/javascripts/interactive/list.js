import { regionData, CodeToText, TextToCode } from 'element-china-area-data';
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
                fileUpdataExc: (process.env.NODE_ENV == "development" ? parent.all.json._j.URLS.Development_Server_ : parent.all.json._j.URLS.Development_Server_) + 'import_machine_instance_by_csv',
                asfileUpdataExc: (process.env.NODE_ENV == "development" ? parent.all.json._j.URLS.Development_Server_ : parent.all.json._j.URLS.Development_Server_) + 'import_machine_by_csv',
                fileUpdataExcData: {
                    Authorization: JSON.parse(sessionStorage.getItem('token')).asset.secret
                },
                loading: false,
                testAdmin: ym.init.COMPILESTR.decrypt(JSON.parse(sessionStorage.getItem('_a'))._i) == "yuanmenghhx" || ym.init.COMPILESTR.decrypt(JSON.parse(sessionStorage.getItem('_a'))._i) == "yuanmengKSX" ? false : true,  //指定的账号不能显示订单查看
                more: false,
                tableData: [],
                UnFormData: [],
                UnTableFormData: [],
                currentPage: 1,
                pageSize: 20,
                page: 1,
                total: 0,
                machineId: [],
                addressId: [],
                address: regionData,   // 地址选择
                roleId: [],
                formData: {
                    machineId: [],
                    addressId: []
                },
                formDataTree: {
                    modedata: ''
                },
                formDatas: {
                    machineId: [],
                    addressId: []
                },
                options: [],
                option: [],
                SearchTableAndVisible: false,
                UpdateTableAndVisible: false,
                detailTableAndVisible: false,
                TableAndVisible: false,
                dialogVisible: false,
                adoptModule: false,
                errorExe: false,
                pawstate: false,
                dialogImageUrl: '',
                fileList: [],
                data: {},
                num: 1,
                props: {
                    label: 'name',
                    ids: 'id',
                    values: 'value',
                    children: 'zones'
                },
                count: 1,
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
                SearchTableFormDatas: {},
                imageList: {
                    machinePic: [],
                    machinePics: []
                },
                fileData: {

                },
                errorImage: ['../images/error.png'],
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
                    // data.page.pages ? it.currentPage= parseInt(data.page.pages) : null;
                    if (data.state == 200) {
                        if (uri == 'page_permission_tree') {
                            data.list.forEach((element, index) => {
                                if (element.lowers) {
                                    element['hasChildren'] = true;
                                    element['children'] = element.lowers;
                                }
                                if (element.permissionWeight == 1) {
                                    xml.push(element);
                                }
                            })
                        } else {
                            data.page.total ? it.total = parseInt(data.page.total) : null;
                            xml = data.page.records;
                        }
                    } else {
                        is.IError(data.msg);
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
                        // is.detailTableAndVisible = true;
                        // this.data['tree'] = res.data.list;
                        // is.UnFormData = res.data.list;
                        let arr = [];
                        res.data.list.forEach((element, index) => {
                            if (element.permissionWeight == 1) {
                                arr.push({id: element.permissionId, name: element.permissionName, value: element.lowers})
                            }
                        })
                        setTimeout(() => {
                            this.$refs.tree.setCheckedNodes(arr);
                        },200)
                        this.data['roleId'] = params;
                   
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
                        is.data['tree'] = res.data.list;
                        // res.data.list.forEach((element, index) => {
                        //     params.forEach((els) => {
                        //         if (els.permissionId == element.permissionId) {
                        //             it.$nextTick(function () {
                        //                 is.tableChecked(index);  //每次更新了数据，触发这个函数即可。
                        //             });
                        //         }
                        //     })

                        // })
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            //提交 权限页面 绑定
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

            tableChecked(e) {  //表格打勾已选择回显 
                this.$refs.multipleTable.toggleRowSelection(this.tableData[e], true);
            },

            //查看客户详细
            customerDest(params) {
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

            //新增 实例 设备
            machine(params) {
                // document.querySelectorAll('#machine>div>div>div>input').forEach((element, index) => {
                //     console.log(element);
                // })
                try {
                    params['addressId'] = params.addressId[0];
                    params['machineId'] = params.machineId[0];
                    params['exWarehouseTime'] = ym.init.getDateTime(params.exWarehouseTime).split(' ')[0];
                    axios.post('create_machine_instance', qs.stringify(params)).then(res => {
                        if (res.data.state == 200) {
                            is.UpdateTableAndVisible = false;
                            is.ISuccessfull(res.data.msg);
                            is.data = {};
                            is.list();
                        } else {
                            is.IError(res.data.msg);
                        }
                    })
                        .catch(function (error) {
                            is.IError(error);
                        })
                } catch (error) {
                    is.IError(error);
                }
            },

            //新增设备 
            devicemachine(params) {
                params['machinePic'] = is.data.machinePic;
                axios.post('create_machine', qs.stringify(params)).then(res => {
                    if (res.data.state == 200) {
                        is.UpdateTableAndVisible = false;
                        is.ISuccessfull(res.data.msg);
                        is.data = {};
                        is.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //查看实例设备详细
            machineDest(params, timer = null) {
                axios.get('sys_machine_instance_detail', {
                    params: {
                        machineInstanceId: params
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        is.SearchTableAndVisible = true;
                        if (res.data.data.status == 1) {
                            is.adoptModule = true;
                        } else {
                            is.adoptModule = false;
                        }
                        // Object.keys(res.data.data).forEach((element, index))
                        is.SearchTableFormData = res.data.data;
                        timer = setTimeout(() => {
                            document.getElementById('adopt').style.display = 'none';
                            if (res.data.data.auditStatus == 2) {
                                document.getElementById('adopt-error').style.display = 'block';
                            } else {
                                document.getElementById('adopt-error').style.display = 'none';
                                if (res.data.data.status == 1) {
                                    document.getElementById('adopt').style.display = 'block';
                                }
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

            //查看设备详细
            devicemachineDest(params) {
                axios.get('sys_machine_detail', {
                    params: {
                        machineId: params
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        is.SearchTableAndVisible = true;
                        is.imageList.machinePics = [];
                        // is.imageList.machinePic.push(res.data.machinePic);
                        is.imageList.machinePics.push({ name: 'machinePics', url: res.data.data.machinePic });
                        is.SearchTableFormDatas = res.data.data;
                        // console.log(is.SearchTableFormData.machinePic)
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //审核 工单
            adopt(params, bool) {
                axios.get('audit_machine_instance', {
                    params: {
                        auditResult: +bool + 1,
                        machineInstanceId: params.machineInstanceId
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
            ExecSceneSuccess(file) {
                if (file.state == 200) {
                    this.data['Execfile'] = file.data.failFilePath;
                    if (file.data.fail > 0) {
                        is.errorExe = true;
                        is.fileList = [];
                        is.$nextTick(function () {
                            document.getElementById('ahrefDownload').onclick = function () {
                                parent.window.open(file.data.failFilePath, '_blank');
                            };
                        });
                        return false;
                    }
                    this.ISuccessfull('上传成功！');
                    this.list();
                } else {
                    is.fileList = [];
                    is.IError(file.msg);
                }
            },
            exeLength(error) {
                is.IError('文件上传超出处理限制个数');
            },
            DeleteInstance(params = {}) {
                params[Object.keys(params)[1]] = Object.values(params)[1];
                axios.get(params.url, {
                    params: params
                }).then(res => {
                    if (res.data.state == 200) {
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
            // 查询 物料编号/区域地址ID/角色ID
            search(params) {
                this.data['page'] = 1;
                this.data['pageSize'] = 10000;
                this.data['url'] = params.url;
                axios.post(this.data.url, qs.stringify(this.data)).then(params => {
                    if (params.data.state == 200) {
                        if (this.data.url == 'sys_machine_list') {
                            this.machineId = params.data.page.records.map(item => {
                                return { value: `${item.machineId}`, label: `${item.coding}` };
                            });
                        } else if (this.data.url == 'sys_role_list') {
                            this.roleId = params.data.page.records.map(item => {
                                return { value: `${item.roleId}`, label: `${item.roleName}` };
                            });
                        }
                        axios.post('sys_address_list', qs.stringify(this.data)).then(params => {
                            if (params.data.state == 200) {
                                this.addressId = params.data.page.records.map(item => {
                                    return { value: `${item.id}`, label: `${item.address}` };
                                });
                            } else {
                                is.IError(params.data.msg);
                            }
                        })
                        // this.data = {};
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            // select 检索
            remoteMethod(query) {
                if (query !== '') {
                    setTimeout(() => {
                        this.options = this.machineId.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            //选择区域地址ID
            remoteMethods(query) {
                if (query !== '') {
                    setTimeout(() => {
                        this.option = this.addressId.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.option = [];
                }
            },
            //选择角色ID
            remoteMethodes(query) {
                if (query !== '') {
                    setTimeout(() => {
                        this.options = this.roleId.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            //管理员详情
            admindetail(params) {
                axios.get('sys_admin_detail', {
                    params: params
                }).then(res => {
                    if (res.data.state == 200) {
                        this.UpdateTableAndVisible = true;
                        this.search({ url: 'sys_role_list' });
                        this.data['addressId'] = res.data.data.addressId;  //缓存起来 地址ID
                        res.data.data.addressId = res.data.data.address;
                        this.data['roleId'] = res.data.data.roleId;  //缓存起来 地址ID
                        res.data.data.roleId = res.data.data.roleName;
                        this.formData = res.data.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //管理员修改
            admindenit(params) {
                if (isNaN(params.addressId)) {  //不修改 区域地址
                    params['addressId'] = this.data.addressId;
                }
                if (isNaN(params.roleId)) {  //不修改角色
                    params['roleId'] = this.data.roleId;
                }
                axios.post('update_admin', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        is.ISuccessfull(params.data.msg);
                        is.UpdateTableAndVisible = false;
                        is.formData = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //管理员添加
            adminmanage(params) {
                axios.post('create_admin', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        is.ISuccessfull(params.data.msg);
                        is.detailTableAndVisible = false;
                        is.formDatas = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //选择地址
            handleChange(e) {
                //地区选项 CodeToText 
                this.formData.province = e;
            },

            //区域地址添加
            addressmanage(params) {
                params['city'] = CodeToText[params.province[1]] || '';
                params['district'] = CodeToText[params.province[2]] || '';
                params['province'] = CodeToText[params.province[0]] || '';
                axios.post('create_address', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        is.ISuccessfull(params.data.msg);
                        is.UpdateTableAndVisible = false;
                        is.formDatas = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            // 角色添加
            role(params) {
                axios.post('create_role', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        is.ISuccessfull(params.data.msg);
                        is.UpdateTableAndVisible = false;
                        is.formDatas = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            loadNode(node, resolve, tmer = null) {
                tmer = setInterval(() => {
                    if (this.data.hasOwnProperty('tree')) {
                        console.info('this tmer out');
                        clearInterval(tmer);
                        if (node.level === 0) {
                            let _array_ = [];
                            this.data['tree'].forEach((element, index) => {
                                if (element.permissionWeight == 1) {
                                    _array_.push({ name: element.permissionName, id: element.permissionId, value: element.lowers });
                                }
                            });
                            return resolve(_array_);
                        }
                        let __arr__ = [];
                        if (node.data.value != null) {
                            node.data.value.forEach((element, index) => {
                                __arr__.push({ name: element.permissionName, id: element.permissionId, parentId: element.parentId, value: element.lowers })
                            })
                        }
                        setTimeout(function () {
                            resolve(__arr__);
                        }, 500)
                    }
                }, 0)
            },

            //选择的 权限树 
            handleCheckChange(data, checked, indeterminate, array = []) {
                return false;
                if (!data.parentId && checked) {  //处理根节点全选的时候 ID
                    array.push(data.id);
                    data.value.forEach((element, index) => {
                        array.push(element.permissionId);
                    });
                    this.data['permissionId'] != null ? this.data['permissionId'] = this.data.permissionId.concat(array) : this.data['permissionId'] = array;
                } else {  //处理 子节点的点击事件
                    if (checked) {
                        if (data.parentId) {
                            array.push(data.id); array.push(data.parentId);
                            this.data['permissionId'] != null ? this.data['permissionId'] = this.data.permissionId.concat(array) : this.data['permissionId'] = array;
                        }
                    } else {
                        if (this.data['permissionId'] != null) {
                            let arr = Array.from(new Set(this.data['permissionId']));
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] == data.id) {
                                    arr.splice(i, 1);
                                }
                            }
                            // this.data['permissionId'] = arr;
                        }
                    }
                }
                // console.log(this.data['permissionId']);
                // console.log(Array.from(new Set(this.data['permissionId'])));
            },

            checkChang(params) {
                axios.post('update_machine', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        is.ISuccessfull(params.data.msg);
                        is.SearchTableAndVisible = false;
                        is.formDatas = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            roleformDataTree(params) {
                let xml = [];
                this.$refs.tree.getCheckedNodes().forEach((element, index) => {  // 二级
                    xml.push(element.id);
                    if(element.value != null) {
                        element.value.forEach((e, i) => {
                            xml.push(e.permissionId);
                        })
                    }
                })
                // .replace(/^(\s|[])+|(\s|[])+$/g, '')
                // xml = Array.from(new Set(xml));
                let arr = JSON.stringify(Array.from(new Set(xml))).split('[')[1];
                arr = arr.split(']')[0];
                params['roleId'] = this.data.roleId;
                params['permissionIds'] = arr;
                params['setupType'] = 1;
                this.data['setup'] = {};
                this.data.setup['roleId'] = this.data.roleId;
                this.data.setup['permissionIds'] = [];
                this.data.setup['setupType'] = 2;


                axios.post('setup_role_permission', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        //资源权限赋予
                        axios.post('resource_permission_list', {}).then(params => {
                            if (params.data.state == 200) {
                                let __arr__ = [];
                                params.data.list.forEach(element =>{
                                    __arr__.push(element.permissionId)
                                })
                                this.data.setup['permissionIds'] = __arr__;
                                axios.post('setup_role_permission', qs.stringify(this.data.setup));
                            } else {
                                is.IError(params.data.msg);
                            }
                        })
                            .catch(function (error) {
                                is.IError(error);
                            })

                        is.ISuccessfull(params.data.msg);
                        is.TableAndVisible = false;
                        is.formDatas = {};
                        is.data = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },







            machineSceneSuccess(e) {
                this.data['machinePic'] = e.data.path;
            },

            handlePictureCardPreview(file) {  //点击查看放大的时候
                this.dialogVisible = true;
                this.dialogImageUrl = file;
            },
            fileExceed() {
                this.IError('单图上传');
            },
            fileChange() {

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },




        }
    });
}, false)
