<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/data.php';

$page_title = 'About Us | Shivayan Trails';
$meta_description = 'Built in the Himalayas. Made for journeys that stay with you. Learn about Shivayan Trails, our story, and our team.';
require __DIR__ . '/includes/header.php';

$team = get_team();

$why_choose_us = [
    ['title' => 'Deep Himalayan Roots', 'text' => 'We operate where we belong. Our understanding of terrain, seasons, routes, and local communities allows us to create experiences that are safe and thoughtfully designed.'],
    ['title' => 'Safety Without Compromise', 'text' => 'Trained trek leaders, experienced captains, structured planning, and on-ground support teams ensure your journey is secure from start to finish. Risk management is not an afterthought for us.'],
    ['title' => 'Thoughtfully Curated Itineraries', 'text' => 'No rushed sightseeing. No unnecessary detours. Each itinerary balances adventure, rest, exploration, and connection.'],
    ['title' => '24 by 7 Support', 'text' => 'From your first inquiry to your return home, our team is available to guide you. Planning assistance, travel coordination, and in-journey support are always within reach.'],
    ['title' => 'Trusted by 5,000 Plus Travellers', 'text' => 'Our community has grown through word of mouth and repeat travellers. Consistent on-ground execution and genuine service have helped us build long-term trust.'],
    ['title' => 'Structured Group Experiences', 'text' => 'We specialise in college programs, institutional batches, and corporate retreats. Our experiences are organised, well-managed, and designed to create bonding and shared growth.'],
    ['title' => 'Real Experiences, Not Packages', 'text' => 'We focus on meaningful travel. Whether it is a spiritual yatra, a high-altitude trek, or a cultural immersion, we ensure it feels authentic and personal.'],
];
?>

<!-- ================= ABOUT HERO ================= -->
<section class="page-hero">
  <div class="container">
    <span class="eyebrow reveal" style="display:block; text-align:center;">ABOUT US</span>
    <h1 class="reveal">Built in the Himalayas.<br>Made for journeys that stay with you.</h1>
    <p class="reveal" style="max-width:640px; margin:0 auto;">Shivayan Trails was founded in 2020 with a simple belief. Travel should stay with you long after you return home.</p>
  </div>
</section>

<!-- ================= OUR STORY ================= -->
<section class="section">
  <div class="container" style="display:grid; grid-template-columns: 1fr 1.3fr; gap:56px; align-items:start;">
    <div class="reveal">
      <h2>Our Story</h2>
      <p>We don't believe in rushed schedules or overcrowded experiences. We believe in journeys that feel real.</p>
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-label">Founded</span>
          <span class="stat-value">2020</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Travellers guided</span>
          <span class="stat-value">5,000+</span>
        </div>
        <div class="stat-pair">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3 4 15h16L14 3l-3 6-3-6z"></path></svg>
          <span>
            <span class="stat-label">Rooted locally</span>
            <span class="stat-sub">Terrain, seasons, communities</span>
          </span>
        </div>
        <div class="stat-pair">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4.5 8-11.8A8 8 0 0 0 4 10.2C4 17.5 12 22 12 22z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>
            <span class="stat-label">Safety first</span>
            <span class="stat-sub">Planning, leaders, support</span>
          </span>
        </div>
      </div>
    </div>
    <div class="reveal">
      <p>Shivayan Trails was founded in 2020 with a simple belief. Travel should stay with you long after you return home.</p>
      <p>We are rooted in the Himalayas, and everything we design comes from a deep respect for the mountains, the people, and the pace of life they teach you. What started as a passion for meaningful exploration has grown into a trusted name for treks, yatras, cultural journeys, and curated group experiences across Uttarakhand and the greater Himalayan region.</p>
      <p>From adventure trails like Kedarkantha and Rupin Pass to spiritual journeys such as Char Dham and Valley of Flowers, every itinerary is carefully planned with safety, comfort, and authenticity at its core. We do not believe in rushed schedules or overcrowded experiences. We believe in journeys that feel real.</p>
      <p>Since inception, we have guided 5,000 plus travellers. Students, corporate teams, solo explorers, and families have trusted us to create experiences that are structured yet personal. Our local guides, trek leaders, and on-ground support teams ensure that every journey runs smoothly while still feeling flexible and human.</p>
      <p>We also collaborate with institutions and organisations to design exploration programs that combine learning with adventure. From university batches to corporate off-sites, we create mountain experiences that build connection and clarity.</p>
      <p>Shivayan Trails was founded by Mayank Biswas and co-founded by Saksham Sharma. Built by travellers for travellers, the company stands on trust, strong execution, and a genuine love for the Himalayas.</p>
      <p><strong>We are not here to sell trips. We are here to create journeys that ground you, challenge you, and stay with you.</strong></p>
    </div>
  </div>
</section>

<!-- ================= WHY CHOOSE US ================= -->
<section class="section section-muted">
  <div class="container">
    <div class="section-header reveal">
      <span class="eyebrow">WHY CHOOSE US</span>
      <h2>Thoughtful by design. Strong on execution.</h2>
    </div>
    <div class="numbered-grid">
      <?php foreach ($why_choose_us as $i => $item): ?>
        <div class="numbered-card reveal">
          <div class="numbered-badge"><?= $i + 1 ?></div>
          <h3><?= h($item['title']) ?></h3>
          <p><?= h($item['text']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ================= MEET THE TEAM ================= -->
<section class="section">
  <div class="container">
    <div class="section-header reveal">
      <span class="eyebrow">MEET THE TEAM</span>
      <h2>The people behind the journey</h2>
      <p>Behind every successful journey is a team that plans, guides, manages, and supports it with care. At Shivayan Trails, our strength lies in people who understand the mountains and respect the responsibility that comes with leading others into them.</p>
    </div>
    <div class="team-grid">
      <?php foreach ($team as $member): ?>
        <div class="team-card reveal">
          <div class="team-card-head">
            <div class="team-avatar"><?= h($member['initials']) ?></div>
            <div>
              <h4><?= h($member['name']) ?></h4>
              <span class="role"><?= h($member['role']) ?></span>
            </div>
          </div>
          <p><?= h($member['bio']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
