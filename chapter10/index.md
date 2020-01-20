Chapter10. axios를 이용한 서버통신
======================

## 10.1 서비스 API 소개

공개된 연락처 서비스 API의 코드를 다운로드 하여 로컬 PC에서 실행할 수 있습니다. 아래 주소에서 다운로드 하세요
- http://github.com/stepanowon/contactsvc
- 다운로드한 코드는 README.md 파일에 소개한 대로 npm install, npm run start 명령어를 이용해 실행합니다.
 
### 연락처 서비스 API 목록

| api 목록 | 설명 |
|------|---|
| GET /contacts | 연락처 목록을 조회하며 특정 페이지 데이터를 조회할 수 있습니다. |
| GET /contacts/:no | 특정 일련번호 한 건의 연락처 정보르 조회합니다. |
| GET /contacts/search/:name | 일므의 일부를 이용해 연락처를 검색합니다. 2글자 이상부터 검색이 가능합니다. |
| POST /contacts | 새로운 연락처를 추가합니다. |
| PUT /contacts/:no | 기존 연락처 정보를 수정합니다. |
| DELETE /contacts/:no | 일련번호 정보를 이용해 연락처 정보를 추가합니다. |
| POST /contacts/batchinsert | 한 번에 여러 건의 연락처 정보를 추가합니다. |
| POST /contacts/:no/photo | 연락처에 저장하는 사람의 사진 정보를 등록합니다. |
| GET /contacts_long | GET /contacts와 동일한 기능이지만 1초의 의도적 지연 시간 후에 응답합니다. |
| GET /contacts_long/seatch/:name | GET /contacts/search/:name와 동일한 기능이지만 1초의 의도적 지연 시간 후에 응답합니다. |


## 10.2 axios 기능 테스트

axios를 테스트하기 위해 vue create 명령어를 이용해 contactsapp 이라는 별도의 프로젝트를 생성합니다.
기본 프리셋(default preset)으로 생성해주세요. 그리고 axios 라이브러리는 자동으로 설치되고 참조되지 않습니다. 반드시 추가적으로 설치해야 합니다.

```javascript
vue create contactsapp
cd contactsapp
yarn add axios  - 또는 - npm install --save axios
```

## 10.2.1 http 프록시 설정
vue.config.js 는 Vue CLI로 생성한 프로젝트에서 웹팩에 대한 기본 구성 설정을 추가하거나 변경할 수 있는 기능을 제공하는 파일 입니다. 이 파일을 이용하면 기본 설정은 vue-cli-service에 내장된 복잡한 설정을 그대로 둔 채로 추가적인 설정을 할 수 있습니다. vue.config.js 를 이용해 설정할 수 있는 내용은 https://cli.vuejs.org/config/ 를 참조하세요.

- 예제 10-01: vue.config.js 작성
```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://lacalhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```
> 이제 개발용 서버에 /api/contacts로 요청하면 http://lacalhost:3000/contacts 로 요청을 전달합니다. /api 경로로의 요청을 target으로 전달하는 것입니다. 만약 서버를 로컬PC에서 실행하지 않았다며 targe을 http://sample.bmaster.kro.kr 로 지정하세요. /api/contacts 요청은 http://sample.bmaster.kro.kr/contacts 로 요청될 것입니다.

## 10.2.2 axios 사용
현재 프로젝트 디렉터리에 axios 라이브러리를 다운
```javascript
yarn add axios -또는- npm install --save axios
```

