import styled from 'styled-components';

export const Container = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    max-width: 600px;
    height: auto;
    margin: 5% auto;
    padding: 2%;
    background-color: #FFF;
    border-radius: 4px;
    font-family: Roboto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 620px){
        max-width: 430px;
    }

    div {
        margin-top: 36px;
        display: flex;
        justify-content: center;

        input {
            width: 236px;
            height: 40px;
            padding: 0 15px;
            border: 1px solid #EEE;
            border-radius: 4px;
            font-size: 16px;

            ::placeholder {
                font-style: italic;
                color: #D3D3D3;
            }
        }

        button {
            height: 40px;
            margin-left: 20px;
            border: none;
            border-radius: 4px;
            padding: 0 12px;
            background-color: #7159C1;

        }
    }
`;

export const List = styled.ul`
    width: 300px;
    list-style: none;
    margin-top: 36px;

    li {
        margin: 10px 0;
        padding: 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;



        button {
            border: none;
            background-color: #FFF;
        }
    }

`;
