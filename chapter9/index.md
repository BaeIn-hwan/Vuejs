Chapter09. 컴포넌트 심화
======================

## 9.1 단일 파일 컴포넌트

단일 파일 컴포넌트는 전역 수준 컴포넌트의 몇 가지 문제점을 해결하며, 전역 수준 컴포넌트의 문제점은 다음과 같다.
- 빌드 단계가 없으므로 ECMAScript 2015, TypeScript와 같은 최신 자바스크립트 문법을 사용할 수 없다.
- CSS를 지원하지 않는다.
- 컴포넌트의 템플릿이 작성될 때 HTML 파일 안에 여러개의 template 태그가 작성되어 식별하기 어렵다.
또한 템플릿마다 고유의 id를 부여하고 컴포넌트들도 고유한 이름을 지정해야 한다.


<6장 Todolistapp 애플리케이션을 Vue CLI로 스캐폴딩 코드 생성하기>

1. App.vue의 구조<br>
> 프로젝트 템플릿에 포함된 샘플코드로서 전체적인 골격은 template/script/style과 같이 3개의 영역으로 나누어짐 
다른 컴포넌트를 참조하여 사용할때는 import문을 이용한다. 

```javascript
<template>
    <div id="app">
        <img src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>
<script>
    import HelloWord from './components/HelloWords.vue'

    export default {
        name: 'app',
        components: {
            HelloWorld
        }
    }
</script>
``` 

2. main.js<br>
>App.vue 컴포넌트를 화면에 담기 위해 main.js를 사용하며 main.js는 다음과 같다. App 컴포넌트를 렌더링한 결과물을 #app인 요소에 출력한다. 
```javascript
import Vue form 'vue'
import App form answer.vue

Vue.config.productionTip = false

new Vue ({
  render: h => h(App)
}).$mount('#app')
```
3. public/index.html
>main.js와 단일 파일컴포넌트들을 빌드하여 script 태그로 참조하여 보여줄 페이지는 index.html이다.<br>
public/index.html 파일을 로딩하여 script 태그와 link,style 태그를 추가하여 dist 디렉터리로 실행시킬 html 파일을 만든다. 
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>todolistapp</title>
</head>
<body>
    <noscript>
        <strong>
            We're sorry but todolistapp doesn't work properly without Javascript enabled. Please enable it to continue.
        </strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
</body>
</html>
```

4. src/EventBus.js
>src 디렉터리 아래 components 디렉터리를 새로 만들고 그 안에 3개의 vue 컴포넌트 파일과 1개의 js파일을 작성한다.<br> 
>EventBus.js는 순수 자바스크립트 코드로만 작성하면 된다.
```javascript
import Vue from 'vue';
var eventBus = new Vue();
export default eventBus;

```

5. src/components/InputTodo.vue
>InputTodo.vue와 List.vue 컴포넌트 파일은 예제 5~6과 같다.<br> 
>이벤트를 등록하고 발생시키기 위해 EventBus 객체를 import한 후에 $on, $emit 메서드를 사용한다.

```javascript
<style>
    * {box-sizing: border-box;}
    .input {
        border: none;
        width: 75%;
        height: 35px; 
        padding: 10px; 
        float: left;
        font-size: 16px;
    }
    .addbutton {
        padding: 10px;
        width: 25%;
        height: 35px;
        background: #d9d9d9;
        color: #555;
        float: left;
        text-align: center;
        font-size: 13px;
        cursor: pointer;
        transition: .3s;
    }
    .addbutton:hover {
        background-color: #bbb;
    }
</style>
<template>
    <div>
        <input type="text" class="input" id="task" v-model.trim="todo" placeholder="입력 후 엔터!" v-on:keyup.enter="addTodo">
        <span class="addbutton" v-on:click="addTodo">추 가</span>
    </div>
</template>
<script>
    import eventBus from '../EventBus'

    export default {
        name: 'input-todo',
        data: function() {
            return {todo: ""}
        },
        methods: {
            addTodo: function() {
                eventBus.$emit('add-todo',this.todo);
                this.todo="";
            }    
        }
    }
