


    $('#formShow').on('submit', function(e){
        e.preventDefault();
        let formData = new FormData();
        console.log(formData.get('name'));
        $.ajax({
            url : '/handIn',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: data => {
                var err_code = data.err_code;
                if(err_code === 0){
                    window.location.href = '/showComments';
                }else if(err_code === 500){
                    window.alert('服务器故障');
                }
                else if(err_code === 1){
                    window.alert('发布失败');
                }
            }
        })
    })