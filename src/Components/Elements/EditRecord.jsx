import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditRecord = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");


  useEffect(() => {
    const storedData = localStorage.getItem("employeeData");
    if (storedData) {
      const employeeData = JSON.parse(storedData);
      const selectedEmployee = employeeData.find((item) => item.id === parseInt(id, 10));
      setEmployee(selectedEmployee);

      setName(selectedEmployee.employee_name);
      setSalary(selectedEmployee.employee_salary);
      setAge(selectedEmployee.employee_age);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployeeData = JSON.parse(localStorage.getItem("employeeData")).map((item) =>
      item.id === parseInt(id, 10)
        ? { ...item, employee_name: name, employee_salary: salary, employee_age: age }
        : item
    );

    localStorage.setItem("employeeData", JSON.stringify(updatedEmployeeData));
    // Use the `navigate` function from `react-router-dom` to navigate programmatically
    // This is the equivalent of window.location.href = "/employeerecord" in v5
    // Note: Make sure to import `useNavigate` at the beginning of your file
    
  };

  return (
    <div>
      {employee && (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-5 mt-5">
              <div className="contact-form">
                <span className="heading text-center">Edit Employee Record</span>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="salary">Salary:</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  />
                  <label htmlFor="pay">Age:</label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />

                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRecord;
