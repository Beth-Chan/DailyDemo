var nums = [1,1,2,2,3,3,3,3, 5], val = 3;
var removeElement = function(nums, val) {
    var count = 0;
    for(var i = 0; i < nums.length; i++) {
        if(nums[i] !== val) {
            nums[count++] = nums[i];
        }
    }
    return count;
};
var result = removeElement(nums, val);
console.log(result);