>script 태그를 이용해 CDN 방식으로 직접 참조할 수도 있습니다. 
```javascript
<script src='https://unpkg.com/axios/dist/axios.min.js'></script>
```
- 다음은 axios를 이용하는 방법입니다.
```javascript
[저수준 API]
axios(config)
axios(url, config)
[각 메소드별 별칭]
axios.get(url[, config)
axios.delete(url[, config)
axios.post(url[, data[, config)
axios.put(url[, data[, config)
axios.head(url[, config)
axios.options(url[, config)
```
> 사용 방법을 예제를 통해 알아봅시다. 미리 만들어놓은 contactsapp 프로젝트의 src 디렉터리 아래 AppAxiosTest.vue 파일을 추가하고 기본 틀을 작성하겠습니다.
- 예제 10-02 : src/AppAxiosTest.vue
```javascript
<template>
    <div id="app">
        <div class="container">
            <div class="form-group">
                <button @click="fetchContacts">1페이지 연락처 조회</button>
            </div>
            <div  class="form-group">
                <input type="text" v-model="name" placeholder="이름을 입력합니다" />
                <input type="text" v-model="tel" placeholder="전화번호를 입력합니다" />
                <input type="text" v-model="address" placeholder="주소를 입력합니다" />
                <button @click="addContact">연락처 1건  추가</button>
            </div>
            <div  class="form-group">
                <input type="text" v-model="no" /> <button @click="fetchContactOne">연락처 1건  조회</button>
            </div>
            <div  class="form-group">
                <input type="text" v-model="no" />
                <input type="text" v-model="name" placeholder="이름을 입력합니다" />
                <input type="text" v-model="tel" placeholder="전화번호를 입력합니다" />
                <input type="text" v-model="address" placeholder="주소를 입력합니다" />
                <button @click="updateContact">수정</button>
            </div>
            <div class="form-group">
                <input type="text" v-model="no" /> <button @click="deleteContact">삭제</button>
            </div>
            <div class="form-group">
                <input type="text" v-model="no" />
                <input type="file" ref="photofile" name="photo" /> 
                <button @click="changePhoto">파일 변경</button>
            </div>
        </div>
        <span>JSON 출력</span>
        <div id="result" class="container">
            <xmp>{{result}}</xmp>
        </div>
    </div>
</template>

<script>
export default {
    name : "app",
    data() {
        return {
            no : 0, name : '', tel:'', address:'',
            result : null
        }
    },
    methods : {
        fetchContacts : function() {
           
        },
        addContact : function() {
           
        },
        fetchContactOne : function() {
           
        },
        updateContact : function() {
           
        },
        deleteContact : function() {
           
        },
        changePhoto : function() {
           
        }
    }
}
</script>

<style>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container { border:solid 1px gray; padding:10px; margin-bottom:10px; text-align:left; }
#result { text-align: left ; padding:20px; border:solid 1px black; }
.form-group { border:dashed 1px gray; padding:5px 5px 5px 20px; }
</style>
```
>파일을 작성했다면 App.vue 대신에 AppAxiosTest.vue 를 일시적으로 사용하도록 main.js 파일을 수정합니다.
- 예제 10-03 : src/main.js 변경
```javascript
import Vue from 'vue'
//import App from './App.vue'
import App from './AppAxiosTest.vue'

Vue.config.productionTip = false

new Vue ({
  render: h => h(App)
}).$mount('#app')
```
## 10.2.3 axios 요청 방법
>여러 건의 데이터를 조회하는 방법부터 알아보겠습니다. axios 저수준 API를 이용하는 예제부터 작성해보겠습니다. 아래 코드를 예제 10-02의 fetchContacts 메서드 내부에 삽입하세요.
```javascript
axios({
  method : 'GET',
  url : '/api/contacts',
  params : {pageno : 1, pagesize:5}
})
.then((response)) => {
  console.log(response);
  this.result = response.data;
})
.catch((ex)=> {
  console.log("ERROR!!!! : ", ex);
})
}
```
>axios 저수준 메서드의 특징은 모든 전달값을 config 객체로 전달한다는 점입니다. 다른 여러가지 옵션이 있지만 method, url, params 등의 간단한 정보만을 전달하여 GET/api/contacts?pageno=1&pagesize=5와 같은 요청을 처리해 보았습니다.

>axios API 호출 후 리턴되는 객체는 promise 객체입니다. 요청이 성공적이라면 then이 호출되며, 요청이 실패하면 catch가 호출됩니다. 예제 10-04를 별치 메서드 get을 이용하도록 변경하면 다음과 같습니다.

- 예제 10-05 : axios.get 메서드
```javascript
axios.get('api/contants', {
  params : {pageno:1, pagesize:5}
})
.then(...)
.catch(...)
```
>한 건의 연락처ㅣ를 조회하는 fetchContactOne 메서드 내부도 작성하겠습니다.
- 예제 10-06 : fetchContactOne 메서드
```javascript
axios.get('/api/contacts/'+this.no)
.then((reponse)=> {
  console.log(response);
  this.result = response.data;
})
```
## 10.2.4 axios 응답 형식
promise 객체의 then 메서드 내부에서의 함수 파라미터인 응답(response) 객체는 다양한 정보를 포함하고 있습니다. 가장 중요한 수신 데이터는 data 속성을 통해서 확인할 수 있습니다. 이 밖에도 전달 받는 나머지 속성들의 내용은 다음과 같습니다.
- config : 요청시에 사용된 config 옵션 정보
- headers : 응답 헤더 정보
- request : 서버와 통신 시에 사용된 XMLHttpRequest 객체 정보
- status : HTTP 상태 코드(HTTP Status Code)
- statusText : 서버 상태를 나타내느 문자열 정보

