import React, { useEffect, useState } from 'react'
import DrawerAppBar from '../NavComponents/DrawerAppBar'
import { Box, Container, Grid, Toolbar } from '@mui/material'
import Footer from '../NavComponents/Footer'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Authentication/UseAuthContext';
import { get, ref } from 'firebase/database';
import { database } from '../firebase/firebase';
import Loading from '../Components/Loading';


const Course = () => {

    const [courseData, setCourseData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navi = useNavigate();

    useEffect(() => {
        const courseRef = ref(database, 'Coursedata');
        get(courseRef).then((snapshot) =>{
          if (snapshot.exists) { 
            setLoading(false)
            let records = []
            snapshot.forEach(childSnapshot=>{
              let keyName = childSnapshot.key;
              let data = childSnapshot.val();
              records.push({"key":keyName,"data":data})
            })
            setCourseData(records)
          }
          else{
            alert("no data available");
          }
        }).catch((err)=>{
          setError(err.messages)
        })
      }, [])  
    

    
  return (
    <>
        <DrawerAppBar/>
            <Box sx={{p:2}}>
                {loading ? <Loading/>
                :
                <>
                <Toolbar/>
                <Typography variant='h3' sx={{textAlign : 'center', marginBottom : "2rem" , padding : "5px"}}>Courses</Typography>
                <Container sx={{mx:'auto', }}>
                <Grid container spacing={3}>
                {courseData.map((data,id)=>(
                <Grid key={id} item xs={2} sm={4} md={4} sx={{ padding: "0px"}}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="./images/pic3.jpg"
                            title="course"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {data.data.CourseName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                            {data.data.CourseId}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {data.data.About}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' size="small" onClick={()=>{
                                navi(`/viewcourses/${data.data.CourseName}/${data.data.CourseId}`)
                            }}>View</Button>
                            <Button variant='outlined' onClick={()=>{navi(`/applynow/${data.data.CourseId}/${data.data.CourseName}`)}} size="small">Apply Now</Button>
                        </CardActions>
                    </Card>
                </Grid>

                ))}
                </Grid>
                </Container>     
                </>
                
            }
                
            
            </Box>
        <Footer/>
    </>
  )
}


export default Course