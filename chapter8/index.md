Chapter08. Vue CLI 도구
======================
Vue CLI는 Vue.js 애플리케이션을 빠르게 개발할 수 있는 관련된 기능을 모두 제공하는 Vue.js 개발 도구이자 시스템.
> 뷰 코어팀에서 제공하는 일종의 터미널용 도구.Vue CLI를 사용하여 새로운 Vue 프로젝트를 쉽게 만들수 있다.

## 8.1 Vue CLI 구성요소와 설치
> 공식 README.md 에는 npm과 yarn을 모두 지원한다고 적혀있으나 npm으로 설치한 Vue CLI로 프로젝트를 만들더라도 yarn을 요구하므로 yarn이 미리 설치되어있어야함.(https://github.com/vuejs-kr/vue-cli - vuejs 한국 사용자 모임)

1. yarn 설치
```
npm install -g yarn
```

2. vue-cli 설치
```
npm install -g @vue/cli
# 또는
yarn global add @vue/cli
```
Vue CLI의 3가지 구성요소

### CLI : @vue/cli
> Vue 명령어로 실행할수 있도록함.
* 새로운 Vue 애플리케이션 프로젝트 생성할 수 있음
* Vue 단일 파일 컴포넌트를 설정 없이 실행하여 테스트할 수 있음
* GUI 환경으로 프로젝트를 생성하거나 관리할 수 있음

### CLI 서비스 : @vue/cli-service
> 웹팩과 웹팩개발서버 기반으로 작성.
* 프로젝트를 웹팩 개발 서버 기반으로 구동할 수 있음
* 프로젝트 소스코드와 리소스를 빌드하고 번들링할 수 있음
* 프로젝트의 소스를 테스트할 수 있음

### CLI 플러그인
>추가적인 기능을 제공하는 npm 패키지. 프로젝트 생성시 선택할수 있으며, 이후에도 vue add 명령어로 추가 가능.
* router
* vuex
* @vue/cli-plugin-babel(기본제공 플러그인)
* @vue/cli-plugin-eslint
* @vue/cli-plugin-unit-jest
* vue-cli-plugin-vuetify(커뮤니티 플러그인)

## 8.2 프로젝트 생성과 기본 사용법
### 8.2.1 프로젝트 생성
```
vue create [프로젝트명]
```
Vue CLI를 이용해 생성한 프로젝트 구조
1. src
개발자가 작성하는 소스 코드를 배치하는 디렉터리.

2. public
배포 버전을 빌드할 때 필요한 파일.
웹팩이라는 도구를 사용해 이 파일을 로드한 뒤 설정을 추가하여 빌드 버전을 만들어냄.

3. node_modules
앱 개발과 배포에 필요한 npm 패키지들이 저장되는 디렉터리.

4. dist
작성한 앱 코드를 빌드하여 만든 배포 버전을 저장하는 디렉터리.

### 8.2.2 명령어 기본 사용법
> [예제 08-01: package.json 의 스크립트]
```
{
  .....
  "script":{
    "serve":"vue-cli-service serve",
    "build":"vue-cli-service build",
    "lint":"vue-cli-service lint",
  }
  .....
}
```
```
yarn serve
# 또는
npm run serve
```

### 8.2.3 vue-cli-service 사용법
vue-cli-service는 Vue CLI 설치 시에 프로젝트 단위로 설치되는 실행 명령어.
> 만약 프로젝트 의존성으로 설치된 패키지들을 직섭 실행 하고 싶다면 npx라는 패키지를 설치하고 이용.
```
npm install -g npx
```

```
npx vue-cli-service [command] [option]
```
command는 실행하려는 작업(serve, build, lint, inspect를 지원)
* serve : 웹팩 개발 서버를 이용 프로젝트 코드 실행.
* build : 빌드하여 배포 버전의 소스코드를 생성.(dist 폴더)
* lint : eslint 기능을 이용 코드의 표준화 되지 않은 부분을 검사.
* inspect : 현재 프로젝트의 웹팩 설정 정보를 보여줌.

각 커맨드에 대한 상세한 정보는 옵션에 --help를 지정하소 실행해서 확인.
```
npx vue-cli-service serve --help
```
만약 개발서버를 구동하면서 웹브라우저를 자동으로 열고 싶다면 --open옵션을 추가.
> 예제 08-02 : serve 스크립트 옵션 변경
```
{
.....
"script" : {
  "serve" : "vue-cli-service serve --open --port 3000",
  "build" : "",
  ...
}
.....
}
```

## 8.3 플러그인
Vue CLI 를 이용해 기본 프리셋(default preset) 으로 생성한 프로젝트는 @vue/cli-plugin-bable, @vue/cli-plugin-eslint 등 여러 플러그인이 같이 설치되지만
그외에도 다양한 플러그인을 추가할 수 있음.
```
vue add [플러그인]
```
> 책에서는 vue-router를 설치 하지만 기본세팅으로 설치하면 이미 설치되어있음.

## 8.4 vue.config.js
Vue CLI의 내부는 웹팩(Webpack)이라는 모듈 번들러 도구를 이용하도록 만들어져 있지만 @vue/cli-service 는 모두 캡슐화 되어 있기 때문에
내부의 웹팩 설정 파일을 직접 설정할 수 없음.  
대신 웹팩 설정을 위해 vue.config.js 라는 파일을 프로젝트 내부에 작성.(<https://cli.vuejs.org/config>)

## 8.5 Vue CLI GUI 도구
터미널을 이용해 프로젝트를 생성하고 관리할 수 있지만 GUI도구를 지원하기도함.
```
vue ui
```
> 프로젝트 추가, 설치된 플러그인 확인, 플러그인 추가 가능
