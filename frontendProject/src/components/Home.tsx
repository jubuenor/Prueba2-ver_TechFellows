import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { SiGitbook } from "react-icons/si";

// Functional component that renders the Home component
function Home() {
  return (
    <div className="p-5">
      <Row className="gx-0">
        <Col md={6} className="text-center">
          <Row className="d-flex justify-content-around align-items-center gx-0">
            <Col>
              <h1>
                Welcome to <strong>EduViz</strong>
              </h1>
            </Col>
            <Col>
              <SiGitbook size={200} color="cyan"></SiGitbook>
            </Col>
          </Row>

          <p className="mt-5 fs-4">
            EduViz empowers you to seamlessly navigate The World Bank’s
            Education Dataset using our intuitive Visual Query Builder. No SQL
            skills required!
          </p>
        </Col>
        <Col
          md={6}
          className=" m-auto p-5 text-center d-flex flex-column align-items-center"
        >
          <div className="mb-5">
            <Link href="/community" className="btn btn-primary">
              Community
            </Link>
          </div>
          <div>
            <Link href="/create" className="btn btn-success">
              Create Query
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
