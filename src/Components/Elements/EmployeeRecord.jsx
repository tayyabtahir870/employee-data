import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const EmployeeRecord = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  const handleDelete = (employee) => {
    // Perform delete logic here
  
    // For example, you can filter out the selected employee and update the state
    const updatedData = employeeData.filter((item) => item.id !== employee.id);
    setEmployeeData(updatedData);
  
    // Update local storage
    localStorage.setItem("employeeData", JSON.stringify(updatedData));
  
    // Close the modal
    toggleModal();
  };
  

  useEffect(() => {
    // Check if data is already present in local storage
    const storedData = localStorage.getItem("employeeData");

    if (storedData) {
      // If data is present, use it directly
      setEmployeeData(JSON.parse(storedData));
    } else {
      // If data is not present, make API call and store the data
      axios
        .get("https://dummy.restapiexample.com/api/v1/employees")
        .then((res) => {
          const data = res.data.data;
          // Save data to local storage
          localStorage.setItem("employeeData", JSON.stringify(data));
          setEmployeeData(data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div style={{ backgroundColor: "#F2F2F2" }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8 card my-3">
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
                      <td>
                        {" "}
                        <button type="button" class="btn btn-info">
                          Edit
                        </button>{" "}
                      </td>
                      <td>
                        {" "}
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => {
                            setSelectedEmployee(item);
                            toggleModal();
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          </div>
        </div>
      </div>
      <Modal centered zIndex={9} isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Delete Employee</ModalHeader>
        <ModalBody>
          Are you sure you want to delete {selectedEmployee?.employee_name}?
        </ModalBody>
        <ModalFooter>
        
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="danger" onClick={() => handleDelete(selectedEmployee)}>
            Delete
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EmployeeRecord;
