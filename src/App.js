import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

import options from './data';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import axios from 'axios';
import './App.css';


const App = () => {
  // ... (other state variables)
  const [projectName, setProjectName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [professorName, setProfessorName] = useState('');
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!projectName || !specialization) {
      alert('Please enter both project name and specialization.');
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:3001/allot-project`, {
        projectName,
        specialization,
      });
  
      if (response.status === 200) {
        setEmailSent(true);
        setProfessorName(response.data.professor.name);
        alert('Project Allotment Successful!');
        setProjectName('');
        setSpecialization('');
        setTimeout(() => {
        setEmailSent(false); // Reset emailSent state after 3 seconds
        }, 3000); // Set timeout for 3 seconds
      } else {
        console.error('Error allotting project:', response.statusText);
        alert('Error allotting project. Please check the console for details.');
      }
    } catch (error) {
      console.error('Error allotting project:', error);
      alert('Error allotting project. Please check the console for details.');
    }
  };
  

  return (
    <div className="container">
      <div className="r">
        <div className="col-lg-6">
          <div className="card shadow-lg animated fadeInUp">
            <div className="card-body">
              <h2 className="mb-4">Project Allotment System</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="projectName" className="form-label">Project Name:</label>
                  <input
                    type="text"
                    id="projectName"
                    className="form-control"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="specialization" className="form-label">Specialization:</label>
                  <Typeahead
                    id="specialization"
                    onChange={setSpecialization}
                    options={options}
                    placeholder="Choose a state..."
                    selected={specialization}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Allot Project</button>
              </form>
              {emailSent && (
                <p className="mt-3 success-message">
                  Project allotted to <strong>{professorName}</strong>. Email sent to the allotted professor!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
     <div class="wave"></div>
     <div class="wave"></div>
     <div class="wave"></div>
  </div>
    </div>
  );
};

export default App;
