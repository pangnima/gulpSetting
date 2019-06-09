// Dir.js
let DIR = {
	SRC: 'source', // 작업을 진행할 폴더명입니다.
	DEST: 'AAAA', // 작업된 파일들을 컴파일하여 정리해두는 폴더입니다. 
};
// Object를 만들떄 상위 Javascript는 마지막 값의 끝에 콤마( , )가 있어도 오류를 뱉지않습니다.
// 이 파일에서 외부로 내보낼 정보를 Object로 만들어줍니다. 
module.exports = {
	PATH: {
		DIR: DIR, // 위에 생성한 DIR 변수를 대입하였습니다. 
		SRC: {
			JS: `${ DIR.SRC }/js/**/*.js`, // DIR.SRC + '/js/**/*.js' 와 같은 뜻 입니다.
			CSS: `${ DIR.SRC }/css/*.css`,
			SCSS: `${ DIR.SRC }/css/*.scss`,
			IMG : `${ DIR.SRC }/images/**/*.{png,jpg,gif}`,
			HTML: `${ DIR.SRC }/**/*.html`,
		},
		DEST: {
			JS: `${ DIR.DEST }/js`,
			CSS: `${ DIR.DEST }/css`,
			IMG : `${ DIR.DEST }/images/`,
			HTML: `${ DIR.DEST }/`,
			// SRC: `${ DIR.DEST }/`,
		}
	}
};

