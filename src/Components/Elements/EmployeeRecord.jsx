import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Collapse,
} from "reactstrap";
import { HiOutlineDotsVertical } from "react-icons/hi";

const EmployeeRecord = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [typeDropdown, setTypeDropdown] = useState({});
  const [loading, setLoading] = useState(true); // New loading state

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
      setLoading(false); // Data loaded, set loading to false
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
        })
        .finally(() => {
          setLoading(false); // API call completed, set loading to false
        });
    }
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div style={{ backgroundColor: "#F2F2F2" }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8 card my-3">
            <>
              {loading ? (
                // Render loader while data is being fetched
                <div className="loader text-center mt-5 "></div>
              ) : (
                // Render table once data is loaded
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

                        <td
                          onClick={() =>
                            setTypeDropdown({
                              ...typeDropdown,
                              [item.id]: !typeDropdown[item.id],
                            })
                          }
                        >
                          <HiOutlineDotsVertical color="black" size={30} />
                        </td>
                        <Collapse
                          isOpen={typeDropdown[item.id]}
                          className="position-absolute"
                          style={{ zIndex: "99999" }}
                        >
                          <div className="bg-white p-3 br-16 dropdown-avatar-shadow">
                            <div className="d-flex justify-content-between "></div>
                            <div className="d-flex justify-content-between ">
                              <div className="align-self-center">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    setSelectedEmployee(item);
                                    toggleModal();
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between my-3">
                              <div className="align-self-center">
                                <Link
                                  to={`/editrecord/${item.id}`}
                                  className="btn btn-info"
                                >
                                  Edit
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EmployeeRecord;
