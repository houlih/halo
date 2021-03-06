var halo = new $.halo();
$(document).ready(function () {
    $("#login-name").val(localStorage.getItem("loginName"));
});

function btn_login() {
    var btnLogin = $('#btn-login');
    var loginBody = $('.login-body');
    var name = $("#login-name");
    var pwd = $("#login-pwd");
    btnLogin.button('loading');
    if (name === "" || pwd === "") {
        halo.showMsg("请输入完整信息！", 'info', 2000);
        btnLogin.button('reset');
    } else {
        $.post('/admin/getLogin',{
            'loginName': name.val(),
            'loginPwd': pwd.val()
        },function (data) {
            localStorage.setItem('loginName', name.val());
            if (data.code === 1) {
                halo.showMsgAndRedirect(data.msg, 'success', 1000, '/admin');
            } else {
                loginBody.addClass('animate shake');
                $.toast({
                    text: data.msg,
                    heading: heading,
                    icon: 'error',
                    showHideTransition: 'fade',
                    allowToastClose: true,
                    hideAfter: 2000,
                    stack: 1,
                    position: 'top-center',
                    textAlign: 'left',
                    loader: true,
                    loaderBg: '#ffffff',
                    afterHidden: function () {
                        loginBody.removeClass('animate shake');
                    }
                });
                btnLogin.button('reset');
            }
        },'JSON');
    }
}

$(document).keydown(function (event) {
    if (event.keyCode === 13) {
        btn_login();
    }
});
