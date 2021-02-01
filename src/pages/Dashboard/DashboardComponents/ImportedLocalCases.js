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
const SUSCASES_METADATA_API = "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:cJ9jP3kr3DD;z833oDG8Wpw;PirI9DDiTt6&dimension=pe:LAST_12_WEEKS&filter=ou:USER_ORGUNIT&skipMeta=false&skipData=true&includeMetadataDetails=true";
const SUSCASES_DESCRIPTION_API = "https://covid19.dhis2.org/demo/api/31/charts/bm3tzkAPSaN?fields=id%2CdisplayName~rename(name)%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!series%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren";
const SUSCASES_DATA_API = "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:PirI9DDiTt6;cJ9jP3kr3DD;z833oDG8Wpw&dimension=pe:LAST_12_WEEKS&filter=ou:USER_ORGUNIT&skipData=false&skipMeta=true";

//NOTE:NEVER USE ASYNC AWAIT IN useEffect

export const ImportedLocalCases = (props) => {
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
            showValues: 1,
            showXAxisLine: 0,
            showYAxisLine: 0,
            valuePadding: "5",
            labelFontSize: 13,
        },
        categories: [],
        dataset: []
    }

    const chartConfig = {
        type: "stackedColumn2d",
        width: "50%",
        height: "50%",
        dataFormat: "json",
        dataSource,
    };

    const chartType = {stack: "scrollstackedcolumn2d", single: "scrollColumn2d"};

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
        //NOTE KEEP IN MIND THAT YOU SHOULD NEVER USE SETSTATE INSIDE AN HOOK EFFECT
        const sortedLabelList = Object.keys(labelListMetaData).sort().reduce(
            (obj, key) => {
                obj[key] = labelListMetaData[key];
                return obj
            },
            {}
        )

        for (const i in sortedLabelList) {
            const {dimensionItemType, name, uid} = sortedLabelList[i]
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