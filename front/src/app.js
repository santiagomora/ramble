import { BrowserRouter as Router } from 'react-router-dom';

import Routing from './routing';

import Container from './container';

import Header from './header';

import Footer from './footer';

function App( props ){
    return (
        <Router>
            <Container>
                <Header/>
                <Routing/>
                <Footer/>
            </Container>
        </Router>
    )
}

export default App;