</script>
```

6. src/components/List.vue
> List 컴포넌트 작성 
```javascript
<style>
* {  box-sizing: border-box;  }
ul {  margin: 0; padding: 0; }
ul li { 
    cursor: pointer; position: relative; padding: 8px 8px 8px 40px;
    background: #eee; font-size: 14px;  transition: 0.2s;
    -webkit-user-select: none; -moz-user-select: none;
    -ms-user-select: none; user-select: none;  
}
ul li:hover {  background: #ddd;  }
ul li.checked {
    background: #BBB;  color: #fff; text-decoration: line-through;
}
ul li.checked::before {
    content: ''; position: absolute; border-color: #fff;
    border-style: solid; border-width: 0px 1px 1px 0px; 
    top: 10px; left: 16px;  transform: rotate(45deg);
    height: 8px; width: 8px;
}
.close {
    position: absolute; right: 0; top: 0;
    padding: 8px 12px 8px 12px
}
.close:hover {
    background-color: #f44336;  color: white;
}
</style>
<template>
    <ul id="todolist">
        <li v-for="a in todolist" :key="a.id" :class="checked(a.done)"
            @click="doneToggle(a.id)">
            <span>{{ a.todo }}</span>
            <span v-if="a.done"> (완료)</span>
            <span class="close" v-on:click.stop="deleteTodo(a.id)">&#x00D7;</span>
        </li>
    </ul>
</template>
<script type="text/javascript">
import eventBus from '../EventBus'
export default {
    created : function() {
         eventBus.$on('add-todo', this.addTodo);
    },
    data : function() {
        return {
            todolist : [
                { id:1, todo : "영화보기", done:false },
                { id:2, todo : "주말 산책", done:true },
                { id:3, todo : "ES6 학습", done:false },
                { id:4, todo : "잠실 야구장", done:false },
            ]
        }
    },
    methods : {
        checked : function(done) {
            if(done) return { checked:true };
            else return { checked:false };
        },
        addTodo : function(todo) {
            if (todo !== "") {
                this.todolist.push(
                    { id:new Date().getTime(), todo : todo, done:false });
            }
        },
        doneToggle : function(id) {
            var index = this.todolist.findIndex((item)=>item.id === id);
            this.todolist[index].done = !this.todolist[index].done;
        },
        deleteTodo : function(id) {
            var index = this.todolist.findIndex((item)=>item.id === id);
            this.todolist.splice(index,1);
        }
    }
}
</script>
```
7. src/components/TodoList.vue

> 다음으로 List, InputTodo 컴포넌트를 참조하여 구성하는 TodoList 컴포넌트를 아래와 같이 작성합니다.
```javascript
<style>
    * {  box-sizing: border-box;  }
    .header {
        background-color: purple; padding: 30px 30px;
        color: yellow; text-align: center;
    }
    .header:after {
        content: ""; display: table; clear: both;
    }
</style>
<template>
    <div id="todolistapp">
        <div id="header" class="header">
            <h2>Todo List App</h2>
            <input-todo />
        </div>
        <list></list>
    </div>  
</template>
<script type="text/javascript">
import InputTodo from './InputTodo';
import List from './List';
export default {
    name : 'todo-list',
    components : { InputTodo, List }
}
</script>
```

마지막 단계로 Todolist 컴포넌트를 main.js에서 렌더링 합니다.
```javascript
import Vue from 'vue'
import TodoList from './components/TodoList.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(TodoList)
}).$mount('#app')
```

이제 yarn serve 명령어를 이용해 실행한다.
package.json의 serve 스크립트에 --open 옵션을 지정하면 yarn serve 명령어를 실행하면 브라우저가 작동으로 구동되도록 할 수 있다.

##9.2 컴포넌트에서의 스타일 
특정 컴포넌트만의 스타일을 지정하려면 범위css와 css 모듈의 두 가지 방법을 사용할 수 있다.

###9.2.1 범위 css

```javascript
<template>
  <div class="main test">
    {{msg}}
    <child11 />
    {{msg}}
  </div>
