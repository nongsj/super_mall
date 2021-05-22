import {request} from '@/utils/request'

// export function getHomeMultidata(data) {
//   return request({
//     method: 'post',
//     url: '/carouselimg/list',
//     data
//   })
// }

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params:{
      type,
      page
    }
  })
}