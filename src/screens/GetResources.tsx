import { useEffect } from "react";
import * as React from "react";
import Footer from "../components/Footer";
import Resources from "../components/resources/Resources";
import { APIUrl } from "./Home";
import NavBar from "../components/navbar/NavBar";
import { ResourceTable } from "../interfaces";
import axios from "axios";
import { TextInput } from "@patternfly/react-core";

function GetResources() {
  const [resources, setResources] = React.useState<ResourceTable[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://pitne-d4-app-strapi-production.up.railway.app/api/resources', {
        });
        setResources(response.data.data);
      } catch (error) {
        console.error('Error fetching resources from Strapi:', error);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources.filter(
    resource => resource.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const contentWidth = '80%';

  return (
    <div>
      <div className="container">
        <div className="mb-5">
          <NavBar />
        </div>
        <NavBar />

        <div className="top-heading">ALL RESOURCES</div>

        <div className="page-container">
          <div className="content-wrap">
            <div className="m-4">
              <TextInput
                type="text"
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
                placeholder="Search resources..."
                aria-label="Search for resources here"
          
              />
            </div>
            {searchTerm ? (
              filteredResources.length === 0 ? (
                <p>No resources found.</p>
              ) : (
                filteredResources.map(resource => (
                  <div key={resource.id} style={{ marginBottom: '20px' }}>
                    <Resources resource={resource} />
                  </div>
                ))
              )
            ) : (
              resources.map(resource => (
                <div key={resource.id} style={{ marginBottom: '20px' }}>
                  <Resources resource={resource} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GetResources;
