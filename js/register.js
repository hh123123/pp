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



$("form").find("div").find("input").change(function(){
	
 if($(this).val().length==0){
 	 $(this).parent().next().show();
 }else{
 	$(this).parent().next().hide();
 }
   
  //判断两次密码是否一致


	$("#psw1").change(function(){
	 if($("#psw").val()==$("#psw1").val()){
 		$("#psw2").show().html("两次密码一致");

 	
 	
 	
 }else{
 	console.log("bb");
 	$("#psw2").show().html("两次密码不一致，请重新输入");
 	
 }
	});
	

	
});


//判断用户名是否可用
$("#name").change(function(){
	
	$.get("http://47.104.244.134:8080/username.do",{"username":$(this).val()},function(data){
		
	       if(data.msg=="失败"){
	       		 $("#name").parent().next().show().html("此用户名可以使用");
	    
	       }else{
	       	   $("#name").parent().next().show().html("此用户名已被占用请重新输入");
	       }

	  });
	
	
	
});

//验证邮箱
$("#email").change(function(){
	
	
	$.get("http://47.104.244.134:8080/useremail.do",{"email":$(this).val()},function(data){
					
			    if(data.msg=="失败"){
	       		 $("#email").parent().next().show().html("此邮箱可以使用");
	    
	       }else{
	       	   $("#email").parent().next().show().html("此邮箱已被占用请重新输入");
	       }

	});
	
//注册
$("#sub").click(function(){
	
	
  $.post("http://47.104.244.134:8080/usersave.do",{"username":$("#name").val(),"password":$("#psw").val(),"email":$("#email").val(),"sex":"女"},function(data){
						console.log(data);
					
						
					
           });
	
})


});



