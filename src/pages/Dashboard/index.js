import React, { useState, useEffect, useMemo } from "react";
import View from "../components/View";
import { ViewChart } from "../components/ViewChart";
// import { connect } from 'react-redux'

// const dataConfig = (chartType,config) => {
//     switch(chartType):
//     case:
// }

const chartType = { stack: "scrollstackedcolumn2d", single: "scrollColumn2d" };

const dataSource = {
  chart: {
    caption:
      "Total confirmed & probable cases (by date of onset of symptoms), last 14 days",
    yaxisname: "",
    subcaption: "Trainningland",
    flatscrollbars: "5",
    scrollheight: "10",
    plottooltext: " COVID-19 $seriesName $label: <b>$dataValue</b>",
    theme: "fusion",
    //styles
    widthPercent: 5,
    showPlotBorder: true,
    plotSpacePercent: 0,
    labelFontSize: 10,
    chartLeftMargin: "40",
    chartTopMargin: "40",
    chartRightMargin: "40",
    chartBottomMargin: "40",
    labelDisplay: "rotate",
    slantLabel: "1",
    //theme
  },
  categories: [
    {
      category: [
        {
          label: "2020-02-01",
        },
        {
          label: "2020-02-02",
        },
        {
          label: "2020-02-03",
        },
        {
          label: "2020-02-04",
        },
        {
          label: "2020-02-05",
        },
        {
          label: "2020-02-06",
        },
        {
          label: "2020-02-07",
        },
        {
          label: "2020-02-08",
        },
        {
          label: "2020-02-09",
        },
        {
          label: "2020-02-10",
        },
        {
          label: "2020-02-11",
        },
        {
          label: "2020-02-12",
        },
        {
          label: "2020-02-13",
        },
        {
          label: "2020-02-14",
        },
        {
          label: "2020-02-15",
        },
        {
          label: "2020-02-16",
        },
        {
          label: "2020-02-17",
        },
        {
          label: "2020-02-18",
        },
        {
          label: "2020-02-19",
        },
        {
          label: "2020-02-20",
        },
        {
          label: "2020-02-21",
        },
        {
          label: "2020-02-22",
        },
        {
          label: "2020-02-23",
        },
        {
          label: "2020-02-24",
        },
        {
          label: "2020-02-25",
        },
        {
          label: "2020-02-26",
        },
        {
          label: "2020-02-27",
        },
        {
          label: "2020-02-28",
        },
        {
          label: "2020-02-29",
        },
        {
          label: "2020-03-01",
        },
        {
          label: "2020-03-02",
        },
        {
          label: "2020-03-03",
        },
        {
          label: "2020-03-05",
        },
        {
          label: "2020-03-06",
        },
        {
          label: "2020-03-07",
        },
        {
          label: "2020-03-08",
        },
        {
          label: "2020-03-09",
        },
        {
          label: "2020-03-10",
        },
        {
          label: "2020-03-11",
        },
        {
          label: "2020-03-12",
        },
        {
          label: "2020-03-13",
        },
        {
          label: "2020-03-14",
        },
        {
          label: "2020-03-15",
        },
        {
          label: "2020-03-16",
        },
        {
          label: "2020-03-17",
        },
        {
          label: "2020-03-18",
        },
      ],
    },
  ],
  dataset: [
    {
      seriesname: "Laboratory confirmed cases",
      data: [
        {
          id: "2020-02-01",
          value: "0",
        },
        {
          id: "2020-02-02",
          value: "0",
        },
        {
          id: "2020-02-03",
          value: "1",
        },
        {
          id: "2020-02-04",
          value: "0",
        },
        {
          id: "2020-02-05",
          value: "1",
        },
        {
          id: "2020-02-06",
          value: "0",
        },
        {
          id: "2020-02-07",
          value: "0",
        },
        {
          id: "2020-02-08",
          value: "0",
        },
        {
          id: "2020-02-09",
          value: "0",
        },
        {
          id: "2020-02-10",
          value: "0",
        },
        {
          id: "2020-02-11",
          value: "0",
        },
        {
          id: "2020-02-12",
          value: "0",
        },
        {
          id: "2020-02-13",
          value: "0",
        },
        {
          id: "2020-02-14",
          value: "1",
        },
        {
          id: "2020-02-15",
          value: "0",
        },
        {
          id: "2020-02-16",
          value: "0",
        },
        {
          id: "2020-02-17",
          value: "2",
        },
        {
          id: "2020-02-18",
          value: "0",
        },
        {
          id: "2020-02-19",
          value: "0",
        },
        {
          id: "2020-02-20",
          value: "1",
        },
        {
          id: "2020-02-21",
          value: "0",
        },
        {
          id: "2020-02-22",
          value: "0",
        },
        {
          id: "2020-02-23",
          value: "0",
        },
        {
          id: "2020-02-24",
          value: "1",
        },
        {
          id: "2020-02-25",
          value: "0",
        },
        {
          id: "2020-02-26",
          value: "0",
        },
        {
          id: "2020-02-27",
          value: "0",
        },
        {
          id: "2020-02-28",
          value: "2",
        },
        {
          id: "2020-02-29",
          value: "0",
        },
        {
          id: "2020-03-01",
          value: "4",
        },
        {
          id: "2020-03-02",
          value: "1",
        },
        {
          id: "2020-03-03",
          value: "2",
        },
        {
          id: "2020-03-04",
          value: "1",
        },
        {
          id: "2020-03-05",
          value: "1",
        },
        {
          id: "2020-03-06",
          value: "3",
        },
        {
          id: "2020-03-07",
          value: "1",
        },
        {
          id: "2020-03-08",
          value: "4",
        },
        {
          id: "2020-03-09",
          value: "1",
        },
        {
          id: "2020-03-10",
          value: "2",
        },
        {
          id: "2020-03-11",
          value: "0",
        },
        {
          id: "2020-03-12",
          value: "1",
        },
        {
          id: "2020-03-13",
          value: "1",
        },
        {
          id: "2020-03-14",
          value: "0",
        },
        {
          id: "2020-03-15",
          value: "0",
        },
        {
          id: "2020-03-16",
          value: "0",
        },
        {
          id: "2020-03-17",
          value: "0",
        },
        {
          id: "2020-03-18",
          value: "0",
        },
      ],
    },
    {
      seriesname: "Probable cases",
      data: [
        {
          value: "0",
        },
        {
          value: "1",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          value: "0",
        },
        {
          id: "2020-02-17",
          value: "0",
        },
        {
          id: "2020-02-18",
          value: "0",
        },
        {
          id: "2020-02-19",
          value: "0",
        },
        {
          id: "2020-02-20",
          value: "0",
        },
        {
          id: "2020-02-21",
          value: "0",
        },
        {
          id: "2020-02-22",
          value: "0",
        },
        {
          id: "2020-02-23",
          value: "0",
        },
        {
          id: "2020-02-24",
          value: "0",
        },
        {
          id: "2020-02-25",
          value: "0",
        },
        {
          id: "2020-02-26",
          value: "0",
        },
        {
          id: "2020-02-27",
          value: "1",
        },
        {
          id: "2020-02-28",
          value: "0",
        },
        {
          id: "2020-02-29",
          value: "1",
        },
        {
          id: "2020-03-01",
          value: "2",
        },
        {
          id: "2020-03-02",
          value: "1",
        },
        {
          id: "2020-03-03",
          value: "0",
        },
        {
          id: "2020-03-04",
          value: "1",
        },
        {
          id: "2020-03-05",
          value: "0",
        },
        {
          id: "2020-03-06",
          value: "2",
        },
        {
          id: "2020-03-07",
          value: "0",
        },
        {
          id: "2020-03-08",
          value: "2",
        },
        {
          id: "2020-03-09",
          value: "4",
        },
        {
          id: "2020-03-10",
          value: "3",
        },
        {
          id: "2020-03-11",
          value: "5",
        },
        {
          id: "2020-03-12",
          value: "0",
        },
        {
          id: "2020-03-13",
          value: "1",
        },
        {
          id: "2020-03-14",
          value: "1",
        },
        {
          id: "2020-03-15",
          value: "1",
        },
        {
          id: "2020-03-16",
          value: "1",
        },
        {
          id: "2020-03-17",
          value: "1",
        },
        {
          id: "2020-03-18",
          value: "0",
        },
      ],
    },
  ],
};

