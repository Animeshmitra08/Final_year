import React,  { useEffect, useState } from 'react'
import DrawerAppBar from '../NavComponents/DrawerAppBar'
import { Box, Toolbar , Button, Typography, Link, Tabs } from '@mui/material'
import Tab from '@mui/material/Tab';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { database } from '../firebase/firebase';
import Loading from '../Components/Loading';



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }



const ViewCourse = () => {
    const { name, id } = useParams();
    const [value, setValue] = React.useState(0);
    const [courseData, setCourseData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const courseRef = ref(database, 'Coursedata');
        get(courseRef).then((snapshot) =>{
          if (snapshot.exists) { 
            setLoading(false)
            let records = []
            snapshot.forEach(childSnapshot=>{
              let keyName = childSnapshot.key;
              let data = childSnapshot.val();
              if (keyName === id) {
                records.push({"key":keyName,"data":data})
              }              
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
        {
            loading ? 
            <Loading/>
            :
            <>
            <Toolbar/>
            {courseData && courseData.map((data, index) =>(
            <Box key={index} sx={{ padding:"1rem", display:"flex", width:"100wh", justifyContent:"space-between" }}>        
                <Box sx={{flex:"1", display:"flex", gap:"2em"}}>
                    <Box>
                        <h1>{data.data.CourseId} {name}</h1>
                        <p>Launch your career as a business analyst. Build job-ready skills for an in-demand career in business analysis in as little as 3 months. No prior experience required to get started.</p>
                        <p>Instructor : <Link href='#'>{data.data.Instructor}</Link></p>
                        <Button variant='contained' sx={{marginTop:"1em"}} onClick={()=>{navigate(`/applynow/${id}/${name}`)}}>Apply Now</Button>
                        <Box sx={{ width:"100%",boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", marginTop:"2em" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="scrollable auto tabs example"
                            >
                                <Tab label="About" />
                                <Tab label="Outcomes" />
                                <Tab label="Courses" />
                            </Tabs>
                        </Box>

                        <TabPanel value={value} index={0}>
                            <Box sx={{display:"flex"}}>
                                <Box>
                                    <Box marginBottom={2} sx={{display:"flex", flexDirection:"column"}}>
                                        <Typography marginBottom={2} variant='h5' component='h5'>What you'll learn</Typography>
                                        <Typography>  
                                            {data.data.About}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography marginBottom={2} variant='h5' component='h5'>Skills you'll gain</Typography>
                                        <Box sx={{display: "flex", gap:"2em"}}>
                                            <Link>Microsoft Excel</Link>
                                            <Link>Preparing Data</Link>
                                            <Link>Data Visualization</Link>
                                            <Link>Chatbot</Link>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <iframe width="450" height="235" src="https://www.youtube.com/embed/C6YtPJxNULA?si=rBtZCcGmdMu5BlPc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                                </Box>
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Box sx={{display:"flex", justifyContent:"space-around"}}>
                                <Box>
                                    <Typography variant='h5' component='h5'>Earn a career certificate</Typography>
                                    <p>Add this credential to your LinkedIn profile, resume, or CV.Share it on social media and in your performance review</p>
                                </Box>
                                <Box sx={{width:"22rem", boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px", borderRadius:"0.7rem", overflow:"hidden"}}>
                                    <img className='certificate' src={window.location.origin + '/images/Certificate_template.png'} alt="certificateimg" />
                                </Box>      
                            </Box>                      
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                >
                                Sub Course 1
                                </AccordionSummary>
                                <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                >
                                Sub Course 2
                                </AccordionSummary>
                                <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                >
                                Sub Course 3
                                </AccordionSummary>
                                <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            
                        </TabPanel>
                    </Box>




                    <Box sx={{ width: "18rem", height:"30rem", borderRadius:"5px", boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", padding:"1em"}}>
                        <p>Professional Certificate</p>
                        <hr />
                        <p>Beginner level</p>
                        <p>1 Month at 10hrs a week</p>
                        <p>Flexible Schedule</p>
                        <hr />
                        <Button>View All Course</Button>
                    </Box>
                </Box>
            </Box>
            ))}
        </>
        }
    </>
  )
}

export default ViewCourse