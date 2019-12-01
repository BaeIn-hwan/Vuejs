#Chapter5 스타일

## 1. 스타일 적용

HTML에서 인라인 스타일 사용을 권장하지 않듯이 Vue.js에서도 가능하다면
인라인 스타일은 사용하지 않는 것이 바람직하다. 

> 참고 사이트
>- 클래스와 스타일 바인딩 https://kr.vuejs.org/v2/guide/class-and-style.html
```
[예제 05-01] 스타일 적용
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chapter5. 스타일</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
   <section id="example1">
        <style>
            .test {background-color: yellow; border: double 4px grey;}
            .over {background-color: #aqua; width: 300px; height: 100px;}
        </style>
        <div style="background-color: orange;" class="test over"></div>
   </section>    
</body>
</html>
```

## 2. 인라인 스타일
- 인라인 스타일은 v-bind:style로 작성한다. 
- 스타일을 작성할 때 주의사항: 케밥 표기법이 아닌 카멜 표기법을 사용해야 하며, 세미콜론(;)이 아닌 콤마(,)를 사용해 구분한다.

|케밥 표기법|카멜 표기법|
|:---|:---|
|font-size|fontSize|
|background-color|backgroundColor|

```
[예제 05-02] 인라인스타일
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chapter5. 스타일</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
   <section id="example2">
        <div>
            <button id="a" v-bind:style="Style1" @mouseover.stop="overEvent" @mouseout.stop="outEvent">테스트</button>
        </div>
   </section>
    <script>
        var vm = new Vue ({
            el: "#example2"
            data: {
                style1: {backgroundColor: 'aqua', border:'solid 1px gray', width: '100px', textAlign: 'center'}
            },
            methods: {
                overEvent : function(e) {
                    this.style1.backgroundColor = "purple";
                    this.Style1.color = "yellow";
                },
                outEvent : function(e) {
                    this.style1.backgroundColor = 'aqua';
                    this.style1.color = 'black';
                }
            }
        })
    </script>   
</body>   
</html>
```
- 아래의 예제 05-03처럼 v-bind:style 디렉티브를 통해 개별적인 속성 하나하나를 바인딩할 수도 있다. 
- 이 방법은 코드를 유지보수하기 힘들기 때문에 추천하지 않는다. 

```
[예제 05-03] v-bind:style 디렉티브를 통한 개별 속성을 하나씩 바인딩하기
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chapter5. 스타일</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
   <section id="example3">
        <div :style="{backgroundColor: a.bc, border: a.bd, width: a.w+'px', height: a.h+'px'}"></div>
   </section>
    <script>
        var vm = new Vue ({
            el: "#example3",
            data: {
                a: {bc: 'yellow', bd: 'solid 1px gray', w:200, h:100}
            },
        })
    </script>   
</body>    
</html>
```
```
[예제 05-04] 여러 개의 스타일 객체 적용
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chapter5. 스타일</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
   <section id="example4">
        <button id="btn1" v-bind:style="[myColor, myLayout]">버튼1</button>   
    </section>
    <script>
        var vm = new Vue ({
            el: "#example4",
            data: {
                myColor: {
                    backgroundColor: 'purple',
                    color: 'yellow'
                },
                myLayout: {
                    width: '150px',
                    height: '80px',
                    textAlign: 'center'
                }
            },
        })
    </script>    
</html>
```
## 3. CSS 클래스 바인딩
  - css 클래스를 바인딩하기 위해 v-bind:class를 사용한다. 이때 개별적인 클래스 단위로 true가 되면 클래스가 주어진다.
  - v-bind:class를 이용해 클래스를 적용할 때는 boolean 값(true/false)을 이용해 지정한다.

```
[예제 05-05] v-bind:class 적용
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>05-05</title>
    <style>
        .set1 {background-color: aqua; color: purple;}
        .set2 {text-align: center; width: 120px;}
        .set3 {border:sandyBrown dashed 1px;}
    </style>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
    <section id="example5">
        <button id="btn1" v-bind:class="{set1:s1, set2:s2, set3:s3}">버튼</button>
        <p>
            <input type="checkbox" v-model="s1" value="true">set1 디자인 <br>
            <input type="checkbox" v-model="s2" value="true">set2 디자인 <br>
            <input type="checkbox" v-model="s3" value="true">set3 디자인 <br>
        </p>
    </section>
    <script>
        var vm = new Vue ({
            el: "#example5",
            data: {
                s1: false,
                s2: false,
                s3: false
            }
        })
    </script>    
</body>    
</html>
```
개별적인 값을 지정하는 것이 불편하다면 클래스 이름을 데이터 속성명으로 사용할 수도 있다.

```
[예제 05-06] 
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>05-06</title>
    <style>
        .set1 {background-color: aqua; color: purple;}
        .set2 {text-align: center; width: 120px;}
        .set3 {border:sandyBrown dashed 1px;}
    </style>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
   <section id="example6">
        <button id="btn1" v-bind:class="myStyle">버튼1</button>
        <p>
            <input type="checkbox" v-model="myStyle.set1" value="true">set1 디자인 <br>
            <input type="checkbox" v-model="myStyle.set2" value="true">set2 디자인 <br>
            <input type="checkbox" v-model="myStyle.set3" value="true">set3 디자인 <br>
        </p>
    </section>
    <script>
        var vm = new Vue ({
            el: "#example6",
            data: {
                myStyle: {
                    set1: false,
                    set2: false,
                    set3: false

                }
            }
        })
    </script>    
</body>    
</html>
```
## 4. 계산형 속성, 메서드를 이용한 스타일 적용

