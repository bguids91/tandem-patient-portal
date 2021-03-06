import React, { Component } from 'react'
import Allergy from './Allergy.jsx'

class Allergies extends Component {

  render() {
    const allergiesItems = this.props.allergies.map(allergy => (
      <Allergy allergy={allergy} key={allergy.id} />
    ))

    return (
      <div>
        <h2 className='card-header'>Allergies</h2>
        <div className='card-body med-info'>
          <p>{allergiesItems}</p>
        </div>
      </div>
    )
  }
}

export default Allergies
