import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const dataSource = {
  chart: {
    caption:
      "COVID-19 deaths based on case confirmation status (confirmed, inconclusive, suspected/not tested)",
    yaxisname: "",
    subcaption: "Trainningland",
    flatscrollbars: "5",
    scrollheight: "10",
    plottooltext: " $seriesName: <b>$dataValue</b>",
    theme: "fusion",
    //styles
    widthPercent: 5,
    showPlotBorder: true,
    plotSpacePercent: 10,
    labelFontSize: 10,
    labelDisplay: "rotate",
    slantLabel: "1",
    //theme
  },
  categories: [
    {
      category: [
        {
          label: "W44 2020",
        },
        {
          label: "W45 2020",
        },
        {
          label: "W46 2020",
        },
        {
          label: "W47 2020",
        },
        {
          label: "W48 2020",
        },
        {
          label: "W49 2020",
        },
        {
          label: "W50 2020",
        },
        {
          label: "W51 2020",
        },
        {
          label: "W52 2020",
        },
        {
          label: "W53 2020",
        },
        {
          label: "W1 2021",
        },
        {
          label: "W2 2021",
        },
      ],
    },
  ],
  dataset: [
    {
      seriesname: "COVID-19 Death( confirmed case)",
      data: [
        { id: "2020W44", value: "0" },
        { id: "2020W45", value: "0" },
        { id: "2020W46", value: "0" },
        { id: "2020W47", value: "0" },
        { id: "2020W48", value: "0" },
        { id: "2020W49", value: "0" },
        { id: "2020W50", value: "0" },
        { id: "2020W51", value: "0" },
        { id: "2020W52", value: "0" },
        { id: "2020W53", value: "0" },
        { id: "2021W1", value: "0" },
        { id: "201W2", value: "0" },
      ],
    },
    {
      seriesname: "COVID-19 Death( probable case)",
      data: [
        { id: "2020W44", value: "0.0" },
        { id: "2020W45", value: "0.0" },
        { id: "2020W46", value: "0.0" },
        { id: "2020W47", value: "0.0" },
        { id: "2020W48", value: "0.0" },
        { id: "2020W49", value: "1.0" },
        { id: "2020W50", value: "0.0" },
        { id: "2020W51", value: "0.0" },
        { id: "2020W52", value: "0.0" },
        { id: "2020W53", value: "0.0" },
        { id: "2021W1", value: "0.0" },
        { id: "2021W2", value: "0.0" },
      ],
    },
    {
      seriesname: "COVID-19 Death (case suspects, non tested)",
      data: [
        { id: "2020W44", value: "0.0" },
        { id: "2020W45", value: "0.0" },
        { id: "2020W46", value: "0.0" },
        { id: "2020W47", value: "0.0" },
        { id: "2020W48", value: "0.0" },
        { id: "2020W49", value: "0.0" },
        { id: "2020W50", value: "0.0" },
        { id: "2020W51", value: "0.0" },
        { id: "2020W52", value: "0.0" },
        { id: "2020W53", value: "0.0" },
        { id: "2021W1", value: "0.0" },
        { id: "2021W2", value: "0.0" },
      ],
    },
  ],
};

const chartConfig = {
  type: "scrollstackedcolumn2d",
  width: "800",
  height: "100%",
  dataFormat: "json",
  dataSource,
};

export const DeathOnConfirmed = () => {
  //   const [data, setData] = useState();

  return <ReactFC {...chartConfig} />;
};
