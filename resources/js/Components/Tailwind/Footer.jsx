import React, { useState } from "react";
import ReactModal from "react-modal";

import Tippy from "@tippyjs/react";
import HtmlContent from "../../Utils/HtmlContent";

ReactModal.setAppElement('#app')

const Footer = ({ socials, terms, footerLinks = [] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const links = {}
  footerLinks.forEach(fl => {
    links[fl.correlative] = fl?.description ?? ''
  })

  return (
    <>
      <footer className="bg-[#1A0B3D] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <i className="w-5 h-5 mdi mdi-earth text-[#1A0B3D]" />
                </div>
                <span className="text-xl font-bold">AlohaPeru</span>
              </div>
              <p className="text-gray-300 mb-4"><a href="/" className="underline">alohaperu.com</a> es un servicio de alojamiento web económico, estable y de alta calidad.</p>002000
              <div className="flex space-x-2">
                <input placeholder="Tu email" className="bg-gray-800 border-gray-700" />
                <button className="bg-blue-600 hover:bg-blue-700">Suscribirse</button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Productos</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Hosting Web
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Dominios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    VPS
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Email
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Estado del servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentación
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Carreras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Términos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AlohaPeru. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal para Términos y Condiciones */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Términos y condiciones"
        className="absolute left-1/2 -translate-x-1/2 bg-white p-6 rounded shadow-lg w-[95%] max-w-2xl my-8 outline-none h-[90vh]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <button onClick={closeModal} className="float-right text-gray-500 hover:text-gray-900">
          Cerrar
        </button>
        <h2 className="text-xl font-bold mb-4">Políticas de privacidad y condiciones de uso</h2>
        <HtmlContent className="prose h-[calc(90vh-120px)] lg:h-[calc(90vh-90px)] overflow-auto" html={terms.description} />
      </ReactModal>
    </>
  );
};

export default Footer;
