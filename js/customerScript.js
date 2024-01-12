function clearTable() {
  const tableBody = document.getElementById("customersTableBody");
  tableBody.innerHTML = ""; 
}

function generateRandomData(numberOfItems) {
  const data = [];

  for (let i = 1; i <= numberOfItems; i++) {
    const firstName = generateRandomFirstName();
    const lastName = generateRandomLastName();
    const phoneNumber = generateRandomPhoneNumber();
    const company = generateRandomCompany();
    const email = generateRandomEmail(firstName, lastName, phoneNumber, company);

    const item = {
      "name": `${firstName} ${lastName}`,
      "company": company,
      "phone": phoneNumber,
      "email": email,
      "country": generateRandomCountry(),
      "status": generateRandomStatus()
    };

    data.push(item);
  }

  return data;
}

function generateRandomFirstName() {
  const firstNames = ["John", "Jane", "Boby", "Alik", "Mike", "Emmy", "Dave", "Emma"];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function generateRandomLastName() {
  const lastNames = ["Smith", "Johns", "Brown", "Leemb", "Taylor", "Wilson", "Clark", "White"];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

function generateRandomCompany() {
  const companies = ["Microsoft", "Yahoo", "Google", "Tesla", "Facebook", "Adobe"];
  return companies[Math.floor(Math.random() * companies.length)];
}

function generateRandomPhoneNumber() {
  const phoneNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  return `(${phoneNumber.toString().substring(1, 4)}) ${phoneNumber.toString().substring(4, 7)}-${phoneNumber.toString().substring(6)}`;
}

function generateRandomEmail(firstName, lastName, phoneNumber, company) {
  const emailPrefix = `${firstName.charAt(0).toLowerCase()}.${lastName.toLowerCase()}.${phoneNumber.substring(1, 4)}`;
  const emailDomains = {
    "Microsoft": "@microsoft.com",
    "Yahoo": "@yahoo.com",
    "Google": "@google.com",
    "Tesla": "@tesla.com",
    "Facebook": "@facebook.com",
    "Adobe": "@adobe.com"
  };

  const companyDomain = emailDomains.hasOwnProperty(company) ? emailDomains[company] : "@gmail.com";

  const email = `${emailPrefix}${companyDomain}`;
  return email;
}

function generateRandomCountry() {
  const countries = ["USA", "Canada", "Ukraine", "Australia", "Germany", "France", "Japan", "China", "Brazil", "India"];
  return countries[Math.floor(Math.random() * countries.length)];
}

function generateRandomStatus() {
  const statuses = ["Active", "Inactive"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}


function populateTable(data, currentPage, itemsPerPage) {
  clearTable();

  const tableBody = document.getElementById("customersTableBody");
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  for (let i = startIndex; i < endIndex; i++) {
    const row = tableBody.insertRow(tableBody.rows.length);

    for (const key in data[i]) {
      if (data[i].hasOwnProperty(key)) {
        const cell = row.insertCell();
        if (key === "phone" || key === "email") {
          const infoSpan = document.createElement("span");
          infoSpan.classList.add("info__data");

          const fullInfo = data[i][key];
          let displayText;

          if (window.innerWidth >= 1439) {
           
            displayText = fullInfo;
          } else if (window.innerWidth < 1439 && window.innerWidth >= 768) {
            if (key === "phone") {
             
              displayText = fullInfo.substring(0, 10);
            } else if (key === "email") {
              
              displayText = fullInfo.substring(0, fullInfo.indexOf('@') + 1);
            }
          } else if (window.innerWidth < 768) {
            if (key === "phone") {
             
              displayText = fullInfo.substring(0, 5);
            } else if (key === "email") {
            
              displayText = fullInfo.substring(0, fullInfo.indexOf('@') - 3);
            }
          }

          infoSpan.textContent = displayText;

          if ((window.innerWidth < 1439 && window.innerWidth >= 768) || (window.innerWidth < 768 && (key === "phone" || key === "email"))) {
            infoSpan.addEventListener("mouseover", function () {
              infoSpan.textContent = fullInfo;
            });

            infoSpan.addEventListener("mouseout", function () {
              infoSpan.textContent = displayText;
            });
          }

          cell.appendChild(infoSpan);
        } else {
          cell.innerHTML = data[i][key];
        }
      }
    }
  


const statusIndex = Object.keys(data[i]).indexOf("status");
const statusCell = row.cells[statusIndex];

if (statusCell) {
  const status = statusCell.innerHTML.toLowerCase();
  const statusSpan = document.createElement("span");

  if (status === "active") {
    statusSpan.classList.add("customers__status");
    statusSpan.classList.add("status__active");
  } else if (status === "inactive") {
    statusSpan.classList.add("customers__status");
    statusSpan.classList.add("status__inactive");
  }

  statusSpan.innerHTML = statusCell.innerHTML;

  statusCell.innerHTML = "";
  statusCell.appendChild(statusSpan);
}
}
updateDataRange(startIndex + 1, endIndex, data.length);
}


function updateDataRange(startIndex, endIndex, totalItems) {
  const dataRangeElement = document.getElementById("dataRange");
  dataRangeElement.textContent = `Showing data ${startIndex} to ${endIndex} of ${totalItems} entries`;
}



let currentPage = 1;
let goingForward = true;

function updatePagination(currentPage, totalPages) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const createPageItem = (pageNumber, isCurrent) => {
    const pageItem = document.createElement("li");
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = pageNumber;
    pageItem.appendChild(pageLink);

    if (isCurrent) {
      pageItem.classList.add("pagination-item-active");
    }

    pageLink.addEventListener("click", function () {
      updatePagination(pageNumber, totalPages);
      populateTable(generateRandomData(320), pageNumber, 8);
    });

    pagination.appendChild(pageItem);
  };

  const addEllipsis = () => {
    const ellipsisItem = document.createElement("li");
    ellipsisItem.classList.add("pagination-ellipsis-prev");
    ellipsisItem.textContent = "...";
    pagination.appendChild(ellipsisItem);
  };

  const addArrow = (arrowType, disabled) => {
    const arrowItem = document.createElement("li");
    const arrowLink = document.createElement("a");
    arrowLink.href = "#";
    arrowLink.textContent = arrowType;
    arrowItem.appendChild(arrowLink);

    if (disabled) {
      arrowItem.classList.add("pagination-disabled");
    } else {
      arrowLink.addEventListener("click", function () {
        const newPage = arrowType === "<" ? currentPage - 1 : currentPage + 1;
        updatePagination(newPage, totalPages);
        populateTable(generateRandomData(320), newPage, 8);
      });
    }

    pagination.appendChild(arrowItem);
  };

  addArrow("<", currentPage === 1);

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      createPageItem(i, currentPage === i);
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 4; i++) {
        createPageItem(i, currentPage === i);
      }
      addEllipsis();
      createPageItem(totalPages, currentPage === totalPages);
    } else if (currentPage >= totalPages - 3) {
      createPageItem(1, currentPage === 1);
      addEllipsis();
      for (let i = totalPages - 4; i <= totalPages; i++) {
        createPageItem(i, currentPage === i);
      }
    } else {
      createPageItem(1, currentPage === 1);
      addEllipsis();
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        createPageItem(i, currentPage === i);
      }
      addEllipsis();
      createPageItem(totalPages, currentPage === totalPages);
    }
  }

  addArrow(">", currentPage === totalPages);
}

