import Tippy from "@tippyjs/react"
import React from "react"

const InputFormGroup = ({ col, label, eRef, type = 'text', specification, placeholder, required = false, disabled = false, readOnly = false, value, min, max, step, onChange = () => { }, uppercase = false }) => {
  const uuid = 'input-' + crypto.randomUUID()
  return <div className={`form-group ${col} mb-2`}>
    <label htmlFor={uuid} className="form-label mb-1">
      {
        label &&
        <>
          {label} {required && <b className="text-danger">*</b>}
          {specification && <Tippy content={specification}>
            <small className="ms-1 fa fa-question-circle text-muted"></small>
          </Tippy>
          }
        </>
      }
    </label>
    <input ref={eRef} id={uuid} type={type} className={`form-control ${uppercase && 'text-uppercase'}`} placeholder={placeholder} required={required} disabled={disabled} readOnly={readOnly} defaultValue={value ?? ''} step={step} onChange={onChange} min={min} max={max} />
  </div>
}

export default InputFormGroup