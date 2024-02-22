$(document).ready(function () {
  $("#search-form").submit(function (event) {
    event.preventDefault();
    var heroId = $("#search-box").val().trim();
    if (!isNaN(heroId)) {
      $.ajax({
        url: "https://www.superheroapi.com/api.php/4905856019427443/" + heroId,
        method: "GET",
        success: function (response) {
          var superhero = response;
          var superheroCard = `
              <div class="card">
                <img src="${superhero.image.url}" class="card-img-top" alt="${superhero.name}">
                <div class="card-body">
                  <h5 class="card-title">${superhero.name}</h5>
                  <p class="card-text">Intelligence: ${superhero.powerstats.intelligence}</p>
                  <p class="card-text">Strength: ${superhero.powerstats.strength}</p>
                  <p class="card-text">Speed: ${superhero.powerstats.speed}</p>
                </div>
              </div>
            `;
          $("#hero-details").html(superheroCard);

          var chartData = [];
          for (var power in superhero.powerstats) {
            chartData.push({
              y: parseInt(superhero.powerstats[power]),
              label: power,
            });
          }
          var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
              text: "Powerstats",
            },
            data: [
              {
                type: "pie",
                startAngle: 240,
                yValueFormatString: '##0"%"',
                indexLabel: "{label} {y}",
                dataPoints: chartData,
              },
            ],
          });
          chart.render();
        },
        error: function (xhr, status, error) {
          alert("Error al buscar el superhéroe. Inténtalo de nuevo.");
        },
      });
    } else {
      alert("Por favor, ingresa un número válido para buscar al superhéroe.");
    }
  });
});
