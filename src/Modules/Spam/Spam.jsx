import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
} from '@mui/material';

function Spam() {
  const [formData, setFormData] = useState({
    Profile_Completeness: '',
    Sales_Consistency: '',
    Customer_Feedback: '',
    Transaction_History: '',
    Platform_Interaction: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'Profile_Completeness' || name === 'Customer_Feedback' || name === 'Transaction_History'
        ? parseFloat(value)
        : value,
    }));
  };

  const handleCheckSpam = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AIURL}/detect-spam`,
        formData
      );
      setResult(response.data);
    } catch (err) {
      setError("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="flex flex-col gap-4">
          <Typography variant="h5" className="text-center font-semibold">
            Spam Detection
          </Typography>

          <TextField
            name="Profile_Completeness"
            label="Profile Completeness (0-1)"
            type="number"
            value={formData.Profile_Completeness}
            onChange={handleChange}
            fullWidth
            inputProps={{ step: "0.1", min: "0", max: "1" }}
          />

          <TextField
            name="Sales_Consistency"
            label="Sales Consistency"
            select
            value={formData.Sales_Consistency}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <TextField
            name="Customer_Feedback"
            label="Customer Feedback (0-1)"
            type="number"
            value={formData.Customer_Feedback}
            onChange={handleChange}
            fullWidth
            inputProps={{ step: "0.1", min: "0", max: "1" }}
          />

          <TextField
            name="Transaction_History"
            label="Transaction History (0-1)"
            type="number"
            value={formData.Transaction_History}
            onChange={handleChange}
            fullWidth
            inputProps={{ step: "0.1", min: "0", max: "1" }}
          />

          <TextField
            name="Platform_Interaction"
            label="Platform Interaction"
            select
            value={formData.Platform_Interaction}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <Button
            onClick={handleCheckSpam}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Check for Spam'}
          </Button>

          {error && (
            <Typography color="error" className="text-center">
              {error}
            </Typography>
          )}

          {result && (
            <div className="mt-4 text-center space-y-2">
              <Typography variant="body1">
                <strong>Prediction:</strong> {result.prediction}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Timestamp: {new Date(result.timestamp).toLocaleString()}
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Spam;
