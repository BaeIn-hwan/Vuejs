#Chapter2 Vue.js기초

## 1. hellovuejs 예제 분석
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <script src="https://unpkg.com/cue@2.5.16/dist/vue.js"></script>
    </head>
    <body>
            <!--View-->
            <div id="simple">
                <h2>{{message}}</h2>
            </div>
            <script>
            
            //Model
                var model = {
                    message: "Hola ~ Hello ~~"
                };
            //View Model
                var sample1 = new Vue ({
                    el: "#simple",
                    data: model
                });
            </script>
    </body>
</html>
```
- Model은 데이터를 가지고 있다.<br>
- sample1 의 객체는 "vue 객체"이자, "view model 객체"이다.<br>

- vue 객체 안의 el 속성은 HTML 요소를 나타낸다.<br>
- vue 객체 안의 data 속성은 모델 객체를 참조한다. <br>

>> 즉, vue 객체는 HTML요소와 데이터를 참조한다. <br>
>> 따라서 데이터(model) 이 변경되면 뷰모델 객체는 즉시 HTML요소에 반영한다.

>> HTML 요소에서는 {{ }}와 같은 콧수염과 닮은 모양의 템플릿 표현식을 사용해 
선언적으로 HTML DOM에 데이터를 렌더링 한다.<br>
>> 콧수염 표현식 또는 보간법 (문자열을 덧붙인가는 의미) 라고도 한다.

>> 모든 작업은 반응형으로 이루어진다. 모델을 변경하면 뷰모델 객체를 통해 HTML DOM이 즉시 변경된다.
#### <MVVM 패턴>
##### VIEW (유저 인터페이스) <br>
데이터 바인딩과 커맨드 ↓ ↑ 알림전송<br>

#####VIEW MODEL(상태와 연산)<br>

업데이트↓ ↑ 알림전송<br>

#####MODEL (도메인 특화 데이터)<br>

## 2. 기본디렉티브
> 렌더링을 위해 HTML요소 내부에 템플릿 표현식만 사용할 수 있는 것은 아니다. "디렉티브"를 사용할 수도 있다.
#### 2 - 1) v-text v-html 디렉티브  [단방향 디렉티브]
```
        <div id="simple2">
            <h2 v-text="message"></h2>
        </div>
        <script>
            var model = {
                message: "Hola ~ Hello ~~"
            };
    
            var sample2 = new Vue({
                el: "#simple2",
                data: model
            })
        </script>
```
    > model.message = "모델을 변경해보자";
       <h2>모델을 변경해보자</h2>
       // 모델을 변경하니 HTML 요소가 바뀌는 것이 확인 가능하다.
     
    //v-text 디렉티브를 사용했을 때, 인코딩, 디코딩 수행
    > document.getElementById("simple2").innerHTML
     "<h2>&lt;i&gt;html태그는 어찌되니ㅏ?&lt;/i&gt;</h2>"
     
    //v-html 디렉티브를 사용했을 때, 인코딩, 디코딩 수행하지 않음 
    > document.getElementById("simple2").innerHTML
     "<h2><i>html태그는 어찌되니ㅏ?</i></h2>"
       
- v-html 디렉티브는 script 태그를 그대로 바인딩 하기 때문에 요즘 문제가 되는 XSS 공격 등에 취약하다.
   꼭 필요한 경우가 아니라면 v-text를 사용하는 것이 더 안전하다.

#### 2-2) v-bind 디렉티브 [단방향 디렉티브]
> v-bind는 요소의 콘텐츠 영역(태그영역)을 설정하는 것이 아닌 요소 객체들의 "속성"들을 바인딩 하기 위해 사용한다.
``` 
        <div id="simple3">
            <input type="text" id="a" v-bind:value="message">
            <img v-bind:src="imagePath"  style="width:300px; height:300px; background: yellow;">
        </div>
        <script>
            var model3 = {
                message: 'v-bind 디렉티브사용',
                imagePath: '../images/sample.jpg'
            }
    
            var sample3 = new Vue({
                el: "#simple3",
                data: model3
            })
        </script>
