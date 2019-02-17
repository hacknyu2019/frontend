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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import{FaFilePdf, FaSearchengin} from "react-icons/fa";



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
      backgroundColor: '#0000FF',
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
    fileUploaded: false,
    loading: false,
    content: [],
    content2: [],
    filesPreview:[],
    preview: [],
    uniqueId: '',
    };

  componentDidMount = () => {
    var tempData = ["Lecture 1: Machine Learning", "Lecture 2: Artifical Intelligence"]
    var mock =[];
    for (const i in tempData) {
      mock.push(
      <div key={i}> 
        <FaFilePdf />  
        {tempData[i]}
      </div>
      )
    }
    this.setState({preview: mock})
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages, content2: new Array(numPages), content: new Array(numPages) });
  };

  goToPrevPage = () => {
    if (this.state.pageNumber == 1) {
        return;
    }
    this.fetchData(false)
}

fetchData = (nextPage) => {
  fetch(`https://nyuhack-api-heroku.herokuapp.com/process_pdf?id=${this.state.uniqueId}&page=${this.state.pageNumber-1}`, {
    method: 'GET',
    }).then(res => {
      return res.json()
    }).then(res => {
      console.log(res)
      var temp = [];
      var temp2 = [];
      var pgNum;
      if (nextPage) {
        pgNum = this.state.pageNumber + 1;
      } else {
        pgNum = this.state.pageNumber - 1;
      }
      for (const i in res.news.results) {
        temp.push({
          title: res.news.results[i].title,
          url: res.news.results[i].url,
          text: res.news.results[i].text,
        })
      }
      for (const i in res.definitions) {
        temp2.push({
          title: res.definitions[i].title,
          url: res.definitions[i].url,
          text: res.definitions[i].text,
        })
      }
      this.state.content[pgNum - 1] = temp2;
      this.state.content2[pgNum - 1] = temp;
      this.setState({ pageNumber: pgNum });
    }).catch(err => {
      alert(err);
    })
  }
}
  goToNextPage = () => {
      if (this.state.pageNumber == this.state.numPages) {
          return;
      }
      this.fetchData(true)
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
              <div className="row" >
              <div className="paddingleft">
              Lecture 1: Machine Learning
              </div>
              <div className="col-9">
              <ButtonGroup>
                <Button color="primary" onClick={this.goToPrevPage}>Prev</Button>
                <div className="spacebetween"/>
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
                file="example1.pdf"
                onLoadSuccess={this.onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber}  />
            </Document>
            </div>
        </div>
        <div className="v1"></div>
        <div className="col-5">
        <h3><FaSearchengin/>  Keywords and Definitions</h3>
        <div className="scrollable"> {this.showContent1(this.state.content[this.state.pageNumber-1])}</div>
        <br></br><br></br>
        <h3><FaSearchengin/>  Relevant Readings</h3>
        <div className="scrollable">{this.showContent2(this.state.content2[this.state.pageNumber-1])} </div>
        </div>
      </div>
    )
}

showContent1= (data) => {
  if (data == null) {
    return(<Spinner color="primary" />)
  }
  return(
    data.map(d => {
      return (
        <div className="smallfont">
          <a href={d.url} target="_blank">{d.title}</a>
          <ul>
            <li>{d.text}</li>
          </ul>
        </div>
      )
    })
  )
}



showContent2 = (data) => {
  if (data == null) {
    return(<Spinner color="primary" />)
  }
  return(
    data.map(d => {
      return (
        <div className="smallfont">
          <a href={d.url} target="_blank">{d.title}</a>
          <ul>
            <li>{d.text}</li>
          </ul>
        </div>
      )
    })
  )
}
onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
        alert("Yo wtf? ");
        return;
    }
    var filesPreview=[];
    this.state.filesPreview.push(acceptedFiles)
    for(var i in this.state.filesPreview[0]){
      filesPreview.push(<div key={i}>
        <FaFilePdf />  
        {this.state.filesPreview[0][i].name}
        </div>
      )
    }
    this.setState({preview: filesPreview})
    var formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    fetch('https://nyuhack-api-heroku.herokuapp.com/upload', {
    method: 'POST',
    body: formData
    }).then(res => {
      console.log(res.body)
      return res.json();
    }).then(res => {
      console.log(res.id)
      this.setState({fileUploaded: true, loading: false, uniqueId:res.id})
    }).catch(err => {
      alert("Errror")
      console.log(err);
      alert(err);
    })
    this.setState({loading: true})
  }

  navBar = () => {
    return(
      <div className="paddingbottom">
    <Navbar color="primary" light expand="md" >
          <NavbarBrand href="/">SQUEEZE</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">My Library</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Academia</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Bookmarks</NavLink>
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
                <div align="center">

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
                  <div>Upload PDF</div>
              }
              </div>
          )
        }}
      </Dropzone>
      </div>
      
      <div className="smallfont" align="center"> Drag your .pdf files here!</div><div align="center"><br></br> <br></br>Or open from: </div>
      {this.state.preview.length > 0 && <div className="borderbox" align="center">
      {this.state.preview}
      </div>}
      
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
