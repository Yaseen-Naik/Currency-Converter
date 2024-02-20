let base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let select = document.querySelectorAll(".options");
let flag1 = document.querySelector(".inputflag");
let flag2 = document.querySelector(".outputflag");
let inputvalue = document.querySelector(".inputvalue");
let output = document.querySelector(".outputAmt");
let btn = document.querySelector(".btn");
let info = document.querySelector(".info");
let infobtn = document.querySelectorAll(".infobtn");
let quote = document.querySelector(".quote");
let more_info = document.querySelectorAll(".more_info");
function change_info(index) {
  more_info[0].innerText = data[index].country;
  more_info[1].innerText = data[index].name;
  more_info[2].innerText = data[index].countryCode;
}
for (const options of select) {
  data.forEach((element) => {
    {
      let newoption = document.createElement("option");
      options.append(newoption);
      newoption.innerText = element.code;
      newoption.value = element.code;
      if (newoption.value === "USD" && options.name === "from") {
        newoption.selected = "selected";
      } else if (newoption.value === "INR" && options.name === "to") {
        newoption.selected = "selected";
      }
    }
  });
}

select[0].addEventListener("change", () => {
  let index = select[0].selectedIndex;
  flag1.src = data[index].flag;
  change_info(index);
});
select[1].addEventListener("change", () => {
  let index = select[1].selectedIndex;
  flag2.src = data[index].flag;
    change_info(index);
});
btn.addEventListener("click", async () => {
  let EnteredAmt = inputvalue.value;
  if (EnteredAmt === "" || EnteredAmt < 1) {
    inputvalue.value = "1";
    EnteredAmt = "1";
  }

  let fromcur = select[0].value.toLowerCase();
  let tocur = select[1].value.toLowerCase();
  url = `${base_url}/${fromcur}/${tocur}.json`;
  output.innerText = "calculating...";
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[tocur];
  let exchangedAmt = (rate * EnteredAmt).toFixed(2);
  console.log(exchangedAmt);
  output.innerText = `${exchangedAmt} ${tocur.toUpperCase()}`;
});
infobtn[0].addEventListener("click", () => {
  index = select[0].selectedIndex;
  change_info(index);
  quote.style.visibility = "collapse";
  info.style.visibility = "visible";
  country_name = data[index].country;
  country_code = data[index].countryCode;
  currency_name = data[index].name;
  console.log(
    "the country code is ",
    country_code,
    "name of the currency is ",
    currency_name,
    "name of the country is ",
    country_name
  );
});
infobtn[1].addEventListener("click", () => {
  index = select[1].selectedIndex;
  change_info(index);
  quote.style.visibility = "collapse";
  info.style.visibility = "visible";
  index = select[1].selectedIndex;
  country_name = data[index].country;
  country_code = data[index].countryCode;
  currency_name = data[index].name;
  console.log(country_code, currency_name, country_name);
});