</template>
<script>
import Child11 from './Child11.vue'
export default {
  name: 'child1',
  components : { Child11 },
  data () {
    return {
      msg: 'Child1'
    }
  }
}
</script>
<style scoped>
.main { border:solid 1px black; background-color:yellow; }
</style>
```

```javascript
<template>
  <div class="main">{{msg}}</div>
</template>
<script>
export default {
  name: 'child2',
  data () {
    return {
      msg: 'Child2'
    }
  }
}
</script>
<style scoped>
.main { border:solid 1px black; background-color:aqua; }
</style>
```
위 두 컴포넌트의 스타일에는 배경색 속성을 가진 main 클래스가 정의되어 있다. 
하지만 둘다 전역 클래스이기 때문에 충돌한다. 
충돌 여부를 확인하기 위해 App.vue를 수정한다. App.vue의 template 내부와 script 내부의 코드를 아래와 같이 변경한다.

```javascript
<template>
  <div id="app">
    <h2>{{msg}}</h2>
    <child1 />
    <child2 />
  </div>
</template>

<script>
import Child1 from './components/Child1.vue'
import Child2 from './components/Child2.vue'
export default {
  name: 'app',
  components : { Child1, Child2 },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
```

동일한 이름의 클래스로 두 개가 등록된 경우 등록된 순서로 마지막에 등록된 스타일만이 적용된다. 
범위css로 변경하기 위해서는 style 태그를 style scoped로 변경하기만 하면 된다.

범위 css 주의사항 
- 특성 선택자를 사용하기 때문에 브라우저에서 스타일을 적용하는 속도가 느리므로 id,class,tag명 선택자로 요소를 선택하여 적용한다.
- 부모 컴포넌트에 적용된 범위 css(scoped CSS)는 하위 컴포넌트에도 반영된다.

### 9.2.2 CSS 모듈
css 모듈은 css 스타일을 객체처럼 다룰 수 있게 한다.
>설정방법
&lt;style module&gt;&lt;/style&gt;과 같이 사용하면 된다.

```javascript
<template>
  <div>
    <button v-bind:class="$style.hand"> CSS Module을 적용한 버튼 </button>
    <div :class="[$style.box, $style.border]">Hello World</div>
  </div>
</template>

<script>
export default {
    created() {
        console.log(this.$style);
    }
}
</script>

<style module>
.hand { cursor:pointer; background-color:purple; color:yellow; }
.box { width:100px; height:100px; background-color:aqua; }
.border { border:solid 1px orange; }
</style>
```

vue인스턴스 내에서 $style이라는 계산형 속성을 통해서 이용할 수 있다. 
적용해야 할 CSS 클래스가 여러 개라면 배열 문법을 이용해 한 번에 적용할 수 있다.
> &lt;div v-bind:class="[$style.box, $style.border]"&gt;hello world&lt;/div&gt;

## 9.3 슬롯
슬롯을 이용하여 자식 컴포넌트로 HTML 마크업을 전달할 수 있다.

### 9.3.1 슬롯의 기본 사용법
슬롯을 사용하기 위해 자식 컴포넌트에 &lt;slot&gt;&lt;/slot&gt; 태그를 작성하고 
부모 컴포넌트에서는 콘텐츠 영역에 자식 컴포넌트의 &lt;slot&gt;&lt;/slot&gt; 영역에 나타낼 html 마크업을 작성한다.

```javascript
<template>
  <div class="container">
    <div class="header">{{headerText}}</div>
    <div class="content">
        <slot></slot>
    </div>
    <div class="footer">{{footerText}}</div>
  </div>
</template>

<script>
export default {
    props : [ 'headerText', 'footerText' ]
}
</script>

<style scoped>
.container { width:300px; margin:10px; padding:2px;
    border:solid 1px gray; float:left; }
.header { padding:4px 20px 4px 20px; background-color: orange;
    color:aqua; text-align: center; }
.footer { padding:4px 20px 4px 20px; background-color: aqua; 
    text-align:left; }
.content { padding: 10px; height:auto; min-height: 40px; 
    text-align:left; }
</style>
```

```javascript
<template>
  <div id="app">
    <speech-box :headerText="A.header" :footerText="A.footer">
      <div>
        <p>
          {{A.message}}
        </p>
      </div>
    </speech-box>

    <speech-box class="sanders" :headerText="B.header" :footerText="B.footer">
      <div>
        <p class="sanders-content">
          {{B.message}}
        </p>
      </div>
    </speech-box>
  </div>
</template>

<script>
import SpeechBox from './components/SpeechBox.vue'
export default {
  name: 'app',
  components : { SpeechBox },
  data : function() {
    return { 
      A : {
        header : "오바마 대통령 고별 연설문",
        footer : "2017.01.10 - 시카고",
        message : `저의 동료 국민 여러분, 미셸과 저는 지난 몇 주간 우리가 받은 모든
            축복의 인사에 너무 감동받았습니다. 하지만 오늘 밤은 제가 감사의 인사를 할 
            차례입니다. 우리가 의견을 같이 했거나 혹은 거의 생각이 일치하지 않았든 
            미국 국민 여러분과의 대화는, 거실이든 학교든 농장이든 공장 바닥이든, 
            식당이든 먼 군사 전초 기지이든 이런 대화는 저를 정직하게 해주며 영감을 
            주었고 제가 계속 전진하도록 했습니다. ...(생략)`
      },
      B : {
        header : "버니샌더스 경선 패배 연설문",
        footer : "2016.07.25-필라델피아 웰스파고",
        message : `감사합니다. 여러분 정말 감사합니다. 오늘밤 이 자리에 서게 돼 
          영광입니다. 제 훌륭한 친구인 엘리자베스 워렌의 다음 순서에 발언할 수
          있어서, 그리고 미셸 오바마의 놀라운 업적을 축하할 기회를 얻게 돼서 또
          한번 영광이라고 생각합니다. 미셸은 우리 모두가 자랑스러움을 느끼도록
          해주었습니다. ...(생략)`
      }
    };
  }
}
</script>

<style scoped>
  .sanders { background-color:antiquewhite; }
  .sanders-content { font-family: 굴림; text-decoration: underline; }
</style>
```

### 9.3.2 명명된 슬롯
이름을 부여한 슬롯인 명명된 슬롯을 사용하면 컴포넌트에 여러 개의 슬롯을 작성할 수 있다. 

```javascript
<template>
    <div id="pagewrap">
    <header>
        <slot name="header"></slot>
    </header>
    <aside id="sidebar">
        <slot name="sidebar"></slot>
    </aside>
    <section id="content">
        <slot name="content"></slot>
    </section>
    <footer>
        <slot name="footer"></slot>
    </footer>
    </div>
</template>

<style scoped>
/* 전체 구조 */
#pagewrap {
	padding: 5px;
	width: 960px;
	margin: 20px auto;
}
header {
	height: 100px;
	padding: 0 15px;
}
#content {
	width: 696px;
	float: left;
	padding: 5px 15px;
    min-height: 300px;
}
#sidebar {
	width: 200px;
	padding: 5px 15px;
	float: left;
}
footer {
	clear: both;
	padding: 0 15px;
}
/* 가로폭 980보다 작을 때 사용할 @media query */
@media screen and (max-width: 980px) {	
	#pagewrap {
		width: 94%;
	}
	#content {
		clear: both;
		padding: 1% 4%;
		width: auto;
		float: none;
	}
	#sidebar {
		clear: both;
		padding: 1% 4%;
		width: auto;
		float: none;
	}
	header, footer {
		padding: 1% 4%;
	}
}
/* 공통 */
#content {
	background: #f8f8f8;
}
#sidebar {
	background: #f0efef;
}
header, #content, #middle, #sidebar {
	margin-bottom: 5px;
}
#pagewrap, header, #content, #middle, #sidebar, footer {
	border: solid 1px #ccc;
}
</style>
```
4개의 슬롯과 미디어쿼리를 사용했다.
부모 컴포넌트인 AppNamed.vue 컴포넌트를 src 디렉터리 아래에 작성한다.

```javascript
<template>
  <div id="app">
    <layout>
        <h1 slot="header">헤더 영역</h1>
        <div slot="sidebar">
            <ul class="menu">
                <li v-for="sidebar in sidebars" :key="sidebar.menu">
                    <a v-bind:href="sidebar.link">{{sidebar.menu}}</a>
                </li>
            </ul>
        </div>

        <div slot="content">
            <h2>컨텐트 영역</h2>
            <p>김수한무 거북이와 두루미 삼천갑자 동방삭 치치카포 사리사리센타 워리워리 세브리깡 무두셀라 구름이 허리케인에 담벼락 담벼락에 서생원 서생원에 고양이 고양이엔 바둑이 바둑이는 돌돌이</p>
            <p>김수한무 거북이와 두루미 삼천갑자 동방삭 치치카포 사리사리센타 워리워리 세브리깡 무두셀라 구름이 허리케인에 담벼락 담벼락에 서생원 서생원에 고양이 고양이엔 바둑이 바둑이는 돌돌이</p>
            <p>김수한무 거북이와 두루미 삼천갑자 동방삭 치치카포 사리사리센타 워리워리 세브리깡 무두셀라 구름이 허리케인에 담벼락 담벼락에 서생원 서생원에 고양이 고양이엔 바둑이 바둑이는 돌돌이</p>
            <p>김수한무 거북이와 두루미 삼천갑자 동방삭 치치카포 사리사리센타 워리워리 세브리깡 무두셀라 구름이 허리케인에 담벼락 담벼락에 서생원 서생원에 고양이 고양이엔 바둑이 바둑이는 돌돌이</p>
        </div>

        <p slot="footer">Footer text</p>
    </layout>
  </div>
