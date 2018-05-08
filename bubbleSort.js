function bubbleSort(nums) {
    var len = nums.length;
    // 下面两种for循环都是同个道理
    for(var i = 1; i < len; i++) { // 教材的outer
        for(var j = 0; j < len - i; j++) { // 教材的inner，长度要减去右边已经排好的（优化，不用再排）
            if(nums[j] > nums[j+1]) {
                var temp = nums[j];
                nums[j] = nums[j+1];
                nums[j+1] = temp;
            }
        }
    }
    // for(var i = len - 1; i >= 1; i--) {
    //     for(var j = 0; j <= i; j++) { 
    //         if(nums[j+1] < nums[j]) {
    //             var temp = nums[j];
    //             nums[j] = nums[j+1];
    //             nums[j+1] = temp;
    //         }
    //     }
    // }
}
var arr = [23,64,2,6,82,1];
bubbleSort(arr);
// 遍历数组
for(var i = 0; i < arr.length; i++) {
    console.log(arr[i] + " ");
}