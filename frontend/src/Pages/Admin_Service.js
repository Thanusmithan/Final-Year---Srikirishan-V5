//Admin_Service.js
import React, { useState } from 'react';
import './Css/Admin_Services.css';
import Header from './Componets/Admin_Header';
import Footer from './Componets/Footer';
import { useServices } from './Componets/ServicesContext';
import { Button, Card, Form, Row, Col, Dropdown } from 'react-bootstrap';
import { FaEdit, FaTrash} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

const Admin_Service = () => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [editingServiceId, setEditingServiceId] = useState(null);

  const { services, addService, editService, deleteService } = useServices();

  const handleAddOrEditService = () => {
    if (!serviceName || !serviceDescription || !doctorName) return;

    if (editingServiceId) {
      editService(editingServiceId, { serviceName, serviceDescription, doctorName });
      setEditingServiceId(null);
    } else {
      addService({ serviceName, serviceDescription, doctorName });
    }

    setServiceName('');
    setServiceDescription('');
    setDoctorName('');
  };

  const handleEditService = (service) => {
    setServiceName(service.serviceName);
    setServiceDescription(service.serviceDescription);
    setDoctorName(service.doctorName);
    setEditingServiceId(service._id);
  };

  const handleDeleteService = (id) => {
    deleteService(id);
  };

  return (
    <>
      <Header />
      <div className="page-wrapper">
      <h2 className="admin-service-txt-center">Manage Hospital Services</h2>
        <div className="container">
          {/* Add Service Section */}
          <div className="add-service-section py-4 px-3 mb-5 bg-light border rounded">
            {/* <Button variant="success" className="mb-4">
              <FaPlus className="me-2" /> Add Service
            </Button> */}
            <Form className='p-2'>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="serviceName">
                    <Form.Label  className='bold'>Service Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter service name"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="serviceDescription">
                    <Form.Label className='bold'>Service Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter service description"
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="doctorName">
                    <Form.Label className='bold'>Doctor's Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter doctor's name"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* <Button
                variant="primary"
                className="w-100"
                onClick={handleAddOrEditService}
              >
                {editingServiceId ? 'Update Service' : 'Add Service'}
              </Button> */}
              <Button
                variant="primary"
                className="w-100"
                onClick={handleAddOrEditService}
              >
                {editingServiceId ? (
                  <>
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Update Service
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPlusCircle} className="me-2" /> Add Service
                  </>
                )}
              </Button>
            </Form>
          </div>

          {/* Existing Services Section */}
          <h3 className="text-center mb-4">Existing Services</h3>
          {/* <Row className="g-4">
            {services.map((service) => (
              <Col md={12} key={service._id}>
                <Card className="h-100 service-card">
                  <Card.Body>
                    <Row>
                      <Col>
                        <p>
                          <strong>Service Name:</strong> {service.serviceName}
                        </p>
                        <p>
                          <strong>Service Description:</strong>{' '}
                          {service.serviceDescription}
                        </p>
                        <p>
                          <strong>Doctor's Name:</strong> {service.doctorName}
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <Dropdown className="w-100">
                      <Dropdown.Toggle variant="success" className="w-100">
                        Manage
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleEditService(service)}>
                          <FaEdit className="me-2" /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDeleteService(service._id)}
                          className="text-danger"
                        >
                          <FaTrash className="me-2" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row> */}
          <Row className="g-4">
            {services.map((service) => (
              <Col md={6} lg={4} key={service._id}>
                <Card className="admin-service-card shadow-sm">
                  <Card.Body>
                    <div className="service-details">
                      <h5 className="service-title">{service.serviceName}</h5>
                      <p className="service-description">
                        <strong>Description:</strong> {service.serviceDescription}
                      </p>
                      <p className="doctor-name">
                        <strong>Doctor:</strong> {service.doctorName}
                      </p>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-center">
                    <Dropdown drop='end'>
                      <Dropdown.Toggle variant="outline-success" className="dropdown-btn">
                        Manage
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end" style={{backgroundColor:'#5C636A'}}>
                        <Dropdown.Item onClick={() => handleEditService(service)}>
                          <FaEdit className="me-2" /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDeleteService(service._id)}
                          className="text-danger"
                        >
                          <FaTrash className="me-2" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin_Service;
