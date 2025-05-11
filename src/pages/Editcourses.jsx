import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditCourse() {
  const { id } = useParams();
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

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    if (storedCourses[id]) {
      setCourse(storedCourses[id]);
    } else {
      setError('Course not found');
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!course.title || !course.description || !course.startDate || !course.endDate || !course.price) {
      setError('Please fill all required fields');
      return;
    }

    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    storedCourses[id] = course;
    localStorage.setItem('courses', JSON.stringify(storedCourses));

    navigate('/courses');
  };

  return (
    <div className="container-fluid py-4" style={{ maxWidth: '1200px' }}>
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-10">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h2 className="h3 mb-0 text-center">Edit Course</h2>
            </div>
            
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger text-center mb-4">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              {!error && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fs-5">Course Title*</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="title"
                      value={course.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fs-5">Description*</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={course.description}
                      onChange={handleChange}
                      required
                      rows="4"
                      style={{ minHeight: '120px' }}
                    />
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label className="form-label fs-5">Start Date*</label>
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
                      <label className="form-label fs-5">End Date*</label>
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
                    <label className="form-label fs-5">Price ($)*</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control form-control-lg"
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
                    <label className="form-label fs-5">Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      name="image"
                      value={course.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                    {course.image && (
                      <div className="mt-3 text-center">
                        <img 
                          src={course.image} 
                          alt="Course preview" 
                          className="img-thumbnail mt-2" 
                          style={{ maxHeight: '200px' }}
                        />
                        <p className="text-muted small mt-1">Image Preview</p>
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-between border-top pt-4">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary px-4 py-2"
                      onClick={() => navigate('/courses')}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary px-4 py-2"
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Update Course
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;