document.body.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key === "ArrowLeft" && currentPage > 1) {
    currentPage--;
    goingForward = false;
    updatePagination(currentPage, totalPages);
    populateTable(generateRandomData(320), currentPage, 8);
  } else if (key === "ArrowRight" && currentPage < totalPages) {
    currentPage++;
    goingForward = true;
    updatePagination(currentPage, totalPages);
    populateTable(generateRandomData(320), currentPage, 8);
  }
});


const itemsPerPage = 8;
const totalItems = 320;
const totalPages = Math.ceil(totalItems / itemsPerPage);
updatePagination(currentPage, totalPages);
populateTable(generateRandomData(320), currentPage, itemsPerPage);

window.addEventListener("resize", function () {
  populateTable(generateRandomData(320), currentPage, itemsPerPage);
});

function filterByName() {
  const input = document.getElementById("search__name");
  const filter = input.value.toUpperCase();

  const tableBody = document.getElementById("customersTableBody");
  const rows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
      const nameCell = rows[i].getElementsByTagName("td")[0]; 
      if (nameCell) {
          const nameText = nameCell.textContent || nameCell.innerText;

          if (nameText.toUpperCase().indexOf(filter) > -1) {
              rows[i].style.display = "";
          } else {
              rows[i].style.display = "none";
          }
      }
  }
}