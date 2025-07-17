import React, { useState } from 'react';
import axios from '../utils/axiosInstance';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [formDataState, setFormDataState] = useState({
    title: '',
    course: '',
    subject: '',
    semester: '',
    university: ''
  });
  const [message, setMessage] = useState('');
  const [shareLink, setShareLink] = useState('');

  const handleChange = (e) => {
    setFormDataState({ ...formDataState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("File is required");

    const formData = new FormData();
    Object.entries(formDataState).forEach(([key, val]) => formData.append(key, val));
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData);
      setMessage(response.data.message);
      setShareLink(response.data.shareLink);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div>
      <h2>Upload Notes</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="course" placeholder="Course" onChange={handleChange} required />
        <input name="subject" placeholder="Subject" onChange={handleChange} required />
        <input name="semester" placeholder="Semester" onChange={handleChange} required />
        <input name="university" placeholder="University" onChange={handleChange} required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      {shareLink && (
        <p>Share Link: <a href={shareLink} target="_blank" rel="noreferrer">{shareLink}</a></p>
      )}
    </div>
  );
};

export default UploadPage;
