/* Two Sum
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1]. */


var nums = [2, 7, 11, 15], target = 26;
/**
 * Two number add up, return indice.
 * @param {number[]} nums 
 * @param {number} target 
 * @return {number[]}
 */
function twoSum (nums, target) {
    // var result = [];
    for(var i = 0; i < nums.length; i++) {
        for(var j = i + 1; j < nums.length; j++) { 
            if(nums[i] + nums[j] == target) {
            	// result.push(i, j);
            	// 或
                // result[0] = i;
                // result[1] = j;
                // return result;
                return [i, j];
            } 
        }
    }
    // Java: throw new IllegalArgumentException("No two sum solution"); 
    // JavaScript也可以 throw 'No two num solution';
    return 'No two num solution';
}
var result = twoSum(nums, target);
console.log(result);

// 以上，时间复杂度是O(n的平方)，空间复杂度是O(n)



// 用map可以在一次遍历中找到i, j的位置。存储数组的数值和索引最好的解决方案是哈希表，能减少时间复杂度，把时间复杂度减少到O(n)
var nums = [2, 7, 11, 15], target = 22;
var twoSum3 = function(nums, target) {
    var map = {}, tmp = target-nums[i];
    for(var i = 0; i < nums.length; i++) {
        if(map[tmp] >= 0) {
            return [map[tmp], i]; // 存储形式：[值, 索引]， 因为题目是知道值求索引，这样存储方便
        } else {
            map[nums[i]] = i;  // 为什么？
        }
    }
};
var result = twoSum3(nums, target);
console.log(result);



var nums = [2, 7, 11, 15], target = 9;
function twoSum2 (nums, target) {
    var result = [];
    var map = new Map();
    for(var i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    for(var i = 0; i < nums.length; i++) {
        var complement = target - nums[i];
        if(map.has(complement) && map.get(complement)!=i) { // Java是map.containsKey()
            result[0] = i;
            result[1] = map.get(complement);
            return result;
        }
    }
}
var result = twoSum2(nums, target);
console.log(result);

// Map的用法
// var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
// m.get('Michael'); // 95
// 初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法：

// var m = new Map(); // 空Map
// m.set('Adam', 67); // 添加新的key-value
// m.set('Bob', 59);
// m.has('Adam'); // 是否存在key 'Adam': true
// m.get('Adam'); // 67
// m.delete('Adam'); // 删除key 'Adam'
// m.get('Adam'); // undefined