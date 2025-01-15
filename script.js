// to get current rates ==> from{from} to {to1,to2,....}
async function gett_rates() {
    const url = "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP";
  
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '81b76201fcmshd4fcfadd4823ee5p12deddjsn897f5dbf8ce9',
            'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
    }
    try{const response = await fetch(url,options);
    const res = await response.json();
    console.log(response);
    console.log(res);}
    catch(error) {
        console.error(error);
    }
}

// to get rates on a specific date
async function gett_rates_on_this_date() {
    const url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/2019-10-16?from=USD&to=EUR%2CGBP';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '81b76201fcmshd4fcfadd4823ee5p12deddjsn897f5dbf8ce9',
            'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


async function convertt(from,tooo,amnt) {
    const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${from}&to=${tooo}&amount=${amnt}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '81b76201fcmshd4fcfadd4823ee5p12deddjsn897f5dbf8ce9',
            'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        // console.log(result.result);
        return result.result;
    } catch (error) {
	    console.error(error);
    }
}
// convertt('USD','INR',10);
// know_symbols()
async function know_symbols(){
    const url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols';
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '81b76201fcmshd4fcfadd4823ee5p12deddjsn897f5dbf8ce9',
		'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
	}
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log((result.symbols));
        return result.symbols;
    } catch (error) {
        console.error(error);
    }
}

var last_day = 30;
function getdates(days) {
    const dates = [];
    const today = new Date();
    for (let i = days; i >= 0; i--) {
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - i);
        dates.push(pastDate.toISOString().split("T")[0]);
    }
    return dates;
}
async function h(days,fr_cr,to_cr){
    console.log(`graph b/w ${fr_cr} and ${to_cr}`);
    const en = new Date();
    const st = new Date();
    st.setDate(st.getDate() - days);
    const en_str = JSON.stringify(en).split("T")[0].slice(1);
    const st_str = JSON.stringify(st).split("T")[0].slice(1);
    const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/timeseries?start_date=${st_str}&end_date=${en_str}&from=USD&to=EUR`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '81b76201fcmshd4fcfadd4823ee5p12deddjsn897f5dbf8ce9',
            'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.rates);
        let arr = getdates(days);
        let rates_on_dt = [];
        arr.forEach((dt) => {
            //   console.log(dt);
            console.log("(dt,fr_cr,to_cr):",dt,fr_cr,to_cr);
            console.log(result.rates[dt][fr_cr]);
            console.log(result.rates[dt][to_cr]);
            let tm = (result.rates[dt][to_cr]/result.rates[dt][fr_cr]);
            console.log(tm);
            rates_on_dt.push(tm);
        });
        console.log(arr);
        console.log(rates_on_dt);
        dr_gr(arr,rates_on_dt);

    } catch (error) {
        console.error(error);
    }
}

async function handleInputChange(event) {
    console.log("change detected in input");
    let fr_curr,to_curr,amnt;
    const inputElement = event.target; // Get the input element
    amnt = inputElement.value; // Get the current value of the input
    const fr_el = document.querySelector("select[name='currfr']");
    fr_curr = fr_el.value;
    const to_el = document.querySelector("select[name='currto']");
    to_curr = to_el.value;
    const dropdown = document.querySelector(".currrfrom");
    const selectedText = dropdown.options[dropdown.selectedIndex].text;
    const dropdownto = document.querySelector(".currrto");
    const selectedTextto = dropdownto.options[dropdownto.selectedIndex].text;
    if(inputElement.classList[0] === "fr_amnt"){
        // console.log(`from:${fr_curr} to:${to_curr} amnt:${amnt}`)
        let ch = await convertt(fr_curr,to_curr,amnt);
        document.querySelector(".to_amnt").value = ch;
        document.querySelector(".info").innerHTML = `<p>${amnt} ${selectedText} to ${selectedTextto}</p>`;
    }
    else {
        // console.log(`from:${to_curr} to:${fr_curr} amnt:${amnt}`)
        let ch = await convertt(to_curr,fr_curr,amnt);
        document.querySelector(".fr_amnt").value = ch;
        // document.querySelector(".info").innerHTML = `<p>${ch} ${fr_el.innerHTML} to ${to_el.innerHTML}</p>`;
        document.querySelector(".info").innerHTML = `<p>${ch} ${selectedText} to ${selectedTextto}</p>`;
    }
}

async function handlecurr(event) {
    console.log("change detected in curr");
    let fr_curr,to_curr,amnt;
    const inputElement = event.target; 
    const fr_el = document.querySelector("select[name='currfr']");
    fr_curr = fr_el.value;
    const to_el = document.querySelector("select[name='currto']");
    to_curr = to_el.value;
    amnt = document.querySelector(".fr_amnt").value;
    let ch = await convertt(fr_curr,to_curr,amnt);
    document.querySelector(".to_amnt").value = ch;
    const dropdown = document.querySelector(".currrfrom");
    const selectedText = dropdown.options[dropdown.selectedIndex].text;
    const dropdownto = document.querySelector(".currrto");
    const selectedTextto = dropdownto.options[dropdownto.selectedIndex].text;
    document.querySelector(".info").innerHTML = `<p>${amnt} ${selectedText} to ${selectedTextto}</p>`;
    const days = last_day;
    await h(days,fr_curr,to_curr);
}

// async function handlecurr(event) {
//     console.log("change detected in date");
// }
let sym;
async function ks(){sym = await know_symbols();}
ks();

const to_add_options=()=>{
    console.log("clicked")
    if (document.querySelector(".currrfrom").options.length > 1 || document.querySelector(".currrto").options.length > 1) {
        return; 
    }
    console.log("clicked2") 
    for (const key in sym) {
        const el = sym[key];
        // console.log(key,el);
        document.querySelector(".currrfrom").innerHTML = document.querySelector(".currrfrom").innerHTML + 
        `<option value="${key}">${el}</option>`;
        document.querySelector(".currrto").innerHTML = document.querySelector(".currrto").innerHTML + 
        `<option value="${key}">${el}</option>`;
    }
    console.log("clicked3")
}
document.querySelector(".currrfrom").addEventListener("click",()=>{
    setTimeout(to_add_options,500);
}
)
document.querySelector(".currrto").addEventListener("click",()=>{
    setTimeout(to_add_options,500);
}
)
document.querySelectorAll(".dy").forEach((element) => {
    element.addEventListener("click", async () => {
        const days = element.textContent; // Get the text content of the clicked element
        last_day = days;
        console.log("Change in days");
        console.log(days);
        const fr_el = document.querySelector("select[name='currfr']");
        const fr_curr = fr_el.value;
        const to_el = document.querySelector("select[name='currto']");
        const to_curr = to_el.value;
        await h(days, fr_curr, to_curr);
    });
});

var chartInstance;
function dr_gr(xval,yval){
    const fr_el = document.querySelector("select[name='currfr']").value;
    const to_el = document.querySelector("select[name='currto']").value;
    if (chartInstance) {
        chartInstance.destroy();
    }
    const ctx = document.getElementById('can').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'line', 
      data: {
        labels: xval,
        datasets: [{
            pointRadius: 0,
          label:  `${fr_el} vs ${to_el}`,
          data: yval,
          borderColor: 'blue',
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          x: { grid:{display:false}, title: { display: true, text: 'Days' } },
          y: { grid:{display:false}, title: { display: true, text: 'Rate' } }
        }
      }
    });
}
h(30,"INR","USD");