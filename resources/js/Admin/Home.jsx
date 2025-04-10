// import moment from 'moment';
import Tippy from '@tippyjs/react';
import { Chart, registerables } from 'chart.js';
// import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '../Components/Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import HomeRest from '../Actions/Admin/HomeRest';
import Number2Currency from '../Utils/Number2Currency';

Chart.register(...registerables);

const homeRest = new HomeRest()

const Home = ({
  newClients,
  repurchaseRate, topCities, topOtherCities,
  topColors, fragranceStats,
  treatmentStats, scalpTypeStats, hairTypeStats, hairGoalsStats
}) => {

  const [timeFrame, setTimeFrame] = useState('days');
  const [sales, setSales] = useState([]);
  const [showAllGoals, setShowAllGoals] = useState(false);

  const data = {
    labels: timeFrame === 'days' ? sales.map(item => moment(item.date).format('DD MMM')) :
      timeFrame === 'months' ? sales.map(item => {
        const date = new Date(item.year, item.month - 1);
        return moment(date).format('MMM YYYY');
      }) :
        sales.map(item => item.year.toString()),
    datasets: [
      {
        label: 'Total de ventas',
        data: timeFrame === 'days' ? sales.map(item => item.total_count) :
          timeFrame === 'months' ? sales.map(item => item.total_count) :
            sales.map(item => item.total_count),
        backgroundColor: 'rgba(160, 160, 160, 0.2)',
        borderColor: 'rgba(160, 160, 160, 0.8)',
        fill: true,
      },
      {
        label: 'Ventas efectivas',
        data: timeFrame === 'days' ? sales.map(item => item.count) :
          timeFrame === 'months' ? sales.map(item => item.count) :
            sales.map(item => item.count),
        backgroundColor: 'rgba(16, 196, 105, 0.5)',
        borderColor: 'rgba(16, 196, 105, 0.75)',
        fill: true,
      }
    ],
  };

  const salesFilter = {
    days: 'Últimos 30 días',
    months: 'Últimos 12 meses',
    years: 'Últimos 10 años'
  }

  useEffect(() => {
    homeRest.getSales(timeFrame)
      .then((data) => {
        setSales(data)
      })
  }, [timeFrame])

  const totalHairGoals = hairGoalsStats.reduce((acc, goal) => acc + Number(goal.count), 0);
  const totalFragrances = fragranceStats.reduce((acc, fragrance) => acc + Number(fragrance.count), 0);

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
        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body widget-user">
              <div className="text-center">
                <h2 className="fw-normal text-success" data-plugin="counterup">
                  {repurchaseRate.repurchase_rate.toFixed(2)}%
                  <i className='mdi mdi-backup-restore ms-1'></i>
                </h2>
                <h5>
                  <small className='d-block text-muted mb-1'>{repurchaseRate.returning_customers} personas volvieron a comprar</small>
                  en los ultimos 30 dias
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body widget-user">
              <div className="text-center">
                <h2 className="fw-normal text-success" data-plugin="counterup">
                  {repurchaseRate.total_customers}
                  <i className='mdi mdi-cart-plus ms-1'></i>
                </h2>
                <h5>
                  <small className='d-block text-muted mb-1'>ventas se concretaron</small>
                  en los ultimos 30 dias
                </h5>
              </div>
            </div>
          </div>
        </div>
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
              <h4 className="header-title my-0">Preferencias de formulas</h4>
              <small className='text-muted'>Últimos 30 días</small>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <h5 className="text-center">Tratamiento</h5>
                  <Pie
                    data={{
                      labels: treatmentStats.map(item => item.has_treatment.description == 'Si'
                        ? 'Con tratamiento'
                        : 'Sin tratamiento'
                      ),
                      datasets: [{
                        data: treatmentStats.map(item => item.count),
                        backgroundColor: ['#10c469', '#ff5b5b'],
                        borderWidth: 0
                      }]
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <h5 className="text-center">Cuero cabelludo</h5>
                  <Pie
                    data={{
                      labels: scalpTypeStats.map(item => item.scalp_type.description),
                      datasets: [{
                        data: scalpTypeStats.map(item => item.count),
                        backgroundColor: ['#35b8e0', '#5b69bc', '#ffbd4a', '#10c469'],
                        borderWidth: 0
                      }]
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <h5 className="text-center">Tipo de cabello</h5>
                  <Pie
                    data={{
                      labels: hairTypeStats.map(item => item.hair_type.description.toTitleCase()),
                      datasets: [{
                        data: hairTypeStats.map(item => item.count),
                        backgroundColor: ['#ff8acc', '#98a6ad', '#f7b84b', '#4a81d4'],
                        borderWidth: 0
                      }]
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <hr className='my-2' />
              <h5 className="mt-0">Objetivos capilares</h5>
              <div className="table-responsive">
                <table className="table table-sm table-bordered mb-0">
                  <tbody>
                    {hairGoalsStats
                      .sort((a, b) => b.count - a.count)
                      .slice(0, showAllGoals ? undefined : 5)
                      .map((goal, index) => {
                        const percentage = goal.count / totalHairGoals * 100;
                        return <Tippy content={`${goal.count} selecciones`}>
                          <tr key={index} style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
                            <td>
                              <div className='d-flex justify-content-between'>
                                <span>
                                  {goal.name}
                                </span>
                                <span>
                                  {index === 0 && <i className='mdi mdi-crown me-1 text-warning'></i>}
                                  {percentage.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        </Tippy>
                      })}
                  </tbody>
                </table>
                {hairGoalsStats.length > 5 && (
                  <div className="text-center mt-2">
                    <button
                      className="btn btn-link btn-sm p-0"
                      onClick={() => setShowAllGoals(!showAllGoals)}
                    >
                      {showAllGoals ? (
                        <>Ver menos <i className="mdi mdi-chevron-up ms-1"></i></>
                      ) : (
                        <>Ver más <i className="mdi mdi-chevron-down ms-1"></i></>
                      )}
                    </button>
                  </div>
                )}
              </div>
              <hr className='my-2' />
              <h5 className="mt-0">Fragancias</h5>
              <div className='d-flex flex-wrap justify-content-around align-items-center gap-2'>
                {
                  fragranceStats
                    .sort((a, b) => b.count - a.count)
                    .map((fragrance, index) => {
                      const percentage = fragrance.count / totalFragrances * 100;
                      return <Tippy content={`${fragrance.fragrance.name} (${fragrance.count} ventas)`}>
                        <div key={index} className='text-center' style={{ fontWeight: index == 0 ? 'bold' : 'normal' }}>
                          <img className='mb-1' src={`/api/fragrances/media/${fragrance.fragrance.image}`} alt="" style={{
                            width: '40px',
                            aspectRatio: 5 / 3,
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius: '4px'
                          }} />
                          <small className='text-muted d-block mb-0' >{percentage.toFixed(1)} %</small>
                        </div>
                      </Tippy>
                    })
                }
              </div>
              <hr className='my-2' />
              <h5 className='mt-0'>Colores por producto</h5>
              <div className='d-flex flex-column gap-2'>
                {
                  topColors
                    .sort((a, b) => b.total_quantity - a.total_quantity)
                    .map((item, itemIndex) => {
                      return (
                        <div key={itemIndex}>
                          <div className='d-flex justify-content-between align-items-center mb-1'>
                            <span style={{ fontWeight: 'bold' }}>
                              {item.item}
                              {itemIndex === 0 && <i className='mdi mdi-crown ms-1 text-warning'></i>}
                            </span>
                            <small className='text-muted'>{item.total_quantity} ventas</small>
                          </div>
                          <table className="table table-sm table-bordered mb-0">
                            <tbody>
                              {
                                item.colors
                                  .sort((a, b) => b.quantity - a.quantity)
                                  .slice(0, 3)
                                  .map((color, colorIndex) => (
                                    <Tippy key={colorIndex} content={`${color.quantity} ventas`}>
                                      <tr style={{ fontWeight: colorIndex === 0 ? 'bold' : 'normal' }}>
                                        <td className="ps-3" style={{ width: '1%' }}>
                                          <div className="d-flex justify-content-between">
                                            <span>
                                              <i className='mdi mdi-circle me-1' style={{ color: color.hex }}></i>
                                              {color.name}
                                            </span>
                                            <span>
                                              {((color.quantity / item.total_quantity) * 100).toFixed(1)}%
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    </Tippy>
                                  ))
                              }
                            </tbody>
                          </table>
                        </div>
                      )
                    })
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card">
            <div className="card-header">
              <h4 className="header-title mb-0">Top 10 ciudades con más ventas</h4>
              <small className='text-muted'>Últimos 30 días</small>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Departamento</th>
                      <th>Ciudad</th>
                      <th className='text-end'>Ventas</th>
                      <th className='text-end'>Ingresos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCities.map((city, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{city.department}</td>
                        <td>{city.city}</td>
                        <td className='text-end'>{city.count} ventas</td>
                        <th className='text-nowrap text-end'>S/. {Number2Currency(city.amount)}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h4 className="header-title mb-0">Top 5 ciudades con más ventas fuera de Lima Metropolitana</h4>
              <small className='text-muted'>Últimos 30 días</small>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Departamento</th>
                      <th>Ciudad</th>
                      <th className='text-end'>Ventas</th>
                      <th className='text-end'>Ingresos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topOtherCities.map((city, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{city.department}</td>
                        <td>{city.city}</td>
                        <td className='text-end'>{city.count} ventas</td>
                        <th className='text-nowrap text-end'>S/. {Number2Currency(city.amount)}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
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