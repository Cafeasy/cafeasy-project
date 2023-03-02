REQUIRED SYSTEM:
1. INSTALL NODE JS
2. buka terminal => npm -v => jika menunjukkan versi npm, berarti instalasi berhasil
3. opsional, buka terminal => install yarn (npm install --global yarn) => yarn --version

cafeasy-project configure:
1. npm install
2. folder node_modules akan tergenerate otomatis

cafeasy-project/frontend configure:
1. cd frontend
2. npm install
3. folder node_modules akan tergenerate otomatis
4. cek apakah node_modules sudah tergenerate dengan benar pada folder frontend, dengan cara => npm start atau yarn start jika sudah menginstall yarn
5. jika sukses, maka akan membuka page entry point pada browser 

cafeasy-project/backend configure:
1. cd backend
2. npm install
3. folder node_modules akan tergenerate otomatis
4. cek apakah node_modules sudah tergenerate dengan benar pada folder backend, dengan cara => nodemon index (nodemon sudah terinstall pada project sehingga tidak perlu install lagi)
5. jika nodemon starting, buka browser => buka localhost:8888 (8888 adalah port yang sudah ditentukan pada file index.js difolder backend)
