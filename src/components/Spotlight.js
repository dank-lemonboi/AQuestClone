import React, {Component} from 'react';
import {TransitionMotion, spring} from 'react-motion';
import glamorous from 'glamorous';
import cover from './assets/cover.jpg';
import awww from './assets/awww.png';
import fwa from './assets/fwa.png';
import cda from './assets/css-design-awards.png';
import {connect} from 'react-redux';


class Spotlight extends Component{
    render(){
        let arr = this.props.render ? [{id: 0}] : []
        let arr2 = this.props.render ? [{id: 1}] : []
        
        const coverTextAnim = {
            opacity: this.props.render ? spring(1, springOptions) : 1,
            top: this.props.render ? spring(0, springOptions) : 0
        }
        return (
            <TransitionMotion
        defaultStyles={arr.map(() => ({ key: 'one', style: {top: -this.props.height, opacity: 0}}))}
        styles={arr.map(() => ({ key: 'one', style: { top: spring(0, springOptions), opacity: spring(1, springOptions)}}))}
        willLeave={() => ({top: spring(-this.props.height, springOptions)})}
        willEnter={() => ({top: -this.props.height, opacity: 0})}
      >
        {(styles) => (
          <Wrapper >
            {styles.map(({ key, style }) => (
              <CoverImg key={key} style={{...style}}>
                <TransitionMotion
                    defaultStyles={style.top < -2 ? [] : arr2.map(() => ({key: 'two', style: {top: -50, opacity: 0}}))}
                    styles={style.top < -2 ? [] : arr2.map(() => ({key: 'two', style: coverTextAnim}))}
                    willEnter={() => ({top: -50, opacity: 0})}
                >
                    {(styles) => 
                        <CoverText>
                            {styles.map(({key, style}) => 
                                <div key={key}>
                                    <Title style={{...style}}>
                                        CAMPO ALLE COMETE
                                    </Title>
                                    <div style={{float: 'left', marginRight: '50px'}}>
                                        <Awww style={{...style}}></Awww>
                                        <Sotd style={{...style}}>SITE OF THE DAY</Sotd>
                                    </div>
                                    <div style={{float: 'left'}}>
                                        <Fwa style={{...style}}></Fwa>
                                        <Sotd style={{...style}}>SITE OF THE DAY</Sotd>
                                    </div>
                                    <div style={{float: 'left', marginRight: '50px'}}>
                                    <CDA style={{...style}}></CDA>
                                    <Sotd style={{...style}}>SITE OF THE DAY</Sotd>
                                    </div>
                                </div>
                            )}
                        </CoverText>}
                </TransitionMotion>
              </CoverImg>
            ))}
          </Wrapper>
        )}
      </TransitionMotion>
        );
    }
}

function mapStateToProps(state){
    return {
        render: state.render
    }
}

export default connect(mapStateToProps, {})(Spotlight)

const springOptions = {stiffness: 250, damping: 30}

const Wrapper = glamorous.div('spotlight', {
    height: '100%',
    width: '100%', 
    position: 'relative',
    overflow: 'hidden',
    '@media(max-width: 768px)': {
        height: '100%'
    }
})

const CoverImg = glamorous.div({
    background: `url(${cover})`,
    backgroundColor: 'white',
    backgroundPosition: 'top center no-repeat',
    backgroundSize: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
})
const CoverText = glamorous.div({
    position: 'absolute', 
    right: '10%',
    top: '35%',
    height: 303, 
    width: 500, 
    fontFamily: '"Oswald", sans-serif',
    color: 'white',
    '@media(max-width: 768px)': {
        right: '-200px'
    }
})
const Title = glamorous.div({
    fontSize: '100px',
    marginBottom: '10px',
    lineHeight: '90px',
    position: 'relative',
    '@media(max-width: 768px)': {
        fontSize: 40,
        width: '40%',
        lineHeight: '40px'
    }
})

const Sotd = glamorous.div({
    fontWeight: 400, 
    position: 'relative',
    fontSize: '.75rem',
    letterSpacing: '3px',
    lineHeight: 1.2
})
const Awww = glamorous.div({
    position: 'relative',
    backgroundImage: `url(${awww})`,
    backgroundSize: '100%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    height: '30px',
    width: '115px'
})
const Fwa = glamorous.div({
    position: 'relative',
    backgroundImage: `url(${fwa})`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    height: '20px',
    marginTop: '5px',
    marginBottom: '5px',
    width: '115px'
})
const CDA = glamorous.div({
    position: 'relative',
    backgroundImage: `url(${cda})`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    width: '200px',
    height: '20px',
    marginTop:'15px',
    marginBottom: '5px'
})