```
    > v-bind 디렉티브를 통해 HTML요소 속성을 변경한 것을 확인할 수 있다.
    > v-bind:src 에서 v-bind를 생략하고 :src 로도 사용할 수 있다.

#### 2-3) v-model 디렉티브 [양방향 디렉티브]
> 앞의 디렉티브들은 모두 단방향 디렉티브이기 때문에, html요소의 값을 변경하더라도 모델 객체의 값이 바뀌지 않는다.
> 양방향 데이터 바인딩이 필요할 때 v-model을 사용하면 된다.
``` 
    <div id="simple4">
        <input type="text" v-model="name" placeholder="이름을 입력하세요">
        <br>
        <h2>제 이름은 <span v-html="name"></span>입니다.</h2>
    </div>
    <script>
        //양방향 통신
        var sample4 = new Vue({
            el: "#simple4",
            data: {
                name: ''
            }
        })
    </script>
```
    > input 박스에 이름을 입력하면 바인딩된 span태그와 모델 객체의 속성이 변경된 것을 확인 할 수 있다.
    > 바뀌는 부분에는 v-model을, 받는 부분에는 v-html을 사용.
    > sample4.name
      조애나
      
      
``` 
        <div id="simple5">
            <div>좋아하는 과일을 모두 골라주세요</div>
            <input type="checkbox" value="사과" v-model="fruits">사과,
            <input type="checkbox" value="키위" v-model="fruits">키위,
            <input type="checkbox" value="포도" v-model="fruits">포도,
            <input type="checkbox" value="수박" v-model="fruits">수박,
            <input type="checkbox" value="참외" v-model="fruits">참외,
        </div>
        <hr/>
        <div id="simple5_1">
            선택한과일들: <span v-html="fruits"></span>
        </div>
        <script>
                //양방향통신 checkbox
                var model5 = {
                    fruits: []
                }
        
                var sample5 = new Vue({
                    el: "#simple5",
                    data: model5
                })
        
                var sample5_1 = new Vue({
                    el: "#simple5_1",
                    data: model5
                })
        </script>
```
    > vue객체 sample5와 sample5_1 모두 같은 model5를 참조하고 있다.
    > 따라서 sample5에서는 v-model을 통해 model5을 변경하고, 
    그 변경된 model5을 sample5_1이 v-html 을 통해 참조하고 있는 것이다.
``` 
    //위 예시를 model 없이 vue객체 만으로 해결하기
        <div id="checkboxTest">
            <label for="f1">사과</label>
            <input type="checkbox" name="f1" value="사과" v-model="fruits">
            <label for="f2">키위</label>
            <input type="checkbox" name="f2" value="키위" v-model="fruits">
            <label for="f3">포도</label>
            <input type="checkbox" name="f3" value="포도" v-model="fruits">
            <label for="f4">수박</label>
            <input type="checkbox" name="f4" value="수박" v-model="fruits">
            <label for="f5">참외</label>
            <input type="checkbox" name="f5" value="참외" v-model="fruits">
            <span v-html="fruits"></span>
        </div>
        <script>
            var checkboxTest = new Vue ({
                el: "#checkboxTest",
                data: {
                    fruits:[]
                }
            })
        </script>
