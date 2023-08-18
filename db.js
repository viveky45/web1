const mongoose = require('mongoose');
const Professor = require('./model/Professor'); // Import Professor model

mongoose.connect('mongodb://localhost:27017/project-allotment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Define the sample professors data
  const sampleProfessors = [
    { name: 'Dr. Ramesh Kumar', specialization: 'Mine Planning and Design, Techno-feasibility of the Project', email: 'vivekyad45@gmail.com', seniority: 5, lastAllottedIndex: 0 },
    { name: 'Prof. Deepa Verma', specialization: 'Development and Extraction of Longwall Panel', email: 'vivekyad45@gmail.com', seniority: 8, lastAllottedIndex: 0 },
    { name: 'Dr. Sunil Gupta', specialization: 'Strata Control and Management Plan (SCAMP) for Bord and Pillar Panel using Continuous Mining Technologies', email: 'vivekyad45@gmail.com', seniority: 3, lastAllottedIndex: 0 },
    { name: 'Prof. Aarti Singh', specialization: 'Strata Control and Management Plan (SCAMP) for Bord and Pillar Panel using Conventional Technologies', email: 'vivekyad45@gmail.com', seniority: 6, lastAllottedIndex: 0 },
    { name: 'Dr. Rajesh Khanna', specialization: 'Mining Induced Subsidence Analysis', email: 'vivekyad45@gmail.com', seniority: 7, lastAllottedIndex: 0 },
    { name: 'Prof. Naina Sharma', specialization: 'Design, Instrumentation, Monitoring and Stability Analysis of Slopes including Reg.106 (2) of CMR-2017', email: 'vivekyad45@gmail.com', seniority: 4, lastAllottedIndex: 0 },
    { name: 'Dr. Vikas Gupta', specialization: 'Assessment and Management of Environmental Pollution in Opencast Mines EMP/EIA Preparation', email: 'vivekyad45@gmail.com', seniority: 1, lastAllottedIndex: 0 },
    { name: 'Prof. Meera Kapoor', specialization: 'Analysis, Treatment and Management of Water and Mine Effluent', email: 'vivekyad45@gmail.com', seniority: 2, lastAllottedIndex: 0 },
    { name: 'Dr. Sanjay Kumar', specialization: 'Mine Closure, Ecosystem (Carrying Capacity), Biodiversity, Rehabilitation and Resettlement', email: 'vivekyad45@gmail.com', seniority: 9, lastAllottedIndex: 0 },
    { name: 'Prof. Anushka Sharma', specialization: 'Mine Surveying, Remote Sensing, and GIS', email: 'vivekyad45@gmail.com', seniority: 10, lastAllottedIndex: 0 },
    { name: 'Dr. Pradeep Kumar', specialization: 'Measurement, Analysis and Management of Physical Contaminants (Noise, Ultrasound, etc.) in Mines, Mine Illumination Survey and Design', email: 'vivekyad45@gmail.com', seniority: 11, lastAllottedIndex: 0 },
    { name: 'Prof. Geetika Singh', specialization: 'Mine Ventilation Survey, Planning and Design/Reorganization of Ventilation System', email: 'vivekyad45@gmail.com', seniority: 12, lastAllottedIndex: 0 },
    { name: 'Dr. Arjun Reddy', specialization: 'Rock Blasting Technology', email: 'vivekyad45@gmail.com', seniority: 13, lastAllottedIndex: 0 },
    { name: 'Prof. Natasha Malhotra', specialization: 'Equipment Planning, Performance Analysis of Mining Equipment', email: 'vivekyad45@gmail.com', seniority: 14, lastAllottedIndex: 0 },
    { name: 'Dr. Rohit Verma', specialization: 'Mine Safety and Ergonomics', email: 'vivekyad45@gmail.com', seniority: 15, lastAllottedIndex: 0 },
    { name: 'Prof. Sunita Sharma', specialization: 'Physico-mechanical Properties of Rock and Rock Mass Characterization', email: 'vivekyad45@gmail.com', seniority: 16, lastAllottedIndex: 0 },
    { name: 'Dr. Sameer Gupta', specialization: 'Physico-chemical Properties of Coal, Ore and its Analysis', email: 'vivekyad45@gmail.com', seniority: 17, lastAllottedIndex: 0 },
    { name: 'Prof. Pooja Kapoor', specialization: 'Mechanical Rock Cutting Technology', email: 'vivekyad45@gmail.com', seniority: 18, lastAllottedIndex: 0 },
    { name: 'Dr. Manish Kumar', specialization: 'Excavation Design for Tunnels and Caverns', email: 'vivekyad45@gmail.com', seniority: 19, lastAllottedIndex: 0 },
    { name: 'Prof. Anjali Singh', specialization: 'Design for Underground Stope and Development Headings for Metalliferous Mines', email: 'vivekyad45@gmail.com', seniority: 20, lastAllottedIndex: 0 },
    // Additional professors with the same specializations
    { name: 'Dr. Asha Sharma', specialization: 'Mine Planning and Design, Techno-feasibility of the Project', email: 'vivekyad45@gmail.com', seniority: 21, lastAllottedIndex: 0 },
    { name: 'Prof. Manoj Gupta', specialization: 'Mine Planning and Design, Techno-feasibility of the Project', email: 'vivekyad45@gmail.com', seniority: 22, lastAllottedIndex: 0 },
    { name: 'Dr. Neha Singh', specialization: 'Strata Control and Management Plan (SCAMP) for Bord and Pillar Panel using Continuous Mining Technologies', email: 'vivekyad45@gmail.com', seniority: 23, lastAllottedIndex: 0 },
    // ... (add more professors)
  ];

  try {
    // Check if the database is already populated
    const existingProfessors = await Professor.countDocuments();
    if (existingProfessors === 0) {
      // Populate the database with sample professors data
      await Professor.insertMany(sampleProfessors);

      console.log('Sample data populated successfully');
    } else {
      console.log('Database is already populated');
    }
  } catch (err) {
    console.error('Error populating sample data:', err);
  }
});

module.exports = db;
