import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

function MyProfile() {
    const state = useSelector((state) => state);
    let isAdmin = false;
  
    if (state.user && state.user.userRoles) {
      const role = state.user.userRoles.find((role) => role === "Admin");
      if (role) {
        isAdmin = true;
      }
    }
  
    return (
      <section
        className="custom-height d-flex align-items-center"
      >
        <MDBContainer className="py-5">
          <MDBRow className="justify-content-center">
            <MDBCol lg="9" className="mb-4 mb-lg-0 mt-5">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBTypography
                      tag="h5"
                      style={{ marginTop: "5rem", color: "black" }}
                    >
                      Role
                    </MDBTypography>
                    <MDBCardText style={{ color: "black" }}>
                      {isAdmin ? "Admin" : "User"}
                    </MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody
                      className="p-4"
                      style={{ backgroundColor: "#e0f7fa" }}
                    >
                      <MDBTypography tag="h6">Profile Details</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Username</MDBTypography>
                          <MDBCardText className="text-muted">
                            {state.user && state.user.username}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {state.user && state.user.email}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
  
                      {/* ... rest of the code */}
  
                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <MDBIcon fab icon="facebook me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <MDBIcon fab icon="twitter me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <MDBIcon fab icon="instagram me-3" size="lg" />
                        </a>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
  
  export default MyProfile;
  


