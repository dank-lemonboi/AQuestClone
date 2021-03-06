import React, { Component } from 'react';
import glamorous, { Div } from 'glamorous';
import { TransitionMotion, spring } from 'react-motion';
import {connect} from 'react-redux';

import CheckVisibility from './CheckVisibility';

class TwitterSlide extends Component {
    constructor() {
        super();

    }

    render() {
        let {
            time,
            text
        } = this.props.config
        return (
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <CheckVisibility interval={(Math.random() * (500 - 100) + 100)}>
                    {
                        (isVisible) =>
                            <TransitionMotion
                                defaultStyles={isVisible && this.props.render ? [{
                                    key: 'twitterslide',
                                    style: { top: 500 }
                                }] : []}
                                styles={isVisible && this.props.render ? [{
                                    key: 'twitterslide',
                                    style: { top: spring(0, { stiffness: 250, damping: 30 }) }
                                }] : []}
                                willEnter={() => ({ top: 500 })}
                                willLeave={() => ({top: spring(500)})}>
                                {
                                    styles =>
                                        <div style={{ width: '100%', height: '100%' }}>
                                            {
                                                styles.map(({ key, style }) => {
                                                    return <Wrapper key={key} style={{ top: style.top }}>
                                                                <Content>
                                                                    <div style={{
                                                                        height: 100,
                                                                        width: '100%',
                                                                        display: 'flex',
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'center',
                                                                    }}>
                                                                        <TwitterButton>
                                                                            <i className="fa fa-twitter"></i>
                                                                        </TwitterButton>
                                                                        <TimeDiv>
                                                                            <h1>{time}</h1>
                                                                            <p>@aquest</p>
                                                                        </TimeDiv>
                                                                    </div>
                                                                    <Message>
                                                                        <p>
                                                                            {text}
                                                                        </p>
                                                                    </Message>

                                                                </Content>
                                                    </Wrapper>
                                                })
                                            }
                                        </div>
                                }
                            </TransitionMotion>
                    }

                </CheckVisibility>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        render: state.render
    }
}

export default connect(mapStateToProps, {})(TwitterSlide)

const Wrapper = glamorous.div(
    {
        width: '100%',
        height: '100%',
        gridColumnEnd: 'span 1',
        gridRowEnd: 'span 1',
        background: '#eee',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        '@media(max-width: 1200px)': {
            display: 'block'
        }
    }
)

const Content = glamorous.div(
    {
        width: '80%',
        height: '50%',
        '@media(max-width: 1500px)': {
            marginTop: -50
        },
        '@media(max-width: 1200px)': {
            marginTop: 0
        },
    }
)

const TwitterButton = glamorous.div(
    {
        width: 55,
        height: 55,
        marginLeft: 10,
        borderRadius: '50%',
        background: '#0083DD',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 25
    }
)

const TimeDiv = glamorous.div(
    {
        ' p': {
            margin: 5,
            fontFamily: "'Roboto', sans-serif",
            color: '#0083DD'
        },
        ' h1': {
            fontSize: 14,
            fontWeight: '200',
            color: '#0083DD',
            fontFamily: "'Montserrat', 'sans-serif'"
        }
    },
    {
        marginLeft: 10,
        color: '#0083DD'
    }
)

const Message = glamorous.div(
    {
        color: 'gray',
        marginTop: 25,
        lineHeight: '1.5em',
        '@media(max-width: 1200px)': {
            marginLeft: 15
        },
        '@media(max-width: 768px)': {
            fontSize: 10,
            marginLeft: 15
        }
    }
)
