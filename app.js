const BASE_URL="https://api.frankfurter.dev/v1/latest?base=INR&symbols=USD";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");
const msg=document.querySelector(".msg");

let i=0;

for (let select of dropdowns) {
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate=async()=>{let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""|| amtVal<=0){
        amtVal=1;
        amount.value="1";
    }

    const URL=`https://api.frankfurter.dev/v1/latest?base=${fromCurrency.value}&symbols=${toCurrency.value}`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data.rates[toCurrency.value];
    let finalAmount=(rate*amtVal);

    msg.innerText=`${amtVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
}


const updateFlag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    await updateExchangeRate(); 
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});
