import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecord = () => {

  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate("");

  const storedData = localStorage.getItem("employeeData");

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

  const handleSubmit = (e) => {
    e.preventDefault();


const employee = {
  id: parseInt(employeeId), 
  employee_name: name,
  employee_salary: parseFloat(salary), 
  employee_age: parseInt(age), 
  profile_image: "",
};

   
    const existingData = JSON.parse(storedData) || [];


    const newData = [...existingData, employee];

   
    localStorage.setItem("employeeData", JSON.stringify(newData));


    setName("");
    setSalary("");
    setAge("");
    setEmployeeId("");
    
    navigate("/");
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
