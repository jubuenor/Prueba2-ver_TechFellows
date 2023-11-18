import React from "react";
import { Col, Row, Button } from "react-bootstrap";

function Home() {
  return (
    <div className="p-5">
      <div>
        <h1>
          Welcome to <strong>Query Builder App</strong>
        </h1>
      </div>
      <Row className="gx-0">
        <Col>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget
          porta massa. Morbi blandit nulla tempor, rhoncus augue nec, ultricies
          neque. Vestibulum mauris leo, tincidunt vel faucibus nec, consectetur
          a tellus. Curabitur molestie sem in ultricies tempor. Proin euismod
          fermentum purus, id consectetur urna suscipit eget. Curabitur sodales
          felis laoreet ligula pretium mattis. Curabitur pulvinar libero
          convallis, hendrerit tellus sed, semper tortor. Nam nunc massa,
          suscipit ac dictum id, congue nec massa. Pellentesque eu quam metus.
          Proin at ullamcorper orci. Pellentesque sit amet ante ut neque euismod
          imperdiet at in turpis.
        </Col>
        <Col>
          <div className="m-auto p-5"></div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
