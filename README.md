# Habit-Tracker

Simple Habit Tracker adalah aplikasi web sederhana yang memungkinkan pengguna untuk mencatat dan melacak kebiasaan mereka. Pengguna dapat menambahkan kebiasaan baru, menandai kebiasaan yang telah dilakukan sebagai selesai, serta menghapus kebiasaan yang tidak diinginkan. Habits akan reset di bulan baru, dan habits bersifat daily, yaitu selesai sekali sehari.
Aplikasi web ini menggunakan HTML, CSS dan Javascript.

## Fitur
- Membuat Habits baru.
- Melihat list Habits yang sudah ada.
- Menandakan Habits sebagai selesai.
- Menghapus Habits yang tidak diinginkan.

## Cara Instalasi & Setup
1. Aplikasi ini membutuhkan Node.js dan JSON Server untuk menjalankan backend lokal
   Clone Repository/Unduh Zip.

3. Install JSON server jika belum
   ```bash
   npm install -g json-server
   ```

4. Jalankan JSON server
   ```bash
   json-server --watch db.json --port 3000
   ```

6. Buka file `index.html` di browser
   a. Bisa dengan langsung klik dua kali file `index.html`
   b. Atau gunakan extension Live Server di VS Code :
      -Klik kanan file `index.html`
      -Klik Open with Live Server
     

## Cara menggunakan Habit Tracker
1. Klik kolom kosong di bawah tulisan "Create a New Habit".
2. Ketikkan Kebiasaan/Habit harian yang ingin dilakukan user.
3. Klik "Add Habit" untuk menambahkannya ke list Habits.
4. Habits akan muncul di dalam list, klik "Mark Done" untuk menandai status Habit hari ini sudah dilakukan.
5. Klik "Delete" untuk menghapus kebiasaan dari daftar.

## Notes
- Pastikan JSON Server berjalan agar aplikasi dapat menyimpan dan mengambil data.
- Setiap kebiasaan hanya bisa ditandai sekali per hari. (Daily Habits seperti membaca 10 halaman hari ini, lari pagi, latihan coding)
- Jika bulan berubah, penghitung kebiasaan harian akan di-reset.

## Detail dan Struktur Projek
1. HTML (main.html)
   - Berisi struktur utama web beserta fungsi-fungsi utamanya.
   - Header berisi judul, Container berisi form untuk mengisi data Habits baru, beserta list Habits yang sudah ada, Footer berisi quotes penyemangat untuk user.
   - Interaksi data dilakukan lewat Node.js sebagai backend dengan fetch request ke http://localhost:3000/habits.
2. CSS (style.css)
   - Bekerja untuk tampilan layar utama halaman web.
   - Menggunakan flexbox untuk mengatur elemen di dalam div.
3. JavaScript (script.js)
   - Menggunakan framework Express.js
   - Menggunakan asynchronous programming untuk fungsi utama aplikasi seperti menyimpan Habits, menandai Habits dan membuat Habits baru.
   

## Credits
- Quote dari *James Clear* ditampilkan untuk memberikan motivasi.
- UI menggunakan CSS sederhana untuk tampilan yang lebih menarik.
- Framework dari Node.js

## Future Improvement
- Menambahkan kategori daily, weekly or monthly untuk user.
- Memperindah UI agar lebih mudah untuk di navigasi user dan mendorong user untuk menyelesaikan Habitsnya.
- Menggunakan API untuk menambahkan fitur di web (Quotes yang berganti secara interval atau ketika ada permintaan dari user)


