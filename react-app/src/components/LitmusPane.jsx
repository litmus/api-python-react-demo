import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LitmusPane = ({ content }) => {
  const [selectedConfigs, setSelectedConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailGuid, setEmailGuid] = useState(null);
  const [imageLoadingStatus, setImageLoadingStatus] = useState({}); // Track image loading states

  // Fetch configurations when the "Run Previews" button is clicked
  const fetchPreviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch the GUID
      const guidResponse = await axios.post('http://localhost:5000/create-litmus-email', {
        html_text: content,
        subject: 'Test Email',
      });
      setEmailGuid(guidResponse.data.email_guid);

      // Fetch user configurations
      const userConfigResponse = await axios.get(
        'http://localhost:5000/user-configs?user_id=00000000-0000-0000-0000-000000000001'
      );
      setSelectedConfigs(userConfigResponse.data);

      // Initialize loading state for images
      const initialLoadingStatus = {};
      userConfigResponse.data.forEach((config) => {
        initialLoadingStatus[config] = true; // Mark each config as "loading"
      });
      setImageLoadingStatus(initialLoadingStatus);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to chunk configs into rows for grid display
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const gridChunks = chunkArray(selectedConfigs, 3);

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-4" onClick={fetchPreviews} disabled={isLoading}>
      <i class="bi bi-camera"></i> {isLoading ? 'Loading...' : 'Run Previews'}
      </button>

      {error && <div className="alert alert-danger">Error: {error}</div>}

      {emailGuid && gridChunks.length > 0 && (
        gridChunks.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((config) => (
              <div className="col-md-4" key={config}>
                <div className="thumbnail">
                  <h4>{config}</h4>
                  <a
                    href={`https://instant-api.litmus.com/v1/emails/${emailGuid}/previews/${config.toUpperCase()}/full`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Show spinner while image is loading */}
                    {imageLoadingStatus[config] && (
                      <div
                        style={{
                          width: '100%',
                          height: '250px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only"></span>
                        </div>
                      </div>
                    )}
                    <img
                      src={`https://instant-api.litmus.com/v1/emails/${emailGuid}/previews/${config.toUpperCase()}/thumb450`}
                      className="img-fluid"
                      alt={config}
                      onLoad={() => {
                        setImageLoadingStatus((prev) => ({ ...prev, [config]: false }));
                      }}
                      style={{
                        display: imageLoadingStatus[config] ? 'none' : 'block',
                      }}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default LitmusPane;
