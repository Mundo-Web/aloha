import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useRef } from "react"
import { Local } from "sode-extend-react";
import Logout from "../../actions/Logout";

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
      {
        showSlogan &&
        <div className="text-center px-[5%] py-4 bg-[#A191B8] text-white text-sm">
          ENVÍO GRATIS A LIMA METROPOLITANA <br className="md:hidden" /><b>POR COMPRAS MAYORES A S/100</b>
        </div>
      }
      <header className="sticky top-0 w-full z-40">
        <div className={`flex justify-between items-center ${!isOpen && location.pathname == '/' && 'bg-opacity-80'} text-white pe-[5%] shadow-lg lg:shadow-none`}
          style={{
            backgroundImage: `linear-gradient(to right, ${gradientStart}, ${menuGradientEnd})`
          }}>
          <div className="flex items-center md:px-[5%]">
            <button
              ref={btnToggleRef}
              onClick={toggleMenu}
              className="text-white h-16 w-16 px-6 menu-toggle lg:hidden"
              aria-label="Toggle menu"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
            <a href="/">
              <img src="/assets/img/logo.svg" alt="Trasciende Logo" className="h-8 -mt-3.5" />
            </a>
          </div>
          <div className="py-6 flex gap-2 md:gap-4 items-center">

            <ul className="hidden lg:flex gap-8 me-4">
              <li><a href="/about" className="block py-2">NOSOTROS</a></li>
              <li><a href="/supplies" className="block py-2">NUESTROS INGREDIENTES</a></li>
              <li><a href="/plans" className="block py-2">SUSCRIPCIÓN</a></li>
              <li><a href="/faqs" className="block py-2">Q&A</a></li>
            </ul>

            <button href="/test" className="rounded-full px-3 py-2 bg-white text-[#A191B8] text-sm">CREA TU FÓRMULA</button>
            <div className="relative">
              <Tippy content={session ? `Perfil de ${session.name}` : 'Iniciar sesión'}>
                <button 
                  className="relative block profile-button" 
                  onClick={() => {
                    if (!session) {
                      location.href = '/login'
                    } else {
                      setIsProfileOpen(!isProfileOpen)
                    }
                  }}
                >
                  {session && (
                    <span className="w-2 h-2 bg-green-500 rounded-full font-bold absolute bottom-0 -right-1"></span>
                  )}
                  <i className="text-xl fa fa-user"></i>
                </button>
              </Tippy>
              {session && isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700">
                  <a href="/login" className="block px-4 py-2 hover:bg-gray-100">
                    <i className="fa fa-user-circle mr-2"></i>
                    Ver perfil
                  </a>
                  <button 
                    onClick={Logout} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <i className="fa fa-sign-out-alt mr-2"></i>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
            {showCartIcon && (
              <Tippy content={'Seguir comprando'}>
                <a href={`/formula/${formula.id}`}>
                  <i className="text-xl fas fa-shopping-cart scale-110 hover:scale-125 transition-transform duration-300"></i>
                </a>
              </Tippy>
            )}
          </div>

        </div>
        <div
          ref={menuRef}
          className={`absolute top-full inset-0 text-white z-40 transform ${isOpen ? 'opacity-1' : 'hidden opacity-0'} transition-transform duration-300 ease-in-out p-[5%] h-max overflow-y-auto`}
          style={{
            backgroundImage: `linear-gradient(to right, ${gradientStart}, ${menuGradientEnd})`
          }}>
          <ul className="flex flex-col gap-4 items-center justify-center">
            <li>
              <a href="/about">NOSOTROS</a>
            </li>
            <li>
              <a href="/supplies">NUESTROS INGREDIENTES</a>
            </li>
            <li>
              <a href="/plans">SUSCRIPCIÓN</a>
            </li>
            <li>
              <a href="/faqs">Q&A</a>
            </li>
          </ul>
        </div>
      </header >
    </>
  )
};

export default Header