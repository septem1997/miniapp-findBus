import wepy from 'wepy'

export default class Util {
  static iconSize = 35
  static MapKey = 'BGDBZ-J7ZKI-KWVGN-56UTK-3TGPS-DWBVH'

  static myRequest (c) {
    let config = {
      showLoading: true,
      loadingText: '加载中...',
      data: {},
      noToken: false
    }
    for (let key in c) {
      config[key] = c[key]
    }
    if (config.showLoading) {
      wepy.showLoading({
        title: config.loadingText
      })
    }
    return wepy.request({
      url: config.url,
      data: config.data
    }).then((res) => {
      return new Promise((resolve, reject) => {
        wepy.hideLoading()
        //todo 错误检测，并发量超过5，附近无公交
        if (res.statusCode === 200) {
            resolve(res)
        } else {
          reject(res)
        }
      })
    }).catch((error)=>{
      console.log(error)
      wepy.hideLoading()
      let text = ''
      for(let key in error){
        text+=key+':'+error[key]+'\n'
      }
      wepy.showModal({
        title: '错误',
        content: text,
        showCancel:false
      })
    })
  }
}
