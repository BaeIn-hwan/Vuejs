# 07 ECMAScript 2015

ES2015는 최신 브라우저에서만 지원하므로 트랜스파일러(Transpiler)를 이용하여 오래된 브라우저에서도 사용할 수 있는 하위 버전의 자바스크립트로 번역합니다.  
가장 대표적인 트랜스파일러가 Babel, TSC(TypeScript Compiler)이며, Vue CLI는 두가지 트랜스파일러를 모두 제공합니다.

## 7.1 ES2015를 사용하기 위한 프로젝트 설정

1.  npm init 을 이용하여 프로젝트 생성

2. Babel 설치
```terminal
// yarn 설치
npm install -g babel-cli yarn 
//(window)
sudo npm install -g babel-cli yarn 
//(macOS)

// babel
yarn add -D babel-cli babel-preset-env babel-preset-stage-2
// - 또는 -
npm install --sabe-dev babel-cli babel-preset-env babel-preset-stage-2
```
> --save 와 --save-dev 의 차이는 실행중에 사용되는지의 여부로 Babel 트랜스파일러는 실행 시에 사용하기 위한 것이 아니므로 개발 의존성으로 설치합니다.

- babel-cli : CLI(Command Line Interface), babel 명령어를 명령창 또는 터미널창에서 입력하여 실행할 수 있도록 합니다.

- babel-preset-env : 최신 표준 스펙의 프리셋을 사용할 수 있도록 합니다. (es2015, es2016, es2017 모두 포함)

- babel-preset-stage-2 : 전개 연산자(Spread Operator)를 사용하기 위해 이책에서는 stage-2 프리셋을 사용

