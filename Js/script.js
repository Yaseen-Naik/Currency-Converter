let base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let select= document.querySelectorAll(".options");
let flag1=document.querySelector(".inputflag");
let flag2=document.querySelector(".outputflag");
let inputvalue=document.querySelector(".inputvalue");
let output=document.querySelector(".outputAmt");
let btn=document.querySelector(".btn");
for (const options of select) {
data.forEach((element) => {
  {
    let newoption = document.createElement("option");
    options.append(newoption);
    newoption.innerText = element.code;
    newoption.value = element.code;
    if(newoption.value==="USD" && options.name==="from")
    {
      newoption.selected="selected"
    }
    else if(newoption.value==="INR" && options.name==="to")
    {
      newoption.selected="selected"
    }
  }
});
}

select[0].addEventListener("change",()=>{
  let from=select[0].options[select[0].selectedIndex].innerText;
let index=select[0].selectedIndex;
  flag1.src=data[index].flag;
})
select[1].addEventListener("change",()=>{
  let to=select[1].options[select[1].selectedIndex].innerText;
let index=select[1].selectedIndex;
  flag2.src=data[index].flag;
});
btn.addEventListener("click",async ()=>{
  let EnteredAmt=inputvalue.value;
  if(EnteredAmt==="" || EnteredAmt<1){
    inputvalue.value="1";
    EnteredAmt="1";
  }
  
  let fromcur=select[0].value.toLowerCase();
  let tocur=select[1].value.toLowerCase();
  url=`${base_url}/${fromcur}/${tocur}.json`
  output.innerText="calculating..."
  let response = await fetch(url);
  let data=await response.json();
  let rate=data[tocur]
  let exchangedAmt=(rate*EnteredAmt).toFixed(2);
  console.log(exchangedAmt);
  output.innerText=`${exchangedAmt} ${tocur.toUpperCase()}`
});


