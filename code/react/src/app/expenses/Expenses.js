import {Container} from '../../composition/composition'
import {useLocation} from 'react-router'
import CreateExpenseForm from './forms/CreateExpenseForm.js'
import ListExpenses from './ListExpenses.js'

const filters = [
    {
        filterName:'getDateMonth',
        accessField: (dataField) => (new Date(dataField.date)).getMonth(),
        validValues: [
            {value:0,title:"January"},
            {value:1,title:"February"},
            {value:2,title:"March"},
            {value:3,title:"April"},
            {value:4,title:"May"},
            {value:5,title:"June"},
            {value:6,title:"July"},
            {value:7,title:"August"},
            {value:8,title:"September"},
            {value:9,title:"October"},
            {value:10,title:"November"},
            {value:11,title:"December"},
        ],
        selectTitle:"Filter by month"
    },
    {
        filterName:'getDateFullYear',
        accessField: (dataField) => (new Date(dataField.date)).getFullYear(),
        validValues: [
            {value:2018,title:2018},
            {value:2019,title:2019},
            {value:2020,title:2020},
            {value:2021,title:2021},
        ],
        selectTitle:"Filter by year"
    }
]

function Expenses()
{
    const {state} = useLocation()
    return (
        <Container>
            <h2 className="font-weight-bold  py-4">
                Expenses
            </h2>
            <CreateExpenseForm/>
            <div className="pb-3">
                <ListExpenses
                    url='/expenses/7'
                    dependencies={[state]}
                    filters={filters}
                />
            </div>
        </Container>
    )
}

export default Expenses
