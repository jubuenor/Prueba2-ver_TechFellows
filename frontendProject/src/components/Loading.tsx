import { Spinner } from "react-bootstrap";
import styles from "@/styles/loading.module.css";
import { SiGitbook } from "react-icons/si";

// Functional component that renders the Loading component
function Loading() {
  return (
    <>
      <div className={styles.loading_backdrop}>
        <SiGitbook size={200} color="cyan"></SiGitbook>

        <Spinner
          size="sm"
          animation="border"
          className="position-absolute"
        ></Spinner>
      </div>
    </>
  );
}

export default Loading;
