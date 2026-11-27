// Author: Wise Randriamialison
// Student number: n10035720

const PLANS_KEY = "plans";

const STORAGE = {
  // Read a value from localStorage (null if nothing is saved under that key)
  get: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value === null ? null : JSON.parse(value);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },

  // Save any value (array, object, number...) to localStorage
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

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

  getPlans: async () => {
    const savedPlans = STORAGE.get(PLANS_KEY);

    if (savedPlans !== null) {
      return { plans: savedPlans, error: null };
    }

    // First visit: fill localStorage with the starting plans from data/plans.json
    try {
      const response = await fetch("data/plans.json");

      if (!response.ok) {
        throw new Error("Could not load the saved plans. Please refresh the page.");
      }

      const json = await response.json();
      STORAGE.set(PLANS_KEY, json.plans);
      return { plans: json.plans, error: null };
    } catch (error) {
      console.log(error.message);
      return { plans: [], error: "Could not load the saved plans. Please refresh the page." };
    }
  },

  savePlan: async (plan) => {
    const { plans, error } = await STORAGE.getPlans();

    if (error) {
      return { plans, error };
    }

    // Only one plan per activity per day: same id = update the existing plan
    const exists = plans.some((item) => item.id === plan.id);

    const updatedPlans = exists
      ? plans.map((item) => (item.id === plan.id ? { ...item, ...plan } : item))
      : [...plans, plan];

    STORAGE.set(PLANS_KEY, updatedPlans);
    return { plans: updatedPlans, error: null };
  },

  deletePlan: async (id) => {
    const { plans, error } = await STORAGE.getPlans();

    if (error) {
      return { plans, error };
    }

    const updatedPlans = plans.filter((plan) => plan.id !== id);
    STORAGE.set(PLANS_KEY, updatedPlans);
    return { plans: updatedPlans, error: null };
  },
};

export default STORAGE;
