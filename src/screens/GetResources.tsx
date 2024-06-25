import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [resources, setResources] = React.useState<ResourceTable[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // const token = '2f28130dd3c99e82d1b7db445c23010b0609ad7a2cc231396904349b10c6ad4bb852fe69ceec7ce0eb86d2907176064f6dd3edd225648b52db70ef5ea7e6e9a40f03e17e28c6ec7b60fff40993e330bf331dea836a9f9e64144327f3be7fc6ffe26ca749d025f5f248a3a537c26874b34ab184889d4aadfa02efadcc5d4a149b'; // Replace 'YOUR_API_TOKEN' with your actual API token
        const response = await axios.get('http://pitne-d4-app-strapi-production.up.railway.app/api/resources', {

          // headers: {
          //     Authorization: `Bearer ${token}`
          // }
        });
        setResources(response.data.data);
      } catch (error) {
        console.error('Error fetching associations from Strapi:', error);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources.filter(
    resource => resource.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <div className="mb-5">
        <NavBar />
      </div>
      <div className='mt-5 p-4'>
        <h1 >
          <b>All Resources</b>
        </h1>
        <div className='m-4'>
          <TextInput
            type="text"
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            placeholder="Search resources..."
            aria-label='Search for resources here'
          />
        </div>
        {searchTerm ? (
          filteredResources.length === 0 ? (
            <p>No resources found.</p>
          ) : (
            filteredResources.map(resource => (
              <Resources
                key={resource.id}
                resource={resource}
              />
            ))
          )
        ) : (
          resources.map(resource => (
            <Resources
              key={resource.id}
              resource={resource}
            />
          ))
        )}
      </div>
    </div>
  )

}

export default GetResources;