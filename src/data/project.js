const IMG = {
  reading: new URL("../assets/images/project-reading.png", import.meta.url).href,
  housing: new URL("../assets/images/project-housing.png", import.meta.url).href,
  pomodoro: new URL("../assets/images/project-pomodoro.png", import.meta.url).href,
  eltrack: new URL("../assets/images/project-eltrack.png", import.meta.url).href,
  shop: new URL("../assets/images/project-shop.png", import.meta.url).href,
  loomi: new URL("../assets/images/project_Loomi.png", import.meta.url).href,
  recepi: new URL("../assets/images/project_recepi.png", import.meta.url).href,
  taskTracker: new URL("../assets/images/project_TaskTracker.png", import.meta.url).href,
};

export const PROJECTS = [
  {
    title: "Nalleta",
    tech: ["Flutter", "GooleBookAPI", "Supabase"],
    description:
      "An all-in-one reading app to track books, save notes and quotes, and stay focused while reading.",
    image: IMG.reading,
    github: "https://github.com/Shal1964/ReadingLog.git",
  },
  {
    title: "Housing Platform",
    tech: ["React", "Node.js", "MySQL"],
    description:
      "A housing platform that helps users find, compare, and save rental properties based on their preferences.",
    image: IMG.housing,
    github: "",
  },
  {
    title: "Focus Timer",
    tech: ["React", "JavaScript", "CSS", "Vercel"],
    description:
      "A gamified focus timer with themes, EXP rewards, music, and a to-do list to make studying more engaging.",
    image: IMG.pomodoro,
    github: "https://github.com/AnnisaAulia12/PomodoroTimer.git",
    website: "https://pomodoro-quest.vercel.app/",
  },
  {
    title: "Loomi Photobooth",
    tech: ["React", "Node.js", "Tailwin CSS" ,"livekit", "MediaPipe", "Vercel"],
    description:
      "A collaborative online photobooth where users can create and customize photos with frames, stickers, text overlays, and visual effects while collaborating in real time.",
    image: IMG.loomi,
    github:
      "https://github.com/AnnisaAulia12/LOOMI---Collaborative-Real-Time-Online-Photobooth",
    website: "https://loomi-web-photobooth-jjje.vercel.app/",
  },
  {
    title: "Task Tracker",
    tech: ["React", "Python", "FastAPI", "PostgreSQL", "SQLALchemy"],
    description:
      "A full-stack task management application built to help users organize daily activities, manage deadlines, and track task progress efficiently. Features user authentication, personalized task management, status categorization, and calendar-based task organization. Developed using React, Python FastAPI, and PostgreSQL.",
    image: IMG.taskTracker,
    github: "https://github.com/AnnisaAulia12/TaskTracker.git",
     website: "https://task-tracker-qsim.vercel.app",
  },
  {
    title: "Eltrack",
    tech: ["Flutter", "Dart", "Supabase"],
    description:
      "A waste management app that helps users understand waste categories and manage disposal more easily.",
    image: IMG.eltrack,
    github: "https://github.com/AnnisaAulia12/Eltrack.git",
  },
  {
    title: "Recepi",
    tech: ["Flutter", "geolocator/geocoding", "TheMealDB API", "OpenWhetaerMapAPI", "PHP", "MySQL"],
    description:
      "A mobile app that recommends recipes based on weather conditions and available ingredients, helping users discover suitable meals and ingredient alternatives.",
    image: IMG.recepi,
  },
  {     
    title: "Shopping App",
    tech: ["Flutter", "Dart", "Google Auth"],
    description:
      "A simple shopping app for managing products, with Google authentication and light/dark mode.",
    image: IMG.shop,
    github: "https://github.com/silmiz/HonkaiStarRetail.git",
  },
];
