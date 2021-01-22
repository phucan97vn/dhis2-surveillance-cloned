import React, { useState, useEffect, useMemo } from "react";
import View from "../components/View";
import { ViewChart } from "../components/ViewChart";
// import { connect } from 'react-redux'

const dataConfig = (chartType,config) => {
    switch(chartType):
    case:
}

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

  const [fakeChartData] = useState([]);

  const chartType = ["scrollstackedcolumn2d", "scrollColumn2d"];

  // const defaultConfig = {
  //   type: "scrollstackedcolumn2d",
  //   width: "100%",
  //   height: "100%",
  //   dataFormat: "json",
  //   dataSource,
  // };

  // const chartConfig = useMemo(() => changeChartType());

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
            <ViewChart />
            {/* <ViewChart data={chartConfig} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
