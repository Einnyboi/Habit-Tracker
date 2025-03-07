# Habit-Tracker
==SIMPLE HABIT TRACKER==
Simple Habit Tracker adalah aplikasi web sederhana yang memungkinkan pengguna untuk mencatat dan melacak kebiasaan mereka. Pengguna dapat menambahkan kebiasaan baru, menandai kebiasaan yang telah dilakukan sebagai selesai, serta menghapus kebiasaan yang tidak diinginkan. Habits akan reset di bulan baru, dan habits bersifat daily, yaitu selesai sekali sehari.
Aplikasi web ini menggunakan HTML, CSS dan Javascript.

Fitur
- Membuat Habits baru.
- Melihat list Habits yang sudah ada.
- Menandakan Habits sebagai selesai.
- Menghapus Habits yang tidak diinginkan.

## Installation
1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/simple-habit-tracker.git
   cd simple-habit-tracker
   ```

2. **Install JSON Server (Jika belum terinstal)**
   ```bash
   npm install -g json-server
   ```

3. **Buat File `db.json`**
   Di dalam folder proyek, buat file `db.json` dengan struktur berikut:
   ```json
   {
     "habits": []
   }
   ```

4. **Jalankan JSON Server**
   ```bash
   json-server --watch db.json --port 3000
   ```

5. **Buka file `index.html` di browser**
   - Bisa dengan langsung klik dua kali file `index.html`
   - Atau gunakan ekstensi Live Server di VS Code

## How to Use
1. Masukkan nama kebiasaan baru pada form yang tersedia.
2. Klik "Add Habit" untuk menambahkannya ke daftar.
3. Klik "Mark Done" untuk menandai kebiasaan telah dilakukan.
4. Klik "Delete" untuk menghapus kebiasaan dari daftar.

## Notes
- Pastikan JSON Server berjalan agar aplikasi dapat menyimpan dan mengambil data.
- Setiap kebiasaan hanya bisa ditandai sekali per hari.
- Jika bulan berubah, penghitung kebiasaan harian akan di-reset.

## Credits
- Quote dari *James Clear* ditampilkan untuk memberikan motivasi.
- UI menggunakan CSS sederhana untuk tampilan yang lebih menarik.

## License
Proyek ini tersedia di bawah lisensi MIT. Silakan gunakan dan modifikasi sesuai kebutuhan!

