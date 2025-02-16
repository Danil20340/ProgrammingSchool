function isValidBrackets(s) {
    const stack = [];
    const brackets = { ')': '(', ']': '[', '}': '{' };

    for (let char of s) {
        if (Object.values(brackets).includes(char)) {
            stack.push(char); // Открывающая скобка
        } else if (brackets[char]) { // Закрывающая скобка
            if (stack.pop() !== brackets[char]) {
                return false;
            }
        }
    }

    return stack.length === 0; // Стек должен быть пустым
}

function measurePerformance(func, input) {
    const start = performance.now();
    const result = func(input);
    const end = performance.now();
    console.log(`Время выполнения: ${(end - start).toFixed(4)} мс`);
    return result;
}

//Примеры из задачи 
console.log(isValidBrackets("()"));    
console.log(isValidBrackets("()[]{}"));
console.log(isValidBrackets("(]"));    
console.log(isValidBrackets("([)]"));  
console.log(isValidBrackets("{[]}"));  

// Генерация длинной строки скобок (10^4 символов)
const testString = "[]{}()" .repeat(1666) + "[]"; // 10000 символов

// Тестирование времени работы
console.log(measurePerformance(isValidBrackets, testString));