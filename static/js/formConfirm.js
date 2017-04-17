
     $(function () {
        console.log("here"); 
        $('form').bootstrapValidator({
　　　　　　　message: 'This value is not valid',
            feedbackIcons: {
                　　　　　　　　valid: 'glyphicon glyphicon-ok',
                　　　　　　　　invalid: 'glyphicon glyphicon-remove',
                　　　　　　　　validating: 'glyphicon glyphicon-refresh'
            　　　　　　　　   },
            fields: {
                userName: {
                    message: '用户名验证失败',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        stringLength: {
                            min: 3,
                            max: 6,
                            message: '用户名长度必须在3到6位之间'
                        },
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        }, 
                        stringLength: {
                            min: 6,
                            max: 18,
                            message: '密码长度必须在6到18位之间'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_]+$/,
                            message: '用户名只能包含大写、小写、数字和下划线'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: '邮箱地址不能为空'
                        }, 
                        emailAddress: {
                            message: '邮箱地址格式有误'
                        }
                    }
                }, 
                contact: {
                    validators: {
                        notEmpty: {
                            message: '手机号码不能为空'
                        },
                        regexp: {
                            regexp: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
                            message: '电话号码格式不对'
                        }
                    }
                }, 

                title: {
                    validators: {
                        notEmpty: {
                            message: '标题不能为空'
                        }
                    }
                }, 

                link: {
                    validators: {
                        notEmpty: {
                            message: '谣言链接不能为空'
                        }, 
                        regexp: {
                            // regexp: /^((http){1} | (https){1}))+[a-zA-Z0-9]+[a-z]*)$/,
                            // message: '电话号码格式不对'
                        }
                    }
                }, 

                passageLink: {
                    validators: {
                        notEmpty: {
                            message: '谣言链接不能为空'
                        }
                    }
                },

                passageTitle: {
                    validators: {
                        notEmpty: {
                            message: '标题不能为空'
                        }
                    }
                },

                passagePhone: {
                    validators: {
                        notEmpty: {
                            message: '电话号码不能为空'
                        }, 
                        regexp: {
                            regexp: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
                            message: '电话号码格式不对'
                        }
                    }
                }
            }
        });
    });