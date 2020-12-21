// 화살표함수
let add = function(num1,num2){
    return num1+num2
}

let add2 = (num1,num2) => {
    return num1+num2
}

let add3 = (num1,num2) => (num1+num2)

let add4 = (num1,num2) => num1+num2

let add5 = num => num+num
let add6 = () => {
    num =2
    return num+num
}

// console.log(add6())

// 콜백의 동기와 비동기
// 콜백은 나중에 실행하라고 넘기는것
// 콜백을 받은 함수가 비동기냐 동기냐가 중요
function fakeSetTimeout(callback,delay)
{
    callback();
}

console.log(0);
// fakeSetTimeout(function(){
//     console.log('he')
// },0);
setTimeout(function(){
    console.log('he') 
},0); // setTimeout의 콜백함수는 비동기로 실행이된다

console.log(1)


// 콜백지옥과 프로미스

function delay(sec,callback){
    setTimeout(() => {
        callback(new Date().toISOString());
    },sec*1000);
}

delay(1,(result) => {
    console.log(1,result)
})

const delayP = (sec) => { //Promise를 만들어주는 함수
    return new Promise((resolve,reject)=>{
        resolve(new Date().toISOString())
    },sec*1000);
}

delayP(1).then((result) => {
    console.log(112,result)
})

// Promise를 하나끝내고 다시 Promise를 리턴
delayP(1).then((result)=>{
    console.log(1,result);
    return delayP(1);
}).then((result)=>{
    console.log(2,result)
})

// async 함수는 Promise를 리턴하는 함수
async function myAsync(){
    return 'async'; // Promise의 Resolve와 같음
}

myAsync().then(result=>{ 
    // result는 myAsync의 리턴값
    console.log(result)
})

// await는 Promise가 Resolve될때까지 기다리는 함수
async function myAwait(){
    await delayP(3);
    return 'await'
}
myAwait().then(result=>{
    console.log(result)
})

// 예외처리
function wait(sec){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('wait Error');
        },sec*1000)
    });
}
// async function myAsyncFun(){
//     throw 'myAsyncError!';
// }

// const result = myAsyncFun().catch(e => {
//     console.error(e);
// })
async function myAsyncFun(){
    console.log(new Date());
    await wait(3).catch(e =>{
        console.error(e);
    });
    console.log(new Date());
}