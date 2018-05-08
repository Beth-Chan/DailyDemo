var nums = [1,1,2,2,3,3,3,3, 5];
var removeDuplicates = function(nums) {
    var sorted = 0;
    for(var i = 1; i < nums.length; i++) {
        if(nums[i] !== nums[sorted]) {
            sorted++;
            nums[sorted] = nums[i];
        }
    }
    return sorted + 1; // 或 return ++sorted，sorted++不行
};
var result = removeDuplicates(nums);
console.log(result);