이 중에서 기본적으로 확인해야 하는 정보는 HTTP 상태 코드(status)입니다. 이 정보를 확인하여 서버에서 정상적으로 처리되었는지를 확인할 수 있습니다. 특히 응답 코드가 2XX가 아니라면 오류라고 판단할 수 있습니다. 기본적인 응답 코드의 의미는 다음과 같습니다.
- 2xx : 성공
- 3xx : 리다이렉션
- 4xx : 요청 오류(클라이언트 측 오류)
- 5xx : 서버 오류
## 10.2.5 기타 메서드
>POST 메서드에서는 주로 axios,post(url, data, config) 형태를 주로 사용. 다음 코드를 addContact 내부에 작성합니다.
- 예제 10-07 : axios.post 메서드
```javascript
axios.post('/api/contacts',
{name:this.name, tel:this.tel, addtess:this.address})
.then((reponse)=>{
  console.log(response);
  this.result = response.data;
  this.no = response.data.no;
})
.catch((ex)=>{
  console.log("ERROR!!!! : ", ex);
})
```
>PUT 메서드의 사용법은 POST와 유사합니다. updateContact 메서드 내부에 다음 코드를 삽입하세요.
- 예제 10-08 : axios.put 메서드
```javascript
axios.put('/api/contacts/'+this.no, {name:this.name, tel:this.tel, address:this.address})
.then((response)=>{
  console.log(response);
  this.name = '';
  this.tel = '';
  this.address = '';
  this.result = response.data;
})
.catch((ex)=>{
  console.log("ERROR!!!! : ", ex);
})
```
>삭제를 위해서는 DELETE 메서드를 사용할 수 있습니다. GET 메서드와 용법이 비슷합니다. deleteContact 메서드 내부에 다음 코드를 삽압하세요
- 예제 10-09 : axios.delete 메서드
```javascript
axios.delete('/api/contacts/'+this.no)
.then((response)=>{
  console.log(response);
  this.no = 0;
  this.result = response.data;
})
.catch((ex)=>{
  console.log("ERROR!!!! : ", ex);
})
```
## 10.2.6 파일 업로드 처리
웹페이지에서 다음 폼을 이용해 파일 업로드를 수행하는 기능이 존재한다고 가정하고 요청 코드를 작성합니다.
```javascript
<form method="post" enctype="multipart/form-data" action="/contacts/1491586656774/photo">
  <input type="file" name="photo">
  <input type="submit">
```
>axios 를 이용해서 파일 업로드 기능을 구현하기 위해서 <input type="file".../> 필드를 직접 참조해야 합니다. ref 옵션을 이용해서 이 필드를 직접 참조할 수 있습니다. changePhoto 메서드 내부에 다음 코드를 삽입하세요.
- 예제 10-10 : 파일 업로드 가능
```javascript
var data = new FormData();
var file = this.$refs.photofile.files[0];
data.append('photo', file);

axios.post('/api/contacts/'+this.no+'/photo',data)
.then((response)=>{
  this.result = response.data;
})
.catch((ex)=>{
  console.log('updatePhoto failed', ex);
})
```
>FormData 객체를 생성하고 this.$ref.pgotofile과 같이 ref 옵션을 이용해 파일 필드를 직접 참조합니다. 이 필드의 값을 FormData 객체에 추가한 뒤 서버로 요청하면 됩니다.

>yarn serve 명령을 이용해서 이제까지 작성한 코드를 실행해 보세요.

##10.2.7 axios 요청과 config 옵션
- baseURL : 이 옵션을 이용해 공통적인 URL의 앞부분을 미리 등록해두면 요청 시 나머지 부분만을 요청 URL로 전달하면 됩니다. 가능하다면 axios.defaults.baseURL 값을 미리 바꾸는 편이 좋습니다.
- transformRequest : 요청 데이터를 서버로 전송하기 전에 데이터를 변환하기 위한 함수를 등록합니다.
- transformResponse : 응답 데이터를 수신한 직후에 데이터를 변환하기 위한 함수를 등록합니다.
- headers : 요청 시에 서버로 전달하고자 하는 HTTP 헤더 정보를 설정합니다.

## 10.2.8 Vue 인스턴스에서 axios 이용하기
Vue 인스턴스 내부에서 axios를 이용하기 위해 Vue.prototype에 axios를 추가하면 더욱 간단하게 사용할 수 있습니다. main.js 에 다음 코드를 추가합니다.
- 예제 10-11 : src/main.js 변경
```javascript
import Vue from 'vue'
//import App from './App.vue'
import App from './AppAxiosTest.vue'
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

```
> 이제 Vue 인스턴스 내부에서는 axios를 import 하지 않고도 this.$axios를 사용할 수 있습니다. 예를 들어 AppAxiosTest.vue 파일을 fetchContactOne 메서드는 다음과 같이 this.$axios를 사용할 수 있습니다.
- 예제 10-12 :  fetchContactOne 메서드 변경 
```javascript
this.$axios.get('/api/contacts/'+this.no)
.then((response)=>{
  console.log(response);
  this.result = response.data;
})
```
## 10.2.9 axios 사용 시 주의 사항
axios 사용하면서 then()를 처리할 때는 ECMAScript6의 화살표 함수를 사용할 것을 권장. 데이터를 수신한 후에 Vue인스턴스 내부의 데이터를 변경해야 하는 경우가 많은데, 데이터 옵션을 액세스 하기 위해서는 this 객체가 Vue 인스턴스를 참조할 수 있어야 합니다. then()내부에서 화살표 함수를 사용하지 않으면 Closure 방식으로 접근해야 하는 불편함이 발생합니다.


