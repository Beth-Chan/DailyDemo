// 数组去重
Array.prototype.unique = function() {
    var newArr = [];
    for (let i = 0; i < this.length; i++) {
        // indexOf(要找的元素），把数组的每个元素在新数组找一遍，找不到就push进新建的数组，找得到就说明是重复的元素，不用push
        if(newArr.indexOf(this[i]) !== -1) {
            newArr.push(this[i]);
        }
    }
    // 返回没有重复元素的新数组
    return newArr;
};