</template>

<script>
<!-- 레이아웃 컴포넌트를 참조하고 layout이라는 이름으로 사용한다 -->
import Layout from './components/NamedSlot.vue';
export default {
    data() {
        return {
            sidebars : [
                { menu : "Home", link : "#" },
                { menu : "About", link : "#" },
                { menu : "Contact", link : "#" },
                { menu : "Vue.js", link : "#" }
            ]
        }
    },
    <!-- Layout이라는 컴포넌트 이름으로 사용한다 -->
    components : { Layout }
}
</script>

<style scoped>
ul.menu {
    position:relative;
    padding: 5px 5px 5px 5px;
    list-style: none;
    font-style: italic;
}
ul.menu a {
    text-decoration:none;
}
</style>
```
main.js 소스 
```javascript
import Vue from 'vue'
answer.vue
import App from './AppNamed.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 9.3.3 범위 슬롯

자식 컴포넌트에서 부모 컴포넌트로 속성을 전달하여 부모 컴포넌트 측에서 출력할 내용을 
커스터마이징할 필요가 있을 때 사용하는 것이 범위 슬롯이다.
자주 사용하는 기능은 아니지만 알아두면 편리한 기능이다.

```javascript
<template>
    <div class="child">
        X : <input type="text" v-model="x" /><br />
        Y : <input type="text" v-model="y" /><br />
        <slot name="type1" :cx="x" :cy="y"></slot>
        <slot name="type2" :cx="x" :cy="y"></slot>
    </div>
</template>
<script>
export default {
    data() {
        return { x:4, y:5 };
    }
}
</script>
<style scoped>
    .child { padding:5px; border:solid 1px gray; }
</style>
```

