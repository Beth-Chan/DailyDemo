function test(){
    var a = 1;
    setTimeout(function(){
        console.log(a); //2
        a = 3;
    },1000);
    a = 2;
    setTimeout(function(){
        console.log(a);//3
        a = 4;
    },3000);
}
test();
console.log(0);//0