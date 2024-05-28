import React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useUserAuth } from '../Authentication/UseAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, TextField, Typography } from '@mui/material';

const ApplyCourse = (props) => {

    const { user } = useUserAuth();

    const [open, setOpen] = React.useState(true);
    const [error, setError] = useState("");
    const [applyCourseData, setApplyCourseData] = useState({
        courseId : "",
        courseName : "",
        fullName : "",
        email : "",
        phnNumber: "",
    })
    
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
        setError("No user Please Login")
        }else{
        setApplyCourseData({
            courseId : `${props.id}`,
            courseName : `${props.cname}`,
            fullName : `${user.displayName}`,
            email : `${user.email}`,
        })
        }    
    }, [user])

    let name, value;
    const handleChange = (e) =>{
        name = e.target.name;
        value = e.target.value;
        setApplyCourseData({...applyCourseData, [name]:value})
    }


    const formPost = async (e) =>{
        e.preventDefault();
        const {courseId, courseName, fullName, email, phnNumber,} = applyCourseData;
        if (fullName && email && phnNumber) {
        const response = await fetch(`https://final-year-project-b1ebf-default-rtdb.firebaseio.com/StudentApplyCourse.json`, {
            method: "POST",
            headers:{
            "Content-Type" : "application/json",
            },
            body: JSON.stringify({
            courseId, courseName, fullName, email, phnNumber
            }),
        });
        if (response) {
            alert("data submitted");
            setError("");
            navigate("/courses")
        } else {
            alert("fill user data")
        }
        }else {
        alert("fill user data")
        }
    }

  return (
    <>
        <Box component="form" method='post' onSubmit={formPost} noValidate autoComplete='off'>
            <TextField
                margin="normal"
                type='number'
                id="courseId"
                label="Course Id"
                value={applyCourseData.courseId}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={handleChange}
                disabled
                sx={{marginRight:"2em"}}
            />
            <TextField
                margin="normal"
                required                  
                id="courseName"
                label="Course Name"
                name="courseName"
                value={applyCourseData.courseName}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={handleChange}
                disabled
                sx={{marginLeft:"2em"}}
            />

            <Typography variant='h6' fontWeight={500} component="h6" marginLeft={2} marginTop={2}>Student Details</Typography>

            <TextField
                margin="normal"                  
                fullWidth
                name="fullName"
                label="Full Name"
                type="text"
                id="fullName"
                InputLabelProps={{
                shrink: true,
                }}
                value={applyCourseData.fullName}
                onChange={handleChange}
            />
            <TextField
                margin="normal"                  
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                id="email"
                InputLabelProps={{
                shrink: true,
                }}
                value={applyCourseData.email}
                onChange={(e)=>e.target.value}
            />
            <TextField
                margin="normal"                  
                fullWidth
                name="phnNumber"
                label="Phone Number"
                type="number"
                id="phnNumber"
                value={applyCourseData.phnNumber}
                onChange={handleChange}
            />
            <DialogActions>
            <Button variant='outlined' onClick={()=>{navigate("/courses")}}>Cancel</Button>
            <Button variant='contained' type='submit'>Submit</Button>
            </DialogActions>
        </Box>
    </>
  )
}

export default ApplyCourse