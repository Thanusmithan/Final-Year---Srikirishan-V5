// Patient_Service.js
import React from 'react';
import './Css/Patient_Service.css';
import Header from './Componets/Patientdashboard_Header';
import Footer from './Componets/Footer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { useServices } from './Componets/ServicesContext';
import { useNavigate } from 'react-router-dom';


const Patient_Service = () => {
  const { services } = useServices();
  const navigate = useNavigate();

  const handleBookAppointment = (serviceName, doctorName) => {
    navigate('/patient_appointment', {
      state: { serviceName, doctorName },
    });
  };

  return (
    <>
    <Header />
      <h2 className="patient-service-txt-center">Our Exclusive Services</h2>
      {/* <hr className="section-divider mx-auto" /> */}
      <div className="patient-service-page">
        <div className="patient-service-container my-5">
          <div className="row">
            {services.map((service) => (
              <div className="col-md-6 col-lg-4 mb-4" key={service._id}>
                <Card className="service-card shadow h-100 border-0">
                  <div className="service-card-header text-white text-center py-3">
                    <FontAwesomeIcon icon={faClipboardList} className="service-icon mb-2" />
                    <h5 className="patient-service-title">{service.serviceName}</h5>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <p className="service-description">
                      <strong>Description:</strong> {service.serviceDescription}
                    </p>
                    <p className="service-doctor">
                      <strong>Doctor:</strong>{' '}
                      <FontAwesomeIcon icon={faUserMd} className="me-2" />
                      {service.doctorName}
                    </p>
                  </Card.Body>
                  <Card.Footer className="text-center py-3">
                    <Button
                      variant="success"
                      className="btn-book px-4"
                      onClick={() => handleBookAppointment(service.serviceName, service.doctorName)}
                    >
                      Book Appointment
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    <Footer />
    </>
  );
};

export default Patient_Service;
