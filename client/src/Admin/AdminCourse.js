import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Button, Grid, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Loading from '../Components/Loading';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { get, ref, set } from 'firebase/database';
import { database } from '../firebase/firebase';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AdminCourse = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true)

  const [subCourse, setSubCourse] = useState([{course : ""}]);

  const [picture, setPicture] = useState("");
  const [courseData, setCourseData] = useState({
    courseId : "",
    courseName : "",
    instructor : "",
    about : "",
  });
  const [error, setError] = useState("");
  const [crseData, setCrseData] = useState([])

  let name, value;
  const handleChange = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setCourseData({...courseData, [name]:value})
  }

  async function formPost(e) {
    e.preventDefault();
    const {courseId, courseName, instructor, about} = courseData;
      if (courseId && courseName && instructor && about) {
        const res = set(ref(database, `Coursedata/${courseId}`), {
          CourseId: courseId,
          CourseName : courseName, 
          Instructor : instructor, 
          About : about, 
          SubCourse:subCourse     
        });
        if (res) {
          alert("Data Submitted");
          setDialogOpen(false);
        }else{
          alert("fill user data");
        }
        
      }else{
        alert("fill user data");
      }
  }

  useEffect(() => {
    const courseRef = ref(database, 'Coursedata');
    get(courseRef).then((snapshot) =>{
      if (snapshot.exists) { 
        setLoading(false);
        let records = []
        snapshot.forEach(childSnapshot=>{
          let keyName = childSnapshot.key;
          let data = childSnapshot.val();
          records.push({"key":keyName,"data":data})
        })
        setCrseData(records)
      }
      else{
        alert("no data available");
      }
    }).catch((err)=>{
      setError(err.messages)
    })
  }, [])  


  // subcourse handled-------------------------------------------
  const handleAdd = ()=>{
    setSubCourse([...subCourse, {course : ""}]);
  }

  const handleRemove = (index) =>{
    const list = [...subCourse];
    list.splice(index,1);
    setSubCourse(list);
  }
  const handleCourseChange = (e, index) =>{
    const {name, value} = e.target;
    const list = [...subCourse];
    list[index][name] = value;
    setSubCourse(list)
  }

  return (
    <>
      {error && <Alert sx={{zIndex:50}}>{error}</Alert>}
      <Box>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ alignItems:"center"}}>
          {loading ? <Loading/>:          
            crseData.map((data, id)=>(
              <Grid item key={id}>
                <Card sx={{ Width: "75px" }}>
                  <CardContent>
                    <Typography fontWeight={600} gutterBottom>
                      {data.data.CourseName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Course Id : {data.data.CourseId}
                    </Typography>
                    <Typography variant="body2">
                      {data.data.About}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Edit</Button>
                    <Button size="small">Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }

          <Grid item>
            <Button onClick={()=>setDialogOpen(true)} sx={{ border:"2px solid", borderStyle: "dashed", borderColor:"#26486b",borderRadius:"5px", width:"100px", height:"100px", display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", "&:hover":{borderColor:"#1a72bb"}}}>
              <AddIcon/>
              <p>Add Course</p>
            </Button>
          </Grid>
        </Grid>                
      </Box>




      {dialogOpen ? 
        <Dialog
          open={dialogOpen}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="add-course-details"
          sx={{overflow:"auto"}}
        >
          <DialogTitle fontSize={25} marginBottom={0} fontWeight={600}>
            Course Details
          </DialogTitle>
          <DialogContent>
            <Box component="form" method='post' onSubmit={formPost} noValidate autoComplete='off'>
                <TextField
                  margin="normal"
                  required
                  id="courseId"
                  label="Course Id"
                  name="courseId"
                  type='number'
                  autoFocus
                  sx={{marginRight:"2em"}}
                  value={courseData.courseId}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required                  
                  id="courseName"
                  label="Course Name"
                  name="courseName"
                  autoFocus
                  sx={{marginLeft:"2em"}}
                  value={courseData.courseName}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"                  
                  fullWidth
                  name="instructor"
                  label="Instructor"
                  type="text"
                  id="instructor"
                  value={courseData.instructor}
                  onChange={handleChange}
                />
                {/* course photo-------------------------------------- */}
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <TextField
                  margin="normal" 
                  name="file"
                  type="file"
                  id="file"
                  value={picture}
                  onChange={(e)=>setPicture(e.target.value)}
                />
                  <Box>
                    <Button onClick={()=>setPicture("")}>Cancel</Button>
                  </Box>
                </Box>

                <Typography variant='h6' fontWeight={500} component="h6" marginLeft={2} marginTop={2}>About Course</Typography>

                <TextField
                  margin="normal"                  
                  fullWidth
                  name="about"
                  label="What to learn"
                  type="text"
                  id="about"
                  value={courseData.about}
                  multiline
                  maxRows={4}
                  onChange={handleChange}
                />



                <Typography variant='h6' fontWeight={500} component="h6" marginLeft={2} marginTop={2}>Add Sub Course</Typography>

                <Box sx={{ display:"flex", flexDirection:"column"}}>
                  {subCourse.map((courselist,index)=>(
                    <Box key={index} sx={{display:"flex", alignItems:"center", gap:"1em"}}>
                      <TextField
                        margin="normal"                  
                        name="course"
                        label="Sub Course Name"
                        type="text"
                        id="course"
                        value={courselist.course}
                        onChange={(e)=>handleCourseChange(e, index)}
                      />
                      {subCourse.length > 1 && 
                      <Button onClick={()=>handleRemove(index)} color='error' variant='outlined'>Remove</Button>
                      }
                      {subCourse.length - 1 === index && subCourse.length < 5 &&
                      <Button onClick={handleAdd} color='success' variant='outlined'>Add</Button>
                      }
                    </Box>
                  ))}
                </Box>

                <DialogActions>
                  <Button onClick={()=>setDialogOpen(false)}>Cancel</Button>
                  <Button variant='contained' type='submit'>Submit</Button>
                </DialogActions>
              </Box>
          </DialogContent>
          
        </Dialog>:null
      }
    </>
  )
}

export default AdminCourse

// export function CourseData(props) {
//   return (
    
//   )
// }