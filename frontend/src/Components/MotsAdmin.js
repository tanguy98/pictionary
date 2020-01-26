// IMPORTS

import React from 'react';
import { Table } from 'react-bootstrap';


// PARAMETRES


// COMPONENT

class MotsAdmin extends React.Component {

  render() {
      return(
        <div>
            <h3>Parties existantes :</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>MOTS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Mot !</td>
                    </tr>

                </tbody>
            </Table>
        </div>
        );
  }

}

export default MotsAdmin;
