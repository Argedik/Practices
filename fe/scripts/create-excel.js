const XLSX = require('xlsx');
const path = require('path');

// Örnek veri
const sampleData = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', age: 25, city: 'İstanbul' },
  { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', age: 30, city: 'Ankara' },
  { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com', age: 28, city: 'İzmir' }
];

// Workbook oluştur
const wb = XLSX.utils.book_new();

// Worksheet oluştur
const ws = XLSX.utils.json_to_sheet(sampleData);

// Worksheet'i workbook'a ekle
XLSX.utils.book_append_sheet(wb, ws, 'Users');

// Excel dosyasını public klasörüne kaydet
const filePath = path.join(__dirname, '..', 'public', 'test.xlsx');
XLSX.writeFile(wb, filePath);

console.log('test.xlsx dosyası public klasöründe başarıyla oluşturuldu!'); 