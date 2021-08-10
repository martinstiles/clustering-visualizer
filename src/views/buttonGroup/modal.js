import React, {useState} from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import HelpIcon from '@material-ui/icons/Help'
import { Button } from '@material-ui/core'

const modal = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const paper = {
  backgroundColor: `rgb(${[40,40,40]})`,
  border: `2px solid rgb(${[220,220,220]})`,
  textAlign: 'left',
  padding: '1em',
}

const TransitionsModal = () => {

  const visited = localStorage.getItem('visited')
  const [open, setOpen] = useState(visited ? false : true)

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
    localStorage.setItem('visited', true)
  }

  return (
    <div>
      <Button style={{fontSize: '0.9em', color: 'white', margin: 0 }} onClick={handleOpen}>
        <HelpIcon style={{fontSize: '0.9em'}} />
      </Button>
      <Modal
        style={modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div style={paper}>
            <div style={{textAlign: 'center'}}>
              <h2> Welcome to my Clustering Visualizer </h2>
            </div>
            <div style={{textAlign: 'center', fontStyle: 'italic'}}>
              <h3> - Only 2 algorithms implemented thus far - </h3>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '1em', marginRight: '1em'}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <p style={{color: '#e3afbc', fontStyle: 'italic'}}> Circle&nbsp; </p>
                <p> - centroid of a cluster </p>
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <p style={{color: '#e3afbc'}}> Square&nbsp; </p>
                <p> - data point </p>
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <p> A &nbsp;</p>
                <p style={{color: '#e3afbc'}}> data point &nbsp; </p>
                <p> with the same color as a &nbsp;</p>
                <p style={{color: '#e3afbc'}}> centroid &nbsp; </p>
                <p> belongs to it's cluster </p>
              </div>
            </div>
            <p> 1. Click inside the grid to make data points for the clustering algorithm </p>
            <p> 2. Clicking a data point will remove it </p>
            <p> 3. Select algorithm of choice </p>
            <p> 4. Select a different speed if you feel like it (currently only instant) </p>
            <p> 5. Hit play :)  </p>
            <div style={{textAlign: 'center'}}>
              <Button
                style={{color: `rgb(${[20,20,20]})`, backgroundColor: `rgb(${[220,220,220]})`, fontSize: '0.9em'}}
                onClick={handleClose}>
                Let me play already
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionsModal