"use client";
import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import graph from "../../../../public/mockdata/mockdata_example.json";
import { getConvertDataHome } from "@/utils/dashboardConvertData";
import { useQuery } from "@tanstack/react-query";
import { SearchService } from "@/services/SearchService";
import Loader from "@/components/Loader";
import TreeView from "../dashboard/TreeView";
import { Box, Button, Typography } from "@mui/material";

const GraphChartComponent = ({
  dataList,
  allOrg,
}: {
  dataList: any;
  allOrg: any;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [clickTree, setClickTree] = useState(1);
  const [allData, setAllData] = useState(false);

  const graphData = getConvertDataHome(dataList);
  // const graphData = dataList.reduce((acc: any, item: any) => {
  //   // console.log({ acc, item });
  //   // let orgNode = acc.find((org: any) => org.org_name == item.org_name);
  //   // if (!orgNode) {
  //   //   orgNode = {
  //   //     name: item.org_name,
  //   //     children: [],
  //   //     itemStyle: {
  //   //       color: "#1C45F4",
  //   //     },
  //   //     lineStyle: {
  //   //       color: "#408FC9",
  //   //     },
  //   //     label: {
  //   //       show: true,
  //   //       width: 80,
  //   //       overflow: "breakAll",
  //   //       borderRadius: 5,
  //   //       backgroundColor: "#408FC9",
  //   //       color: "#fff",
  //   //       padding: 5,
  //   //       fontSize: 9,
  //   //     },
  //   //   };
  //   //   acc.push(orgNode);
  //   // }
  //   // let dbNode = orgNode.children.find(
  //   //   (db: any) => db.db_name === item.db_name
  //   // );
  //   // if (!dbNode) {
  //   //   dbNode = {
  //   //     name: item.db_name,
  //   //     children: [],
  //   //     itemStyle: {
  //   //       color: "#1C45F4",
  //   //     },
  //   //     lineStyle: {
  //   //       color: "#408FC9",
  //   //     },
  //   //     label: {
  //   //       show: true,
  //   //       width: 80,
  //   //       overflow: "breakAll",
  //   //       borderRadius: 5,
  //   //       backgroundColor: "#408FC9",
  //   //       color: "#fff",
  //   //       padding: 5,
  //   //       fontSize: 9,
  //   //     },
  //   //   };
  //   //   orgNode.children.push(dbNode);
  //   // }
  //   // let tblNode = dbNode.children.find(
  //   //   (tbl: any) => tbl.tbl_name === item.tbl_name
  //   // );
  //   // if (!tblNode) {
  //   //   tblNode = {
  //   //     name: item.tbl_name,
  //   //     children: [],
  //   //     itemStyle: {
  //   //       color: "#1C45F4",
  //   //     },
  //   //     lineStyle: {
  //   //       color: "#408FC9",
  //   //     },
  //   //     label: {
  //   //       show: true,
  //   //       width: 80,
  //   //       overflow: "breakAll",
  //   //       borderRadius: 5,
  //   //       backgroundColor: "#408FC9",
  //   //       color: "#fff",
  //   //       padding: 5,
  //   //       fontSize: 9,
  //   //     },
  //   //   };
  //   //   dbNode.children.push(tblNode);
  //   // }
  // });
  // console.log({ graphData });

  // const option = {
  //   title: {
  //     text: "",
  //     subtext: "",
  //     top: "bottom",
  //     left: "right",
  //   },
  //   tooltip: {},
  //   legend: [
  //     {
  //       // selectedMode: 'single',
  //       data: graph.categories.map(function (a: { name: string }) {
  //         return a.name;
  //       }),
  //     },
  //   ],
  //   animationDuration: 1500,
  //   animationEasingUpdate: "quinticInOut",
  //   series: [
  //     {
  //       name: "",
  //       type: "graph",
  //       legendHoverLink: false,
  //       layout: "none",
  //       data: graph.nodes,
  //       links: graph.edges,
  //       categories: graph.categories,
  //       roam: true,
  //       label: {
  //         position: "right",
  //         formatter: "{b}",
  //       },
  //       lineStyle: {
  //         color: "source",
  //         curveness: 0.3,
  //       },
  //       emphasis: {
  //         focus: "adjacency",
  //         lineStyle: {
  //           width: 10,
  //         },
  //       },
  //     },
  //   ],
  // };

  const { data, isLoading } = useQuery({
    queryKey: ["search treeView", searchValue],
    queryFn: () => searchValue != "" && SearchService(searchValue.trim()),
  });

  const option = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      formatter: (params: any) => {
        return params.data.name;
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        type: "tree",
        data: [{ name: "", children: graphData }],
        // data: [
        //   {
        //     name: "Төрийн мета өгөгдлийн нэгдсэн сан",
        //     children: dataList,
        //     symbolSize: 16,
        //     symbol: "circle",
        //     itemStyle: {
        //       color: "#AD546F",
        //     },
        //     label: {
        //       show: true,
        //       formatter: (params: any) => {
        //         return params.data.name;
        //       },
        //       width: 90,
        //       overflow: "breakAll",
        //       fontSize: 10,
        //       borderColor: "#D79034",
        //       borderWidth: 2,
        //       borderRadius: 10,
        //       padding: 4,
        //       color: "#fff",
        //       backgroundColor: "#AD546F",
        //     },
        //   },
        // ],
        symbolSize: 8,
        emphasis: {
          focus: "descendant",
        },
        layout: "radial",
        top: "20%",
        bottom: "20%",
        left: "20%",
        right: "20%",
        symbol: "emptyCircle",
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        zoom: 1,
        // roam: true,
        initialTreeDepth: clickTree,
      },
    ],
  };
  const onChartClick = (params: any) => {
    if (!params.data.children || params.data.children.length === 0) {
      // Output the name or value of the clicked leaf
      // console.log("Clicked leaf value:", params.data.name);
      setSearchValue(params.data.name);
      setAllData(false);
    }
  };
  const indicator: any =
    data?.indicator &&
    data?.indicator.filter(
      (e: { highlight: { indicator_name: any } }) => e.highlight.indicator_name
    );

  const groupedData = indicator
    ?.reduce((acc: any, dt: any) => {
      const indicatorName = dt._source?.indicator_name;
      const tblName = dt._source?.tbl_name;
      const dbName = dt._source?.db_name;
      const orgName = allOrg.find(
        (org: any) => org.db_id === dt._source?.db_id
      )?.org_name;

      if (!acc.find((indicator: any) => indicator.name === indicatorName)) {
        acc.push({
          name: indicatorName,
          children: [
            {
              name: tblName,
              children: [
                {
                  name: dbName,
                  children: [
                    {
                      name: orgName,
                      itemStyle: {
                        color: "#6D9E41",
                      },
                      lineStyle: {
                        color: "#A5C984",
                      },
                      label: {
                        show: true,
                        width: 150,
                        overflow: "breakAll",
                        borderRadius: 5,
                        backgroundColor: "#A5C984",
                        color: "#000",
                        padding: 5,
                        fontSize: 9,
                      },
                    },
                  ],
                  itemStyle: {
                    color: "#1C45F4",
                  },
                  lineStyle: {
                    color: "#408FC9",
                  },
                  label: {
                    show: true,
                    width: 100,
                    overflow: "breakAll",
                    borderRadius: 5,
                    backgroundColor: "#408FC9",
                    color: "#fff",
                    padding: 5,
                    fontSize: 9,
                  },
                },
              ],
              itemStyle: {
                color: "#1431AD",
              },
              lineStyle: {
                color: "#B9C5FC",
              },
              label: {
                show: true,
                width: 110,
                overflow: "breakAll",
                borderRadius: 5,
                backgroundColor: "#B9C5FC",
                color: "#000",
                padding: 5,
                fontSize: 9,
              },
            },
          ],
          itemStyle: {
            color: "#D79034",
          },
          lineStyle: {
            color: "#F2BE7A",
            width: 2,
            type: "solid",
          },
          label: {
            show: true,
            width: 100,
            overflow: "breakAll",
            borderRadius: 5,
            backgroundColor: "#F2BE7A",
            color: "#000",
            padding: 5,
            fontSize: 9,
          },
        });
      } else {
        const indicator = acc.find(
          (indicator: any) => indicator.name === indicatorName
        );
        if (!indicator.children.find((tbl: any) => tbl.name === tblName)) {
          indicator.children.push({
            name: tblName,
            children: [
              {
                name: dbName,
                children: [
                  {
                    name: orgName,
                    itemStyle: {
                      color: "#6D9E41",
                    },
                    lineStyle: {
                      color: "#A5C984",
                    },
                    label: {
                      show: true,
                      width: 150,
                      overflow: "breakAll",
                      borderRadius: 5,
                      backgroundColor: "#A5C984",
                      color: "#000",
                      padding: 5,
                      fontSize: 9,
                    },
                  },
                ],
                itemStyle: {
                  color: "#1C45F4",
                },
                lineStyle: {
                  color: "#408FC9",
                },
                label: {
                  show: true,
                  width: 100,
                  overflow: "breakAll",
                  borderRadius: 5,
                  backgroundColor: "#408FC9",
                  color: "#fff",
                  padding: 5,
                  fontSize: 9,
                },
              },
            ],
            itemStyle: {
              color: "#1431AD",
            },
            lineStyle: {
              color: "#B9C5FC",
            },
            label: {
              show: true,
              width: 110,
              overflow: "breakAll",
              borderRadius: 5,
              backgroundColor: "#B9C5FC",
              color: "#000",
              padding: 5,
              fontSize: 9,
            },
          });
        } else {
          const tbl = indicator.children.find(
            (tbl: any) => tbl.name === tblName
          );
          if (!tbl.children.find((db: any) => db.name === dbName)) {
            tbl.children.push({
              name: dbName,
              children: [
                {
                  name: orgName,
                  itemStyle: {
                    color: "#6D9E41",
                  },
                  lineStyle: {
                    color: "#A5C984",
                  },
                  label: {
                    show: true,
                    width: 150,
                    overflow: "breakAll",
                    borderRadius: 5,
                    backgroundColor: "#A5C984",
                    color: "#000",
                    padding: 5,
                    fontSize: 9,
                  },
                },
              ],
              itemStyle: {
                color: "#1C45F4",
              },
              lineStyle: {
                color: "#408FC9",
              },
              label: {
                show: true,
                width: 100,
                overflow: "breakAll",
                borderRadius: 5,
                backgroundColor: "#408FC9",
                color: "#fff",
                padding: 5,
                fontSize: 9,
              },
            });
          } else {
            const db = tbl.children.find((db: any) => db.name === dbName);
            if (!db.children.find((org: any) => org.name === orgName)) {
              db.children.push({
                name: orgName,
                itemStyle: {
                  color: "#6D9E41",
                },
                lineStyle: {
                  color: "#A5C984",
                },
                label: {
                  show: true,
                  width: 150,
                  overflow: "breakAll",
                  borderRadius: 5,
                  backgroundColor: "#A5C984",
                  color: "#000",
                  padding: 5,
                  fontSize: 9,
                },
              });
            }
          }
        }
      }

      return acc;
    }, [])
    .slice(0, 10);

  const allOrgData = indicator?.reduce((acc: any, dt: any) => {
    const indicatorName = dt._source?.indicator_name;
    const tblName = dt._source?.tbl_name;
    const dbName = dt._source?.db_name;
    const orgName = allOrg.find(
      (org: any) => org.db_id === dt._source?.db_id
    )?.org_name;

    if (!acc.find((indicator: any) => indicator.name === indicatorName)) {
      acc.push({
        name: indicatorName,
        children: [
          {
            name: tblName,
            children: [
              {
                name: dbName,
                children: [
                  {
                    name: orgName,
                    itemStyle: {
                      color: "#6D9E41",
                    },
                    lineStyle: {
                      color: "#A5C984",
                    },
                    label: {
                      show: true,
                      width: 150,
                      overflow: "breakAll",
                      borderRadius: 5,
                      backgroundColor: "#A5C984",
                      color: "#000",
                      padding: 5,
                      fontSize: 9,
                    },
                  },
                ],
                itemStyle: {
                  color: "#1C45F4",
                },
                lineStyle: {
                  color: "#408FC9",
                },
                label: {
                  show: true,
                  width: 100,
                  overflow: "breakAll",
                  borderRadius: 5,
                  backgroundColor: "#408FC9",
                  color: "#fff",
                  padding: 5,
                  fontSize: 9,
                },
              },
            ],
            itemStyle: {
              color: "#1431AD",
            },
            lineStyle: {
              color: "#B9C5FC",
            },
            label: {
              show: true,
              width: 110,
              overflow: "breakAll",
              borderRadius: 5,
              backgroundColor: "#B9C5FC",
              color: "#000",
              padding: 5,
              fontSize: 9,
            },
          },
        ],
        itemStyle: {
          color: "#D79034",
        },
        lineStyle: {
          color: "#F2BE7A",
          width: 2,
          type: "solid",
        },
        label: {
          show: true,
          width: 100,
          overflow: "breakAll",
          borderRadius: 5,
          backgroundColor: "#F2BE7A",
          color: "#000",
          padding: 5,
          fontSize: 9,
        },
      });
    } else {
      const indicator = acc.find(
        (indicator: any) => indicator.name === indicatorName
      );
      if (!indicator.children.find((tbl: any) => tbl.name === tblName)) {
        indicator.children.push({
          name: tblName,
          children: [
            {
              name: dbName,
              children: [
                {
                  name: orgName,
                  itemStyle: {
                    color: "#6D9E41",
                  },
                  lineStyle: {
                    color: "#A5C984",
                  },
                  label: {
                    show: true,
                    width: 150,
                    overflow: "breakAll",
                    borderRadius: 5,
                    backgroundColor: "#A5C984",
                    color: "#000",
                    padding: 5,
                    fontSize: 9,
                  },
                },
              ],
              itemStyle: {
                color: "#1C45F4",
              },
              lineStyle: {
                color: "#408FC9",
              },
              label: {
                show: true,
                width: 100,
                overflow: "breakAll",
                borderRadius: 5,
                backgroundColor: "#408FC9",
                color: "#fff",
                padding: 5,
                fontSize: 9,
              },
            },
          ],
          itemStyle: {
            color: "#1431AD",
          },
          lineStyle: {
            color: "#B9C5FC",
          },
          label: {
            show: true,
            width: 110,
            overflow: "breakAll",
            borderRadius: 5,
            backgroundColor: "#B9C5FC",
            color: "#000",
            padding: 5,
            fontSize: 9,
          },
        });
      } else {
        const tbl = indicator.children.find((tbl: any) => tbl.name === tblName);
        if (!tbl.children.find((db: any) => db.name === dbName)) {
          tbl.children.push({
            name: dbName,
            children: [
              {
                name: orgName,
                itemStyle: {
                  color: "#6D9E41",
                },
                lineStyle: {
                  color: "#A5C984",
                },
                label: {
                  show: true,
                  width: 150,
                  overflow: "breakAll",
                  borderRadius: 5,
                  backgroundColor: "#A5C984",
                  color: "#000",
                  padding: 5,
                  fontSize: 9,
                },
              },
            ],
          });
        } else {
          const db = tbl.children.find((db: any) => db.name === dbName);
          if (!db.children.find((org: any) => org.name === orgName)) {
            db.children.push({
              name: orgName,
              itemStyle: {
                color: "#6D9E41",
              },
              lineStyle: {
                color: "#A5C984",
              },
              label: {
                show: true,
                width: 150,
                overflow: "breakAll",
                borderRadius: 5,
                backgroundColor: "#A5C984",
                color: "#000",
                padding: 5,
                fontSize: 9,
              },
            });
          }
        }
      }
    }

    return acc;
  }, []);
  if (isLoading) return <Loader />;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            opacity: 0.8,
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            fontStyle={"inherit"}
            sx={{
              justifyContent: "center",
              py: 0.8,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Мета өгөгдлийн дүрслэл
          </Typography>
          <Typography
            variant="body1"
            color="#0E0E0E"
            sx={{
              textAlign: "center",
              p: 1,
            }}
          >
            Төрийн мета өгөгдлийн нэгдсэн санд агуулагдаж буй өгөгдлийн сан,
            түүний хүснэгт, үзүүлэлтийн мета мэдээллийн хоорондын уялдаа,
            холбоог байгууллага, үзүүлэлтийн түвшинд мета өгөгдлийн дүрслэлээр
            сонгон харах боломжтой.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            py: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 10,
                p: 1,
                bgcolor: "#A5C984",
              }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                  backgroundColor: "#A5C984",
                },
              }}
              onClick={() => {
                setClickTree(1);
              }}
            >
              Байгууллага
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 10,
                p: 1,
                bgcolor: "#408FC9",
              }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                  backgroundColor: "#408FC9",
                },
              }}
              onClick={() => {
                setClickTree(2);
              }}
            >
              Өгөгдлийн сан
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 10,
                p: 1,
                bgcolor: "#B9C5FC",
              }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                  backgroundColor: "#B9C5FC",
                },
              }}
              onClick={() => {
                setClickTree(3);
              }}
            >
              Хүснэгт
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 10,
                p: 1,
                bgcolor: "#F2BE7A",
              }}
            ></Box>
            <Typography variant="body1">Үзүүлэлт</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="w-1/2">
          <ReactECharts
            option={option}
            style={{ height: "800px", width: "100%" }}
            onEvents={{ click: onChartClick }}
          />
        </div>
        <div className="w-1/2 flex flex-col">
          {searchValue != "" && (
            <TreeView data={groupedData} activeName={searchValue} />
          )}
          {searchValue != "" && allOrgData.length > 10 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "center",
                gap: 1,
                px: 2,
              }}
            >
              <Button
                variant="contained"
                color={"info"}
                size="small"
                onClick={() => {
                  setAllData(true);
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    textTransform: "lowercase",
                    ":first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  Бүх үзүүлэлт харах
                </Typography>
              </Button>
            </Box>
          )}
        </div>
      </Box>
      <Box>
        {allData && allOrgData.length > 10 && (
          <TreeView data={allOrgData} activeName={searchValue} />
        )}
      </Box>
    </div>
  );
};

export default GraphChartComponent;
