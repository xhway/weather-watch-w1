var city="";
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");
var currentUvindex= $("#uv-index");
var sCity=[];

function find(c){
    for(var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}

var APIkey="8032cc87bb9d22269a835a7ef25a9c49";

function showWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

function currentWeather(city){
    var qURL="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;

    $.ajax({
        url:qURL,
        method:"GET",
        
    }).then(function(response){
        var weatherIcon=response.weather[0].icon;
        var iconURL="https://openweathermap.org/img/wn/"+weatherIcon +"@2x.png";
        var date= new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name + "("+date+")" + "<img src="+iconURL+">");

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2)+"°F")

        $(currentHumidity).html(response.main.humidity+"%");
        var ws= response.wind.speed;
        var windsMPH=(ws*2.237).toFixed(1);
        $(currentWSpeed).html(windsMPH+"MPH");

        UVIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
            sCity=JSON.parse(localStorage.getItem("cityname"));
            if(sCity==null){
                sCity=[];
                sCity.push(city.toUpperCase());
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(city);
            }else{
                if(find(city)>0){
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname".JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }
    });

}

function UVIndex(ln,lt){

    var uvURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
    $.ajax({
        url:uvURL,
        method:"GET"
    }).then(function(repsonse){
        $(currentUVIndex).html(response.value);
    });
    function forecast(cityid){
        var endofDay = false;
        var forecastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
        $.ajax({
            url:forecastURL,
            method:"GET"
        }).then(function(response){
            
        })
    })
}