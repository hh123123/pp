
//判断当前是否有人登录，如果有就写相应的名字，没得话，就写未登录

//获取cookie里的用户名
  if(getCookie("user")){
        	
        	var newobj=JSON.parse(getCookie("user"));//将字符串转换成对象
        	
        	//显示当前的购物车数量
             var count=0;
 	 $.get("http://47.104.244.134:8080/cartlist.do",{
		          		 	"token":newobj.userid
		          		 },function(data5){
		          		 
		          		 	 for(var i in data5){
		          		 		count+=data5[i].count;
		          		 	 }
		          	
		          	  //放到购物车上方的span里
		          	      newobj["num"]=count;
		  
		         //把count,存到用户的cookie中，方便在其它页面显示数量
		          	     var aaobj=JSON.stringify(newobj);//将对象转换成json格式的字符串,存数据时解决[object,object]的问题
                    setCookie("user",aaobj,7);
                      $("#cartnumber").show().text(newobj.num);
		          		 }
		        
		          		);


        }else{
        	
        	var newobj={};
        	   $("#logname").text("未登录");
        	  
        }
        for(var i in newobj){
        	
    
       $("#logname").text("你好,"+newobj.name);
        	
        	
        	
        }