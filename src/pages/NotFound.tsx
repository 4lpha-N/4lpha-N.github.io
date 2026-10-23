import { useNavigate } from "react-router";
import { GridContainer } from "../katalog/components/layout/Grid/Grid";
import { VlButton } from "../katalog/components/atoms/Button/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <GridContainer>
      <section className="notfound">
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <h1 className="vl-h1">Seite nicht gefunden</h1>
        {/* <p className="vl-text-lg">
          Diese Adresse gibt es nicht oder sie wurde verschoben.
        </p> */}
        <VlButton variant="primary" onClick={() => navigate("/")}>
          Zurück zur Startseite
        </VlButton>
      </section>
    </GridContainer>
  );
};

export default NotFound;
