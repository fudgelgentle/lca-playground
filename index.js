
handleYesNoButton();
setupChart();
handleUnitDivChange();

const btnContainer = document.querySelector('.insert-up-down');
const btnContainer2 = document.querySelector('.insert-up-down-2');
createUpDownBtn(btnContainer, 30);
createUpDownBtn(btnContainer2, 15);


//& Put this in lca-extension-cli
handleRatioSection();

//& Put this in lca-extension-cli
// Handles the creation of ratio section and all of its interactive behaviors.
function handleRatioSection() {

  const ratioList = [
    {
      "name": "PDMS prepolymer",
      "ratio_value": 10,
      "unit": "g",
      "ratio_value_source": "present",
      "unit_source": "inferred",
      "carbon_emission_factor": "1.5 g CO₂-eq per g"
    },
    {
      "name": "curing agent",
      "ratio_value": 1,
      "unit": "g",
      "ratio_value_source": "present",
      "unit_source": "inferred",
      "carbon_emission_factor": "2.0 g CO₂-eq per g"
    },
    {
      "name": "1,5,7-triazabicyclo[4.4.0]dec-5-ene",
      "ratio_value": 5,
      "unit": "g",
      "ratio_value_source": "present",
      "unit_source": "inferred",
      "carbon_emission_factor": "2.33 g CO₂-eq per g"
    },
  ];
  const ratioSection = document.querySelector('.lca-viz-ratio-section');
  const ratioList2 = [
    {
      "name": "epoxy",
      "ratio_value": 1.2,
      "unit": "g",
      "ratio_value_source": "present",
      "unit_source": "inferred",
      "carbon_emission_factor": "1.5 g CO₂-eq per g"
    },
    {
      "name": "copper foil",
      "ratio_value": 1.5,
      "unit": "g",
      "ratio_value_source": "present",
      "unit_source": "inferred",
      "carbon_emission_factor": "2.0 g CO₂-eq per g"
    },
    {
      "name": "TBD 828",
      "ratio_value": 0.3,
      "unit": "g",
      "ratio_value_source": "present",
      "unit_source": "inferred",
      "carbon_emission_factor": "2.33 g CO₂-eq per g"
    },
  ];
  const ratioHTML = createRatioSection(ratioList, 0);
  const ratioHTML2 = createRatioSection(ratioList2, 1);
  ratioSection.innerHTML += ratioHTML;
  ratioSection.innerHTML += ratioHTML2;

  const independentList = [
    {
      "name": "PET substrate",
      "amount": 2,
      "unit": "g",
      "amount_source": "present",
      "unit_source": "present",
      "carbon_emission_factor": "2.5 g CO₂-eq per g"
    },
    {
      "name": "copper foil",
      "amount": 1,
      "unit": "g",
      "amount_source": "present",
      "unit_source": "present",
      "carbon_emission_factor": "0.97 g CO₂-eq per g"
    },
  ];
  const independentList2 = [{
    "name": "glycerin",
    "amount": 1,
    "unit": "g",
    "amount_source": "present",
    "unit_source": "present",
    "carbon_emission_factor": "2.6 g CO₂-eq per g"
    },
    {
      "name": "lithium-ion battery",
      "amount": 1,
      "unit": "kg",
      "amount_source": "present",
      "unit_source": "present",
      "carbon_emission_factor": "10 kg CO₂-eq per kg"
    },
  ];
  const independentSection = document.querySelector('.lca-viz-independent-section');
  const independentMaterialHTML = independentList.map((element) =>
    getParam(element.name, 0, 'g', element.amount, undefined, undefined)
  ).join('');
  independentSection.innerHTML += independentMaterialHTML;
  const independentMaterialHTML2 = independentList2.map((element) =>
    getParam(element.name, 0, 'g', element.amount, undefined, undefined)
  ).join('');
  independentSection.innerHTML += independentMaterialHTML2;


  const processesList = [
    {
      "name": "atmospheric pressure plasma treatment",
      "power": 60,
      "power_unit": "W",
      "time": 600,
      "time_unit": "s",
      "power_source": "present",
      "time_source": "present",
      "energy": 0.01,
      "energy_unit": "kWh",
      "energy_source": "calculated",
      "carbon_emission_factor": "431 g CO₂-eq per kWh"
    }
  ];
  const processesList2 = [
    {
      "name": "PCD substrate mixture",
      "power": 60,
      "power_unit": "W",
      "time": 600,
      "time_unit": "s",
      "power_source": "present",
      "time_source": "present",
      "energy": 0.01,
      "energy_unit": "kWh",
      "energy_source": "calculated",
      "carbon_emission_factor": "431 g CO₂-eq per kWh"
    }
  ];
  const processesSection = document.querySelector('.lca-viz-processes-section');
  const processesHTML = processesList.map((element) =>
    getParam(element.name, 0, element.power_unit, element.amount, true, element.time_unit)
  ).join('');
  const processesHTML2 = processesList2.map((element) =>
    getParam(element.name, 0, element.power_unit, element.amount, true, element.time_unit)
  ).join('');
  processesSection.innerHTML += processesHTML;
  processesSection.innerHTML += processesHTML2;

  handleToggleSwitch();
}

