const fs = require('fs');
const path = require('path');

// Örnek veri
const sampleData = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', age: 25, city: 'İstanbul' },
  { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', age: 30, city: 'Ankara' },
  { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com', age: 28, city: 'İzmir' }
];

// Data klasörünü oluştur
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Data klasörü oluşturuldu:', dataDir);
}

// JSON dosyasını oluştur
const filePath = path.join(dataDir, 'users.json');
const jsonData = JSON.stringify(sampleData, null, 2);
fs.writeFileSync(filePath, jsonData, 'utf8');

console.log('✅ JSON veri dosyası oluşturuldu:', filePath);
console.log('📊 Oluşturulan kullanıcı sayısı:', sampleData.length);
console.log('🚀 Artık uygulamayı test edebilirsiniz!'); 