import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCourse() {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    price: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
    
    if (name === 'image') {
      setImagePreview(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!course.title || !course.description || !course.startDate || !course.endDate || !course.price) {
      setError('Please fill all required fields');
      return;
    }

    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const updatedCourses = [...storedCourses, course];
    localStorage.setItem('courses', JSON.stringify(updatedCourses));

    navigate('/courses');
  };

  return (
    <div className="container-fluid py-5" style={{ maxWidth: '1400px' }}>
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-10">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="h2 mb-0 text-center">
                <i className="bi bi-plus-circle me-2"></i>
                Add New Course
              </h2>
            </div>
            
            <div className="card-body p-5">
              {error && (
                <div className="alert alert-danger text-center mb-4">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-4">
                  <label className="form-label fs-5 fw-semibold">Course Title*</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="title"
                    value={course.title}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a course title
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fs-5 fw-semibold">Description*</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                    required
                    rows="5"
                    style={{ minHeight: '150px' }}
                  />
                  <div className="invalid-feedback">
                    Please provide a course description
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label fs-5 fw-semibold">Start Date*</label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="startDate"
                      value={course.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-5 fw-semibold">End Date*</label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="endDate"
                      value={course.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fs-5 fw-semibold">Price*</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={course.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fs-5 fw-semibold">Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    name="image"
                    value={course.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  {imagePreview && (
                    <div className="mt-3 text-center">
                      <img 
                        src={imagePreview} 
                        alt="Course preview" 
                        className="img-thumbnail mt-2" 
                        style={{ maxHeight: '250px', maxWidth: '100%' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/400x250?text=Invalid+Image+URL';
                        }}
                      />
                      <p className="text-muted small mt-2">Image Preview</p>
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-between border-top pt-4 mt-4">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary px-5 py-2"
                    onClick={() => navigate('/courses')}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary px-5 py-2"
                  >
                    <i className="bi bi-save me-2"></i>
                    Save Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;