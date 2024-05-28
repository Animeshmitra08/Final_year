import React, { useEffect, useState } from 'react'
import DrawerAppBar from '../NavComponents/DrawerAppBar'
import Box from '@mui/material/Box';
import Footer from '../NavComponents/Footer';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { database } from '../firebase/firebase';
import { get, ref } from 'firebase/database';


const cards = [
  {
    id:1,
    img : "images/pic1.jpg",
    title: "Course 1",
    link: "",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. "
  },
  {
    id:2,
    img : "images/pic2.jpg",
    title: "Course 2",
    link: "",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. "
  },
  {
    id:3,
    img : "images/pic3.jpg",
    title: "Course 3",
    link: "",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. "
  }
]

const HomePage = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navi = useNavigate();

  const hcert = ()=>{
    navi('/certificate')
  }

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
      <section className='main-section'>
        <div className="section1"></div>
        <div className='types'>
          <Typography variant='h2' component="h2">Develop your skills</Typography>
          <Typography variant="h5" component="h2" sx={{mt:1, mb:0}}>
           More than 500 courses
          </Typography>
          <div className="button-navi">
          <button className='btn pointer' onClick={()=>{
            navi("/courses")
          }}>Courses</button>
          <button className="btn pointer" onClick={hcert}>Certificate</button>
        </div>
        </div>
      </section>
      <Box component="main" sx={{ p: 2 }}>        
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sequi ut iure dolorum culpa perferendis adipisci ratione suscipit hic magni. Possimus fugit est asperiores, non, explicabo aut voluptas magni sint quasi hic minima, deleniti esse? Quam, iusto sequi corporis repellat culpa autem reiciendis optio! Vel rerum necessitatibus culpa. Eum, in.
        </Typography>   
      </Box>
      <Box component="main" sx={{ 
        p: 2, 
        display:'flex',
        flexDirection:'column', 
        alignItems:'center'
        }}>   
        <Typography variant="h2" component="h2">
          Courses
        </Typography> 
        <Grid
          spacing={2}
          p={2}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          >   
          {courseData && courseData.map((data,index)=>(
            <Grid key={index} item>
            <Card sx={{ maxWidth: 345 }}>
              {/* <CardMedia
                component="img"
                alt={}
                height="140"
                image={}
              /> */}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.data.CourseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.data.CourseId}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Course</Button>
              </CardActions>
            </Card></Grid>
          ))}          
        </Grid>
        <Button variant='contained' onClick={()=>navi("/courses")}>View All</Button>
      </Box>
      <Footer/>
    </>
  )
}

export default HomePage