다음 예제는 입력 값이 올바른 범위에 포함되지 않을 때 스타일을 적용하는 예제이다.

```
[예제 05-07] 계산형 속성, 메서드를 이용한 스타일 적용
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>05-07</title>
    <style>
        .set1 {background-color: aqua; color: purple;}
        .set2 {text-align: center; width: 120px;}
        .set3 {border:sandyBrown dashed 1px;}
    </style>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
   <section id="example7">
        <div>
            <p>1부터 100까지만 입력 가능합니다.</p>
            <div>
                점수: <input type="text" class="score" v-model.number="score" v-bind:class="info">
                <img src="images/error.jpg" class="warnimage" v-show="info.warning">
            </div>
        </div>
    </section>
    <script>
        var vm = new Vue ({
            el: "#example7",
            data: {
                score: 0
            },
            computed: {
                info: function() {
                    if(this.score >= 1 && this.score <= 100)
                        return {
                            warning: false
                        };
                    else
                        return {
                            warning: true
                        };
                }
            }
        })
    </script>    
</body>    
</html>
``` 
 

## 5. 컴포넌트에서의 스타일 적용
Vue 컴포넌트는 아직 배우지 않은 내용이지만 스타일에 국한된 방법이라면 어렵지 않게 학습할 수 있다.
간단한 Vue 컴포넌트는 Vue.component()를 이용해 작성할 수 있다.

```
[예제 05-08] 컴포넌트에서의 스타일 적용
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>05-08</title>
    <style>
        .boxcolor {background-color: orange;}
        .center {width: 200px; height: 100px; line-height: 100px; text-align: center; border: 1px solid gray;}
    </style>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
    <section id="example8">
        <div>
            <center-box v-bind:class="boxstyle"></center-box>
        </div>
    </section>
    <script>
        Vue.component('center-box', {
            template: '<div class="center">중앙에 위치</div>'
        })
        var vm = new Vue ({
            el: "#example8",
            data: {
                boxstyle: {boxcolor: true}
            }
        })
    </script>    
</body>    
</html>
```

## 6. TodoList 예제
1-5장에서 학습한 내용을 바탕으로 todolist앱을 만들어본다.
간단히할 일 목록을 작성하고 저장, 삭제, 완료 처리를 할 수 있는 기능을 제공한다.

```
[예제 05-09] TodoList 예제
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>05-09</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>      
</head>
<body>
    <section id="todolistapp">
        <div id="header" class="header">
            <p>Todo List App</p>
            <input type="text" class="input" id="task" v-model.trim="todo" placeholder="입력 후 엔터!" v-on:keyup.enter="addTodo">
            <span class="addbutton" v-on:click="addTodo">추가</span>
        </div>
        <ul id="todolist">
            <li v-for="a in todolist" v-bind:class="checked(a.done)" v-on:click="doneToggle(a.id)">
                <span>{{a.todo}}</span>
                <span v-if="a.done">(완료)</span>
                <span class="close" v-on:click.stop="deleteTodo(a.id)">&#x00D7;</span>
            </li>                  
        </ul>
    </section>
    <script>
        var vm = new Vue ({
            el: "#todolistapp",
            data: {
                todo: "",
                todolist: [
                    {
                        id: 1,
                        todo: "영화보기",
                        done: false
                    },{
                        id: 2,
                        todo: "주말 산책",
                        done: false
                    },{
                        id: 3,
                        todo: "ES6 학습",
                        done: false
                    },{
                        id: 4,
                        todo: "잠실 야구장",
                        done: false
                    }
                ]
            },
            methods: {
                checked: function(done) {
                    if(done) return {checked: true};
                    else return {checked: false}; 
                },
                addTodo: function(e) {
                    if(this.todo.trim() !== '') {
                        this.todolist.push({
                            id: new Date().getTime(), 
                            todo: this.todo.trim(), 
                            done: false
                        });
                        this.todo = "";
                    }
                },
                deleteTodo: function(id) {
                    var index = this.todolist.findIndex(function(item) {
                        return item.id === id;
                    })
                    this.todolist.splice(index,1);
                },
                doneToggle: function(id) {
                    var index = this.todolist.findIndex(function(item) {
                        return item.id === id;
                    })
                    this.todolist[index].done = !this.todolist[index].done;
                }
            }
        })
    </script>    
</body>    
</html>
```
> Todolist에 필요한 메서드 
    >- checked 메서드 : todolist 데이터 속성에서 done 속성이 true인 경우 checked 클래스를 적용 여부를 결정하는 기능을 제공한다. 
    >- addTodo 메서드 : 추가 버튼을 클릭하거나 입력 필드에서 엔터 키를 눌렀을 때 할 일을 목록에 추가하는기능을 제공한다.
    >- deleteTodo 메서드 : 할 일 목록 오른쪽 끝의 x를 클릭하면 목록에서 삭제된다. 삭제를 위해서 배열의 splice 메서드를 사용하며 사용 방법은 splice(index, deletecount)와 같다.
    >- doneToggle 메서드 : 할 일 목록을 클릭하면 done 속성을 true/false로 토글한다.