## 10.3 연락처 애플리케이션 예제
axios + 동적 컴포넌트 + 이벤트 버스 기능을 결합해서 실직적인 연락처 애플리케이션을 만들어봅니다.

## 10.3.1 기초작업
- 예제 10-13 : src/main.js 변경
```javascript
import Vue from 'vue'
import App from './App.vue'
//import App from './AppAxiosTest.vue'
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

```
>이 예제에서 axios를 이용해 접근할 URL을 미리 상수로 정의해보았습니다. 이렇게 상수로 정의하면 URL이 변경되더라도 신속하게 유지보수할 수 있습니다. src 디렉터리 아래 Config.js 파일을 추가하고 다음과 같이 작성합니다.
- 예제 10-14 : src/Config.js
```javascript
var BASE_URL = "/api";

export default {
    PAGESIZE : 5,
    //자세한 API 도움말은 http://sample.bmaster.kro.kr 참조
    //전체 연락처 데이터 요청(페이징 포함)
    FETCH : BASE_URL + "/contacts",
    //연락처 추가
    ADD : BASE_URL + "/contacts",
    //연락처 업데이트
    UPDATE : BASE_URL + "/contacts/${no}",
    //연락처 한건 조회
    FETCH_ONE : BASE_URL + "/contacts/${no}",
    //연락처 삭제
    DELETE : BASE_URL + "/contacts/${no}",
    //연락처 사진 업로드->변경
    UPDATE_PHOTO : BASE_URL + "/contacts/${no}/photo"
}
```
>이제 이벤트 버스 객체를 작성합니다. EventBus는 .js 파일로 작성합니다. 아무 기능이 정의되지 않능 비어 있는 Vue 인스턴스를 생성해서 export하면 됩니다. src 디렉터리 아래에 EventBus.js 파일을 추가하고 다음과 같이 작성합니다.
- 예제 10-15 src/EventBus.js
```javascript

import Vue from 'vue';

var vm = new Vue({
  name : "EventBus"
});

export default vm;
```
>초기 설정 작업의 마무리로 컴포넌트 파일을 작성합니다. src/components 디렉터리에 다음 5개 컴포넌트 파일을 생성합니다.

| 컴포넌트 | 필요 데이터 |
|---------|----|
| App.vue | currenrtView:동적 컴포넌트로 보여줄 컴포넌트를 지정 |
| ContactList.vue | contactlist: 연락처 목록 데이터 |
| AddContact.vue | |
| UpdateContact.vue | contact : 연락처 한 건 데이터 |
| ContactForm.vue | mode : 쓰기/수정 여부('add'또는 'update') |
| UpdatePhoto.vue | contact : 연락처 한 건 데이터 |

>이 예제에서는 많은 연락처를 페이지를 나누어 볼 수 있도록 페이징 기능을 제공할 것입니다. 이를 위해 vuejs-paginate 패키지를 설치합니다.
```javascript
yarn add vuejs-paginate@1.9.3 bootstrap@3.3.7
- or -
npm install --save vuejs-paginate@1.9.3 bootstrap@3.3.7

```
>vuejs-paginate 패키지는 부트스트랩 CSS 파일을 필요로 하므로 src/main.js에서 부트스트랩 css 파일을 import해야 합니다. 또한 ie에서는 기본적으로 promise 객체를 지원하지 않습니다. axios는 promise 기반이기 때문에 ie에서 promise를 사용할 수 있도록 하려면 추가적인 별도의 polyfill 요소를 다운로드 하고 참조해야 합니다.
```javascript
yarn add es6-promise  -or-  npm install --save es6-promise
```
>src/main.js 파일을 열어서 es6-promise polyfill의 사용과 bootstrap을 참조하기 위해 코드를 변경합니다.
```javascript
import Vue from 'vue'
import App from './App.vue'
//import App from './AppAxiosTest.vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import ES6Promise from 'es6-promise'
ES6Promise.polyfill()

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

```
## 10.3.2 App.vue 작성
- 예제 10-16 : src/App.vue의 기본 골격
```javascript
<template>
  <div id="container">
      <div class="page-header">
         <h1 class="text-center">연락처 관리 애플리케이션</h1>
         <p>(Dynamic Component + EventBus + Axios) </p>
      </div>
      <component :is="currentView" :contact="contact"></component>
      <contactList :contactlist="contactlist"></contactList>
  </div>
</template>

<script>
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import UpdateContact from './components/UpdateContact';
import UpdatePhoto from './components/UpdatePhoto';
import CONF from './Config.js';
import eventBus from './EventBus.js';

export default {    
    name: 'app',
    components : { ContactList, AddContact, UpdateContact, UpdatePhoto },
    data: function() {
        return { 
            currentView : null, 
            contact : { no:0, name:'', tel:'', address:'', photo:'' },
            contactlist : {
                pageno:1, pagesize: CONF.PAGESIZE, totalcount:0, contacts:[]
            }
        }
    },
    mounted : function() {
      
    },
    methods : {
     
    }
}
</script>

<style scoped>
#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```
>메서드를 미리 정의합니다.

