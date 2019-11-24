#Chapter4 이벤트 처리

## 1. 인라인 이벤트 처리

> 참고 사이트
>- https://developer.mozilla.org/ko/docs/Web/Events 
>- https://www.w3schools.com/tags/ref_eventattributes.asp

 Vue.js에서 이벤트는 v-on 디렉티브를 이용하여 처리

```
[예제 04-01]
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>04-01</title>
  // 디자인 적용을 위해 부트스트랩(bootstrap) 사용
  // 부스스트랩은 반응형 웹 UI 개발을 위한 HTML,CSS,JS 프레임워크
  <link rel="stylesheet" 
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <style>
      .layout1 { margin:30px 30px 30px 30px; }
  </style>
  <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</head>
<body>
<div id="example" class="container layout1">
    // amount 데이터 속성을 v-model로 양방향 바인딩
    <p><input type="text" v-model="amount" class="form-control" /></p> 
    <p>
        // v-on:click 디렉티브를 이용해 클릭 이벤트 처리를 수행
        <button id="deposit" v-on:click="balance += parseInt(amount)"
          class="btn btn-primary">예금</button>
        // v-on = @
        <button id="withdraw" @click="balance -= parseInt(amount)" 
          class="btn btn-primary">인출</button>
    </p>            
    <h3>계좌 잔고 : {{balance}}</h3>
</div>
<script type="text/javascript">
    var vm = new Vue({
    el : "#example",
        data : {
            amount : 0,
            balance : 0,
        }
    })
</script>
</body>
</html>
```

## 2. 이벤트 핸들러 메서드
```
[예제 04-02]
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>04-03</title>
  <link rel="stylesheet" 
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
  <style>
      .layout1 { margin:30px 30px 30px 30px; }
  </style>
  <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</head>
<body>
<div id="example" class="container layout1">
    <p><input type="text" v-model="amount" class="form-control" /></p>
    <p>
        <button id="deposit" v-on:click="deposit($event)" 
            class="btn btn-primary">예금</button>
        <button id="withdraw" v-on:click="withdraw" 
            class="btn btn-primary">인출</button>
    </p>            
    <h3>계좌 잔고 : {{balance}}</h3>
</div>

<script type="text/javascript">
var vm = new Vue({
  el : "#example",
  data : {
    amount : 0,
    balance : 0,
  },
  // Vue 인스턴스에 deposit, withdraw 메서드 작성하여 금액과 계좌잔고에 따른 유효성검사
  methods : {
    deposit : function(e) { // 첫번째 파라미터로 event 객체 전달받음
        var amt = parseInt(this.amount);
        if (amt <= 0) {
            alert("0보다 큰 값을 예금해야 합니다");
        } else {
            this.balance += amt;
        }
    }, 
    withdraw : function(e) {
        var amt = parseInt(this.amount);
        if (amt <= 0) {
            alert("0보다 큰 값을 인출할 수 있습니다");
        } else if (amt > this.balance) {
            alert("잔고보다 많은 금액을 인출할 수 없습니다");
        } else {
            this.balance -= amt;
        }
    }
  }
})
</script>
</body>
</html>
```

## 3. 이벤트 객체
  vue.js의 이벤트 객체는 W3C표준 HTML DOM Event 모델을 그대로 따르면서 추가적인 속성 제공하기 때문에 기존 순수 자바스크립트에서 사용하던 이벤트 객체의 정보를 거의 대부분 그대로 이용할 수 있음


### [이벤트 객체의 주요 공통 속성]

