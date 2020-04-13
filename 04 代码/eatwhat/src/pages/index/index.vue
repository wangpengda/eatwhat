<template>
  <div>
      <!--地图容器-->
      <map
          class="myMap"
          id="myMap"
          style="width: 100%; height: 400px;"
          :polyline="polyline"
        :longitude="longitude"
        :latitude="latitude"
         :markers="markers"
          scale='16'
          show-location
          show-compass
      >
      </map>
  <cover-view class="map-cover-view">
    <input >
    <button class="explore-btn" type="primary" >看看天意吧</button>
  </cover-view>
    
  </div>
</template>

<script>
import QQMapWX from '../../../static/lib/qqmap-wx-jssdk.js'
const qqmapsdk = new QQMapWX({
  key: 'EE4BZ-CS2H4-QFVUI-DXSGD-CILVQ-QHFPR'
})
export default {

  data () {
    return {
      startIcon: '../../../images/user.png',
      endIcon: '../../../images/user.png',
      latitude: 21.1505300000,
      longitude: 110.3015100000,
      scale: 16,
      markers: []
    }
  },
  components: {

  },
  onShow () {
    this.initLocation()
    // 创建地图'
    this.mapCtx = wx.createMapContext('myMap')
  },
  methods: {
    initLocation () {
      wx.getLocation({
        type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
        success: (mes) => {
          const theLatitude = mes.latitude
          const theLongitude = mes.longitude

          console.log(theLatitude, theLongitude)
        }
      })
    },
    formSubmit () {
      let that = this
      // 调用距离计算接口
      qqmapsdk.direction({
        mode: 'driving', // 可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
        // from参数不填默认当前地址
        from: {
          latitude: 21.1505300000,
          longitude: 110.3015100000
        },
        to: {
          latitude: 21.2691510000,
          longitude: 110.3483540000
        },

        success: function (res) {
          console.log(res)
          console.log('路线')
          console.log(res.result.routes)
          // let routes = res.result.routes
          // eslint-disable-next-line one-var
          var coors = res.result.routes[0].polyline, pl = []
          // 坐标解压（返回的点串坐标，通过前向差分进行压缩）
          var kr = 1000000
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr
          }
          // 将解压后的坐标放入点串数组pl中
          for (var j = 0; j < coors.length; j += 2) {
            pl.push({ latitude: coors[j], longitude: coors[j + 1] })
          }
          console.log(pl)
          // 设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
          this.markers = [
            {
              iconPath: this.startIcon,
              id: 0,
              latitude: 21.1505300000,
              longitude: 110.3015100000,
              width: 28,
              height: 28,
              zIndex: -1,
              anchor: {x: 0.5, y: 1}
            }, {
              iconPath: this.endIcon,
              id: 1,
              latitude: 21.2691510000,
              longitude: 110.3483540000,
              width: 28,
              height: 28,
              zIndex: -1,
              anchor: {x: 0.5, y: 1}
            }
          ]
          console.log('thst')
          console.log(that)
          // 显示地图
          /* that.setData({
            latitude: pl[0].latitude,
            longitude: pl[0].longitude,
            polyline: [{
              points: pl,
              color: '#FF0000DD',
              width: 4
            }]
          }) */
        },
        fail: function (error) {
          console.error(error)
        },
        complete: function (res) {
          console.log(res)
        }
      })
    }
  },
  mounted () {
    // formSubmit()
    this.$nextTick(() => {
      this.formSubmit()
    })
  }
}
</script>

<style>
.myMap{
  width: 100vw;
  height: 80vw
}
.bottomloaction{
    height: 15vh;
    width: 100vw;
    position: absolute;
    bottom: 0px;
}
</style>
