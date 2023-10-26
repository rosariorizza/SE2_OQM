import { Button, Col, Container, Row, Table, Form, Dropdown } from "react-bootstrap";
import API from '../API';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Service, ServiceCreation, Counter } from "../models";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function CounterOfficerDashboard(){
    
    let counter = 0;

    const handleButtonClick = async () => {
        try {
          const customer = await API.callNextCustomer(counter);
          if(customer){
            console.log(`Next customer: ${customer.toString()}`);
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

function ServiceManagement(){

    const [services, setServices] = useState<Service[]>([]);
    const [showButtons, setShowButtons] = useState(true);
    const [fetchServices, setFetchServices] = useState<boolean>(false);
    const [counters, setCounters] = useState<Counter[]>([{type: "COUNTER 1", description : "aaaa", id:1}, {type: "COUNTER 2", description : "bbbb", id:2}]);
    const navigate = useNavigate();

    const serviceHandler = async () =>{
      let serviceResponse = await API.getServices()
      setServices(serviceResponse);
      let counterResponse = await API.getCounters()
      setCounters(counterResponse)
    }

    useEffect(()=>{
      serviceHandler()
    }, [fetchServices]);

    const assignHandler = async (service: Service,  counter: Counter, assigning: boolean) =>{
      console.log(`${service.type} being served by ${counter.type} is now ${assigning}` )
      if(assigning) await API.assignCounter(service.id, counter.id);
      else await API.removeCounter(service.id, counter.id);
    }


    return (
        <Container>
          <Row><h1>Service Management</h1></Row>
          {showButtons?
            <>
            <Row><Button variant='success' className="my-5" onClick={() => navigate('new')}>New Service</Button></Row>
            <Row><Button variant='success' className="my-5" onClick={ () =>{
                let servicesId: number[] = [];
                let i:number = 0;
                while (i < services.length){
                  servicesId.push(services[i].id);
                  i++;
                }
                API.generateQueues(servicesId);
                setShowButtons(false);
              }
            }>Generate Queues</Button></Row>
          </>
          :
          <></>
          }
          <Row>
      <Table bordered hover >
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Description</th>
            <th>Time</th>
            <th>Counters</th>
            <th>Edit</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
        {services.map(s =>{
            {return <tr key={s.id}>
                <td>{s.type}</td>
                <td>{s.description}</td>
                <td>{s.time}</td>
                <td>
                <Form>
                  {counters.map((c) => (
                    <div key={c.id} className="mb-3">
                      <Form.Check // prettier-ignore
                        id={c.type}
                        label={c.type}
                        onChange={(event) => assignHandler(s, c, event.target.checked)}
                      />
                    </div>
                  ))}
                </Form>
                </td>
                <td><Button variant="primary" onClick={() => navigate(s.id.toString())}>Edit</Button></td>
                <td><Button variant="danger" onClick={() => {API.deleteService(s.id); setFetchServices(!fetchServices);}}>Delete</Button></td>
            </tr>}
        })}
        </tbody>
      </Table>
      </Row>

    </Container>
    )
}


function ServiceForm(){

  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState<number | undefined>()  //it's going to be NaN whenever new is in the path
  const [service, setService] = useState<ServiceCreation>({ type: '', description: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if(id){
      await API.updateService(id, service);
    } else {
      await API.createService(service);
    }
    navigate('/services');
  };

  useEffect(() =>{
    if(location.pathname.slice(-3) !== 'new'){
      setId(+location.pathname.slice(-1));
      API.getService(+location.pathname.slice(-1)).then((s)=>{
        setService({type: s.type, description: s.description});
      })
    }
  }, [location])

  return (
    <Container>
      <Row><h1>{id?'Edit Service':'New Service'}</h1></Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={service.type}
                onChange={handleChange}
                placeholder="Enter type"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={service.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export {CounterOfficerDashboard, ServiceManagement, ServiceForm}