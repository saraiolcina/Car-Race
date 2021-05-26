$(document).ready(function () {
  var optionValue = 0;
  var timeArray = [];
  var carNameArray = [];
  var randomTime = 0;
  var carArray = new Array(); //array que almacena los coches

  //Función que confirma el número de participantes seleccionados
  $("#options").on("click", function () {
    var optionText = $("#options option:selected").text();
    var numberOfPlayers = document.getElementById("numberOfPlayers");
    numberOfPlayers.innerText = "Has elegido jugar con " + optionText;
  });

  //Función que presenta el array de coches
  $("#options").on("click", function () {
    $("#formulary").hide(1000);
    $("#numberOfPlayers").show();
    $("#lineaMeta").css("visibility", "visible");

    //Obtenemos el valor de la opción seleccionada  con el método val()
    var optionValue = $("#options").val();
    var carsContainer = document.getElementById("carsContainer");
    while (carsContainer.hasChildNodes()) {
      carsContainer.removeChild(carsContainer.lastChild);
    }

    //Para cada iteración, creamos un div y dentro creamos un elemento img al que le asignamos sus atributos
    for (var index = 1; index <= parseInt(optionValue); index++) {
      var imageContainer = document.createElement("div");
      imageContainer.id = `car${index}`;
      carsContainer.appendChild(imageContainer);
      var car = document.getElementById(`car${index}`);
      var img = document.createElement("img");
      img.className = "car";
      img.src = `img/car${index}.png`;
      const lineaMeta = document.getElementById("lineaMeta");
      if (parseInt(optionValue) > 2) {
        img.width = "60";
        img.height = "60";
        img.style.padding = "6px";
        lineaMeta.style.height = parseInt(optionValue) * 60 + "px";
      } else {
        img.width = "130";
        img.height = "130";
        lineaMeta.style.height = parseInt(optionValue) * 130 + "px";
      }
      car.appendChild(img);
      carArray[index] = img;
    }
  });

  //Función para desplazar los coches y almacenar sus valores random de velocidad
  $("#start").click(function () {
    optionValue = $("#options").val();
    var counter = 0;

    $(this).hide(2000);
    $("#restart").show(2000);
    var carsContainer = document.getElementById("carsContainer");

    $(".car").each(function () {
      if (counter == optionValue) {
        return false;
      } else {
        randomTime = Math.floor(Math.random() * 10 + 1) * 1000;
        timeArray.push(randomTime);
        carNameArray.push("Coche " + (counter + 1));
        $(this).animate({ left: "85%" }, randomTime);
        counter++;
      }
    });

    let sortedTimeArray = [...timeArray];
    sortedTimeArray.sort();

    setTimeout(function () {
      $("#resultsTable").show(1000);
      $("#winner").show(1000);
    }, sortedTimeArray[sortedTimeArray.length - 1]);
  });

  //Función que regresa los coches al punto de salida con método animate (2 segundos)
  $("#restart").click(function () {
    $(this).hide(2000);
    $("#start").show(2000);
    $("#congratulations").hide(1000);
    $("#numberOfPlayers").hide(1000);
    $("#winner").hide(1000);
    $("#resultsTable").hide(1000);
    $("table").hide(1000);
    $("#formulary").show(1000);
    $(".car").animate({ left: "0%" }, 2000);
    timeArray = [];
    carNameArray = [];
    carArray = [];
  });

  //Función para ver el coche ganador
  $("#winner").click(function () {
    $("#congratulations").show(500);
    $("table").hide(1000);
    var minTime = Math.min.apply(Math, timeArray);
    var counter = 0;
    var winnerCar;

    for (var x = 0; x < timeArray.length; x++) {
      if (timeArray[x] === minTime) {
        counter++;
        winnerCar = x + 1;
      }
    }

    var winner = document.getElementById("congratulations");
    if (counter == 1) {
      winner.innerText = "Ha ganado el coche " + winnerCar + "!!";
    } else {
      winner.innerText = "Empate!";
    }
  });

  //Función para crear tabla de resultados
  $("#resultsTable").click(function () {
    $("#congratulations").hide(1000);

    if (document.getElementById("table")) {
      document.getElementById("table").remove();
    }

    var body = document.getElementsByTagName("body")["0"];
    var tbl = document.createElement("table");
    tbl.setAttribute("id", "table");
    var tblBody = document.createElement("tbody");

    //Fila del título
    var headersText = ["Número de coche", "Tiempo tardado"];
    var row = tbl.insertRow(-1);
    for (var i = 0; i < 2; i++) {
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = headersText[i];
      row.appendChild(headerCell);
    }

    for (var i = 0; i < carNameArray.length; i++) {
      var row = document.createElement("tr");
      //Creamos solo 2 columnas con resultados
      var cell = document.createElement("td");
      var cell2 = document.createElement("td");
      var cellText = document.createTextNode(carNameArray[i]);
      var cellTime = document.createTextNode(
        timeArray[i] / 1000 + " segundos "
      );
      cell.appendChild(cellText);
      cell2.appendChild(cellTime);
      row.appendChild(cell);
      row.appendChild(cell2);
      tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
  });
});
