import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EmployeeRecord = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    // Check if data is already present in local storage
    const storedData = localStorage.getItem('employeeData');

    if (storedData) {
      // If data is present, use it directly
      setEmployeeData(JSON.parse(storedData));
    } else {
      // If data is not present, make API call and store the data
      axios.get("https://dummy.restapiexample.com/api/v1/employees")
        .then((res) => {
          const data = res.data.data;
          // Save data to local storage
          localStorage.setItem('employeeData', JSON.stringify(data));
          setEmployeeData(data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-md-8 card my-3'>
            <>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td>{item.employee_name}</td>
                      <td>{item.employee_salary}</td>
                      <td>{item.employee_age}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
            <button  type="button" className="btn btn-primary my-3">Add new record</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRecord;
