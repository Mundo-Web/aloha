import Tippy from "@tippyjs/react"
import React from "react"

const InputFormGroup = ({ col, label, eRef, type = 'text', placeholder, required = false, disabled = false, value, step, onChange = () => { }, information }) => {
  const id = `input-${crypto.randomUUID()}`
  return <div className={`form-group ${col} mb-2`}>
    <label htmlFor={id} className="form-label">
      {label}
      {required && <b className="text-danger ms-1">*</b>}
      {information && <Tippy content={information}><i className="mdi mdi-information ms-1"/></Tippy>}
    </label>
    <input ref={eRef} id={id} type={type} className='form-control' placeholder={placeholder} required={required} disabled={disabled} defaultValue={value ?? ''} step={step} onChange={onChange} />
  </div>
}

export default InputFormGroup