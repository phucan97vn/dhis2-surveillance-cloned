export interface dataSourceInterFace {
    chart: {
        caption: string,
        yaxisname: string,
        subcaption: string,
        flatscrollbar?: string,
        plottooltext: string,
        scrollheight?: string,
        //styles
        widthPercent?: number,
        showPlotBorder?: boolean,
        plotSpacePercent?: number,
        labelFontSize?: number,
        labelDisplay?: string,
        slantLabel?: string,
        //theme
        theme: string,
    }
    categories: [
        {
            category: [
                {
                    label: string
                }
            ]
        }
    ]
}