//& Put this in lca-extension-cli
function handleToggleSwitch() {
  const toggleSwitches = document.querySelectorAll(".lca-viz-toggle-checkbox");
  const lcaVizMap = document.getElementById("lca-viz-map");
  const originalWidth = lcaVizMap.scrollWidth;

  function show(element) {
    element.classList.remove('hidden');
  }
  function hide(element) {
    element.classList.add('hidden');
  }

  toggleSwitches.forEach((toggleSwitch, index) => {
    toggleSwitch.addEventListener("change", () => {
      console.log('detected toggle switch clicking');
      const uniqueId = document.getElementById("lca-viz-r-section-" + index);
      const textDetails = uniqueId.querySelector('.lca-viz-ratio-detail-text');
      const paramToggleOn = uniqueId.querySelector('.lca-viz-param-toggle-on');
      const paramToggleOff = uniqueId.querySelector('.lca-viz-param-toggle-off');

      if (toggleSwitch.checked) {
        lcaVizMap.style.width = `${originalWidth}px`;
        setTimeout(() => {
          show(textDetails);
          hide(paramToggleOff);
          show(paramToggleOn);
          const newWidth = lcaVizMap.scrollWidth;
          lcaVizMap.style.width = `${newWidth}px`;
        }, 0);
        paramToggleOn.style.width = "auto";
        textDetails.style.height = "auto";
      } else {
        setTimeout(() => {
          hide(textDetails);
          hide(paramToggleOn);
          show(paramToggleOff);
          lcaVizMap.style.width = `${originalWidth}px`;
        }, 100);
      }
    });
  });
}

