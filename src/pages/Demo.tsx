import {
  GridContainer,
  GridRow,
  GridCol,
  GridCell,
} from "../katalog/components/layout/Grid/Grid";
import Demo from "../katalog/Demo.tsx";

const Home = () => {
  return (
    <GridContainer>
      <GridRow>
        <GridCol>
          <GridCell accent>Demo</GridCell>
        </GridCol>
        <GridCol>
          <Demo />
        </GridCol>
      </GridRow>
    </GridContainer>
  );
};

export default Home;
