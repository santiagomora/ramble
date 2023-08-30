import {render,screen} from '@testing-library/react'
import Login from '../app/auth/Login'

// arrange sets test data conditions and environment
// act, run login that should be tested
// assert, look at output and see if it matches expectations

describe( // suite
    "testing login components",
    () => {
        test(
            'Check title existance',
            () => 
            {
                // arrange
                render(<Login/>);
                // act
                // assert
                const login = screen.getByText(/Login/i)
                expect(login).toBeInTheDocument()
            }
        )
    }
) 
