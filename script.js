document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gpa-form');
    const courseTable = document.getElementById('course-table').getElementsByTagName('tbody')[0];
    const addCourseButton = document.getElementById('add-course');
    const calculateGPAButton = document.getElementById('calculate-gpa');
    const resetButton = document.getElementById('reset');
    const gpaResult = document.getElementById('gpa-result');
  
    let courses = [];
  
    // Add course to the table
    addCourseButton.addEventListener('click', () => {
      const courseName = document.getElementById('course-name').value;
      const creditHours = parseFloat(document.getElementById('credit-hours').value);
      const grade = parseFloat(document.getElementById('grade').value);
  
      if (courseName && creditHours && !isNaN(grade)) {
        const course = { courseName, creditHours, grade };
        courses.push(course);
  
        // Add row to the table
        const row = courseTable.insertRow();
        row.innerHTML = `
          <td>${courseName}</td>
          <td>${creditHours}</td>
          <td>${grade.toFixed(1)}</td>
          <td><button class="remove-course">Remove</button></td>
        `;
  
        // Clear form inputs
        form.reset();
  
        // Add event listener to remove button
        row.querySelector('.remove-course').addEventListener('click', () => {
          courses = courses.filter(c => c !== course);
          row.remove();
        });
      } else {
        alert('Please fill out all fields correctly.');
      }
    });
  
    // Calculate GPA
    calculateGPAButton.addEventListener('click', () => {
      if (courses.length === 0) {
        alert('Please add at least one course.');
        return;
      }
  
      let totalCreditHours = 0;
      let totalGradePoints = 0;
  
      courses.forEach(course => {
        totalCreditHours += course.creditHours;
        totalGradePoints += course.grade * course.creditHours;
      });
  
      const gpa = totalGradePoints / totalCreditHours;
      gpaResult.textContent = gpa.toFixed(2);
    });
  
    // Reset everything
    resetButton.addEventListener('click', () => {
      courses = [];
      courseTable.innerHTML = '';
      gpaResult.textContent = '0.00';
    });
  });