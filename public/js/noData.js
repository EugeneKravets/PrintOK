export const noOptions = {
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
        text: 'No data about required year',
        align: 'center',
        verticalAlign: 'middle',
        style: {
            color: ['#282721'],
            fontSize: '18px',
        },
    },
    series: [
        {
            data: [],
        },
    ],
    xaxis: {
        categories: [],
    },
};