|속성명|설명|
|:---|:---|
|왼쪽정렬|오른쪽정렬|
|target|이벤트가 발생한 HTML 요소를 리턴함.|
|currentTarget|이벤트리스너가 이벤트를 발생시키는 HTML 요소를 리턴함.|
|bubbles|현재의 이벤트가 버블링을 일으키는 이벤트인지 여부를 리턴함.|
|cancelable|기본 이벤트를 방지할 수 있는지 여부를 리턴함.|
|defaultPrevented|기본 이벤트가 방지되었는지 여부를 나타냄.|
|eventPhase|이벤트 흐름의 단계를 나타냄.<br>1. 포착 (CAPTURING_PHASE)<br>2. 이벤트 발생 (AT_TARGET)<br>3. 버블링 (BUBBLING_PHASE)|
|srcElement|IE에서 사용되던 속성으로 target과 동일한 속성|
|||


### [키보드 이벤트 관련 속성]

|속성명|설명|
|:---|:---|
|altKey|ALT 키가 눌러졌는지 여부를 나타냄 (true / false).|
|shiftKey|SHIFT 키가 눌러졌는지 여부를 나타냄 (true / false).|
|ctrlKey|CTRL 키가 눌러졌는지 여부를 나타냄 (true / false).|
|metakey|메타 키가 눌러졌는지 여부를 나타냄. 윈도우에서는 Window Key, macOS에서는 Command Key이다.|
|key|이벤트에 의해 나타나는 키의 값을 리턴함. 대소문자 구분함.|
|code|이벤트를 발생시킨 키의 코드 값을 리턴함.<br>ex) a를 눌렀을 때 "KeyA"를 리턴함<br>ex) shift를 눌렀을 때 "Shift"를 리턴함.|
|keyCode|이벤트를 발생시킨 키보드의 고유 키코드<br>ex) a, A는 65를 리턴함(대소문자 구분하지 않음).|
|charCode|keypress 이벤트가 발생될 때 Unicode 캐릭터 코드를 리턴함.|
|location|디바이스에서의 키 위칫값. 일반 키보드는 이 값이 모두 0이므로 이용할 수 없음.|
|||


### [마우스 이벤트 관련 속성]

|속성명|설명|
|:---|:---|
|altkey, shiftKey, ctrlKey, metaKey|키보드 이벤트 관련 속성 참조|
|button|이벤트를 발생시킨 마우스 버튼<br>0: 마우스 왼쪽 버튼<br>1: 마우스 휠<br>2: 마우스 오른쪽 버튼|
|buttons|마우스 이벤트가 발생한 후에 눌러져 있는 마우스 버튼의 값을 리턴함. 아래 값의 조합으로 이루어짐.<br>1: 마우스 왼쪽 버튼<br>2: 마우스 오른쪽 버튼<br>4: 마우스 휠<br>8: 4번째 마우스 버튼<br>16: 5번째 마우스 버튼<br>ex) 마우스의 오른쪽 버튼. 휠을 누르고 있는 상태에서 왼쪽 버튼을 클릭할 경우 이 값은 6을 리턴함.|
|clientX, clientY|마우스 이벤트가 일어났을 때의 뷰포트(ViewPort) 영역상의 좌표, 이 좌표는 스크롤바를 내리더라도 좌푯값에 영향을 받지 않음|
|layerX, layerY|마우스 이벤트가 발생한 HTML 요소 영역상에서의 좌표(IE이외의 브라우저 사용)|
|offetX, offsetY|마우스 이벤트가 발생한 HTML 요소 영역상에서의 좌표(IE 브라우저 사용)|
|pageX, pageY|마우스 이벤트가 일어났을 때의 HTML 문서(Document) 영역상의 좌표|
|screenX, screenY|마우스 이벤트가 일어났을 때의 모니터 화면(Screen) 영역상의 좌표|
|||


### [이벤트 객체의 주요 메서드]

|속성명|설명|
|:---|:---|
|preventDefault()|기본 이벤트의 자동 실행을 중지시킴|
|stopPropagation()|이벤트의 전파를 막음|
|||

