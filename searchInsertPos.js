var nums = [1,3,5,6], val = 4;
var searchInsertPos = function(nums, val) {
    for(var i = 0; i < nums.length; i++) {
        if(nums[i] >= val) {
            return i;
        }
    }
    return nums.length; // 没有比val大的数，放到最后
}
var result = searchInsertPos(nums, val);
console.log(result);