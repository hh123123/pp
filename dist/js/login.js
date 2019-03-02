//头部下拉
 $("#guanzhu li").hover(function(){
	$(this).find("div").show();
	$(this).find("a").css({"color":"#999"});
	
	
},function(){
	$(this).find("div").hide();
	$(this).find("a").css({"color":"#fff"});
});


//公告下拉通知
$(".item").eq(1).hover(function(){
	$(this).find("#itemselect").show();
},function(){
	$(this).find("#itemselect").hide();
});





//如果用户名和密码为空，提示请输入

$("#name").blur(function(){
	if($(this).val().length==0){
		$("#usernum").show();
	}else{
		$("#usernum").hide();
	}

})
$("#psw").blur(function(){
	if($(this).val().length==0){
		$("#pswnum").show();
	}else{
		$("#pswnum").hide();
	}
	
	
})

//点击登录，如果成功，则跳转到主页面，如果登录不成功，提示用户名或密码错误，请重新输入
$("#sub").click(function(){
	console.log("aa");
	
 $.post("http://47.104.244.134:8080/userlogin.do",{"name":$("#name").val(),"password":$("#psw").val()},function(data){
						console.log(data);
						if(data.msg=="OK"){
					
							/*  console.log(data.data.token);//当前用户的token值
							  console.log($("#name").val());//当前的用户名*/
							  var obj={};
							  obj.name=$("#name").val();
							  obj.userid=data.data.token;
					
							 var aobj=JSON.stringify(obj);//将obj转换成字符串
							
							 setCookie("user",aobj,7);
							 
							 location.href="index.html";
						}
			
 
    });
	
	
	
});