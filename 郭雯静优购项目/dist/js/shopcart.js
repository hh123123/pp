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
//获得购物车的详细信息
if(getCookie("user")){
	
	 	var obj=JSON.parse(getCookie("user"));//将字符串转换成对象
	$.get("http://47.104.244.134:8080/cartlist.do",{"token":obj.userid},
	function(data){
		
		
		console.log(data);
		var str="";
		for(var i in data){
			/*console.log(data[i].goods.name);//商品的名字
			console.log(data[i].goods.picurl);//商品的路径
			console.log(data[i].goods.price);//商品的单价
			console.log(data[i].count);//商品的数量*/
			var sum=parseFloat(data[i].goods.price/100*data[i].count).toFixed(1);//商品的总价
			console.log(sum);
			str+=`
				<tr id="cartshow">
				<td   id="selfirst">
				 <input gid=${data[i].gid} pid=${data[i].id}  class="selectbox" type="checkbox"/>
				</td>
				<td id="proname">
				<img src="${data[i].goods.picurl}"/>
				<span>${data[i].goods.name}</span>
				</td>
				<td id="price">${data[i].goods.price/100}</td>
				 <td id="numcontrol">
				 	<span gid=${data[i].gid} pid=${data[i].id} id="del1">-</span>
				 	<input type="text" value=${data[i].count} />
				 	<span gid=${data[i].gid} pid=${data[i].id} id="add1">+</span>
				 </td>
					<td id="pronum">${sum}</td>
					<td><input type="button" gid=${data[i].gid} pid=${data[i].id} value="删除" id="delbtn"/></td>
				</tr>

			`;
			
			
		}
  $("#addshopcart").append(str);
/*  var count=0;
  $("#totalmoney").find("i").text(count);//开始总计的初始值*/
  
  //计算总价格的函数

function getTotalMoney(){
     	var money=0;
          $(".selectbox").each(function(){
             	
           if(this.checked){
    	
    	      money+=Number($(this).parent().parent().find("#pronum").text());
    
    		}
            
              $("#totalmoney").find("i").text(parseFloat(money).toFixed(1));
                
             
             })
          if($(".selectbox").length==0){
          	

          	  $("#totalmoney").find("i").text(0);
          	
          	
          }
          
           
	       

}
    		
 //全部选中时  		
    		
    $("#cartshop ,#operate").find("input:checkbox").click(function(){
	
		if(this.checked){

		   $("input:checkbox").each(function(){

			$(this).prop({"checked":true});
        
			})
		    getTotalMoney();
		
		}else{
			 
			   $("input:checkbox").each(function(){

			$(this).prop({"checked":false});
        
			})
		    getTotalMoney();
		
			
		}
		
		
	});
    	
    	
    	
    	
  
  

 //每个复选框被选中时
 
 
  $(".selectbox").click(function(){

  
    
  	  getTotalMoney();
  
  	
  
  })
 

	//点击每个加时，控制数量

       $("#addshopcart #cartshow").find("#add1").click(function(){
     
            var $that=$(this);
      
      	$.get("http://47.104.244.134:8080/cartupdate.do",
       	{"id":$(this).attr("pid"),"gid":$(this).attr("gid"),
       	"num":1,"token":obj.userid},function(data){
       		
       	     var num1=$that.parent().find("input").val();
       	     num1++;
       		$that.parent().find("input").val(num1);
       		//变化上面的值
       		
       		 $.get("http://47.104.244.134:8080/cartlist.do",{
		          		 	"token":newobj.userid
		          		 },function(data5){
		          		         count=0;
		          		 	 for(var i in data5){
		          		 		count+=data5[i].count;
		          		 	 }      	
		         	  //放到购物车上方的span里
		          	      newobj["num"]=count;
		  
		         //把count,存到用户的cookie中，方便在其它页面显示数量
		          	     var aaobj=JSON.stringify(newobj);//将对象转换成json格式的字符串,存数据时解决[object,object]的问题
                    setCookie("user",aaobj,7);
                      $("#cartnumber").show().text(count);
                     /* sum=parseInt(data[i].goods.price*data[i].count);*/
                      var price1=$that.parent().parent().find("#price").text();
                 
                   $that.parent().parent().find("#pronum").text(parseFloat(num1*price1).toFixed(1)); 
                      
                      if($that.parent().parent().find(".selectbox").is(":checked")){
                      	
        
  	                         getTotalMoney();
                      	
                      }
                      
		          		 });
       		
       	})
       })
       
       //点击每个减时
    
       $("#addshopcart #cartshow").find("#del1").click(function(){
       	   var $that=$(this);
      	$.get("http://47.104.244.134:8080/cartupdate.do",
       	{"id":$(this).attr("pid"),"gid":$(this).attr("gid"),
       	"num":-1,"token":obj.userid},function(data){
            var num1=$that.parent().find("input").val();
       	     num1--;
       	     if(num1==0){
       	     	var flag=confirm("确定删除此商品吗?");
       	     	if(flag==true){
       	     		
       	     		
       	   $.get("http://47.104.244.134:8080/cartupdate.do",
       	{"id":$that.attr("pid"),"gid":$that.attr("gid"),
       	"num":0,"token":obj.userid},function(data){

       		$that.parent().parent().remove();//删除相应的标签
       		
       	})
       	     		
       	     	}

       	     }
       		$that.parent().find("input").val(num1);
       		//变化上面的值
       		 $.get("http://47.104.244.134:8080/cartlist.do",{
		          		 	"token":newobj.userid
		          		 },function(data5){
		          		         count=0;
		          		 	 for(var i in data5){
		          		 		count+=data5[i].count;
		          		 	 }      	
		         	  //放到购物车上方的span里
		          	      newobj["num"]=count;
		  
		         //把count,存到用户的cookie中，方便在其它页面显示数量
		          	     var aaobj=JSON.stringify(newobj);//将对象转换成json格式的字符串,存数据时解决[object,object]的问题
                    setCookie("user",aaobj,7);
                      $("#cartnumber").show().text(count);

                        var price1=$that.parent().parent().find("#price").text();
                     
                   $that.parent().parent().find("#pronum").text(parseFloat(num1*price1).toFixed(1)); 
                             if($that.parent().parent().find(".selectbox").is(":checked")){
                      	

  	                         getTotalMoney();
                      	
                      }
            
                             
                             
                      
		          		 });
		       
                         		 
		          		 
  
       	})
       });
		
	   //点击每个商品的删除时
	  $("#addshopcart #cartshow").find("#delbtn").click(function(){
             var $that=$(this);
             var flag=confirm("确认删除吗?");
             if(flag==true){
             	
             	
         $.get("http://47.104.244.134:8080/cartupdate.do",
       	{"id":$(this).attr("pid"),"gid":$(this).attr("gid"),
       	"num":0,"token":obj.userid},function(data){
       	  if(data.msg=="成功"){
       	  	
       	  	$that.parent().parent().remove();//删除相应的标签
       	  	   getTotalMoney();
       	  	//改变相应的标签span
       	  	 $.get("http://47.104.244.134:8080/cartlist.do",{
		          		 	"token":newobj.userid
		          		 },function(data5){
		          		       count=0;
		          		 	 for(var i in data5){
		          		 		count+=data5[i].count;
		          		 	 }
		  
                      $("#cartnumber").show().text(count);
		          		 });
       	  	
       	  }


       	})
	  	
             
             }
	  	  
	  	
	  	
	  })
	  
	  
	  
	  //删除所有被选中的
	  
	  function delselectall(){

	  	  var flag=confirm("确认删除吗?");
		   $(".selectbox").each(function(){
		  
		   	 if(this.checked){
		   	 	
	
		    
       		   
       		      	if(flag==true){
       		      		
       		    var $that=$(this);
           $.get("http://47.104.244.134:8080/cartupdate.do",
       	  {"id":$(this).attr("pid"),"gid":$(this).attr("gid"),
       	  "num":0,"token":obj.userid},function(data){
       		         
       		
       		     if(data.msg=="成功"){
       		     	 	
       		  $that.parent().parent().remove();//删除
       		       getTotalMoney();
       		     }
       		      	
		   	 	})
       		      		
       		      	}

		   	 }

		   })
			

	  }
	  
	  
		
		//点击可以选择产品的删除时
		
		$("#delall").click(function(){
			
			delselectall();
			
			
		})
		
		//点击清空购物车
		
		$("#clear").click(function(){
		
		$("input:checkbox").prop("checked",true);
		     
		     		delselectall();
		     		var flag1=confirm("购物车为空，请前去添加");
		     		if(flag1){
		     			location.href="list.html";
		     		}
		     		
			
		})
		
		//点击继续购物时
		
		$("#buyagain").click(function(){
			
			
			location.href="list.html";
		
		});
		
		
		
		
	}
)
}

