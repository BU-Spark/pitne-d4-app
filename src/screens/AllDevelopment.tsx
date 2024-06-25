import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/Footer";
import DetailedDevelopmentCard from "../components/developments/DetailedDevs";
import type { DevelopmentData } from "./Home";

const AllDevelopments: React.FC = () => {
  const [developments, setDevelopments] = useState<DevelopmentData[]>([]);

  const fetchDevelopments = async () => {
    try {
      const response = await fetch("https://pitne-d4-app-strapi-production.up.railway.app/api/developments?populate=*");
      
      if (response.ok) {
        const json = await response.json();
        
        const fetchedDevelopments = json.data.map((item: any) => {
          let formattedDate = "";
          if (item.attributes.Date) {
            const dateObj = new Date(item.attributes.Date);
            formattedDate = dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          }

          return {
            id: item.id,
            attributes: {
              title: item.attributes.Title,
              body: item.attributes.Description,
              website: item.attributes.Link,
              date: formattedDate,
            },
          };
        });

        setDevelopments(fetchedDevelopments);
      } 
      else {
        console.log(`Status code: ${response.status}`);

        setDevelopments([{
          id: '-1',
          attributes: {
            title: "Uh Oh!",
            body: "Looks like there was an issue!",
            website: "#",
            date: ""
          }
        }]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);

      setDevelopments([{
        id: '-1',
        attributes: {
          title: "Uh Oh!",
          body: "Looks like there was an issue!",
          website: "#",
          date: ""
        }
      }]);
    }
  };

  useEffect(() => {
    fetchDevelopments();
  }, []);

  return (
    <div>
      <div className="page-container">
        <div className="content-wrap">
          <div className="mb-5">
            <NavBar />
          </div>
          <h2 className="top-heading">ALL DEVELOPMENTS</h2>
          <div className="detailed-developments-container">
            {developments.map(development => (
              <DetailedDevelopmentCard
                key={development.id}
                title={development.attributes.title}
                body={development.attributes.body}
                website={development.attributes.website}
                date={development.attributes.date}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllDevelopments;