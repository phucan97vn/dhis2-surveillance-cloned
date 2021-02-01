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
const SUSCASES_METADATA_API = "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:zCaomudM2hO&dimension=pe:20200101;20200102;20200103;20200104;20200105;20200106;20200107;20200108;20200109;20200110;20200111;20200112;20200113;20200114;20200115;20200116;20200117;20200118;20200119;20200120;20200121;20200122;20200123;20200124;20200125;20200126;20200127;20200128;20200129;20200130;20200131;20200201;20200202;20200203;20200204;20200205;20200206;20200207;20200208;20200209;20200210;20200211;20200212;20200213;20200214;20200215;20200216;20200217;20200218;20200219;20200220;20200221;20200222;20200223;20200224;20200225;20200226;20200227;20200228;20200229;20200301;20200302;20200303;20200304;20200305;20200306;20200307;20200308;20200309;20200310;20200311;20200312;20200313;20200314;20200315;20200316;20200317;20200318;20200319;20200320;20200321;20200322;20200323;20200324;20200325;20200326;20200327;20200328;20200329;20200330;20200331;20200401;20200402;20200403;20200404;20200405;20200406;20200407;20200408;20200409;20200410;20200411;20200412;20200413;20200414;20200415;20200416;20200417;20200418;20200419;20200420;20200421;20200422;20200423;20200424;20200425;20200426;20200427;20200428;20200429;20200430;20200501;20200502;20200503;20200504;20200505;20200506;20200507;20200508;20200509;20200510;20200511;20200512;20200513;20200514;20200515;20200516;20200517;20200518;20200519;20200520;20200521;20200522;20200523;20200524;20200525;20200526;20200527;20200528;20200529;20200530;20200531;20200601;20200602;20200603;20200604;20200605;20200606;20200607;20200608;20200609;20200610;20200611;20200612;20200613;20200614;20200615;20200616;20200617;20200618;20200619;20200620;20200621;20200622;20200623;20200624;20200625;20200626;20200627;20200628;20200629;20200630;20200701;20200702;20200703;20200704&filter=ou:USER_ORGUNIT&skipMeta=false&skipData=true&includeMetadataDetails=true";
const SUSCASES_DESCRIPTION_API = "https://covid19.dhis2.org/demo/api/31/charts/aVbaqLihI5F?fields=id%2CdisplayName~rename(name)%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!series%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren";
const SUSCASES_DATA_API = "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:zCaomudM2hO&dimension=pe:20200101;20200102;20200103;20200104;20200105;20200106;20200107;20200108;20200109;20200110;20200111;20200112;20200113;20200114;20200115;20200116;20200117;20200118;20200119;20200120;20200121;20200122;20200123;20200124;20200125;20200126;20200127;20200128;20200129;20200130;20200131;20200201;20200202;20200203;20200204;20200205;20200206;20200207;20200208;20200209;20200210;20200211;20200212;20200213;20200214;20200215;20200216;20200217;20200218;20200219;20200220;20200221;20200222;20200223;20200224;20200225;20200226;20200227;20200228;20200229;20200301;20200302;20200303;20200304;20200305;20200306;20200307;20200308;20200309;20200310;20200311;20200312;20200313;20200314;20200315;20200316;20200317;20200318;20200319;20200320;20200321;20200322;20200323;20200324;20200325;20200326;20200327;20200328;20200329;20200330;20200331;20200401;20200402;20200403;20200404;20200405;20200406;20200407;20200408;20200409;20200410;20200411;20200412;20200413;20200414;20200415;20200416;20200417;20200418;20200419;20200420;20200421;20200422;20200423;20200424;20200425;20200426;20200427;20200428;20200429;20200430;20200501;20200502;20200503;20200504;20200505;20200506;20200507;20200508;20200509;20200510;20200511;20200512;20200513;20200514;20200515;20200516;20200517;20200518;20200519;20200520;20200521;20200522;20200523;20200524;20200525;20200526;20200527;20200528;20200529;20200530;20200531;20200601;20200602;20200603;20200604;20200605;20200606;20200607;20200608;20200609;20200610;20200611;20200612;20200613;20200614;20200615;20200616;20200617;20200618;20200619;20200620;20200621;20200622;20200623;20200624;20200625;20200626;20200627;20200628;20200629;20200630;20200701;20200702;20200703;20200704&filter=ou:USER_ORGUNIT&skipData=false&skipMeta=true";

//NOTE:NEVER USE ASYNC AWAIT IN useEffect

export const SuspectedCase = (props) => {
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
            showValues: 1,
            labelFontSize: 13,
            labelDisplay: "rotate",
            slantLabel: "1",
        },
        categories: [],
        dataset: []
    }

    const chartConfig = {
        type: "scrollColumn2d",
        width: "100%",
        height: "100%",
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
    //     console.log("Ready state :", isReady)
    // }, [dataSource, isReady])

    return (
        <Fragment>
            {isReady ? <ReactFC {...chartConfig} /> : <div><h2>Not yet</h2></div>}
        </Fragment>
    )
};