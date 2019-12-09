#Chapter6 컴포넌트 기초

## 1. 컴포넌트 조합

컴포넌트들은 부모-자식 관계로 트리 구조를 형성한다.
컴포넌트들은 속성(Props)을 통해서 자식 컴포넌트로 정보를 전달할 수 있다.
전달 방향은 주로 부모에서 자식으로만 향한다.(단방향)
양방향으로 데이터를 전달할 수 있지만 복잡도가 높아지고 유지 보수에 어려움이 있으므로 권장하지 않는다.

컴포넌트 기반으로 개발시엔 data옵션은 각 컴포넌트의 로콜 상태를 관리하기 위한 용도로만 사용한다.
또한 여러번 사용시엔 모두 다른 상태 정보를 가져야한다. 그렇기 때문에 지금까지 하듯 data옵션을 단순한 객체 값으로 작성할 수 없다.


## 2. 컴포넌트의 작성
Vue.component(tagname,options)
- tagname : 컴포넌트를 사용할 태그명
- options : 컴포넌트에서 랜더링할 templet 등을 지정한다.
- 태그명은 케밥표기를 따르는게 좋으며, 대소문자를 구별하지 않기에 파스칼,카멜 표기법은 적절하지않다.


```
[예제 06-01] 컴포넌트 작성 
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>06-01</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
    <script>
        Vue.component('hello-component,{
            template : '<div>hello world</div>'
        })
    </script>   
</body>   
</html>
```
- 기본틀을 작성하는 방법입니다.

```
[예제 06-02] 컴포넌트의 사용
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>06-02</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
    <div id="app">
        <hello-component></hello-component>
        <hello-component></hello-component>
        <hello-component></hello-component>
    </div>
    <script>
        Vue.component('hello-component',{
            template : '<div>hello world</div>',
        });
        var v = new Vue({
            el : '#app'
        })
    </script>   
</body>    
</html>
```
```
[예제 06-03] 템플릿 문자열 분리
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>06-03</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
    <template id="helloTemplate">
        <div>hello world!!!!</div>
    </template>

    <script>
        Vue.component('hello-component',{
            template : '#helloTemplate',
        })
    </script>   
</html>

```
템플릿 문자열을 포함하고 있는 template 태그의 id를 지정해도된다.
- 06-03 예제는 06-01 의 예제를 변경한 것이다.

```
[예제 06-04] script 태그
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>06-04</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
    <template id="helloTemplate">
    
    </temlpate>

    <script id="helloTemplate">
        <div>hello world!!!</div>
    </script>   
</html>
```
- 06-03의 template 태그를 script 태그로 변경한 것

## 3. DOM 템플릿 구문 작성 시 주의 사항
  - 템플릿 문자열을 사용할 떄 주의해야한다. HTML 요소들은 자식 요소를 포함시킬 수 있는 요소들이 정해져 있는 경우가 있고, 이 사항을 브라우저가 구문 분석을 수행한다.
  - 예로 select태그의 option은 랜더링 되지않는다. 이럴떈 is 특성을 이용해야한다.

```
[예제 06-05] 
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>06-05</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<script>
    Vue.component('option-component',{
        template : '<option>hello</option>'
    })
</script>   
<body>
    <div id="app">
        <select>
            <option-component></option-component>
            <option-component></option-component>
        </select>
    </div>
    <script>
        var v = new Vue({
            el : "#app"
        })
    </script>    
</body>    
</html>
```
select 태그 안에서 option-component라는 태그를 사용할 수 있다는 것이 브라우저에 등록되어있지 않기에 select태그의 option은 렌더링 되지않는다. 이럴때 is 특성을 이용한다.

```
[예제 06-06] is 특성 사용 
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>06-06</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<script>
    Vue.component('option-component',{
        template : '<option>hello</option>'
    })
</script>   
<body>
    <div id="app">
        <select>
            <option is="option-component"></option>
            <option is="option-component"></option>
        </select>
    </div>
    <script>
        var v = new Vue({
            el : "#app"
        })
    </script>    
</body>    
</html>
```

## 4. 컴포넌트에서의 data 옵션

