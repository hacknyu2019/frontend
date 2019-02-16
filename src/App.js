import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf"
import Dropzone from 'react-dropzone'
import { Spinner, Button, ButtonGroup, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const baseStyle = {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
  };

  const buttonStyle = {
      backgroundColor: '#ff1493',
      color: '#fff',
      padding: '20px 50px',
      textAlign: "center ",
      textDecoration: "none",
      display: "inline-block",
      fontSize: 18,
      borderRadius: 40,
  }
  const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
  };
  const rejectStyle = {
    borderStyle: 'solid',
    borderColor: '#c66',
    backgroundColor: '#eee'
  };

export default class App extends Component {
  state = { 
    numPages: null,
    pageNumber: 1,
    fileUploaded: true,
    loading: false,
    content: ["YOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSOYOOYORDNSNCOSDCNSONCSCNSO"],
    content2: ["YO ITS ME WITH SECOND CONETNE"]
    };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => {
    if (this.state.pageNumber == 1) {
        return;
    }
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
}
  goToNextPage = () => {
      if (this.state.pageNumber == this.state.numPages) {
          return;
      }    
      this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
    }

  uploadAnother = () => { 
    this.setState(() => ({ fileUploaded: false }));
  }

whenFileUploaded = () => {
    const { pageNumber, numPages } = this.state;
    return (
      <div className="row preventOverflow">
        <div className="col-6">
            <nav>
              <div class="row" >
              <div className="paddingleft">
              Lecture 1: Machine Learning
              </div>

              <div className="col-9">
              <ButtonGroup>
                <Button color="primary" onClick={this.goToPrevPage}>Prev</Button>
                <Button color="primary" onClick={this.goToNextPage}>Next</Button>
              </ButtonGroup>
              </div>
                <div className="col-3">
                  Page {pageNumber} of {numPages}
              </div>
              </div>
            </nav>
            <div>
            <Document
                className="docs"
                file="example.pdf"
                onLoadSuccess={this.onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber}  />
            </Document>
            </div>
        </div>
        <div className="v1"></div>
        <div className="col-5">
        <h3>Keywords and Definitions</h3>
        <div className="scrollable"> {this.state.content[0]}</div>
        <br></br><br></br>
        <h3>Relevant Readings</h3>
        <div className="scrollable">{this.state.content2[0]} </div>

        </div>  

      </div>
    )
}
onDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles);
    console.log(rejectedFiles);
    if (rejectedFiles.length > 0) {
        alert("Yo wtf? ");
        return;
    }
    var formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    fetch('', {
    method: 'POST',
    body: formData
    }).then(res => {
      this.setState({fileUploaded: true, loading: false})
    })
    this.setState({loading: true})

  }

  navBar = () => {
    return(
      <div className="paddingbottom">
    <Navbar color="primary" dark expand="md" >
          <NavbarBrand href="/">SQUEEZE</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Services</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Contact Us</NavLink>
              </NavItem>
              <NavItem>
                <Button className="pinkColor" onClick={this.uploadAnother}>Upload PDF</Button>
              </NavItem>
            </Nav>
          </Collapse>
    </Navbar>
    </div>
          )   
  }
whenFileNotUploaded = () => {
    return (
        <div className="centered">
            <Dropzone onDrop={this.onDrop}>
            
        {({getRootProps, getInputProps, isDragActive, isDragReject}) => {
            let styles = {...buttonStyle}
            styles = isDragActive ? {...styles, ...activeStyle} : styles
            styles = isDragReject ? {...styles, ...rejectStyle} : styles
          return (
            <div
              {...getRootProps()}
              style={styles}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p className="centered">Drop files here...</p> :
                  <p>Upload PDF</p>
              }
              </div>
          )
        }}
      </Dropzone>
      <br></br><br></br>
      <p align="center"> Drag your .pdf files here!<br></br> Or open from </p>


        </div>
    )
}
  render() {
    return (
        <div>
            {this.navBar()}
            {this.state.loading && <div className="centered"> <Spinner color="primary" /> </div>}
            {!this.state.loading && (this.state.fileUploaded ? this.whenFileUploaded() : this.whenFileNotUploaded() )}
        </div>
    );
  }
}
