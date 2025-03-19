import Tippy from "@tippyjs/react"
import React from "react"

const NewFormulaButton = ({ formula, roundedFull, showIcon }) => {
  return <Tippy content='Permite agregar una formula secundaria'>
    <a href={`/test/${formula.id}`} className={`block w-max mx-auto bg-white text-[#A191B8] shadow font-bold text-sm px-4 py-3 tracking-widest ${roundedFull ? 'rounded-full' : 'rounded'} my-4`}>
      {showIcon && <i className="mdi mdi-plus me-1"></i>}
      AGREGAR OTRA FORMULA
    </a>
  </Tippy>
}

export default NewFormulaButton