|메서드명|필요 인자|메서드 기능|
|--|--|--|
|pageChanged|page|보여줄 페이지를 변경함. data 속성의 contactlist 정보를 변경 후 fetchContacts 호출하도록 작성, paginate 컴포넌트에서 이 함수를 바인딩함|
|fetchContacts|pageno pagesize|전체 연락처 데이터를 페이징하여 조회함. pageno, pagesize는 data 속성의 contactlist 정보를 활용함|
|fetchContactOne|no|일련번호를 이용해 특정 연락처 한건을 조회함|
|addContact|contact|연락처 한 건을 추가함. contact는 객체임|
|updateContact|contact|연락처 한 건을 수정함. contact는 객체임|
|deleteContact|no|일련번호를 이용해 연락처 한 건을 삭제함|
|updatePhoto|no <br> file|일련번호와 파일 요소 정보를 이용해 사진 파일을 변경함|

- 예제 10-17 10-16의 methods 내부에 작성합니다.
```javascript
pageChanged : function(page) {
          this.contactlist.pageno = page;
          this.fetchContacts();
      },
      fetchContacts : function() {
          this.$axios.get(CONF.FETCH, {
              params : { 
                  pageno:this.contactlist.pageno, 
                  pagesize:this.contactlist.pagesize 
              } 
          })
          .then((response) => {
              this.contactlist = response.data;
          })
          .catch((ex)=> {
              console.log('fetchContacts failed', ex);
              this.contactlist.contacts = [];
          })
      },
      addContact : function(contact) {
        console.log("add!!")
          this.$axios.post(CONF.ADD,  contact)
          .then((response) => {
            if (response.data.status === "success") {
              this.contactlist.pageno = 1;
              this.fetchContacts();
            } else {
              console.log('연락처 추가 실패 : ' + response.data.message);
            }
          })
          .catch((ex)=> {
              console.log('addContact failed : ', ex);
          })
      },
      updateContact : function(contact) {
          this.$axios.put(CONF.UPDATE.replace("${no}", contact.no), contact)
          .then((response) => {
            if (response.data.status === "success") {
              this.fetchContacts();
            } else {
              console.log('연락처 변경 실패 : ' + response.data.message);
            }
          })
          .catch((ex) => {
              console.log('updateContact failed : ', ex);
          })
      },
      fetchContactOne : function(no) {
          this.$axios.get(CONF.FETCH_ONE.replace("${no}", no))
          .then((response) => {
              this.contact = response.data;
          })
          .catch((ex)=> {
              console.log('fetchContactOne failed', ex);
          })
      },
      deleteContact : function(no) {
          this.$axios.delete(CONF.DELETE.replace("${no}", no))
          .then((response) => {
            if (response.data.status === "success") {
              this.fetchContacts();
            } else {
              console.log('연락처 삭제 실패 : ' + response.data.message);
            }
          })
          .catch((ex) => {
              console.log('delete failed', ex);
          })
      },
      updatePhoto : function(no, file) {
          var data = new FormData();
          data.append('photo', file);
          this.$axios.post(CONF.UPDATE_PHOTO.replace("${no}", no), data)
          .then((response) => {
            if (response.data.status === "success") {
              this.fetchContacts();
            } else {
              console.log('연락처 사진 변경 실패 : ' + response.data.message);
            }
          })
          .catch((ex) => {
              console.log('updatePhoto failed', ex);
          });
      }

```
> 각 컴포넌트가 발생시켜 이벤트 버스를 통해 전달될 이벤트에 대한 부분을 생각해봅니다.
- App.vue 에서의 수신 이벤트

|이벤트 명|전달 인자|설명|
|---|---|---|
|addContantForm||연락처 추가 폼이 나타날 수 있도록 currentView를 addContect로 변경|
|editContactForm|no|변경폼에 기존 연락처 데이터가 나타날 수 있도록 no 인자를 이용해 fetchContactOne 메서드를 호출하고, 연락처 변경 폼이 나타날 수 있도록 currentView를 updateContact로 변경함|
|editPhoto|no|editContatForm 이벤트와 유사하게 no 인자를 이용해 fetchContactOne 메서드를 호출하고 currentView를 updatePhoto로 변경함|
|cancel||모든 입력폼에서 취소 버튼을 클릭했을 때 발생되는 이벤트, currentView를 null로 변경함|
|addSubmit|contact|연락처가 추가되는 이벤트, contact 객체를 받아서 addContact 메서드를 호출함. 연락처가 추가되면 입력폼은 사라져야 하므로 currentView를 null로 설정함|
|updateSubmit|contact|연락처가 수정되는 이벤트, updateContact 메서드를 호출함, 수정 폼은 사라지도록 currentView를 null로 설정함|
|updatePhoto|no <br> file|파일 정보가 존재할 때 updatePhoto 메서드를 호출하고 사진 변경 폼이 사라질 수 있도록 currentView를 null로 설정함|
|deleteContact|no|no를 이용해 deleteContact 메서드를 호출함|
|pageChanged|page|page 번호를 이용해 페이지를 이동시키도록 pageChanged 메서드를 호출함|

