/**
 * Created by out_xu on 17/8/10.
 */
import React from 'react'
import './index.less'

import HomeBanner from './Banner'
import Footer from './Footer'
import ShowItem from './ShowItem'

const HomePage = () => {
  return (
    <div className='home-page'>
      <HomeBanner />
      <ShowItem />
      <Footer />
    </div>
  )
}

export default HomePage