export const Dashboard = () => {
  const [fakeData] = useState([
    {
      title: "Total Suspected Cases - Current year",
      description: "COVID-19 Suspected cases",
      organization: "Test Organization",
      period: "Months this year",
      result: 5,
    },
    {
      title: "Laboratory confirmed cases - Current year",
      description: "COVID-19 Laboratory confirmed cases - by onset of symptoms",
      organization: "Test Organization",
      period: "This year",
      result: "",
    },
    {
      title: "Total deaths (among suspected cases)",
      description: "COVID-19 Deaths (all suspected cases)",
      organization: "Test Organization",
      period: "This year",
      result: "",
    },
    {
      title: "Total recovered (among confirmed cases)",
      description: "COVID-19 Recovered confirmed cases",
      organization: "Test Organization",
      period: "This year",
      result: "",
    },
  ]);

  const [fakeChartData] = useState(dataSource);

  const chartConfig = useMemo(() => {
    const defaultConfig = {
      type:
        fakeChartData.dataset.length > 1 ? chartType.stack : chartType.single,
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource,
    };
    return defaultConfig;
  }, [fakeChartData]);

  return (
    <>
      <div className="dashboard-wrapper">
        <div className="header">
          <h1>DHIS 2 - Dashboard</h1>
        </div>
        {/* <SearchBar /> */}
        <div className="titlebar-wrapper">
          <h2>01. COVID-19 Surveillance (Tracker)</h2>
        </div>
        <div className="grid-wrapper">
          <div className="row">
            <View data={fakeData[0]} />
            <View data={fakeData[1]} />
            <View data={fakeData[2]} />
            <View data={fakeData[3]} />
          </div>
          <div>
            <ViewChart chartConfig={chartConfig} />
            {/* <ViewChart data={chartConfig} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
