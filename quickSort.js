// 快速排序
Array.prototype.quickSort = function() {
    if(this.length <= 1) {
        return this;
    } else {
        // 找出基准点
        var pivotIndex = Math.floor(this.length/2);
        // splice会返回被删除的元素
        var pivot = this.splice(pivotIndex, 1);
        // 定义左右数组
        var left = [];
        var right = [];
        // 遍历数组，把数组中的每个元素与基准做比较
        // 注意：在这里直接用 this 指代[35, 1, 7, 3]数组对象
        for (let i = 0; i < this.length; i++) {
            if(this[i] <= pivot) { // 不要忘了等于号
                // 小于或等于基准的放在左数组
                left.push(this[i]);
            } else {
                // 大于基准的放进右数组
                right.push(this[i]);
            }
        }

        // 注意：两边使用递归是关键，然后再把左数组、基准值、右数组按顺序连起来
        return left.quickSort().concat(pivot, right.quickSort());
    }
};

console.log([35,1,7,3].quickSort());