import { Data } from "@/types/data";
import Link from "next/link";
import React, { useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { SiGitbook } from "react-icons/si";
import { useGlobalStore } from "@/pages/api/Global";

function NavbarComponent({ globalData }: { globalData: Data }) {
  const GlobalData = useGlobalStore((state) => state.data);
  const setGlobalData = useGlobalStore((state) => state.setData);
  useEffect(() => {
    if (GlobalData === null) setGlobalData(globalData);
  }, []);
  return (
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
