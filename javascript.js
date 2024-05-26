document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTableBody');

// here the eventlistener function is added to restrict the form to submit without entering th student Name

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('studentForm');

    form.addEventListener('submit', function(event) {
        const studentName = document.getElementById('studentName').value.trim();
        // Here the if condition is added to check wheather the student Name is fill or not
        if (!studentName) {
            alert("Student name is required.");
            event.preventDefault();  // Prevent form submission
        }
    });
});


// here function is added to get the item from local storage of browser
    function getStudentsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('students')) || [];
    }
    // here setitme browser object model has added to store the item in browsers localstorage
    function saveStudentsToLocalStorage(students) {
        localStorage.setItem('students', JSON.stringify(students));
    }
    // here function is applied to create new Element
    function addStudentToTable(student) {
        const tr = document.createElement('tr');
            // here the data of students will be added in a table after submitting the from
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;
        // here the edit and delete button are fetching from html
        const editButton = tr.querySelector('.edit');
        const deleteButton = tr.querySelector('.delete');
        //here the addEventlistener function is added in edit and delete button to edit and delete the students data from data table
        editButton.addEventListener('click', () => editStudent(student, tr));
        deleteButton.addEventListener('click', () => deleteStudent(student.id, tr));
        //here table row element is adding inside the parent element
        studentTableBody.appendChild(tr);
    }

    function loadStudents() {
        const students = getStudentsFromLocalStorage();
        students.forEach(addStudentToTable);
    }
    // here the  function is added to get the students details 
    function editStudent(student, tr) {
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentId').value = student.id;
        document.getElementById('emailId').value = student.email;
        document.getElementById('contactNo').value = student.contact;
        // this function is added to remove the student from the table row
        deleteStudent(student.id, tr);
    }

    function deleteStudent(id, tr) {
        const students = getStudentsFromLocalStorage();
        const filteredStudents = students.filter(student => student.id !== id);
        saveStudentsToLocalStorage(filteredStudents);
        studentTableBody.removeChild(tr);
    }
    
    studentForm.addEventListener('submit', event => {
        event.preventDefault();
        

       









        const student = {
            name: document.getElementById('studentName').value,
            id: document.getElementById('studentId').value,
            email: document.getElementById('emailId').value,
            contact: document.getElementById('contactNo').value
        };

        if (student.name && student.id && student.email && student.contact) {
            const students = getStudentsFromLocalStorage();
            students.push(student);
            saveStudentsToLocalStorage(students);
            addStudentToTable(student);

            studentForm.reset();
        } else {
            alert('All fields are required!');
        }
    });
       
    loadStudents();
});
