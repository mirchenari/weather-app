let wethInf;
const inputCity = document.querySelector(".input > input:first-child");
const divErr = document.querySelector(".err");
const loading = document.querySelector(".loading-gif");
const divResult = document.querySelector(".show-result");

inputCity.addEventListener('keydown', key => {
    if (key.key == 'Enter'){
        startGet();
    }
})

document.querySelector(".input > input:last-child").addEventListener('click', startGet)

function startGet(){
    loading.classList.remove("hidden");
    divResult.classList.add("hidden");
    divErr.classList.add("hidden");

    getWeather(inputCity.value);
}

async function getWeather(city){
    weatherApi = await fetch(`https://developers.parsijoo.ir/web-service/v1/weather/?type=search&city=${city}`,{
        headers : {
            "api-key" : "a75dd845e4d04f23adf35daf5e965d95"
        }
    })
    .then(value => {
        if (value.status == 200){
            return value.json();
        } else {
            throw Error(value.status);
        }
    })
    .then(value => {
        const valueResult = value.result.hava;

        wethInf = {
            update : new Date(Number(valueResult.summary.update)).toLocaleTimeString(),
            cityName : valueResult.city,
            condition : valueResult.summary.condition,
            now : valueResult.summary.temp,
            min : valueResult.dayList[0].min,
            max : valueResult.dayList[0].max,
            symbol : valueResult.dayList[0].symbol,
        }

        showResult();
    })
    .catch(err => {
        divErr.innerHTML = `${err} مشکلی پیش آمده لطفا دوباره تلاش کنید.`;
        divErr.classList.remove("hidden");
        loading.classList.add("hidden");
        divResult.classList.add("hidden");
    });
}


function showResult(){
    // icon
    document.querySelector(".icon > i").classList = `wi ${wethInf.symbol}`;

    // city name
    document.querySelector(".city-name").innerHTML = wethInf.cityName;

    // condition
    document.querySelector(".condition").innerHTML = wethInf.condition;

    // temp
    document.querySelector(".now").innerHTML = wethInf.now;
    document.querySelector(".min").innerHTML = wethInf.min;
    document.querySelector(".max").innerHTML = wethInf.max;

    // update
    document.querySelector(".update").innerHTML = `آخرین بروزرسانی: ${wethInf.update}`;

    // show
    loading.classList.add("hidden");
    divResult.classList.remove("hidden");
    divErr.classList.add("hidden");
}