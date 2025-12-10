<?php

$nama            = $_POST['nama'] ?? '';
$sandi           = $_POST['sandi'] ?? '';
$alamat          = $_POST['alamat'] ?? '';
$jenis_kelamin   = $_POST['jenis_kelamin'] ?? '';
$jurusan         = $_POST['jurusan'] ?? '';
$hobi            = $_POST['hobi'] ?? [];

// Logika tampilan untuk Jenis Kelamin
$jk_display = '';
if ($jenis_kelamin == 'L') {
    $jk_display = 'Laki-laki';
} elseif ($jenis_kelamin == 'P') {
    $jk_display = 'Perempuan';
}

?>
<!DOCTYPE html>
<html lang="id">
<head>
    <title>HASIL INPUT DATA</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="result_style.css"> </head>
<body>

<div class="result-container">
    <h2>Data yang Diterima:</h2>

    <div class="data-item">
        <strong>Nama:</strong> <?= htmlspecialchars($nama) ?>
    </div>

    <div class="data-item">
        <strong>Password:</strong> <?= htmlspecialchars($sandi) ?>
    </div>

    <div class="data-item">
        <strong>Alamat:</strong> <br>
        <span class="alamat-text"><?= nl2br(htmlspecialchars($alamat)) ?></span>
    </div>

    <div class="data-item">
        <strong>Jenis Kelamin:</strong> <?= htmlspecialchars($jk_display) ?>
    </div>

    <div class="data-item">
        <strong>Jurusan:</strong> <?= htmlspecialchars($jurusan) ?>
    </div>

    <div class="data-item">
        <strong>Hobi:</strong>
        <div class="hobi-list">
            <?php
            if (!empty($hobi) && is_array($hobi)) {
                foreach ($hobi as $item) {
                    echo "<span>- " . htmlspecialchars($item) . "</span>";
                }
            } else {
                echo "<span>- Tidak memilih hobi</span>";
            }
            ?>
        </div>
    </div>
</div>

</body>
</html>
