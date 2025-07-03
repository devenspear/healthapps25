import { DayEntry, Task } from '../types';

const generateTasks = (day: number): Task[] => {
  const baseTasks: Task[] = [
    {
      id: `${day}-morning`,
      time: "Morning",
      description: "1–20 drops Black Walnut (empty stomach)",
      completed: false
    },
    {
      id: `${day}-midday`,
      time: "Midday",
      description: "500–1000 mg Wormwood (pre‑lunch)",
      completed: false
    },
    {
      id: `${day}-evening`,
      time: "Evening",
      description: "500 mg Clove (after dinner)",
      completed: false
    }
  ];

  // Add additional supplements based on phase
  if (day >= 8) {
    baseTasks.push({
      id: `${day}-bedtime`,
      time: "Bedtime",
      description: "1 tbsp Diatomaceous Earth OR Bentonite Clay",
      completed: false
    });
  }

  if (day >= 1) {
    baseTasks.push({
      id: `${day}-fasted`,
      time: "AM (fasted)",
      description: "120,000 SU Serrapeptase",
      completed: false
    });
    
    baseTasks.push({
      id: `${day}-dinner`,
      time: "Dinner",
      description: "25 mg Zinc",
      completed: false
    });
    
    baseTasks.push({
      id: `${day}-daily`,
      time: "Daily",
      description: "1g Vitamin C (twice daily)",
      completed: false
    });
  }

  if (day >= 22) {
    baseTasks.push({
      id: `${day}-rebuild-am`,
      time: "AM",
      description: "50B CFU Probiotic",
      completed: false
    });
    
    baseTasks.push({
      id: `${day}-rebuild-pm`,
      time: "PM",
      description: "5g L-Glutamine",
      completed: false
    });
  }

  return baseTasks;
};

export const cleanseCalendar: DayEntry[] = Array.from({ length: 28 }, (_, index) => {
  const day = index + 1;
  const week = Math.ceil(day / 7);
  
  let phase = "";
  if (day <= 7) phase = "Priming";
  else if (day <= 14) phase = "Kill - Phase 1";
  else if (day <= 21) phase = "Kill - Phase 2";
  else phase = "Rebuild";

  return {
    day,
    week,
    title: `Day ${day} — Week ${week}: ${phase}`,
    phase,
    tasks: generateTasks(day),
    completed: false
  };
}); 