>이벤트 수신 기능은 mounted 이벤트 훅에 작성합니다. 처음 실행되었을 때 첫번째 페이지 데이터가 나타날 수 있도록 fetchContacts 메서드를 한번 호출하는 것 잊지마세요
```javascript
this.fetchContacts();
      eventBus.$on("cancel", () => {
          this.currentView = null;
      });
      eventBus.$on("addSubmit", (contact) => {
          this.currentView = null;
          this.addContact(contact);
      });
      eventBus.$on("updateSubmit", (contact) => {
          this.currentView = null;
          this.updateContact(contact);
      });
      eventBus.$on("addContactForm", () => {
          this.currentView = 'addContact';
      });
      eventBus.$on("editContactForm", (no) => {
          this.fetchContactOne(no)
          this.currentView = 'updateContact';
      });
      eventBus.$on("deleteContact", (no) => {
          this.deleteContact(no);
      });
      eventBus.$on("editPhoto", (no) => {
          this.fetchContactOne(no)
          this.currentView = 'updatePhoto';
      });
      eventBus.$on("updatePhoto", (no, file) => {
          if (typeof file !=='undefined') {
              this.updatePhoto(no, file);
          }
          this.currentView = null;
      });
      eventBus.$on("pageChanged", (page)=> {
        this.pageChanged(page);
      })   
```
## 10.3.3 ContactList.vue 작성
App.vue로 부터 contactlist 데이터 속성을 props로 전달받아 화면을 구성합니다. 또한 이 화면에서는 다음과 같은 이벤트가 발생합니다. 이벤트가 발생하면 이벤트 버스 객체를 통해 $emit()를 호출하여 App.vue로 전달합니다.
-contactlist.vue에서 발생시킬 이벤트
|이벤트|전달 인자|설명|
|--|--|--|
|addContactForm||'새 연락처 추가'버튼을 클릭했을 때 입력폼을 나타내기 위한 이벤트|
|editContactForm|no|조회하고 있는 연락처 리스트 중에서 편집 버튼을 누른 연락처의 no 필드값을 인자로 전달하여 연락처 수정 폼을 나타내기 위한 이벤트|
|deleteContact|no|일련번호를 이용해 삭제하기 위한 이벤트|
|editPhoto|no|조회하고 있는 연락처 리스트에서 사진을 클릭했을 때 no 필드 값을 전달하여 사진 변경 폼을 나타내기 위한 이벤트|
|pageChanged|page|ConteactList.vue 컴포넌트에서 사용하는 vuejs-paginate 컴포넌트에서 페이지가 바뀌면 App.vue 로 알려서 처리하기 위한 이벤트|

