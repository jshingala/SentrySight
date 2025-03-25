import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import './Questionnaire-Admin.css';

const QuestionnaireAdmin = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [emailSubject, setEmailSubject] = useState('Follow-up on Questionnaire Submission');
  const [emailMessage, setEmailMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setSubmissions([
        {
          id: 1,
          businessName: 'Tech Solutions',
          industryType: 'IT',
          numEmployees: 50,
          dailyVisitors: 100,
          hasDetectionTech: 'Yes',
          safetyMeasures: ['Surveillance cameras', 'Security guards'],
          interestInAI: 'Yes',
          concerns: 'Cost and implementation time',
          currentEffectiveness: 4,
          priorityLevel: 5,
          policeResponseSpeed: 3,
        },
        {
          id: 2,
          businessName: 'Mall Mart',
          industryType: 'Retail',
          numEmployees: 200,
          dailyVisitors: 5000,
          hasDetectionTech: 'No',
          safetyMeasures: ['Panic buttons', 'Emergency lockdown procedures'],
          interestInAI: 'Possibly',
          concerns: 'Privacy issues',
          currentEffectiveness: 3,
          priorityLevel: 4,
          policeResponseSpeed: 5,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRowClick = (submission) => {
    setSelectedSubmission(submission);
    setEmailSubject(`Follow-up on ${submission.businessName}'s Submission`);
    setEmailMessage(`Hello ${submission.businessName},\n\nThank you for filling out the questionnaire. We would like to discuss your submission in more detail.`);
    setOpenEmailModal(true);
  };

  const handleCloseModal = () => {
    setOpenEmailModal(false);
    setSelectedSubmission(null);
  };

  const handleSendEmail = () => {
    console.log('Sending email to', selectedSubmission.businessName);
    console.log('Subject:', emailSubject);
    console.log('Message:', emailMessage);
    handleCloseModal();
  };

  return (
    <Container maxWidth="lg" className="admin-container">
      <Typography variant="h4" gutterBottom className="admin-title">
        Admin View - Questionnaire Submissions
      </Typography>
      {loading ? (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} className="admin-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Business Name</TableCell>
                <TableCell>Industry Type</TableCell>
                <TableCell>Employees</TableCell>
                <TableCell>Daily Visitors</TableCell>
                <TableCell>Detection Tech</TableCell>
                <TableCell>Safety Measures</TableCell>
                <TableCell>Interest in AI</TableCell>
                <TableCell>Concerns</TableCell>
                <TableCell>Current Effectiveness</TableCell>
                <TableCell>Priority Level for Firearm Detection</TableCell>
                <TableCell>Importance of Police Response Speed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id} onClick={() => handleRowClick(submission)} style={{ cursor: 'pointer' }}>
                  <TableCell>{submission.id}</TableCell>
                  <TableCell>{submission.businessName}</TableCell>
                  <TableCell>{submission.industryType}</TableCell>
                  <TableCell>{submission.numEmployees}</TableCell>
                  <TableCell>{submission.dailyVisitors}</TableCell>
                  <TableCell>{submission.hasDetectionTech}</TableCell>
                  <TableCell>{submission.safetyMeasures.join(', ')}</TableCell>
                  <TableCell>{submission.interestInAI}</TableCell>
                  <TableCell>{submission.concerns}</TableCell>
                  <TableCell>{submission.currentEffectiveness}</TableCell>
                  <TableCell>{submission.priorityLevel}</TableCell>
                  <TableCell>{submission.policeResponseSpeed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal for Email Form */}
      <Dialog open={openEmailModal} onClose={handleCloseModal} sx={{ '& .MuiDialog-paper': { borderRadius: '10px' } }}>
        <DialogTitle sx={{ color: 'black' }}>
          Send Email to {selectedSubmission?.businessName}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Subject"
            fullWidth
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={6}
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendEmail} color="primary">
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuestionnaireAdmin;
