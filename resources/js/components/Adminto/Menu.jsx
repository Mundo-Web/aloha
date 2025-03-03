import Tippy from '@tippyjs/react'
import React from 'react'
import 'tippy.js/dist/tippy.css'
import Logout from '../../Actions/Logout'
import MenuItem from '../MenuItem'
import MenuItemContainer from '../MenuItemContainer'

const Menu = ({ session, hasRole, salesCount }) => {
  const mainRole = session.roles[0]

  return (<div className="left-side-menu">
    <div className="h-100" data-simplebar>
      <div className="user-box text-center">
        <img src={`/api/admin/profile/thumbnail/${session.relative_id}?v=${new Date(session.updated_at).getTime()}`} alt={session.name} title={session.name}
          className="rounded-circle img-thumbnail avatar-md" style={{ backgroundColor: 'unset', borderColor: '#98a6ad', objectFit: 'cover', objectPosition: 'center' }} onError={e => e.target.src = `https://ui-avatars.com/api/?name=${session.name}+${session.lastname}&color=7F9CF5&background=EBF4FF`} />
        <div className="dropdown">
          <a href="#" className="user-name dropdown-toggle h5 mt-2 mb-1 d-block" data-bs-toggle="dropdown"
            aria-expanded="false">{session.name.split(' ')[0]} {session.lastname.split(' ')[0]}</a>
          <div className="dropdown-menu user-pro-dropdown">


            <a href="/profile" className="dropdown-item notify-item">
              <i className="fe-user me-1"></i>
              <span>Mi perfil</span>
            </a>

            <a href="/account" className="dropdown-item notify-item">
              <i className="mdi mdi-account-key-outline me-1"></i>
              <span>Mi cuenta</span>
            </a>

            <a href="#" className="dropdown-item notify-item right-bar-toggle dropdown notification-list">
              <i className="fe-settings me-1"></i>
              <span>Configuracion</span>
            </a>

            <a href="#" className="dropdown-item notify-item" onClick={Logout}>
              <i className="fe-log-out me-1"></i>
              <span>Cerrar sesion</span>
            </a>

          </div>
        </div>

        {/* <Tippy content={mainRole.description} arrow={true}> */}
        <p className="text-muted left-user-info" >{mainRole.name}</p>
        {/* </Tippy> */}

        <ul className="list-inline">
          <li className="list-inline-item">
            <Tippy content="Configuracion">
              <a href="#" className="text-muted left-user-info right-bar-toggle dropdown notification-list">
                <i className="mdi mdi-cog"></i>
              </a>
            </Tippy>
          </li>

          <li className="list-inline-item">
            <Tippy content="Cerrar sesion">
              <a href="#" className="text-danger" onClick={Logout}>
                <i className="mdi mdi-power"></i>
              </a>
            </Tippy>
          </li>
        </ul>
      </div>


      <div id="sidebar-menu" className='show'>

        <ul id="side-menu">
          <li className="menu-title">Navigation Panel</li>
          {
            hasRole('Admin') && <>
              <MenuItem href="/admin/home" icon='mdi mdi-home'>Dashboard</MenuItem>
              <MenuItem href="/admin/sales" icon='mdi mdi-cart-outline'>
                <span className="badge bg-primary float-end">{salesCount}</span>
                Pedidos
              </MenuItem>
              <MenuItemContainer title='Productos y colores' icon='mdi mdi-cube'>
                <MenuItem href="/admin/items" icon='mdi mdi-cube-send'>Items</MenuItem>
                <MenuItem href="/admin/colors" icon='mdi mdi-palette-outline'>Colores</MenuItem>
              </MenuItemContainer>
              {/* <MenuItem href='/admin/gifts' icon='mdi mdi-gift' badge >
                <span className="badge bg-primary float-end">Nuevo</span>
                Gifts
              </MenuItem> */}
              <MenuItemContainer title='Características' icon='mdi mdi-flask-round-bottom'>
                <MenuItem href="/admin/supplies" icon='mdi mdi-flask-round-bottom'>Ingredientes</MenuItem>
                <MenuItem href="/admin/formulas" icon='mdi mdi-flask'>Fórmulas</MenuItem>
                <MenuItem href="/admin/fragrances" icon='mdi mdi-fleur-de-lis'>Fragancias</MenuItem>
              </MenuItemContainer>
              <MenuItemContainer title='Ventas' icon='mdi mdi-cash-register'>
                <MenuItem href="/admin/renewals" icon='mdi mdi-calendar-month'>Renovaciones</MenuItem>
                <MenuItem href="/admin/bundles" icon='mdi mdi-package-variant'>Paquetes</MenuItem>
                <MenuItem href="/admin/coupons" icon='mdi mdi-ticket-percent'>Cupones</MenuItem>
              </MenuItemContainer>
              <li className="menu-title">Mailing y subscripciones</li>
              <MenuItemContainer title='Mailing' icon='mdi mdi-email-send'>
                <MenuItem href="/admin/mailing/templates" icon='mdi mdi-calendar-month'>Plantillas</MenuItem>
                <MenuItem href="/admin/mailing/history" icon='mdi mdi-package-variant'>Historial</MenuItem>
              </MenuItemContainer>
              <MenuItem href="/admin/subscriptions" icon='mdi mdi-email-multiple'>Subscripciones</MenuItem>
              <li className="menu-title">Landing Page</li>
              <MenuItem href="/admin/ads" icon='mdi mdi-google-ads'>Pop-ups</MenuItem>
              <MenuItem href="/admin/sliders" icon='mdi mdi-page-layout-body'>Sliders</MenuItem>
              <MenuItem href="/admin/about" icon='mdi mdi-briefcase'>Nosotros</MenuItem>
              <MenuItem href="/admin/testimonies" icon='mdi mdi-forum'>Testimonios</MenuItem>
              <MenuItem href="/admin/faqs" icon='mdi mdi-frequently-asked-questions'>FAQs</MenuItem>
              <MenuItem href="/admin/socials" icon='mdi mdi-web'>Redes Sociales</MenuItem>
              <li className="menu-title">Configuraciones</li>
              <MenuItem href="/admin/users" icon='mdi mdi-account-multiple'>Usuarios</MenuItem>
              <MenuItem href="/admin/generals" icon='mdi mdi-credit-card-settings'>Datos Generales</MenuItem>
              <MenuItem href="/admin/profile" icon='mdi mdi-account-box'>Mi perfil</MenuItem>
              <MenuItem href="/admin/account" icon='mdi mdi-account-key'>Mi cuenta</MenuItem>
            </>
          }


        </ul>

      </div>
      <div className="clearfix"></div>

    </div>


  </div>)
}

export default Menu