//& Put this in lca-extension-cli
function createRatioSection(ratioList, index) {
  const ratioSection = `
    <div id="lca-viz-r-section-${index}" class="lca-viz-ratio-container br-4 pd-16">
            <div class="lca-viz-toggle flex-center cg-8">
              <span class="fz-12">Toggle Ratio</span>
              <div class="lca-viz-toggle-container">
                <input type="checkbox" class="lca-viz-toggle-checkbox" id="lca-viz-toggle-switch-${index}">
                <label for="lca-viz-toggle-switch-${index}" class="lca-viz-toggle-label"></label>
              </div>
            </div>
            <div class="lca-viz-ratio-detail-text hidden">
              <div class="flex-center">
                <div class="lca-viz-converted-ratio lca-viz-space-between br-4 fz-16 pd-8 flex-center cg-8 bg-eef2f0">
                  <span>Converted ratio: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <div class="lca-viz-ratio-values flex-center cg-8">
                    ${ratioList.map((element, index) =>
                      `<span class="lca-viz-ratio-text br-4 bg-d2ead7">${element.ratio_value}</span>
                      ${index < ratioList.length - 1 ? `<span>:</span>` : ``}`
                    ).join('')}
                  </div>
                </div>
                <div class="lca-viz-empty-space"></div>
              </div>
              <p class="lca-viz-text-source fz-12">Text source: “1:1:5 mol% to the acid”</p>
            </div>
            <!-- & param for toggle ratio off -->
            <div class="lca-viz-param-toggle-off">
              <br>
              ${ratioList.map((element) =>
                getParam(element.name, 0, 'g', 1, undefined, undefined)
              ).join('')}
            </div>

            <!-- & param for toggle ratio on -->
            <div class="lca-viz-param-toggle-on lca-viz-space-between hidden flex-center bg-eef2f0 pd-16 br-8 cg-8 mt-12">
            ${ratioList.map((element, index) =>
              `<div class="lca-viz-ratio-control fz-16 bg-d2ead7 br-8 pd-16">
                <div class="control-section">${element.name}</div>
                <div class="flex-center cg-4 mt-8 lca-viz-justify-center">
                  <!-- ? up-down-btn -->
                  <div class="lca-viz-special-text-container-2">
                    <div class="lca-viz-special-text-2 lca-viz-active-st">
                      <div class="lca-viz-up-down-btn-container">
                        <div class="lca-viz-active lca-viz-up-down-btn" id="up">
                          <svg width="100%" height="100%" viewBox="0 0 9 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.60595 1.24256C3.99375 0.781809 4.7032 0.781808 5.091 1.24256L8.00777 4.70806C8.53906 5.3393 8.09032 6.30353 7.26525 6.30353L1.4317 6.30353C0.606637 6.30353 0.157892 5.33931 0.689181 4.70807L3.60595 1.24256Z" fill="currentColor"/>
                          </svg>
                        </div>
                        <span id="lca-viz-parameter-2">${element.ratio_value}</span>
                        <div class="lca-viz-active lca-viz-up-down-btn" id="down">
                          <svg width="100%" height="100%" viewBox="0 0 9 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.09107 5.74914C4.70327 6.20989 3.99382 6.20989 3.60602 5.74914L0.689251 2.28363C0.157962 1.65239 0.606707 0.688168 1.43177 0.688168L7.26532 0.688168C8.09039 0.688168 8.53913 1.65239 8.00784 2.28363L5.09107 5.74914Z" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- ? ^^^^^^^ -->
                  <span>g</span>
                </div>
              </div>${index < ratioList.length - 1 ? `<span>:</span>` : ``}`
            ).join('')}
            </div>
          </div>
  `;
  return ratioSection;
}


function getParam(rawMaterialName, index, unit, defaultVal = 1, isProcesses = false, unit2 = null) {
  const paramId = "lca-viz-param-" + index;
  const paramDiv = `
    <div class="lca-viz-param-fill flex-center br-8 fz-16">
          <span>${rawMaterialName}</span>
          <div class="flex-center cg-4">
            <div class="lca-viz-special-text-container-2">
              <div class="lca-viz-special-text-2 lca-viz-active-st">
                <div class="lca-viz-up-down-btn-container">
                  <div class="lca-viz-active lca-viz-up-down-btn lca-viz-down">
                    <svg width="100%" height="100%" viewBox="0 0 9 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.09107 5.74914C4.70327 6.20989 3.99382 6.20989 3.60602 5.74914L0.689251 2.28363C0.157962 1.65239 0.606707 0.688168 1.43177 0.688168L7.26532 0.688168C8.09039 0.688168 8.53913 1.65239 8.00784 2.28363L5.09107 5.74914Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <input class="lca-viz-parameter-text" id="${paramId}" type="number" value="${defaultVal}">
                  <div class="lca-viz-active lca-viz-up-down-btn lca-viz-up">
                    <svg width="100%" height="100%" viewBox="0 0 9 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.60595 1.24256C3.99375 0.781809 4.7032 0.781808 5.091 1.24256L8.00777 4.70806C8.53906 5.3393 8.09032 6.30353 7.26525 6.30353L1.4317 6.30353C0.606637 6.30353 0.157892 5.33931 0.689181 4.70807L3.60595 1.24256Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <span>${unit}</span>
            ${ isProcesses ?
            `<div class="lca-viz-special-text-container-2">
                  <div class="lca-viz-special-text-2 lca-viz-active-st">
                    <div class="lca-viz-up-down-btn-container">
                      <div class="lca-viz-active lca-viz-up-down-btn lca-viz-down">
                        <svg width="100%" height="100%" viewBox="0 0 9 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.09107 5.74914C4.70327 6.20989 3.99382 6.20989 3.60602 5.74914L0.689251 2.28363C0.157962 1.65239 0.606707 0.688168 1.43177 0.688168L7.26532 0.688168C8.09039 0.688168 8.53913 1.65239 8.00784 2.28363L5.09107 5.74914Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <input class="lca-viz-parameter-text" id="${paramId}" type="number" value="${defaultVal}">
                      <div class="lca-viz-active lca-viz-up-down-btn lca-viz-up">
                        <svg width="100%" height="100%" viewBox="0 0 9 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.60595 1.24256C3.99375 0.781809 4.7032 0.781808 5.091 1.24256L8.00777 4.70806C8.53906 5.3393 8.09032 6.30353 7.26525 6.30353L1.4317 6.30353C0.606637 6.30353 0.157892 5.33931 0.689181 4.70807L3.60595 1.24256Z" fill="currentColor"/>
                        </svg>
                      </div>
                    </div>
                  </div>
              </div>
              <span>${unit2}</span>`
              :
              ``
            }
          </div>
        </div>
  `;
  return paramDiv;
}

