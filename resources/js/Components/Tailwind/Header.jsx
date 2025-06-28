import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useRef } from "react"
import { Local } from "sode-extend-react";
import Logout from "../../actions/Logout";
import IconAloha from './images/icon-aloha.svg'

const Header = ({ session, showSlogan, gradientStart, menuGradientEnd }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const btnToggleRef = useRef(null);

  const toggleMenu = (event) => {
    if (event.target.closest('.menu-toggle')) {
      setIsOpen(!isOpen)
    } else {
      setIsOpen(false)
    }
  }

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Manejo del menú principal
      if (btnToggleRef.current == event.target || btnToggleRef.current?.contains(event.target)) return
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleProfileClickOutside = (event) => {
      // Manejo del menú de perfil
      const profileButton = document.querySelector('.profile-button')
      if (profileButton && (profileButton === event.target || profileButton.contains(event.target))) return
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('mousedown', handleProfileClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('mousedown', handleProfileClickOutside)
    }
  }, [])

  const formula = Local.get('vua_formula')
  const showCartIcon = formula && !location.pathname.startsWith('/test/result') && !location.pathname.startsWith('/formula/')

  return (
    <>
      <header className="bg-[#31294c] text-white sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <img src={IconAloha} alt="Icono AlohaPeru" className="w-8" />
            <span className="text-xl font-bold">AlohaPeru</span>
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/hostings" className="hover:text-blue-300">
              Hosting
            </a>
            <a href="#" className="hover:text-blue-300">
              Dominios
            </a>
            <a href="#" className="hover:text-blue-300">
              Certificados SSL
            </a>
            <a href="#" className="hover:text-blue-300">
              Nosotros
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            {/* <span className="text-sm">Mi cuenta</span> */}
            <button variant="outline" size="sm" className="text-white border rounded py-1 px-4 border-white hover:bg-white hover:text-[#2D1B69] transition-all">
              Mi cuenta
            </button>
          </div>
        </div>
      </header>
      {
        showSlogan &&
        <div className="bg-[#26203c] text-white text-sm border-b border-white border-opacity-10">
          <div className="flex justify-between container mx-auto px-4 py-3">
            <div>
              <b>New!</b> Superfast WordPress hosting
            </div>
            <ul className="flex justify-center gap-4">
              <li>
                <a href="#" className="hover:text-blue-300">
                  <span className="hidden md:inline">Ayuda</span>
                  <i className="mdi mdi-help-circle md:hidden"></i>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  <span className="hidden md:inline">FAQs</span>
                  <i className="mdi mdi-frequently-asked-questions md:hidden"></i>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  <span className="hidden md:inline">Contacto</span>
                  <i className="mdi mdi-account-box md:hidden"></i>
                </a>
              </li>
              {/* ENVÍO GRATIS A LIMA METROPOLITANA <br className="md:hidden" /><b>POR COMPRAS MAYORES A S/100</b> */}
            </ul>
          </div>
        </div>
      }
    </>
  )
};

export default Header