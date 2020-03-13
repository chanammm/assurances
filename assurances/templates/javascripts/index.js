"use strict";
import '../stylesheets/style.min.css';
import { city } from "./city";
import PickerExtend from 'picker-extend';
import axios from 'axios';

class init{
    constructor(){
        this.data = {};
        this.dom = document.querySelector('.submit');
        this.clone = document.querySelector('.module');
        this._submit_ = this._submit_(location.href.substring(location.href.lastIndexOf('/') + 1, location.href.length - 5));
    }

    _input_(){
        document.querySelectorAll('input').forEach((element, index) => {
            this.data[element.name] = element.value +`|${ element.getAttribute('placeholder') }`;
        });
    }

    _submit_(params){
        this.dom.onclick = () => {  //提交
            try {
                this._input_();  //输出表单 内容
                Object.keys(this.data).forEach((element, index) =>{  //检测 表单内容
                    console.log(this.data)
                    if(Object.values(this.data)[index].split('|')[0] != ''){
                        console.log(element)
                    }else{   
                        throw new Error(Object.values(this.data)[index].split('|')[1] != 'null' ? Object.values(this.data)[index].split('|')[1]: `'${ element }' cannot be empty!`);
                    }
                });
            } catch (error) {
                this._alert_(error, 1000);
            }
        };
        switch(params){
            case 'index':
                document.querySelectorAll('.pullimage').forEach((element, index) => {  // 图片上传
                    document.querySelectorAll('.pullimage')[index].onclick = domain => {
                        this._image_(element.name, index);  //触发图片上传
                    }
                });
                document.querySelectorAll('input[name=address]')[0].onclick = this._address_(); //地址选择事件
                this._enlarge_(); //注册示意图放大事件
                break;
            case 'login':

                break;
            default:
                break;
        }
    }

    _address_(){  // 地址选择
        let that = this;
        new PickerExtend({
            trigger: '#address',
            title: '单项选择',
            wheels: [{data: city}],
            position:[1], //初始化定位
            callback:function(indexArr, data){
                document.querySelectorAll('input[name=address]')[0].value = (() => {
                    let code = [];
                    data.forEach(element =>{
                        code.push(element.value);
                    });
                    that.data['address'] = code.join(',');
                    return code;
                })()
            }
        });
    }

    _enlarge_(params){  //放大图片
        document.querySelectorAll('.sketchmap').forEach((element, index) => {
            element.onclick = domain => {
                this._show_('.image-show');
                let srcurl = document.querySelectorAll('.sketchmap>img')[index].getAttribute('src');
                document.querySelectorAll('.image-show>img')[0].setAttribute('src', srcurl);
            }
        })
    }

    _alert_(xml, timeout, timer){  //提示框
        document.querySelector('.text-mudule').innerHTML = xml;
        document.querySelector('.text-mudule').style.display = 'block';
        timer = setTimeout(() => {
            document.querySelector('.text-mudule').style.display = 'none';
            timer = null;
        }, timeout)
    }

    _show_(className){  //显示方法
        document.querySelector('.module').style.display = 'block';
        document.querySelectorAll(className).forEach((element, index) => {
            document.querySelectorAll(className)[index].style.display = 'block';
        });
        this.clone.onclick = () => {
            this._clone_(className);
        };
    }

    _clone_(className){  //隐藏方法
        document.querySelector('.module').style.display = 'none';
        document.querySelectorAll(className).forEach((element, index) => { 
            document.querySelectorAll(className)[index].style.display = 'none';
        });
    }

    _image_(name, index){
        document.getElementsByClassName(name)[0].click();
        document.getElementsByClassName(name)[0].onchange = function (e) {
            var localFile = this.files[0];
            var reader = new FileReader();
            var content;
            reader.onload = function (event) {
                content = event.target.result;

                //暂定
                document.querySelectorAll('.pullimage')[index].setAttribute('src', content);

                compress(content, 450, function (contentFile) {
                    // push image
                    // let _$file = new FormData();
                    // _$file.append('maintainerId', assign.maintainerId);
                    // _$file.append('type', 18);
                    // _$file.append('file', contentFile, 'machineNumber_' + Math.random() + '.png');
                    // axios({
                    //     method: "POST",
                    //     url: filePush,
                    //     data: _$file,
                    //     processData: false,
                    //     traditional: true,
                    //     contentType: false,
                    //     headers: {
                    //         "Content-Type": false
                    //     },
                    //     onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
                    //         if (progressEvent.lengthComputable) {
                    //             //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                    //             //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                    //             if (progressEvent.total % progressEvent.loaded == +false) {
                    //                 setTimeout(() => {
                    //                     loading.style.display = 'none';
                    //                 }, 2000)
                    //             }
                    //         }
                    //     }
                    // }).then(
                    //     response => {
                            // let _imgBox = document.createElement('figure'), _img = document.createElement('img'), _clone = document.createElement('svg'), _use = document.createElement('use');
                            // _imgBox.className = 'hash[imageBox]';
                            // _img.src = response.data.realPath;
                            // _imgBox.appendChild(_img);
                            // _clone.className = 'icon';
                            // _clone.setAttribute('aria-hidden', "true");
                            // _use.setAttribute('xlink:href', "#ym-icon-guanbi");
                            // _clone.appendChild(_use);
                            // _imgBox.appendChild(_clone);
                            // photo.appendChild(_imgBox);
                    //     }
                    // ).catch((error) => {
                    //     console.log(error);
                    // })
                });
            };
            reader.onerror = function () {
                alert("error");
            };
            reader.readAsDataURL(localFile, "UTF-8");
        }
        function compress(content, size, callback) {  //压缩拍摄上传
            if (content.length <= size * 1024) {
                callback(dataURItoBlob(content));
                return;
            }
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let img = new Image();
            img.src = content;
            img.onload = function () {
                let width = img.width;
                let height = img.height;
                canvas.width = width;
                canvas.height = height;
                // 铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);
                let rate = (1024 * size) / content.length;
                console.log(content.length * 1024);
                //进行压缩
                content = canvas.toDataURL("image/jpeg", 0.2);
                console.log(content.length * 1024);
                let blob = dataURItoBlob(content);
                callback(blob);
            };
        }
        /**
         * base64 转二进制文件
         * @param {*} base64Data 
         */
        function dataURItoBlob(base64Data) {
            var bytes = window.atob(base64Data.split(',')[1]); //去掉url的头，并转换为byte

            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], {
                type: 'image/png'
            });
        }

    }
}

window.addEventListener('DOMContentLoaded', new init());
