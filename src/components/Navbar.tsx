import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { SiGitbook } from "react-icons/si";
import RegisterUsernameModal from "./RegisterUsernameModal";
import { FaUserPen } from "react-icons/fa6";
import { getUsernameCookie, removeUsernameCookie } from "@/pages/api/Token";
import { FaUserLargeSlash } from "react-icons/fa6";

function NavbarComponent() {
  const [showRegisterUsername, setShowRegisterUsername] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    setUsername(getUsernameCookie());
  }, [username]);

  const handleClose = () => {
    setShowRegisterUsername(false);
    if (getUsernameCookie() !== "") setUsername(getUsernameCookie());
  };
  const handleShow = () => setShowRegisterUsername(true);
  return (
    <>
      <RegisterUsernameModal
        show={showRegisterUsername}
        handleClose={handleClose}
      ></RegisterUsernameModal>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <SiGitbook size={50} color="cyan"></SiGitbook>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" href="/">
                Home
              </Link>
              <Link className="nav-link" href="/create">
                Create
              </Link>
              <Link className="nav-link" href="/community">
                Community
              </Link>
            </Nav>
            {username === "" ? (
              <Button variant="link" className="nav-link" onClick={handleShow}>
                <FaUserPen size={30} />
              </Button>
            ) : (
              <>
                <span>{username}</span>
                <Button
                  variant="link"
                  className="nav-link ms-3"
                  onClick={() => {
                    removeUsernameCookie();
                    setUsername("");
                  }}
                >
                  <FaUserLargeSlash size={30} />
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
