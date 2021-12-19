import { ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const pipe = (
  <Box component="span" sx={{ display: "inline-block", mx: "4px" }}>
    |
  </Box>
);

export default function StartupList(): ReactElement {
  const [data, setData] = useState<Startup[]>([]);

  useEffect(() => {
    StartupHttpService.getStartups()
      .then((response) => {
        setData(response);
      })
      .catch((reason) => {
        console.log(reason.response.data);
      });
  }, []);

  return (
    <Grid id="startup-list">
      {data.map((item) => (
        <Grid item>
          <Card key={item.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5">{item.name}</Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Founded: {item.dateFounded.getFullYear()}
                {pipe}
                {item.employees} Employees
                {pipe}$ {item.totalFunding} Mio.
                {pipe}
                {item.currentInvestmentStage}
              </Typography>
              <Typography variant="body1">{item.shortDescription}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
