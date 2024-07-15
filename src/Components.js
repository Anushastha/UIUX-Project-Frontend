import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
`;

export const Container = styled.div`
  background-color: #fff;
  position: relative;
  overflow: hidden;
  width: 950px;
  max-width: 100%;
  min-height: 500px;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => props.signinIn !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;

export const ChangePasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  width: 50vw;
  height: max-content;
  margin: 0 auto;
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 35px;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: 100%;
    border-bottom: 3px solid #2E266D;
    border-radius: 10px;
  }
`;

export const Line = styled.p`
  font-size: 16px;
  color: #2E266D;
  margin-bottom: 2px;
  font-family: "Lato", sans-serif; 
  text-align: left;
  width: 100%;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #2E266D;
  margin: 10px;
  font-family: "Lato", sans-serif; 
  font-weight: 600;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 5px;
`;

export const Input = styled.input`
  font-family: "Lato", sans-serif;
  background-color: #F3F4F4;
  color: #2E266D;
  border: none;
  padding: 5px 15px;
  width: 90%;
  margin-right: 2px; 
  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: "Lato", sans-serif;
  }
`;

export const IconWrapper = styled.div`
  width: 48px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F3F4F4;
`;

export const Button = styled.button`
  border-radius: 10px;
  border: 1px solid #2E266D;
  background-color: #2E266D;
  color: #ffffff;
  font-size: 16px;
  padding: 8px 35px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

export const GhostButton = styled(Button)`
  background-color: #ffffff;
  border-color: #ffffff;
  color: #2E266D;
`;

export const Anchor = styled.a`
  color: #2E266D;
  text-decoration: none;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  font-weight: 600;

`;



export const LoginBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const RememberMe = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  font-weight: 600;

`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props => props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  background: #2E266D;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => (props.signinIn !== true
    ? `
    transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;