```

#### [v-model 디렉티브가 지원하는 몇가지 수식어]
    1. lazy 입력폼에서 이벤트가 발생할 때 입력한 값을 데이터와 동기화. 텍스트 박스에서라면 입력 후 포커스가 이동하거나 할 때 데이터 옵션값이 변경됨.
    ex ) <input type="text" v-model.lazy="name">
    2.number 숫자가 입력될 경우 number 타입의 값으로 자동 형변환되어 데이터 옵션 값으로 반영
    3. trim 문자열의 앞뒤 공백을 자동으로 제거
#### 2-4) v-show v-if v-else-if 디렉티브
> v-if란?
 - Vue 객체의 data 속성 값에 따라 렌더링 여부를 결정할 수 있는 기능. if 문과 같은 기능
 - 조건에 부합하지 않으면 렌더링을 하지 않음<br>

> v-show란 ?
 - v-if 와 비슷하지만 "렌더링 여부"로 나뉨.
 - 일단 HTML 요소를 렌더링 한 후에 display 스타일 속성으로 화면에 보여줄지의 여부를 결정함.

``` 
// v-if 와 v-show 
    <div id="account">
        예금액: <input type="text" v-model="amount">
        <!--v-if디렉터브 사용-->
        <img v-if="amount < 0" src="images/error.png" title="마이너스는 허용하지 않습니다." style="width: 15px; height: 15px; vertical-align: middle;">
        <!--v-show 디렉티브 사용-->
        <img v-show="amount < 0" src="images/error.png" title="마이너스는 허용하지 않습니다." style="width: 15px; height: 15px; vertical-align: middle;">
    </div>
    <script>
        var sample6 = new Vue({
            el: "#account",
            data: {
                amount: 0
            }
        })
    </script>
```
    > v-if를 사용하면 "amount < 0"이 되기 전에는, 즉 조건에 부합하기 전까지는 img태그는 렌더링 되지 않음.(소스상에 보이지않음)
    > v-show를 사용하면 일단 html 요소를 렌더링 하기 때문에 조건에 부합하지 않더라도 렌더링은 함. 조건에 부합하지 않으면 태그는 display: none; 상태임.
    >> 화면이 자주 변경되는 부분에 대해서는 v-show디렉티브를 사용하는 것이 더 바람직하다.
    
```
 //v-if, v-else, v-else-if  계좌 잔고에 따라 고객의 등급을 평가하기
  <div id="simple7">
      잔고: <input type="text" v-model="balance">
      <br>
      회원님의 등급:
      <span v-if="balance >= 100000">Gold</span>
      <span v-else-if="balance >= 50000">Silver</span>
      <span v-else-if="balance >= 20000">Bronze</span>
      <span v-else>Basic</span>
  </div>
  <script>
        var sample7 = new Vue({
            el: "#simple7",
            data: {
                balance: 0
            }
        })
  </script>
