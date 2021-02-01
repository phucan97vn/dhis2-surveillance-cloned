import React, {Fragment, useCallback, useEffect, useState} from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Resolves charts dependencies
import axios from "axios";
import {AccountInfo} from '../../../constants/Account'
import {PeriodFilter} from "../../../constants/PeriodFilter";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

//URL STUFFS
// const METADATA_API = "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:zCaomudM2hO&filter=ou:USER_ORGUNIT&filter=pe:MONTHS_THIS_YEAR&skipMeta=false&skipData=true&includeMetadataDetails=true";
// const DESCRIPTION_API = "https://covid19.dhis2.org/demo/api/31/charts/IGGkolJJlhP?fields=id%2CdisplayName~rename(name)%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!series%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren";
// const DATA_API = "https://covid19.dhis2.org/demo/api/31/analytics.json?dimension=dx:zCaomudM2hO&filter=ou:USER_ORGUNIT&filter=pe:MONTHS_THIS_YEAR&skipData=false&skipMeta=true";

//NOTE:NEVER USE ASYNC AWAIT IN useEffect

//TODO: CHECK THE TYPE OF VIEW FROM Type IN DESCRIPTION API TO DETERMINE IF IT IS VIEW CHART OR SINGLE VALUE VIEW ?
export const SingleValueView = (props) => {
    const {METADATA_API, DESCRIPTION_API, DATA_API} = props.api
    const [isReady, setReady] = useState(false)
    const [dataSource, setData] = useState({})
    const initialDataSource = {
        title: "",
        description: "",
        organizationUnit: "",
        period: "",
        value: ""
    }

    //ASYNC FUNCTION FOR FETCHING DATA - LABELS - DESCRIPTION
    const fetchLabels = useCallback(async () => {
        const data = await axios.get(METADATA_API, {
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
        //NOTE: KEEP IN MIND THAT YOU SHOULD NEVER USE SETSTATE INSIDE AN HOOK EFFECT

        for (const i in labelListMetaData) {
            const {dimensionItemType, name} = labelListMetaData[i]
            if (labelListMetaData[i].hasOwnProperty('dimensionItemType')) {
                if (dimensionItemType === "ORGANISATION_UNIT") {
                    initialDataSource.organizationUnit = name
                }
            } else if (!labelListMetaData[i].hasOwnProperty('dimensionItemType')) {
                if (PeriodFilter.includes(i)) {
                    initialDataSource.period = name
                }
            }
        }
    }, [])

    const fetchChartData = useCallback(async () => {
        const dataResponse = await axios(DATA_API, {
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
        initialDataSource.value = dataResponse.data?.rows[0][1];
    }, [])

    const fetchChartMetadata = useCallback(async () => {
        const dataResponse = await axios(DESCRIPTION_API, {
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
        // console.log(dataResponse)
        const {name, columns} = dataResponse.data
        initialDataSource.title = name
        initialDataSource.description = columns[0].items[0].name
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

    const {title, organizationUnit, period, description, value} = dataSource
    return (
        <Fragment>
            {
                isReady ?
                    <div className="view border border-2 rounded col-md col-sm-3 grid-item">
                        <div className="dashboard-item-header-title">
                            <span>{title}</span>
                        </div>
                        <div className="dashboard-item-content">
                            <p className="description">{description}</p>
                            <p>
                                {organizationUnit} - {period}
                            </p>

                            <p className="result">{value !== "" ? value : "No data"}</p>
                        </div>
                    </div>
                    : <div>Im not ready</div>
            }
        </Fragment>
    )
}
