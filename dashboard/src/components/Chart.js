import React from 'react';
import ChartRow from './ChartRow';

let tableRowsData = [
    {
        Title: 'Sol',
        Length: '25',
        Rating: 'ljbiukvyvukuh',
        Categories: ['sol.jpg'],
        Awards: 4
    },
    {
        Title: 'Tecate',
        Length: '35',
        Rating: 'Una cerveza muy pero muy rica',
        Categories: ['tecate.jpg'],
        Awards: 4.5
    },
    
]


function Chart (){
    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Cerveza</th>
                                <th>Precio</th>
                                <th>Descripcion</th>
                                <th>Imagen</th>
                                <th>Rango</th>
                            </tr>
                        </thead>
                      
                        <tbody>
                            {
                            tableRowsData.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;