import { createPortal } from 'react-dom'
import styled from 'styled-components'


const ModalContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const BackDrop = styled.div`

    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    position: fixed;
    overflow: hidden;
    z-index: 10;
`

const ModalContent = styled.div`
    position: fixed;
    width: 200px;
    height: 200px;
    z-index: 100;
    margin-top: -30rem;
`

const Modal = (props) =>{
    return (
        <>
            {createPortal(
                <ModalContainer>
                    <BackDrop />
                    <ModalContent>
                        {props.children}
                    </ModalContent>
                </ModalContainer>
            , document.getElementById('modal-root'))}
        </>
    )
}

export default Modal