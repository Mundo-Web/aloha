import IconServer from '../images/icon-server.svg'

const PlanCard = (plan) => {
    return <div className={`relative ${plan.popular ? "ring-2 ring-blue-500" : ""} p-6 pb-14 bg-white rounded-lg shadow-xl`}>
        {plan.popular && (
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-3 py-1">Más Popular</span>
        )}
        <div className="text-start">
            <div className='flex justify-between items-start'>
                <div>
                    <div className="text-2xl font-bold mb-2">{plan.name}</div>
                    <div className='text-sm text-gray-600 leading-tight'>{plan.description}</div>
                </div>
                <img src={IconServer} alt="" className='w-10' />
            </div>
            <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
            </div>
        </div>
        <hr className='my-4 border' />
        <div >
            <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                        <i className="w-5 h-5 mdi mdi-checkbox-marked-circle-outline text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className="left-6 right-6 absolute bottom-6 block px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded">Lo quiero</button>
        </div>
    </div>
}

export default PlanCard