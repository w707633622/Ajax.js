function ajax(method, url, data, successFunc, errorFunc){
    //1.创建ajax对象
    try{
        var xhr = new XMLHttpRequest();
    }catch(error){
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        console.log(error);
    }
    //2.open  判断get和post的open方法
    if(method == 'get' && data){
        url += "?" + data;
    }

    xhr.open(method, url, true);
    //3、send
    if(method == 'get'){
        xhr.send();
    }else{
        //设置post请求的编码问题 设置在open方法的下面，send方法的前面
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); //声明发送的数据类型 
        xhr.send(data);
    }
    //4、接收数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (successFunc) {
                    successFunc(xhr.responseText)
                }
            } else {
                if (errorFunc) {
                    errorFunc('出错了，Err:' + xhr.status)
                }
            }
        }
    }
}