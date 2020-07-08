-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 09, 2020 at 03:04 AM
-- Server version: 5.7.29-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `author_tb`
--

CREATE TABLE `author_tb` (
  `author_id` int(11) NOT NULL,
  `author_name` varchar(225) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `author_tb`
--

INSERT INTO `author_tb` (`author_id`, `author_name`, `created_at`, `update_at`) VALUES
(1, 'Kayla Miller ', '2020-06-09 15:26:36', '2020-06-09 15:26:36'),
(2, 'fahmi anwar', '2020-06-09 15:26:36', '2020-06-09 15:26:36'),
(13, 'Kate Karyus Quinn', '2020-06-18 02:21:17', '2020-06-18 02:21:17'),
(14, 'aaKate Karyus Quinnyyy', '2020-06-18 07:00:15', '2020-06-18 07:00:15'),
(15, 'aaKate Karyus Quinnyyy', '2020-06-18 07:58:27', '2020-06-18 07:58:27'),
(16, 'bella', '2020-07-05 16:39:11', '2020-07-05 16:39:11'),
(17, 'la', '2020-07-05 16:43:48', '2020-07-05 16:43:48'),
(18, 'la', '2020-07-05 16:43:59', '2020-07-05 16:43:59'),
(19, 'herena', '2020-07-07 13:43:49', '2020-07-07 13:43:49'),
(20, 'sin', '2020-07-07 14:37:44', '2020-07-07 14:37:44'),
(21, 'nta', '2020-07-07 14:39:42', '2020-07-07 14:39:42'),
(22, 'sinta herena', '2020-07-07 16:15:05', '2020-07-07 16:15:05');

-- --------------------------------------------------------

--
-- Table structure for table `book_tb`
--

CREATE TABLE `book_tb` (
  `book_id` int(11) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `creted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book_tb`
--

INSERT INTO `book_tb` (`book_id`, `book_name`, `description`, `image`, `genre_id`, `author_id`, `status`, `creted_at`, `updated_at`) VALUES
(1232456687, 'Sebuah Seni untuk Bersikap Bodo Amat', '\"Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer—telah membantu mengoreksi harapan-harapan delusional kita, baik mengenai diri kita sendiri maupun dunia. Ia kini menuangkan buah pikirnya yang keren itu di dalam buku hebat ini.\n\n“Dalam hidup ini, kita hanya punya kepedulian dalam jumlah yang terbatas. Makanya, Anda harus bijaksana dalam menentukan kepedulian Anda.” Manson menciptakan momen perbincangan yang serius dan mendalam, dibungkus dengan cerita-cerita yang menghibur dan “kekinian”, serta humor yang cadas. Buku ini merupakan tamparan di wajah yang menyegarkan untuk kita semua, supaya kita bisa mulai menjalani kehidupan yang lebih memuaskan, dan apa adanya.', '9786024526986_Sebuah-Seni-Untuk-Bersikap-Bodo-Amat-1593622873559.jpg', 13, 1, 'available', '2020-07-01 17:01:13', '2020-07-01 17:01:13'),
(1232456690, 'Good Is Not Enough', 'Menjadi baik itu memang baik. Tapi menjadi baik saja itu artinya Anda sedang membatasi diri atau dalam bahasa yang lebih ekstrem, menutup peluang Anda untuk sesuatu yang jauh lebih luar biasa dari yang sedang Anda rencanakan, pikirkan dan nikmati saat ini.', '9786230013546_Cover_Good_is_Not_Enough-1593623207992.jpg', 13, 1, 'available', '2020-07-01 17:06:48', '2020-07-01 17:06:48'),
(1232456692, 'Bukannya Malas, Cuma Lagi Mager Aja', 'Malas gerak, malas melakukan segala hal? Trus gimana dengan hidup?\nNggak gitu juga, sih! Bersikap malas memang bukan hal positif. Tapi, malas untuk bergerak setelah melakukan berbagai aktivitas itu nggak ada salahnya, lho.\nDi saat kamu sedang kelelahan, depresi, merasa hampa, dan khawatir berlebihan, berdiam diri tak melakukan apa pun justru bisa mengembalikan energi dan suasana hati. Jadi, tak ada salahnya bersikap mager demi mengisi daya tubuh dari kekeringan akibat kelelahan yang sering melanda diri.', 'Bukan_Malas-1593623371573.jpg', 13, 1, 'available', '2020-07-01 17:09:31', '2020-07-01 17:09:31'),
(1232456693, '30 Hari Mengubah Kebiasaan Buruk', 'Kebiasaan baik sangat berguna untuk mencapai keberhasilan, baik dalam skala besar maupun kecil. Oleh karena itu, mengubah kebiasaan yang kurang baik tentu harus dilakukan. Persoalannya, kebanyakan orang (mungkin termasuk kamu) sering kali hanya bersemangat pada awalnya. Atau, mereka menganggap hal itu sangat sulit sehingga enggan berusaha.\nBuku ini disusun untuk membantumu mengalahkan desakan kembali ke kebiasaan lama yang kurang baik. Pembahasan di dalam buku ini mengarahkan kamu agar berdisiplin melakukan kebiasaan baik. Mulai minggu pertama hingga keempat, kamu akan dibimbing untuk menerapkan tips-tips praktis mengenali pola kebiasaan diri sendiri, menerapkan metode “habit stacking”, menciptakan lingkungan yang mendukung, menerapkan gaya hidup sehat, mengatasi beragam tantangan, hingga mempertahankan komitmen', '30_HARI-1593623430343.jpg', 13, 1, 'available', '2020-07-01 17:10:30', '2020-07-01 17:10:30'),
(1232456694, 'Nunchi: Seni Membaca Pikiran dan Perasaan Orang Lain--Rahasia Hidup Bahagia dan Sukses dari Korea', 'Nunchi, indra keenam orang Korea untuk membaca keadaan dan memahami apa yang dipikirkan dan dirasakan orang lain, telah dipraktikkan selama lebih dari 5.000 tahun dan diyakini telah melambungkan Korea dari salah satu negara termiskin menjadi salah satu negara paling maju di dunia. Para orangtua di Korea percaya bahwa mengajarkan nunchi pada anak mereka sama pentingnya dengan mengajari anak mereka menyeberang jalan dengan selamat. Nunchi adalah suatu bentuk kecerdasan emosional yang dapat dipelajari siapa pun. Yang kita butuhkan hanyalah mata dan telinga untuk memperhatikan orang lain, bukan menonjolkan diri sendiri. Buku ini akan menunjukkan caranya.', '9786020642581_NUNCHI_C_1_4-1-1593623494519.jpg', 13, 1, 'available', '2020-07-01 17:11:34', '2020-07-01 17:11:34'),
(1232456695, 'Aku Seorang Introver (Bonus Introvert Planner)', 'Banyak hal yang perlu kamu ketahui dari sosok seorang introver. Buku ini kkusus untuk orang yang memiliki kepribadian introver maupun orang yang ingin mengenal karakteristik sosok introver. Banyak yang mengira seseorang kepribadian introver adalah sosok yang pendiam, pemalu, dan tertutup. Padahal, sejatinya sosok introver adalah orang yang berkepribadian menarik jika kamu mengenalnya', 'img392_5KQ8QIz-1593623574093.jpg', 13, 1, 'available', '2020-07-01 17:12:54', '2020-07-01 17:12:54'),
(1232456696, 'Membangun Aplikasi Android Web Dan Web Service +Dvd', 'Buku ini disusun sebagai referensi bagi pelajar pemula teknologi informasi yang ingin mengetahui bagaimana cara membuat aplikasi website dan android dengan satu database MySQL yang menggunakan Web Service API sebagai koneksi antar-aplikasi serta bagaimana aplikasi tersebut dapat digunakan secara Online.', 'membangun_aplikasi-1593623853660.jpg', 13, 1, 'available', '2020-07-01 17:17:33', '2020-07-01 17:17:33'),
(1232456697, '7 in 1 Pemrograman Web Tingkat Lanjut', 'Laravel dan VueJS merupakan 2 teknologi pemrograman web yang sedang popular saat ini. Keduanya dibahas dalam buku ini beserta integrasinya dalam pembuatan aplikasi. Selain itu, didukung juga dengan materi lain yang tidak kalah penting dengan total 7 materi pemrogaman web. Buku ini merupakan kelanjutan dari buku sebelumnya yang membahas 7 pemrograman website untuk pemula. Setiap materi dibahas mulai dari teori dasar disertai contoh script di setiap pembahasan. Beberapa materi disertai langkah-langkah membuat aplikasi dengan menerapkan materi yang dibahas. Total terdapat 5 pembahasan membuat aplikasi dari mulai login, mengatur template aplikasi, operasi CRUD, hingga logout. Kelima aplikasi tersebut terdiri atas aplikasi dengan teknik OOP, PDO, dan MVC; aplikasi dengan AJAX Jquery; aplikasi dengan Laravel; aplikasi dengan integrasi Laravel dan VueJS; serta aplikasi dengan plugin Wordpress. Keterampilan: Menengah, Tingkat Mahir Kelompok: Pemrograman Jenis buku: Referensi, Tutorial', '718051794_Cov_7_in_1_Pemrograman_Web_Tingkat_Lanjut-1593623902549.jpg', 13, 1, 'available', '2020-07-01 17:18:22', '2020-07-01 17:18:22'),
(1232456773, '1aku seorang', 'test', '9786230014802_Cover_Depan_Tip_dan_Trik_Program_Database_Python_1.jpg', 10, 14, 'ewrw', '2020-07-07 12:53:43', '2020-07-07 12:53:43'),
(1232456774, 'wanita shalihah', 'asasas', 'menjadi_wanita.jpg', 16, 16, 'avaiable', '2020-07-07 12:59:51', '2020-07-07 12:59:51'),
(1232456775, 'Bring Me To Jannah', 'Bagaimana jika suami pilihan orangtuamu, yang dipercaya akan membimbingmu ke surga, ternyata malah balik menyakiti karena ketidakberdayaannya dalam melupakan mantan calon istrinya?  Itulah yang dirasakan Nafisa Humaira Azzahra. Perempuan dengan segala kekurangan yang perlahan berubah menjadi perempuan kuat karena ujian rumah tangganya yang terus datang bertubi-tubi.  Namun, mampukah ia tetap bertahan ketika ujian itu berada pada puncaknya?  ...  “Cerita yang membuat hati saya bergejolak. Amazing! Sukses untuk novel Bring Me to Jannah.” ­­—Mellyana, Penulis Dear, Imamku  “Baca novel ini benar-benar serasa dibawa ke dunia mereka. Selain feel-nya yang mengena bagi pembaca, pesan yang penulis sampaikan di dalamnya juga sangat mudah dipahami. Kamu bukan hanya akan mendapatkan kata ‘baper’ setelah membacanya, tapi juga takjub dengan perasaan campur aduk yang menjadi satu.” ­­—Khoirunnisa, Penulis Hafizhah  “Ceritanya menginspirasi. Ada sedih, romantis, dan ilmu agama yang dikemas dalam satu cerita membentuk kata ‘b', 'Bring_Me_To_Jannah.jpg', 5, 19, 'avaiable', '2020-07-07 15:19:40', '2020-07-07 15:19:40'),
(1232456776, 'Mahkota pengantin', 'Pernikahan adalah pilar keutuhan masyarakat Muslim. Jika ikatan keluarga retak, remuk pulalah sendi-sendi sebuah peradaban. Karenanya, tak usah heran jika Islam menjaga sedini mungkin setiap unsur yang dapat merusak kebahagiaan rumah tangga. Salah satu caranya adalah agar setiap pemuda-pemudi Muslim yang hendak menikah memahami esensi dan hukum-hukum sekitar pernikahan agar setiap persoalan yang muncul dapat diatasi dengan solusi yang islami. ', '5268281_63bdd17c-18be-4dfa-9de0-421d03c6902c_1024_1024.jpeg', 8, 19, 'available', '2020-07-08 14:26:36', '2020-07-08 14:26:36'),
(1232456777, 'barubuku', 'test', 'Hidup_itu_mudah_jgn_di_buat_susah.jpg', 8, 19, 'tetst', '2020-07-08 14:34:44', '2020-07-08 14:34:44');

-- --------------------------------------------------------

--
-- Table structure for table `borrow_detail_tb`
--

CREATE TABLE `borrow_detail_tb` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `count` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `borrow_detail_tb`
--

INSERT INTO `borrow_detail_tb` (`id`, `book_id`, `user_id`, `count`) VALUES
(1, 1232456743, 1, '1');

-- --------------------------------------------------------

--
-- Table structure for table `borrow_tb`
--

CREATE TABLE `borrow_tb` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `borrowed_date` date DEFAULT NULL,
  `total` varchar(10) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `borrow_tb`
--

INSERT INTO `borrow_tb` (`id`, `user_id`, `borrowed_date`, `total`, `create_at`, `update_at`) VALUES
(1, 1, '2020-07-07', '1', '2020-07-07 06:10:25', '2020-07-07 06:10:25');

-- --------------------------------------------------------

--
-- Table structure for table `genre_tb`
--

CREATE TABLE `genre_tb` (
  `genre_id` int(11) NOT NULL,
  `genre_name` varchar(225) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genre_tb`
--

INSERT INTO `genre_tb` (`genre_id`, `genre_name`, `created_at`, `updated_at`) VALUES
(1, 'FILOSIFI', '2020-06-09 15:27:14', '2020-06-09 15:27:14'),
(2, 'story', '2020-06-09 15:27:14', '2020-06-09 15:27:14'),
(4, 'Art', '2020-06-10 05:28:45', '2020-06-10 05:28:45'),
(5, 'Biography', '2020-06-10 05:28:56', '2020-06-10 05:28:56'),
(6, 'Business', '2020-06-10 05:30:22', '2020-06-10 05:30:22'),
(7, 'Children\'s', '2020-06-10 05:34:47', '2020-06-10 05:34:47'),
(8, 'Classics', '2020-06-10 05:35:05', '2020-06-10 05:35:05'),
(9, 'Comics', '2020-06-10 05:35:17', '2020-06-10 05:35:17'),
(10, 'Cookbooks', '2020-06-10 05:35:30', '2020-06-10 05:35:30'),
(11, 'Ebooks', '2020-06-10 05:35:43', '2020-06-10 05:35:43'),
(12, 'Fantasy', '2020-06-10 05:35:56', '2020-06-10 05:35:56'),
(13, 'Fiction', '2020-06-10 05:36:08', '2020-06-10 05:36:08'),
(14, 'Graphic Novels', '2020-06-10 05:36:21', '2020-06-10 05:36:21'),
(15, 'Historical Fiction', '2020-06-10 05:36:40', '2020-06-10 05:36:40'),
(16, 'History', '2020-06-10 05:36:52', '2020-06-10 05:36:52'),
(17, 'Horror', '2020-06-10 05:37:04', '2020-06-10 05:37:04'),
(18, 'Memoir', '2020-06-10 05:37:35', '2020-06-10 05:37:35'),
(19, 'Music', '2020-06-10 05:37:53', '2020-06-10 05:37:53'),
(20, 'Mystery', '2020-06-10 05:38:05', '2020-06-10 05:38:05'),
(21, 'Nonfiction', '2020-06-10 05:38:19', '2020-06-10 05:38:19'),
(22, 'Poetry', '2020-06-10 05:38:31', '2020-06-10 05:38:31'),
(23, 'Psychology', '2020-06-10 05:38:49', '2020-06-10 05:38:49'),
(24, 'Romance', '2020-06-10 05:39:07', '2020-06-10 05:39:07'),
(25, 'Science', '2020-06-10 05:39:21', '2020-06-10 05:39:21'),
(26, 'Science Fiction', '2020-06-10 05:39:36', '2020-06-10 05:39:36'),
(27, 'Self Help', '2020-06-10 05:39:52', '2020-06-10 05:39:52'),
(28, 'Sports', '2020-06-10 05:40:06', '2020-06-10 05:40:06'),
(29, 'Thriller', '2020-06-10 05:40:19', '2020-06-10 05:40:19'),
(30, 'Travel', '2020-06-10 05:40:33', '2020-06-10 05:40:33'),
(32, 'hah', '2020-06-14 07:56:18', '2020-06-14 07:56:18'),
(43, 'sintaherena', '2020-06-16 07:37:00', '2020-06-16 07:37:00'),
(45, 'he', '2020-06-16 07:57:46', '2020-06-16 07:57:46'),
(46, 'Technology', '2020-06-18 02:28:53', '2020-06-18 02:28:53'),
(47, 'test', '2020-07-05 16:54:50', '2020-07-05 16:54:50');

-- --------------------------------------------------------

--
-- Table structure for table `return_detail_tb`
--

CREATE TABLE `return_detail_tb` (
  `return_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `count` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `return_tb`
--

CREATE TABLE `return_tb` (
  `return_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `return_date` date NOT NULL,
  `total` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `trans_tb`
--

CREATE TABLE `trans_tb` (
  `id` int(11) NOT NULL,
  `trans_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `borrow_date` datetime DEFAULT NULL,
  `return_date` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trans_tb`
--

INSERT INTO `trans_tb` (`id`, `trans_id`, `user_id`, `book_id`, `borrow_date`, `return_date`, `created_at`, `updated_at`) VALUES
(1, 0, 1, 1232456687, '2020-07-07 00:00:00', '2020-07-07 00:00:00', '2020-07-07 07:38:58', '2020-07-07 07:38:58'),
(2, 1, 1, 1232456687, '2020-07-08 00:00:00', '2020-07-08 00:00:00', '2020-07-07 23:08:32', '2020-07-07 23:08:32'),
(3, 3, 2, 1232456687, '2020-08-06 00:00:00', NULL, '2020-07-08 01:13:09', '2020-07-08 01:13:09'),
(4, 3, 2, 1232456687, '2020-08-06 00:00:00', NULL, '2020-07-08 01:14:17', '2020-07-08 01:14:17'),
(5, 4, 1, 1232456687, '2020-07-07 00:00:00', '2020-07-07 00:00:00', '2020-07-08 01:48:44', '2020-07-08 01:48:44');

-- --------------------------------------------------------

--
-- Table structure for table `user_tb`
--

CREATE TABLE `user_tb` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_tb`
--

INSERT INTO `user_tb` (`user_id`, `username`, `password`, `role`, `fullname`, `email`, `image`, `created_at`, `updated_at`) VALUES
(1, 'sinta', '$2b$10$P5jho.4iJ1wcH03yydl3f.H4iGZ6ByPZZTAJQQkdugdILqXsyOWqS', 'admin', '', '', '', '2020-06-14 02:46:58', '2020-06-14 02:46:58'),
(2, 'heren', '$2b$10$F35HaWcHrK9NK7LNhOs9JOloN0R5ycWNEtMf9IF7csWTq7IbL2BCe', 'admin', '', '', '', '2020-06-14 05:49:38', '2020-06-14 05:49:38'),
(3, 'herena', '$2b$10$kYaMqS0Wf0UHsyx6y3j9r.CCg8FsedEqfGJcifE5hEFOw2eVPe6Hi', 'user', '', '', '', '2020-06-17 01:09:30', '2020-06-17 01:09:30'),
(4, 'joe', '$2b$10$sK67kOuoQ2hI9kmQKmyQh.mgaLiRbFSMf2gltSUWMAk7mh6FWcGEm', 'admin', '', '', '', '2020-06-18 07:47:01', '2020-06-18 07:47:01'),
(5, 'joe', '$2b$10$a8ist5CPati2x7M01UxBxeD/NVvGrkf1uQgkyt55xanmLGMFTL78O', 'admin', '', '', '', '2020-06-18 08:15:03', '2020-06-18 08:15:03'),
(6, 'asa', '$2b$10$VhAFKug17guh4H.aEwd1EeAOdu9dLk03JcEkETir7ejwYAZpNQdcq', NULL, 'dsfs', 'shintaherena@g', NULL, '2020-07-01 05:13:39', '2020-07-01 05:13:39'),
(7, 'gani', '$2b$10$fImfJeSkfNgUJNME/E6TcO/1RTHQUt9soubG9yewuqKTOZla0KfU6', NULL, 'adas', 'ada', NULL, '2020-07-01 05:15:20', '2020-07-01 05:15:20'),
(8, 'bintang', '$2b$10$9zFydUI.BLpqpAP3/a8okeDxtotrWRGgWSXsXhBL/Ud0sXGgCHt/K', NULL, 'star', 'asada', NULL, '2020-07-01 05:16:43', '2020-07-01 05:16:43'),
(9, 'sda', '$2b$10$z1rHug3LqgSesW9aQt3blek1f05qqkIKsHwHbvRzIFVrQwdAw1Iye', 'user', 'ads', 'adsa', NULL, '2020-07-01 05:19:43', '2020-07-01 05:19:43'),
(10, '', '$2b$10$fr7Pb4b1iJUgjC8H8NfTQ.5EJ58MimZd71qTu8tlPxmnPfsuvF7p2', 'user', '', '', NULL, '2020-07-01 10:50:18', '2020-07-01 10:50:18'),
(11, 'kouko', '$2b$10$XFLSeBiROs/OjhtLrXP3KeFfdcOhp/ltGQqqr2emg84prqnYzL4Ze', 'user', 'kaga kouko', 'asalaja@gmail.com', NULL, '2020-07-02 04:54:21', '2020-07-02 04:54:21'),
(12, 'anka', '$2b$10$/OVWOK774Asiy7fjgv5HQOQ7.b3oNB.mUlhmiukRM2OaHpd5yvuZu', 'user', 'anka', 'anka@a', NULL, '2020-07-02 10:00:52', '2020-07-02 10:00:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author_tb`
--
ALTER TABLE `author_tb`
  ADD PRIMARY KEY (`author_id`);

--
-- Indexes for table `book_tb`
--
ALTER TABLE `book_tb`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `borrow_tb`
--
ALTER TABLE `borrow_tb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genre_tb`
--
ALTER TABLE `genre_tb`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `return_tb`
--
ALTER TABLE `return_tb`
  ADD PRIMARY KEY (`return_id`);

--
-- Indexes for table `trans_tb`
--
ALTER TABLE `trans_tb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_tb`
--
ALTER TABLE `user_tb`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author_tb`
--
ALTER TABLE `author_tb`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `book_tb`
--
ALTER TABLE `book_tb`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1232456778;
--
-- AUTO_INCREMENT for table `borrow_tb`
--
ALTER TABLE `borrow_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `genre_tb`
--
ALTER TABLE `genre_tb`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `return_tb`
--
ALTER TABLE `return_tb`
  MODIFY `return_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `trans_tb`
--
ALTER TABLE `trans_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user_tb`
--
ALTER TABLE `user_tb`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
