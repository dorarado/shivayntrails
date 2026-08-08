<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/data.php';

$category_key = 'getaways';
$category_label = 'Getaways';
$dataset = get_getaways();

$slug = $_GET['slug'] ?? null;

if ($slug !== null) {
    list($trip, $found_category) = find_trip($category_key, $slug);
    if (!$trip) {
        http_response_code(404);
        $page_title = 'Trip Not Found | Shivayan Trails';
        require __DIR__ . '/includes/header.php';
        echo '<section class="section"><div class="container"><h1>Trip Not Found</h1><p>The trip you are looking for does not exist.</p><a href="getaways.php" class="btn btn-primary">Back to Getaways</a></div></section>';
        require __DIR__ . '/includes/footer.php';
        exit;
    }
    $page_title = $trip['name'] . ' | Shivayan Trails';
    $meta_description = $trip['overview'] ?? ('Explore ' . $trip['name'] . ' with Shivayan Trails.');
    require __DIR__ . '/includes/header.php';
    require __DIR__ . '/includes/trip-detail.php';
    require __DIR__ . '/includes/footer.php';
    exit;
}

$page_title = 'Getaways | Shivayan Trails';
$meta_description = 'Browse all scenic mountain getaway experiences from Shivayan Trails.';
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/listing-template.php';
require __DIR__ . '/includes/footer.php';
