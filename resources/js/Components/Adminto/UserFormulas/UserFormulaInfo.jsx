const UserFormulaInfo = ({ name, formula, details }) => {
  const details2process = details?.filter(detail => !detail.user_formula_id || detail.user_formula_id == formula.id)
  return <>
    {
      formula &&
      <>
        <div>
          <b>🧐 Tratamiento</b>:{' '}
          {formula?.has_treatment?.description}
        </div>
        <div>
          <b>👀 Cuero cabelludo</b>: {' '}
          {formula?.scalp_type?.description}
        </div>
        <div>
          <b>✅ Tipo de cabello</b>:{' '}
          {formula?.hair_type?.description}
        </div>
        {
          formula?.hair_thickness &&
          <div>
            <b>💪 Grosor del cabello</b>:{' '}
            {formula?.hair_thickness?.description}
          </div>
        }
        <div>
          <b>💡 Objetivos</b>:{' '}
          <ul className='mb-0'>
            {
              formula?.hair_goals_list?.map(x => <li key={x.id}>{x.description}</li>)
            }
          </ul>
        </div>
        <div>
          <b>🫙 Fragancia</b>:{' '}
          {formula?.fragrance?.name}
        </div>
      </>
    }
    <div>
      <b>🎨 Colores:</b>
      <ul>
        {
          details2process?.map((detail, index) => <li key={index}>
            {detail.name}{
              detail?.colors?.length > 0 && <>: {
                detail?.colors?.map(color => color.name).join(', ')
              }</>
            }
          </li>)
        }
      </ul>
    </div>
    <button className='btn btn-xs btn-dark' type='button' copy={`${formula ? `*Formula ${name}*\n\n🧐 Tratamiento: ${formula?.has_treatment?.description}\n👀 Cuero cabelludo: ${formula?.scalp_type?.description}\n✅ Tipo de cabello: ${formula?.hair_type?.description}\n${formula?.hair_thickness ? `💪 Grosor del cabello: ${formula?.hair_thickness?.description}\n` : ''}💡 Objetivos:\n${formula?.hair_goals_list?.map(x => `- ${x.description}`).join('\n')}\n🫙 Fragancia: ${formula?.fragrance?.name}\n` : `*Pedido ${name}*\n\n`}🎨 Colores:\n${details2process?.map(detail => `- ${detail.name}${detail?.colors?.length > 0 ? `: ${detail?.colors?.map(color => color.name).join(', ')}` : ''}`).join('\n')}`}>
      <i className='mdi mdi-content-copy me-1'></i>
      Copiar
    </button>
  </>
}

export default UserFormulaInfo