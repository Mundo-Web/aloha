import { useEffect, useState } from "react"
import em from "../../../Utils/em"
import ServiceHasFeaturesRest from "../../../actions/Admin/ServiceHasFeaturesRest"

const shfRest = new ServiceHasFeaturesRest()

const FeatureCard = ({ value: propValue, service, feature }) => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)

    const handleFeatureChange = async (e) => {
        const newValue = e.target.value
        if (newValue == propValue) return
        setLoading(true)
        if (newValue) {
            const result = await shfRest.save({
                service_id: service.id,
                feature_id: feature.id,
                value
            })
            setLoading(false)
            if (!result) setValue(propValue)
        } else {
            const result = await shfRest.delete(service.id, feature.id)
            setLoading(false)
            if (!result) setValue(propValue)
        }
    }

    useEffect(() => {
        setValue(propValue ?? '')
    }, [propValue, service])

    const alias = em(feature.alias?.replace('{}', value))

    return <tr><td>
        <div className='form-group'>
            <label htmlFor={`feature-${feature.id}`} className='form-label mb-0'>{feature.name}</label>
            <div className='input-group input-group-sm'>
                <span className='input-group-text'><i className='mdi mdi-alphabetical'></i></span>
                <input type="text" className='form-control form-control-sm' value={value} onChange={(e) => setValue(e.target.value)} onBlur={handleFeatureChange} disabled={loading} />
            </div>
            {feature.alias && <small>{alias}</small>}
        </div>
    </td></tr>
}

export default FeatureCard