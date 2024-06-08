let results = {
    semi: [],
    brilliant: []
};

function FINDAlmostPrimes(n) {
    let almostPrimes = [];
    for (let i = 2; i <= n; i++) {
        if (checkSemiprime(i) != 0){
            almostPrimes.push(i);
            results.semi.push({ s: i.toString() });
        }
    }
    return almostPrimes;
}
function checkSemiprime(num){
    let cnt = 0;
    for (let i = 2; cnt < 2 &&i * i <= num; ++i)	
        while (num % i == 0){
            num /= i;
            ++cnt;
            }
    if (num > 1)
        ++cnt;
    return cnt == 2 ? 1 : 0;
}
	
function FINDBrilliants(almostPrimes) {
    let brilliants = almostPrimes.filter(num => isBrilliant(num) === 0);
    brilliants.forEach(num => {
        results.brilliant.push({ b:num.toString() });
    });
    return brilliants;
}


function ResultCheck(n) {
    let isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let i = 2; i <= n; i++) {
        if (isPrime[i] == true) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return isPrime;
}

function numberlength(n) {
    return n.toString().length;
}

function isBrilliant(n) {
    if (n === 1) return false;
    let isPrime = ResultCheck(n);
    for (let i = 2; i < n; i++) {
        let x = n / i;
        if (Number.isInteger(x) && isPrime[i] && isPrime[x] && (x * i) == n) {
            if (numberlength(i) == numberlength(x))
                return 0;
        }
    }
    return 1;
}

function TableBuilder(n, almostPrimes, brilliants) {
    let tableContainer = document.getElementById("right-section");
    tableContainer.innerHTML = ""; // Clear existing table

    let table = document.createElement("table");
    table.className = "numbers-table"; // Add class to the table
    let colCount = 10;
    let rowCount = Math.ceil(n / colCount);
    let currentCell = 1; // Track the current cell value

    for (let i = 0; i < rowCount; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < colCount; j++) {
            let cell = document.createElement("td");
            if (currentCell <= n) {
                cell.textContent = currentCell;
                if (almostPrimes.includes(currentCell)) {
                    cell.classList.add("almost-prime"); // Add class for almost prime
                } else if (brilliants.includes(currentCell)) {
                    cell.classList.add("brilliant"); // Add class for brilliant
                } else {
                    cell.classList.add("normal"); // Add class for normal numbers
                }
                currentCell++;
            } else {
                cell.textContent = "";
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    tableContainer.appendChild(table);
}



function ErrorWindow(message) {
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    let errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.innerText = message;
    document.body.appendChild(errorDiv);

    let okButton = document.createElement("button");
    okButton.innerText = "OK";
    okButton.addEventListener("click", function () {
        document.body.removeChild(overlay);
        document.body.removeChild(errorDiv);
    });
    errorDiv.appendChild(okButton);
}

function getResults() {
    return JSON.stringify(results,null,2);
}

let clickListener = function() {
    let inputValue = document.getElementById("txtInput").value.trim();
    if (!inputValue || isNaN(inputValue) || parseInt(inputValue) <= 0 || !Number.isInteger(parseFloat(inputValue))) {
        ErrorWindow("Invalid input,This works only with positive integer.");
        return;
    }

    let n = parseInt(inputValue);

    // Add loading text under the button
    let button = document.getElementById("cmdCalculate");
    let loadingText = document.createElement("span");
    loadingText.innerText = "Loading...";
    button.parentNode.appendChild(loadingText);

    // Perform calculations
    setTimeout(() => {
        let almostPrimes = FINDAlmostPrimes(n);
        let brilliants = FINDBrilliants(almostPrimes);
        almostPrimes = almostPrimes.filter(num => !brilliants.includes(num));
        console.log(getResults());
        TableBuilder(n, almostPrimes, brilliants);

        // Remove loading text
        button.parentNode.removeChild(loadingText);
    }, 0);
};


let loadPage = function() {
    document.getElementById("cmdCalculate").addEventListener("click",clickListener) ;
};