## 4. 기본 이벤트
- HTML 문서나 요소에 어떤 기능을 실행하도록 이미 정의되어 있는 이벤트
    - a 요소를 클릭했을 때 href 특성의 경로로 페이지를 이동시킴
    - 브라우저 화면을 마우스 오른쪽 클릭했을 때 내장 컨텍스트(ContextMenu) 메뉴가 나타남
    - form 요소 내부의 submit 버튼을 클릭했을 때 form 요소의 action 특성에 지정된 경로로 method 특성에 지정된 방식으로 전송함
    - input type="text" 요소에 키보드를 누르면 입력한 문자가 텍스트 박스에 나타남

```
[예제 04-04]
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>04-04</title>
  <style>
   html, body { margin: 0;padding: 0; }
   #example {
    height: 98vh; min-height: 100%; padding:5px
   }
  </style>
  <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</head>
<body>

// Vue.js에서 제공하는 이벤트 수식어 v-on:contextmenu.prevent 사용 가능
<div id="example" v-on:contextmenu="ctxStop">
    <a href="https://facebook.com" @click="confirmFB">페이스북</a>
</div>

<script type="text/javascript">
var vm = new Vue({
    el : "#example",
    methods: {
        ctxStop : function(e) {
            // contextmenu의 기본이벤트를 막기위해 e.preventDefault() 호출
            // 이벤트 수식어 v-on:contextmenu.prevent 사용할 경우 해당 메서드 호출할 필요 없음
           e.preventDefault();  
        },
        confirmFB : function(e) {
            if (!confirm("페이스북으로 이동할까요?")) {
                // 사용자가 취소 버튼을 클릭하면 e.preventDefault()가 호출되어 기본이벤트 실행 중지
                e.preventDefault();
            }
        }
    }
})
</script>
</body>
</html>
``` 
 

## 5. 이벤트 전파와 버블링
> HTML 문서의 이벤트 처리 단계
>- **1단계 : 이벤트 포착(capturing)**: 문서 내의 요소에서 이벤트가 발생했을 때 HTML 문서의 밖에서부터 이벤트를 발생시킨 HTML 요소까지 포착해 들어가는  즉, windows 로부터 최초 이벤트가 발생하는 자식요소까지 내려가는 과정
>- **1단계 : 이벤트 발생(raising)**: 이벤트를 발생시킨 요소에 다다르면 요소의 이벤트에 연결된 함수를 직접 호출시키는 
>- **3단계 : 버블링 (bubbling)**: 이벤트가 발생한 요소로부터 상위 요소로 거슬러 올라가면서 동일한 이벤트를 호출시키는 

```
[예제 04-05]
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>04-05</title>
  <style>
    .outer {
        display: inline-block;
        width:200px; height:200px; border:solid 2px black;
        background-color: aqua; 
        padding:10px 10px 10px 10px;
    }
    .inner {
        width:100px; height:100px; border:solid 2px black;
        background-color:yellow;
    }
  </style>
  <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</head>
<body>
<div id="example"  class="layout">
    <!-- 버블링 차단 메서드 stopPropagation 호출 -->
    <div class="outer" @click="outerClick">
        <div class="inner" @click="innerClick"></div>
    </div>
    
    <!-- @click.stop 수식어 사용 -->
    <div class="outer" @click.stop="outerClick">
        <div class="inner" @click.stop="innerClick"></div>
    </div>

    <!--  
        @click.capture.stop과 @click.stop 수식어 사용
        click.capture.stop 이벤트 포착단계에서 이벤트 전파를 중단하므로,
        .inner를 클릭하더라도 outerClick만 호출되고 더 이상 이벤트 발생은 일어나지 않음
    -->
    <div class="outer" @click.capture.stop="outerClick">
        <div class="inner" @click.stop="innerClick"></div>
    </div>
</div>
<script type="text/javascript">
    var vm = new Vue({
        el : "#example",
        methods : {
            outerClick : function(e) {
                console.log("### OUTER CLICK")
                console.log("Event Phase : ", e.eventPhase); // 이벤트 흐름의 단계를 나타냄
                console.log("Current Target : ", e.currentTarget); // 이벤트리스너가 이벤트를 발생시키는 HTML 요소를 리턴
                console.log("Target : ", e.target); // 이벤트가 발생한 HTML 요소를 리턴
                // e.stopPropagation(); // 버블링 막기
            },
            innerClick : function(e) {
                console.log("### INNER CLICK")
                console.log("Event Phase : ", e.eventPhase);
                console.log("Current Target : ", e.currentTarget);
                console.log("Target : ", e.target);  
                // e.stopPropagation(); // 버블링 막기
            }
        }
    })
</script>
</body>
</html>
```