- 예제 10-19 : src/components/ContactList.vue
```javascript
<template>
    <div>
    <p class="addnew">
        <button class="btn btn-primary" @click="addContact()">
            새로운 연락처 추가하기</button>
    </p>
    <div id="example">
    <table id="list" class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>이름</th><th>전화번호</th><th>주소</th>
                <th>사진</th><th>편집/삭제</th>
            </tr>
        </thead>
        <tbody id="contacts" >
            <tr v-for="contact in contactlist.contacts" :key="contact.no">
                <td>{{contact.name}}</td>
                <td>{{contact.tel}}</td>
                <td>{{contact.address}}</td>
                <td><img class="thumbnail" :src="contact.photo" 
                    @click="editPhoto(contact.no)" /></td>
                <td>
                    <button class="btn btn-primary" 
                        @click="editContact(contact.no)">편집</button>
                    <button class="btn btn-primary" 
                        @click="deleteContact(contact.no)">삭제</button>
                </td>
            </tr>
        </tbody>
    </table>
    </div>  
        <paginate ref="pagebuttons"
            :page-count="totalpage"
            :page-range="7"
            :margin-pages="3"
            :click-handler="pageChanged"
            :prev-text="'이전'"
            :next-text="'다음'"
            :container-class="'pagination'"
            :page-class="'page-item'">
        </paginate>
    </div>
</template>

<script>
import eventBus from '../EventBus';
import Paginate from 'vuejs-paginate';

export default {
    name : 'contactList',
    components : { Paginate },
    props : [ 'contactlist' ],
    computed : {
        totalpage : function() {
            return Math.floor((this.contactlist.totalcount - 1) / this.contactlist.pagesize) + 1;
        }
    },
    watch : {
        ['contactlist.pageno'] : function() {
            this.$refs.pagebuttons.selected = this.contactlist.pageno-1;
        }
    },
    methods : {
        pageChanged : function(page) {
            eventBus.$emit("pageChanged", page);
        },
        addContact : function() {
            eventBus.$emit("addContactForm");
        },
        editContact : function(no) {
            eventBus.$emit("editContactForm", no)
        },
        deleteContact : function(no) {
            if (confirm("정말로 삭제하시겠습니까?") == true) {
                eventBus.$emit('deleteContact', no);
            }
        },
        editPhoto : function(no) {
            eventBus.$emit("editPhoto", no);
        }
    }
}
</script>

<style scoped>
.addnew { margin:10px auto; max-width: 820px;  min-width: 820px;
    padding:40px 0px 0px 0px; text-align: left; }
#example { margin:10px auto; max-width: 820px; min-width: 820px;
    padding:0px; position:relative; font: 13px "verdana"; }
#example .long{ width: 100%; }
#example .short{ width: 50%; }
#example input, textarea, select{ box-sizing: border-box;
    border:1px solid #BEBEBE; padding: 7px; margin:0px;
    outline: none;  }
#list  { width: 800px; font: 13px "verdana";  }
#list thead tr { color:yellow; background-color: purple; }
#list th:nth-child(5n+1), #list td:nth-child(5n+1) { width:200px; }
#list th:nth-child(5n+2), #list td:nth-child(5n+2) { width:150px; }
#list th:nth-child(5n+3), #list td:nth-child(5n+3) { width:250px; }
#list th:nth-child(5n+4), #list td:nth-child(5n+4) { width:60px; }
#list th:nth-child(5n), #list td:nth-child(5n) { width:150px; }
#list th { padding:10px 5px 10px 5px; }
#list tr { border-bottom: solid 1px black; }
#list td, #list th {  text-align:center; vertical-align:middle; }
img.thumbnail { width:48px; height: 48px; margin-top: auto; 
    margin-bottom: auto; display: block; cursor:pointer; }
</style>
```
> App.vue 컴포넌트에 console.log()메서드를 이용해 브라우저의 개발자도구 콘솔에 출력하는 코드를 작성했습니다. vue CLI로 생성한 프로젝트는 ESLint 기능에 의해 console 출력을 제한하고 있습니다. 콘솔을 사용할 수 있도록 package.json 에 다음 설정을 추가해주시고 yarn serve 명령어로 실행해주세요.
- 예제 10-20 : package.json에 console 사용 허가 설정
```javascript
{
  .....
"eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules": {
      "no-console": "off"
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
.....
}
```
## 10.3.4 입력폼, 수정폼 작성
ContactForm.vue 에서는 mode 값을 이용해 입력 폼을 보여줄지 수정 폼을 보여줄지를 결정합니다.
- 예제 10-21 : src/components/AddContact.vue
```javascript
<template>
    <contactForm mode="add" />
</template>

<script>
import ContactForm from './ContactForm.vue';
export default {
    name : "addContact",
    components : { ContactForm }
}
</script>
```
- 예제 10-22 : src/components/UpdateContact.vue
```javascript
<template>
    <contactForm mode="update" :contact="contact" />
</template>

<script>
import ContactForm from './ContactForm.vue';
export default {
    name : "updateContact",
    components : { ContactForm },
    props : [ 'contact' ]
}
</script>
```
>AddContact.vue 와 UpdateContact.vue 컴포넌트는 연락처 한 건의 정보를 props를 통해 전달하느냐 전달하지 않느냐의 차이가 있습니다. UpdateContact.vue 컴포넌트는 예제 10-22의 2행과 같이 App.vue로부터 전달받은 속성을 ContactForm.vue에 다시 전달합니다. ContactForm.vue는 mode가 'update'인 경우에 contact 속성을 전달받아 화면에 뿌려주고 값을 수정하게 됩니다. ContctForm.vue를 작성하여 마무리합니다.
-예제 10-23 :src/components/ContactForm.vue
```javascript
<template>
<div class="modal">
    <div class="form" @keyup.esc="cancelEvent">
        <h3 class="heading">:: {{headingText}}</h3>
        <div v-if="mode=='update'"  class="form-group">
            <label>일련번호</label>
            <input type="text" name="no" class="long" disabled v-model="contact.no" />
        </div>
        <div class="form-group">
            <label>이름</label>
            <input type="text" name="name" class="long" v-model="contact.name" 
                ref="name" placeholder="이름을 입력하세요" />
        </div>
        <div class="form-group">
            <label>전화번호</label>
            <input type="text" name="tel" class="long" v-model="contact.tel" 
                placeholder="전화번호를 입력하세요" />
        </div>
        <div class="form-group">
            <label>주 소</label>
            <input type="text" name="address" class="long" v-model="contact.address" 
                placeholder="주소를 입력하세요" />
        </div>
        <div class="form-group">
            <div>&nbsp;</div>
            <input type="button" class="btn btn-primary" 
                v-bind:value="btnText" @click="submitEvent()" />
            <input type="button" class="btn btn-primary" 
                value="취 소" @click="cancelEvent()" />
        </div>
    </div>
</div>
</template>

<script>
import eventBus from '../EventBus.js';
export default {
    name : "contactForm",
    props : { 
        mode : { type:String, default:'add' },
        contact : {
            type : Object,
            default : function() {
                return { no:'', name:'', tel:'', address:'', photo:'' }
            }
        }
    },
    mounted : function() {
        this.$refs.name.focus()
    },
    computed : {
        btnText : function() {
            if (this.mode != 'update') return '추 가';
            else return '수 정';
        },
        headingText : function() {
            if (this.mode != 'update') return '새로운 연락처 추가';
            else return '연락처 변경';
        }
    },
    methods : {
        submitEvent : function() {
            if (this.mode == "update") {
                eventBus.$emit("updateSubmit", this.contact)
            } else {
                eventBus.$emit("addSubmit", this.contact);
            }
        },
        cancelEvent : function() {
            eventBus.$emit("cancel");
        }
    }
}
</script>

<style scoped>
.modal { display: block; position: fixed; z-index: 1; 
    left: 0; top: 0; width: 100%; height: 100%;
    overflow: auto; background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); }
.form { background-color: white; margin:100px auto;
    max-width: 400px; min-width: 200px; font: 13px "verdana";
    padding: 10px 10px 10px 10px;  }
.form div { padding: 0;  display: block;  margin: 10px 0 0 0; }
.form label{ text-align: left; margin:0 0 3px 0;  padding:0px;
    display:block; font-weight: bold; }
.form input, textarea, select { box-sizing: border-box;
    border:1px solid #BEBEBE; padding: 7px; margin:0px;
    outline: none;  }
.form .long { width: 100%; }
.form .button{ background: #2B798D; padding: 8px 15px 8px 15px;
    border: none; color: #fff; }
.form .button:hover { background: #4691A4; }
.form .heading { background: #33A17F; font-weight: 300;
    text-align: left; padding : 20px; color: #fff;
    margin:5px 0 30px 0; padding: 10px; min-width:200px;
    max-width:400px; }
</style>
```
## 10.3.5 사진 변경폼 작성
UpdatePhoto.vue 컴폼넌트를 작성합니다. 이 컴포넌트는 연락처 목록의 섬네일 사진을 클릭하면 현재 사진을 확인한고 사진 파일 업로드하여 변경할 수 있는 폼을 제공합니다.
- 예제 10-24 : src/components/UpdatePhoto.vue
```javascript
<template>
<div class="modal">
    <div class="form" @keyup.esc="cancelEvent">
        <form method="post" enctype="multipart/form-data">
        <h3 class="heading">:: 사진 변경</h3>
        <input type="hidden" name="no" class="long" disabled v-model="contact.no" />
        <div>
            <label>현재 사진</label>
            <img class="thumb" :src="contact.photo" />
        </div>
        <div>
            <label>사진 파일 선택</label>
            <label>
                <input ref="photofile" type="file" name="photo" 
                    class="long btn btn-default" />
            </label>
        </div>
        <div>
            <div>&nbsp;</div>
            <input type="button" class="btn btn-primary" value="변 경" 
                @click="photoSubmit()" />
            <input type="button" class="btn btn-primary" value="취 소" 
                @click="cancelEvent" />
        </div>
        </form>
    </div>
</div>
</template>

<script>
import eventBus from '../EventBus.js';
export default {
    name : "updatePhoto",
    props : [ 'contact' ],
    methods : {
        cancelEvent : function() {
            eventBus.$emit('cancel');
        },
        photoSubmit : function() {
            var file = this.$refs.photofile.files[0];
            eventBus.$emit('updatePhoto', this.contact.no, file);
        }
    }
}
</script>

<style scoped>
.modal { z-index:10; display: block;  position: fixed;  z-index: 1; 
    left: 0; top: 0; width: 100%; height: 100%; overflow: auto; 
    background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);  }
.form { z-index:10;  background-color: white;  margin:100px auto;
    max-width: 400px;  min-width: 200px;  padding: 10px 10px 10px 10px;
    font: 13px "verdana"; }
.form div { padding: 0; display: block; margin: 10px 0 0 0; }
.form label{ text-align: left; margin:0 0 3px 0; padding:0px;
    display:block; font-weight: bold; }
.form input, textarea, select { box-sizing: border-box; 
    border:1px solid #BEBEBE; padding: 7px; margin:0px;
    outline: none;  }
.form .long { width: 100%; }
.form .heading { background: #33A17F; font-weight: 300;
    text-align: left; padding : 20px; color: #fff;
    margin:5px 0 30px 0; padding: 10px; min-width:200px;
    max-width:400px; }
img.thumb { width:160px; } 
</style>
```

## 10.4 정리
> 이번 장 에서 사용한 기법을 정리하면 다음과 같습니다.
- 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하기 위해 props를 사용합니다.
- 데이터가 위치한 곳에 데이터를 변경하는 메서드를 중앙집중화하여 배치합니다.
- 다른 컴포넌트로 이벤트 정보를 전달하기 위해 이벤트 버스 객체를 사용합니다.
- 동적 컴포넌트를 이용해 < component > 위치에 여러 컴포넌트를 나타낼 수 있도록 합니다.
