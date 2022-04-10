-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 10, 2022 at 09:39 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cloudchef`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `storeID` int(11) DEFAULT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `storeID`, `name`) VALUES
(1, 1, 'PAYROLL'),
(2, 1, 'boh'),
(3, 1, 'foh'),
(4, 1, 'management'),
(5, 1, 'Kitchen'),
(6, 1, 'Bar'),
(7, 1, 'Front Office'),
(8, 1, 'Back Office'),
(9, 1, 'Bartender'),
(10, 1, 'Manager'),
(11, 1, 'Cashier'),
(12, 1, 'Waiter'),
(13, 1, 'Chef'),
(14, 1, 'Busser'),
(15, 1, 'Host'),
(16, 1, 'Server'),
(17, 1, 'Dishwasher');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `storeID` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `first_name` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `address` varchar(20) NOT NULL,
  `location` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `salary` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `userID`, `storeID`, `department_id`, `first_name`, `last_name`, `address`, `location`, `email`, `phone`, `salary`, `is_active`, `start_date`, `end_date`) VALUES
(1, 1, 1, 1, 'John', 'Doe', '123 lorne st', 'regina, sk', 'exa,ple@gmail.com', '306-520-8483', 40000, 1, '2018-01-01', NULL),
(2, 2, 1, 5, 'Jane', 'Doe', 'dog st', 'regina, sk', 'example.com', '201-111-111', 50000, 1, '2018-01-01', NULL),
(3, 3, 1, 4, 'heather', 'smith', '224 victoria ave.', 'regina, sk', 'oliver@gmail.com', '205-111-111', 40000, 1, '2018-01-01', NULL),
(4, 4, 1, 2, 'Adam', 'doe', '224 victoria ave.', 'regina, sk', 'oliver@gmail.com', '205-111-111', 40000, 1, '2018-01-01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_drop_shifts`
--

