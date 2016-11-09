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

db.courses.insert({
  name: "Advanced Operations Management",
  code: "TU-E2020",
  myCoursesLink: 'https://mycourses.aalto.fi/course/view.php?id=14946',
  mandatoryAttendance: true,
  passingMechanisms: ['Group work', 'Exam', 'Assignment'],
  credits: 5,
  periods: ['II'],
  school: 'Department of Industrial Engineering and Management',
});

db.courses.insert({
  name: "Advanced Project-Based Management",
  code: "TU-E2030",
  myCoursesLink: 'https://mycourses.aalto.fi/course/view.php?id=14947',
  mandatoryAttendance: false,
  passingMechanisms: ['Group work', 'Exam'],
  credits: 5,
  periods: ['I-II'],
  school: 'Department of Industrial Engineering and Management',
});

db.courses.insert({
  name: "Managing External Resources",
  code: "TU-E2040",
  myCoursesLink: 'https://mycourses.aalto.fi/course/view.php?id=14948',
  mandatoryAttendance: false,
  passingMechanisms: ['Group work', 'Assignment', 'Exam'],
  credits: 5,
  periods: ['I'],
  school: 'Department of Industrial Engineering and Management',
});

db.courses.insert({
  name: "Financial Engineering I",
  code: "TU-E2210",
  myCoursesLink: 'https://mycourses.aalto.fi/course/view.php?id=4633',
  mandatoryAttendance: false,
  passingMechanisms: ['Group work', 'Exam'],
  credits: 5,
  periods: ['IV-V'],
  school: 'Department of Industrial Engineering and Management',
});

db.courses.insert({
  name: "Introduction to Industrial Internet",
  code: "CSE-E4670",
  myCoursesLink: 'https://mycourses.aalto.fi/course/view.php?id=4633',
  mandatoryAttendance: false,
  passingMechanisms: ['Group work'],
  credits: 5,
  periods: ['IV-V'],
  school: 'Department of Computer Science',
});
