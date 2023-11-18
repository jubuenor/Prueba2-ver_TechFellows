import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { Card, Button, Collapse } from "react-bootstrap";

function ChartInfo({
  serie,
  description,
}: {
  serie: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className=" mb-3">
      <div>
        <Button
          variant="link"
          className="btn-sm p-0 text-decoration-none"
          onClick={() => setOpen(!open)}
        >
          <FaCircleInfo size={20} />
          <span className="ms-2">{serie}</span>
        </Button>
      </div>
      <div>
        <Collapse in={open} dimension="width">
          <div>
            <Card body style={{ width: "400px" }}>
              {description}
            </Card>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default ChartInfo;