```javascript
<template>
    <div class="parent">
        <child>
            <template slot="type1" scope="p1">
                <div>{{p1.cx }} + {{p1.cy}} = 
                {{ parseInt(p1.cx) + parseInt(p1.cy) }}</div>
            </template>
            <template slot="type2" scope="p2">
                <div>{{p2.cx }} 더하기 {{p2.cy}} 는 
                {{ parseInt(p2.cx) + parseInt(p2.cy) }}입니다.</div>
            </template>
        </child>
    </div>
</template>

<script>
import Child from './components/ScopedSlot.vue'
export default {
    components : { Child }
}
</script>

<style>
    .parent { border:dashed 2px black; padding:5px; }
</style>
```

```javascript
import Vue from 'vue'
import App from './AppScoped.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```
자식 컴포넌트의 x, y 데이터를 부모컴포넌트로 전달하여 부모 컴포넌트에서 출력 형식을 지정하기 윈할 때가 있다.
이런 경우 범위 슬롯이 사용될 수 있다. 이 범위 슬롯을 이용해 자식 컴포넌트를 통해 출력할 내용을 부모 컴포넌트 측에서 직접 조작할 수 있다.

## 9.4 동적 컴포넌트 
화면의 동일한 위치에 여러 컴포넌트를 표현해야한다면 동적 컴포넌트를 사용해야한다.
&lt;component&gt; 요소를 템플릿에 작성하고 v-bind 디렉티브를 이용해 is 특성 값으로 어떤 컴포넌트를 그 위치에 나타낼지 결정하면 된다.

