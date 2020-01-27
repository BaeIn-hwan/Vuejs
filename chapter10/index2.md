##  axios 기본 세팅하기

1. answer2에서 cmd창을 켠다
2. vue create 이름  // 파일생성하기
3. cd 이름            //해당 파일로 넘어간다 (cd 는 폴더 이동)
4. npm install --save axios // axios 다운로드한다.
5. npm run serve // 시작!



# 추가 세팅
1. 콘솔제거 - package.json 
- "eslintConfig" 안에 "rules": {"no-console": "off"} 를 추가한다.
```javascript
 "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    //no-console:off 추가
    "rules": {
      "no-console": "off"
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },

```

2. Vue.prototype 으로 $axios 선언 - main.js 
```javascript
import Vue from 'vue'
import App from './App.vue'
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

# 10.2.9 axios 사용 시 주의 사항
axios 사용하면서 then()를 처리할 때는 ECMAScript6의 화살표 함수를 사용할 것을 권장. 데이터를 수신한 후에 Vue인스턴스 내부의 데이터를 변경해야 하는 경우가 많은데, 데이터 옵션을 액세스 하기 위해서는 this 객체가 Vue 인스턴스를 참조할 수 있어야 합니다. then()내부에서 화살표 함수를 사용하지 않으면 Closure 방식으로 접근해야 하는 불편함이 발생합니다.

