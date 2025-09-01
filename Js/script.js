let select = document.querySelectorAll(".options");
let flag = document.querySelectorAll(".flag");
let inputvalue = document.querySelector(".inputvalue");
let output = document.querySelector(".outputAmt");
let btn = document.querySelector(".btn");
let info = document.querySelector(".info");
let infobtn = document.querySelectorAll(".infobtn");
let quote = document.querySelector(".quote");
let more_info = document.querySelectorAll(".more_info");
let srch_by_country = document.querySelectorAll(".country");

// Populate country dropdowns
srch_by_country.forEach((country) => {
  data.forEach((info) => {
    let newoption = document.createElement("option");
    newoption.innerText = info.country;
    newoption.value = info.country;
    country.append(newoption);

    if (country.name === "to-C" && newoption.innerText == "India") {
      newoption.selected = "selected";
    } else if (
      country.name === "from-C" &&
      newoption.innerText == "United States"
    ) {
      newoption.selected = "selected";
    }
  });
});

function change_info(index) {
  more_info[0].innerText = data[index].country;
  more_info[1].innerText = data[index].name;
  more_info[2].innerText = data[index].countryCode;
}

function chooseCurrencyCode(val) {
  let index = select[val].selectedIndex;
  flag[val].src = data[index].flag;
  let country = srch_by_country[val][index];
  country.selected = "selected";
  change_info(index);
}

function chooseCountryName(val) {
  let index = srch_by_country[val].selectedIndex;
  flag[val].src = data[index].flag;
  let country = select[val][index];
  country.selected = "selected";
  change_info(index);
}

// Populate currency codes
for (const options of select) {
  data.forEach((element) => {
    let newoption = document.createElement("option");
    options.append(newoption);
    newoption.innerText = element.code;
    newoption.value = element.code;

    if (newoption.value === "USD" && options.name === "from") {
      newoption.selected = "selected";
    } else if (newoption.value === "INR" && options.name === "to") {
      newoption.selected = "selected";
    }
  });
}

select[0].addEventListener("change", () => {
  chooseCurrencyCode(0);
});

select[1].addEventListener("change", () => {
  chooseCurrencyCode(1);
});

srch_by_country[0].addEventListener("change", () => {
  chooseCountryName(0);
});

srch_by_country[1].addEventListener("change", () => {
  chooseCountryName(1);
});

//  Updated Conversion with ExchangeRate API
btn.addEventListener("click", async () => {
  let EnteredAmt = inputvalue.value;
  if (EnteredAmt === "" || EnteredAmt < 1) {
    inputvalue.value = "1";
    EnteredAmt = "1";
  }

  let fromcur = select[0].value.toUpperCase();
  let tocur = select[1].value.toUpperCase();

  let url = `https://open.er-api.com/v6/latest/${fromcur}`;
  output.innerText = "Calculating...";

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.result === "error") {
      output.innerText = "API Error";
      return;
    }

    let rate = data.rates[tocur];
    if (!rate) {
      output.innerText = "Currency not supported";
      return;
    }

    let exchangedAmt = (rate * EnteredAmt).toFixed(2);
    output.innerText = `${exchangedAmt} ${tocur}`;
  } catch (err) {
    console.error(err);
    output.innerText = "Failed to fetch rates";
  }
});

// Info buttons
infobtn[0].addEventListener("click", () => {
  let index = select[0].selectedIndex;
  change_info(index);
  quote.style.visibility = "hidden";
  info.style.visibility = "visible";
});

infobtn[1].addEventListener("click", () => {
  let index = select[1].selectedIndex;
  change_info(index);
  quote.style.visibility = "hidden";
  info.style.visibility = "visible";
});
