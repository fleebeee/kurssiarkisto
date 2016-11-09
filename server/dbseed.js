use kurssiarkisto

db.dropDatabase();

db.courses.insert({
  name: "Design of WWW Services",
  code: "CS-E4400",
  myCoursesLink: 'https://mycourses.aalto.fi/course/view.php?id=13065',
  mandatoryAttendance: false,
  passingMechanisms: ['Group work'],
  credits: 5,
  periods: ['I-II'],
  school: 'Department of Computer Science',
});

db.courses.insert({
  name: "Web Services",
  code: "CS-E4430",
  myCoursesLink: 'https://mycourses.aalto.fi/course/view.php?id=13068',
  mandatoryAttendance: false,
  passingMechanisms: ['Assignment'],
  credits: 4,
  periods: ['I-II'],
  school: 'Department of Computer Science',
});

db.courses.insert({
  name: "Machine Learning: Basic Principles",
  code: "CS-E3210",
  myCoursesLink: 'https://mycourses.aalto.fi/course/view.php?id=13034',
  mandatoryAttendance: false,
  passingMechanisms: ['Group work', 'Exam'],
  credits: 5,
  periods: ['I-II'],
  school: 'Department of Computer Science',
});

db.courses.insert({
  name: "User Interface Construction",
  code: "CS-E5220",
  myCoursesLink: 'https://mycourses.aalto.fi/course/view.php?id=13112',
  mandatoryAttendance: false,
  passingMechanisms: ['Group work', 'Exam'],
  credits: 5,
  periods: ['II'],
  school: 'Department of Computer Science',
});

db.courses.insert({
  name: "Games Now!",
  code: "DOM-E5089",
  myCoursesLink: 'https://mycourses.aalto.fi/course/view.php?id=13322',
  mandatoryAttendance: true,
  passingMechanisms: [],
  credits: 3, // NOTE Actually 3-5
  periods: ['I-V'],
  school: 'Department of Media',
});
