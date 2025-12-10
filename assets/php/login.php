<?php
$valid_email = "manusia@gmail.com";
$valid_sandi = "manusia123";

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$sandi = isset($_POST['sandi']) ? trim($_POST['sandi']) : '';

if ($email === "" || $sandi === "") {
    echo "❌ Semua field harus diisi.";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "❌ Format email tidak valid.";
    exit;
}

if ($email === $valid_email && $sandi === $valid_sandi) {
    echo "OK";
} else {
    echo "❌ Email atau password salah!";
}
?>