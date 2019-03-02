//点击品牌代码，出来响应的列表
$("#listleft").find("#brand").click(function(){
	$(this).find("p").remove();
	var that=$(this);
	$.get("http://47.104.244.134:8080/goodsbytid.do",{"tid":13,"page":1,"limit":6},function(data1){
	 var str="";
	
	  for(var i=1;i<data1.data.length;i++){
		
		str+=`<p><a href="#">${data1.data[i].name}</a></p>`;
		
	}
	     $(that).append(str);
     
	
	});
	
})

//从接口获得数据，塞到div里
	$.get("http://47.104.244.134:8080/goodsbytid.do",{"tid":13,"page":1,"limit":13},function(data1){
	 var str1="";
	
	  for(var i=1;i<data1.data.length;i++){
		

		
			str1+=`<dl>
				 <dt>
				 	<a id="pro" proid=${data1.data[i].id} href="details.html"><img src=${data1.data[i].picurl} /></a>
				 </dt>
				 <dd>
				 <h4>${data1.data[i].name}</h4>
				 <p><span>价格为:￥${data1.data[i].price/100}</span><i>销量为:${data1.data[i].star}</i></p>
				 <input type="button" value="加入购物车" id="btn" data-id=${data1.data[i].id} />
				 </dd>
				 
				</dl>`;	
		
	/*	setCookie("proid",${data1.data[i].id},7);*/
		
		
	}
	    $("#product").append(str1);
   //点击相应的图片，把id存到cookie里面，在详情页面获得id展示对应的信息
    $("dl").find("dt").find("#pro").click(function(){
    	console.log($(this).attr("proid"));

	  setCookie("proid",$(this).attr("proid"),7);
	
	
})
    
   
   //点击加入购物车
      $("#product").find("dl").find("#btn").click(function(){
	

	if(getCookie("user")==null){
		
		$("#loginzero").show();
		
		
	}else{

		    for(var i in newobj){

       $("#logname").text("你好,"+newobj.name);

        }
		    //加商品加入购物车，同时数量增加
		/*    console.log(newobj.userid);//输出用户的token值,和商品的id一同传入后台
		    console.log($(this).attr("data-id"));//当前商品的id号*/
		    
		    $.get("http://47.104.244.134:8080/cartsave.do",
		          {"gid":$(this).attr("data-id"),"token":newobj.userid},
		          function(data){
		          	
		          	if(data.msg=="成功"){
		          		//购物车的数量加一
		          		count++;
		          	 newobj["num"]=count;
		          	  $("#cartnumber").show().text(count);
		          	   var aaobj=JSON.stringify(newobj);//将对象转换成json格式的字符串,存数据时解决[object,object]的问题
                    setCookie("user",aaobj,7);
		        
		          	}
		          	

		          });
		    
		    
		    
		    
	}
	
	
	
	
})

//点击关闭，弹出框消失
$("#close").click(function(){
	
			$("#loginzero").hide();
	
	
})

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
							 
							 location.href="list.html";
						}
			
 
    });
	
	
	
})

   
   
   
   
   
   
   
   
   
   
   
	
	})
	

