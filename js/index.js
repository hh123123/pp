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




//首页下拉菜单
 $("#titlenav1 li").hover(function(){

 	$(this).find("a").css({
 		"text-decoration":"underline"
 	});
 $(this).find("div").slideDown(1000);



 },function(){
 	
 	$(this).find("a").css({
 		"text-decoration":"none"
 	});
 	/*$("#selectdiv div").eq($(this).index()-1).slideUp();*/
 $(this).find("div").hide();


  
 
 
 });
//滚动滚动条时，导航条固定
   $(window).scroll(function(){
   	
    if($(document).scrollTop()>=208){
   $("#titlenav").css({"position":"absolute",
   "top":$(document).scrollTop(),
      "z-index":30000,
   
   });
     $("#titlenav").addClass("addborder");
     $("#titlenav").find("#tlogo").show();
    
    }else{
				 	
    $("#titlenav").css({"position":"static"});
    $("#titlenav").find("#tlogo").hide();		 
     $("#titlenav").removeClass("addborder");
    }
   	
   	
   	
   	
   })


//轮播图
var ii=0;
var timer=null;



    function show(){
  	 if(ii==2){
		ii=0;
	}
    
     $(".lunbo").eq(ii).show().siblings().hide();
	console.log(ii, $(".lunbo").eq(ii))
	 $(".lunbo").eq(ii).addClass("num1").siblings().removeClass("num1");
	 ii++;
	
  	
  }
    clearInterval(timer);
   timer=setInterval(function(){
      show();
      console.log("aa");
  },2000);


  $("#bannernum span").hover(function(){
  	$(this).css({"cursor":"pointer"});
  	 clearInterval(timer);
  	 $(this).addClass("num1").siblings().removeClass("num1");
  	 $(".lunbo").eq($(this).index()).show().siblings().hide();
  	 ii=$(this).index()+1;
  	 timer=setInterval(function(){
  	 	 show();
  	 },2000)
  
  });
//点击产品时，加背景颜色和爱心
$("#centerlist li").mouseover(function(){
	
	$(this).css({
		"background":"#f1f1f1"
	})
	$(this).find(".price-wrap img").show();
	
})
$("#centerlist li").mouseout(function(){
	
	$(this).css({
		"background":0
	})
	$(this).find(".price-wrap img").hide();
})

//点击右箭头，滑动商品
var count=0;
 $("#prolist .right").click(function(){
 	count++;
     if(count>=2){
 		count=2;
 	}
 	$("#centerlist").animate({
      "left":-920*count
 	})
 
 	
 	
 })
 //点击左箭头,滑动商品
 
 $("#prolist .left").click(function(){
 	count--;
     if(count<=0){
 		count=0;
 	}
 	$("#centerlist").animate({
      "left":-920*count
 	})
 
 	
 	
 })
 
//商品鼠标经过添加遮挡层
$("#proshow1 li").mouseover(function(){
	
	
	$(this).find(".hoverimg").show();
})
$("#proshow1 li").mouseout(function(){
	
	
	$(this).find(".hoverimg").hide();
})

//点击右箭头，滑动图标
$("#smalogo .right").click(function(){
	console.log("aa");
	$("#smalogo2").animate({"left":-828});
	
})
//点击左箭头，滑动图标
$("#smalogo .left").click(function(){
	console.log("bb");
	$("#smalogo2").animate({"left":0});
	
})

//品牌资讯添加遮挡层
$("#fasdetail li").mouseover(function(){
	
	$(this).find("p").show();
	
})
$("#fasdetail li").mouseout(function(){
	
	$(this).find("p").hide();
	
})
//点击图片，播放音频

var  ovideo=document.getElementById("vid");
ovideo.onclick=function (){
	
	ovideo.controls="controls";
	ovideo.play();
	
}
//搜索框
var oval=document.getElementById("val");
var oserlist=document.getElementById("searchdetails");
oval.oninput=()=>{
	
	oserlist.style.display="block";
    var val = oval.value;
    var oScript=document.createElement("script");
		/*var src="https://www.yougou.com/ssc/suggest.sc?term="+val;
		oScript.src="https://www.yougou.com/ssc/suggest.sc?term="+val+"&callback=jsonp";*/
		oScript.src = "https://suggest.taobao.com/sug?code=utf-8&q=" + val + "&callback=jsonp&area=c2c";
	   document.body.appendChild(oScript);

	
}
function jsonp(data){
 		
	    var data1 = data.result;
		
				var str = "";
				for(var i = 0; i < data1.length; i++) {
					str += "<li><a href='https://s.taobao.com/search?q=" + data1[i][0] + "'>" + data1[i][0] + "</a></li>";
				}
				oserlist.innerHTML = str;
		

	
	
}
oval.onchange=function(){
	
		oserlist.style.display="none";
}



//分类获得数据,滑动一级菜单，得到二级菜单数据
var str;
var arr;
$("#titlenav11 li").mouseenter(function(){
	var $this = $(this);
	$.get("http://47.104.244.134:8080/goodstypelist.do",{"l":1},function(data1){
		str="";
		arr=[];
		for(var i in data1){
             arr.push(data1[i].id);
		  str+=`<li>
		 	 		<h3 data-id="${data1[i].id}">${data1[i].name}</h3>
		   		</li>`;
		
		}
		
		$this.find("div").html(str);
		
	  
	   	     
	   	   var $that=$this.find("div").find("h3");//改变指向

	   	$.get("http://47.104.244.134:8080/goodstypelist.do",{"l":2},function(data){
	   		
	 
	   		     for(var i=0;i<$that.length;i++){
	   		     	  var str1="";
	   		          for(var j in data){
	   	       
	   	      if($that[i].getAttribute("data-id")==data[j].parentid){
	   	 
	   	       	str1+=`<p><a href="list.html">${data[j].name}</a></p>`;
                  
	   	      }	
	   		      }
	   		          
	   		        $( $that[i]).parent().append(str1);
	   		     	
	   		     }
	   		        	
	   
	   		        	   
	   		      });
	   	   
				
 });
   	
  
	      
      });
      
      
      
      
 //点击零品，获得三级菜单,暂未解决
           
 
	$.get("http://47.104.244.134:8080/goodsbytid.do",{"tid":13,"page":1,"limit":5},function(data){
				
			console.log(data);
				
});

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
