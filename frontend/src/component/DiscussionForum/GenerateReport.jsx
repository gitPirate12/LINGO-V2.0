import React, { useState } from 'react';
import axios from 'axios';
import exceljs from 'exceljs';
import { Button, CircularProgress } from '@mui/material'; // Import Button and CircularProgress from Material-UI

function GenerateReport() {
  const [loading, setLoading] = useState(false);

  const generateExcelReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3040/api/posts/');
      const posts = response.data;

      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Posts');

      worksheet.addRow(['ID', 'Question', 'Description', 'Author', 'Tags', 'Vote Count']);

      posts.forEach(post => {
        worksheet.addRow([post._id, post.question, post.description, post.author, post.tags.join(', '), post.voteCount]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'posts.xlsx';
      a.click();
      setLoading(false);
    } catch (error) {
      console.error('Error generating Excel report:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={generateExcelReport} disabled={loading} variant="contained" startIcon={loading ? <CircularProgress size={20} /> : null}>
        {loading ? 'Generating...' : 'Generate Excel Report'}
      </Button>
    </div>
  );
}

export default GenerateReport;
