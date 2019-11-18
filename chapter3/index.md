#Chapter3 Vue.js 인스턴스

## 1. el, data, computed 옵션
#### 1-1
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>03-01</title>
  <script src="https://unpkg.com/vue/dist/vue.min.js"></script>
</head>
<body>
  <div id="test">
    {{name}}
  </div>
  <script type="text/javascript">
  var model = { 
    name : "홍길동"
  }
  var vm = new Vue({
    el : "#test",
    data : model
  })  
  </script>
</body>
</html>
```
- Data 옵션에 주어진 모든 속성들은 Vue 인스턴스 내부에서 직접 이용되지 않고 Vue 인스턴스와 Data 옵션에 주어진 객체 사이에 프록시를 두어 처리합니다.<br>
- Vue.js 2x 버전에서는 프록시 구현을 위해 속성을 사용합니다. Object.defineProperty() 메서드를 이용해 setter, getter 를 정의하고 setter 를 이용해 값이 변경될 때, 관찰자(watch)에게 변경 여부를 알려서 렌더링이 다시 일어나도록 제어합니다.<br>
* 참조 : https://kr.vuejs.org/v2/guide/reactivity.html

- el 옵션은 Vue 인스턴스에 연결할 HTML DOM 요소를 지정합니다, 단 여러 개 요소 중 첫번째 요소에만 연결됩니다.<br>

#### 1-2 계산형 속성
```
<script type="text/javascript">
//1부터 입력된 수까지의 합구하기
var vmSum = new Vue({
    el : "#example",
    data : { num : 0 },
    computed : {
        sum : function() {
            var n = Number(this.num);
            if (Number.isNaN(n) || n < 1)  return 0;
            return ((1+n) * n) / 2;
        }
    }
});
</script>
```
#### 1-3 계산형 속성의 getter/setter 메서드
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>03-02</title>
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
</head>
<body>
<div id="example">
    금액 : <span>{{amount}}원</span>
</div>
<script type="text/javascript">
var vm = new Vue({
    el : "#example",
    data : { amt : 1234567 },
    computed : {
        amount : {
            get : function() {
                var s = new String(""+this.amt);
                var result = "";
                var num = 0;
                for (var i=s.length-1; i>=0; i--) {
                    result = s[i] + result;
                    if (num % 3 == 2 && i !== 0)
                        result = "," + result;
                    num++;
                }
                return result;
            },
            set : function(amt) {
                if (typeof(amt) === "string") {
                    var result = parseInt(amt.replace(/,/g, ""))
                    if (isNaN(result)) this.amt = 0;
                    else   this.amt = result;
                } else if (typeof(amt) === "number")
                    this.amt = amt;
            }
        }
    }
});
</script>
</body>
</html>
```
- get 메서드는 데이터 속성인 amt 값을 숫자 3자리마다 쉽표(,)를 넣어서 리턴하도록 합니다.<br />
- set 메서드는 문자열을 입력받으면 쉼표(,)를 제거한 뒤 숫자 값으로 변환하여 amt 데이터 속성에 할당합니다. 간혹 숫자로 변환이 불가능한 값이 들어오는 경우 숫자 0을 할당하도록 isNaN() 메서드를 사용합니다.<br />

## 2. 메서드
> Vue 인스턴스에서 사용할 메서드를 등록하는 옵션

#### 2-1) 1-2를 메서드 사용으로 변경
```
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <title>03-04</title>
 <script src="https://unpkg.com/vue/dist/vue.min.js"></script>
 </head>
 <body>
 <div id="example">
     <input type="text" v-model="num" /><br />
     1부터 입력된 수까지의 합 : <span>{{sum()}}</span>
 </div>
 <script type="text/javascript">
 //1부터 입력된 수까지의 합구하기
 var vmSum = new Vue({
     el : "#example",
     data : { num : 0 },
     methods : {
         sum : function() {
             console.log(Date.now());
             var n = Number(this.num);
             if (Number.isNaN(n) || n < 1)  return 0;
             return ((1+n) * n) / 2;
         }
     }
 });
 </script>
 </body>
 </html>
```
- 메서드와 계산형 속성을 사용했을 때 최종적인 결과물은 같아 보이지만 내부 작동방식에 차이가 있음<br />
- 계산형 속성은 종속된 값에 의해 결과값이 캐싱됨<br />
  vm.Sum.num이 같은 값이라면 계산형 속성인 sum은 캐싱된 결과값을 바로 리턴하지만 메서드 사용시 sum() 메서드를 매번 실행. 
  
#### 2-2) 위의 메서드를 아래와 같이 변경 // 타임스탬프 정보를 찍는 코드 추가
  ```
   var vmSum = new Vue({
       el : "#example",
       data : { num : 0 },
       computed : {
           sum : function() {
               console.log(Date.now());   <-- 타임스탬프 정보를 찍는 코드 추가
               var n = Number(this.num);
               if (Number.isNaN(n) || n < 1)  return 0;
               return ((1+n) * n) / 2;
           }
       }
   });
   </script>
   </body>
   </html>
  ```
- 계산된 속성을 여러번 액세스해도 콘솔에 타임스탬프를 출력하는 코드는 실행되지 않음, 이 실행 결과는 캐싱된 값을 출력하고 있다는 것을 의미<br />

