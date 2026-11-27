// Author: Wise Randriamialison
// Student number: n10035720

const STORAGE = {
  getActivities: async () => {
    try {
      const response = await fetch("data/activities.json");

      if (!response.ok) {
        throw new Error("Could not load the activities. Please refresh the page.");
      }

      const json = await response.json();
      return { activities: json.activities, error: null };
    } catch (error) {
      console.log(error.message);
      return { activities: [], error: "Could not load the activities. Please refresh the page." };
    }
  },
};

export default STORAGE;
