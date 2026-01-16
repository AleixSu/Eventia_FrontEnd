import React from 'react'
import { homeSrc, homeText } from '../../../constants/homeConstants'
import Button from '../../UI/button/Button'

const NoUserDOM = ({ fnc }) => {
  return (
    <>
      <div id='joinUs-wellcome'>
        <h5>{homeText.joinUsTextBlack1}</h5>
        <h5 className='keyWord'>{homeText.joinUsTextColour}</h5>
        <h5>{homeText.joinUsTextBlack2}</h5>
      </div>

      <div id='memberDiv'>
        <div id='benefitsDiv'>
          <h6>{homeText.benefitsTitle}</h6>
          <ul>
            {homeText.userBenefits.map((benefit, index) => (
              <li key={index}>
                <p>{benefit}</p>
              </li>
            ))}
          </ul>
        </div>
        <img src={homeSrc.logoImgMember} alt='logoImgMember' />
      </div>
      <Button text={'Register Now'} className={'registerButton'} fnc={fnc} />
    </>
  )
}

export default NoUserDOM
