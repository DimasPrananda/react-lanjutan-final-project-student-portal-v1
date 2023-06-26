import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
import Footer from "../components/Footer";

const AddStudent = () => {
  const [fullname, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [programStudy, setProgramStudy] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const faculty = getFaculty(programStudy);

    const studentData = {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      faculty,
      programStudy,
    };

    try {
      await fetch("http://localhost:3001/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      setFullName("");
      setProfilePicture("");
      setAddress("");
      setPhoneNumber("");
      setBirthDate("");
      setGender("");
      setProgramStudy("");
    } catch (error) {
      console.log("Error adding student:", error);
    }
    navigate("/student");
  };

  const getFaculty = (programStudy) => {
    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        return "Fakultas Ekonomi";
      case "Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        return "Fakultas Ilmu Sosial dan Politik";
      case "Teknik Sipil":
      case "Arsitektur":
        return "Fakultas Teknik";
      case "Matematika":
      case "Fisika":
      case "Informatika":
        return "Fakultas Teknologi Informasi dan Sains";
      default:
        return "";
    }
  };

  return (
    <>
      <NavBar />
      <div className="edit">
        <div className="edit-page">
          <h2 className="title-add">Add Student</h2>
          <div className="card-add">
            <form className="form-add" onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name</label>
              <Input
                type="text"
                id="name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                data-testid="name"
                className="input"
                placeholder="John Doe"
              />

              <label htmlFor="profilePicture">Profile Picture</label>
              <Input
                type="text"
                id="profilePicture"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                data-testid="profilePicture"
                className="input"
                placeholder="https://placehold.com/image.jpg"
              />

              <label htmlFor="address">Address</label>
              <Input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                data-testid="address"
                className="input"
                placeholder="City, Country"
              />

              <label htmlFor="phoneNumber">Phone Number</label>
              <Input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                data-testid="phoneNumber"
                className="input"
                placeholder="+628XXXXXXXXXX"
              />

              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="birthDate">Birth Date</label>
                  <Input
                    type="date"
                    className="input"
                    id="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    data-testid="date"
                  />
                </div>
                <div className="form-column">
                  <label htmlFor="gender">Gender</label>
                  <Input
                    type="text"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    data-testid="gender"
                    className="input"
                    placeholder="Choose your gender"
                  />
                </div>
              </div>

              <label htmlFor="programStudy">Program Study</label>
              <Input
                type="text"
                className="input"
                id="programStudy"
                value={programStudy}
                onChange={(e) => setProgramStudy(e.target.value)}
                data-testid="prody"
                placeholder="Choose your program study"
              />
              <div>
                <Button colorScheme="blue" type="submit" data-testid="add-btn">
                  Add Student
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AddStudent;
