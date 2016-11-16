/*
* TASK LIST
* -build sass (transpile, source map)
* -build html (copy)
* -build js (transpile, source map)
* -lint js (report)
*/

var gulp = require("gulp"),
	sass = require("gulp-sass"),
	babel = require("gulp-babel"),
	sourcemaps = require("gulp-sourcemaps"),
	jshint = require("gulp-jshint");

gulp.task("default", ["watch"]);
gulp.task("build", ["build-js", "build-html", "build-sass", "jshint"]);

gulp.task("build-sass", function(){
	gulp.src("src/sass/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("dist"));
});

gulp.task("jshint", function(){
	return gulp.src("src/js/**/*.js")
		.pipe(jshint({
			esversion: 6
		}))
		.pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("build-js", function(){
	return gulp.src("src/js/**/*.js")
		.pipe(sourcemaps.init())
			.pipe(babel({presets: ["es2015"]}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dist"));
});

gulp.task("build-lib", function(){
	gulp.src("src/lib/*.js")
		.pipe(gulp.dest("dist"));
});

gulp.task("build-html", function(){
	gulp.src("src/html/*.html")
		.pipe(gulp.dest("dist"));
});

gulp.task("watch", function(){
	gulp.watch("src/js/**/*.js", ["jshint", "build-js"]);
	gulp.watch("src/sass/*.scss", ["build-sass"]);
	gulp.watch("src/html/*.html", ["build-html"]);
	gulp.watch("src/lib/*.js", ["build-lib"]);
});