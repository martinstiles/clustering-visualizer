import React, { useState } from 'react'
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline'
import { Button, MenuItem, Menu, Link } from '@material-ui/core'

const MoreMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleMoreClose = () => { setAnchorEl(null) }
  const handleMoreClick = (event) => { setAnchorEl(event.currentTarget) }

  return (
    <>
      <Button style={{fontSize: '1em', color: 'white', margin: 0, marginTop: '6px'}} aria-haspopup="true" onClick={handleMoreClick}>
          <ViewHeadlineIcon style={{fontSize: '0.9em'}} />
        </Button>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMoreClose}>
          <MenuItem onClick={handleMoreClose}> <Link target='_blank' href='https://martinstiles.github.io/pathfinding-visualizer/' style={{color: 'black'}}>
            Pathfinding Algorithms
          </Link></MenuItem>
          <MenuItem onClick={handleMoreClose}> <Link target='_blank' href='https://github.com/martinstiles/clustering-visualizer' style={{color: 'black'}}>
            Go to repository
          </Link></MenuItem>
          <MenuItem onClick={handleMoreClose}> <Link target='_blank' href='https://martinstiles.github.io/website/' style={{color: 'black'}}>
            Visit my website
          </Link></MenuItem>
          <MenuItem onClick={handleMoreClose}> <Link target='_blank' href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' style={{color: 'black'}}>
            Free stuff
          </Link></MenuItem>
        </Menu>
    </>
  )
}

export default MoreMenu
