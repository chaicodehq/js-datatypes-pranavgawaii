export function generateReportCard(student) {
  if (!student || !student.name || typeof student.name !== 'string' || !student.name.trim()) {
    return null;
  }
  if (!student.marks || Object.keys(student.marks).length === 0) {
    return null;
  }

  const marks = Object.values(student.marks);
  const entries = Object.entries(student.marks);

  for (const mark of marks) {
    if (typeof mark !== 'number' || mark < 0 || mark > 100) return null;
  }

  const totalMarks = marks.reduce((sum, m) => sum + m, 0);
  const subjectCount = marks.length;
  const percentage = parseFloat(((totalMarks / (subjectCount * 100)) * 100).toFixed(2));

  let grade;
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 40) grade = "D";
  else grade = "F";

  let highestSubject = entries[0][0];
  let highestMark = entries[0][1];
  let lowestSubject = entries[0][0];
  let lowestMark = entries[0][1];

  entries.forEach(([sub, mark]) => {
    if (mark > highestMark) {
      highestMark = mark;
      highestSubject = sub;
    }
    if (mark < lowestMark) {
      lowestMark = mark;
      lowestSubject = sub;
    }
  });

  const passedSubjects = entries.filter(([_, m]) => m >= 40).map(([s]) => s);
  const failedSubjects = entries.filter(([_, m]) => m < 40).map(([s]) => s);

  return {
    name: student.name,
    totalMarks,
    percentage,
    grade,
    highestSubject,
    lowestSubject,
    passedSubjects,
    failedSubjects,
    subjectCount
  };
}
