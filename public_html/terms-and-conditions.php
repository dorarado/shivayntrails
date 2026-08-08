<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/data.php';

$page_title = 'Terms & Conditions | Shivayan Trails';
$meta_description = 'Terms and conditions for booking treks, getaways, and dham yatra experiences with Shivayan Trails.';
require __DIR__ . '/includes/header.php';
?>

<section class="page-hero">
  <div class="container">
    <h1 class="reveal">Terms &amp; Conditions</h1>
    <p class="reveal">Please read these terms carefully before booking any trip with us.</p>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="prose reveal">
      <h2>1. Booking &amp; Payment</h2>
      <p>A booking is confirmed only after receipt of the advance payment specified at the time of booking. The balance amount must be cleared before the trip start date as communicated by our team via WhatsApp, call, or email.</p>

      <h2>2. Cancellation &amp; Refund Policy</h2>
      <ul>
        <li>Cancellations made 15+ days before departure: 75% refund of the amount paid.</li>
        <li>Cancellations made 7–14 days before departure: 50% refund of the amount paid.</li>
        <li>Cancellations made less than 7 days before departure: no refund.</li>
        <li>In case of trip cancellation by Shivayan Trails due to unavoidable circumstances (weather, government restrictions, natural calamities), a full refund or reschedule option will be provided.</li>
      </ul>

      <h2>3. Health &amp; Fitness</h2>
      <p>Treks and yatras involve physical exertion at high altitudes. Travellers are expected to disclose any pre-existing medical conditions before booking. Shivayan Trails reserves the right to deny participation if a traveller's fitness poses a safety risk to themselves or the group.</p>

      <h2>4. Force Majeure</h2>
      <p>Shivayan Trails is not liable for delays, changes, or cancellations caused by circumstances beyond our reasonable control, including but not limited to landslides, road blockages, extreme weather, political unrest, or government-imposed restrictions. In such cases, alternate arrangements will be made wherever possible.</p>

      <h2>5. Traveller Conduct</h2>
      <p>All travellers are expected to follow the instructions of trek leaders and support staff at all times, particularly regarding safety protocols in high-altitude and remote terrain. Shivayan Trails reserves the right to remove any traveller from a trip whose conduct endangers themselves or others, without refund.</p>

      <h2>6. Inclusions &amp; Exclusions</h2>
      <p>Each trip page clearly lists what is included and excluded in the trip price. Any services not explicitly mentioned as included are the traveller's own responsibility, including personal expenses, travel insurance, and items marked under exclusions.</p>

      <h2>7. Liability</h2>
      <p>While Shivayan Trails takes all reasonable safety precautions, adventure travel carries inherent risk. Travellers participate at their own risk and are strongly advised to purchase adequate travel and medical insurance before departure.</p>

      <h2>8. Changes to Itinerary</h2>
      <p>Itineraries are subject to change based on weather conditions, local regulations, or on-ground safety assessments made by the trek leader. Shivayan Trails will make reasonable efforts to maintain the essence and highlights of the original itinerary.</p>

      <h2>9. Contact</h2>
      <p>For any questions regarding these terms, bookings, or cancellations, please email us at <?= h(CONTACT_EMAIL) ?>.</p>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
