-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2024 at 10:23 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `universityregapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subjects`
--

CREATE TABLE `tbl_subjects` (
  `id` int(255) NOT NULL,
  `subjects` varchar(255) NOT NULL,
  `date_added` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_subjects`
--

INSERT INTO `tbl_subjects` (`id`, `subjects`, `date_added`) VALUES
(1, 'Business', '2024-03-13 18:15:36.095000'),
(2, 'Education', '2024-03-13 18:37:31.089000'),
(3, 'Science', '2024-03-13 18:37:42.846000'),
(4, 'Media', '2024-03-13 18:37:54.499000'),
(5, 'Psychology', '2024-03-13 18:38:04.900000'),
(6, 'Computer Science', '2024-03-13 18:38:12.860000'),
(7, 'Mathematics', '2024-03-14 08:56:38.611000');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `dob` int(11) DEFAULT NULL,
  `phone_code` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `selectedArea` varchar(100) DEFAULT NULL,
  `marketing_updates` int(1) DEFAULT NULL,
  `correspondence_in_welsh` int(1) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `userlocation` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `full_name`, `dob`, `phone_code`, `email`, `phone_number`, `password`, `selectedArea`, `marketing_updates`, `correspondence_in_welsh`, `date_added`, `userlocation`, `role`) VALUES
(1, 'Aliyah Bhat', 22, 97, 'aliyah@gmail.com', 2147483647, 'Aliyah', 'science', 0, 1, '2024-03-11 17:36:15', 'Daar Al Salam Colony / دآر السلام کولونی,Attock, Pakistan', 1),
(2, 'Amitabh Bachan', 45, 98, 'amitab@gmail.com', 147483647, 'Amitabh', 'psychology', 1, 1, '2024-03-10 19:10:14', 'Daar Al Salam Colony / دآر السلام کولونی,Attock, Pakistan', 0),
(3, 'Malala Yousafzai', 38, 92, 'malala@gmail.com', 2147483647, 'Malala', 'education', 1, 0, '2024-03-11 19:20:28', 'Daar Al Salam Colony / دآر السلام کولونی,Attock, Pakistan', NULL),
(4, 'Tom Cruise', 56, 1, 'tom@gmail.com', 2147483647, 'Tom', 'psychology', 0, 1, '2024-03-11 19:26:31', 'Daar Al Salam Colony / دآر السلام کولونی,Attock, Pakistan', NULL),
(7, 'Naveed Malik', 23, 22, 'naveed.ahmed6453@gmail.com', 2147483647, 'Asas', 'business', 1, 0, '2024-03-13 17:17:55', 'Daar Al Salam Colony / دآر السلام کولونی,Attock, Pakistan', 0),
(8, 'Naveed Ahmed Malik', 121, 12, 'naveed.ahmed6453@gmail.com', 112121, 'Aliyah', 'Business', 1, 0, '2024-03-13 18:36:25', 'Daar Al Salam Colony / دآر السلام کولونی,Attock, Pakistan', 0),
(9, 'Aqib Ria', 26, 92, 'aqibr@gmail.com', 3533322, 'Aqib', 'Psychology', 0, 1, '2024-03-14 08:58:31', 'Daar Al Salam Colony / دآر السلام کولونی,Attock, Pakistan', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_subjects`
--
ALTER TABLE `tbl_subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_subjects`
--
ALTER TABLE `tbl_subjects`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
