import {Fragment, useCallback, useEffect, useState} from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Resolves charts dependencies
import axios from "axios";
import {AccountInfo} from '../../../constants/Account'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

//URL STUFFS
const SUSCASES_METADATA_API = "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:zslpvuaEqGP;k4BY4UHodO1&dimension=pe:20200201;20200202;20200203;20200204;20200205;20200206;20200207;20200208;20200209;20200210;20200211;20200212;20200213;20200214;20200215;20200216;20200217;20200218;20200219;20200220;20200221;20200222;20200223;20200224;20200225;20200226;20200227;20200228;20200229;20200301;20200302;20200303;20200304;20200305;20200306;20200307;20200308;20200309;20200310;20200311;20200312;20200313;20200314;20200315;20200316;20200317;20200318;TODAY;LAST_14_DAYS&filter=ou:USER_ORGUNIT&skipMeta=false&skipData=true&includeMetadataDetails=true";
const SUSCASES_DESCRIPTION_API = "https://covid19.dhis2.org/demo/api/31/charts/tLbRZiCLCqC?fields=id%2CdisplayName~rename(name)%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!series%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren";
const SUSCASES_DATA_API = "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:k4BY4UHodO1;zslpvuaEqGP&dimension=pe:20200201;20200202;20200203;20200204;20200205;20200206;20200207;20200208;20200209;20200210;20200211;20200212;20200213;20200214;20200215;20200216;20200217;20200218;20200219;20200220;20200221;20200222;20200223;20200224;20200225;20200226;20200227;20200228;20200229;20200301;20200302;20200303;20200304;20200305;20200306;20200307;20200308;20200309;20200310;20200311;20200312;20200313;20200314;20200315;20200316;20200317;20200318;LAST_14_DAYS;TODAY&filter=ou:USER_ORGUNIT&skipData=false&skipMeta=true";

//NOTE:NEVER USE ASYNC AWAIT IN useEffect

//TODO CHECK THE ORDERS OF DATA WHICH IS CURRENTLY REVERSED
export const ConfirmedProbableCases = (props) => {
    const [isReady, setReady] = useState(false)
    const [dataSource, setData] = useState({})
    const initialDataSource = {
        chart: {
            caption: "",
            yaxisname: "",
            subcaption: "",
            plottooltext: "<sub>$label:</sub> {br} $seriesName <b>$dataValue</b> ",
            theme: "fusion",
            plotSpacePercent: 50,
            // divLineAlpha: "0",
            valuePadding: "5",
            labelFontSize: 13,
            labelDisplay: "rotate",
            slantLabel: "1",
            numDivLines: 0,
        },
        categories: [],
        dataset: []
    }

    const chartConfig = {
        type: "stackedColumn2d",
        width: "100%",
        height: "50%",
        dataFormat: "json",
        dataSource,
    };

    // const chartType = {stack: "scrollstackedcolumn2d", single: "scrollColumn2d"};

    //ASYNC FUNCTION FOR FETCHING DATA - LABELS - DESCRIPTION
    const fetchLabels = useCallback(async () => {
        const data = await axios.get(SUSCASES_METADATA_API, {
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                // 'Authorization': ,
                withCredentials: true,
                mode: 'no-cors',
            },
            ...AccountInfo
        })
        const labelListMetaData = data.data?.metaData?.items
        let category = []
        // console.log(labelListMetaData)
        //NOTE: KEEP IN MIND THAT YOU SHOULD NEVER USE SETSTATE INSIDE AN HOOK EFFECT

        //NOTE: Sort the object attributes by its key.
        for (const i in labelListMetaData) {
            const {dimensionItemType, name, uid} = labelListMetaData[i]
            if (dimensionItemType === "PERIOD") {
                category = [...category, {label: name}]
            } else if (dimensionItemType === "PROGRAM_INDICATOR") {
                initialDataSource.dataset.push
                (
                    {
                        seriesname: name,
                        id: uid,
                        data: []
                    }
                )
            } else if (dimensionItemType === "ORGANISATION_UNIT") {
                initialDataSource.chart.subcaption = name
            }
        }

        initialDataSource.categories.push({category})
    }, [])

    const fetchChartData = useCallback(async () => {
        const dataResponse = await axios(SUSCASES_DATA_API, {
            method: 'GET',
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                // 'Authorization': ,
                withCredentials: true,
                mode: 'no-cors',
            },
            ...AccountInfo
        })
        const dataListArray = dataResponse.data.rows
        let idArray = [];
        dataListArray.forEach(dataList => {
            //RUN THE CONDITION IN THE FIRST TIME ACCESSING THE ARRAY
            if (idArray.length === 0) {
                idArray.push(dataList[0])
            } else if (!idArray.includes(dataList[0])) {
                //CHECK IF THE ARRAY HAS THE ID OF CURRENT ARRAY. IF NOT PUSH IT INTO THE ARRAY
                idArray.push(dataList[0]);
            }
            //idArray.indexOf(dataList[0]) to find the index of current array id inside idArray
            initialDataSource.dataset[idArray.indexOf(dataList[0])].data.push({value: dataList[2]})
        })
    }, [])

    const fetchChartMetadata = useCallback(async () => {
        await axios(SUSCASES_DESCRIPTION_API, {
            method: 'GET',
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                // 'Authorization': ,
                withCredentials: true,
                mode: 'no-cors',
            },
            ...AccountInfo
        }).then(response => {
            // setMetadata({caption: response.data.name})
            initialDataSource.chart.caption = response.data.name
        })
    }, [])

    //NOTE EFFECT TO CALL ALL THOSE FETCH FUNCTIONS
    useEffect(() => {
        const asyncFunction = async () => {
            await fetchLabels()
            await fetchChartData()
            await fetchChartMetadata();
            setReady(true)
            setData(initialDataSource)
        }

        asyncFunction()
    }, [fetchLabels, fetchChartData, fetchChartMetadata])

    // useEffect(() => {
    //     console.log(dataSource)
    // }, [dataSource, isReady])

    return (
        <Fragment>
            {isReady ? <ReactFC {...chartConfig} /> : <div><h2>Not yet</h2></div>}
        </Fragment>
    )
};