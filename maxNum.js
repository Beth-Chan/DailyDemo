var maxSum = function(nums) {
    nums.sort();
    return nums[nums.length-1];
}
// console.log(maxSum([1,2,5,2,3]));

var maxSum2 = function() {
    var max = arguments[0];
     for(var i = 0; i < arguments.length-1; i++) {
         for(var j = i + 1; j < arguments.length; j++) {
            if(arguments[i] <= arguments[j]) {
                max = arguments[j];
            } else{
                max = arguments[i];
            } 
         }
     }
    return max;
}
console.log(maxSum2(7,2,12,72,3,2,6,4,0));