const globals = {
  // NOTE Address of server, change this when deployed
  API_ADDRESS: 'http://localhost:3003',
  XXS_BREAKPOINT: '320px',
  XS_BREAKPOINT: '480px',
  SM_BREAKPOINT: '768px',
  MD_BREAKPOINT: '992px',
  LG_BREAKPOINT: '1200px',
  PERIODS: {
    I: 0,
    II: 1,
    III: 2,
    IV: 3,
    V: 4,
    summer: 5,
  },
  PASSING_MECHANISMS: {
    EXERCISES: 'Exercises',
    EXAM: 'Exam',
    GROUP_WORK: 'Group work',
    LECTURE_DIARIES: 'Lecture diaries',
    ASSIGNMENT: 'Assignment',
    LAB_ASSIGNMENT: 'Lab assignment',
  },
  SORT_OPTIONS: {
    COURSENAME_ASC: 'course name A→Z',
    COURSENAME_DESC: 'course name Z→A',
    RATINGS_ASC: 'user ratings 1→5',
    RATINGS_DESC: 'user ratings 5→1',
    WORKLOAD_ASC: 'workload 1→5',
    WORKLOAD_DESC: 'workload 5→1',
  },
};

export default globals;
