import gulp from 'gulp';
import DIR, { PATH } from './Dir' // 해당 프로젝트 파일 경로 설정

import browserSync from 'browser-sync';

import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps'

import postcss from 'gulp-postcss';
import autoprefix from 'autoprefixer';
import cssminify from 'cssnano';

import sass from 'gulp-sass'
import del from 'del'

import spritesmith from 'gulp.spritesmith';
import merge from 'merge-stream';

import optimizeIMG  from 'gulp-image';

const server = () => {
	browserSync.init({
		server : {
			baseDir :  PATH.DIR.SRC,
		},
	});
}


const watchTask = () => {
	gulp.watch( PATH.DIR.SRC )
	.on('change', browserSync.reload);
	gulp.watch( PATH.SRC.CSS )
	.on('change', browserSync.reload);
	gulp.watch( PATH.SRC.SCSS , scss)
	.on('change', browserSync.reload);
}

const html = () => {
	gulp.src( PATH.SRC.HTML )
	.pipe(gulp.dest( PATH.DEST.HTML ))
}

const css = () => {
	gulp.src( PATH.SRC.CSS )
	.pipe( postcss([ 
		autoprefix, // 벤더프리픽스
		// cssminify, // CSS압축
	]))
	.pipe( gulp.dest( PATH.DEST.CSS ))
}

const scss = () => {
	return gulp
    .src( PATH.SRC.SCSS )
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(postcss([ autoprefix ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest( `${PATH.DIR.SRC}/css`))
    .pipe(gulp.dest( PATH.DEST.CSS ))
}

// let clean = () => {
// 	console.log('clean in');

// 	return new Promise(resolve => {
// 		del.sync(PATH.DIR.DEST);
// 		resolve();
// 	})
// }

const spriteIMG = () => {
	const spriteData = gulp
		.src( PATH.SRC.IMG )
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.css',
			padding: 8,
		}))

	const imgStream = spriteData.img
		.pipe(gulp.dest(PATH.DEST.IMG))

	const cssStream = spriteData.css
		.pipe(sourcemaps.init())
		.pipe(postcss([cssminify]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(PATH.DEST.CSS))

	return merge(imgStream, cssStream);
}


const imgminify = () => {
	gulp.src(PATH.SRC.IMG)
	.pipe( optimizeIMG() )
	.pipe( gulp.dest(PATH.DEST.IMG));
}

gulp.task( 'default', gulp.series(
		gulp.parallel(server, css , scss, html, watchTask ,spriteIMG, imgminify) 
	)
);
