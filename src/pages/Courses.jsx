import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, []);

  const handleDelete = (index) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
  };

  return (
    <div className="container-fluid py-5 px-4" style={{ maxWidth: '1800px' }}>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
        <h1 className="display-5 mb-3 mb-md-0 fw-bold">
          <i className="bi bi-book me-3"></i>
          Course Catalog
        </h1>
        <button 
          className="btn btn-primary btn-lg px-4 py-2"
          onClick={() => navigate('/add-course')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Course
        </button>
      </div>

      <div className="row g-4">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6" key={index}>
              <div className="card h-100 shadow-lg border-0">
                <div className="position-relative">
                  <img
                    src={course.image || 'https://via.placeholder.com/400x250?text=Course+Image'}
                    className="card-img-top"
                    alt={course.title}
                    style={{ 
                      height: '250px', 
                      objectFit: 'cover',
                      borderTopLeftRadius: '0.375rem',
                      borderTopRightRadius: '0.375rem'
                    }}
                  />
                  <span className="position-absolute top-0 end-0 bg-primary text-white px-3 py-1 rounded-bottom-start">
                    ${course.price}
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title fs-4 fw-bold mb-3">{course.title}</h3>
                  <p className="card-text mb-4" style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {course.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <p className="mb-1 small text-muted">
                          <i className="bi bi-calendar3 me-2"></i>
                          <strong>Start:</strong> {course.startDate}
                        </p>
                        <p className="small text-muted">
                          <i className="bi bi-calendar3 me-2"></i>
                          <strong>End:</strong> {course.endDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between">
                      <button 
                        onClick={() => navigate(`/edit-course/${index}`)} 
                        className="btn btn-warning px-4"
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(index)} 
                        className="btn btn-danger px-4"
                      >
                        <i className="bi bi-trash me-2"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="card shadow border-0 p-5">
              <i className="bi bi-book text-muted" style={{ fontSize: '5rem' }}></i>
              <h3 className="mt-4 mb-3">No Courses Available</h3>
              <p className="text-muted mb-4">Start by adding your first course to the catalog</p>
              <button 
                className="btn btn-primary btn-lg px-5 py-2"
                onClick={() => navigate('/add-course')}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add First Course
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;