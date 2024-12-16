import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Collapse, Button } from 'react-bootstrap';

const ConfigurationSelector = () => {
  const [configurations, setConfigurations] = useState([]);
  const [selectedConfigs, setSelectedConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGroup, setShowGroup] = useState({
    Desktop: true,
    'Mobile/Tablet': true,
    'Web-based': true,
  });

  useEffect(() => {
    const fetchConfigurations = async () => {
      try {
        const allConfigResponse = await axios.get('http://localhost:5000/client-configs');
        setConfigurations(allConfigResponse.data);

        const userConfigRresponse = await axios.get('http://localhost:5000/user-configs?user_id=00000000-0000-0000-0000-000000000001');
        setSelectedConfigs(userConfigRresponse.data);

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchConfigurations();
  }, []);

  const handleCheckboxChange = (event, configKey) => {
    const isChecked = event.target.checked;
    setSelectedConfigs((prevSelected) => {
      const updatedConfigs = isChecked
        ? [...prevSelected, configKey]
        : prevSelected.filter((key) => key !== configKey);
  
       // Post updated configs to the server
      axios.post('http://localhost:5000/update-user-configs', {
        configs: updatedConfigs,
        user_id: "00000000-0000-0000-0000-000000000001"
      }).catch((error) => console.error("Error posting configs:", error));
          return updatedConfigs;
        });
  };
  const handleGroupToggle = (group) => {
    setShowGroup((prevShowGroup) => ({
      ...prevShowGroup,
      [group]: !prevShowGroup[group],
    }));
  };

  const configurationsArray = Object.entries(configurations).map(([key, value]) => ({
    ...value,
    id: key,
  }));

  const groupedConfigurations = configurationsArray.reduce((acc, config) => {
    (acc[config.group] = acc[config.group] || []).push(config);
    return acc;
  }, {});

  // Filter and sort groups based on showGroup
  const filteredAndSortedGroups = Object.keys(showGroup)
    .filter((group) => group in groupedConfigurations)
    .reduce((acc, group) => {
      acc[group] = groupedConfigurations[group];
      return acc;
    }, {});

  return (
    <div className="container config-pane">
      <h2>Email Client Options</h2>
      {isLoading ? (
        <div>Loading configurations...</div>
      ) : error ? (
        <div>Error fetching configurations: {error.message}</div>
      ) : (
        <div>
          {Object.keys(filteredAndSortedGroups).map((group) => (
            <div key={group}>
              <Button className="group-header-button btn-secondary" onClick={() => handleGroupToggle(group)}>
                <span className="d-flex align-items-center">
                  {showGroup[group] ? (
                    <i className="bi bi-chevron-compact-up"></i>
                  ) : (
                    <i className="bi bi-chevron-compact-down"></i>
                  )}
                  <span className="group-name">{group}</span>
                </span>
              </Button>
              <Collapse in={showGroup[group]}>
                <div id={group}>
                  <div className="row">
                    {filteredAndSortedGroups[group].map((config) => (
                      <div key={config.id} className="col-md-4">
                        <div className="border p-2 d-flex align-items-center">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={config.id}
                              checked={selectedConfigs.includes(config.id)}
                              onChange={(e) => handleCheckboxChange(e, config.id)}
                            />
                            <label className="form-check-label" htmlFor={config.id}></label>
                          </div>
                          <div>
                            <div className="config-name">
                              <strong>{config.name}</strong>
                            </div>
                            <div className="config-platform">
                              <small>{config.platform}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfigurationSelector;
