/*
*  1. 다음의 함수들을 화살표함수로 작성하세요.

 function add(a, b) {
 return a + b;
 }
 console.log(add(4,5));

 function squaredNubmer(num) {
 return Math.pow(num);
 }

 function factorial(num) {
 if(num == 0) return 1;
 else return num * factorial(num -1);
 }
* */
add = (a,b) => {
    return a + b;
}

squaredNubmer = (num) => {
    return Math.pow(num,2);
}

factorial = (num) => {
    if(num == 0) return 1;
    else return num * factorial(num -1);
}

console.log(add(2,3));
console.log(squaredNubmer(4));
console.log(factorial(3));

/*
* 2. 클래스를 이용하여 스터디 멤버의 간단한 프로필을 생성하세요.
 2-1. 해당 멤버에게 메서드를 실행하여 이름을 console에 출력하세요.
 2-2. 생성한 데이터를 memberList라는 정적메서드를 생성&이용하여 멤버를 배열로 묶어서 console에 출력하세요
* */
const memberArr = [];
class studyMember {
    constructor(name, age, team, gender) {
        this.name = name;
        this.age = age;
        this.team = team;
        this.gender = gender;
        memberArr.push(this.name);
    }

    static memberList() {
        return memberArr;
    }

    outputName() {
        return `이름은 ${this.name}입니다.`;
    }
}
//2
const jieun = new studyMember("신지은", "27", "프론트엔드팀", "여자");
const doyu = new studyMember("전동엽", "31", "프론트엔드팀", "남자");
//2-1
console.log(jieun.outputName());
console.log(doyu.outputName());
//2-2
console.log(studyMember.memberList());


/*
*  3. promise를 이용하여 아래의 값이 5보다 클경우 제곱의 수를 console에 출력하고 작을경우 해당 값을 그대로 호출하도록 작성하세요.
 1) promise 객체는 1번만 생성
 2) then은 최소 두번 이상 쓸것  ???왜죠???!??!
 var rand = Math.round(Math.random() * 10);  // 0 ~ 10까지
* */

const checkNum = new Promise ((resolve, reject) => {
    setTimeout(() => {
       let num = Math.round(Math.random() * 10);
       if (num > 0) {
           resolve(num);
       } else {
           reject(num);
       }
    }, 1000);
})

checkNum.then((num) => {
    if (num > 5) {
        console.log(Math.pow(num, 2), "5보다 큰 숫자는 제곱하여 나옵니다.");
    } else {
        console.log(num, "5보다 작은 숫자는 그대로 나옵니다.");
}
}).catch(() => {
    console.log('error');
});