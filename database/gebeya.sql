-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 17, 2026 at 06:26 PM
-- Server version: 8.4.7
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gebeya`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart`
--



-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `created_at`) VALUES
(1, 'Electronics', NULL, '2026-07-14 16:29:32'),
(2, 'Fashion', NULL, '2026-07-14 16:29:32'),
(3, 'Home & Kitchen', NULL, '2026-07-14 16:29:32'),
(4, 'Books', NULL, '2026-07-14 16:29:32'),
(5, 'Sports', NULL, '2026-07-14 16:29:32'),
(6, 'Beauty', NULL, '2026-07-14 16:29:32'),
(7, 'Ethiopian Collection', NULL, '2026-07-15 20:53:03');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','shipped','delivered') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `shipping_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_email` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_zip` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'cash_on_delivery',
  `shipping_cost` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--



-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `stock` int DEFAULT '0',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `image`, `category_id`, `created_at`) VALUES
(1, 'Wireless Headphones', 'Bluetooth noise cancelling headphones', 59.99, 50, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop', 1, '2026-07-14 16:30:11'),
(2, 'Smart Watch', 'Fitness tracking smart watch', 89.99, 26, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop', 1, '2026-07-14 16:30:11'),
(3, 'Running Shoes', 'Comfortable sports shoes', 49.99, 98, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop', 5, '2026-07-14 16:30:11'),
(4, 'Coffee Maker', 'Automatic home coffee machine', 79.99, 19, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=700&auto=format&fit=crop', 3, '2026-07-14 16:30:11'),
(5, 'Traditional Habesha Kemis', 'Elegant Ethiopian traditional dress with colorful woven tibeb details.', 129.99, 13, '/images/products/ethiopian/habesha-kemis.jpg', 7, '2026-07-15 20:53:54'),
(6, 'Handwoven Netela Shawl', 'Lightweight traditional Ethiopian cotton shawl with decorative borders.', 39.99, 30, '/images/products/ethiopian/netela-shawl.jpg', 7, '2026-07-15 20:53:54'),
(7, 'Ethiopian Cross Necklace', 'Traditional-inspired Ethiopian cross pendant with a detailed geometric design.', 34.99, 40, '/images/products/ethiopian/cross-necklace.jpg', 7, '2026-07-15 20:53:54'),
(8, 'Traditional Ethiopian Coffee Set', 'Decorative coffee set inspired by the Ethiopian coffee ceremony.', 79.99, 12, '/images/products/ethiopian/coffee-set.jpg', 7, '2026-07-15 20:53:54'),
(9, 'Handwoven Mesob Basket', 'Colorful Ethiopian-inspired woven basket for serving, decoration, or storage.', 89.99, 10, '/images/products/ethiopian/mesob-basket.jpg', 7, '2026-07-15 20:53:54'),
(10, 'Handmade Ethiopian Leather Sandals', 'Comfortable handmade leather sandals with Ethiopian-inspired detailing.', 54.99, 20, '/images/products/ethiopian/leather-sandals.jpg', 7, '2026-07-15 20:53:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('customer','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'customer',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
