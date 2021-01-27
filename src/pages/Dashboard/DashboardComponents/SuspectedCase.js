import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const dataSource = {
  chart: {
    caption: "Suspected cases - last 14 days",
    yaxisname: "",
    subcaption: "Trainningland",
    // flatscrollbars: "5",
    scrollheight: "10",
    plottooltext: " COVID-19 $seriesName $label: <b>$dataValue</b>",
    theme: "fusion",
    //styles
    widthPercent: 5,
    showPlotBorder: true,
    plotSpacePercent: 10,
    labelFontSize: 15,
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
      seriesname: "COVID19 Suspect cases",
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
  ],
};

const chartConfig = {
  type: "scrollColumn2d",
  width: "100%",
  height: "100%",
  dataFormat: "json",
  dataSource,
};

export const SuspectedCase = (props) => {
  return <ReactFC {...chartConfig} />;
};
