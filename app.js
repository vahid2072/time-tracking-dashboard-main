const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");
const timeSpend = document.querySelectorAll(".time-spend");
const previousTime = document.querySelectorAll(".previous-time");

// Function to update time information based on the selected button and JSON data
function updateInfo(data, timeframe) {
  data.forEach((category, index) => {
    const currentTimeframe = category.timeframes[timeframe];
    timeSpend[index].textContent = `${currentTimeframe.current}hrs`;
    previousTime[index].textContent = `Previous - ${currentTimeframe.previous}hrs`;
  });
}

function handleButtonClick(button, timeframe) {
  // Remove the 'active' class from all buttons
  [dailyBtn, weeklyBtn, monthlyBtn].forEach(btn => btn.classList.remove('active'));

  // Add the 'active' class to the clicked button
  button.classList.add('active');

  // Update the information based on the selected timeframe
  updateInfo(data, timeframe);
}

// Fetch the JSON data asynchronously
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    dailyBtn.addEventListener("click", function () {
      updateInfo(data, "daily");
      handleButtonClick(this, "daily");
    });

    weeklyBtn.addEventListener("click", function () {
      updateInfo(data, "weekly");
      handleButtonClick(this, "weekly");
    });

    monthlyBtn.addEventListener("click", function () {
      updateInfo(data, "monthly");
      handleButtonClick(this, "monthly");
    });

    // Initialize with default values (use 'weekly' as the initial timeframe)
    updateInfo(data, "weekly");
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