```
## 3. 반복 렌더링 디렉티브 v-for
> ### 배열을 이용하는 v-for 디렉티브 <br>
>> #### v-for = "( info in contacts )" &nbsp;&nbsp;{{ info.num }}
``` 
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="utf-8">
        <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    </head>
    <body>
        <div id="simple8">
            <table id="list">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>주소</th>
                    </tr>
                </thead>
                <tbody id="wrap-table">
                    <tr v-for="info in contacts">
                        <td>{{info.no}}</td>
                        <td>{{info.name}}</td>
                        <td>{{info.tel}}</td>
                        <td>{{info.address}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <script>
            var model8 = {
                "pageno": 1,
                "pagesize": 10,
                "totalcount": 100,
                "contacts": [
                    {"no":100, "name":"설현", "tel": "010-3456-8299", "address": "안산"},
                    {"no":99, "name":"혜리", "tel": "010-1111-3499", "address": "서산"},
                    {"no":98, "name":"하니", "tel": "010-3126-8439", "address": "서울"},
                    {"no":97, "name":"성현", "tel": "010-3123-8457", "address": "부산"}
                ]
            }

            var list = new Vue({
                el : "#simple8",
                data: model8
            })
        </script>
    </body>
</html>
```
    >>  <tr v-for="info in contacts">
           <td>{{info.no}}</td>
           <td>{{info.name}}</td>
           <td>{{info.tel}}</td>
           <td>{{info.address}}</td>
       </tr> 
       바로 이부분이 반복해서 렌더링 되는 html 요소이다
       v-for을 사용해 참조하는 model의 데이터만큼 반복되어 나타납니다. 
       

 > ###객체를 이용하는 v-for 디렉티브 (해쉬구조 -  키, 값)      
 > #### v-for = " (val, key) in regions" 
``` 
// 객체를 이용하는 v-for 디렉티브 (해쉬구조 -  키, 값)
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="utf-8">
        <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    </head>
    <body>
        <div id="simple9">
            <select name="" id="">
                <option value="">지역을 선택하세요</option>
                <option v-for="(val, key) in regions" v-bind:value="key">{{val}}</option>
            </select>
        </div>
        <script>
            var regionList = {
                "수도권" : "강남역",
                "부산" : "부산역",
                "중국" : "북경역"
            }
    
            var region = new Vue({
                el: "#simple9",
                data: {
                    regions: regionList
                }
            })
        </script>
    </body>
    </html>
```

만약 인덱스를 표현해야한다면 ? 
- 배열데이터인 경우
``` 
<tr v-for="(contact, index) in contacts"></tr> 
```

``` 
<tbody id="wrap-table">
    <tr v-for="(info, index) in contacts">
        <td>{{index+1}}</td>
        <td>{{info.name}}</td>
        <td>{{info.tel}}</td>
        <td>{{info.address}}</td>
    </tr>
</tbody>
```

- 객체 데이터인 경우
``` 
<option v-for="(val, key, index) in regions"></option>
```
``` 
<div id="simple9">
    <select name="" id="regions">
        <option value="">지역을 선택하세요</option>
        <option v-for="(val, key, index) in regions" v-bind:value="key">{{ index+1 }} :{{val}}</option>
    </select>
</div>
```
> ###template 로 여러개 요소를 묶어 반복 렌더링하기

``` 
//예제 2-10 template 로 여러개 요소를 묶어 반복 렌더링하기
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <style>
        .division {
            height: 2px;
            background: #000;
        }
    </style>
</head>
<body>
    <table id="example10">
        <tbody>
            <template v-for="(person, index) in infoList">
                <tr>
                    <td>{{person.no}}</td>
                    <td>{{person.name}}</td>
                    <td>{{person.tel}}</td>
                    <td>{{person.address}}</td>
                </tr>
                <tr v-if="(index % 5 == 4)" class="division">
                    <td colspan="4"></td>
                </tr>
            </template>
        </tbody>
    </table>
    <script>
        var model10 = {
            "infoList" : [
                {"no" : 1, "name" : "신지은", "tel" : "010299999", "address" : "안산"},
                {"no" : 1, "name" : "신지은2", "tel" : "010299999", "address" : "안산"},
                {"no" : 1, "name" : "신지은3", "tel" : "010299999", "address" : "안산"},
                {"no" : 1, "name" : "신지은4", "tel" : "010299999", "address" : "안산"},
                {"no" : 1, "name" : "신지은5", "tel" : "010299999", "address" : "안산"},
                {"no" : 1, "name" : "신지은6", "tel" : "010299999", "address" : "안산"},
                {"no" : 1, "name" : "신지은7", "tel" : "010299999", "address" : "안산"},
                {"no" : 1, "name" : "신지은8", "tel" : "010299999", "address" : "안산"},
                {"no" : 1, "name" : "신지은9", "tel" : "010299999", "address" : "안산"},
            ]
        }
        var sample10 = new Vue({
            el : "#example10",
            data: model10
        })
    </script>
</body>
</html> 
  
```  
    > tr요소를 한번에 반복 렌더링 하기 위해 template태그로 묶어 처리.
    > template 태그는 렌더링 내용에는 포함되지 않는다.
    > v-if 조건이 맞을 때에만 해당 태그가 렌더링 된다.

###만약 가상 DOM객체에 접근하고 싶다면? KEY를 사용 !
>- vue js는 가상 DOM 을 지원한다.<br>
>- 가상 DOM은 렌더링 속도를 빠르게 하기 위해 "변경된 부분만"을 업데이트한다.<BR>
>- 만약 v-for로 렌더링한 배열 데이터의 순서가 변경되면 DOM요소를 이동시키지 않고 기존 DOM 요소의 데이터를 변경한다.<BR>
>- 만약 DOM요소를 찾아 직접 위치를 변경하고자 한다면 DOM요소에 "KEY값"을 부여하여 컨트롤이 가능하다.

``` 
    <table id="example10">
        <tbody>
            <template v-for="(person, index) in infoList">
                <tr :key="contact.no">
                    <td>{{person.no}}</td>
                    <td>{{person.name}}</td>
                    <td>{{person.tel}}</td>
                    <td>{{person.address}}</td>
                </tr>
                <tr v-if="(index % 5 == 4)" class="division">
                    <td colspan="4"></td>
                </tr>
            </template>
        </tbody>
    </table>
```
## 4. 기타 디렉티브 v-pre / v-once
```
///v-pre 예제
     <div id="simple11">
         <span v-pre>{{message}}</span>
     </div>
     <script>
          var sample11 = new Vue({
             el: "#simple11",
             data: {
                 message: "hello world"
             }
         })
    </script>
```
    결과값 : {{message}}가 출력됨.


``` 
 //v-once 예제
 <div id="simple12">
     <span v-once>{{message}}</span>
 </div>
 <script>
   var sample12 = new Vue({
     el: "#simple12",
     data: {
         message: "HELLO WORLD"
     }
   })
 </script>
```
    > 원래는 console.log 창에서 sample12.message = "다른걸로메세지변경" 하면 자동으로 렌더링 됨
    > 그러나 v-once를 쓰면 한번만 렌더링을 수행하기 때문에 바뀌지 않음!!    

## 5. 계산형 속성
> v-bind 디렉티브를 이용한 간단한 데이터 바인딩은 가능하지만 로직이 필요한 경우에는 계산형 속성을 통해 해결할 수 있습니다.

``` 
//02-13 계산형 속성 적용 
 <!DOCTYPE html>
 <html lang="ko">
     <head>
     <meta charset="utf-8">
     <title></title>
     <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
     </head>
     <body>
         <div id="example">
             <input type="text" v-model="num"></div><br>
             1부터 입력된 수까지의 합 : <span>{{sum}}</span>
         </div>
         <script>
             //1부터 입력된 수까지의 합구하기
             var vmSum = new Vue({
                 el: "#example",
                 data: {num: 0},
                 computed: {
                     sum: function(){
                         var target_num = Number(this.num);
                         if (Number.isNaN(target_num) || target_num < 1) {
                             return 0;
                         }
                         return ((1+target_num) * n) / 2;
                     }
                 }
             })
         </script>
     </body>
 </html>
```
    >input박스에서 받는 숫자는 숫자라고 생각하기 쉽지만 문자열이다. 따라서 Number로 감싸줘야 연산이 가능하다.
    > 함수 내부에서의 this는 객체 자신을 참조한다.
    > 즉 computed의 sum안에있는 this는 객체 자신 == vmSum 이다.
    > 그러나 함수 내부에서 다른 콜백함수를 실행하거나 했을 때 this가 다른값으로 연결될 수도 있기때문에 주의해야한다. (다음예제에서 계속)

``` 
    //추가예제 
    
```


### 계산형 속성
계산형 속성(Computed Property)은 이러한 문제를 해결하는 방법 중의 하나입니다. Vue 객체를 만들 때 Computed라는 속성과 함께 함수를 등록해두면 마치 속성처럼 이용할 수 있습니다.
```
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script  src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <style>
        #list {width: 400px; border: 1px solid black; border-collapse: collapse;}
        #list td, #list th {border: 1px solid black; text-align: center;}
        #list > thead > tr {color: yellow; background-color: purple;}
    </style>
</head>
<body>
<h1>Vue</h1>
<div id="exmaple">
    <p>
        국가명 : <input type="text" v-model="countryname" placeholder="국가명">
    </p>
    <table id="list">
        <thead>
        <tr>
            <th>번호</th>
            <th>국가명</th>
            <th>수도</th>
            <th>지역</th>
        </tr>
        </thead>
        <tbody id="contacts">
            <tr v-for="c in filtered">
                <td>{{c.no}}</td>
                <td>{{c.name}}</td>
                <td>{{c.capital}}</td>
                <td>{{c.region}}</td>
            </tr>
        </tbody>
    </table>
</div>
<script>
    var model = {
        countryname : "",
        countries : [
            { no:1, name : "미국", capital : "워싱턴DC", region: "america"},
            { no:1, name : "프랑스", capital : "파리", region: "europe"},
            { no:1, name : "영국", capital : "런던", region: "europe"},
            { no:1, name : "중국", capital : "베이징", region: "asia"},
            { no:1, name : "태국", capital : "방콕", region: "asia"},
            { no:1, name : "모로코", capital : "라바트", region: "africa"},
            { no:1, name : "라오스", capital : "비엔티안", region: "asia"},
            { no:1, name : "베트남", capital : "하노이", region: "asia"}
        ]
    }
    var clist = new Vue({
        el: "#exmaple",
        data : model,
        computed : {
            filtered : function() {
                var cname = this.countryname.trim();
                return this.countries.filter(function(item, index) {
                    if(item.name.indexOf(cname) > -1) {
                        return true;
                    }
                })
            }
        }
    })
</script>
</body>
</html>
```
v-model 디렉티브를 이용해 양방향 바인딩으로 사용자의 입력값을 받아내고있습니다.  이 문제를 해결하기 위해서는 v-on 디렉티브를 이용해 keyup이벤트 처리를 수행하면 됩니다.

```
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script  src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <style>
        #list {width: 400px; border: 1px solid black; border-collapse: collapse;}
        #list td, #list th {border: 1px solid black; text-align: center;}
        #list > thead > tr {color: yellow; background-color: purple;}
    </style>
</head>
<body>
<h1>Vue</h1>
<div id="exmaple">
    <p>
        국가명 : <input type="text" :value="countryname" placeholder="국가명" @input="nameChanged">
    </p>
    <table id="list">
        <thead>
        <tr>
            <th>번호</th>
            <th>국가명</th>
            <th>수도</th>
            <th>지역</th>
        </tr>
        </thead>
        <tbody id="contacts">
            <tr v-for="c in filtered">
                <td>{{c.no}}</td>
                <td>{{c.name}}</td>
                <td>{{c.capital}}</td>
                <td>{{c.region}}</td>
            </tr>
        </tbody>
    </table>
</div>
<script>
    var model = {
        countryname : "",
        countries : [
            { no:1, name : "미국", capital : "워싱턴DC", region: "america"},
            { no:2, name : "프랑스", capital : "파리", region: "europe"},
            { no:3, name : "영국", capital : "런던", region: "europe"},
            { no:4, name : "중국", capital : "베이징", region: "asia"},
            { no:5, name : "태국", capital : "방콕", region: "asia"},
            { no:6, name : "모로코", capital : "라바트", region: "africa"},
            { no:7, name : "라오스", capital : "비엔티안", region: "asia"},
            { no:8, name : "베트남", capital : "하노이", region: "asia"}
        ]
    }
    var clist = new Vue({
        el: "#exmaple",
        data : model,
        computed : {
            filtered : function() {
                var cname = this.countryname.trim();
                return this.countries.filter(function(item, index) {
                    if(item.name.indexOf(cname) > -1) {
                        return true;
                    }
                })
            }
        },
        methods: {
            nameChanged: function(e) {
                this.countryname = e.target.value;
            }
        }
    })
</script>
</body>
</html>

```