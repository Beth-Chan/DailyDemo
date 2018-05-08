var data = {
    name: 'xiaoming',
    age: '18'
};
var template = "My name is {$name}, my age is {$age}";

function outputTemplate(template, data) {
    template = template.replace(/(\{\$name\})/, data.name);
    template = template.replace(/(\{\$age\})/, data.age); 
    return template;
}

console.log(outputTemplate(template, data));