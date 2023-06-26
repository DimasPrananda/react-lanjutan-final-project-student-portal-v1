import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, filter]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/student");
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "DELETE",
      });
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const filterStudents = () => {
    if (filter === "All") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((student) => student.faculty === filter)
      );
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <NavBar />
      <div className="edit-page">
        <div className="filter-container">
          <h2 className="table-title">All Student</h2>
          <Select
            data-testid="filter"
            value={filter}
            onChange={handleFilterChange}
            width="200px"
          >
            <option value="All">All</option>
            <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
            <option value="Fakultas Ilmu Sosial dan Politik">
              Fakultas Ilmu Sosial dan Politik
            </option>
            <option value="Fakultas Teknik">Fakultas Teknik</option>
            <option value="Fakultas Teknologi Informasi dan Sains">
              Fakultas Teknologi Informasi dan Sains
            </option>
          </Select>
        </div>

        {loading ? (
          <p>Loading ...</p>
        ) : (
          <TableContainer>
            <Table id="table-student">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Full Name</Th>
                  <Th>Faculty</Th>
                  <Th>Program Study</Th>
                  <Th>Option</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredStudents.map((student, index) => (
                  <Tr key={student.id} className="student-data-row">
                    <Td className="index-column">{index + 1}</Td>
                    <Td>
                      <Link className="text-name" to={`/student/${student.id}`}>
                        {student.fullname}
                      </Link>
                    </Td>
                    <Td>{student.faculty}</Td>
                    <Td>{student.programStudy}</Td>
                    <Td className="button-column">
                      <button
                        data-testid={`delete-${student.id}`}
                        onClick={() => handleDelete(student.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Student;