> 이벤트 전파와 관련된 이벤트 수식어
>- stop: 이벤트 전파를 중단
>- capture: 이벤트 포착(capturing) 단계에서만 이벤트가 발생
>- self: 이벤트 발생(raising) 단계일 때만 이벤트 발생


## 6. 이벤트 수식어

### 6-1. once 수식어

- 한 번만 이벤트를 발생시키는 수식어

```
[예제 04-08]
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
 <title>04-08</title>
 <link rel="stylesheet" 
   href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 <style>
     .layout1 { margin:30px 30px 30px 30px; }
 </style>
 <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</head>
<body>
<div id="example" class="container layout1">
   <p><input type="text" v-model="amount" class="form-control" /></p>
   <p>
        <!-- once 수식어로 인해서 한번만 실행됨 -->
        <button id="create" v-on:click.once="specialEvent" class="btn btn-primary">계좌 개설 10000원 이벤트</button> 
        <button id="deposit" v-on:click="deposit($event)" class="btn btn-primary">예금</button>
        <button id="withdraw" v-on:click="withdraw" class="btn btn-primary">인출</button>
   </p>            
   <h3>계좌 잔고 : {{balance}}</h3>
</div>
<script type="text/javascript">
    var vm = new Vue({
        el : "#example",
        data : {
            amount : 0,
            balance : 0,
        },
        methods : {
            specialEvent : function(e) {
                this.balance += 10000;
            },
            deposit : function(e) {
                var amt = parseInt(this.amount);
                if (amt <= 0) {
                    alert("0보다 큰 값을 예금해야 합니다");
                } else {
                    this.balance += amt;
                }
            }, 
            withdraw : function(e) {
                var amt = parseInt(this.amount);
                if (amt <= 0) {
                    alert("0보다 큰 값을 인출할 수 있습니다");
                } else if (amt > this.balance) {
                    alert("잔고보다 많은 금액을 인출할 수 없습니다");
                } else {
                    this.balance -= amt;
                }
            }
        }
    })
</script>
</body>
</html>
```

### 6-2. 키코드 수식어
- 키보드 관련 이벤트 처리를 처리할 때 사용할 수 있는 수식어 
- 키보드의 키를 누를 때 고유의 키코드(keyCode)값을 가질 때만 이벤트를 발생시킬 수 있음

