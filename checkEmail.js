var checkEmail = function(email) {
  var reg = /^(\w)+(\.(\w)+)*@(\w)+(\.(\w)+)*$/; // 我觉得这种更好，因为有看到过邮箱是类似yongh.zhang@aaa.bb.cc的形式
  // 或者
  // var reg = /^[0-9A-Za-z]+@[0-9A-Za-z]+\.[0-9A-Za-z]+(\.[0-9A-Za-z])?$/;  
  return reg.test(email);
};