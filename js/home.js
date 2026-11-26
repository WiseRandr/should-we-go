// Author: Wise Randriamialison
// Student number: n10035720

const activitySelect = document.getElementById("activity-select");
const daySelect = document.getElementById("day-select");

const activities = [
  { id: "hiking", title: "Hiking" },
  { id: "cycling", title: "Cycling" },
  { id: "picnic", title: "Picnic" },
  { id: "outdoor-photography", title: "Outdoor Photography" },
  { id: "running", title: "Running" },
  { id: "camping", title: "Camping" },
  { id: "beach-day", title: "Beach Day" },
  { id: "walking", title: "Walking" },
];

const totalDays = 7;

activities.forEach((activity) => {
  const option = document.createElement("option");
  option.value = activity.id;
  option.textContent = activity.title;
  activitySelect.appendChild(option);
});

for (let i = 0; i < totalDays; i++) {
  const option = document.createElement("option");
  option.value = i;

  if (i === 0) {
    option.textContent = "Today";
  } else if (i === 1) {
    option.textContent = "Tomorrow";
  } else {
    option.textContent = `In ${i} days`;
  }

  daySelect.appendChild(option);
}
