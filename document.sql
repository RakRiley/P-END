-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2018 at 03:55 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `document`
--

-- --------------------------------------------------------

--
-- Table structure for table `date`
--

CREATE TABLE `date` (
  `id` int(5) NOT NULL,
  `day` int(5) NOT NULL,
  `month` int(5) NOT NULL,
  `year` int(5) NOT NULL,
  `minute` int(2) UNSIGNED ZEROFILL NOT NULL,
  `hour` int(2) UNSIGNED ZEROFILL NOT NULL,
  `second` int(5) NOT NULL,
  `day_time` varchar(100) NOT NULL,
  `mounth_time` varchar(100) NOT NULL,
  `year_time` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `date`
--

INSERT INTO `date` (`id`, `day`, `month`, `year`, `minute`, `hour`, `second`, `day_time`, `mounth_time`, `year_time`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 16, 8, 2561, 30, 20, 41, '16', '8', '2018', '2018-08-16 13:30:42', '2018-08-16 13:30:42', '0000-00-00 00:00:00'),
(2, 16, 8, 2561, 31, 20, 4, '17', '8', '2018', '2018-08-16 13:31:05', '2018-08-16 13:31:05', '0000-00-00 00:00:00'),
(3, 16, 8, 2561, 31, 20, 33, '20', '8', '2018', '2018-08-16 13:31:34', '2018-08-16 13:31:34', '0000-00-00 00:00:00'),
(4, 16, 8, 2561, 32, 20, 4, '20', '8', '2018', '2018-08-16 13:32:05', '2018-08-16 13:32:05', '0000-00-00 00:00:00'),
(5, 16, 8, 2561, 33, 20, 24, '16', '8', '2018', '2018-08-16 13:33:24', '2018-08-16 13:33:24', '0000-00-00 00:00:00'),
(6, 16, 8, 2561, 00, 21, 33, '17', '8', '2018', '2018-08-16 14:00:34', '2018-08-16 14:00:34', '0000-00-00 00:00:00'),
(7, 16, 8, 2561, 09, 21, 22, '20', '8', '2018', '2018-08-16 14:09:23', '2018-08-16 14:09:23', '0000-00-00 00:00:00'),
(8, 16, 8, 2561, 11, 21, 2, '20', '8', '2018', '2018-08-16 14:11:03', '2018-08-16 14:11:03', '0000-00-00 00:00:00'),
(9, 16, 8, 2561, 20, 21, 38, '20', '8', '2018', '2018-08-16 14:20:38', '2018-08-16 14:20:38', '0000-00-00 00:00:00'),
(10, 16, 8, 2561, 21, 21, 13, '20', '8', '2018', '2018-08-16 14:21:14', '2018-08-16 14:21:14', '0000-00-00 00:00:00'),
(11, 16, 8, 2561, 28, 21, 31, '20', '8', '2018', '2018-08-16 14:28:32', '2018-08-16 14:28:32', '0000-00-00 00:00:00'),
(12, 16, 8, 2561, 30, 21, 25, '20', '8', '2018', '2018-08-16 14:30:26', '2018-08-16 14:30:26', '0000-00-00 00:00:00'),
(13, 16, 8, 2561, 30, 21, 53, '16', '8', '2018', '2018-08-16 14:30:54', '2018-08-16 14:30:54', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_id` int(10) NOT NULL,
  `number_of_book` double NOT NULL,
  `float` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `form` varchar(100) NOT NULL,
  `to` varchar(100) NOT NULL,
  `sender` varchar(100) NOT NULL,
  `speed` varchar(100) NOT NULL,
  `secret` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `note` varchar(100) NOT NULL,
  `practice` varchar(100) NOT NULL,
  `file` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`id`, `user_id`, `date_id`, `number_of_book`, `float`, `name`, `form`, `to`, `sender`, `speed`, `secret`, `status`, `note`, `practice`, `file`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 1, 0, 'ลง1', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'AE', 'กฤษติน ศรีบุญไชย', 'ปกติ', 'ปกติ', 'U', '', '', './upload/pdf/book5b757cfe92c67.pdf', '2018-08-16 13:39:43', '2018-08-16 13:39:43', '0000-00-00 00:00:00'),
(2, 1, 2, 2, 0, 'ลง2', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'B', 'Hiruka', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 13:31:05', '2018-08-16 13:31:05', '0000-00-00 00:00:00'),
(3, 1, 3, 3, 0, 'ลง3', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'C', 'คณบดี  ผศ.ดร.ฐิติรัตน์ เชี่ยวสุวรรณ', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 13:31:34', '2018-08-16 13:31:34', '0000-00-00 00:00:00'),
(4, 1, 4, 4, 0, 'ลง4', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'D', 'หัวหน้าสาขาวิชาวิศวกรรมคอมพิวเตอร์  ดร.ภูวิศสรณ์ ภูมิสรณคมณ์', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 13:32:05', '2018-08-16 13:32:05', '0000-00-00 00:00:00'),
(5, 1, 5, 1.4, 0, 'ลงซ้ำ1', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'AA', 'กฤษติน ศรีบุญไชย', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 15:32:39', '2018-08-16 13:33:23', '0000-00-00 00:00:00'),
(6, 1, 6, 2.1, 0, 'ลง2.1', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'AA', 'Hiruka', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 14:00:33', '2018-08-16 14:00:33', '0000-00-00 00:00:00'),
(7, 1, 7, 3.1, 0, 'ลงซ้ำ3', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'AA', 'Hiruka', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 14:09:23', '2018-08-16 14:09:23', '0000-00-00 00:00:00'),
(8, 1, 8, 4.1, 0, 'ลงซ้ำ4', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'AA', 'Hiruka', 'ปกติ', 'ปกติ', 'C', '', '', '', '2018-08-16 16:35:06', '2018-08-16 16:35:06', '0000-00-00 00:00:00'),
(9, 1, 9, 4.2, 0, 'ลงซ้ำ4.2', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'AA', 'Hiruka', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 14:20:38', '2018-08-16 14:20:38', '0000-00-00 00:00:00'),
(10, 1, 10, 4.3, 0, 'ลงซ้ำ43.', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'AA', 'กฤษติน ศรีบุญไชย', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 14:21:13', '2018-08-16 14:21:13', '0000-00-00 00:00:00'),
(11, 1, 11, 4.4, 0, 'ลงซ้ำ4.4', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'AA', 'Hiruka', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 14:28:32', '2018-08-16 14:28:32', '0000-00-00 00:00:00'),
(12, 1, 12, 4.5, 0, 'ลงซ้ำ4.5', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'AA', 'Hiruka', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 14:30:26', '2018-08-16 14:30:26', '0000-00-00 00:00:00'),
(13, 1, 13, 1.2, 0, 'ลงซ้ำ1.2', 'สาขาวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร', 'AA', 'Hiruka', 'ปกติ', 'ปกติ', 'U', '', '', '', '2018-08-16 14:30:54', '2018-08-16 14:30:54', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `signer`
--

CREATE TABLE `signer` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `signer`
--

INSERT INTO `signer` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Hiruka', '2018-08-10 16:03:15', '2018-08-10 16:03:15', '0000-00-00 00:00:00'),
(2, 'คณบดี  ผศ.ดร.ฐิติรัตน์ เชี่ยวสุวรรณ', '2018-07-03 14:45:16', '2018-07-03 14:45:16', '0000-00-00 00:00:00'),
(3, 'หัวหน้าสาขาวิชาวิศวกรรมคอมพิวเตอร์  ดร.ภูวิศสรณ์ ภูมิสรณคมณ์', '2018-07-03 14:46:05', '2018-07-03 14:46:05', '0000-00-00 00:00:00'),
(4, 'รองคณบดีฝ่ายวิชาการ  ดร.พรเทพ โรจนวสุ', '2018-07-03 14:46:37', '2018-07-03 14:46:37', '0000-00-00 00:00:00'),
(5, 'รองคณบดีฝ่ายกิจการนิสิต  อ.สัณห์ชัย หยีวิยม', '2018-07-03 14:47:12', '2018-07-03 14:47:12', '0000-00-00 00:00:00'),
(6, 'รองคณบดีฝ่ายวางแผนและประกันคุณภาพการศึกษา  อ.วรกฤต แสนโภชน์', '2018-07-03 14:47:38', '2018-07-03 14:47:38', '0000-00-00 00:00:00'),
(7, 'รองคณบดีฝ่ายบริหาร  ผศ.ดร.รังสรรค์ เกตุอ๊อต', '2018-07-03 14:47:59', '2018-07-03 14:47:59', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `student_code` int(50) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `Role` varchar(100) NOT NULL,
  `prefix` varchar(100) NOT NULL,
  `status` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `student_code`, `firstname`, `lastname`, `Role`, `prefix`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 57021498, 'กฤษติน', 'ศรีบุญไชย', 'วิศวกรรมคอมพิวเตอร์', 'นาย', '0', '2018-08-16 16:34:44', '2018-08-16 13:05:46', '0000-00-00 00:00:00'),
(2, 57022208, 'เอกลักษณ์', 'อัมพุธ', 'วิศวกรรมคอมพิวเตอร์', 'นาย', '1', '2018-08-16 13:07:17', '2018-08-16 13:07:17', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `date`
--
ALTER TABLE `date`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `signer`
--
ALTER TABLE `signer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `date`
--
ALTER TABLE `date`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `signer`
--
ALTER TABLE `signer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
