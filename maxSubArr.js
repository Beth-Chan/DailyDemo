
var nums = [-2,1,-3,4,-1,2,1,-5,4];
var maxSubArray = function(nums) {
    var sum = 0;
    var maxSum = -Infinity;
    
    for(var i = 0; i < nums.length; i++){
        // 典型动态规划问题
        sum += nums[i];
        maxSum = Math.max(maxSum, sum);
        
        if(sum < 0){
            sum = 0;
        }
    }
    
    return maxSum;
};
var result = maxSubArray(nums);
console.log(result);