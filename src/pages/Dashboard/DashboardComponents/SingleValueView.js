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
                'Content-Type': 'application/json',
                withCredentials: true,
            },
            ...AccountInfo
        })
        const labelListMetaData = data.data?.metaData?.items

        for (const i in labelListMetaData) {
            if (labelListMetaData) {
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

        }
    }, [])

    const fetchChartData = useCallback(async () => {
        const dataResponse = await axios(DATA_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
                'Content-Type': 'application/json',
                withCredentials: true,
                mode: 'no-cors',
            },
            ...AccountInfo
        })
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
