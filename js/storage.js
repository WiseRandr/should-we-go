import baseActivities from "../data/activities.json";

const STORAGE = {
  getActivities: () => {
    const activities = baseActivities.activities;
    return activities;
  },
};

export default STORAGE;