```
[예제 04-09]
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>03-08</title>
<style>
    #list  { width: 600px; border:1px solid black; border-collapse:collapse; }
    #list td, #list th { border:1px solid black;  text-align:center; }
    #list > thead > tr { color:yellow; background-color: purple; }
    [v-cloak] { display: none; }
</style>
</head>
<body>
    <div id="example"  v-cloak>
        <p>
            이름 : <input type="text" v-model="name" v-on:keyup="search" placeholder="두글자 이상을 입력하세요" />
        </p>
        <!-- 수식어로 키코드 적용  -->
        <p>
            이름 : <input type="text" v-model="name" v-on:keyup.13="search" placeholder="두글자 이상을 입력하세요" />
        </p>
        <table id="list">
            <thead>
                <tr>
                    <th>번호</th><th>이름</th><th>전화번호</th><th>주소</th>
                </tr>
            </thead>
            <tbody id="contacts" >
                <tr v-for="contact in contactlist">
                    <td>{{contact.no}}</td>
                    <td>{{contact.name}}</td>
                    <td>{{contact.tel}}</td>
                    <td>{{contact.address}}</td>
                </tr>
            </tbody>
        </table>
        <div v-show="isProcessing === true">조회중</div>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.min.js"></script>
    <script type="text/javascript">
        var vm = new Vue({
            el : '#example',
            data : {
                name : "",
                isProcessing : false,
                contactlist : []
            },
            methods : {
                search : function(e) {
                    if (e.keyCode === 13) { // keyCode 13 = 엔터키
                        // target = 이벤트가 발생하는 HYML 요소 = search 메서드를 호출하는 곳
                        var val = e.target.value;   
                        if (val.length >= 2) {
                            this.fetchContacts();
                        } else {
                            this.contactlist = [];
                        }
                    }
                },
                // fetchContacts: _.debounce(function() {   }
                fetchContacts : function() {
                    this.contactlist = [];
                    this.isProcessing = true;
                    var url = "http://sample.bmaster.kro.kr/contacts_long/search/" + this.name;
                    var vm = this;
                    fetch(url)
                        .then(function(response) {
                            return response.json()
                        }).then(function(json) {
                            vm.contactlist = json;
                            vm.isProcessing = false;
                        }).catch(function(ex) {
                            console.log('parsing failed', ex);
                            vm.contactlist = [];
                            vm.isProcessing = false;
                        })

                }
            }
        })
    </script>
</body>
</html>
```
- keyCode 조건처리를 함으로써, 타이핑을 할 때마다 메서드가 호출되지 않음<br>
따라서 3장의 예제와 같이 _.debounce를 이용할 필요가 없음 
- debounce() 메소드는 이벤트에 의해 특정 함수가 여러번 반복 실행될 수 경우에 사용하며 정해진 지연시간동안 반복된 호출을 딱 1번만 호출하도록 제어해줌

#### [키코드 수식어 별칭]

|||||
|:---|:---|:---|:---|
|.enter|.tab|.delete|.esc|
|.space|.up|.down|.left|
|.right|.ctrl|.alt|.shift|
|.meta|
|||||

>- 이 수식어들은 모두 keyup 이벤트에 적용 가능
>- 키코드 수식어들도 여러 개를 결합하여 사용 가능
>- 예시) CTRL+C (복사할 때 자주 사용하는 단축키) 구현 : v-on:keyup.ctrl.67="copy"


### 6-2. 마우스 버튼 수식어
||||
|:---|:---|:---|
|.left|.right|.middle|
||||

```
[예제 04-11]
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>04-11</title>
<style>
    html, body { margin: 0;padding: 0; }
    #example {
    height: 98vh; min-height: 100%; padding:10px
    }
</style>
<script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</head>
<body>
    <!-- 마우스 오른쪽 클릭했을때 내장 컨텍스트 메뉴가 나타나지 않도록 prevent 수식어 적용 -->
    <div id="example" v-on:contextmenu.prevent="ctxStop" @mouseup.left="leftMouse" @mouseup.right="rightMouse">
        <div>
            Left Click : 왼쪽으로<br /> 
            Right Click : 오른쪽으로
        </div>
        <img src="http://sample.bmaster.kro.kr/img/foot.jpg" v-bind:style="{ position:'absolute', left: pos.left + 'px', top:pos.top +'px' }" />
    </div>
    <script type="text/javascript">
        var vm = new Vue({
            el : "#example07",
            data : {
                pos : { 
                    left : 100, 
                    top:100 
                }
            },
            methods: {
                ctxStop : function(e) { },
                leftMouse : function(e) {
                    if (this.pos.left > 30)
                    this.pos.left -= 30;
                    console.log("Move Left!!");
                },
                rightMouse : function(e) {
                    this.pos.left += 30;
                    console.log("Move Right!!");
                }
            }
        })
    </script>
</body>
</html>
```