컴포넌트 내부의 로컬 상태 정보를 저장하기 위해 data 옵션을 사용할 수 있다. 
data 옵션에 객체를 직접 지정하면 오류가 발생하며, 정상적으로 렌더링 되려면 data옵션에 함수가 주어져야 한다.

```
[예제 06-07] 계산형 속성, 메서드를 이용한 스타일 적용
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>06-07</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
    <template>
        <div>
            <span>{{nowTS}}</span>
            <button v-on:click="timeClick">현재 시간</button>
        </div>
    </template>
   <div id="app">
        <time-component></time-component>
        <time-component></time-component>
   </div>
    <script>
        Vue.component("time-component",{
           template : "#time-component",
           data : function(){
               return { nowTS : 0}
           },
           methods : {
               timeClick : function(e){
                   this.nowTS = (new Date()).getTime();
               }
           }
        });
        new Vue({
            el : "#app",
        })
    </script>    
</body>    
</html>
``` 
 

## 5. props와 event
부모 컴포넌트에서 자식 컴포넌트로 필요한 정보를 전달하기 위해서는 속성을 이용해야한다.
주의할점은 부모에서 자식으로 단방향으로만 전달할 수 있다. 
반대로 자식컴포넌트에서 부모 컴포넌트로의 전달은 이벤트를 이용한다. 

```
[예제 06-08] props를 이용한 정보 전달
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>06-08</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>

<template id="listTemplate">
    <li>{{message}}</li>
</template>
<script>
    Vue.component('list-component',{
        template:'#listTemplate',
        props : {
            message :{type:String, default:'안녕하세요'},
            count : {type:Number, required:true}
        }
    })
</script>

<body>
    <div id='app'>
        <ul>
            <list-component message="hello" count='100'></list-component>
            <list-component message="씬짜오" count='21'></list-component>
            <list-component message="니하오마"></list-component>
            <list-component count='1000'></list-component>
        </ul>
    </div>
</body>
<script>
    var vm = new Vue({
        el: "#app"
    })
</script>    
</html>
```

## 6. 이벤트 버스 객체를 이용한 통신
부모-자식 관계의 컴포넌트들은 props와 event를 사용하면되지만, 서로 형제 관계이거나 부모와 손자,증손자 관계인 컴포넌트들 사이에는 이벤트 버스 객체를 만들어 사용한다.

```
[예제 06-09] TodoList 예제
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>06-09</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<!-- 이벤트 버스 객체-->
<script>
    var eventBus = new Vue();
</script>

<!-- 첫 번째 자식 컴포넌트 시작-->
<template id="chid1Template">
    <div>
        <button v-on:click="clickEvent">child1 button!!</button>
        <div>{{currentTime}}</div>
    </div>
</template>
<script>
    Vue.component('child-component',{
        template:"#child1Template",
        data: function(){
            return {currentTime:''};
        },
        methods:{
            clickEvent : function(){
                var d = new Date();
                var t = d.toLocaleTimeString() + " " + d.getMilliseconds() + "ms";
                eventBus.$emit('click1',t);
                this.currentTime = t;
            }
        }
    });
</script>
<!-- 첫 번째 자식 컴포넌트 끝 -->
<!-- 두 번째 자식 컴포넌트 시작 -->
<template id="child2Template">
    <ul>
        <li v-for="t in timelist">{{t}}</li>
    </ul>
</template>
<script>
    Vue.component('child2-component',{
        template : '#child2Template',
        data : function(){
            return {
                timelist:[]
            };
        },
        created : function(){
            eventBus.$on('click1',this.child1Click);
        },
        methods : {
            child1Click : function(time){
                this.timelist.push(time)
            }
        }
    });
</script>
<!-- 두 번째 자식 컴포넌트 끝-->
<body>
    <div>
        <child1-component></child1-component>
        <hr/>
        <child2-component></child2-component>
    </div>
</body>
<script>
    var vm = new Vue({
        el : "#app"
    })
</script>
</html>
```
- $on(eventName) : 이벤트 감지
- $emit(eventName) : 이벤트 트리거

