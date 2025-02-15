function deepClone(value, seen = new WeakMap()) {

    // Обработка примитивов и функций 
    if (value === null || typeof value !== 'object') {
        return value; // Примитивные значения (числа, строки, булевы значения, null, undefined) и функции возвращаются без изменений
    }

    // Проверка на циклические ссылки
    if (seen.has(value)) {
        return seen.get(value); // Если объект уже клонировался ранее, возвращаем его копию, чтобы избежать бесконечной рекурсии
    }

    // Обработка Date
    if (value instanceof Date) {
        return new Date(value.getTime()); 
        // Создаем новый объект Date с тем же временем, что и оригинальный,
        // так как Date является объектом, а не примитивом, и его нельзя просто присвоить
    }

    // Обработка Map
    if (value instanceof Map) {
        const mapCopy = new Map();
        seen.set(value, mapCopy); // Добавляем исходный объект в WeakMap, чтобы избежать зацикливания
        value.forEach((v, k) => {
            mapCopy.set(deepClone(k, seen), deepClone(v, seen)); // Рекурсивное клонирование ключей и значений
        });
        return mapCopy;
    }

    // Обработка Set
    if (value instanceof Set) {
        const setCopy = new Set();
        seen.set(value, setCopy); // Добавляем в WeakMap
        value.forEach(v => {
            setCopy.add(deepClone(v, seen)); // Клонируем каждый элемент множества
        });
        return setCopy;
    }

    // Создание нового объекта с сохранением прототипа
    const copy = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
    seen.set(value, copy); // Добавляем объект в WeakMap до копирования его свойств

    // Копирование символов (Symbol)
    for (const sym of Object.getOwnPropertySymbols(value)) {
        copy[sym] = deepClone(value[sym], seen); // Рекурсивное клонирование символических свойств
    }

    // Копирование собственных (не унаследованных) свойств
    for (const key of Object.keys(value)) {
        copy[key] = deepClone(value[key], seen); // Рекурсивное клонирование значений свойств
    }

    return copy;
}

// Пример использования
const obj = {
    num: 1, // Число
    str: 'hello world', // Строка
    bool: true, // Булево значение
    date: new Date(), // Объект Date
    arr: [1, 2, { a: 3 }], // Массив с вложенным объектом
    obj: { nested: 'value' }, // Вложенный объект
    map: new Map([[1, 'one'], [2, 'two']]), // Map
    set: new Set([1, 2, 3]), // Set
    func: function () { return 'test'; }, // Функция
    [Symbol('sym')]: 'symbolValue', // Символьное свойство
};
obj.self = obj; // Создание циклической ссылки на самого себя

const clonedObj = deepClone(obj);
console.log('Клонированный объект:', clonedObj);
