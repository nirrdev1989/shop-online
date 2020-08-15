-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2020 at 03:12 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` int(10) NOT NULL,
  `holder_user_id` int(10) NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cart_id`, `holder_user_id`, `date_created`) VALUES
(1, 12345, '2020-07-22'),
(2, 123456, '2020-07-09'),
(3, 12345567, '2020-06-13'),
(4, 35345634, '2020-06-14'),
(5, 12345543, '2020-06-20'),
(6, 122234545, '2020-06-21'),
(7, 4233456, '2020-06-21'),
(8, 1234534, '2020-06-22'),
(9, 2134356, '2020-06-22'),
(10, 34123, '2020-06-22'),
(11, 11111, '2020-06-22'),
(12, 111, '2020-06-24'),
(13, 777777, '2020-06-25'),
(14, 41232543, '2020-06-28'),
(15, 1234, '2020-06-29'),
(16, 21323521, '2020-06-29'),
(17, 12345234, '2020-06-29'),
(18, 12345678, '2020-06-29'),
(19, 102030, '2020-07-01'),
(20, 111222, '2020-07-03'),
(21, 1234567899, '2020-07-06'),
(22, 123456789, '2020-07-06'),
(23, 999999999, '2020-07-07'),
(24, 11223387, '2020-07-08'),
(25, 2147483647, '2020-07-08'),
(26, 444445555, '2020-07-08'),
(27, 98767523, '2020-07-09'),
(28, 423213453, '2020-07-10'),
(29, 121212, '0000-00-00'),
(30, 123123, '2020-07-11'),
(31, 123123344, '2020-07-22');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(10) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(4, 'Cereals'),
(1, 'Fruits'),
(3, 'Nuts'),
(2, 'Vege');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(10) NOT NULL,
  `city_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `city_name`) VALUES
(1, 'Jerusalem'),
(2, 'Tel-aviv'),
(3, 'Dimona'),
(4, 'Haifa'),
(5, 'Ako'),
(6, 'Bear-sheva'),
(7, 'Ashdod'),
(8, 'Afula'),
(9, 'Eilat'),
(10, 'Tzfat');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `cart_id` int(10) NOT NULL,
  `total_price` int(250) NOT NULL,
  `city_to_send` varchar(250) NOT NULL,
  `street_to_send` varchar(250) NOT NULL,
  `date_to_send` date NOT NULL,
  `current_date_order_apply` date NOT NULL DEFAULT current_timestamp(),
  `credit_card_4_last_numbers` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `cart_id`, `total_price`, `city_to_send`, `street_to_send`, `date_to_send`, `current_date_order_apply`, `credit_card_4_last_numbers`) VALUES
(1, 12345, 1, 26, 'Tel-aviv', 'AAA', '2020-07-06', '2020-07-06', 3333),
(2, 12345, 1, 14, 'Tel-aviv', 'AAA', '2020-07-06', '2020-07-06', 3333),
(3, 12345, 1, 26, 'Tel-aviv', 'AAA', '2020-07-06', '2020-07-06', 3333),
(4, 12345, 1, 65, 'Tel-aviv', 'AAA', '2020-07-06', '2020-07-06', 3333),
(5, 12345, 1, 14, 'Tel-aviv', 'AAA', '2020-07-06', '2020-07-06', 3333),
(6, 123456789, 22, 23, 'Jerusalem', 'mishmar hagvul 5/5', '2020-07-15', '2020-07-06', 3333),
(7, 12345, 1, 72, 'Tel-aviv', 'AAA', '2020-07-07', '2020-07-07', 3333),
(8, 999999999, 23, 14, 'Jerusalem', 'QQQQQQQQQ', '2020-07-07', '2020-07-07', 1111),
(9, 12345, 1, 30, 'Tel-aviv', 'AAA', '2020-07-09', '2020-07-09', 3333),
(10, 123456, 2, 14, 'Haifa', 'QQQ', '2020-07-23', '2020-07-09', 4444),
(11, 123456, 2, 16, 'Haifa', 'QQQ', '2020-07-22', '2020-07-09', 4444),
(12, 12345, 1, 48, 'Tel-aviv', 'AAA', '2020-07-09', '2020-07-09', 4444),
(13, 12345, 1, 14, 'Tel-aviv', 'AAA', '2020-07-09', '2020-07-09', 3333),
(14, 98767523, 27, 14, 'Jerusalem', 'RRR', '2020-07-09', '2020-07-09', 1232),
(15, 12345, 1, 16, 'Tel-aviv', 'AAA', '2020-07-09', '2020-07-09', 2132),
(16, 12345, 1, 38, 'Tel-aviv', 'AAA', '2020-07-09', '2020-07-09', 3333),
(17, 12345, 1, 16, 'Tel-aviv', 'AAA', '2020-07-09', '2020-07-09', 3333),
(18, 12345, 1, 20, 'Tel-aviv', 'AAA', '2020-07-09', '2020-07-09', 2432),
(19, 121212, 29, 5, 'halas', 'ahi', '1989-03-23', '2020-07-11', 9876),
(20, 123123, 30, 7, 'j', 'k', '1989-03-23', '2020-07-11', 1234),
(21, 12345, 1, 31, 'Tel-aviv', 'AAA', '2020-07-13', '2020-07-13', 4444),
(22, 12345, 1, 3, 'Tel-aviv', 'AAA', '2020-07-13', '2020-07-13', 4444),
(23, 12345, 1, 21, 'Tel-aviv', 'AAA', '2020-07-13', '2020-07-13', 5555),
(24, 12345, 1, 10, 'Tel-aviv', 'AAA', '2020-07-20', '2020-07-20', 1111),
(25, 12345, 1, 8, 'Tel-aviv', 'AAA', '2020-07-20', '2020-07-20', 5345),
(26, 12345, 1, 5, 'Tel-aviv', 'AAA', '2020-07-21', '2020-07-21', 3432),
(27, 12345, 1, 9, 'Tel-aviv', 'AAA', '2020-07-22', '2020-07-22', 2321),
(28, 123123344, 31, 47, 'Tel-aviv', 'GDF', '2020-07-22', '2020-07-22', 5466);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(10) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `category_id` int(10) NOT NULL,
  `price` int(200) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `category_id`, `price`, `image`) VALUES
(1, 'Mango', 1, 5, 'https://www.agogo.co.il/wp-content/uploads/2018/06/%D7%9E%D7%A0%D7%92%D7%95-442x249.jpg'),
(2, 'Watermelon', 1, 9, 'https://st1.foodsd.co.il/Images/Products/large/8COkNqdVmJ.jpg'),
(3, 'Cherry', 1, 4, 'https://static.wixstatic.com/media/1ab18e_0405f572c67f4e849fce815caa6823b1~mv2.jpg/v1/fill/w_435,h_435,al_c,lg_1,q_85/1ab18e_0405f572c67f4e849fce815caa6823b1~mv2.webp'),
(4, 'Orange', 1, 3, 'https://www.birkat-hashem.co.il/wp-content/uploads/shutterstock_342874121.jpg'),
(5, 'Tomato', 2, 2, 'https://konimboimages.s3.amazonaws.com/system/photos/3126360/large/987c9052bac781d511ae26f6bf2a8f08.jpg'),
(6, 'Hatzil', 2, 5, 'https://www.chef-lavan.co.il/uploads/images/788c7daf53be04da2555a53b3caa1131.jpg'),
(7, 'Chabbage', 2, 6, 'https://d3m9l0v76dty0.cloudfront.net/system/photos/3809880/large/2953ed980b9a93adb43e66dd7f250c67.jpg'),
(8, 'Onion', 2, 2, 'https://st1.foodsd.co.il/Images/Products/large/pOaUD3Lp0m.jpg'),
(9, 'Agrica', 4, 7, 'http://localhost:4567/images/1594388872644.AgRICA.jpg'),
(10, 'Rice', 4, 6, 'http://localhost:4567/images/1593592355163.Rice.jpg'),
(11, 'Been-red', 4, 5, 'http://localhost:4567/images/1593716288703.been-red.jpg'),
(12, 'Pea', 4, 5, 'https://st1.foodsd.co.il/Images/Products/large/dtB9K9KRfP.jpg'),
(13, 'Walnuts', 3, 4, 'https://yoviral.net/wp-content/uploads/thumbs/-%D7%9E%D7%9C%D7%9A-39b4u3lrwiodx2u89604cg.jpg'),
(14, 'Tonsils', 3, 8, 'https://www.infomed.co.il/_resources/articles/15210c56-0591-47b5-a6e4-20a4a8ec4bb8.jpg'),
(15, 'Hazelnuts', 3, 7, 'https://d3m9l0v76dty0.cloudfront.net/system/photos/2316017/large/5f7225b4e07d5c50f069f07f6168f9d9.jpg'),
(16, 'Peanuts', 3, 5, 'https://www.teva-shuk.co.il/wp-content/uploads/2017/02/peanuts.jpg'),
(17, 'Banana', 1, 3, 'https://images-na.ssl-images-amazon.com/images/I/61fZ%2BYAYGaL._SX425_.jpg'),
(18, 'Strawberry', 1, 12, 'https://www.greensmoking.co.il/image/catalog/eliquid/greensmoking/------strawberry.jpg'),
(19, 'Appale-red', 1, 3, 'https://hookahlicious.co.il/wp-content/uploads/2020/03/apple-hermon.jpg'),
(20, 'Apple-green', 1, 2, 'https://www.ivegan.in/wp-content/uploads/2018/11/APPLE-GREEN.jpg'),
(21, 'Pitruzilia', 2, 1, 'https://www.agogo.co.il/wp-content/uploads/2013/06/%D7%A4%D7%98%D7%A8%D7%95%D7%96%D7%99%D7%9C%D7%99%D7%94-442x249.jpg'),
(22, 'Shamir', 2, 2, 'https://konimboimages.s3.amazonaws.com/system/photos/3126455/large/e4c7340074b4a53385e2d3f18ee438da.jpg'),
(23, 'Potato', 2, 3, 'https://d3m9l0v76dty0.cloudfront.net/system/photos/1140715/large/856fe63478fe30e147c13ddde1e916cc.jpg'),
(24, 'Brokoli', 2, 2, 'https://batevasheli.co.il/wp-content/uploads/2018/06/%D7%91%D7%A8%D7%95%D7%A7%D7%95%D7%9C%D7%99-2-500x500.jpg'),
(25, 'Coconut', 1, 12, 'https://www.hon.co.il/wp-content/uploads/2012/03/%D7%A7%D7%95%D7%A7%D7%95%D7%A1.jpg'),
(26, 'Lemon', 1, 2, 'http://localhost:4567/images/1593518089209.lemon.jpg'),
(27, 'Pine-apple', 1, 13, 'http://localhost:4567/images/1593523862081.pine_apple.jpg'),
(28, 'Squash', 2, 7, 'http://localhost:4567/images/1593594167336.KISHU.jpg'),
(29, 'Chilli-red', 2, 2, 'http://localhost:4567/images/1593595505533.chilli.jpg'),
(30, 'Chilli-green', 2, 3, 'http://localhost:4567/images/1593595606046.chilli-green.jpg'),
(31, 'Luz', 3, 4, 'http://localhost:4567/images/1593597166634.luz.jpg'),
(32, 'Quqer', 4, 3, 'http://localhost:4567/images/1593597006376.quqer.jpg'),
(33, 'Been-green', 2, 5, 'http://localhost:4567/images/1593716405320.green-bean.png'),
(34, 'Carrot', 2, 2, 'http://localhost:4567/images/1594067792501.CARROT.jpg'),
(35, 'Kiwi', 1, 4, 'http://localhost:4567/images/1595419431313.Kiwi.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `products_of_cart`
--

CREATE TABLE `products_of_cart` (
  `product_cart_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `count` int(100) NOT NULL,
  `price` int(250) NOT NULL,
  `cart_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products_of_cart`
