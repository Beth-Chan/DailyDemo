/**
 * 多态的一个例子（模拟多态中的方法重载）
 * 在JS中，通过arguments对象对传入的参数做判断，就可以实现多种调用方式
 */  
function Add() {
    function zeroArgFn() {
        return 10;
    }
    function oneArgFn(num) {
        return 10 + num;
    }
    function twoArgFn(num1, num2) {
        return num1 + num2;
    }
    this.add = function() {
        var arg = arguments;
        var len = arguments.length;
        switch(len) {
            case 0:
                return zeroArgFn();
            case 1:
                return oneArgFn(arg[0]);
            case 2:
                return twoArgFn(arg[0], arg[1]);
            default:
                break;
        }
    };
}

var oAdd = new Add();
console.log(oAdd.add());
console.log(oAdd.add(5));
console.log(oAdd.add(7, 9));

