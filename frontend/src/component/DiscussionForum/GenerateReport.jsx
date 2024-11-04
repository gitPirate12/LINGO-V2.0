import React, { useState } from 'react';
import axios from 'axios';
import exceljs from 'exceljs';
import { Button, CircularProgress } from '@mui/material';

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
      <style>
        {`
          .excel-report-btn {
              border-radius: 20px;
              background-color: rgba(245, 240, 229, 1);
              display: flex;
              width: 210px;
              min-height: 40px;
              align-items: center;
              justify-content: center;
              padding: 0 16px;
              color: rgba(28, 23, 13, 1);
              overflow: hidden;
          }

          .excel-report-text {
              width: 100%;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
          }
        `}
      </style>

      <Button 
        onClick={generateExcelReport} 
        disabled={loading} 
        className="excel-report-btn"
        sx={{
          textTransform: 'none',
          borderRadius: '20px',
          backgroundColor: 'rgba(245, 240, 229, 1)', // Normal background color
          color: 'rgba(28, 23, 13, 1)',
          width: '210px',
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Box shadow when not hovered
          '&:hover': {
            backgroundColor: 'rgba(245, 240, 229, 1)', // Keep the same background color on hover
            boxShadow: 'none', // Remove box shadow on hover
          },
        }}
>
  {loading ? <CircularProgress size={20} /> : <span className="excel-report-text">Generate Excel Report</span>}
</Button>


    </div>
  );
}

export default GenerateReport;