CREATE TABLE `employee_drop_shifts` (
  `id` int(11) NOT NULL,
  `storeID` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `employee_shift_id` int(11) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `date_dropped` int(11) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_drop_shifts`
--

INSERT INTO `employee_drop_shifts` (`id`, `storeID`, `employee_id`, `employee_shift_id`, `reason`, `date_dropped`, `approved`) VALUES
(7, 1, 3, 17, 'i am sickffff', 1649209486, 0),
(8, 1, 3, 18, 'i need this day off for, my grandparent birthday.', 1649210522, 0),
(9, 1, 3, 20, 'my cat is sick today', 1649211349, 0);

-- --------------------------------------------------------

--
-- Table structure for table `employee_pickup_shift`
--

CREATE TABLE `employee_pickup_shift` (
  `id` int(11) NOT NULL,
  `storeID` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `employee_shift_id` int(11) DEFAULT NULL,
  `date_picked_up` int(11) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_pickup_shift`
--

INSERT INTO `employee_pickup_shift` (`id`, `storeID`, `employee_id`, `employee_shift_id`, `date_picked_up`, `approved`) VALUES
(11, 1, 3, 17, 1649211225, 1),
(12, 1, 3, 18, 1649227678, 1),
(13, 1, 3, 20, 1649458569, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee_schedule_availability`
--

CREATE TABLE `employee_schedule_availability` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `start_time` int(11) DEFAULT NULL,
  `end_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_schedule_availability`
--

INSERT INTO `employee_schedule_availability` (`id`, `employee_id`, `day`, `start_time`, `end_time`) VALUES
(1, 1, 1, 0, 24),
(2, 1, 2, 0, 24),
(3, 1, 3, 0, 24),
(4, 1, 4, 0, 24),
(5, 1, 5, 0, 24),
(6, 1, 6, 0, 24),
(7, 1, 7, 0, 24);

-- --------------------------------------------------------

--
-- Table structure for table `employee_schedule_punch_in`
--

CREATE TABLE `employee_schedule_punch_in` (
  `id` int(11) NOT NULL,
  `employee_schedule_id` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_schedule_punch_in`
--

INSERT INTO `employee_schedule_punch_in` (`id`, `employee_schedule_id`, `time`) VALUES
(1, 1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `employee_schedule_punch_out`
--

CREATE TABLE `employee_schedule_punch_out` (
  `id` int(11) NOT NULL,
  `employee_schedule_id` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_schedule_punch_out`
--

INSERT INTO `employee_schedule_punch_out` (`id`, `employee_schedule_id`, `time`) VALUES
(1, 1, 17);

-- --------------------------------------------------------

--
-- Table structure for table `employee_shift`
--

CREATE TABLE `employee_shift` (
  `id` int(11) NOT NULL,
  `storeID` int(11) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `store_schedule` int(11) DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `start_time` int(11) DEFAULT NULL,
  `end_time` int(11) DEFAULT NULL,
  `is_open` tinyint(1) DEFAULT NULL,
  `is_off_day` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_shift`
--

INSERT INTO `employee_shift` (`id`, `storeID`, `employeeID`, `store_schedule`, `day`, `start_time`, `end_time`, `is_open`, `is_off_day`) VALUES
(8, 1, 2, 2, 1, 8, 14, 1, 0),
(9, 1, 2, 2, 2, 8, 14, 1, 0),
(10, 1, 2, 2, 3, 8, 14, 1, 0),
(11, 1, 2, 2, 4, 8, 14, 1, 0),
(12, 1, 2, 2, 5, 8, 14, 1, 0),
(13, 1, 2, 2, 6, 8, 17, 1, 0),
(14, 1, 2, 2, 7, 8, 17, 1, 0),
(15, 1, 3, 2, 1, 8, 14, 1, 0),
(16, 1, 3, 2, 2, 8, 14, 1, 0),
(17, 1, 3, 2, 3, 8, 14, 1, 0),
(18, 1, 3, 2, 4, 8, 14, 1, 0),
(19, 1, 3, 2, 5, 8, 14, 1, 0),
(20, 1, 3, 2, 6, 12, 18, 1, 0),
(21, 1, 3, 2, 7, 8, 10, 1, 0),
(78, 1, 1, 1, 1, NULL, NULL, 1, 0),
(79, 1, 1, 1, 2, NULL, NULL, 1, 0),
(80, 1, 1, 1, 3, NULL, NULL, 1, 0),
(81, 1, 1, 1, 4, NULL, NULL, 1, 0),
(82, 1, 1, 1, 5, NULL, NULL, 1, 0),
(83, 1, 1, 1, 6, NULL, NULL, 1, 0),
(84, 1, 1, 1, 7, NULL, NULL, 1, 0),
(113, 1, 1, 2, 1, 7, 15, 1, 0),
(114, 1, 1, 2, 2, 4, 22, 1, 0),
(115, 1, 1, 2, 3, 8, 15, 1, 0),
(116, 1, 1, 2, 4, 1, 21, 1, 0),
(117, 1, 1, 2, 5, 2, 21, 1, 0),
(118, 1, 1, 2, 6, 6, 15, 1, 0),
(119, 1, 1, 2, 7, 6, 16, 1, 0),
(127, 1, 1, 9, 1, 8, 16, 1, 0),
(128, 1, 1, 9, 2, NULL, NULL, 1, 0),
(129, 1, 1, 9, 3, NULL, NULL, 1, 0),
(130, 1, 1, 9, 4, NULL, NULL, 1, 0),
(131, 1, 1, 9, 5, NULL, NULL, 1, 0),
(132, 1, 1, 9, 6, NULL, NULL, 1, 0),
(133, 1, 1, 9, 7, NULL, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `login_requests`
--

CREATE TABLE `login_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `request_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `logs_recipe_file_logs`
--

CREATE TABLE `logs_recipe_file_logs` (
  `id` int(11) NOT NULL,
  `honeypot_hash` varchar(255) NOT NULL,
  `file_hash` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verified` tinyint(1) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logs_recipe_file_logs`
--

INSERT INTO `logs_recipe_file_logs` (`id`, `honeypot_hash`, `file_hash`, `file_path`, `time_stamp`, `verified`, `message`, `created_at`, `updated_at`) VALUES
(1, 'a7c604acc5985e1efdfc4dcfbda2a396f8affa6d7729f73cf3', '0a7fdf3badc4bb3c951f149a712b9ae3', '/image/recipe/UYuvg9elWlzOASft3yagcbNS5F1JmvawDJ50E4As.svg', '2022-02-14 04:49:28', 0, 'File uploaded', '2022-02-14 04:49:28', '2022-02-14 04:49:28'),
(2, '8890abe0913e5f3f35c244d944297693c71a64847fb8da687c', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/S2NScpCCVJo5lPxoyalp04zhAUYxTWdX8CePvouM.svg', '2022-02-14 04:50:20', 0, 'File uploaded', '2022-02-14 04:50:20', '2022-02-14 04:50:20'),
(3, 'f4c98334b6be469aabaf911de07a8882f8b4f5a579269a7000', '0a7fdf3badc4bb3c951f149a712b9ae3', '/image/recipe/TS3KwnshB09RhWmuCybWCVhGoTeCSJxfD858aZbY.svg', '2022-02-14 06:17:28', 0, 'File uploaded', '2022-02-14 06:17:28', '2022-02-14 06:17:28'),
(4, '323461e4f8493244657d6379a58d32117d48be866ee6256a5a', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/RGpdRr1FSMdld5BZoS0JYpWSePfHPF4YUQ0jeZZx.svg', '2022-02-14 06:30:51', 0, 'File uploaded', '2022-02-14 06:30:51', '2022-02-14 06:30:51'),
(5, 'b7a5adeb801fdb71e8ba39ef24f9eb6ff39ab72be4fb0f22d2', '0a7fdf3badc4bb3c951f149a712b9ae3', '/image/recipe/GdAPkb1rOwejqvgzYTiDB3kNAYd7N721mB75sHEi.svg', '2022-02-14 06:31:32', 0, 'File uploaded', '2022-02-14 06:31:32', '2022-02-14 06:31:32'),
(6, '5b6e6f3c757ee71cd8a0ae53d0f85babce795ddf414e2d2c98', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/Y3qX4F68CLz8FCyyqkaMKlTqJ86lpc8uifFQUsBl.svg', '2022-02-14 06:36:36', 0, 'File uploaded', '2022-02-14 06:36:36', '2022-02-14 06:36:36'),
(7, '5bb805bd0ddb895a1adbebebf7163208d07fe2f908f5739385', '0a7fdf3badc4bb3c951f149a712b9ae3', '/image/recipe/L5ydOWnZbkhj93E652prvEL2t41x5hprhUQIWfR1.svg', '2022-02-14 06:38:23', 0, 'File uploaded', '2022-02-14 06:38:23', '2022-02-14 06:38:23'),
(8, 'a04d90d528e8d1a1d022584cf24e0b1657de0f8e29894f2a4c', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/lN9jPYOxayfqc0FpKacMQzAux6R3dQB5LFeTOmGF.svg', '2022-02-14 06:39:17', 0, 'File uploaded', '2022-02-14 06:39:17', '2022-02-14 06:39:17'),
(9, '6368853cd09728a9d692adef28283db54d35ae43f7b9027591', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/ZqbcP8JhYO5XTy53f2172bRCPIQZLBF8vujdQEoX.svg', '2022-02-14 06:39:51', 0, 'File uploaded', '2022-02-14 06:39:51', '2022-02-14 06:39:51'),
(10, 'e7a13134707ea583340c1b8f66addbfc6054f9c7e22b3f60ca', '5c20eb4eb27a18dfc0d60762cd990a91', '/image/recipe/2W4j9RO2TVXXkpuJPZeN4mJx7nSzHqyHHZdO3cK1.svg', '2022-02-14 06:44:55', 0, 'File uploaded', '2022-02-14 06:44:55', '2022-02-14 06:44:55'),
(11, '7961e869f7c069b4b3cabc61fc275c50b001ad1840ec45e701', '5c20eb4eb27a18dfc0d60762cd990a91', '/image/recipe/CAOUUKSqoPX4ddyIpUmBZ1NDPDEcdZ5M06xuYUeu.svg', '2022-02-14 06:45:58', 0, 'File uploaded', '2022-02-14 06:45:58', '2022-02-14 06:45:58'),
(12, '1d17c4f57ecdff153748330ff556d31d326f1f037eb714d437', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/o7IRbZOTu9xGOF144r5foQlh2uiiBXOnyd0v9wj3.svg', '2022-02-14 06:48:09', 0, 'File uploaded', '2022-02-14 06:48:09', '2022-02-14 06:48:09'),
(13, '77dec6ac8b600135aa6d1003ba0e69e96c2d8d2066044092ee', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/SPgiWQH2GkLmxcGEyGzXGkhPd8kXn97A585F7i1F.svg', '2022-02-14 06:48:41', 0, 'File uploaded', '2022-02-14 06:48:41', '2022-02-14 06:48:41'),
(14, '106986820891c929d2fefde1a97085c174b7335e6b30292c40', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/QrTY0vuheVYdo8yJ0OwejWbb8unOPDfN2DtnldWB.svg', '2022-02-14 06:51:04', 0, 'File uploaded', '2022-02-14 06:51:04', '2022-02-14 06:51:04'),
(15, 'c0c109c991143aeae2148f0eea72d771b49df15f07805f8290', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/FABTdtcOokWZg3A9NzPCV6w5insBwYr0mOfvOuL9.svg', '2022-02-14 06:56:02', 0, 'File uploaded', '2022-02-14 06:56:02', '2022-02-14 06:56:02'),
(16, '194d2dd35d84208b9f57ff090fc198130aaccdc202db1c4d21', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/EbRbfSX3hzmQ28uicEEilCVBiMEipzPGyOJvNwPZ.svg', '2022-02-14 06:56:45', 0, 'File uploaded', '2022-02-14 06:56:45', '2022-02-14 06:56:45'),
(17, '9c156c7b626c0bee7220c0185c78701e85da75230e3aa934ec', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/hiSYAFgfMTfYQKV6PQbLnILHi6FtJSfz6YJVAVwW.svg', '2022-02-14 07:07:28', 0, 'File uploaded', '2022-02-14 07:07:28', '2022-02-14 07:07:28'),
(18, 'b91b3d58e8b9b23a9ec510258c2d8a452069a1df8947b8226b', '0a7fdf3badc4bb3c951f149a712b9ae3', '/image/recipe/3lFtlLL28uDmNJrPO8R9GI5inwV8e4yjkqqdROq9.svg', '2022-02-14 07:09:06', 0, 'File uploaded', '2022-02-14 07:09:06', '2022-02-14 07:09:06'),
(19, 'b97d260679bfa8bfde262d6770f8329eb035c002694332a3e5', '083f50b9ad3884fd7b7cd941668cea84', '/image/recipe/c83qsPV7cDLxqpsnYL4yPAoW45Jy4ndQyciLGE4i.svg', '2022-02-14 07:10:57', 0, 'File uploaded', '2022-02-14 07:10:57', '2022-02-14 07:10:57'),
(20, '108a3acbcd0278eeae6193b058a729e064777c69f440b2f330', '5c20eb4eb27a18dfc0d60762cd990a91', '/user-content/recipe/YnZ3IXf8QOpftAiEX80pKeIVe2tbr6XoHpCVEnK2.svg', '2022-02-14 07:41:07', 0, 'File uploaded', '2022-02-14 07:41:07', '2022-02-14 07:41:07'),
(21, '8e44c2f3f92bc6a1a5f948fc1b66b8e87139cd46348f0c3f2e', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/nuA2eLHTCKVfauvkhQBEDkyRrQFtvQlAElaE1lV2.svg', '2022-02-14 07:45:27', 0, 'File uploaded', '2022-02-14 07:45:27', '2022-02-14 07:45:27'),
(22, '9fd26ffce41fa3580e5c20aa9735c8b6f4866312a83cc5506e', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/Uz2D128ogUi0PFzEu1mGaS0nscif7I5CLqx27fqc.svg', '2022-02-14 07:46:33', 0, 'File uploaded', '2022-02-14 07:46:33', '2022-02-14 07:46:33'),
(23, 'dd02112930eb432787c1cd762415a15843dd231616db2ee55e', '5c20eb4eb27a18dfc0d60762cd990a91', '/user-content/recipe/hoJzhMeKWJWD0FIKbKmvVcfCkVk0it8lY96FkCV0.svg', '2022-02-14 07:47:50', 0, 'File uploaded', '2022-02-14 07:47:50', '2022-02-14 07:47:50'),
(24, '77c83953c53b047a7b05a683e3c8f6368cd2176f2a1efa13e4', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/KLLyvesODmmJdIG19sqCpbd0QN8wMaIPJBnReCPp.svg', '2022-02-14 07:50:42', 0, 'File uploaded', '2022-02-14 07:50:42', '2022-02-14 07:50:42'),
(25, 'c1073dbdc0785b485d8ff77abe64e1c01c460bf04e6cc20ca6', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/WU3ZUhxdwK4Y2eSTxoJ8vkoAAWggWiY0KHicbEo2.svg', '2022-02-14 08:06:20', 0, 'File uploaded', '2022-02-14 08:06:20', '2022-02-14 08:06:20'),
(26, '40aa90c8a67cc3f82e7dd50e871272fe31c54ed670dd8d07ff', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/A3qEfv78TsK5QCqYeLtZCnHjdM4OuA7pNVVRNuSK.svg', '2022-02-14 08:35:19', 0, 'File uploaded', '2022-02-14 08:35:19', '2022-02-14 08:35:19'),
(27, '48d46f1e39791dd8e52f985c30777e1a00a7f908f260f950e4', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/hs86roKfrBE9pGkZgSQQm9Rk9cAnDyWUgQGa7Ri6.svg', '2022-02-14 09:04:36', 0, 'File uploaded', '2022-02-14 09:04:36', '2022-02-14 09:04:36'),
(28, 'ec62e246c1e4e382890aa8cbde0a29f6ece8ef485ebae692e7', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/wab8Nv3xLBePq9S5HrRpYFu2oZ2MLaREVtDTrVyF.svg', '2022-02-14 09:10:27', 0, 'File uploaded', '2022-02-14 09:10:27', '2022-02-14 09:10:27'),
(29, '66fc64e27ab655f4de83a1ebb9123e33688a2183a0bd43839d', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/3CVIELjcWHdbNaQt8MY4JLDeNwI4oBzhT3GwYZeP.svg', '2022-02-14 09:11:54', 0, 'File uploaded', '2022-02-14 09:11:54', '2022-02-14 09:11:54'),
(30, '7280ccce7947c253646ac811dcd1b5fd5a577892d4588b005c', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/M2FSoymgoUWbAwambI90kdmev1HAzAkVlbgtI7Ok.svg', '2022-02-14 09:34:58', 0, 'File uploaded', '2022-02-14 09:34:58', '2022-02-14 09:34:58'),
(31, 'ad1b8ed8b746bf243e4021a8e26c6bb87b03ef0c9c569ec33c', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/2d8RmVLMDB3XWVyBiBirMbuje9JqfmdS3s9Q7h6g.svg', '2022-02-14 09:36:18', 0, 'File uploaded', '2022-02-14 09:36:18', '2022-02-14 09:36:18'),
(32, 'f6c64ff4db93db48e76a9f045d190efe09a4304b956dc3bb9e', '5c20eb4eb27a18dfc0d60762cd990a91', '/user-content/recipe/Plrqr5euTy2prvyH47bYjkLhK2DWXboXuTo1wyL3.svg', '2022-02-14 09:44:15', 0, 'File uploaded', '2022-02-14 09:44:15', '2022-02-14 09:44:15'),
(33, 'c43cd436a7a1e9405bad4d1a164d046180a1a93c5943dba85d', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/STc0HE0Rp36aQwnTufiTFhzE6M9VxlKUZTBNYGZK.svg', '2022-02-14 09:50:41', 0, 'File uploaded', '2022-02-14 09:50:41', '2022-02-14 09:50:41'),
(34, '54e4bd3b8ad5a7f76d31df7be74b5f6f17a7fed197a291b0e9', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/pDQruMEKSwDrstF6vnnVrXnZAHAskpEpJdZHutE1.svg', '2022-02-14 10:09:38', 0, 'File uploaded', '2022-02-14 10:09:38', '2022-02-14 10:09:38'),
(35, '30db04f3d78931be61697d04c937f4010920149e086a824406', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/qJQShD47Wvg7xcsYirjDNsfFgRuvimH5DJULdxfT.svg', '2022-02-14 10:48:57', 0, 'File uploaded', '2022-02-14 10:48:57', '2022-02-14 10:48:57'),
(36, '712302b115d31b26f69fbf6945f64be3feaf5e136f0423c764', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/WQqzf8dkpaFETsvJD5c2iMrtym3vYuE9n2paZZpN.svg', '2022-02-14 10:51:07', 0, 'File uploaded', '2022-02-14 10:51:07', '2022-02-14 10:51:07'),
(37, '7a42695b29d489826bb9bacf549c1ca78009ab4fabdfd9f49f', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/oLAC4h5KynA6V8fOqnDGErkDbZpWVKzz5yzOz3s8.svg', '2022-02-14 10:52:45', 0, 'File uploaded', '2022-02-14 10:52:45', '2022-02-14 10:52:45'),
(38, 'a4ef39f129f229552902cc168532d58aa40e71c8a8c6a60794', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/B76StPWj1HOWTTzcLwAwdW6lBMYXC5FhHsYyNY16.svg', '2022-02-14 10:55:23', 0, 'File uploaded', '2022-02-14 10:55:23', '2022-02-14 10:55:23'),
(39, '5f59e63e89646043019e6fccb7031088afc6c6de46069fd98f', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/XwXpgsOWKjNCF3XWL4c8K8SomlbAQFiuOq6Jmvvl.svg', '2022-02-14 11:11:05', 0, 'File uploaded', '2022-02-14 11:11:05', '2022-02-14 11:11:05'),
(40, '98acf3ebe450f08790534e1d10afcac49aa5cdc6114b256b8d', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/lshmzpMmhn47Ujiv3Ou38X0vg9jP9fy2sDHqZpEY.svg', '2022-02-14 11:13:07', 0, 'File uploaded', '2022-02-14 11:13:07', '2022-02-14 11:13:07'),
(41, '3ec42d7fc6221f9a29801a3ec55daa5532db532349362f904b', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/fCAMD3I8N5y1AdtzHW7ERGF0uWOOIAFaPS6E6vBZ.svg', '2022-02-14 11:17:38', 0, 'File uploaded', '2022-02-14 11:17:38', '2022-02-14 11:17:38'),
(42, 'f62ed4821299899616e42ad9eb6720caf53d5cc40deeabefe3', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/1i69AchCOQWMkquS9Gsb4cgK2moWpZomr6lI2ktI.svg', '2022-02-14 11:21:11', 0, 'File uploaded', '2022-02-14 11:21:11', '2022-02-14 11:21:11'),
(43, '095d4acfa87def0123d963da274bb33260a56dd364fbcb4057', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/DuIHiUFR8VnztMLZNbcdyfeTXNybX71T2poseupM.svg', '2022-02-14 11:24:27', 0, 'File uploaded', '2022-02-14 11:24:27', '2022-02-14 11:24:27'),
(44, '614611c7978405dbb4d24c40ddcbd91c3aa34682802101e047', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/XYhthpoQriUWKU9q7cUK1nOTaQQ7lfvc37P8HBR6.svg', '2022-02-14 11:29:41', 0, 'File uploaded', '2022-02-14 11:29:41', '2022-02-14 11:29:41'),
(45, 'f0f16cc23456ee545a67bd2919dd592e7cc7d564a2146a94de', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/xFM13FUKwoU3xqkAKtwCEPIYxe9sfYw6ELZofJBE.svg', '2022-02-14 11:43:52', 0, 'File uploaded', '2022-02-14 11:43:52', '2022-02-14 11:43:52'),
(46, 'f1cbf3b598cc290e0474c5cf246fdd7a3d22129a915a4ccafc', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/DrmSIDIBg1LupjEIM218VOO4xi4PMD4M5EHnKfPR.svg', '2022-02-14 11:46:08', 0, 'File uploaded', '2022-02-14 11:46:08', '2022-02-14 11:46:08'),
(47, 'f304c42423e4ab84c68f3ea566bf5b3975f8b8700b080ab79d', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/v21YQrSmkQIADE1BGZOEDJzttpJ15NSOd7DXbkFz.svg', '2022-02-14 11:58:44', 0, 'File uploaded', '2022-02-14 11:58:44', '2022-02-14 11:58:44'),
(48, 'd3fbd3d10e352b09217b0b8132b135e6eb5c0f3bae3e0afb6a', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/ljRVyIFfT5CXgPnYUEU9HT6Ua52sub8uyK1MaoFl.svg', '2022-02-14 12:02:31', 0, 'File uploaded', '2022-02-14 12:02:31', '2022-02-14 12:02:31'),
(49, 'f58aca358419bb38766353da4b8188f0061561a49b5b566b6d', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/FlEE6JoousWQQEcqqAZOL47211oxsSXhHUWDPFW2.svg', '2022-02-14 12:07:17', 0, 'File uploaded', '2022-02-14 12:07:17', '2022-02-14 12:07:17'),
(50, '44ec42c1588ebf1c9cfa4fd57db68fd2d5414c3a9e37c2549a', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/iUmawM8ImA1yAVq4wVJDavGqbSPljMW2T746pXgf.svg', '2022-02-14 12:09:23', 0, 'File uploaded', '2022-02-14 12:09:23', '2022-02-14 12:09:23'),
(51, 'cf587f36d2e7a19965b0c6509f2123200b721a9ee00d3bfb2a', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/METIqPTRdMicuYk6Tb5voOaiVfEsR1xBgLFQ7Qal.svg', '2022-02-14 12:17:36', 0, 'File uploaded', '2022-02-14 12:17:36', '2022-02-14 12:17:36'),
(52, 'fe3727d24b37ed5497451aefc9549e426091cf708c024cd229', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/axjD74CX0QTTRXd1RNBiJ5TyGxdoBku9qy1Dyo1S.svg', '2022-02-14 12:19:37', 0, 'File uploaded', '2022-02-14 12:19:37', '2022-02-14 12:19:37'),
(53, '5b81bc1c7c8c8484236509631994318753ca159accbab2fd01', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/1tWqolxr8JqwlQ275CZDxDR4E4Rkqd8eaR9jOmAr.svg', '2022-02-14 12:21:19', 0, 'File uploaded', '2022-02-14 12:21:19', '2022-02-14 12:21:19'),
(54, '0bd0861873ed4d53c5658b6f1396b78def4e15407a55faf4e8', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/2GKZczdOzPs6YmjRRTLuTCnaol4ode3mZylDYl5Y.svg', '2022-02-14 12:32:43', 0, 'File uploaded', '2022-02-14 12:32:43', '2022-02-14 12:32:43'),
(55, '1868186d733453768fc673e17e5230438246c31cd23d1dcc06', 'fa27b00f602830fab98ef00a1dd0bf98', '/user-content/recipe/3mhGcaQLvQ9LPyPi73ixDtzaqbvFU9FrJCtJefBV.svg', '2022-02-14 13:17:07', 0, 'File uploaded', '2022-02-14 13:17:07', '2022-02-14 13:17:07'),
(56, '12791a4d2ab26789cdb2d19b795295c93529301acebaa1b884', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/Sz8abBUDXikN00p7NGxf3WQGr1JGBsWvRY6Pu6nd.svg', '2022-02-14 13:38:04', 0, 'File uploaded', '2022-02-14 13:38:04', '2022-02-14 13:38:04'),
(57, 'ed30842e1abc80fdfc9975f71ff35898d16d331e4353e7002a', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/hF7OljoNTsEvWkOVJvtOKmHmBsh56kmgisvoaNWO.svg', '2022-02-14 16:19:47', 0, 'File uploaded', '2022-02-14 16:19:47', '2022-02-14 16:19:47'),
(58, '8a7235c7d2536badb0e23dfff9d54e89f721afb56de076cd05', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/WNhoQJ9egRMsP54TW0nI4YiFoBczZwlPBPeARaRo.svg', '2022-02-15 14:59:02', 0, 'File uploaded', '2022-02-15 14:59:02', '2022-02-15 14:59:02'),
(59, '8424ada1ab552d56a6af7f8914c94f89cf76f7a7b6e6871a5b', '8fd883a098691f59cfa6a2dbc9ed9591', '/user-content/recipe/inH12w5gVjIFwHGf4l16mJI0e1ii8hkm4EclhEP3.svg', '2022-02-15 15:45:05', 0, 'File uploaded', '2022-02-15 15:45:05', '2022-02-15 15:45:05'),
(60, '498b3885050638be40c7f0122b69d57ee5c53e77837a18c68d', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/bXnjXptLUnSlprT0AhuBgRRthg9JuQRPY4GMOIcg.svg', '2022-02-15 15:50:00', 0, 'File uploaded', '2022-02-15 15:50:00', '2022-02-15 15:50:00'),
(61, '192d7298e3f924a04986c8440b280d7301be1ba58aaf864b2b', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/tksyszYcexmsjxAhopRV7ryMyU4uQL4OPVGGXkiS.svg', '2022-02-15 15:53:02', 0, 'File uploaded', '2022-02-15 15:53:02', '2022-02-15 15:53:02'),
(62, 'b7d761caaa7e9fa46c5944f05374193d2cfdb6dd4019cae44d', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/2KTWqkbEiRzahu1nO9TcG4oUQ2hLyMIdJ7G7C2tu.svg', '2022-02-15 15:58:52', 0, 'File uploaded', '2022-02-15 15:58:52', '2022-02-15 15:58:52'),
(63, '47b7152b5d3a09d0de0e5da147262845cca9358e5ee7adb768', '5c20eb4eb27a18dfc0d60762cd990a91', '/user-content/recipe/Sj2gH9kzqe02xjLi9IwTwcWfJV0Vtsulgd2DhAhc.svg', '2022-02-15 16:00:14', 0, 'File uploaded', '2022-02-15 16:00:14', '2022-02-15 16:00:14'),
(64, 'd5046447c17b09cb63ab2797aa52efca2b47c7fc4fbffc61b6', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/hwHA28z1nUILatrUWkmSc541YmaEDnsgkUYob1aW.svg', '2022-02-15 16:02:23', 0, 'File uploaded', '2022-02-15 16:02:23', '2022-02-15 16:02:23'),
(65, 'e152871eda234de74ee64dd8d3190b9b0bc33feaf2749121e2', '083f50b9ad3884fd7b7cd941668cea84', '/user-content/recipe/sJCaw8Vnk99c34YV6ZQ2iTmsZTGUDN5NK6CLz6iM.svg', '2022-02-15 16:03:31', 0, 'File uploaded', '2022-02-15 16:03:31', '2022-02-15 16:03:31'),
(66, 'e4c8f38251625afd36a545b9a12650fdd1193dbb3fffb49c82', '0a7fdf3badc4bb3c951f149a712b9ae3', '/user-content/recipe/LjUpoJ1bO5ZjP41p8fVT3OfnPPZNA9vZpe8B8XR1.svg', '2022-02-15 16:04:40', 0, 'File uploaded', '2022-02-15 16:04:40', '2022-02-15 16:04:40'),
(67, '610dc6ee1009e0fcd2ff9207227e81e927219b24ebf078342e', '5b7c48177c9bfee2c1a45bfd13bb30e9', '/user-content/recipe/uFrpmQsVKpAnn8N2E1gQp58Ky9XuYRzGKY4FFuTL.jpg', '2022-02-15 17:49:49', 0, 'File uploaded', '2022-02-15 17:49:49', '2022-02-15 17:49:49'),
(68, 'c623f3631b4c583a0a97bde631d86285d7108d14df489f4e7f', 'cd990533a1df96c1768db44de18cedee', '/user-content/recipe/1CFexoYXtR06clhlwySRASSQ8zyblons0h6JzYU2.jpg', '2022-02-16 17:50:07', 0, 'File uploaded', '2022-02-16 17:50:07', '2022-02-16 17:50:07'),
(69, 'b455a5b9ec1bc2f226456ff954dd08b9f87199061ab414a5c4', 'cd990533a1df96c1768db44de18cedee', '/user-content/recipe/6ieWqjJJhHyYHCdWtfIQLkwHmv5B1m6qQBDslKGE.jpg', '2022-03-11 04:02:44', 0, 'File uploaded', '2022-03-11 04:02:44', '2022-03-11 04:02:44'),
(70, '1092d7d6435387a714750b3eb6a7d726af153abbb0a2023dc8', '30721c2aa67ac2f6e7bde7e99965d18c', '/user-content/recipe/qX0ZyrMNdmIp53R3em1ME7CQKPLVsJuAM5Xw0O0Q.jpg', '2022-03-11 06:23:55', 0, 'File uploaded', '2022-03-11 06:23:55', '2022-03-11 06:23:55');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2021_11_17_184018_users', 1),
(3, '2021_11_19_022657_store', 1),
(4, '2021_11_19_023514_store_members', 1),
(5, '2021_11_20_020832_login_requests', 1),
(6, '2021_11_21_210253_sessions', 1),
(7, '2021_11_22_131813_user_registration_log', 1),
(8, '2021_12_26_221357_user_group_member', 1),
(10, '2021_12_26_221425_user_profiles', 1),
(11, '2021_12_27_013144_user_groups', 1),
(14, '2021_12_26_221414_user_messages', 2);

-- --------------------------------------------------------

--
-- Table structure for table `nutrients_csvfile`
--

CREATE TABLE `nutrients_csvfile` (
  `FOOD` varchar(40) DEFAULT NULL,
  `MESSURE` varchar(13) DEFAULT NULL,
  `GRAMS` varchar(5) DEFAULT NULL,
  `CALORIES` varchar(8) DEFAULT NULL,
  `PROTIEN` varchar(7) DEFAULT NULL,
  `FAT` varchar(3) DEFAULT NULL,
  `SAT_FAT` varchar(7) DEFAULT NULL,
  `FIBER` varchar(5) DEFAULT NULL,
  `CARBS` varchar(5) DEFAULT NULL,
  `CATEGORY` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nutrients_csvfile`
--

INSERT INTO `nutrients_csvfile` (`FOOD`, `MESSURE`, `GRAMS`, `CALORIES`, `PROTIEN`, `FAT`, `SAT_FAT`, `FIBER`, `CARBS`, `CATEGORY`) VALUES
('Food', 'Measure', 'Grams', 'Calories', 'Protein', 'Fat', 'Sat.Fat', 'Fiber', 'Carbs', 'Category'),
('Cows\' milk', '1 qt.', '976', '660', '32', '40', '36', '0', '48', 'Dairy products'),
('Milk skim', '1 qt.', '984', '360', '36', 't', 't', '0', '52', 'Dairy products'),
('Buttermilk', '1 cup', '246', '127', '9', '5', '4', '0', '13', 'Dairy products'),
('Evaporated, undiluted', '1 cup', '252', '345', '16', '20', '18', '0', '24', 'Dairy products'),
('Fortified milk', '6 cups', '1,419', '1,373', '89', '42', '23', '1.4', '119', 'Dairy products'),
('Powdered milk', '1 cup', '103', '515', '27', '28', '24', '0', '39', 'Dairy products'),
('skim, instant', '1 1/3 cups', '85', '290', '30', 't', 't', '0', '42', 'Dairy products'),
('skim, non-instant', '2/3 cup', '85', '290', '30', 't', 't', '1', '42', 'Dairy products'),
('Goats\' milk', '1 cup', '244', '165', '8', '10', '8', '0', '11', 'Dairy products'),
('(1/2 cup ice cream)', '2 cups', '540', '690', '24', '24', '22', '0', '70', 'Dairy products'),
('Cocoa', '1 cup', '252', '235', '8', '11', '10', '0', '26', 'Dairy products'),
('skim. milk', '1 cup', '250', '128', '18', '4', '3', '1', '13', 'Dairy products'),
('(cornstarch)', '1 cup', '248', '275', '9', '10', '9', '0', '40', 'Dairy products'),
('Custard', '1 cup', '248', '285', '13', '14', '11', '0', '28', 'Dairy products'),
('Ice cream', '1 cup', '188', '300', '6', '18', '16', '0', '29', 'Dairy products'),
('Ice milk', '1 cup', '190', '275', '9', '10', '9', '0', '32', 'Dairy products'),
('Cream or half-and-half', '1/2 cup', '120', '170', '4', '15', '13', '0', '5', 'Dairy products'),
('or whipping', '1/2 cup', '119', '430', '2', '44', '27', '1', '3', 'Dairy products'),
('Cheese', '1 cup', '225', '240', '30', '11', '10', '0', '6', 'Dairy products'),
('uncreamed', '1 cup', '225', '195', '38', 't', 't', '0', '6', 'Dairy products'),
('Cheddar', '1-in. cube', '17', '70', '4', '6', '5', '0', 't', 'Dairy products'),
('Cheddar, grated cup', '1/2 cup', '56', '226', '14', '19', '17', '0', '1', 'Dairy products'),
('Cream cheese', '1 oz.', '28', '105', '2', '11', '10', '0', '1', 'Dairy products'),
('Processed cheese', '1 oz.', '28', '105', '7', '9', '8', '0', 't', 'Dairy products'),
('Roquefort type', '1 oz.', '28', '105', '6', '9', '8', '0', 't', 'Dairy products'),
('Swiss', '1 oz.', '28', '105', '7', '8', '7', '0', 't', 'Dairy products'),
('Eggs raw', '2', '100', '150', '12', '12', '10', '0', 't', 'Dairy products'),
('Eggs Scrambled or fried', '2', '128', '220', '13', '16', '14', '0', '1', 'Dairy products'),
('Yolks', '2', '34', '120', '6', '10', '8', '0', 't', 'Fats, Oils, Shortenings'),
('Butter', '1T.', '14', '100', 't', '11', '10', '0', 't', 'Fats, Oils, Shortenings'),
('Butter', '1/2 cup', '112', '113', '114', '115', '116', '117', '118', 'Fats, Oils, Shortenings'),
('Butter', '1/4 lb.', '112', '113', '114', '115', '116', '117', '118', 'Fats, Oils, Shortenings'),
('Hydrogenated cooking fat', '1/2 cup', '100', '665', '0', '100', '88', '0', '0', 'Fats, Oils, Shortenings'),
('Lard', '1/2 cup', '110', '992', '0', '110', '92', '0', '0', 'Fats, Oils, Shortenings'),
('Margarine', '1/2 cup', '112', '806', 't', '91', '76', '0', 't', 'Fats, Oils, Shortenings'),
('Margarine, 2 pat or', '1 T.', '14', '100', 't', '11', '9', '0', 't', 'Fats, Oils, Shortenings'),
('Mayonnaise', '1 T.', '15', '110', 't', '12', '5', '0', 't', 'Fats, Oils, Shortenings'),
('Corn oil', '1 T.', '14', '125', '0', '14', '5', '0', '0', 'Fats, Oils, Shortenings'),
('Olive oil', '1T.', '14', '125', '0', '14', '3', '0', '0', 'Fats, Oils, Shortenings'),
('Safflower seed oil', '1 T.', '14', '125', '0', '14', '3', '0', '0', 'Fats, Oils, Shortenings'),
('French dressing', '1 T.', '15', '60', 't', '6', '2', '0', '2', 'Fats, Oils, Shortenings'),
('Thousand Island sauce', '1 T.', '15', '75', 't', '8', '3', '0', '1', 'Fats, Oils, Shortenings'),
('Salt pork', '2 oz.', '60', '470', '3', '55', '', '0', '0', 'Meat, Poultry'),
('Bacon', '2 slices', '16', '95', '4', '8', '7', '0', '1', 'Meat, Poultry'),
('Beef', '3 oz.', '85', '245', '23', '16', '15', '0', '0', 'Meat, Poultry'),
('Hamburger', '3 oz.', '85', '245', '21', '17', '15', '0', '0', 'Meat, Poultry'),
('Ground lean', '3 oz.', '85', '185', '24', '10', '9', '0', '0', 'Meat, Poultry'),
('Roast beef', '3 oz.', '85', '390', '16', '36', '35', '0', '0', 'Meat, Poultry'),
('Steak', '3 oz.', '85', '330', '20', '27', '25', '0', '0', 'Meat, Poultry'),
('Steak, lean, as round', '3 oz.', '85', '220', '24', '12', '11', '0', '0', 'Meat, Poultry'),
('Corned beef', '3 oz.', '85', '185', '22', '10', '9', '0', '0', 'Meat, Poultry'),
('Corned beef hash canned', '3 oz.', '85', '120', '12', '8', '7', 't', '6', 'Meat, Poultry'),
('Corned beef hash Dried', '2 oz.', '56', '115', '19', '4', '4', '0', '0', 'Meat, Poultry'),
('Pot-pie', '1 pie', '227', '480', '18', '28', '25', 't', '32', 'Meat, Poultry'),
('Corned beef hash Stew', '1 cup', '235', '185', '15', '10', '9', 't', '15', 'Meat, Poultry'),
('chicken', '3 oz.', '85', '185', '23', '9', '7', '0', '0', 'Meat, Poultry'),
('Fried, breast or leg and thigh chicken', '3 oz.', '85', '245', '25', '15', '11', '0', '0', 'Meat, Poultry'),
('Roasted chicken', '3 1/2 oz.', '100', '290', '25', '20', '16', '0', '0', 'Meat, Poultry'),
('Chicken livers, fried', '3 med.', '100', '140', '22', '14', '12', '0', '2.30', 'Meat, Poultry'),
('Duck, domestic', '3 1/2 oz.', '100', '370', '16', '28', '0', '0', '0', 'Meat, Poultry'),
('Lamb, chop, broiled', '4 oz.', '115', '480', '24', '35', '33', '0', '0', 'Meat, Poultry'),
('Leg roasted', '3 oz.', '86', '314', '20', '14', '14', '0', '0', 'Meat, Poultry'),
('Shoulder, braised', '3 oz.', '85', '285', '18', '23', '21', '0', '0', 'Meat, Poultry'),
('Pork, chop, 1 thick', '3 1/2 oz.', '100', '260', '16', '21', '18', '0', '0', 'Meat, Poultry'),
('Ham pan-broiled', '3 oz.', '85', '290', '16', '22', '19', '0', '0', 'Meat, Poultry'),
('Ham, as ', '2 oz.', '57', '170', '13', '13', '11', '0', '0', 'Meat, Poultry'),
('Ham, canned, spiced', '2 oz.', '57', '165', '8', '14', '12', '0', '1', 'Meat, Poultry'),
('Pork roast', '3 oz.', '85', '310', '21', '24', '21', '0', '0', 'Meat, Poultry'),
('Pork sausage', '3 1/2 oz.', '100', '475', '18', '44', '40', '0', '0', 'Meat, Poultry'),
('Turkey', '3 1/2 oz.', '100', '265', '27', '15', '0', '0', '0', 'Meat, Poultry'),
('Veal', '3 oz.', '85', '185', '23', '9', '8', '0', '0', 'Meat, Poultry'),
('Roast', '3 oz.', '85', '305', '13', '14', '13', '0', '0', 'Meat, Poultry'),
('Clams', '3 oz.', '85', '87', '12', '1', '0', '0', '2', 'Fish, Seafood'),
('Cod', '3 1/2 oz.', '100', '170', '28', '5', '0', '0', '0', 'Fish, Seafood'),
('Crab meat', '3 oz.', '85', '90', '14', '2', '0', '0', '1', 'Fish, Seafood'),
('Fish sticks fried', '5', '112', '200', '19', '10', '5', '0', '8', 'Fish, Seafood'),
('Flounder', '3 1/2 oz.', '100', '200', '30', '8', '0', '0', '0', 'Fish, Seafood'),
('Haddock', '3 oz.', '85', '135', '16', '5', '4', '0', '6', 'Fish, Seafood'),
('Halibut', '3 1/2 oz.', '100', '182', '26', '8', '0', '0', '0', 'Fish, Seafood'),
('Herring', '1 small', '100', '211', '22', '13', '0', '0', '0', 'Fish, Seafood'),
('Lobster', 'aver.', '100', '92', '18', '1', '0', '0', 't', 'Fish, Seafood'),
('Mackerel', '3 oz.', '85', '155', '18', '9', '0', 'a', '0', 'Fish, Seafood'),
('Oysters', '6-8 med.', '230', '231', '232', '233', '234', '235', '236', 'Fish, Seafood'),
('Oyster stew', '1 cup', '85', '125', '19', '6', '1', '0', '0', 'Fish, Seafood'),
('Salmon', '3 oz.', '85', '120', '17', '5', '1', '0', '0', 'Fish, Seafood'),
('Sardines', '3 oz.', '85', '180', '22', '9', '4', '0', '0', 'Fish, Seafood'),
('Scallops', '3 1/2 oz.', '100', '104', '18', '8', '0', '0', '10', 'Fish, Seafood'),
('Shad', '3 oz.', '85', '170', '20', '10', '0', '0', '0', 'Fish, Seafood'),
('Shrimp', '3 oz.', '85', '110', '23', '1', '0', '0', '0', 'Fish, Seafood'),
('Swordfish', '1 steak', '100', '180', '27', '6', '0', '0', '0', 'Fish, Seafood'),
('Tuna', '3 oz.', '85', '170', '25', '7', '3', '0', '0', 'Fish, Seafood'),
('Artichoke', '1 large', '100', '8-44', '2', 't', 't', '2', '10', 'Vegetables A-E'),
('Asparagus', '6 spears', '96', '18', '1', 't', 't', '0.5', '3', 'Vegetables A-E'),
('Beans', '1 cup', '125', '25', '1', 't', 't', '0.8', '6', 'Vegetables A-E'),
('Lima', '1 cup', '160', '140', '8', 't', 't', '3.0', '24', 'Vegetables A-E'),
('Lima, dry, cooked', '1 cup', '192', '260', '16', 't', 't', '2', '48', 'Vegetables A-E'),
('Navy, baked with pork', '3/4 cup', '200', '250', '11', '6', '6', '2', '37', 'Vegetables A-E'),
('Red kidney', '1 cup', '260', '230', '15', '1', '0', '2.5', '42', 'Vegetables A-E'),
('Bean sprouts', '1 cup', '50', '17', '1', 't', '0', '0.3', '3', 'Vegetables A-E'),
('Beet greens', '1 cup', '100', '27', '2', 't', '0', '1.4', '6', 'Vegetables A-E'),
('Beetroots', '1 cup', '165', '1', '12', '0', '', 't', '0.80', 'Vegetables A-E'),
('Broccoli', '1 cup', '150', '45', '5', 't', '0', '1.9', '8', 'Vegetables A-E'),
('Brussels sprouts', '1 cup', '130', '60', '6', 't', '0', '1.7', '12', 'Vegetables A-E'),
('Sauerkraut', '1 cup', '150', '32', '1', 't', '0', '1.2', '7', 'Vegetables A-E'),
('Steamed cabbage', '1 cup', '170', '40', '2', 't', '0', '1.3', '9', 'Vegetables A-E'),
('Carrots', '1 cup', '150', '45', '1', 't', '0', '0.9', '10', 'Vegetables A-E'),
('Raw, grated', '1 cup', '110', '45', '1', 't', '0', '1.2', '10', 'Vegetables A-E'),
('Strips, from raw', '1 mad.', '50', '20', 't', 't', '0', '0.5', '5', 'Vegetables A-E'),
('Cauliflower', '1 cup', '120', '30', '3', 't', '0', '1', '6', 'Vegetables A-E'),
('Celery', '1 cup', '100', '20', '1', 't', '0', '1', '4', 'Vegetables A-E'),
('Stalk raw', '1 large', '40', '5', '1', 't', '0', '0.3', '1', 'Vegetables A-E'),
('Chard steamed', '1 cup', '150', '30', '2', 't', '0', '1.4', '7', 'Vegetables A-E'),
('Collards', '1 cup', '150', '51', '5', 't', '0', '2', '8', 'Vegetables A-E'),
('Corn', '1 ear', '100', '92', '3', '1', 't', '0.8', '21', 'Vegetables A-E'),
('cooked or canned', '1 cup', '200', '170', '5', 't', '0', '1.6', '41', 'Vegetables A-E'),
('Cucumbers', '8', '50', '6', 't', '0', '0', '0.2', '1', 'Vegetables A-E'),
('Dandelion greens', '1 cup', '180', '80', '5', '1', '0', '3.2', '16', 'Vegetables A-E'),
('Eggplant', '1 cup', '180', '30', '2', 't', '0', '1.0', '9', 'Vegetables A-E'),
('Endive', '2 oz.', '57', '10', '1', 't', '0', '0.6', '2', 'Vegetables A-E'),
('Kale', '1 cup', '110', '45', '4', '1', '0', '0.9', '8', 'Vegetables F-P'),
('Kohlrabi', '1 cup', '140', '40', '2', 't', '0', '1.5', '9', 'Vegetables F-P'),
('Lambs quarters, steamed', '1 cup', '150', '48', '5', 't', '0', '3.2', '7', 'Vegetables F-P'),
('Lentils', '1 cup', '200', '212', '15', 't', '0', '2.4', '38', 'Vegetables F-P'),
('Lettuce', '1/4 head', '100', '14', '1', 't', '0', '0.5', '2', 'Vegetables F-P'),
('Iceberg', '1/4 head', '100', '13', 't', 't', '0', '0.5', '3', 'Vegetables F-P'),
('Mushrooms canned', '4', '120', '12', '2', 't', '0', 't', '4', 'Vegetables F-P'),
('Mustard greens', '1', '140', '30', '3', 't', '0', '1.2', '6', 'Vegetables F-P'),
('Okra', '1 1/3 cups', '100', '32', '1', 't', '0', '1', '7', 'Vegetables F-P'),
('Onions', '1', '210', '80', '2', 't', '0', '1.6', '18', 'Vegetables F-P'),
('Raw, green', '6 small', '50', '22', 't', 't', '0', '1', '5', 'Vegetables F-P'),
('Parsley', '2 T.', '50', '2', 't', 't', '0', 't', 't', 'Vegetables F-P'),
('Parsnips', '1 cup', '155', '95', '2', '1', '0', '3', '22', 'Vegetables F-P'),
('Peas', '1 cup', '100', '66', '3', 't', '0', '0.1', '13', 'Vegetables F-P'),
('Fresh, steamed peas', '1 cup', '100', '70', '5', 't', '0', '2.2', '12', 'Vegetables R-Z'),
('Frozen peas', '1 cup', '100', '', '5', 't', '0', '1.8', '12', 'Vegetables R-Z'),
('Split cooked peas', '4 cups', '100', '115', '8', 't', '0', '0.4', '21', 'Vegetables R-Z'),
('heated peas', '1 cup', '100', '53', '3', 't', '0', '1', '10', 'Vegetables R-Z'),
('Peppers canned', '1 pod', '38', '10', 't', 't', '0', 't', '2', 'Vegetables R-Z'),
('Peppers Raw, green, sweet', '1 large', '100', '25', '1', 't', '0', '1.4', '6', 'Vegetables R-Z'),
('Peppers with beef and crumbs', '1 med.', '150', '255', '19', '9', '8', '1', '24', 'Vegetables R-Z'),
('Potatoes, baked', '1 med.', '100', '100', '2', 't', '0', '0.5', '22', 'Vegetables R-Z'),
('French-fried', '10 pieces', '60', '155', '-1', '7', '3', '0.4', '20', 'Vegetables R-Z'),
('Potatoes Mashed with milk and butter', '1 cup', '200', '230', '4', '12', '11', '0.7', '28', 'Vegetables R-Z'),
('Potatoes, pan-tried', '3/4 cup', '100', '268', '4', '14', '6', '0.40', '33', 'Vegetables R-Z'),
('Scalloped with cheese potatoes', '3/4 cup', '100', '145', '6', '8', '7', '0.40', '14', 'Vegetables R-Z'),
('Steamed potatoes before peeling', '1 med.', '100', '80', '2', 't', '0', '0.40', '19', 'Vegetables R-Z'),
('Potato chips', '10', '20', '110', '1', '7', '4', 't', '10', 'Vegetables R-Z'),
('Radishes', '5 small', '50', '10', 't', '0', '0', '0.3', '2', 'Vegetables R-Z'),
('Rutabagas', '4 cups', '100', '32', 't', '0', '0', '1.4', '8', 'Vegetables R-Z'),
('Soybeans', '1 cup', '200', '260', '22', '11', '0', '3.2', '20', 'Vegetables R-Z'),
('Spinach', '1 cup', '100', '26', '3', 't', '0', '1', '3', 'Vegetables R-Z'),
('Squash', '1 cup', '210', '35', '1', 't', '0', '0.6', '8', 'Vegetables R-Z'),
('Winter, mashed', '1 cup', '200', '95', '4', 't', '0', '2.6', '23', 'Vegetables R-Z'),
('Sweet potatoes', '1 med.', '110', '155', '2', '1', '0', '1', '36', 'Vegetables R-Z'),
('Candied', '1 med.', '175', '235', '2', '6', '5', '1.5', '80', 'Vegetables R-Z'),
('Tomatoes', '1 cup', '240', '50', '2', 't', '0', '1', '9', 'Vegetables R-Z'),
('Raw, 2 by 2 1/2', '1 med.', '150', '30', '1', 't', '0', '0.6', '6', 'Vegetables R-Z'),
('Tomato juice', '1 cup', '240', '50', '2', 't', '0', '0.6', '10', 'Vegetables R-Z'),
('Tomato catsup', '1 T.', '17', '15', 't', 't', '0', 't', '4', 'Vegetables R-Z'),
('Turnip greens', '1 cup', '145', '45', '4', '1', '0', '1.8', '8', 'Vegetables R-Z'),
('Turnips, steamed', '1 cup', '155', '40', '1', 't', '0', '1.8', '9', 'Vegetables R-Z'),
('Watercress stems, raw', '1 cup', '50', '9', '1', 't', '0', '0.3', '1', 'Fruits A-F'),
('Apple juice canned', '1 cup', '250', '125', 't', '0', '0', '0', '34', 'Fruits A-F'),
('Apple vinegar', '1/3 cup', '100', '14', 't', '0', '0', '0', '3', 'Fruits A-F'),
('Apples, raw', '1 med', '130', '70', 't', 't', '0', '1', '18', 'Fruits A-F'),
('Stewed or canned', '1 cup', '240', '100', 't', 't', '0', '2', '26', 'Fruits A-F'),
('Apricots', '1 cup', '250', '220', '2', 't', '0', '1', '57', 'Fruits A-F'),
('Dried, uncooked', '1/2 cup', '75', '220', '4', 't', '0', '1', '50', 'Fruits A-F'),
('Fresh', '3 med.', '114', '55', '1', 't', '0', '0.70', '14', 'Fruits A-F'),
('Nectar, or juice', '1 cup', '250', '140', '1', 't', '0', '2', '36', 'Fruits A-F'),
('Avocado', '1/2 large', '108', '185', '2', '18', '12', '1.80', '6', 'Fruits A-F'),
('Banana', '1 med.', '150', '85', '1', 't', '0', '0.9', '23', 'Fruits A-F'),
('Blackberries', '1 cup', '144', '85', '2', '1', '0', '6.60', '19', 'Fruits A-F'),
('Blueberries', '1 cup', '250', '245', '1', 't', '0', '2', '65', 'Fruits A-F'),
('Cantaloupe', '1/2 med.', '380', '40', '1', 't', '0', '2.20', '9', 'Fruits A-F'),
('Cherries', '1 cup', '257', '100', '2', '1', '0', '2', '26', 'Fruits A-F'),
('Fresh, raw', '1 cup', '114', '65', '1', 't', '0', '0.8', '15', 'Fruits A-F'),
('Cranberry sauce sweetened', '1 cup', '277', '530', 't', 't', '0', '1.2', '142', 'Fruits A-F'),
('Dates', '1 cup', '178', '505', '4', 't', '0', '3.6', '134', 'Fruits A-F'),
('Figs', '2', '42', '120', '2', 't', '0', '1.9', '30', 'Fruits A-F'),
('Fresh, raw figs', '3 med.', '114', '90', '2', 't', '0', '1', '22', 'Fruits A-F'),
('figs Canned with syrup ', '3', '115', '130', '1', 't', '0', '1', '32', 'Fruits A-F'),
('Fruit cocktail, canned', '1 cup', '256', '195', '1', 't', '0', '0.5', '50', 'Fruits A-F'),
('Grapefruit sections', '1 cup', '250', '170', '1', 't', '0', '0.5', '44', 'Fruits G-P'),
('Grapefruit, fresh, 5\" diameter', '1/2', '285', '50', '1', 't', 't', '1', '14', 'Fruits G-P'),
('Grapefruit juice', '1 cup', '250', '100', '1', 't', '0', '1', '24', 'Fruits G-P'),
('Grapes', '1 cup', '153', '70', '1', 't', '0', '0.8', '16', 'Fruits G-P'),
('European, as Muscat, Tokay', '1 cup', '160', '100', '1', 't', '0', '0.7', '26', 'Fruits G-P'),
('Grape juice', '1 cup', '250', '160', '1', 't', '0', 't', '42', 'Fruits G-P'),
('Lemon juice', '1/2 cup', '125', '30', 't', 't', '0', 't', '10', 'Fruits G-P'),
('Lemonade concentratefrozen', '6-oz. can', '220', '430', 't', 't', '0', 't', '112', 'Fruits G-P'),
('Limeade concentrate frozen', '6-oz. can', '218', '405', 't', 't', '0', 't', '108', 'Fruits G-P'),
('Olives large', '10', '65', '72', '1', '10', '9', '0.8', '3', 'Fruits G-P'),
('OlivesRipe', '10', '65', '105', '1', '13', '12', '1', '1', 'Fruits G-P'),
('Oranges 3\" diameter', '1 med.', '180', '60', '2', 't', 't', '1', '16', 'Fruits G-P'),
('Orange juice', '8 oz. or', '250', '112', '2', 't', '0', '0.2', '25', 'Fruits G-P'),
('Frozen ', '6-oz. can', '210', '330', '2', 't', 't', '0.4', '78', 'Fruits G-P'),
('Papaya', '1/2 med.', '200', '75', '1', 't', '0', '1.8', '18', 'Fruits G-P'),
('Peaches', '1 cup', '257', '200', '1', 't', '0', '1', '52', 'Fruits G-P'),
('Fresh, raw', '1 med.', '114', '35', '1', 't', '0', '0.6', '10', 'Fruits G-P'),
('Pears', '1 cup', '255', '195', '1', 't', '0', '2', '50', 'Fruits G-P'),
('Raw, 3 by 2V', '1 med.', '182', '100', '1', '1', '0', '2', '25', 'Fruits G-P'),
('Persimmons', '1 med.', '125', '75', '1', 't', '0', '2', '20', 'Fruits G-P'),
('Pineapple', '1 large slice', '122', '95', 't', 't', '0', '0.4', '26', 'Fruits G-P'),
('Pineapple Crushed', '1 cup', '260', '205', '1', 't', '0', '0.7', '55', 'Fruits G-P'),
('Raw, diced', '1 cup', '140', '75', '1', 't\'', '0', '0.6', '19', 'Fruits G-P'),
('Pineapple juice', '1 cup', '250', '120', '1', 't', '0', '0.2', '32', 'Fruits G-P'),
('Plums', '1 cup', '256', '185', '1', 't', '0', '0.7', '50', 'Fruits G-P'),
('Raw, 2\" diameter', '1', '60', '30', 't', 't', '0', '0.2', '7', 'Fruits G-P'),
('Prunes', '1 cup', '270', '300', '3', '1', '0', '0.8', '81', 'Fruits G-P'),
('Prune juice', '1 cup', '240', '170', '1', 't', '0', '0.7', '45', 'Fruits G-P'),
('Raisins', '1/2 cup', '88', '230', '2', 't', '0', '0.7', '82', 'Fruits R-Z'),
('Raspberries', '1/2 cup', '100', '100', 't', 't', '0', '2', '25', 'Fruits R-Z'),
('Raw, red', '3/4 cup', '100', '57', 't', 't', '0', '5', '14', 'Fruits R-Z'),
('Rhubarb sweetened', '1 cup', '270', '385', '1', 't', '0', '1.9', '98', 'Fruits R-Z'),
('Strawberries', '1 cup', '227', '242', '1', 't', '0', '1.3', '60', 'Fruits R-Z'),
('Raw', '1 cup', '149', '54', 't', 't', '0', '1.9', '12', 'Fruits R-Z'),
('Tangerines', 'I med.', '114', '40', '1', 't', '0', '1', '10', 'Fruits R-Z'),
('Watermelon', '1 wedge', '925', '120', '2', '1', '0', '3.6', '29', 'Fruits R-Z'),
('Biscuits', '1', '38', '130', '3', '4', '3', 't', '18', 'Breads, cereals, fastfood,grains'),
('Bran flakes', '1 cup', '25', '117', '3', 't', '0', '0.10', '32', 'Breads, cereals, fastfood,grains'),
('Bread, cracked wheat', '1 slice', '23', '60', '2', '1', '1', '0.10', '12', 'Breads, cereals, fastfood,grains'),
('Rye', '1 slice', '23', '55', '2', '1', '1', '0.10', '12', 'Breads, cereals, fastfood,grains'),
('White, 20 slices, or', '1-lb. loaf', '454', '1,225', '39', '15', '12', '9.00', '229', 'Breads, cereals, fastfood,grains'),
('Whole-wheat', '1-lb. loaf', '454', '1,100', '48', '14', '10', '67.50', '216', 'Breads, cereals, fastfood,grains'),
('Whole-wheat', '1 slice', '23', '55', '2', '1', '0', '0.31', '11', 'Breads, cereals, fastfood,grains'),
('Corn bread ground meal', '1 serving', '50', '100', '3', '4', '2', '0.30', '15', 'Breads, cereals, fastfood,grains'),
('Cornflakes', '1 cup', '25', '110', '2', 't', '0', '0.1', '25', 'Breads, cereals, fastfood,grains'),
('Corn grits cooked', '1 cup', '242', '120', '8', 't', '0', '0.2', '27', 'Breads, cereals, fastfood,grains'),
('Corn meal', '1 cup', '118', '360', '9', '4', '2', '1.6', '74', 'Breads, cereals, fastfood,grains'),
('Crackers', '2 med.', '14', '55', '1', '1', '0', 't', '10', 'Breads, cereals, fastfood,grains'),
('Soda, 2 1/2 square', '2', '11', '45', '1', '1', '0', 't', '8', 'Breads, cereals, fastfood,grains'),
('Farina', '1 cup', '238', '105', '3', 't', '0', '8', '22', 'Breads, cereals, fastfood,grains'),
('Flour', '1 cup', '110', '460', '39', '22', '0', '2.9', '33', 'Breads, cereals, fastfood,grains'),
('Wheat (all purpose)', '1 cup', '110', '400', '12', '1', '0', '0.3', '84', 'Breads, cereals, fastfood,grains'),
('Wheat (whole)', '1 cup', '120', '390', '13', '2', '0', '2.8', '79', 'Breads, cereals, fastfood,grains'),
('Macaroni', '1 cup', '140', '155', '5', '1', '0', '0.1', '32', 'Breads, cereals, fastfood,grains'),
('Baked with cheese', '1 cup', '220', '475', '18', '25', '24', 't', '44', 'Breads, cereals, fastfood,grains'),
('Muffins', '1', '48', '135', '4', '5', '4', 't', '19', 'Breads, cereals, fastfood,grains'),
('Noodles', '1 cup', '160', '200', '7', '2', '2', '0.1', '37', 'Breads, cereals, fastfood,grains'),
('Oatmeal', '1 cup', '236', '150', '5', '3', '2', '4.6', '26', 'Breads, cereals, fastfood,grains'),
('Pancakes 4\" diam.', '4', '108', '250', '7', '9', '0', '0.1', '28', 'Breads, cereals, fastfood,grains'),
('Wheat, pancakes 4\" diam.', '4', '108', '250', '7', '9', '0', '0.1', '28', 'Breads, cereals, fastfood,grains'),
('Pizza 14\" diam.', '1 section', '75', '180', '8', '6', '5', 't', '23', 'Breads, cereals, fastfood,grains'),
('Popcorn salted', '2 cups', '28', '152', '3', '7', '2', '0.5', '20', 'Breads, cereals, fastfood,grains'),
('Puffed rice', '1 cup', '14', '55', 't', 't', '0', 't', '12', 'Breads, cereals, fastfood,grains'),
('Puffed wheat presweetened', '1 cup', '28', '105', '1', 't', '0', '0.6', '26', 'Breads, cereals, fastfood,grains'),
('Rice', '1 cup', '208', '748', '15', '3', '0', '1.2', '154', 'Breads, cereals, fastfood,grains'),
('Converted', '1 cup', '187', '677', '14', 't', '0', '0.4', '142', 'Breads, cereals, fastfood,grains'),
('White', '1 cup', '191', '692', '14', 't', '0', '0.3', '150', 'Breads, cereals, fastfood,grains'),
('Rice flakes', '1 cup', '30', '115', '2', 't', '0', '0.1', '26', 'Breads, cereals, fastfood,grains'),
('Rice polish', '1/2 cup', '50', '132', '6', '6', '0', '1.2', '28', 'Breads, cereals, fastfood,grains'),
('Rolls', '1 large', '50', '411', '3', '12', '11', '0.1', '23', 'Breads, cereals, fastfood,grains'),
('of refined flour', '1', '38', '115', '3', '2', '2', 't', '20', 'Breads, cereals, fastfood,grains'),
('whole-wheat', '1', '40', '102', '4', '1', '0', '0.1', '20', 'Breads, cereals, fastfood,grains'),
('Spaghetti with meat sauce', '1 cup', '250', '285', '13', '10', '6', '0.50', '35', 'Breads, cereals, fastfood,grains'),
('with tomatoes and cheese', '1 cup', '250', '210', '6', '5', '3', '0.50', '36', 'Breads, cereals, fastfood,grains'),
('Spanish rice', '1 cup', '250', '217', '4', '4', '0', '1.20', '40', 'Breads, cereals, fastfood,grains'),
('Shredded wheat biscuit', '1', '28', '100', '3', '1', '0', '0.70', '23', 'Breads, cereals, fastfood,grains'),
('Waffles', '1', '75', '240', '8', '9', '1', '0.10', '30', 'Breads, cereals, fastfood,grains'),
('Wheat germ', '1 cup', '68', '245', '17', '7', '3', '2.50', '34', 'Breads, cereals, fastfood,grains'),
('Wheat-germ cereal toasted', '1 cup', '65', '260', '20', '7', '3', '2.50', '36', 'Breads, cereals, fastfood,grains'),
('Wheat meal cereal unrefined', '3/4 cup', '30', '103', '4', '1', '0', '0.70', '25', 'Breads, cereals, fastfood,grains'),
('Wheat, cooked', '3/4 cup', '200', '275', '12', '1', '0', '4.40', '35', 'Breads, cereals, fastfood,grains'),
('Bean soups', '1 cup', '250', '190', '8', '5', '4', '0.60', '30', 'Soups'),
('Beef soup', '1 cup', '250', '100', '6', '4', '4', '0.50', '11', 'Soups'),
('Bouillon', '1 cup', '240', '24', '5', '0', '0', '0', '0', 'Soups'),
('chicken soup', '1 cup', '250', '75', '4', '2', '2', '0', '10', 'Soups'),
('Clam chowder', '1 cup', '255', '85', '5', '2', '8', '0.50', '12', 'Soups'),
('Cream soups', '1 cup', '255', '200', '7', '12', '11', '1.20', '18', 'Soups'),
('Noodle', '1 cup', '250', '115', '6', '4', '3', '0.20', '13', 'Soups'),
('Split-pea soup', '1 cup', '250', '147', '8', '3', '3', '0.50', '25', 'Soups'),
('Tomato soup', '1 cup', '245', '175', '6', '7', '6', '0.50', '22', 'Soups'),
('Vegetable', '1 cup', '250', '80', '4', '2', '2', '0', '14', 'Soups'),
('Apple betty', '1 serving', '100', '150', '1', '4', '0', '0.5', '29', 'Desserts, sweets'),
('Bread pudding', '3/4 cup', '200', '374', '11', '12', '11', '0.20', '56', 'Desserts, sweets'),
('Cakes', '1 slice', '40', '110', '3', 't', '0', '0', '23', 'Desserts, sweets'),
('Chocolate fudge', '1 slice', '120', '420', '5', '14', '12', '0.3', '70', 'Desserts, sweets'),
('Cupcake', '1', '50', '160', '3', '3', '2', 't', '31', 'Desserts, sweets'),
('Fruit cake', '1 slice', '30', '105', '2', '4', '3', '0.2', '17', 'Desserts, sweets'),
('Gingerbread', '1 slice', '55', '180', '2', '7', '6', 't', '28', 'Desserts, sweets'),
('Plain, with no icing', '1 slice', '55', '180', '4', '5', '4', 't', '31', 'Desserts, sweets'),
('Sponge cake', '1 slice', '40', '115', '3', '2', '2', '0', '22', 'Desserts, sweets'),
('Candy', '5', '25', '104', 't', '3', '3', '0', '19', 'Desserts, sweets'),
('Chocolate creams', '2', '30', '130', 't', '4', '4', '0', '24', 'Desserts, sweets'),
('Fudge', '2 pieces', '90', '370', 't', '12', '11', '0.1', '80', 'Desserts, sweets'),
('Hard candies', '1 oz.', '28', '90', 't', '0', '0', '0', '28', 'Desserts, sweets'),
('Marshmallows', '5', '30', '98', '1', '0', '0', '0', '23', 'Desserts, sweets'),
('Milk chocolate', '2-oz. bar', '56', '290', '2', '6', '6', '0.2', '44', 'Desserts, sweets'),
('Chocolate syrup', '2 T.', '40', '80', 't', 't', 't', '0', '22', 'Desserts, sweets'),
('Doughnuts', '1', '33', '135', '2', '7', '4', 't', '17', 'Desserts, sweets'),
('Gelatin, made with water', '1 cup', '239', '155', '4', 't', 't', '0', '36', 'Desserts, sweets'),
('Honey', '2 T.', '42', '120', 't', '0', '0', '0', '30', 'Jams, Jellies'),
('Ice cream', '2 cups', '300', '250', '0', '0', '12', '10', '0', 'Desserts, sweets'),
('Ices', '1 cup', '150', '117', '0', '0', '0', '0', '48', 'Desserts, sweets'),
('preserves', '1 T.', '20', '55', '0', '0', '0', 't', '14', 'Jams, Jellies'),
('Jellies', '1 T.', '20', '50', '0', '0', '0', '0', '13', 'Jams, Jellies'),
('Molasses', '1 T.', '20', '45', '0', '0', '0', '8', '11', 'Jams, Jellies'),
('Cane Syrup', '1 T.', '20', '50', '0', '0', '0', '0', '13', 'Jams, Jellies'),
('9\" diam. pie', '1 slice', '135', '330', '3', '13', '11', '0.1', '53', 'Desserts, sweets'),
('Cherry Pie', '1 slice', '135', '340', '3', '13', '11', '0.1', '55', 'Desserts, sweets'),
('Custard', '1 slice', '130', '265', '7', '11', '10', '0', '34', 'Desserts, sweets'),
('Lemon meringue', '1 slice', '120', '300', '4', '12', '10', '0.1', '45', 'Desserts, sweets'),
('Mince', '1 slice', '135', '340', '3', '9', '8', '0.70', '62', 'Desserts, sweets'),
('Pumpkin Pie', '1 slice', '130', '265', '5', '12', '11', '8', '34', 'Desserts, sweets'),
('Puddings Sugar', '1 cup', '200', '770', '0', '0', '0', '0', '199', 'Desserts, sweets'),
('3 teaspoons sugar', '1 T.', '12', '50', '0', '0', '0', '0', '12', 'Desserts, sweets'),
('Brown, firm-packed, dark sugar', '1 cup', '220', '815', '0', 't', '0', '0', '210', 'Jams, Jellies'),
('Syrup', '2 T.', '40', '100', '0', '0', '0', '0', '25', 'Jams, Jellies'),
('table blends sugar', '2 T.', '40', '110', '0', '0', '0', '0', '29', 'Jams, Jellies'),
('Tapioca cream pudding', '1 cup', '250', '335', '10', '10', '9', '0', '42', 'Desserts, sweets'),
('Almonds', '1/2 cup', '70', '425', '13', '38', '28', '1.8', '13', 'Seeds and Nuts'),
('roasted and salted', '1/2 cup', '70', '439', '13', '40', '31', '1.8', '13', 'Seeds and Nuts'),
('Brazil nuts', '1/2 cup', '70', '457', '10', '47', '31', '2', '7', 'Seeds and Nuts'),
('Cashews', '1/2 cup', '70', '392', '12', '32', '28', '0.9', '20', 'Seeds and Nuts'),
('coconut sweetened', '1/2 cup', '50', '274', '1', '20', '19', '2', '26', 'Seeds and Nuts'),
('Peanut butter', '1/3 cup', '50', '300', '12', '25', '17', '0.9', '9', 'Seeds and Nuts'),
('Peanut butter, natural', '1/3 cup', '50', '284', '13', '24', '10', '0.9', '8', 'Seeds and Nuts'),
('Peanuts', '1/3 cup', '50', '290', '13', '25', '16', '1.2', '9', 'Seeds and Nuts'),
('Pecans', '1/2 cup', '52', '343', '5', '35', '25', '1.1', '7', 'Seeds and Nuts'),
('Sesame seeds', '1/2 cup', '50', '280', '9', '24', '13', '3.1', '10', 'Seeds and Nuts'),
('Sunflower seeds', '1/2 cup', '50', '280', '12', '26', '7', '1.9', '10', 'Seeds and Nuts'),
('Walnuts', '1/2 cup', '50', '325', '7', '32', '7', '1', '8', 'Seeds and Nuts'),
('Beer', '2 cups', '480', '228', 't', '0', '0', '0', '8', 'Drinks,Alcohol, Beverages'),
('Gin', '1 oz.', '28', '70', '0', '0', '0', '0', 't', 'Drinks,Alcohol, Beverages'),
('Wines', '1/2 cup', '120', '164', 't', '0', '0', '0', '9', 'Drinks,Alcohol, Beverages'),
('Table (12.2% alcohol)', '1/2 cup', '120', '100', 't', '0', '0', '0', '5', 'Drinks,Alcohol, Beverages'),
('Carbonated drinks Artificially sweetened', '12 oz.', '346', '0', '0', '0', '0', '0', '0', 'Drinks,Alcohol, Beverages'),
('Club soda', '12 oz.', '346', '0', '0', '0', '0', '0', '0', 'Drinks,Alcohol, Beverages'),
('Cola drinks', '12 oz.', '346', '137', '0', '0', '0', '0', '38', 'Drinks,Alcohol, Beverages'),
('Fruit-flavored soda', '12 oz.', '346', '161', '0', '0', '0', '0', '42', 'Drinks,Alcohol, Beverages'),
('Ginger ale', '12 oz.', '346', '105', '0', '0', '0', '0', '28', 'Drinks,Alcohol, Beverages'),
('Root beer', '12 oz.', '346', '140', '0', '0', '0', '0', '35', 'Drinks,Alcohol, Beverages'),
('Coffee', '1 cup', '230', '3', 't', '0', '0', '0', '1', 'Drinks,Alcohol, Beverages'),
('Tea', '1 cup', '230', '4', '0', 't', '0', '0', '1', 'Drinks,Alcohol, Beverages');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL,
  `store_id` int(11) DEFAULT NULL,
  `recipe_name` varchar(255) NOT NULL,
  `catagory` varchar(64) NOT NULL,
  `recipe_image` varchar(255) NOT NULL,
  `hash` varchar(64) NOT NULL,
  `recipe_ingredient_id` int(11) NOT NULL,
  `recipe_allergens_id` int(11) NOT NULL,
  `recipe_cooking_time` int(11) NOT NULL,
  `recipe_steps_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `store_id`, `recipe_name`, `catagory`, `recipe_image`, `hash`, `recipe_ingredient_id`, `recipe_allergens_id`, `recipe_cooking_time`, `recipe_steps_id`, `recipe_id`, `created_at`, `updated_at`) VALUES
(2, 1, 'Great garden Avocado toast', 'handhelds', '/user-content/recipe/6ieWqjJJhHyYHCdWtfIQLkwHmv5B1m6qQBDslKGE.jpg', 'b455a5b9ec1bc2f226456ff954dd08b9f87199061ab414a5c4', 2, 2, 2, 2, 2, '2022-03-10', '2022-03-12'),
(3, 1, 'Mikos Rose Pasta', 'pasta', '/user-content/recipe/qX0ZyrMNdmIp53R3em1ME7CQKPLVsJuAM5Xw0O0Q.jpg', '1092d7d6435387a714750b3eb6a7d726af153abbb0a2023dc8', 3, 3, 3, 3, 3, '2022-03-11', '2022-03-12');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_allergens`
--

CREATE TABLE `recipe_allergens` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `recipe_allergens` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`recipe_allergens`)),
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe_allergens`
--

INSERT INTO `recipe_allergens` (`id`, `recipe_id`, `recipe_allergens`, `created_at`, `updated_at`) VALUES
(2, 2, '{\"gluten\":false,\"dairy\":false,\"nut\":false,\"egg\":false,\"fish\":false}', '2022-03-10', '2022-03-12'),
(3, 3, '{\"gluten\":false,\"dairy\":false,\"nut\":false,\"egg\":false,\"fish\":false}', '2022-03-11', '2022-03-12');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_cooking_time`
--

CREATE TABLE `recipe_cooking_time` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `recipe_cooking_time` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`recipe_cooking_time`)),
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe_cooking_time`
--

INSERT INTO `recipe_cooking_time` (`id`, `recipe_id`, `recipe_cooking_time`, `created_at`, `updated_at`) VALUES
(2, 2, '{\"cookTime\":\"2\",\"prepTime\":\"12\"}', '2022-03-10', '2022-03-10'),
(3, 3, '{\"cookTime\":\"11\",\"prepTime\":\"12\"}', '2022-03-11', '2022-03-11');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_flavor_profile`
--

CREATE TABLE `recipe_flavor_profile` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `recipe_flavor_profile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`recipe_flavor_profile`)),
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe_flavor_profile`
--

INSERT INTO `recipe_flavor_profile` (`id`, `recipe_id`, `recipe_flavor_profile`, `created_at`, `updated_at`) VALUES
(1, 1, '{\"sweet\":false,\"spicy\":false}', '2022-02-16', '2022-02-28'),
(2, 2, '{\"sweet\":false,\"spicy\":false}', '2022-03-10', '2022-03-12'),
(3, 3, '{\"sweet\":false,\"spicy\":false}', '2022-03-11', '2022-03-12');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_ingredents`
--

CREATE TABLE `recipe_ingredents` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `recipe_ingredients` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`recipe_ingredients`)),
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe_ingredents`
--

INSERT INTO `recipe_ingredents` (`id`, `recipe_id`, `recipe_ingredients`, `created_at`, `updated_at`) VALUES
(1, 1, '[\"2 oz of avocado\",\"1 egg\",\"1 pinch of spinach\",\"chili flakes\",\"bogus\",\"1 slice of white bread\"]', '2022-02-16', '2022-02-23'),
(2, 2, '[\"add\"]', '2022-03-10', '2022-03-12'),
(3, 3, '[\"pasta\",\"tomto sauce heavy cream\"]', '2022-03-11', '2022-03-11');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_nutritional_facts`
--

CREATE TABLE `recipe_nutritional_facts` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `recipe_nutritional_facts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`recipe_nutritional_facts`)),
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe_nutritional_facts`
--

INSERT INTO `recipe_nutritional_facts` (`id`, `recipe_id`, `recipe_nutritional_facts`, `created_at`, `updated_at`) VALUES
(1, 1, '{\"recipeSummary\":{\"recipe_name\":null,\"catagory\":null},\"recipeAllergies\":{\"gluten\":false,\"dairy\":false,\"nut\":false,\"egg\":false,\"fish\":false},\"recipeFlavourProfile\":{\"sweet\":false,\"spicy\":false}}', '2022-02-16', '2022-02-28'),
(2, 2, '{\"servingSize\":\"500\",\"calories\":\"3\",\"totalFat\":\"4\",\"totalFatPercentage\":\"4\",\"saturatedFat\":\"4\",\"saturatedFatPercentage\":\"4\",\"transFat\":\"4\",\"transFatPercentage\":\"4\",\"cholesterol\":\"4\",\"cholesterolPercentage\":\"4\",\"sodium\":\"3\",\"sodiumPercentage\":\"4\",\"potassium\":\"4\",\"potassiumPercentage\":\"4\",\"totalCarb\":\"4\",\"totalCarbPercentage\":\"4\",\"fiber\":\"4\",\"fiberPercentage\":\"4\",\"sugar\":\"4\",\"sugarPercentage\":\"4\",\"protein\":\"4\",\"proteinPercentage\":\"4\"}', '2022-03-10', '2022-03-12'),
(3, 3, '{\"servingSize\":\"1\",\"calories\":\"600\",\"totalFat\":\"5\",\"totalFatPercentage\":\"5\",\"saturatedFat\":\"5\",\"saturatedFatPercentage\":\"5\",\"transFat\":\"5\",\"transFatPercentage\":\"5\",\"cholesterol\":\"5\",\"cholesterolPercentage\":\"5\",\"sodium\":\"5\",\"sodiumPercentage\":\"5\",\"potassium\":\"5\",\"potassiumPercentage\":\"5\",\"totalCarb\":\"5\",\"totalCarbPercentage\":\"5\",\"fiber\":\"5\",\"fiberPercentage\":\"5\",\"sugar\":\"5\",\"sugarPercentage\":\"5\",\"protein\":\"5\",\"proteinPercentage\":\"5\"}', '2022-03-11', '2022-03-11');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_steps`
--

CREATE TABLE `recipe_steps` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `recipe_steps` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`recipe_steps`)),
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe_steps`
--

INSERT INTO `recipe_steps` (`id`, `recipe_id`, `recipe_steps`, `created_at`, `updated_at`) VALUES
(1, 1, '[\"2 oz of avocado\",\"1 egg\",\"1 pinch of spinach\",\"chili flakes\",\"bogus\",\"1 slice of white bread\"]', '2022-02-16', '2022-02-24'),
(2, 2, '[\"add\"]', '2022-03-10', '2022-03-12'),
(3, 3, '[\"pasta\",\"cream sauce\",\"tomato  sauce\",\"cheese\",\"salt and pepper\",\"white wine\"]', '2022-03-11', '2022-03-12');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sessionID` bigint(20) UNSIGNED NOT NULL,
  `user_ID` int(10) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `signature` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_expiry` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `storeID` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signature_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`storeID`, `name`, `email`, `signature_token`) VALUES
(1, 'Oliver\'s Cafe', 'SOMETHING@GMAIL.COM', 'IOSDNDJKHMDS');

-- --------------------------------------------------------

--
-- Table structure for table `store_members`
--

CREATE TABLE `store_members` (
  `store_memberID` bigint(20) UNSIGNED NOT NULL,
  `storeID` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userID` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `store_members`
--

INSERT INTO `store_members` (`store_memberID`, `storeID`, `userID`, `store_role`, `created_at`, `updated_at`) VALUES
(1, '1', '2', 'admin', NULL, NULL),
(2, '1', '3', 'admin', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `store_menu`
--

CREATE TABLE `store_menu` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `store_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store_menu`
--

INSERT INTO `store_menu` (`id`, `name`, `store_id`, `created_at`, `updated_at`, `active`) VALUES
(9, 'something', 1, '2022-03-12 13:20:53', '2022-03-12 13:20:53', 1),
(11, 'farmhouse', 1, '2022-03-12 14:56:46', '2022-03-12 14:56:46', 1),
(12, 'lunch menu', 1, '2022-03-14 08:24:24', '2022-03-14 08:24:24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `store_menu_item`
--

CREATE TABLE `store_menu_item` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `store_menu_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `catagory` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store_menu_item`
--

INSERT INTO `store_menu_item` (`id`, `store_menu_id`, `name`, `catagory`, `price`, `created_at`, `updated_at`, `active`) VALUES
(8, 11, 'farmhouse burger', 'burger', 22.9, '2022-03-12 14:57:51', '2022-03-14 04:02:38', 1),
(9, 11, 'fiesta burger', 'burger', 10.49, '2022-03-12 14:58:22', '2022-03-12 14:58:22', 1),
(10, 11, 'swiss mushroom burger', 'burger', 10.49, '2022-03-12 14:58:51', '2022-03-12 14:58:51', 1),
(11, 11, 'chicken fried steak', 'mains', 13, '2022-03-12 14:59:37', '2022-04-07 08:17:06', 1),
(12, 11, 'south west chicken salad', 'salad', 10, '2022-03-12 15:05:15', '2022-03-12 15:05:15', 1),
(13, 11, 'blt', 'sandwich', 10, '2022-03-12 15:08:57', '2022-03-12 15:08:57', 1),
(15, 12, 'tacos', 'sliders', 5, '2022-03-14 08:25:28', '2022-03-14 08:25:28', 1);

-- --------------------------------------------------------

--
-- Table structure for table `store_menu_item_catagory`
--

CREATE TABLE `store_menu_item_catagory` (
  `menu_item_category_id` int(11) NOT NULL,
  `menu_item_category` varchar(255) NOT NULL,
  `menu_item_category_create_at` date NOT NULL,
  `menu_item_category_update_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `store_recipes`
--

CREATE TABLE `store_recipes` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `token` varchar(65) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store_recipes`
--

INSERT INTO `store_recipes` (`id`, `store_id`, `token`, `created_at`, `updated_at`) VALUES
(1, 1, '501836ca0de87ced6de7a28bca7db1e726398b9ee195b3174c', '2022-02-16 17:57:09', '2022-02-16 17:57:09'),
(2, 1, 'd816c64f2f3b76008786cd3238555bf99cc0aea26ecc0cebfd', '2022-03-11 04:03:18', '2022-03-11 04:03:18'),
(3, 1, '36312a5e1851dbea0ff5d4029e651d25b5db9cc5b460f29c56', '2022-03-11 06:32:36', '2022-03-11 06:32:36');

-- --------------------------------------------------------

--
-- Table structure for table `store_schedule`
--

CREATE TABLE `store_schedule` (
  `id` int(11) NOT NULL,
  `storeID` int(11) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `week` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store_schedule`
--

INSERT INTO `store_schedule` (`id`, `storeID`, `year`, `week`) VALUES
(1, 1, 2022, 1),
(2, 1, 2022, 2),
(8, 1, 2022, 12),
(9, 1, 2022, 10),
(10, 1, 2022, 13),
(11, 1, 2022, 15);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salt` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `digital_access_tokens` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `name`, `email`, `password`, `salt`, `remember_token`, `digital_access_tokens`, `created_at`, `updated_at`, `status`) VALUES
(1, 'something', 'oliver@gmail.com', 'da023dfa01b26ade23ed8fcd27c2fecbe43ff3d8dc9ac40030986c707caf458d', '46084c09f03420522751b4d953bf88fb425face641159defd85cc4c8d3f63e51', 'd7d400680c79d0b67fead9cee73bb6f38ff5632bf71d0cc1032b47c9e3a3f86f', '49da283617d82862a18f6b271dcde3eb68aa7d1ba577b961b747fe2516004b58', '2021-12-27 09:30:53', '2021-12-27 09:30:53', 1),
(2, 'somethng', 'example@example.com', '790293b1c96385b31077f4ae323e2643ca36fdd0da5cd8ceb8ac2a02373814bb', '9f14ea27fc231e0eb1ac364cb85985dab845f7476e272c1ad804220eec04228b', '73bdeeb64fc059fee5858c28851bd57d79113ef03dac7a290222c37779738515', 'f8746e868bf945a390b26d77fb74289786acb818ac401acfc179ddbeb2fb9fcf', '2021-12-27 16:35:22', '2021-12-27 16:35:22', 1),
(3, 'something', 'oliver.shwaba@gmail.com', '77b7f19a8aaef92f6c53b6f39abe92e761dd71113548c57780016d91e3e28d0d', '9957ba8df07cc7272d57b0ad5beeaf663f72dc4bb2a424bca51bde4159a9a242', 'f4d62d8422201ef3ec6844994aacd2aa5b8f1cecd89ccf53fd9757d6011100e9', '9f5df7a8cf2fb7fc93e03815cfd9ddd2aace08cee39b25b87411ac26c461c65b', '2022-01-03 12:31:49', '2022-01-03 12:31:49', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_groups`
--

CREATE TABLE `user_groups` (
  `groupID` bigint(20) UNSIGNED NOT NULL,
  `storeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_groups`
--

INSERT INTO `user_groups` (`groupID`, `storeID`) VALUES
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_group_member`
--

CREATE TABLE `user_group_member` (
  `group_member_id` bigint(20) UNSIGNED NOT NULL,
  `groupID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `storeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_group_member`
--

INSERT INTO `user_group_member` (`group_member_id`, `groupID`, `userID`, `storeID`) VALUES
(10, 5, 3, 1),
(11, 5, 1, 1),
(12, 6, 3, 1),
(13, 6, 5, 1),
(14, 7, 3, 1),
(15, 7, 6, 1),
(16, 8, 3, 1),
(17, 8, 2, 1),
(18, 9, 3, 1),
(19, 9, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_messages`
--

CREATE TABLE `user_messages` (
  `message_id` bigint(20) UNSIGNED NOT NULL,
  `storeID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `groupID` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `read` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_messages`
--

INSERT INTO `user_messages` (`message_id`, `storeID`, `userID`, `groupID`, `message`, `time`, `read`) VALUES
(13, 1, 1, 5, 'test message john', NULL, 0),
(14, 1, 2, 5, 'something', NULL, 0),
(15, 1, 2, 5, 'hi am john doe', NULL, 0),
(16, 1, 3, 5, 'and i am heather smith', NULL, 0),
(17, 1, 3, 5, 'test message from heather boy', NULL, 0),
(18, 1, 3, 5, 'somethign here', NULL, 0),
(19, 1, 3, 5, 'somethign here', NULL, 0),
(20, 1, 3, 5, 'somethign here', NULL, 0),
(21, 1, 3, 5, 'somethign here', NULL, 0),
(22, 1, 3, 5, 'somethign here', NULL, 0),
(23, 1, 3, 5, 'helllo im oliver', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `profile_id` bigint(20) UNSIGNED NOT NULL,
  `storeID` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userID` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`profile_id`, `storeID`, `userID`, `name`, `role`, `img`, `created_at`, `updated_at`) VALUES
(1, '1', '1', 'JOHN DOE', 'manager', '/img/SVG/male_user.svg', NULL, NULL),
(2, '1', '4', 'Jane Doe', 'Dishwasher', '/img/SVG/male_user.svg', NULL, NULL),
(3, '1', '3', 'Heather Smith', 'manager', '/img/SVG/female_user.svg', NULL, NULL),
(5, '1', '2', 'Adam Smith', 'Cook', '/img/SVG/male_user.svg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_registration_log`
--

CREATE TABLE `user_registration_log` (
  `log_number` bigint(20) UNSIGNED NOT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_registration_log`
--

INSERT INTO `user_registration_log` (`log_number`, `user_agent`, `ip_address`, `created_at`, `updated_at`) VALUES
(1, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36', '127.0.0.1', '2021-12-27 09:30:53', '2021-12-27 09:30:53'),
(2, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36', '127.0.0.1', '2021-12-27 16:35:22', '2021-12-27 16:35:22'),
(3, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36', '127.0.0.1', '2022-01-03 12:31:49', '2022-01-03 12:31:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_drop_shifts`
--
ALTER TABLE `employee_drop_shifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_pickup_shift`
--
ALTER TABLE `employee_pickup_shift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_schedule_availability`
--
ALTER TABLE `employee_schedule_availability`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_schedule_punch_in`
--
ALTER TABLE `employee_schedule_punch_in`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_schedule_punch_out`
--
ALTER TABLE `employee_schedule_punch_out`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_shift`
--
ALTER TABLE `employee_shift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_requests`
--
ALTER TABLE `login_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs_recipe_file_logs`
--
ALTER TABLE `logs_recipe_file_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe_allergens`
--
ALTER TABLE `recipe_allergens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe_cooking_time`
--
ALTER TABLE `recipe_cooking_time`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe_flavor_profile`
--
ALTER TABLE `recipe_flavor_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe_ingredents`
--
ALTER TABLE `recipe_ingredents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe_nutritional_facts`
--
ALTER TABLE `recipe_nutritional_facts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sessionID`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`storeID`),
  ADD UNIQUE KEY `store_email_unique` (`email`),
  ADD UNIQUE KEY `store_signature_token_unique` (`signature_token`);

--
-- Indexes for table `store_members`
--
ALTER TABLE `store_members`
  ADD PRIMARY KEY (`store_memberID`);

--
-- Indexes for table `store_menu`
--
ALTER TABLE `store_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_menu_item`
--
ALTER TABLE `store_menu_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_menu_item_catagory`
--
ALTER TABLE `store_menu_item_catagory`
  ADD PRIMARY KEY (`menu_item_category_id`);

--
-- Indexes for table `store_recipes`
--
ALTER TABLE `store_recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_schedule`
--
ALTER TABLE `store_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_groups`
--
ALTER TABLE `user_groups`
  ADD PRIMARY KEY (`groupID`);

--
-- Indexes for table `user_group_member`
--
ALTER TABLE `user_group_member`
  ADD PRIMARY KEY (`group_member_id`);

--
-- Indexes for table `user_messages`
--
ALTER TABLE `user_messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`profile_id`);

--
-- Indexes for table `user_registration_log`
--
ALTER TABLE `user_registration_log`
  ADD PRIMARY KEY (`log_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee_drop_shifts`
--
ALTER TABLE `employee_drop_shifts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `employee_pickup_shift`
--
ALTER TABLE `employee_pickup_shift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `employee_schedule_availability`
--
ALTER TABLE `employee_schedule_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employee_schedule_punch_in`
--
ALTER TABLE `employee_schedule_punch_in`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee_schedule_punch_out`
--
ALTER TABLE `employee_schedule_punch_out`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee_shift`
--
ALTER TABLE `employee_shift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `login_requests`
--
ALTER TABLE `login_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logs_recipe_file_logs`
--
ALTER TABLE `logs_recipe_file_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `recipe_allergens`
--
ALTER TABLE `recipe_allergens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `recipe_cooking_time`
--
ALTER TABLE `recipe_cooking_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `recipe_flavor_profile`
--
ALTER TABLE `recipe_flavor_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `recipe_ingredents`
--
ALTER TABLE `recipe_ingredents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `recipe_nutritional_facts`
--
ALTER TABLE `recipe_nutritional_facts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `sessionID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `storeID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `store_members`
--
ALTER TABLE `store_members`
  MODIFY `store_memberID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `store_menu`
--
ALTER TABLE `store_menu`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `store_menu_item`
--
ALTER TABLE `store_menu_item`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `store_menu_item_catagory`
--
ALTER TABLE `store_menu_item_catagory`
  MODIFY `menu_item_category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `store_recipes`
--
ALTER TABLE `store_recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `store_schedule`
--
ALTER TABLE `store_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_groups`
--
ALTER TABLE `user_groups`
  MODIFY `groupID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_group_member`
--
ALTER TABLE `user_group_member`
  MODIFY `group_member_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_messages`
--
ALTER TABLE `user_messages`
  MODIFY `message_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `profile_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_registration_log`
--
ALTER TABLE `user_registration_log`
  MODIFY `log_number` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
