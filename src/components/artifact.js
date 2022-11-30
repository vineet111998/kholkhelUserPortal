import React, { useState,useEffect } from 'react';
import {Modal,Button, Row, Col} from 'react-bootstrap';
import Status from "../components/stats.css"
import {HiOutlineDocumentText} from "react-icons/hi";
import{MdOutlinePreview} from "react-icons/md"
import MUIDataTable from "mui-datatables";
import { Avatar } from "@mui/material";
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import ArtifactPrev from './ArtifactPrev';

const Artifact =()=> {
    
    const [modalShow,setModalShow]=useState(false);
    const [artifactData,setArtifactData]=useState([]);
    const [showArtifacData,setShowArtifactData] =useState([]);
    const [selectedRow,setSelectedRow]= useState(-1);
    
      const  columns = [
        {
          name: "id",
          label: "Sl.No",
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: "artifact_code",
          label: "Code",
          options: {
            filter: true,
            sort: false,
          }
        },
          {
            name: "artifact_type",
            label: "Type",
            options: {
              filter: true,
              sort: false,
            }
          },
        {
          name: "date",
          label: "Date",
          options: {
            filter: true,
            sort: false,
          }
        },
        {
            name: "prev",
            label:'Preview',
            options: {
              filter: true,
              sort: false,
              empty: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return (
                    artifactData != null &&
                    <Button onClick={()=>{setModalShow("show");setSelectedRow(artifactData[dataIndex]);console.log(modalShow)}}><MdOutlinePreview /></Button>
      
                );
              }
            }
          }
      ];
      useEffect(()=>{
        if(artifactData.length==0){
            getArttifact();
        }
    })
      const convert=(str)=> {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
    async function getArttifact(){
        var ArtifactData=await JSON.parse(localStorage.getItem('artifactList'));
        // console.log(ArtifactData)
        var artifact=[];
        var showArtifact=[];
        if(ArtifactData != null){

            for(let i=0;i<ArtifactData.length;i++)
            {
                if(ArtifactData[i].artifact_type===0)
                {
                showArtifact.push({id:i+1,artifact_code:"#"+ArtifactData[i].eventName +ArtifactData[i].activityName+ArtifactData[i].artifact_name,artifact_type:"Activity",date:convert(ArtifactData[i].date) })
                artifact.push({id:i+1,artifact_type:"Activity",artifact_url:ArtifactData[i].artifact_url,artifact_name:ArtifactData[i].artifact_name,activityName:ArtifactData[i].activityName,eventName:ArtifactData[i].eventName,date:convert(ArtifactData[i].date)})
                }
                else{
                    showArtifact.push({id:i+1,artifact_code:"#"+ArtifactData[i].eventName +ArtifactData[i].artifact_name,artifact_type:"EVENT",date:convert(ArtifactData[i].date) })
                    artifact.push({id:i+1,artifact_type:"Event",artifact_url:ArtifactData[i].artifact_url,artifact_name:ArtifactData[i].artifact_name,eventName:ArtifactData[i].eventName,date:convert(ArtifactData[i].date)})
                }
               
            }
            setShowArtifactData(showArtifact)
            setArtifactData(artifact);
          }
    }
    const handleClose =()=>{
        setModalShow(true)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        display: 'block'
      };
     
        return (
            <>
            <Button onClick={() =>setModalShow(true)}>
            <HiOutlineDocumentText />
            </Button>
                <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <MUIDataTable
                title={"Artifact Collection Records"}
                data={showArtifacData}
                columns={columns}
                  />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
            {
                modalShow === 'show' &&
                // <h1>hello</h1>
                <Modal
                show={true}
                onHide={() => setModalShow(true)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Box sx={style}>
                    <ArtifactPrev value={selectedRow} />
                </Box>
                </Modal>
            }
            </>
          );
    }
 
export default Artifact;