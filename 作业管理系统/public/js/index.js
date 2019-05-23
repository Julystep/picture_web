
function login(){
    var div = document.getElementById('login_module');
    div.style.display = "block";
}
function register(){
    var div = document.getElementById('register_module');
    div.style.display = "block";
}
document.getElementById('dismiss1').onclick = function(){
    var div = document.getElementById('login_module');
    div.style.display = 'none';
}
document.getElementById('dismiss2').onclick = function(){
    var div = document.getElementById('register_module');
    div.style.display = 'none';
}
$('#form_login').on('submit', function(e){
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
        url: '/',
        type: 'post',
        data: formData,
        dataType: 'json',
        success: data => {
            code = data.err_code;
            if(code === 1){
                alert('用户名或密码不存在');
            }else if(code === 500){
                alert('服务器繁忙，请稍后再试');
            }else if(code === 0){
                alert('登陆成功');
                window.location.href = '/main';
            }
        }
    })
})
$('#form_register').on('submit', function(e){
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
        url: '/register',
        type: 'post',
        data: formData,
        dataType: 'json',
        success: data => {
            code = data.err_code;
            if(code === 1){
                alert('账号已存在');
            }else if(code === 2){
                alert('创建账号失败，未知原因');
            }else if(code === 500){
                alert('服务器繁忙，稍后再试');
            }else if(code === 0){
                alert('账号创建成功');
                $('#register_module').css('display', 'none');
                $('#login_module').css('display', 'block');
            }
        }
    })
})