[babel 프리셋 스테이지2 자세히 보기 링크](https://babeljs.io/docs/en/babel-preset-stage-2.html)

---
## 7.1.1 바벨 실행해보기
1. .babelrc 작성하기
```javascript
{
    "presets" : [ "env", "stage-2"]
}
```
2. 예제 작성
```javascript
// ./src/07-01.js
let name = 'world';
console.log(`Hello ${name}`);
```
3. 명령어 실행으로 build하기
```terminal
babel src -d build
```
[웹기반 Babel Repl 도구](https://babeljs.io/repl/)

---

## 7.2 let과 const
> var 키워드는 호이스팅되며 함수 단위의 스코프만 지원합니다. <br/>{ }로 묶어진 블록 내에서 선언한 변수는 별도의 스코프를 만들지 않는다는 것을 의미합니다. <br>ES2015에서는 이러한 문제를 해결하기 위해 let 키워드를 지원합니다. 블록 단위의 스코프도 해결했고, 변수의 중복 선언을 방지할 수 있습니다.

```javascript
// ./src/07-02.js
let msg = "GLOBAL";
function outer(a) {
    let msg = "OUTER";
    console.log(msg);
    if (true) {
        let msg = "BLOCK";
        console.log(msg);
    }
}

// ./build/07-02.js
"use strict";

var msg = "GLOBAL";
function outer(a) {
    var msg = "OUTER";
    console.log(msg);
    if (true) {
        var _msg = "BLOCK"; // 충돌을 피하기 위해 변수명이 변경되었습니다.
        console.log(_msg);
    }
}
```
> const는 상수 기능을 제공합니다. 한번 값이 주어지면 변경할 수 없습니다. <br>const 또한 블록 스코프를 제공합니다.
```javascript
const name = "ES6";
name = "ES5";
// Uncaught TypeError: Assignment to constant variable.

const arr = [1,2,3];
arr = [1,2,3,4];
// Uncaught TypeError: Assignment to constant variable.

const arr1 = [1,2,3];
arr1.push(4);
// [1,2,3,4]

const obj = {"name" : "ES6", "project" : ""};
obj.project = "Vue.js";
// {name: "ES6", project: "Vue.js"}


// 배열이나 객체의 경우 메모리를 참조하기 때문에 내부 값이 변하는 경우 에러가 발생하지 않습니다.
```

> let 과 const는 중복선언을 허용하지 않습니다.

## 7.3 기본 파라미터와 가변 파라미터
- 기본 파라미터 : 파라미터에 기본값을 부여하여 전달값이 없을 경우 기본값을 가지고 있습니다.
```javascript
function addContact(name, mobile,home="없음",address="없음",email="없음"){
    var str = `name=${name}, mobile=${mobile}, home=${home}, address=${address}, email=${email}`;
    console.log(str);
}
addContact("홍길동", "010-222-3331");
addContact("이몽룡", "010-222-3331", "02-3422-9900", "서울시");

// 결과
//name=홍길동, mobile=010-222-3331, home=없음, address=없음, email=없음
//name=이몽룡, mobile=010-222-3331, home=02-3422-9900, address=서울시, email=없음
```
- 가변 파라미터 : 여러 개의, 개수를 지정하지 않은 파라미터 값을 배열로 받을 수 있도록 합니다. <b style="color:red">(가변 파라미터는 가장 마지막에 입력되어야합니다.)</b>
```javascript
function foodReport(name, age, ...favoriteFoods){
    console.log(name + ", " + age);
    console.log(favoriteFoods);
}

foodReport("이몽룡", 20, "짜장면", "냉면", "불고기");
foodReport("홍길동", 16, "초밥");
```

## 7.4 구조분해 할당(destructuring assignment)
```javascript
let arr = [10, 20, 30, 40];
let [a1,a2,a3] = arr;
console.log(a1,a2,a3);

let p1 = {name:"홍길동", age:20, gender:"M"};
let {name:n, age:a, gender} = p1;   //변수명과 키가 동일할 경우 생략가능
console.log(n,a,gender};
```
- 함수에서의 구조분해 할당
```javascript
function addContact2({name, phone, email="이메일 없음", age=0}){
    console.log("이름 : " + name);
    console.log("전번 : " + phone);
    console.log("이메일 : " + email);
    console.log("나이 : " + age);
}

addContact2({
    name : "이몽룡",
    phone : "010-3434-8989"
});
```

## 7.5 화살표 함수(Arrow function)
> ES2015의 화살표 함수는 기존 함수 표현식에 비해 간결함을 제공하며 함수를 정의하는 영역의 this를 그대로 전달받을 수 있습니다.
```javascript
var test1 = function(a,b) {
    return a+b;
}
let test2 = (a,b) => {
    return a+b;
}
let test3 = (a,b) => a+b;
```
[Babel Repl 에서 트랜스파일 된 소스 확인하기](https://babeljs.io/repl/)


> 
```javascript
function Person(name, yearCount) {
    this.name = name;
    this.age = 0;
    var incrAge = function() {
        this.age++;
    }
    for(var i=1; i <= yearCount ; i++) {
        incrAge();
    }
}

var p1 = new Person("홍길동", 20);
console.log(p1.name + "님의 나이 : " + p1.age);
// incrAge 안에 있는 this는 Person의 this를 참조하지 않는다.

function Person2(name, yearCount) {
    this.name = name;
    this.age = 0;
    var incrAge = () => {   //화살표함수로 바꾸면 this는 Person을 참조
        this.age++;
    }
    for(var i=1; i <= yearCount ; i++) {
        incrAge();
    }
}
var p2 = new Person2("홍길동", 20);
console.log(p2.name + "님의 나이 : " + p2.age);
```

## 7.6 새로운 객체 리터럴
> 객체의 속성 표기법이 개선되어 객체의 속성을 작성할 때 변수명과 동일하다면 생략 할 수 있습니다.

```javascript
var name = "홍길동";
var age = 20;
var email = "gdhong@test.com";

//var obj = { name : name, age: age, email:email};
var obj = { name, age, email };
console.log(obj);
```
> 새로운 메서드 표기법
```javascript
let p3 = {
    name : "아이패드",
    price : 200000,
    quantity : 2,
    order : function() {    // 기존의 메서드 선언방식
        if(!this.amount) {
            this.amount = this.quantity * this.price;
        }
        console.log("주문금액 : " + this.amount);
    },
    //discount : function discount(rate) {
    discount(rate) {    // 메서드 선언 개선방식
        if (rate > 0 && rate < 0.8) {
            this.amount = (1-rate) * this.price * this.quantity;
        }
        console.log((100 * rate) + "% 할인된 금액으로 구매합니다.");
    }
}
p3.discount(0.2);
p3.order();
```

## 7.7 템플릿 리터럴
> 템플릿 리터럴은 역따옴표( ` )로 묶여진 문자열에서 템플릿 대입문( ${ } )를 이용해 동적으로 문자열을 끼워넣어 구성할 수 있는 방법을 제공합니다. <br/>한글은 유니코드 이스케이프 형식으로 변환되어 컴파일 됩니다. ( ex : \ub2D8 ) 
```javascript
var d1 = new Date();
var name = "홍길동";
var r1 = `${name} 님에게 ${d1.toDateString()} 에 연락했다.`;
console.log(r1);
```

## 7.8 컬렉션

## 7.9 클래스

## 7.10 모듈
<b><필수>해당 예제는 babel src-d build 를 사용하여 트랜스파일한 뒤 
트랜스파일된 코드를 이용해 실행하세요.</b>
>모듈 내보내기 형식 입니다. 개별로 내보낼 수도 있고, 묶음으로 내보낼 수도 있습니다.
```javascript
// ./src/utils/utility1.js

// 개별 export
export let var1 = 1000;
export function add(a,b) {
    return a+b;
}

// 묶음 export
let var2 = 1000;
function add2(a,b) {
    return a+b;
}

export { var2, add2 };

// 단일 export 일 경우 default 키워드를 이용
let calc = {
    add(x,y) {
        return x+y;
    },
    multiply(x, y) {
        return x*y;
    }
}

export default calc;
```
> 모듈 가져오기 형식입니다. 구조분해할당 형식으로 가져올 수 있으며, as 예약어를 이용하여 변수명을 변경하여 사용할 수도 있습니다. <br>또한 단일 값을 export하는 경우 default 키워드를 이용해 내보낼 수 있으며 import로 받을 경우에도 { 이름 } 처럼 구조분해 할당을 사용하지 않고 import 이름 from 와 같이 단일 객체로 가져올 수 있습니다.
```javascript
// ./src/07-17.js
import { add, var1 } from './utils/utility1';

console.log(add(4,5));
console.log(var1);


import { add2, var2 as v } from './utils/utility1';

console.log(add2(4,5));
console.log(v);


import calc from './utils/utility1';

console.log(calc.add(4,5));
console.log(calc.multiply(4,5));
```

## 7.11 promise
> ES2015에서는 Promise 객체를 지원해 비동기 처리를 좀더 깔끔하게 수행할 수 있습니다. whatwg-fetch, superagent, axios, vue-resource 등이 대부분 Promise 객체를 사용합니다.
```javascript
var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        var num = Math.round(Math.random() * 20);
        var isValid = num % 2;
        if (isValid) { resolve(num); }
        else { reject(num); }
    }, 2000);
});

p.then(function(num) {
    console.log("홀수 : " + num);
}).catch(function(num) {
    console.log("짝수 : " + num);
});

console.log("20까지의 난수 중 홀수/짝수?");
console.log("결과는 2초 후에 나옵니다!!");
```
- resolve : then 메서드에 등록된 함수가 호출되도록 하는 첫번째 인자 함수입니다.
- reject : catch 메서드에 등록된 함수가 호출되도록 하는 두번째 인자 함수입니다.


## 7.12 전개 연산자
> 기존 객체의 속성이나 배열의 요소들을 포함하여 새로운 객체, 배열을 생성하고자 할때 사용합니다.
```javascript
let Obj1 = { name: "박문수", age: 29 };
let 0bj2 = { ...obj1 };
let obej3 = {...obj1, email: "mspark@gamil.com" };

console.log(obj2);
console.log(obj3);
console.log(obj1 == obj2);      //false

let arr1 = [ 100, 200, 300 ];
let arr2 = [ "hello", ...arr1, "world" ];
let arr3 = [ "hello", arr1, "world" ];
console.log(arr2);
console.log(arr3);
```