/**
 * Created by wang on 2017/8/11.
 */
import React, { PropTypes, Component } from 'react'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import QueueAnim from 'rc-queue-anim'
import './index.less'
import config from './footer.json'

class Footer extends Component {
  getLiChildren = (data, i) => {
    const links = data.contentLink.split(/\n/).filter(item => item)
    const content = data.content.split(/\n/).filter(item => item)
    .map((item, ii) => {
      const cItem = item.trim()
      const isImg = cItem.match(/\.(jpg|png|svg|bmp|jpeg)$/i)  //   匹配（\.）jpg等格式，$匹配字符串的结束位置，i:不区分大小写
      return (
        <li className={isImg ? 'icon' : ''} key={ii}>
          <a href={links[ii]} target='_blank'>
            {isImg ? <img src={cItem} width='100%' /> : cItem}
          </a>
        </li>
      )
    })
    return (
      <li className={data.className} key={i} id={`${this.props.id}-block${i}`}>
        <h2>{data.title}</h2>
        <ul>
          {content}
        </ul>
      </li>
    )
  }

  render () {
    const props = {...this.props}
    const isMode = props.isMode
    const dataSource = config.footerItem
    const liChildrenToRender = dataSource.map(this.getLiChildren)
    return (
      <OverPack
        {...props}
        playScale={isMode ? 0.5 : 0.2}
      >
        <QueueAnim type='bottom' component='ul' key='ul' leaveReverse id={`${props.id}-ul`}>
          {liChildrenToRender}
        </QueueAnim>
      </OverPack>
    )
  }
  static propTypes = {
    id: PropTypes.string
  }
  static defaultProps = {
    className: 'footer-home'
  }
}

export default Footer

//   注意：用到map函数时候，所得的比如li标签比如
