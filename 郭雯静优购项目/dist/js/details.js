
//详情页获取信息
  var id=getCookie("proid");
$.get("http://47.104.244.134:8080/goodsbyid.do",{"id":id},function(data1){
    var str="";
    str=`
    
    			<div id="zoomarea">
			<div id="smallarea">
			<img src="${data1.picurl}"/>
		
				<div id="zoom"></div>
			</div>
		
			<div id="bigarea">
			<img src="${data1.picurl}"/>
			</div>
			
		</div>
		
		<div id="promsg">
			<h3>商品名称：
					<p>${data1.name}</p>
			</h3>
		
			<p class="price">价格为:￥${data1.price/100}</p>
			<span>数量为:</span><input type="text" id="pronum" value="1"/>
			<p id="numctrol">
				<img id="addnum" src="img/shang.png" />
				<img  id="delnum" src="img/xia.png" />
			</p>
			
			<br/>
			<input type="button" id="cartbtn"  data-id=${data1.id} value="加入购物车" />
			<input type="button" id="buybtn" data-id=${data1.id}  value="立即购买" />
			
		</div>

    `;
$("#procontent").append(str);
 
//点击加按钮,购物车数量增加
$("#addnum").click(function(){

	var a=$("#pronum").val();
	a++;
     if(a>10){
		a=10;
		alert("已超过当前库存量，不能再继续添加");
	}
	$("#pronum").val(a);

})

//点击减按钮,购物车数量减少
$("#delnum").click(function(){

	var a=$("#pronum").val();
	a--;
     if(a<=0){
		a=1;
		alert("最少数量为1");
	}
	$("#pronum").val(a);

})



//放大镜
var ozoomarea=document.getElementById("zoomarea");
			var ozoom=document.getElementById("zoom");
				var omidarea=document.getElementById("smallarea");
			var obigarea=document.getElementById("bigarea");
			var osmallimg=omidarea.children[0];
			var obigimg=obigarea.children[0];
				var cw=omidarea.clientWidth;
		    	var ch=omidarea.clientHeight;
			omidarea.onmouseover=function(){
				
				ozoom.style.display="block";
				obigarea.style.display="block";
				
			}
			omidarea.onmouseout=function(){
				
				ozoom.style.display="none";
				obigarea.style.display="none";
				
			}
			
		    omidarea.onmousemove=function(e){
		    	
		    	var evt=e||event;
		    	
		    	var sw=ozoom.offsetWidth;
		         var sh=ozoom.offsetHeight;
		    	var _left=evt.clientX-ozoomarea.offsetLeft-ozoom.offsetWidth/2;
		    	var _top=evt.clientY-ozoomarea.offsetTop-ozoom.offsetHeight/2;
		    	
		    	  _left=_left<= 0 ? 0:_left>=cw-sw?cw-sw:_left;
		    	   _top=_top<= 0 ? 0:_top>=ch-sh ? ch-sh:_top;
		    	   ozoom.style.left=_left+"px";
		    	   ozoom.style.top=_top+"px";
		    	   obigimg.style.left=-(_left/cw*obigimg.offsetWidth)+"px";
		    	   obigimg.style.top=-(_top/ch*obigimg.offsetHeight)+"px";
		    	   
		    }
		    

 //显示当前的购物车数量
 var count=0;
 if(getCookie("user")){
 	var newobj=JSON.parse(getCookie("user"));//将字符串转换成对象
 	
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
 	
 }
  
//点击加入购物车，如果当前没有登录，弹出登录框，购物车旁的计数也隐藏
  $("#cartbtn").click(function(){
	

	if(getCookie("user")==null){
		
		$("#loginzero").show();
		
		
	}else{

		    for(var i in newobj){

       $("#logname").text("你好,"+newobj.name);

        }
		    //加商品加入购物车，同时数量增加
		/*    console.log(newobj.userid);//输出用户的token值,和商品的id一同传入后台
		    console.log($(this).attr("data-id"));//当前商品的id号*/
		    //获得当前数量框的值
		    
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
							 
							 location.href="details.html";
						}
			
 
    });
	
	
	
})





















});

