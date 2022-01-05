export const options = {
    chart: {
        type: 'bar',
        height: 750,
        width: 950,
        background: '#f4f4f4',
        toolbar: {
            show: false,
        },
    },
    noData: {
        text: 'No data',
        align: 'center',
        verticalAlign: 'middle',
    },
    series: [
        {
            name: 'Counter',
            // data: [123, 350, 50, 49, 60, 70, 91, 125, 100, 245, 220, 235],
            data: [],
        },
    ],
    xaxis: {
        // categories: [
        //     1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002,
        // ],
        categories: [],
        title: {
            text: 'Month',
            margin: 10,
            // offsetY:15,
            style: {
                fontSize: '16px',
            },
        },
    },
    yaxis: {
        title: {
            text: 'Counters',
            margin: 20,
            offsetY: 20,
            style: {
                fontSize: '16px',
            },
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '95%',
            dataLabels: {
                position: 'top',
                //- position: 'top',
                //- position: "center",
                //- position: "end",
            },
        },
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            colors: ['#282721'],
        },
        offsetY: -20,
    },
    fill: {
        colors: ['#9ca8c7'],
    },
    title: {
        text: 'Annual Counters',
        align: 'center',
        margin: 15,
        offsetY: 10,
        style: {
            fontSize: '18px',
        },
    },
    states: {
        hover: {
            filter: {
                type: 'none',
            },
        },
    },
    tooltip: {
        enabled: false,
    },
};
