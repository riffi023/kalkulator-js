let currentInput = ""; // Untuk menyimpan input saat ini

// Fungsi untuk menghapus tampilan
function clearDisplay() {
  currentInput = ""; // Reset input saat tombol C ditekan
  document.getElementById("display").value = ""; // Kosongkan tampilan
}

// Fungsi untuk menambahkan angka ke tampilan
function appendNumber(number) {
  currentInput += number; // Tambahkan angka ke input
  document.getElementById("display").value = currentInput; // Tampilkan input
}

// Fungsi untuk menambahkan operator ke tampilan
function appendOperator(operator) {
  currentInput += operator; // Tambahkan operator ke input
  document.getElementById("display").value = currentInput; // Tampilkan input
}

// Fungsi untuk menghitung hasil
function calculate() {
  try {
    const result = eval(currentInput); // Hitung hasil menggunakan eval
    addToHistory(currentInput + " = " + result); // Tambahkan ke riwayat
    currentInput = result.toString(); // Simpan hasil ke input untuk penghitungan selanjutnya
    document.getElementById("display").value = currentInput; // Tampilkan hasil
  } catch (error) {
    alert("Error: " + error.message); // Tampilkan error jika ada
  }
}

// Fungsi untuk menghapus karakter terakhir
function deleteLast() {
  currentInput = currentInput.slice(0, -1); // Hapus karakter terakhir
  document.getElementById("display").value = currentInput; // Tampilkan input
}

// Fungsi untuk menambahkan ke riwayat
function addToHistory(entry) {
  const historyList = document.getElementById("historyList");
  const listItem = document.createElement("li");
  listItem.textContent = entry; // Tambahkan entry ke riwayat

  // Tambahkan tombol hapus
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus";
  deleteButton.onclick = function () {
    listItem.remove(); // Hapus item dari daftar
    removeFromLocalStorage(entry); // Hapus dari Local Storage
  };

  listItem.appendChild(deleteButton); // Tambahkan tombol hapus ke list item
  historyList.appendChild(listItem); // Tambahkan list item ke riwayat

  // Simpan riwayat ke Local Storage
  saveHistory(entry);
}

// Fungsi untuk menghapus entry dari Local Storage
function removeFromLocalStorage(entry) {
  let history = JSON.parse(localStorage.getItem("calculatorHistory")) || []; // Ambil riwayat dari Local Storage
  history = history.filter((item) => item !== entry); // Hapus entry yang sesuai
  localStorage.setItem("calculatorHistory", JSON.stringify(history)); // Simpan kembali ke Local Storage
}

// Fungsi untuk menyimpan riwayat ke Local Storage
function saveHistory(entry) {
  let history = JSON.parse(localStorage.getItem("calculatorHistory")) || []; // Ambil riwayat dari Local Storage
  history.push(entry); // Tambahkan entry baru
  localStorage.setItem("calculatorHistory", JSON.stringify(history)); // Simpan kembali ke Local Storage
}

// Fungsi untuk memuat riwayat dari Local Storage saat halaman dimuat
function loadHistory() {
  const historyList = document.getElementById("historyList");
  const history = JSON.parse(localStorage.getItem("calculatorHistory")) || []; // Ambil riwayat dari Local Storage
  history.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.textContent = entry; // Tambahkan entry ke riwayat

    // Tambahkan tombol hapus
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.onclick = function () {
      listItem.remove(); // Hapus item dari daftar
      removeFromLocalStorage(entry); // Hapus dari Local Storage
    };

    listItem.appendChild(deleteButton); // Tambahkan tombol hapus ke list item
    historyList.appendChild(listItem); // Tambahkan list item ke riwayat
  });
}

// Memuat riwayat saat halaman dimuat
window.onload = loadHistory;

// Fungsi untuk menghapus semua riwayat
function clearHistory() {
  localStorage.removeItem("calculatorHistory"); // Hapus riwayat dari Local Storage
  document.getElementById("historyList").innerHTML = ""; // Kosongkan daftar riwayat di UI
}

let isHistoryVisible = true; // Status visibilitas riwayat

function toggleHistory() {
    const historyList = document.getElementById('historyList');
    const minimizeButton = document.getElementById('minimizeHistory');

    if (isHistoryVisible) {
        historyList.style.display = 'none'; // Sembunyikan daftar riwayat
        minimizeButton.textContent = 'Show'; // Ubah teks tombol menjadi 'Show'
    } else {
        historyList.style.display = 'block'; // Tampilkan daftar riwayat
        minimizeButton.textContent = 'Minimize'; // Ubah teks tombol kembali menjadi 'Minimize'
    }

    isHistoryVisible = !isHistoryVisible; // Toggle status
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('touchstart', () => {
        button.classList.add('active'); // Menambahkan kelas saat tombol ditekan
    });

    button.addEventListener('touchend', () => {
        button.classList.remove('active'); // Menghapus kelas saat tombol dilepas
    });
});

// Fungsi untuk mengubah tanda bilangan
function toggleSign() {
    if (currentInput) { // Cek jika ada input saat ini
        const currentNumber = parseFloat(currentInput); // Konversi input menjadi angka
        currentInput = (-currentNumber).toString(); // Ubah tanda dan simpan kembali ke input
        document.getElementById('display').value = currentInput; // Tampilkan input
    }
}
