import React from 'react';
import styled from 'styled-components';

export default function Login() {
    return (
        <Container>
            <CTA>
                <CTALogoOne src="/images/cta-logo-one.svg" />
                <SignUp>GET ALL THERE</SignUp>
                <Description>
                    Get Premier Access to Raya and the Last Dragon for an additional fee
                    with a Disney+ subscription. As of 03/26/21, the price of Disney+
                    and The Disney Bundle will increase by $1.

                </Description>
                <CTALogoTwo src="/images/cta-logo-two.png" />

            </CTA>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    ${'' /* height: calc(100vh - 70px); */}
    min-height: 100vh;
    display: flex;
    justify-content:center;
    align-items:top;
    &:before {
        background-image :url("/images/login-background.jpg");
        position: absolute;
        background-position:top;
        height:100%;
        background-size: cover;
        background-repeat: no-repeat;
        top:0;
        content:"";
        left:0;
        right:0;
        z-index:-1;
        opacity:0.7;
        
        
    }
`

const CTA = styled.div`
    max-width: 650px;
    padding: 80px 40px;
    width:100%;
    display:flex;
    flex-direction: column;
    margin-top:100px;
    align-items:center;

    

`

const CTALogoOne = styled.img`
`
const CTALogoTwo = styled.img`

`
const SignUp = styled.a`
    width: 100%;
    background-color: #0063e5;
    font-weight:bold;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 4px;
    text-align:center;
    font-size:18px;
    cursor:pointer;
    transition: all 250ms;
    letter-spacing: 1.5px;
    margin-top: 12px;
    margin-bottom: 12px;
    &:hover {
        background:#0483ee;
    }

`

const Description = styled.p`
    font-size: 11px;
    letter-spacing: 1.5px;
    text-align: center;
    margin: 0 0 24px;
    line-height: 1.5;

`