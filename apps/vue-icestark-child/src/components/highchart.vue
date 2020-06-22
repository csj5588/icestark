<style lang="less" scoped>
.chart-ele {
  width: 100%;
  height: 500px;
}
</style>

<template>
  <div ref="wrapper">
    <div ref="chartEle" class="chart-ele"/>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import HighchartsExport from 'highcharts/modules/exporting'
import ExportingData from 'highcharts/modules/export-data'

export default {
  props: {
    chartData: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    Highcharts.chart(this.$refs.chartEle, { ...this.chartData })
    HighchartsExport(Highcharts);
    ExportingData(Highcharts);
    Highcharts.setOptions({
      lang: {
        printChart: '打印图表',
        downloadJPEG: '下载 JPEG 文件',
        downloadPDF: '下载 PDF   文件',
        downloadPNG: '下载 PNG  文件',
        downloadSVG: '下载 SVG  文件',
        downloadCSV: '下载 CSV  文件',
        downloadXLS: '下载 XLS   文件',
        viewData: '查看数据表格'
      },
      navigation: {
        menuItemStyle: {
          padding: '6px 14px'
        }
      },
      exporting: {
        url: 'https://export.highcharts.com.cn'
      },
    });
  },
  created() {
    this.$watch((val) => {
      return this.chartData.series
    }, () => {
      Highcharts.chart(this.$refs.chartEle, { ...this.chartData })
      this.$refs.wrapper.appendChild(this.$refs.chartEle)
    }, {
      deep: true
    })
  }
}
</script>

