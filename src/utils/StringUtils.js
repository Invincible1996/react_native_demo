export default class StringUtil {
    /***
     * 验证用户名 账号 验证规则：字母、数字、下划线组成，字母开头，4-16位。
     * @param str
     * @returns {boolean}
     */
    static checkUser(str) {
        let re = /^[a-zA-z]\w{3,15}$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    }
    /***
     * 验证手机号
     * @param mobile 手机 验证规则：11位数字，以1开头。
     * @returns {boolean}
     */
    static checkMobile(mobile) {
        var re = /^1\d{10}$/
        if (re.test(mobile)) {
            return true;
        } else {
            return false;
        }
    }
    /*
     验证电话号码
     验证规则：区号+号码，区号以0开头，3位或4位
     号码由7位或8位数字组成
     区号与号码之间可以无连接符，也可以“-”连接
     如01088888888,010-88888888,0955-7777777
     */
    static checkPhone(phone) {
        let re = /^0\d{2,3}-?\d{7,8}$/;
        if (re.test(phone)) {
            return true;
        } else {
            return false;
        }
    }
    /*
     验证邮箱
     验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
     第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
     第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
     而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
     */
    static checkEmail(email) {
        let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (re.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    /***
     * 验证码密码
     * @param password 密码
     * @returns {boolean}
     */
    static checkPwd(password) {
        if (password && password.length >= 6 && password && password.length <= 20) {
            return true;
        } else {
            return false;
        }
    }

    /***
     * 验证短信验证码
     * @param sms  短信验证码
     * @returns {boolean}
     */
    static checkSmsCode(sms) {
        if (sms) {
            return true;
        } else {
            return false;
        }
    }
    static qiniuImageReset(url, width, height, isVideo = false) {
        width = parseInt(width)
        height = parseInt(height)
        let use = url.indexOf('?') === -1 ? '?' : '&'
        if (isVideo) {
            return url + use + 'vframe/jpg/offset/0/w/' + width + '/h/' + height;
        }

        if (height > 0) {
            let type = isVideo ? 'vframe/jpg/offset/0/w/' : 'imageView2/1/w/';
            return url + use + type + width + '/h/' + height
        } else {
            let type = isVideo ? 'vframe/jpg/offset/0/w/' : 'imageView2/0/w/';
            return url + use + type + width
        }
        // return url+use+'imageMogr2/thumbnail/'+width+'x'
    }

    /***
     * OSS图片缩略设置
     * @param url  目标Url
     * @param width 需要的宽
     * @param height 需要的高（可以不设，不设置的话就按照原比例缩放）
     * @returns {string}
     */
    static ossImageReset(url, width, height) {
        width = parseInt(width)
        height = parseInt(height)
        let use = url.indexOf('?') === -1 ? '?' : '&'
        if (height > 0) {
            let resize = 'x-oss-process=image/resize,m_fill,h_' + height + ',w_' + width
            // console.log('url+use+resize',url+use+resize)
            return url + use + resize
        } else {
            let resize = 'x-oss-process=image/resize,w_' + width
            // console.log('url+use+resize2',url+use+resize)
            return url + use + resize
        }
    }
};