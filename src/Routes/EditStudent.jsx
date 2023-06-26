import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { Button, Input } from "@chakra-ui/react";
import Footer from "../components/Footer";

const EditStudent = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      programStudy,
    } = formData;

    const faculty = getFacultyByProgramStudy(programStudy);

    const updatedStudent = {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      faculty,
      programStudy,
    };

    fetch(`http://localhost:3001/student/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/student");
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };

  const getFacultyByProgramStudy = (programStudy) => {
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
          <form className="edit-row" onSubmit={handleSubmit}>
            {loading ? (
              <p>Loading ...</p>
            ) : (
              <>
                <div className="profile-container">
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="profile-picture"
                  />
                </div>
                <div className="card">
                  <label htmlFor="fullname">Full Name</label>
                  <Input
                    type="text"
                    className="input"
                    id="fullname"
                    data-testid="name"
                    value={formData.fullname}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        [event.target.id]: event.target.value,
                      })
                    }
                  />

                  <label htmlFor="address">Address</label>
                  <Input
                    type="text"
                    className="input"
                    id="address"
                    data-testid="address"
                    value={formData.address}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        [event.target.id]: event.target.value,
                      })
                    }
                  />

                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Input
                    type="text"
                    className="input"
                    id="phoneNumber"
                    data-testid="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        [event.target.id]: event.target.value,
                      })
                    }
                  />

                  <div className="form-row">
                    <div className="form-column">
                      <label htmlFor="birthDate">Birth Date</label>
                      <Input
                        type="date"
                        className="input"
                        id="birthDate"
                        data-testid="date"
                        value={formData.birthDate}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            [event.target.id]: event.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-column">
                      <label htmlFor="gender">Gender</label>
                      <Input
                        type="text"
                        className="input"
                        id="gender"
                        data-testid="gender"
                        value={formData.gender}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            [event.target.id]: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <label htmlFor="programStudy">Program Study</label>
                  <Input
                    type="text"
                    className="input"
                    id="programStudy"
                    data-testid="prody"
                    value={formData.programStudy}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        [event.target.id]: event.target.value,
                      })
                    }
                  />
                  <div className="button-update">
                    <Button
                      type="submit"
                      disabled={loading}
                      data-testid="edit-btn"
                      colorScheme="blue"
                    >
                      {loading ? "Updating..." : "Edit Student"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default EditStudent;
