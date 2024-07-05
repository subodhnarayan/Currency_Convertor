const apiKey = 'cur_live_poFAR4bvSk3LRKySfgqP3UUxmd0c6YngsObtU90u';

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOptions.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOptions.selected = "selected";
        }
        select.append(newOptions);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        //console.log(currCode);
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
    console.log(fromCurrency.value, toCurrency.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;
    const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${fromCurrencyValue}&currencies=${toCurrencyValue}`;
    let response = await fetch(url);
    //console.log(response);
    let data = await response.json();
    //console.log(data);
    let rate = data.data[toCurrencyValue].value;
    console.log(rate);
    let final = amtval * rate;
    msg.innerText = `${amtval} ${fromCurrency.value}=${final} ${toCurrency.value}`;
}


const updateFlag = (element) => {
    let currCode = element.value;
    // console.log(currCode);
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}



btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();

});



window.addEventListener("load", () => {
    updateExchangeRate();
});






// const url = fetchJSON(`/currencies/{fromCurrency}`)