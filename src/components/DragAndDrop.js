import React from 'react';

class DragAndDrop extends React.Component {

  state = {
    dragging: false
  }

  dropRef = React.createRef()

  handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({dragging: true})
    }

  }
  handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--
    if (this.dragCounter > 0) return
    this.setState({dragging: false})
  }
  handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({dragging: false})
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files)
      this.dragCounter = 0
    }
  }

  componentDidMount() {
    const div = this.dropRef.current;
    this.dragCounter = 0
    div.addEventListener('dragenter', this.handleDragEnter)
    div.addEventListener('dragleave', this.handleDragLeave)
    div.addEventListener('dragover', this.handleDragOver)
    div.addEventListener('drop', this.handleDrop)
  }

  componentWillUnmount() {
    const div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragEnter)
    div.removeEventListener('dragleave', this.handleDragLeave)
    div.removeEventListener('dragover', this.handleDragOver)
    div.removeEventListener('drop', this.handleDrop)
  }


  render() {
    return (
      <div 
        style={{display: 'flex', flexDirection: 'column', ...this.props.style}} 
        ref={this.dropRef}
      >
        {this.state.dragging &&
          <div 
            style={{
              flex: 1,
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0, 
              right: 0,
              zIndex: 9999
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 36
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
        }
        {this.props.children}
      </div>
    )
  }
}

export default DragAndDrop;
