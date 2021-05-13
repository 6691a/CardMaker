import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import AuthService from './service/auth';
// import Axios from './service/axios';
// import Utility from './utility/utility';
import ImageUploader from './service/image_uploader';
import ImageInput from './components/ui/image_input/image_input';
// import axios from axios;

// const utility = new Utility();
// const axios = new Axios(utility);
// const authService = new AuthService(axios, utility);
const authService = new AuthService();

const imageUploader = new ImageUploader();
const FileInput = (props) => (
  <ImageInput {...props} imageUploader={imageUploader} />
);

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput}/>
  </React.StrictMode>,
  document.getElementById('root')
);


