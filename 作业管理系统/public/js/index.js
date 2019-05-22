
var id = document.getElementById('id').value;
var pwd = document.getElementById('pwd').value;
var sign = document.getElementById('sign');
var pattern = /[0-9]{6}/g;

sign.click = function(){
    if( !pattern.match(pattern)){
        alert('密码格式不正确');
    }
}