-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 11. 13:30
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `laravel_10_db`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `stars` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `category_id`, `title`, `slug`, `description`, `price`, `discount_price`, `stock`, `image_url`, `stars`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Akusztikus hegedű', 'akusztikus-hegedu', 'Csodálatos hangú olasz hegedű 1887', 2999000.00, NULL, 50, 'http://localhost:8000/storage/products/hegedu.jpg', 0, 1, '2025-02-05 07:43:52', '2025-02-05 07:43:52'),
(2, 2, '4K Hegedűhúr', 'hegeduhur', 'Meleghangzású, gyors reagálású', 19999.00, NULL, 20, 'http://localhost:8000/storage/products/daddario.jpg', 0, 1, '2025-02-05 07:43:52', '2025-02-05 07:43:52'),
(3, 3, 'Dob', 'dob', 'Páros jamaikai dob', 149990.00, NULL, 30, 'http://localhost:8000/storage/products/dob.jpg', 0, 1, '2025-02-05 07:43:52', '2025-02-05 07:43:52');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_category_id_index` (`category_id`),
  ADD KEY `products_title_index` (`title`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
