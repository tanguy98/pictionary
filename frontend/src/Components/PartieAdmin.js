// IMPORTS

import React from 'react';
import Table from 'react-bootstrap/Table'


// PARAMETRES


// COMPONENT

class PartieAdmin extends React.Component {

  render() {
      return(
        <div>
            <h3>Parties existantes :</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>CREATOR</th>
                    <th>PARTICIPANTS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Pipo1</td>
                    </tr>
                </tbody>
            </Table>
        </div>
        
        
        );
  }

}

export default PartieAdmin;
