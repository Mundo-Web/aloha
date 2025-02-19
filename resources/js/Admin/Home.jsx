// import moment from 'moment';
import Tippy from '@tippyjs/react';
import { Chart, registerables } from 'chart.js';
// import moment from 'moment';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '../Components/Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';

Chart.register(...registerables);

const Home = ({
  newClients, topFormulas, totalSales,
  totalSalesLast30Days,
  totalSalesLast12Months,
  totalSalesLast10Years,
}) => {
  const [timeFrame, setTimeFrame] = useState('days');

  const data = {
    labels: timeFrame === 'days' ? totalSalesLast30Days.map(item => moment(item.date).format('DD MMM')) :
      timeFrame === 'months' ? totalSalesLast12Months.map(item => {
        const date = new Date(item.year, item.month - 1);
        return moment(date).format('MMM YYYY');
      }) :
        totalSalesLast10Years.map(item => item.year.toString()),
    datasets: [
      {
        label: 'Ventas',
        data: timeFrame === 'days' ? totalSalesLast30Days.map(item => item.count) :
          timeFrame === 'months' ? totalSalesLast12Months.map(item => item.count) :
            totalSalesLast10Years.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const salesFilter = {
    days: 'Últimos 30 días',
    months: 'Últimos 12 meses',
    years: 'Últimos 10 años'
  }

  return (
    <>
      <div className="row">
        {
          newClients.map((item, index) => {
            const date = new Date();
            date.setMonth(item.month - 1)
            date.setYear(item.year)
            return <div key={index} className="col-xl-3 col-md-6">
              <div className="card">
                <div className="card-body widget-user">
                  <div className="text-center">
                    <h2 className="fw-normal text-primary" data-plugin="counterup">
                      {item.count}
                      <i className='mdi mdi-account-plus ms-1'></i>
                    </h2>
                    <h5>
                      <small className='d-block text-muted mb-1'>Clientes nuevos en</small>
                      {moment(date).format('MMMM YYYY').toTitleCase()}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          })
        }
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="dropdown float-end">
                <div className="dropdown-toggle arrow-none card-drop d-flex align-items-center gap-1" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: 'pointer' }}>
                  <small className='text-muted'>{salesFilter[timeFrame]}</small>
                  <i className="mdi mdi-dots-vertical"></i>
                </div>
                <div className="dropdown-menu dropdown-menu-end">
                  {
                    Object.keys(salesFilter).map((key, index) => {
                      return <span
                        key={index}
                        className="dropdown-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setTimeFrame(key)}>{salesFilter[key]}</span>
                    })
                  }
                </div>
              </div>
              <h4 className="header-title mb-3">Ventas</h4>
              <Bar data={data} height={100} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h4 className="header-title mb-0">Top 5 formulas mas vendidas</h4>
              <small className='text-muted'>Últimos 30 días</small>
            </div>
            <div className="card-body">
              <div className="inbox-widget">
                {
                  topFormulas.map((formula, index) => {
                    const percent = formula.count / totalSales * 100
                    return <div key={index} className="inbox-item d-flex justify-content-between align-items-center">
                      <div className='d-flex gap-2 justify-content-center'>
                        <h5 className="inbox-item-author mt-0 mb-1 text-center" style={{ width: '40px' }}>
                          <span className={index > 2 ? 'fw-light' : ''}>#{index + 1}</span>
                          {index == 0 && <i className='mdi mdi-crown ms-1 text-warning'></i>}
                        </h5>
                        <div>
                          <div className="inbox-item-text">
                            <div>
                              <b>Tratamiento</b>: {formula.has_treatment.description.toTitleCase()}
                            </div>
                            <div>
                              <b>Cuero cabelludo</b>: {formula.scalp_type.description.toTitleCase()}
                            </div>
                            <div>
                              <b>Tipo de cabello</b>: {formula.hair_type.description.toTitleCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <h5 className='text-end'>
                        {formula.count} pedidos
                        <Tippy content={`Se uso esta formula en el ${percent.toFixed(2)}% de las ventas`}>
                          <small className='text-muted d-block'>
                            {Math.round(percent)}%
                          </small>
                        </Tippy>
                      </h5>
                    </div>
                  })
                }
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* <main className='d-flex align-items-center justify-content-center' style={{ height: 'calc(100vh - 160px)' }}>
        <div className='text-center'>
          <h1>Hola {session.name} {session.lastname}</h1>
          <div className='d-flex justify-content-center gap-2'>
            <a href='/admin/items' className='btn btn-primary'>Ver items</a>
            <a href='/admin/posts' className='btn btn-primary'>Ver fórmulas</a>
          </div>
        </div>
      </main> */}
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title="Dashboard">
    <Home {...properties} />
  </BaseAdminto>);
})