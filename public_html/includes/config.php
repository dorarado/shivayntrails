<?php
/**
 * Site-wide configuration and helper functions.
 */

define('SITE_NAME', 'Shivayan Trails');
define('SITE_TAGLINE', 'Elevate Your Adventure');
define('CONTACT_EMAIL', 'shivayantrails@gmail.com');
define('SITE_LOGO', 'images/logo.png');
// WhatsApp number and social handles intentionally left blank for now.
// whatsapp_link() and the social icons below degrade gracefully (non-functional, icon-only) until real values are supplied.
define('WHATSAPP_NUMBER', '');

// Base URL path (relative). Works whether hosted at root or sub-directory.
if (!defined('BASE_PATH')) {
    define('BASE_PATH', '');
}

/**
 * Build a WhatsApp click-to-chat link with a prefilled message.
 */
function whatsapp_link($message = '') {
    if (WHATSAPP_NUMBER === '') {
        return '#';
    }
    $base = 'https://wa.me/' . WHATSAPP_NUMBER;
    if ($message !== '') {
        return $base . '?text=' . rawurlencode($message);
    }
    return $base;
}

/**
 * Whether a functional WhatsApp number is configured.
 */
function has_whatsapp() {
    return WHATSAPP_NUMBER !== '';
}

/**
 * Escape helper for output.
 */
function h($str) {
    return htmlspecialchars($str ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * Get current request path (for nav active state + WhatsApp page context).
 */
function current_path() {
    return strtok($_SERVER['REQUEST_URI'], '?');
}

/**
 * Format a rupee price like "5999" -> "₹5,999"
 */
function rupee($amount) {
    return '₹' . number_format((float)$amount);
}
