import React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, footerLinks, session, socials, terms, showSlogan = true, showFooter = true, gradientStart = '#c4b8d3', gradientEnd = '#f1d7c1', menuGradientEnd = '#dbc8c9' }) => {
  return <section style={{
    backgroundImage: `linear-gradient(to right bottom, ${gradientStart}, ${gradientEnd})`
  }}>
    <div className="fixed inset-0 backdrop-blur-sm bg-black/70 z-50 flex items-center justify-center min-h-screen w-full">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">En Mantenimiento</h2>
        <p className="text-gray-200 text-xl">Estamos realizando actualizaciones en el sistema. Por favor, vuelva más tarde.</p>
      </div>
    </div>
    <Header showSlogan={showSlogan} gradientStart={gradientStart} menuGradientEnd={menuGradientEnd} session={session} />
    <main className="overflow-hidden min-h-[360px] relative">
      {children}
    </main>
    {
      showFooter &&
      <Footer socials={socials} terms={terms} footerLinks={footerLinks} />
    }
  </section>
}

export default Base
