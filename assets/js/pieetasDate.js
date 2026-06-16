(function ($) {
  $bonuses = $("#bonus-days");
  $bonusText = $("#bonus-text");

  const currentDate = new Date();
  const futureDate = new Date("2026-07-09T00:00:00Z");

  const diffMs = futureDate - currentDate; // milliseconds difference

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  if (days < 1) {
    $bonuses[0].innerText = hours;
    $bonusText[0].innerText = "hours";
  } else {
    $bonuses[0].innerText = days;
    $bonusText[0].innerText = "days";
  }
})(jQuery);
