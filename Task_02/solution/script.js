const fs = require('fs');
const crypto = require('crypto');

// Укажите путь к папке, файлы которой вы хотите перебрать
const folderPath = './files/';

// Чтение содержимого папки
const files = fs.readdirSync(folderPath);

// Перебор файлов

let result = []
files.forEach(file => {
  const hash = crypto.createHash('sha3-256').update(file).digest('hex')
  result.unshift(hash)
});

result.sort()

console.log(crypto.createHash('sha3-256').update(result.join("") + "grishilov.vladislav@gmail.com").digest('hex'))




const folderPath_2 = './files/'; // Укажите путь к папке с файлами

// Чтение содержимого папки
const files_2 = fs.readdirSync(folderPath_2);

// Вычисление хешей для каждого файла
const hashes = files_2.map(file => {
  const filePath = `${folderPath_2}/${file}`;
  const fileData = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha3-256').update(fileData).digest('hex');
  return hash;
});

// Сортировка хешей по возрастанию
hashes.sort();

console.log(crypto.createHash('sha3-256').update(hashes.join("") + "grishilov.vladislav@gmail.com").digest('hex'))