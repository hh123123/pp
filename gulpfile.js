//gulp的配置文件
var gulp = require("gulp");//加载gulp模块
var connect = require("gulp-connect");//服务器模块
var sass = require("gulp-sass");//将sass文件转换成css文件的模块
var sourcemaps = require('gulp-sourcemaps');//让编译后的文件和源文件的关联的模块
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
//调用gulp的task方法创建任务
gulp.task("hello",function(){
	console.log("hello world");
});
//一个默认任务
/*gulp.task("default",function(){
	console.log("default task");
});*/

//有多个任务 [任务名1,任务名2，……]
//gulp.task("default",["hello"]);

gulp.task("copyIndex",function(){
	gulp.src("*.html").pipe(gulp.dest("dist")).pipe(connect.reload());
});
gulp.task("copyImg",function(){
	gulp.src("img/*.{png,jpg,gif}").pipe(gulp.dest("dist/img"));
});
gulp.task("copyData",function(){
	gulp.src("json/*.json").pipe(gulp.dest("dist/data"));
});

gulp.task("watch",function(){
	gulp.watch("*.html",["copyIndex"]);
	gulp.watch("img/*.{png,jpg,gif,mp4}",["copyImg"]);
	gulp.watch("json/*.json",["copyData"]);
	gulp.watch("sass/*.scss",["sass"]);
	gulp.watch("js/*.js",["jss"]);
});

gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css")).pipe(connect.reload());;
});
gulp.task("concat",function(){
	gulp.src(["js/a.js","js/b.js"])
	.pipe(concat("mix.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename("mix.min.js"))
	.pipe(gulp.dest("dist/js"));
});
gulp.task("jss",function(){
	gulp.src(["js/*.js"])
	.pipe(gulp.dest("dist/js")).pipe(connect.reload());
	

});
gulp.task("babel",function(){
	gulp.src("js/test.js")
	 .pipe(babel({presets:["es2015"]}))  
	.pipe(gulp.dest("dist/js"));
})


gulp.task('server',function(){ 
	connect.server({
		root:'dist',
		livereload:true
		});
})  



gulp.task("default",["server","watch"]);









