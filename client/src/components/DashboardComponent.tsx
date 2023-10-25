import { Button, Col, Row } from "react-bootstrap";
import API from '../API';

function CounterOfficerDashboard(){
    
    let next = 0;

    const handleButtonClick = async () => {
        try {
          const customer = await API.callNextCustomer(next);
          if(customer){
            next++;
            //console.log(`Next customer: ${customer.toString()}`);
          }
          
        } catch (error) {
          console.error(error);
        }
      };
    
    return (
        <div>
            <Row>
                <Col>
                    <h2>Counter Officier Dashboard</h2>
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleButtonClick}>Button</Button>
                </Col>
            </Row>
        </div>        
    )
}

function AdminDashboard(){
    return (
        <h1>Admin Dashboard</h1>
    )
}

export {CounterOfficerDashboard, AdminDashboard}