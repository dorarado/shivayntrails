<?php
/**
 * Data loading helpers. Centralizes access to the PHP-array "database" files.
 */
require_once __DIR__ . '/config.php';

define('DATA_DIR', __DIR__ . '/../data');

function get_treks() {
    static $data = null;
    if ($data === null) { $data = require DATA_DIR . '/treks.php'; }
    return $data;
}

function get_getaways() {
    static $data = null;
    if ($data === null) { $data = require DATA_DIR . '/getaways.php'; }
    return $data;
}

function get_dham_yatra() {
    static $data = null;
    if ($data === null) { $data = require DATA_DIR . '/dham-yatra.php'; }
    return $data;
}

function get_blogs() {
    static $data = null;
    if ($data === null) { $data = require DATA_DIR . '/blogs.php'; }
    return $data;
}

function get_team() {
    static $data = null;
    if ($data === null) { $data = require DATA_DIR . '/team.php'; }
    return $data;
}

/**
 * Map of category key -> [data getter, listing url prefix, label]
 */
function trip_categories() {
    return [
        'treks' => ['data' => get_treks(), 'url' => 'treks', 'label' => 'Treks'],
        'getaways' => ['data' => get_getaways(), 'url' => 'getaways', 'label' => 'Getaways'],
        'dham-yatra' => ['data' => get_dham_yatra(), 'url' => 'dham-yatra', 'label' => 'Dham Yatra'],
    ];
}

/**
 * Find a trip by category + slug. Returns [trip, category_key] or [null, null].
 */
function find_trip($category, $slug) {
    $cats = trip_categories();
    if (!isset($cats[$category])) return [null, null];
    $set = $cats[$category]['data'];
    if (!isset($set[$slug])) return [null, null];
    return [$set[$slug], $category];
}

/**
 * Get all trips across all categories, each tagged with its slug + category key.
 */
function all_trips() {
    $all = [];
    foreach (trip_categories() as $catKey => $cat) {
        foreach ($cat['data'] as $slug => $trip) {
            $trip['_slug'] = $slug;
            $trip['_category_key'] = $catKey;
            $all[] = $trip;
        }
    }
    return $all;
}

/**
 * Build the detail page URL for a trip.
 */
function trip_url($category_key, $slug) {
    return $category_key . '.php?slug=' . rawurlencode($slug);
}
