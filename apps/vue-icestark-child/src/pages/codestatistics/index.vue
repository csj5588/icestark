<!--
  姓名 时间
-->

<script>
  import Vue from 'vue'
  import VueClassDecorator from 'vue-class-component'
  import {Row, Col} from 'iview'
  import Hightchart from 'components/highchart'

  const classPrefix = 'cr-home'

  @VueClassDecorator({
    mixins: [],

    props: {},

    components: {},

    computed: {},

    watch: {},

    filters: {},

    methods: {},
  })
  export default class HomeTempalte extends Vue {
    chartData = {
      chart: {
        type: 'column'
      },
      title: {
        text: '测试用例排行'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45  // 设置轴标签旋转角度
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '测试用例'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: '代码量: <b>{point.y:.1f} </b>'
      },
      series: [{
        name: '总人口',
        data: [
        ],
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // :.1f 为保留 1 位小数
          y: 10
        }
      }]
    }

    getCodeData () {
      // let res = '{"dm_error":0,"error_msg":"操作成功","error_toast":"操作成功","data":{"loginfos":[{"name":"yixiangma","count":173569},{"name":"马一翔","count":0},{"name":"sjl","count":1388055},{"name":"ZhangHongfei","count":36670},{"name":"zhaixm","count":0},{"name":"sunzhen","count":22407},{"name":"wangw","count":6},{"name":"xiaomo","count":4111},{"name":"ZhaiXiaoMeng","count":50780},{"name":"Zhangyouhao","count":1407575},{"name":"dongcx","count":100}]}}';
      // let formRes = JSON.parse(res);
      // let ary = [];
      // formRes.data.loginfos.forEach(item => {
      //   let innerary = [];
      //   innerary.push(item.name);
      //   innerary.push(item.count);
      //   ary.push(innerary)
      // });
      // this.chartData.series[0].data = ary;
      // return;

      let getCount = () => {
        this.$S.CODE_DATA({
        }).then((res) => {
          let codedata = res.data;
          let ary = [];
          codedata.loginfos.forEach(item => {
            let innerary = [];
            innerary.push(item.name);
            innerary.push(item.count);
            ary.push(innerary)
          });
          this.chartData.series[0].data = ary;
        }).catch((err) => {
          this.$Message.error(err.error_msg)
        });
        window.setTimeout(getCount, 60000)
      };
      getCount();
    }
    created () {
      this.getCodeData()
    }

    mounted () {
    }

    render (h) {
      const {
        chartData
      } = this;
      return <div class={classPrefix}>
        <Hightchart chartData={chartData}></Hightchart>
      </div>
    }
  }
</script>

<style lang="less" scoped>
  @class-prefix: ~'cr-home';

  .@{class-prefix} {}
</style>