--

INSERT INTO `products_of_cart` (`product_cart_id`, `product_id`, `count`, `price`, `cart_id`) VALUES
(291, 10, 4, 8, 3),
(293, 12, 1, 3, 3),
(294, 11, 12, 60, 3),
(346, 16, 1, 5, 11),
(347, 15, 1, 7, 11),
(348, 15, 1, 7, 11),
(349, 15, 5, 35, 11),
(350, 15, 6, 42, 11),
(665, 13, 3, 36, 15),
(678, 18, 145, 1450, 18),
(679, 11, 12, 180, 18),
(828, 29, 1, 2, 20),
(829, 10, 1, 2, 20),
(833, 9, 5, 10, 21),
(871, 10, 1, 2, 22),
(875, 24, 1, 17, 22),
(876, 7, 1, 12, 22),
(949, 8, 6, 12, 29),
(950, 24, 5, 10, 29),
(951, 6, 5, 15, 29),
(961, 32, 6, 18, 30);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(9) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `city` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `role` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `city`, `street`, `name`, `lastname`, `role`) VALUES
(111, 'ooo@gmail.com', '$2a$10$t.U03jpYBHYuXYvBZHCdceirMNn7KAN3ij8PYDM./t8AoMoirs6Wm', 'Haifa', 'sameh', 'rocky', 'bil', 0),
(1234, 'tamar2a2@gmail.com', '$2a$10$rH.QBmlLW5WPEgt1SErPd.d.458lx.oM.ceEdD0pBWZFnHMt6fLp2', 'Jerusalem', 'haim yahil', 'Tamar', 'Asher', 0),
(11111, 'iii@iii.com', '$2a$10$j/xrNr5vPCpHMkdDE7tt4OunlZOg/TAB1wJoMDXcYbpsq6zPg97l2', 'Jerusalem', 'a', 'n', 'n', 0),
(12345, 'a@gmail.com', '$2a$10$ZSh9Tynu7Pmt7l4Lc/TfDODtE2XDnOjZ5ZUIwO3J3iVJENW..1HSe', 'Tel-aviv', 'AAA', 'NU', 'MA', 0),
(34123, 'niDFDFDFDFDrkuba19999@gmail.com', '$2a$10$cqWHJAkKQJEtB2tIz3MsAeqrkL76Ng3GAUt04xXsGBz/4WzV.wjrC', 'Tel-aviv', 'FSD', 'FSD', 'FSDF', 0),
(102030, 'o@gmail.com', '$2a$10$pu/F8pVgZEEMttZ7z3YCA.cHO2hHvQTk3VR1PirNuVgP0InvfXEIG', 'Ashdod', 'rechov', 'david', 'azulay', 0),
(111222, 'mmmm@mmmm.com', '$2a$10$m9wpJaW6EqYu0G3mAOWaLeG55xANyBaG4z7Vy44P1kn0.DgiMcCq.', 'Jerusalem', 'aaa', 'll', 'll', 0),
(121212, 'jjj@jjj.com', '$2a$10$xyZDG9M/qLGXUDRTMQF4Be1Q3Avf8uA536iZs6IjtK5XvhaaxyV5C', 'Haifa', 'm', 'm', 'm', 0),
(123123, 'lll@lll.com', '$2a$10$wJXVQF36qBZ2qD62Nki54Ov4s4kC.JNG8C.uy86oJbn/l0l9T2nxa', 'Jerusalem', 'k', 'k', 'k', 0),
(123456, 'nirkuba19999@gmail.com', '$2a$10$EfiKIRrDD7orXQ7FVnup.eCJX0Yz9YmMp9gIiFzpg4NF/hv5QtIT2', 'Haifa', 'QQQ', 'EEE', 'RRRR', 0),
(777777, 'niSSSsssssssssrkuba19999@gmail.com', '$2a$10$IUqNVJPvRBXdZrA5erhWZOlycRImNzumnhiwAxjbHIkeeRmFFTmJm', 'Jerusalem', 'fsd', 'gdf', 'gdf', 0),
(1234534, 'f@gmail.com', '$2a$10$b2gc4MdrH3SfmboKdjbfCuVyribtf59K7oFgSXXqyPGvsxXtjT58i', 'Dimona', 'GDF', 'GDF', 'GDFG', 0),
(2134356, 'nirkubaFDFDFDFD19999@gmail.com', '$2a$10$LIV7M/zjjTaKAhYst2AGIeAG.OHkmf8okjw0fDcBDJXwkc0ERh5a6', 'Tel-aviv', 'DAS', 'FSDFSD', 'FSDFSDF', 0),
(4233456, 'nirkfdscccccccccuba19999@gmail.com', '$2a$10$MpPQbYapro8aHZRv7fk.s.z.0B2ykZJlVdXo2gobhA2McYuvTweLu', 'Tel-aviv', 'GDF', 'GDFG', 'GDFGDFG', 0),
(11223387, 'aaaanirkuba19999@gmail.com', '$2a$10$H.tMht.u.TmDOqy8ufsRAuEGKF9cv0lSn7JoIIpeIHDh51pSn1T..', 'Jerusalem', 'QQ', 'WW', 'EE', 0),
(12345234, 'nirkdsdsdsduba19999@gmail.com', '$2a$10$hr/HUtrfgcP4HEQhvL4RkuRFHWpFLjbsNEearBpaZ2UzKCocwPpgm', 'Jerusalem', 'FSDAF', 'FSD', 'FSDF', 0),
(12345543, 'nirk19999@gmail.com', '$2a$10$dFN56JjgI1F5dCs9MV5U4eEL65quDd6qnKteKt5tsr7oNcibS3uXO', 'Dimona', 'FSD', 'FSD', 'FSD', 0),
(12345567, 'nirkubddda19999@gmail.com', '$2a$10$gZe3UGPacwXpolmhgP3/x.0j0V/0oN3iQUcwyd/q9Tj/S9BmiV4yS', 'Tel-aviv', 'qqq', 'eee', 'rrrr', 0),
(12345678, 'bbb@bbb.com', '$2a$10$4DR0eoCDK4o6nEQbxNDnSebGUAvlW3YteX0jk8agV/Daq94VY6gOS', 'Jerusalem', 'Zeev sherf', 'mm', 'mm', 0),
(21323521, 'nirkdsaduba19999@gmail.com', '$2a$10$ffTOqSpoe13UrBDIqmDNXecXmDMsTcvOJKplRwmz7GulYAmE2LZwu', 'Tel-aviv', 'RE', 'RWE', 'RWE', 0),
(35345634, 'nirkwsdsdsdwwwwwwwwwwwwwuba19999@gmail.com', '$2a$10$A0Ly.wmRccb8DCAMIACN0uyQuxDx05djsBcbJlfM4b4nArMEBGyA2', 'Dimona', 'FGFD', 'GDFG', 'GFDGFDG', 0),
(41232543, 'nirkssssdduba19999@gmail.com', '$2a$10$8BzWYfHUNLOHzg.pf1Yt3eIiFEgzrRI1qc5W4mmReetvIiAD1fBzm', 'Tel-aviv', 'EE', 'EEE', 'RRRR', 0),
(98767523, 'sssssssssssnirkuba19999@gmail.com', '$2a$10$7zCi/w9MH1cN4nSEDR62ieqqB4W1/ASsngSoj4n0adZq.q3xT/fb2', 'Jerusalem', 'RRR', 'YYY', 'YYY', 0),
(111222333, 'admin@gmail.com', '$2a$10$z04YZSjKMLMEEKdy4JS5Uu7eI1b0BuM3MzHAntiqpwwi8vaFkc7gm', '', '', 'Manager', 'Balili', 1),
(122234545, 'b@gmail.com', '$2a$10$Vfxbwx08sihD22qFA0YMVOqIBuj92EGEtwLMLAIpaWyT8jwenBkqe', 'Jerusalem', 'gfgfg', 'ggg', 'hhh', 0),
(123123344, 'nirkusddsdfba19999@gmail.com', '$2a$10$ROir4GNyJ49HzbFUU8xzpeMwvQ1rpnGlkTVhIu8AEwyGO2.tNv51q', 'Tel-aviv', 'GDF', 'ERB', 'DSFGH', 0),
(123454324, 'nirkubafdsfdf19999@gmail.com', '$2a$10$NbdTgq4MAJt6x5WJoyNvTu8.VMkpR.F8tU1nUCgGhx87W6lWqAGee', 'Jerusalem', 'qqq', 'www', 'eeee', 0),
(123456789, 'estab17@gmail.com', '$2a$10$LRDJbavv8K59W4uewigf6OuPqW89TLtmPdNDZ2MZX8Qf7/edMkHaW', 'Jerusalem', 'mishmar hagvul 5/5', 'tom', 'cohen', 0),
(423213453, 'nirkufdfsdfasdba19999@gmail.com', '$2a$10$gRJrLbIbincT1TkOFa.AXOMt9pwZzJawggdgyjQuWi0JpuGCZfMZS', 'Dimona', 'FSD', 'FSD', 'FSD', 0),
(444445555, 'nirfffffffdddddddddkuba19999@gmail.com', '$2a$10$paYfLRnEFtKXrHihJVcCkeeQWS9aaGDWBYP68vmKxuqR3VRyOnBIC', 'Jerusalem', 'EEE', 'YYYYYYYYY', 'YYYYYYYYYYYYYYY', 0),
(999999999, 'vvvvvvvvvvvvvvvv@gmail.com', '$2a$10$ALMBmIdRH1kA1qP9NWcH9.XQdCj/TfK91/vQNT3cytGFSrqq.Booe', 'Jerusalem', 'QQQQQQQQQ', 'QQQQQQQQQQQQ', 'QQQQQQQQQQQQQQ', 0),
(1122333344, 'nssssaaascccxcirkuba19999@gmail.com', '$2a$10$2PpW7f/XZI1/BcyEMZmZA.N.QGOOn7llnPFm0JTKsKXL39S.tbNMu', 'Tel-aviv', 'NU', 'A', 'A', 0),
(1234567899, 'stas@gmail.com', '$2a$10$WBWLOotVxSifq6sJvU77TuBAWOvGvQ4qlCClCiwWwZ8dL.Ux41wUq', 'Jerusalem', 'Yafo 15 / 3', '1=1', 'Levi', 0),
(2147483647, 'dddddbbbbbnirkuba19999@gmail.com', '$2a$10$c6Sri1xeC9LqfEUZXjuMi.8fQBwWmRcy6B7fTNBU9MyyLD2cKR.VG', 'Tel-aviv', 'RRR', 'WWW', 'WWW', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `holder_user_id` (`holder_user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `products_of_cart`
--
ALTER TABLE `products_of_cart`
  ADD PRIMARY KEY (`product_cart_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `products_of_cart`
--
ALTER TABLE `products_of_cart`
  MODIFY `product_cart_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1006;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`holder_user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `products_of_cart`
--
ALTER TABLE `products_of_cart`
  ADD CONSTRAINT `products_of_cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `products_of_cart_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