```javascript
<template>
  <div>
      <h1>Home</h1>
      <h3>{{ (new Date()).toTimeString() }}</h3>
  </div>
</template>
<script>
export default {
    name: "home"
}
</script>
```

App.vue에서 3개의 컴포넌트를 참조하고 동적으로 뷰를 변경할 수 있도록 한다.
```javascript
<template>
<div>
  <div class="header">
    <h1 class="headerText">(주) OpenSG</h1>
    <nav>
      <ul>
        <li>
          <a href="#" @click="changeMenu('home')">Home</a>
        </li>
        <li>
          <a href="#" @click="changeMenu('about')">About</a>
        </li>
        <li>
          <a href="#" @click="changeMenu('contact')">Contact</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="container">
    <keep-alive include="about,home">
      <!-- 컴포넌트들이 보여질 위치 -->
      <component v-bind:is="currentView"></component>
    </keep-alive>
  </div>
</div>
</template>
<script>
<!-- 3개의 컴포넌트를 참조 -->
import Home from './components/Home.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
export default {
  name: 'App',
  components : { Home, About, Contact },
  data() {
    return { currentView : 'home' }
  },
  methods : {
    changeMenu(view) {
      this.currentView = view;
    }
  }
}
</script>
<style scoped>
.header { background-color:aqua; padding: 10px 0px 0px 0px; }
.headerText { padding: 0px 20px 0px 20px; } 
ul { list-style-type: none; margin: 0; padding: 0;
    overflow: hidden; background-color: purple;  }
li { float: left; }
li a { display: block; color: yellow; text-align: center;
    padding: 14px 16px; text-decoration: none;  }
li a:hover { background-color: aqua; color:black; }
</style>
```
&lt;component&gt;로 표현될 자식 컴포넌트들이 정적 콘텐츠라면 매번 실행되는 것이 효율적이지 않다. 
이런경우는 &lt;component&gt; 요소를 &lt;keep-alive&gt;
요소로 감싸서 캐싱하면 된다.

특정 컴포넌트만 캐싱하거나 캐싱하고 싶지 않다면 include, exclude 특성으로 컴
포넌트들을 콤마로 구분하여 나열한다.
이때 지정된 이름이 있어야 하므로 각 컴포넌트마다 name 옵션을 부여해야 하며, 이 이름으로 include, exclude 할 수 있다.

```javascript
<keep-alive include="about,home">
  <component v-bind:is="currentView"></component>
</keep-alive>

[컴포넌트에서 name 옵션 부여]
<template>
<div>
  <h1>Home</h1>
  <h3>{{ (new Date()).toTimeString()}}</h3>
</div>
</template>
<script>
  export default {
    name: "home"
  }
</script>
```

## 9.5 재귀 컴포넌트 
재귀 컴포넌트는 템플릿에서 자기 자신을 호출하는 컴포넌트이다. 
주의할 점은 반드시 name 옵션을 지정해야만 한다. 

SPA 아키텍처의 대규모 웹 애플리케이션을 개발할 때는 컴포넌트 기반으로 수행하는 경우가 많다. 
단일 파일 컴포넌트의 작성과 활용에 익숙해지는 것이 좋다.