/**
   * Shows an element. Only works with flex and block elements
   * @param {element} element The element to be shown
   * @param {*} version The animation style. If no version is given, use the default style
   */
function showElement(element, version) {
  if (version === "a") {
    if (element.classList.contains("flex-center")) {
      element.style.display = "flex";
    } else {
      element.style.display = "block";
    }
    requestAnimationFrame(() => {
      element.classList.remove("hidden-a");
      element.classList.add("visible-a");
    });
  } else if (version === "b") {
    if (element.classList.contains("flex-center")) {
      element.style.display = "flex";
    } else {
      element.style.display = "block";
    }
    requestAnimationFrame(() => {
      element.classList.remove("hidden-b");
      element.classList.add("visible-b");
    });
  }
}


// Handles the alternation of different reference units
// (i.e. alternating between "~ kg of trash burned", "~ of miles driven", and "~ of trees cut down" every 3 seconds)
function handleUnitDivChange() {
  const unitDivs = document.querySelectorAll('.lca-viz-unit-div');

  // Index to track the current div to show
  let currentIndex = 0;

  function showNextUnitDiv() {
    const currentDiv = unitDivs[currentIndex];
    currentDiv.classList.remove('show');
    currentDiv.classList.add('hide');

    currentIndex = ( (currentIndex + 1) % unitDivs.length);
    const nextDiv = unitDivs[currentIndex];

    setTimeout(() => {
      nextDiv.classList.remove('hide');
      nextDiv.classList.add('show');
    }, 500);
  }

  // Initially show the first unit-div
  unitDivs[0].classList.add('show');

  setInterval(showNextUnitDiv, 5000);
}

function setupChart() {
  const chartConfig = getCarbonData("Hello");
  const canvas = document.getElementById('lca-viz-carbon-chart');
  Chart.defaults.font.family = "Lexend";
  new Chart(canvas, {
    type: 'bar',
    data: chartConfig.data,
    options: chartConfig.options
  });
}

