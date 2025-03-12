import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  borderRadius: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  borderRadius: theme.spacing(1),
}));

function Profile({ userEmail, setUserEmail }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: userEmail,
        business_name: '',
        contact_number: '',
        share: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        edit_address: false
    });

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        const fetchUserData = fetch(`http://localhost:3000/user-profile?email=${userEmail}`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch user data");
                return response.json();
            })
            .catch(error => console.error("Error fetching user data:", error));
    
        const fetchCountries = fetch("https://restcountries.com/v3.1/all")
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch countries");
                return response.json();
            })
            .then(data => data.map(country => country.name.common).sort())
            .catch(error => console.error("Error fetching countries:", error));
    
        Promise.all([fetchUserData, fetchCountries])
            .then(([userData, countries]) => {
                if (userData) {
                    setUserData(prevData => ({
                        ...prevData,
                        ...userData
                    }));
                }
                setCountries(countries || []);
            });
    }, [userEmail]);    
    
    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        setUserEmail('');
        navigate('/');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const { address1, address2, city, state, postal_code } = userData;
    
        if (!address1 || !city || !state || !postal_code || !selectedCountry) {
            alert("Please fill out all required fields!");
            return;
        }
    
        fetch('http://localhost:3306/update-address', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userData.email,
                address1,
                address2,
                city,
                state,
                postal_code,
                country: selectedCountry
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    fetch(`http://localhost:3306/user-profile?email=${userEmail}`)
                        .then(response => response.json())
                        .then(updatedData => {
                            setUserData(prevData => ({
                                ...prevData,
                                ...updatedData,
                                edit_address: false
                            }));
                        });
                } else {
                    alert('Failed to update address');
                }
            })
            .catch(error => console.error("Error updating address:", error));
    };     

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Profile Dashboard
                </Typography>

                <StyledPaper elevation={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Business Information
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                Business Name
                                            </Typography>
                                            <Typography variant="body1">
                                                {userData.business_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                Contact Number
                                            </Typography>
                                            <Typography variant="body1">
                                                {userData.contact_number}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                Email Address
                                            </Typography>
                                            <Typography variant="body1">
                                                {userData.email}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h6">
                                            Address Information
                                        </Typography>
                                        {!userData.edit_address && (
                                            <StyledButton
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => {
                                                    setUserData((prevData) => ({
                                                        ...prevData,
                                                        edit_address: true,
                                                    }));
                                                    setSelectedCountry(userData.country || "");
                                                }}
                                            >
                                                Edit Address
                                            </StyledButton>
                                        )}
                                    </Box>

                                    {!userData.edit_address ? (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="subtitle2" color="textSecondary">
                                                    Address Line 1
                                                </Typography>
                                                <Typography variant="body1">
                                                    {userData.address1}
                                                </Typography>
                                            </Grid>
                                            {userData.address2 && (
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        Address Line 2
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {userData.address2}
                                                    </Typography>
                                                </Grid>
                                            )}
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle2" color="textSecondary">
                                                    City
                                                </Typography>
                                                <Typography variant="body1">
                                                    {userData.city}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle2" color="textSecondary">
                                                    State/Province
                                                </Typography>
                                                <Typography variant="body1">
                                                    {userData.state}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle2" color="textSecondary">
                                                    Postal Code
                                                </Typography>
                                                <Typography variant="body1">
                                                    {userData.postal_code}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle2" color="textSecondary">
                                                    Country
                                                </Typography>
                                                <Typography variant="body1">
                                                    {userData.country}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Address Line 1"
                                                        name="address1"
                                                        value={userData.address1}
                                                        onChange={handleChange}
                                                        required
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Address Line 2"
                                                        name="address2"
                                                        value={userData.address2}
                                                        onChange={handleChange}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="City"
                                                        name="city"
                                                        value={userData.city}
                                                        onChange={handleChange}
                                                        required
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="State/Province"
                                                        name="state"
                                                        value={userData.state}
                                                        onChange={handleChange}
                                                        required
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Postal Code"
                                                        name="postal_code"
                                                        value={userData.postal_code}
                                                        onChange={handleChange}
                                                        required
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FormControl fullWidth variant="outlined">
                                                        <InputLabel>Country</InputLabel>
                                                        <Select
                                                            value={selectedCountry || userData.country}
                                                            onChange={(e) => {
                                                                const country = e.target.value;
                                                                setSelectedCountry(country);
                                                                setUserData((prevData) => ({ ...prevData, country }));
                                                            }}
                                                            label="Country"
                                                            required
                                                        >
                                                            <MenuItem value="" disabled>
                                                                -- Select a Country --
                                                            </MenuItem>
                                                            <MenuItem value="United States">United States</MenuItem>
                                                            <Divider />
                                                            {countries
                                                                .filter((country) => country !== "United States")
                                                                .map((country, index) => (
                                                                    <MenuItem key={index} value={country}>
                                                                        {country}
                                                                    </MenuItem>
                                                                ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                                        <StyledButton
                                                            type="button"
                                                            variant="outlined"
                                                            color="secondary"
                                                            onClick={() => {
                                                                setUserData({
                                                                    ...userData,
                                                                    edit_address: false,
                                                                });
                                                            }}
                                                        >
                                                            Cancel
                                                        </StyledButton>
                                                        <StyledButton
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            Save Changes
                                                        </StyledButton>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </StyledPaper>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <StyledButton
                        variant="contained"
                        color="error"
                        onClick={handleLogout}
                    >
                        Sign Out
                    </StyledButton>
                </Box>
            </Box>
        </Container>
    );
}

export default Profile;
