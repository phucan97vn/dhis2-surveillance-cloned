import React, {useState, useMemo} from "react";
import {SuspectedCase} from "./DashboardComponents/SuspectedCase";
import {ConfirmedProbableCases} from "./DashboardComponents/ConfirmedProbableCases";
import {WeeklyDeaths} from "./DashboardComponents/WeeklyDeaths";
import {ImportedLocalCases} from "./DashboardComponents/ImportedLocalCases";
import {ConfirmedCasesLast14days} from "./DashboardComponents/ConfirmedCasesLast14days";
import {SingleValueView} from "./DashboardComponents/SingleValueView";
// import { connect } from 'react-redux'

// const dataConfig = (chartType,config) => {
//     switch(chartType):
//     case:
// }

const singleValueAPIList = [
    {
        METADATA_API: "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:zCaomudM2hO&filter=ou:USER_ORGUNIT&filter=pe:MONTHS_THIS_YEAR&skipMeta=false&skipData=true&includeMetadataDetails=true",
        DESCRIPTION_API: "https://covid19.dhis2.org/demo/api/31/charts/IGGkolJJlhP?fields=id%2CdisplayName~rename(name)%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!series%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren",
        DATA_API: "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:zCaomudM2hO&filter=ou:USER_ORGUNIT&filter=pe:MONTHS_THIS_YEAR&skipData=false&skipMeta=true",
    },
    {
        METADATA_API: "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:zslpvuaEqGP&filter=ou:USER_ORGUNIT&filter=pe:THIS_YEAR&skipMeta=false&skipData=true&includeMetadataDetails=true",
        DESCRIPTION_API: "https://covid19.dhis2.org/demo/api/31/charts/ajLN1pM7Xnt?fields=id%2CdisplayName~rename(name)%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!series%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren",
        DATA_API: "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:zslpvuaEqGP&filter=ou:USER_ORGUNIT&filter=pe:THIS_YEAR&skipData=false&skipMeta=true",
    },
    {
        METADATA_API: "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:LvpUocz7ZdR&filter=ou:USER_ORGUNIT&filter=pe:THIS_YEAR&skipMeta=false&skipData=true&includeMetadataDetails=true",
        DESCRIPTION_API: "https://covid19.dhis2.org/demo/api/31/charts/bHBu6F3fyUE?fields=id%2CdisplayName~rename(name)%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!series%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren",
        DATA_API: "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:LvpUocz7ZdR&filter=ou:USER_ORGUNIT&filter=pe:THIS_YEAR&skipData=false&skipMeta=true",
    },
    {
        METADATA_API: "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:IscKKNJXRR6&filter=ou:USER_ORGUNIT&filter=pe:THIS_YEAR&skipMeta=false&skipData=true&includeMetadataDetails=true",
        DESCRIPTION_API: "https://covid19.dhis2.org/demo/api/31/charts/JhZqfbotr3l?fields=id%2CdisplayName~rename(name)%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!series%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren",
        DATA_API: "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:IscKKNJXRR6&filter=ou:USER_ORGUNIT&filter=pe:THIS_YEAR&skipData=false&skipMeta=true",
    }
]

const chartType = {stack: "scrollstackedcolumn2d", single: "scrollColumn2d"};

export const Dashboard = () => {
    // const [fakeChartData] = useState(dataSource);

    //TODO READ TYPE FROM RESPONSE DESCRIPTION API TO DETERMINE THE CHART TYPE.

    // const chartConfig = useMemo(() => {
    //     const defaultConfig = {
    //         type:
    //             fakeChartData.dataset.length > 1 ? chartType.stack : chartType.single,
    //         width: "100%",
    //         height: "100%",
    //         dataFormat: "json",
    //         dataSource,
    //     };
    //     return defaultConfig;
    // }, [fakeChartData]);

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
                        <SingleValueView api={singleValueAPIList[0]}/>
                        <SingleValueView api={singleValueAPIList[1]}/>
                        <SingleValueView api={singleValueAPIList[2]}/>
                        <SingleValueView api={singleValueAPIList[3]}/>
                    </div>

                    <ConfirmedProbableCases/>
                    <ConfirmedCasesLast14days/>
                    <SuspectedCase/>
                    <WeeklyDeaths/>
                    <ImportedLocalCases/>
                </div>
            </div>
        </>
    );
};
