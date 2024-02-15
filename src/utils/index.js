export function isPassword(str){
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,9}$/;
    return reg.test(str.trim())
}

export function validate_ip(rule, value,callback){
    if(value==''||value==undefined||value==null){
        callback();
    }else {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的IP地址'));
        } else {
            callback();
        }
    }
}

