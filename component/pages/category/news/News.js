import React from "react";
import { Grid, Image } from "semantic-ui-react";
import Under from "../../../../assets/images/logo/comingsoon.png";

    const marginText = {
      marginTop: "100px"
    }

  const News = () => {
    return (
      <div>
        <Grid textAlign="center" columns={1}>
          <Grid.Row>
            <Grid.Column style={marginText}>
              <Image>
                <Image src={Under} />
              </Image>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

  export default News
