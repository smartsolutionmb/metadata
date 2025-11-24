import ChartList from "@/components/admin/dashboard/ChartList";
import DashboardCard from "@/components/admin/dashboard/DashBoardCard";
import ElasticData from "@/components/admin/dashboard/ElesticData";
import StatListComponent from "@/components/admin/dashboard/StatList";
import TreeView from "@/components/admin/dashboard/TreeView";
import TreeViewRadial from "@/components/admin/dashboard/TreeViewRadial";
import {
  getAlldata,
  getDashboardDatabaseModel,
  getMainIndicatorsModel,
} from "@/services/model/DashboardDatabaseModel";
import { getConvertTreeView } from "@/utils/dashboardConvertData";
import { Grid2 } from "@mui/material";
import Box from "@mui/material/Box";

import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://nso.mn/">
        Үндэсний Статистикийн Хороо
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default async function Dashboard() {
  const databaseLocations = await getDashboardDatabaseModel();

  const mainData = await getMainIndicatorsModel();
  const userLevel = await databaseLocations.userLevel;
  const tblData = databaseLocations?.dbTable;

  const orgName = databaseLocations?.orgName;

  const orgList = await getAlldata();
  const allOrg = orgList.allOrg;

  return (
    <Box>
      <Typography component="h1" variant="h6" color="inherit" noWrap>
        Хяналтын хэсэг
      </Typography>

      <StatListComponent mainIndicator={mainData} />
      <Box
        sx={{
          container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
          mx: "auto",
          p: 2,
        }}
      >
        <Grid2 container spacing={2}>
          <ChartList
            data={databaseLocations?.dataByDbType}
            filterData={""}
            title="Өгөгдлийн сангийн төрөл"
            subtitle=""
            chartType="bar"
            chartAxis=""
          />
          <ChartList
            data={databaseLocations?.dbLocation}
            filterData={""}
            title="Өгөгдлийн сангийн байршил"
            subtitle=""
            chartType="pie"
            chartAxis=""
          />
          <ChartList
            data={databaseLocations?.dbFrequency}
            filterData={""}
            title="Үзүүлэлтийн тооцох давтамж"
            subtitle=""
            chartType="bar"
            chartAxis=""
          />
          {/* <ChartList
            data={databaseLocations?.dbDate}
            filterData={""}
            title="Өгөгдлийн санг анх нэвтрүүлсэн огноо"
            subtitle=""
            chartType="line"
            chartAxis=""
          /> */}
        </Grid2>
      </Box>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 12 }}>
          {/* <TreeView data={graphData} activeName={orgName?.org_short_name} /> */}
          <TreeViewRadial
            data={tblData}
            activeName={orgName?.org_short_name}
            userLevel={userLevel}
            allOrg={allOrg}
          />
        </Grid2>
        {/* <Grid2 size={{ xs: 12, md: 12 }}>
          <ElasticData indicatorTree={databaseLocations?.dbIndicator} />
        </Grid2> */}
      </Grid2>
    </Box>
  );
}