## 3. 관찰 속성
> 하나의 데이터를 기반으로 다른 데이터를 변경할 필요가 있을 때 사용
#### 3-1) watch 옵션을 이용해 관찰 속성 등록
``` 
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>03-05</title>
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
</head>
<body>
<div id="example">
    x : <input type='text' v-model="x" /><br />
    y : <input type='text' v-model="y" /><br />
    덧셈 결과 : {{sum}}
</div>
<script type="text/javascript">
var vm = new Vue({
    el : "#example",
    data : { x:0, y:0, sum:0 },
    watch : {
        x : function(v) {
            console.log('## x 변경')
            var result = Number(v) + Number(this.y);
            if (isNaN(result)) this.sum = 0;
            else this.sum = result;
        },
        y : function(v) {
            console.log('## y 변경')
            this.y = v;
            var result = Number(this.x) + Number(v);
            if (isNaN(result)) this.sum = 0;
            else this.sum = result;
        }
    }
})
</script>
</body>
</html>
```
- watch 옵션에 등록되는 것은 속성의 이름과 해당 속성이 변경되었을 때 호출할 함수입니다.<br />
- x는 x속성을 의미 하며, function(v) {...}는 x속성이 변경될 때 호출되는 함수입니다.<br />
- 파라미터 v는 변경된 x속성의 값을 의미합니다. <br />

> 관찰 속성은 값이 바뀔 때마다 매번 함수가 호출된다는 단점이 있다.

#### 3-2) 위의 예제를 아래와 같이 변경 // 계산형 속성 사용
``` 
 <script type="text/javascript">
 var vm = new Vue({
     el : "#example",
     data : { x:0, y:0 },
     computed : {
         sum : function() {
             var result = Number(this.x) + Number(this.y);
             if (isNaN(result)) return  0;
             else return result;
         }
     }
 })
 </script>
```
> 계산형 속성이 더 간단하고 편리해 보이긴 하나, 긴 시간이 필요한 비동기 처리가 필요할 때는 관찰 속성이 유리<br />

#### 3-3) 연락처 서비스 API

- 검색 API 테스트 : http://sample.bmaster.kro.kr/
- 예제는 service_api.html 파일 확인
      
      
## 4. v-cloak 디렉티브
- 연락처 서비스 API를 실행해보면 콧수염 표현식의 템플릿 문자열이 잠깐 나타났다가 사라지는데, 이것을 보이지 않게 v-cloak으로 처리할 수 있습니다.
``` 
<style>
        #list  { width: 400px; border:1px solid black; border-collapse:collapse; }
        #list td, #list th { border:1px solid black;  text-align:center; }
        #list > thead > tr { color:yellow; background-color: purple; }
        [v-cloak] { display: none; }    <-- 추가
    </style>
</head>
<body>
<div id="example"  v-cloak>    <-- 추가
... ...
</div>
```
## 5. Vue 인스턴스 라이프 사이클
- Vue 인스턴스는 객체로 생성되고, 데이터에 대한 관찰 기능을 설정하는 등의 작업을 위해 초기화를 수행합니다. 그리고 이 과정에서 다양한 라이프 사이클 훅 메서드를 적용할 수 있습니다.
> Vue 컴포넌트를 만들고 관리할 때 유용
#### 5-1) 라이프 사이클 훅 추가

``` 
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>03-11</title>
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
</head>
<body>
<div id="example">
    <input type="text" v-model="num" /><br />
    1부터 입력된 수까지의 합 : <span>{{sum}}</span>
</div>
<script type="text/javascript">
var vmSum = new Vue({
    el : "#example",
    data : { num : 0 },
    created : function() {
        console.log("Created!!");
    },
    updated : function() {
        console.log("updated!!");
        console.log(this.num);
    },
    computed : {
        sum : function() {
            var n = Number(this.num);
            if (Number.isNaN(n) || n < 1)  return 0;
            return ((1+n) * n) / 2;
        }
    }
});
</script>
</body>
</html>
```

#### <라이프 사이클 훅>
##### beforeCreate : Vue 인스턴스가 생성되고 데이터에 대한 관찰 기능 및 이벤트 감시자 설정 전에 호출<br />
##### created : Vue 인스턴스가 생성된 후에 데이터에 대한 관찰 기능, 계산형 속성, 메서드, 감시자 설정이 완료된 후에 호출<br />
##### beforeMount : 마운트가 시작되기 전에 호출<br />
##### mounted : el에 vue 인스턴스의 데이터가 마운트된 후에 호출<br />
##### beforeUpdate : 가상 DOM이 렌더링, 패치되기 전에 데이터가 변경될 때 호출. 이 훅에서 추가적인 상태 변경을 수행할 수 있습니다. 하지만 추가로 다시 렌더링하지는 않습니다.<br />
##### updated : 데이터의 변경으로 가상 DOM이 다시 렌더링되고 패치된 후에 호출. 이 훅이 호출되었을 때는 이미 컴포넌트의 DOM이 업데이트된 상태입니다. 그래서 DOM에 종속성이 있는 연산을 이 단계에서 수행할 수 있습니다.<br />
##### beforeDestroy : Vue 인스턴스가 제거되기 전에 호출됩니다.<br />
##### destroyed : Vue 인스턴스가 제거된 후에 호출됩니다. 이 훅이 호출될 때는 Vue 인스턴스의 모든 디렉티브의 바인딩이 해제되고, 이벤트 연결도 모두 제거됩니다.<br />