function getCarbonData(legendTitle) {
  // This is the dummy data
  const cData = [
    {
      "name": "Copper foil",
      "emissions": "0.97",
      "emissions_factor": "0.97"
    },
    {
      "name": "Vitrimer polymer",
      "emissions": "2.5",
      "emissions_factor": "2.5",
    },
    {
      "name": "Epoxy (EPON 828)",
      "emissions": "0.2",
      "emissions_factor": "0.2",
    },
    {
      "name": "Adipic acid",
      "emissions": "0.1",
      "emissions_factor": "0.1",
    },
    {
      "name": "1,5,7-triazabicyclo[4.4.0]dec-5-ene (TBD)",
      "emissions": "3.24",
      "emissions_factor": "3.24"
    },
    {
      "name": "Woven glass fibre sheets",
      "emissions": "9.1",
      "emissions_factor": "9.1"
    }
  ];

  const labels = cData.map(item => item.name);
  const chartData = {
    labels: labels,
    datasets: [{
      axis: 'y',
      label: 'Estimated Carbon Emissions (kg CO2-eq)',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        font: {
          size: 14,
          family: 'Lexend',  // Set 'Lexend' font for the y-axis title
          weight: 'bold'
        },
        ticks: {
          callback: function (value) {
              // truncate the labels only in this axis
              const lbl = this.getLabelForValue(value);
              if (typeof lbl === 'string' && lbl.length > 36) {
                  return `${lbl.substring(0, 36)}...`;
              }
              return lbl;
          },
        },
      }
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Lexend'
          }
        },
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Estimated Emissions: ${tooltipItem.raw} kg CO2-eq`; // Add unit in tooltip
          }
        }
      }
    },
    indexAxis: 'y',
  };
  return { data: chartData, options: options };
}

document.addEventListener('mouseup', async () => {
  const selection = window.getSelection();
  if (selection.toString().length > 0) {
    console.log("Highlighting something...");
    const range = selection.getRangeAt(0);
    const highlightedNode = range.commonAncestorContainer;
  }
});

function handleYesNoButton() {
  let yesButton = document.querySelector('.lca-viz-yes-button');
  let noButton = document.querySelector('.lca-viz-no-button');
  yesButton.addEventListener('click', () => {
    noButton.classList.remove('selected');
    yesButton.classList.add('selected');
  });
  noButton.addEventListener('click', () => {
    yesButton.classList.remove('selected');
    noButton.classList.add('selected');
  });
}



// let submitMap = document.getElementById('map-submit');
// submitMap.addEventListener('click', async () => {
//   try {
//     const response = await fetch('https://lca-server-api.fly.dev/post-google-maps-air', {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//     });
//     if (response.ok) {
//       injectGoogleMaps("air");
//       injectGoogleMaps("ground");
//     } else {
//       console.error('Failed to send data');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// })

function createUpDownBtn(element, parameter) {
  const upDownBtn = `
        <div class="lca-viz-special-text-container-2">
          <div class="lca-viz-special-text-intext lca-viz-active-st">
            <span id="lca-viz-parameter-2">${parameter}</span>
            <div class="lca-viz-up-down-btn-container-intext flex-column">
              <div class="lca-viz-active lca-viz-up-down-btn" id="up">
                <svg width="100%" height="100%" viewBox="0 0 9 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.60595 1.24256C3.99375 0.781809 4.7032 0.781808 5.091 1.24256L8.00777 4.70806C8.53906 5.3393 8.09032 6.30353 7.26525 6.30353L1.4317 6.30353C0.606637 6.30353 0.157892 5.33931 0.689181 4.70807L3.60595 1.24256Z" fill="currentColor"/>
                </svg>
              </div>
              <div class="lca-viz-active lca-viz-up-down-btn" id="down">
                <svg width="100%" height="100%" viewBox="0 0 9 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.09107 5.74914C4.70327 6.20989 3.99382 6.20989 3.60602 5.74914L0.689251 2.28363C0.157962 1.65239 0.606707 0.688168 1.43177 0.688168L7.26532 0.688168C8.09039 0.688168 8.53913 1.65239 8.00784 2.28363L5.09107 5.74914Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
  `;
  element.innerHTML = upDownBtn;
}

function injectGoogleMaps(mode) {
  const iframe = document.createElement("iframe");
  let mapsContainer;
  if (mode === "air") {
    console.log("INJECTING AIR MAP");
    iframe.src = "https://lca-server-api.fly.dev/air-map.html"; // URL of the hosted iframe
    iframe.id = "lca-viz-air-map";
    mapsContainer = document.querySelector(".google-maps-air");
    console.log("mapsContainer: ", mapsContainer);
  }
  if (mode === "ground") {
    iframe.src = "https://lca-server-api.fly.dev/ground-map.html"; // URL of the hosted iframe
    iframe.id = "lca-viz-ground-map";
    console.log("INJECTING GROUND MAP");
    mapsContainer = document.querySelector(".google-maps-ground");
    console.log("mapsContainer: ", mapsContainer);
  }

  iframe.style.width = "350px";
  iframe.style.height = "170px";
  iframe.style.border = "none";
  iframe.style.overflow = "hidden";
  iframe.scrolling = "no";

  mapsContainer.appendChild(iframe);
}

function reloadIframe(iframeId) {
  const iframe = document.getElementById(iframeId);
  if (iframe) {
    console.log("iframe found");
    iframe.src = iframe.src; // This reloads the iframe by resetting its src attribute
  } else {
    console.log("iframe not found.");
  }
}



// setTimeout(() => {
//   reloadIframe("lca-viz-air-map");
//   reloadIframe("lca-viz-ground-map");
// }, 1000);


const data = {
  "co2e": 217,
  "co2e_unit": "kg",
  "distance_km": 1231,
  "route": [
    {
      "type": "location",
      "name": "Seattle, WA, United States",
      "confidence_score": 1
    },
    {
      "type": "leg",
      "co2e": 0.2105,
      "co2e_unit": "kg",
      "co2e_calculation_method": "ipcc_ar4_gwp100",
      "source_trail": [
        {
          "data_category": "emission_factor",
          "name": "Road freight - General",
          "source": "GLEC",
          "source_dataset": "Default Fuel Efficiency and CO2e Intensity Factors",
          "year": "2019",
          "region": "N_AMERICA",
          "region_name": "North America"
        }
      ],
      "transport_mode": "road",
      "distance_km": 21.82,
      "estimates": [
        {
          "co2e": 0.036,
          "co2e_unit": "kg",
          "co2e_calculation_method": "ar4",
          "co2e_calculation_origin": "source",
          "emission_factor": {
            "name": "Road freight - General",
            "activity_id": "freight_vehicle-vehicle_type_general-fuel_source_na-vehicle_weight_na-distance_uplift_included",
            "id": "f3135d4d-1c31-46f3-99d6-3741fd3ae888",
            "access_type": "public",
            "source": "GLEC",
            "source_dataset": "Default Fuel Efficiency and CO2e Intensity Factors",
            "year": 2019,
            "region": "N_AMERICA",
            "category": "Road Freight",
            "source_lca_activity": "well_to_tank",
            "data_quality_flags": []
          },
          "constituent_gases": {
            "co2e_total": 0.036,
            "co2e_other": null,
            "co2": null,
            "ch4": null,
            "n2o": null
          },
          "activity_data": {
            "activity_value": 2.182,
            "activity_unit": "tonne-km"
          },
          "audit_trail": "enabled"
        },
        {
          "co2e": 0.1745,
          "co2e_unit": "kg",
          "co2e_calculation_method": "ar4",
          "co2e_calculation_origin": "source",
          "emission_factor": {
            "name": "Road freight - General",
            "activity_id": "freight_vehicle-vehicle_type_general-fuel_source_na-vehicle_weight_na-distance_uplift_included",
            "id": "b9ad6563-5a8c-434f-a619-f2698c34f2b6",
            "access_type": "public",
            "source": "GLEC",
            "source_dataset": "Default Fuel Efficiency and CO2e Intensity Factors",
            "year": 2019,
            "region": "N_AMERICA",
            "category": "Road Freight",
            "source_lca_activity": "tank_to_wheel",
            "data_quality_flags": []
          },
          "constituent_gases": {
            "co2e_total": 0.1745,
            "co2e_other": null,
            "co2": null,
            "ch4": null,
            "n2o": null
          },
          "activity_data": {
            "activity_value": 2.182,
            "activity_unit": "tonne-km"
          },
          "audit_trail": "enabled"
        }
      ]
    },
    {
      "type": "location",
      "name": "Seattle–Tacoma International Airport",
      "confidence_score": null
    },
    {
      "type": "leg",
      "co2e": 216.5,
      "co2e_unit": "kg",
      "co2e_calculation_method": "ipcc_ar4_gwp100",
      "source_trail": [
        {
          "data_category": null,
          "name": "Radiative Forcing uplift",
          "source": "The International Journal of Life Cycle Assessment",
          "source_dataset": "Jungbluth, N., Meili, C. Recommendations for calculation of the global warming potential of aviation including the radiative forcing index. Int J Life Cycle Assess 24, 404–411 (2019). https://doi.org/10.1007/s11367-018-1556-3",
          "year": null,
          "region": "GLOBAL",
          "region_name": "Global"
        },
        {
          "data_category": "emission_factor",
          "name": "Medium haul air freight (1000-3700 km) - EN16258",
          "source": "GLEC",
          "source_dataset": "Default Fuel Efficiency and CO2e Intensity Factors",
          "year": "2019",
          "region": "GLOBAL",
          "region_name": "Global"
        }
      ],
      "transport_mode": "air",
      "distance_km": 1177,
      "estimates": [
        {
          "co2e": 216.5,
          "co2e_unit": "kg",
          "co2e_calculation_method": "ar4",
          "co2e_calculation_origin": "source",
          "emission_factor": {
            "name": "Medium haul air freight (1000-3700 km) - EN16258",
            "activity_id": "freight_flight-route_type_na-distance_medium_haul_gt_1000km_lt_3700km-weight_na-rf_excluded-method_en16258-aircraft_type_na-distance_uplift_excluded",
            "id": "a2358f34-c4d4-43e7-9200-860ea485b361",
            "access_type": "public",
            "source": "GLEC",
            "source_dataset": "Default Fuel Efficiency and CO2e Intensity Factors",
            "year": 2019,
            "region": "GLOBAL",
            "category": "Air Freight",
            "source_lca_activity": "well_to_wheel",
            "data_quality_flags": []
          },
          "constituent_gases": {
            "co2e_total": 216.5,
            "co2e_other": null,
            "co2": null,
            "ch4": null,
            "n2o": null
          },
          "activity_data": {
            "activity_value": 235.3,
            "activity_unit": "tonne-km"
          },
          "audit_trail": "enabled"
        }
      ]
    },
    {
      "type": "location",
      "name": "Metropolitan Oakland International Airport",
      "confidence_score": null
    },
    {
      "type": "leg",
      "co2e": 0.3161,
      "co2e_unit": "kg",
      "co2e_calculation_method": "ipcc_ar4_gwp100",
      "source_trail": [
        {
          "data_category": "emission_factor",
          "name": "Road freight - General",
          "source": "GLEC",
          "source_dataset": "Default Fuel Efficiency and CO2e Intensity Factors",
          "year": "2019",
          "region": "N_AMERICA",
          "region_name": "North America"
        }
      ],
      "transport_mode": "road",
      "distance_km": 32.76,
      "estimates": [
        {
          "co2e": 0.05405,
          "co2e_unit": "kg",
          "co2e_calculation_method": "ar4",
          "co2e_calculation_origin": "source",
          "emission_factor": {
            "name": "Road freight - General",
            "activity_id": "freight_vehicle-vehicle_type_general-fuel_source_na-vehicle_weight_na-distance_uplift_included",
            "id": "f3135d4d-1c31-46f3-99d6-3741fd3ae888",
            "access_type": "public",
            "source": "GLEC",
            "source_dataset": "Default Fuel Efficiency and CO2e Intensity Factors",
            "year": 2019,
            "region": "N_AMERICA",
            "category": "Road Freight",
            "source_lca_activity": "well_to_tank",
            "data_quality_flags": []
          },
          "constituent_gases": {
            "co2e_total": 0.05405,
            "co2e_other": null,
            "co2": null,
            "ch4": null,
            "n2o": null
          },
          "activity_data": {
            "activity_value": 3.276,
            "activity_unit": "tonne-km"
          },
          "audit_trail": "enabled"
        },
        {
          "co2e": 0.2621,
          "co2e_unit": "kg",
          "co2e_calculation_method": "ar4",
          "co2e_calculation_origin": "source",
          "emission_factor": {
            "name": "Road freight - General",
            "activity_id": "freight_vehicle-vehicle_type_general-fuel_source_na-vehicle_weight_na-distance_uplift_included",
            "id": "b9ad6563-5a8c-434f-a619-f2698c34f2b6",
            "access_type": "public",
            "source": "GLEC",
            "source_dataset": "Default Fuel Efficiency and CO2e Intensity Factors",
            "year": 2019,
            "region": "N_AMERICA",
            "category": "Road Freight",
            "source_lca_activity": "tank_to_wheel",
            "data_quality_flags": []
          },
          "constituent_gases": {
            "co2e_total": 0.2621,
            "co2e_other": null,
            "co2": null,
            "ch4": null,
            "n2o": null
          },
          "activity_data": {
            "activity_value": 3.276,
            "activity_unit": "tonne-km"
          },
          "audit_trail": "enabled"
        }
      ]
    },
    {
      "type": "location",
      "name": "San Francisco, CA, United States",
      "confidence_score": 1
    }
  ],
  "notices": [
    {
      "message": "95km has been added to the actual flight distance for maneuvering in accordance with the EN16258 methodology requirements.",
      "code": "distance_added",
      "severity": "info",
      "leg_index": 1
    },
    {
      "message": "Estimate multiplied by a Radiative Forcing Index of 2. This value accounts for the fact that greenhouse gases emitted at higher altitudes contribute more to global warming.",
      "code": "radiative_forcing_applied",
      "severity": "info",
      "leg_index": 1
    }
  ]
};







getChartConfig();

function getChartConfig() {
  // This is the dummy data
  // const cData = currentChartData;
  const currentChartData = {
    "raw_materials": {
      "related_materials": [
        {
          "ratio": [
            {
              "name": "PDMS prepolymer",
              "ratio_value": 10,
              "unit": "g",
              "ratio_value_source": "present",
              "unit_source": "inferred",
              "carbon_emission_factor": "1.5 g CO₂-eq per g"
            },
            {
              "name": "curing agent",
              "ratio_value": 1,
              "unit": "g",
              "ratio_value_source": "present",
              "unit_source": "inferred",
              "carbon_emission_factor": "2.0 g CO₂-eq per g"
            },
            {
              "name": "1,5,7-triazabicyclo[4.4.0]dec-5-ene",
              "ratio_value": 5,
              "unit": "g",
              "ratio_value_source": "present",
              "unit_source": "inferred",
              "carbon_emission_factor": "2.33 g CO₂-eq per g"
            },
          ]
        }
      ],
      "independent_materials": [
        {
          "name": "PET substrate",
          "amount": 2,
          "unit": "g",
          "amount_source": "present",
          "unit_source": "present",
          "carbon_emission_factor": "2.5 g CO₂-eq per g"
        },
        {
          "name": "copper foil",
          "amount": 1,
          "unit": "g",
          "amount_source": "present",
          "unit_source": "present",
          "carbon_emission_factor": "0.97 g CO₂-eq per g"
        },
        {
          "name": "glycerin",
          "amount": 1,
          "unit": "g",
          "amount_source": "present",
          "unit_source": "present",
          "carbon_emission_factor": "2.6 g CO₂-eq per g"
        },
        {
          "name": "lithium-ion battery",
          "amount": 1,
          "unit": "kg",
          "amount_source": "present",
          "unit_source": "present",
          "carbon_emission_factor": "0.23 kg CO₂-eq per kg"
        },
      ]
    },
    "processes": [
      {
        "name": "atmospheric pressure plasma treatment",
        "power": 60,
        "power_unit": "W",
        "time": 600,
        "time_unit": "s",
        "power_source": "present",
        "time_source": "present",
        "energy": 0.01,
        "energy_unit": "kWh",
        "energy_source": "calculated",
        "carbon_emission_factor": "431 g CO₂-eq per kWh"
      }
    ]
  };
  console.log('currentChartData = ');
  console.dir(currentChartData);
  const cData = extractNameAndEmissions(currentChartData);
  console.log('cData = ');
  console.dir(cData);

  const rawLabels = cData.map(item => item.name);
  const emissionsData = cData.map(item => item.emissions);
  console.log("rawLabels = " + rawLabels);
  console.log("emissionsData = " + emissionsData);
}

function extractNameAndEmissions(data) {
  const results = [];
  // Process raw materials - related materials ratios
  if (data.raw_materials?.related_materials) {
    data.raw_materials.related_materials.forEach(material => {
      if (material.ratio) {
        material.ratio.forEach(item => {
          results.push({
            name: item.name,
            emissions: extractEmissionsFactor(item.carbon_emission_factor).co2e_value
          });
        });
      }
    });
  }
  // Process raw materials - independent materials
  if (data.raw_materials?.independent_materials) {
    data.raw_materials.independent_materials.forEach(item => {
      results.push({
        name: item.name,
        emissions: extractEmissionsFactor(item.carbon_emission_factor).co2e_value
      });
    });
  }
  // Process processes
  if (data.processes) {
    data.processes.forEach(process => {
      results.push({
        name: process.name,
        emissions: extractEmissionsFactor(process.carbon_emission_factor).co2e_value
      });
    });
  }
  return results;
}

export function extractEmissionsFactor(emissionsString) {
  const parts = emissionsString.split(' ');
  let co2e_value = parseFloat(parts[0]);
  let co2e_unit = parts[1];
  let material_unit = parts[4];

  // co2e_unit must be in 'g'. If not, convert it to 'g'.
  if (co2e_unit === 'kg') {
    co2e_value = co2e_value * 1000;
    co2e_unit = 'g';
  }

  const resultObj = {
    "co2e_value": co2e_value,
    "co2e_unit": co2e_unit,
    "material_unit": material_unit
  }
  return resultObj;
}