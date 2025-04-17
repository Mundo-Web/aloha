import React, { useState } from 'react'
import Footer from './Footer'
import Menu from './Menu'
import NavBar from './NavBar'
import RigthBar from './RightBar'
import WhatsAppModal from '../modals/WhatsAppModal'

moment.tz.setDefault('UTC');

const Base = ({ children, title, ...props }) => {

  const [whatsappStatus, setWhatsappStatus] = useState('verifying')
  return (<>
    <div id="wrapper">
      <NavBar {...props} title={title} whatsappStatus={whatsappStatus}/>
      <Menu {...props} />
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
    <WhatsAppModal status={whatsappStatus} setStatus={setWhatsappStatus} />
    <RigthBar {...props} />
    <div className="rightbar-overlay"></div>
  </>)
}

export default Base