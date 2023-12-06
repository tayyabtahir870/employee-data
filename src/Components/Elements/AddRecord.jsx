import React, { useState } from "react";

const AddRecord = () => {
  // Step 1: Set up state variables
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const storedData = localStorage.getItem("employeeData");

  // Step 2: Attach event handlers
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const handlePayChange = (e) => {
    setAge(e.target.value);
  };
  const handleEmployeeId = (e) => {
    setEmployeeId(e.target.value);
  };

  // Step 3: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the employee data
// Create an object with the employee data
const employee = {
  id: parseInt(employeeId), // Convert to number
  employee_name: name,
  employee_salary: parseFloat(salary), // Convert to number
  employee_age: parseInt(age), // Convert to number
  profile_image: "",
};

    // Retrieve existing data from localStorage
    const existingData = JSON.parse(storedData) || [];

    // Append the new employee data
    const newData = [...existingData, employee];

    // Store the updated data in localStorage
    localStorage.setItem("employeeData", JSON.stringify(newData));

    // Clear the form fields after submission
    setName("");
    setSalary("");
    setAge("");
    setEmployeeId("");
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-5 mt-5">
            <div className="contact-form">
              <span className="heading text-center">Add Employee Record</span>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  required=""
                  value={name}
                  onChange={handleNameChange}
                />
                <label htmlFor="name">Employee Id:</label>
                <input
                  type="text"
                  required=""
                  value={employeeId}
                  onChange={handleEmployeeId}
                />
                <label htmlFor="salary">Salary:</label>
                <input
                  type="text"
                  id="salary"
                  name="text"
                  required=""
                  value={salary}
                  onChange={handleSalaryChange}
                />
                <label htmlFor="pay">Age:</label>
                <input
                  type="text"
                  id="pay"
                  name="number"
                  required=""
                  value={age}
                  onChange={handlePayChange}
                />

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecord;
